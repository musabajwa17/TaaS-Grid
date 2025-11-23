"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Plus, X, Eye, Users, Loader2 } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import toast from "react-hot-toast";
const API = "http://localhost:3001";

/*
  Modular CompanyJobs component
  - JobTable: shows company jobs and allows selecting a job
  - ApplicantsModal: shows applicants for one job (correctly maps backend shape)
  - JobFormModal: create a new job (2-step UI preserved)
  - JobDetailsModal: view + update single job

  Notes about backend/shape expectations:
  - Applicant returned by backend is expected to include:
      { _id, status, userId: { _id, email, name? }, resumeId: { _id, name, title, experience, ... }, appliedAt }
  - Job object expected: { _id, title, postedBy: { _id }, ... }
*/

export default function CompanyJobs() {
  const { user } = useAuth();

  // jobs & loading
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // modal state
  const [showCreate, setShowCreate] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showApplicants, setShowApplicants] = useState(false);

  // selected job and applicants
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  // fetch company jobs (postedBy === user._id)
  const fetchJobs = useCallback(async () => {
    if (!user || !user._id) return;
    setLoadingJobs(true);
    try {
      const res = await axios.get(`${API}/api/jobs`, { withCredentials: true });
      if (res.data?.success) {
        const posted = (res.data.jobs || []).filter(
          (j) => j.postedBy && j.postedBy._id === user._id
        );
        setJobs(posted);
      } else {
        toast.error(res.data?.message || "Failed to fetch jobs");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching jobs");
    } finally {
      setLoadingJobs(false);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // open applicants modal and fetch applicants for a specific job
  const handleViewApplicants = async (job) => {
    if (!job) return toast.error("No job selected");
    setSelectedJob(job);
    setShowApplicants(true);
    setLoadingApplicants(true);
    try {
      const res = await axios.get(`${API}/api/applicants`, {
        params: { jobId: job._id },
      });
      if (res.data?.success) {
        setApplicants(res.data.applicants || []);
      } else {
        toast.error(res.data?.message || "Failed to fetch applicants");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching applicants");
    } finally {
      setLoadingApplicants(false);
    }
  };

  // update applicant status (optimistic)
  const updateApplicantStatus = async (applicantId, newStatus) => {
    try {
      const prev = applicants;
      setApplicants((p) => p.map((a) => (a._id === applicantId ? { ...a, status: newStatus } : a)));
      const res = await axios.put(
        `${API}/api/applicants/${applicantId}/status`,
        { status: newStatus }
      );
      if (!res.data?.success) {
        toast.error(res.data?.message || "Failed to update status");
        setApplicants(prev);
      } else {
        toast.success("Applicant status updated");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating status");
    }
  };

  // update job status (from details modal)
  const updateJobStatus = async (jobId, status) => {
    try {
      const res = await axios.put(`${API}/api/jobs/${jobId}`, { status });
      if (res.data?.success) {
        setJobs((prev) => prev.map((j) => (j._id === jobId ? { ...j, status } : j)));
        toast.success("Job status updated");
        setShowDetails(false);
      } else {
        toast.error(res.data?.message || "Failed to update job");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating job");
    }
  };
 console.log("Jobs Data:", selectedJob);
 console.log("Applicants Data:", applicants);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Company Job Postings</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow"
          >
            <Plus className="w-5 h-5" /> Post New Job
          </button>
        </div>
      </div>

      <JobTable
        jobs={jobs}
        loading={loadingJobs}
        onViewApplicants={(job) => handleViewApplicants(job)}
        onViewDetails={(job) => {
          setSelectedJob(job);
          setShowDetails(true);
        }}
      />

      {showApplicants && selectedJob && (
        <ApplicantsModal
          job={selectedJob}
          applicants={applicants}
          loading={loadingApplicants}
          onClose={() => setShowApplicants(false)}
          onUpdateStatus={updateApplicantStatus}
        />
      )}

      {showCreate && (
        <JobFormModal
          onClose={() => setShowCreate(false)}
          onCreated={(newJob) => setJobs((p) => [...p, newJob])}
          postedBy={user?._id}
        />
      )}

      {showDetails && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setShowDetails(false)}
          onUpdateStatus={(status) => updateJobStatus(selectedJob._id, status)}
        />
      )}
    </div>
  );
}


/* ----------------------------------------- */
/* ---------- Presentational pieces -------- */
/* ----------------------------------------- */

function JobTable({ jobs, loading, onViewApplicants, onViewDetails }) {
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#00bb98]" />
      </div>
    );

  if (!jobs || jobs.length === 0)
    return <p className="text-gray-500 text-center mt-10">No jobs posted yet by your company.</p>;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow border border-gray-100">
      <table className="w-full text-left border-collapse">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="py-3 px-4 font-semibold">#</th>
            <th className="py-3 px-4 font-semibold">Title</th>
            <th className="py-3 px-4 font-semibold">Experience</th>
            <th className="py-3 px-4 font-semibold">Qualification</th>
            <th className="py-3 px-4 font-semibold">Location</th>
            <th className="py-3 px-4 font-semibold">Salary</th>
            <th className="py-3 px-4 font-semibold">Type</th>
            <th className="py-3 px-4 font-semibold">Status</th>
            <th className="py-3 px-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <tr key={job._id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-gray-600">{i + 1}</td>
              <td className="py-3 px-4 text-gray-600">{job.title}</td>
              <td className="py-3 px-4 text-gray-600">{job.experience || '—'}</td>
              <td className="py-3 px-4 text-gray-600">{job.qualification || '—'}</td>
              <td className="py-3 px-4 text-gray-600">{job.location}</td>
              <td className="py-3 px-4 text-gray-600">{job.salary || '—'}</td>
              <td className="py-3 px-4 text-gray-600">{job.jobType}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Open' || job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                  {job.status}
                </span>
              </td>
              <td className="py-3 px-4 flex justify-center gap-2">
                <button
                  onClick={() => onViewDetails(job)}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onViewApplicants(job)}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                  title="View Applicants"
                >
                  <Users className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ApplicantsModal({ job, applicants, loading, onClose, onUpdateStatus }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Applicants for {job.title}</h2>

        {loading ? (
          <p>Loading...</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-500">No applicants yet</p>
        ) : (
          <ul className="space-y-4">
            {applicants.map((app) => {
              const resume = app.resumeId;

              return (
                <li
                  key={app._id}
                  className="flex flex-col md:flex-row items-start justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  {/* Left Section: Resume Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {resume?.name || app.userId?.email || "Unknown"}
                    </p>
                    <p className="text-gray-600 text-sm">{resume?.title || "—"}</p>

                    {/* Experience */}
                    {resume?.experience?.length > 0 ? (
                      <div className="text-gray-500 text-xs mt-1 space-y-1">
                        {resume.experience.map((exp) => (
                          <p key={exp._id}>
                            {exp.role} at {exp.company} ({exp.years})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-1">No experience info</p>
                    )}

                    {/* Skills */}
                    {resume?.skills?.length > 0 && (
                      <p className="text-gray-500 text-xs mt-1">
                        Skills: {resume.skills.join(", ")}
                      </p>
                    )}

                    {/* Applied date */}
                    <p className="text-xs text-gray-400 mt-1">
                      Applied: {new Date(app.appliedAt || app.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right Section: Status and Actions */}
                  <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4">
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                      {app.status || "Applied"}
                    </span>

                    <button
                      onClick={() => onUpdateStatus(app._id, "Shortlisted")}
                      className={`px-3 py-1 rounded-lg font-semibold text-white ${
                        app.status === "Shortlisted"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      disabled={app.status === "Shortlisted"}
                    >
                      {app.status === "Shortlisted" ? "Shortlisted" : "Shortlist"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
function JobDetailsModal({ job, onClose, onUpdateStatus }) {
  const [status, setStatus] = useState(job.status || 'Active');

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>

        <h2 className="text-2xl font-semibold mb-4">{job.title}</h2>

        <div className="space-y-2 text-gray-700 text-sm">
          <p><strong>Description:</strong> {job.description}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Qualification:</strong> {job.qualification}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Requirements:</strong> {Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements}</p>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <strong>Status:</strong>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Close</button>
          <button onClick={() => onUpdateStatus(status)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Update Status</button>
        </div>
      </div>
    </div>
  );
}


 function JobFormModal({ onClose, onCreated, postedBy }) {
  const experienceOptions = ["Fresher", "1-2 years", "3-4 years", "5-6 years", "6+ years"];
  const qualificationOptions = ["High School", "Diploma", "Bachelor's", "Master's", "Doctorate"];
  const salaryOptions = ["30-40k", "40-60k", "60-80k", "80-100k", "100-200k", "200-300k", "300-400k", "400-500k"];
  const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Other"];
  const workTypeOptions = ["On-Site", "Hybrid", "Remote"];
  const statusOptions = ["Active", "Draft", "Inactive"];

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    experience: "",
    qualification: "",
    location: "",
    salary: "",
    jobType: "",
    workType: "",
    requirements: "",
    status: "Active",
    scheduleDate: "",
    closingDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newJob.title.trim()) return toast.error("Job title required");
    if (!newJob.closingDate) return toast.error("Closing date required");

    setLoading(true);
    try {
      const formattedRequirements = Array.isArray(newJob.requirements)
        ? newJob.requirements
        : newJob.requirements.split(",").map((s) => s.trim()).filter(Boolean);

      const payload = { ...newJob, requirements: formattedRequirements, postedBy };
      const res = await axios.post(`${API}/api/jobs`, payload, { withCredentials: true });

      if (res.data?.success) {
        onCreated(res.data.job);
        toast.success("Job posted successfully");
        onClose();
      } else {
        toast.error(res.data?.message || "Failed to post job");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error posting job");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold mb-4">{step === 1 ? "Post a New Job" : "Job Schedule & Status"}</h2>

        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Job Title</label>
              <input name="title" value={newJob.title} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" value={newJob.description} onChange={handleChange} rows={4} required className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="experience" value={newJob.experience} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2">
                <option value="">Select Experience</option>
                {experienceOptions.map((exp) => <option key={exp} value={exp}>{exp}</option>)}
              </select>

              <select name="qualification" value={newJob.qualification} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2">
                <option value="">Select Qualification</option>
                {qualificationOptions.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>

              <input name="location" value={newJob.location} onChange={handleChange} placeholder="Location" required className="w-full mt-1 border rounded-lg px-3 py-2" />

              <select name="salary" value={newJob.salary} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2">
                <option value="">Select Salary</option>
                {salaryOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              <select name="jobType" value={newJob.jobType} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2">
                <option value="">Select Job Type</option>
                {jobTypeOptions.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>

              <select name="workType" value={newJob.workType} onChange={handleChange} required className="w-full mt-1 border rounded-lg px-3 py-2">
                <option value="">Select Work Type</option>
                {workTypeOptions.map((w) => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Requirements (comma separated)</label>
              <input name="requirements" value={newJob.requirements} onChange={handleChange} className="w-full mt-1 border rounded-lg px-3 py-2" />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white py-2 rounded-lg font-semibold">Next →</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={newJob.status} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Closing Date</label>
              <input type="date" name="closingDate" min={today} value={newJob.closingDate} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border py-2 rounded-lg">← Back</button>
              <button type="submit" className="flex-1 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white py-2 rounded-lg" disabled={loading}>{loading ? "Posting..." : "Post Job"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

