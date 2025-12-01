"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Plus, X, Eye, Users, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import toast from "react-hot-toast";
const API = "http://localhost:3001";
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
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
  const [applicantCounts, setApplicantCounts] = useState({});

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
        // Fetch applicant counts for all jobs
        posted.forEach(job => fetchApplicantCount(job._id));
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

  // fetch applicant count for a job
  const fetchApplicantCount = async (jobId) => {
    try {
      const res = await axios.get(`${API}/api/applicants/job/${jobId}`);
      if (res.data?.success) {
        setApplicantCounts(prev => ({
          ...prev,
          [jobId]: res.data.applicants?.length || 0
        }));
      }
    } catch (err) {
      console.error("Error fetching applicant count:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // open applicants modal and fetch applicants for a specific job
  const handleViewApplicants = async (job) => {
    if (!job) return toast.error("No job selected");

    setSelectedJob(job);
    setCurrentApplicantIndex(0);
    setShowApplicants(true);
    setLoadingApplicants(true);

    try {
      const res = await axios.get(`${API}/api/applicants/job/${job._id}`);
      console.log("Applicants Response:", res.data);

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
    console.log("Updating job status:", jobId, status);
    try {
      const res = await axios.put(`${API}/api/jobs/jobs/${jobId}`, { status });
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
        applicantCounts={applicantCounts}
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
          currentIndex={currentApplicantIndex}
          onIndexChange={setCurrentApplicantIndex}
          onClose={() => setShowApplicants(false)}
          onUpdateStatus={updateApplicantStatus}
        />
      )}

      {showCreate && (
        <JobFormModal
          onClose={() => setShowCreate(false)}
          onCreated={(newJob) => {
            setJobs((p) => [...p, newJob]);
            setApplicantCounts(prev => ({
              ...prev,
              [newJob._id]: 0
            }));
          }}
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

function JobTable({ jobs, loading, applicantCounts, onViewApplicants, onViewDetails }) {
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
            <th className="py-3 px-4 font-semibold text-center">Applicants</th>
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
              <td className="py-3 px-4 text-center">
                <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {applicantCounts[job._id] || 0}
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

function ApplicantsModal({ job, applicants, loading, currentIndex, onIndexChange, onClose, onUpdateStatus }) {
  const totalApplicants = applicants.length;
  const currentApplicant = applicants[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalApplicants - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  const handleGoToApplicant = (index) => {
    onIndexChange(index);
  };

  console.log("ApplicantsModal Props:", applicants);
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">Applicants for {job.title}</h2>

        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : applicants.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No applicants yet</p>
        ) : (
          <>
            {/* Pagination Header */}
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <span className="font-semibold text-gray-700 min-w-20 text-center">
                  {currentIndex + 1}/{totalApplicants}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === totalApplicants - 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  title="Next"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Quick Navigation */}
              <div className="flex gap-2 flex-wrap justify-end max-w-xs">
                {applicants.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGoToApplicant(idx)}
                    className={`px-2 py-1 rounded text-sm font-semibold transition ${
                      idx === currentIndex
                        ? "bg-emerald-600 text-white"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Applicant Card */}
            {currentApplicant && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex flex-col md:flex-row items-start justify-between">
                  {/* Left Section: Resume Info */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-lg">
                      {currentApplicant.resumeId?.name || currentApplicant.userId?.email || "Unknown"}
                    </p>
                    <p className="text-gray-600">{currentApplicant.resumeId?.title || "—"}</p>

                    {/* Experience */}
                    {currentApplicant.resumeId?.experience?.length > 0 ? (
                      <div className="text-gray-500 text-xs mt-1 space-y-1">
                        {currentApplicant.resumeId.experience.map((exp) => (
                          <p key={exp._id}>
                            {exp.role} at {exp.company} ({exp.years})
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-xs mt-1">No experience info</p>
                    )}

                    {/* Skills */}
                    {currentApplicant.resumeId?.skills?.length > 0 && (
                      <p className="text-gray-500 text-xs mt-1">
                        Skills: {currentApplicant.resumeId.skills.join(", ")}
                      </p>
                    )}

                    {/* Applied date */}
                    <p className="text-xs text-gray-400 mt-1">
                      Applied: {new Date(currentApplicant.appliedAt || currentApplicant.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Right Section: Status and Actions */}
                  <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4">
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100">
                      {currentApplicant.status || "Applied"}
                    </span>

                    <button
                      onClick={() => onUpdateStatus(currentApplicant._id, "Shortlisted")}
                      className={`px-3 py-1 rounded-lg font-semibold text-white ${currentApplicant.status === "Shortlisted"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                      disabled={currentApplicant.status === "Shortlisted"}
                    >
                      {currentApplicant.status === "Shortlisted" ? "Shortlisted" : "Shortlist"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
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
            <option value="Draft">Draft</option>
            <option value="Inactive">In-Active</option>
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
  const salaryOptions = ["$100-$300", "$300-$500", "$500-$800", "$800-$1000", "$1000-$1500", "$1500-$2000", "$2000-$2500", "$2500-$3000", "$3000+"];
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