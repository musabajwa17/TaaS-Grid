// "use client";

// import React, { useEffect, useState } from "react";
// import { Plus, Briefcase, X } from "lucide-react";
// import axios from "axios";

// export default function JobPosting() {
//   const [showModal, setShowModal] = useState(false);
//   const [jobs, setJobs] = useState([]);

//   const [newJob, setNewJob] = useState({
//     title: "",
//     description: "",
//     experience: "",
//     qualification: "",
//     location: "",
//     requirements: "",
//     type: "Full-time",
//   });
// useEffect(() => {
//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/api/jobs");
//       if (res.data.success) {
//         // get logged-in user id
//         const user = JSON.parse(localStorage.getItem("user"));
//         const currentUserId = user?._id || user?.id;

//         // filter jobs by postedBy
//         const filtered = res.data.jobs.filter(
//           (job) => job.postedBy === currentUserId
//         );

//         setJobs(filtered);
//         console.log("Jobs visible to you:", filtered);
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   fetchJobs();
// }, []);



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewJob((prev) => ({ ...prev, [name]: value }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!newJob.title.trim()) return;

//   try {
//     // send to backend
//     const res = await axios.post("http://localhost:3001/api/jobs", newJob);

//     if (res.data.success) {
//       // update local UI
//       setJobs((prev) => [...prev, res.data.job]);
//       // reset form
//       setNewJob({
//         title: "",
//         description: "",
//         experience: "",
//         qualification: "",
//         location: "",
//         requirements: "",
//         type: "Full-time",
//       });
//       setShowModal(false);
//       alert("✅ Job posted successfully!");
//     }
//   } catch (error) {
//     console.error("Error posting job:", error);
//     alert("❌ Failed to post job. Please try again.");
//   }
// };

// const handleDelete = async (id) => {
//   try {
//     // 1️⃣ Optimistic update
//     setJobs((prev) => prev.filter((job) => job._id !== id));

//     // 2️⃣ Send delete request
//     const res = await axios.delete(`http://localhost:3001/api/jobs/${id}`);

//     // 3️⃣ Re-fetch from backend for accuracy
//     if (res.data.success) {
//       const updated = await axios.get("http://localhost:3001/api/jobs");
//       if (updated.data.success) {
//         setJobs(updated.data.jobs);
//       }
//     }
//   } catch (error) {
//     console.error("Error deleting job:", error);
//     // 4️⃣ Optional rollback if failed
//     const rollback = await axios.get("http://localhost:3001/api/jobs");
//     if (rollback.data.success) setJobs(rollback.data.jobs);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-50 px-6 py-10">
//       {/* ===== HEADER ===== */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
//         >
//           <Plus className="w-5 h-5" /> Post New Job
//         </button>
//       </div>

    
//       {/* ===== JOB LIST ===== */}
//       {jobs.length === 0 ? (
//         <p className="text-gray-500 text-center mt-10">No jobs posted yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job, i) => (
//             <div
//               key={i}
//               className="relative bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
//             >
//               {/* Cross Button */}
//               <button
//                 onClick={() => handleDelete(job._id)}
//                 className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <div className="flex items-center gap-3 mb-3">
//                 <div className="bg-emerald-100 p-3 rounded-xl">
//                   <Briefcase className="text-emerald-600 w-6 h-6" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {job.title}
//                 </h3>
//               </div>

//               <p className="text-gray-600 text-sm mb-3">{job.description}</p>

//               <div className="space-y-1 text-sm text-gray-500">
//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Experience:
//                   </span>{" "}
//                   {job.experience}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Qualification:
//                   </span>{" "}
//                   {job.qualification}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-700">Location:</span>{" "}
//                   {job.location}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-700">
//                     Requirements:
//                   </span>{" "}
//                   {job.requirements}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-gray-700">Type:</span>{" "}
//                   {job.type}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ===== JOB POST MODAL ===== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//               Post a New Job
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-700">Job Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={newJob.title}
//                   onChange={handleChange}
//                   required
//                   className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">Description</label>
//                 <textarea
//                   name="description"
//                   value={newJob.description}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Experience Required</label>
//                   <input
//                     type="text"
//                     name="experience"
//                     value={newJob.experience}
//                     onChange={handleChange}
//                     className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Qualification</label>
//                   <input
//                     type="text"
//                     name="qualification"
//                     value={newJob.qualification}
//                     onChange={handleChange}
//                     className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     value={newJob.location}
//                     onChange={handleChange}
//                     className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Job Type</label>
//                   <select
//                     name="type"
//                     value={newJob.type}
//                     onChange={handleChange}
//                     className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
//                   >
//                     <option>Full-time</option>
//                     <option>Part-time</option>
//                     <option>Contract</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-700">Requirements</label>
//                 <input
//                   type="text"
//                   name="requirements"
//                   value={newJob.requirements}
//                   onChange={handleChange}
//                   className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
//               >
//                 Post Job
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import { Plus, Briefcase, X } from "lucide-react";
import axios from "axios";

export default function CompanyJobs() {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  // ✅ Updated newJob state — includes all fields from the schema
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    experience: "",
    qualification: "",
    location: "",
    salary: "",
    requirements: "",
    type: "Full-time",
    status: "Open",
    postedByModel: "Company",
  });

  // ✅ Get company ID from localStorage
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

  // ✅ Fetch only jobs posted by this company
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
    }
  };

  fetchJobs();
}, [companyId]);

  // ✅ Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit new job
  const handleSubmit = async (e) => {
    console.log("Hello", newJob)
    e.preventDefault();
    if (!newJob.title.trim() || !companyId) return;

    try {
      const jobData = { ...newJob, postedBy: companyId };
      console.log(jobData)
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
          type: "Full-time",
          status: "Open",
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
    try {
      setJobs((prev) => prev.filter((job) => job._id !== id));
      const res = await axios.delete(`http://localhost:3001/api/jobs/${id}`);

      if (res.data.success) {
        const updated = await axios.get("http://localhost:3001/api/jobs");
        if (updated.data.success) {
          const filtered = updated.data.jobs.filter(
            (job) => job.postedBy === companyId
          );
          setJobs(filtered);
        }
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Employer Job Postings
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" /> Post New Job
        </button>
      </div>

      {/* ===== JOB LIST ===== */}
      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No jobs posted yet by your company.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
            >
              <button
                onClick={() => handleDelete(job._id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <Briefcase className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {job.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {job.description}
              </p>

              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-semibold text-gray-700">
                    Experience:
                  </span>{" "}
                  {job.experience || "—"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Qualification:
                  </span>{" "}
                  {job.qualification || "—"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Location:
                  </span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Salary:</span>{" "}
                  {job.salary || "—"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Requirements:
                  </span>{" "}
                  {job.requirements || "—"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Type:</span>{" "}
                  {job.type}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  <span
                    className={`${
                      job.status === "Open"
                        ? "text-emerald-600 font-semibold"
                        : "text-red-500 font-semibold"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Post a New Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newJob.description}
                  onChange={handleChange}
                  rows={3}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
                ></textarea>
              </div>

              {/* Experience + Qualification */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={newJob.experience}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={newJob.qualification}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
              </div>

              {/* Location + Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Salary (Optional)
                  </label>
                  <input
                    type="text"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleChange}
                    placeholder="e.g., 60,000 PKR / month"
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
              </div>

              {/* Type + Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={newJob.type}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newJob.status}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  >
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Requirements
                </label>
                <input
                  type="text"
                  name="requirements"
                  value={newJob.requirements}
                  onChange={handleChange}
                  placeholder="e.g., Good communication, team player..."
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                />
              </div>

              {/* Submit */}
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
    </div>
  );
}
