
"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Briefcase,
  X,
  Eye,
  Users,
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function CompanyJobs() {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState(null);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    experience: "",
    qualification: "",
    location: "",
    salary: "",
    requirements: "",
    jobType: "",
    status: "",
    postedByModel: "Company",
  });

  // ✅ Load company ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("company");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCompanyId(user._id);
      } catch (err) {
        console.error("Error parsing user:", err);
      }
    }
  }, []);

  // ✅ Fetch jobs posted by this company
  useEffect(() => {
    if (!companyId) return;

    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/jobs");
        if (res.data.success) {
          const filtered = res.data.jobs.filter(
            (job) => job.postedBy && job.postedBy._id === companyId
          );
          setJobs(filtered);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [companyId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit new job
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newJob.title.trim() || !companyId) return;

    try {
      const jobData = { ...newJob, postedBy: companyId };
      const res = await axios.post("http://localhost:3001/api/jobs", jobData);

      if (res.data.success) {
        setJobs((prev) => [...prev, res.data.job]);
        setNewJob({
          title: "",
          description: "",
          experience: "",
          qualification: "",
          location: "",
          salary: "",
          requirements: "",
          jobType: "",
          status: "",
          postedByModel: "Company",
        });
        setShowModal(false);
        alert("✅ Job posted successfully!");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("❌ Failed to post job. Please try again.");
    }
  };

  // ✅ Delete job
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/jobs/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Company Job Postings
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" /> Post New Job
        </button>
      </div>

      {/* ===== JOB TABLE ===== */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#00bb98]" />
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No jobs posted yet by your company.
        </p>
      ) : (
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
                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-600">{i + 1}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {/* <Briefcase className="text-emerald-600 w-5 h-5" /> */}
                    {job.title}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {job.experience || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {job.qualification || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{job.location}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {job.salary || "—"}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{job.jobType}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.status === "Open" || job.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDetails(true);
                      }}
                      className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        alert("👥 Applicants view coming soon...")
                      }
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                      title="View Applicants"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition"
                      title="Delete Job"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== CREATE JOB MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Post a New Job
            </h2>

            {/* Job Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                ["title", "Job Title", "text"],
                ["description", "Description", "textarea"],
              ].map(([name, label, type]) => (
                <div key={name}>
                  <label className="text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      value={newJob[name]}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Enter details..."
                      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                    />
                  ) : (
                    <input
                      type="text"
                      name={name}
                      value={newJob[name]}
                      onChange={handleChange}
                      required
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                    />
                  )}
                </div>
              ))}

              {/* Select fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["experience", "Experience", ["Fresher", "1-2 years", "3-4 years", "5-6 years", "6+ years"]],
                  ["qualification", "Qualification", ["BS in CS", "MS in CS", "BS in IT", "MS in IT", "BS in SE", "MS in SE", "Other"]],
                  ["location", "Location", []],
                  ["salary", "Salary", ["30-40k", "40-60k", "60-80k", "80-100k", "100-200k", "200-300k", "300-400k", "400-500k"]],
                  ["jobType", "Job Type", ["Full-time", "Part-time", "Contract", "Internship", "Other"]],
                  ["status", "Status", ["Active", "Closed", "Pending"]],
                ].map(([name, label, options]) => (
                  <div key={name}>
                    <label className="text-sm font-medium text-gray-700">{label}</label>
                    {options.length ? (
                      <select
                        name={name}
                        value={newJob[name]}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                      >
                        <option value="">Select {label}</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={newJob[name]}
                        onChange={handleChange}
                        required
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Requirements / Skills
                </label>
                <input
                  type="text"
                  name="requirements"
                  value={newJob.requirements}
                  onChange={handleChange}
                  required
                  placeholder="e.g., React, Node.js, Teamwork..."
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== JOB DETAILS MODAL ===== */}
{showDetails && selectedJob && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-lg p-6 relative animate-fadeIn">
      <button
        onClick={() => setShowDetails(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
        {selectedJob.title}
      </h2>

      <div className="space-y-2 text-gray-700 text-sm">
        <p><strong>Description:</strong> {selectedJob.description}</p>
        <p><strong>Experience:</strong> {selectedJob.experience}</p>
        <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
        <p><strong>Location:</strong> {selectedJob.location}</p>
        <p><strong>Salary:</strong> {selectedJob.salary}</p>
        <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
        <p><strong>Type:</strong> {selectedJob.jobType}</p>

        {/* ✅ Editable status */}
        <div className="flex items-center gap-2 mt-3">
          <strong>Status:</strong>
          <select
            value={selectedJob.status}
            onChange={(e) =>
              setSelectedJob({ ...selectedJob, status: e.target.value })
            }
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-3">
        <button
          onClick={() => setShowDetails(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
        >
          Close
        </button>

        <button
          onClick={async () => {
            try {
              // ✅ Correct API endpoint
              const res = await axios.put(
                `http://localhost:3001/api/jobs/jobs/${selectedJob._id}`,
                { status: selectedJob.status }
              );

              if (res.data.success) {
                alert("✅ Job status updated successfully!");
                // ✅ Update job list without reloading
                setJobs((prev) =>
                  prev.map((job) =>
                    job._id === selectedJob._id
                      ? { ...job, status: selectedJob.status }
                      : job
                  )
                );
                setShowDetails(false);
              }
            } catch (err) {
              console.error(err);
              alert("❌ Failed to update status");
            }
          }}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Update Status
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
