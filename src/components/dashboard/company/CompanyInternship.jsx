"use client";

import React, { useEffect, useState } from "react";
import { Plus, Briefcase, X } from "lucide-react";
import axios from "axios";

export default function CompanyInternships() {
  const [showModal, setShowModal] = useState(false);
  const [internships, setInternships] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  console.log(companyId)
  const [newInternship, setNewInternship] = useState({
    title: "",
    description: "",
    duration: "",
    qualification: "",
    location: "",
    requirements: "",
    stipend: "",
    type: "Internship",
  });

  // ✅ Get company ID
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

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInternship((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit internship
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!newInternship.title.trim() || !companyId) return;

  try {
    const internshipData = { ...newInternship, postedBy: companyId };
    console.log("Internship Data", internshipData)
    const res = await axios.post("http://localhost:3001/api/internships", internshipData);

    if (res.data.success) {
      setInternships((prev) => [...prev, res.data.internship]);
      setNewInternship({
        title: "",
        description: "",
        duration: "",
        qualification: "",
        location: "",
        requirements: "",
        stipend: "",
        type: "Internship",
      });
      setShowModal(false);
      alert("✅ Internship posted successfully!");
    }
  } catch (error) {
    console.error("Error posting internship:", error);
    alert("❌ Failed to post internship. Please try again.");
  }
};

// ✅ Delete internship
const handleDelete = async (id) => {
  try {
    setInternships((prev) => prev.filter((internship) => internship._id !== id));
    const res = await axios.delete(`http://localhost:3001/api/internships/${id}`);

    if (res.data.success) {
      const updated = await axios.get("http://localhost:3001/api/internships");
      if (updated.data.success) {
        const filtered = updated.data.internships.filter(
          (internship) => internship.postedBy === companyId
        );
        setInternships(filtered);
      }
    }
  } catch (error) {
    console.error("Error deleting internship:", error);
  }
};

useEffect(() => {
  console.log("Fetching internships...");
  if (!companyId) return;

  const fetchInternships = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/internships");
      console.log("Internships response:", res.data);

      if (res.data.success) {
        const filtered = res.data.internships.filter(
          (internship) =>
            internship?.postedBy?._id?.toString() === companyId.toString()
        );
        setInternships(filtered);
      }
    } catch (error) {
      console.error("Error fetching internships:", error);
    }
  };

  fetchInternships();
}, [companyId]);




  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Company Internship Postings
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" /> Post New Internship
        </button>
      </div>

      {/* ===== INTERNSHIP LIST ===== */}
      {internships.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No internships posted yet by your company.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((job, i) => (
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

              <p className="text-gray-600 text-sm mb-3">{job.description}</p>

              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-semibold text-gray-700">Duration:</span>{" "}
                  {job.duration || "Not specified"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Qualification:</span>{" "}
                  {job.qualification}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Requirements:</span>{" "}
                  {job.requirements}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Stipend:</span>{" "}
                  {job.stipend || "Unpaid"}
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
              Post a New Internship
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Internship Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newInternship.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newInternship.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={newInternship.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 Months"
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
                    value={newInternship.qualification}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newInternship.location}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Stipend
                  </label>
                  <input
                    type="text"
                    name="stipend"
                    value={newInternship.stipend}
                    onChange={handleChange}
                    placeholder="e.g. Rs. 10,000 /month"
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Requirements
                </label>
                <input
                  type="text"
                  name="requirements"
                  value={newInternship.requirements}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#00bb98]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Post Internship
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
