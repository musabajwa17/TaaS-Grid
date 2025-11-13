"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, X, FileText } from "lucide-react";

export default function FypPosting() {
  const [showModal, setShowModal] = useState(false);
  const [fyps, setFyps] = useState([]);
  const [companyId, setCompanyId] = useState(null);

  const [newFyp, setNewFyp] = useState({
    title: "",
    description: "",
    domain: "",
    duration: "",
    collaborationMode: "",
    qualification: "",
    requirements: "",
    location: "",
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

// ✅ Fetch FYPs posted by this company
useEffect(() => {
  if (!companyId) return;

  const fetchFyps = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/fyps");
      if (res.data.success) {
        const filtered = res.data.fyps.filter(
          (fyp) => fyp?.postedBy?._id?.toString() === companyId.toString()
        );
        setFyps(filtered);
      }
    } catch (error) {
      console.error("Error fetching FYPs:", error);
    }
  };

  fetchFyps();
}, [companyId]);


  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFyp((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit new FYP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newFyp.title.trim() || !companyId) return;

    try {
      const fypData = { ...newFyp, postedBy: companyId };
      const res = await axios.post("http://localhost:3001/api/fyps", fypData);

      if (res.data.success) {
        setFyps((prev) => [...prev, res.data.fyp]);
        setNewFyp({
          title: "",
          description: "",
          domain: "",
          duration: "",
          collaborationMode: "",
          qualification: "",
          requirements: "",
          location: "",
        });
        setShowModal(false);
        alert("✅ FYP posted successfully!");
      }
    } catch (error) {
      console.error("Error posting FYP:", error);
      alert("❌ Failed to post FYP. Please try again.");
    }
  };

  // ✅ Delete FYP
  const handleDelete = async (id) => {
    try {
      setFyps((prev) => prev.filter((fyp) => fyp._id !== id));
      const res = await axios.delete(`http://localhost:3001/api/fyps/${id}`);

      if (res.data.success) {
        const updated = await axios.get("http://localhost:3001/api/fyps");
        if (updated.data.success) {
          const filtered = updated.data.fyps.filter(
            (fyp) => fyp.postedBy === companyId
          );
          setFyps(filtered);
        }
      }
    } catch (error) {
      console.error("Error deleting FYP:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Final Year Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-5 py-2 rounded-xl font-semibold shadow hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" /> Post New FYP
        </button>
      </div>

      {/* ===== FYP LIST ===== */}
      {fyps.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No FYPs posted yet by your company.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fyps.map((fyp, i) => (
            <div
              key={i}
              className="relative bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
            >
              <button
                onClick={() => handleDelete(fyp._id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="bg-teal-100 p-3 rounded-xl">
                  <FileText className="text-teal-600 w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {fyp.title}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-3">{fyp.description}</p>

              <div className="space-y-1 text-sm text-gray-500">
                <p>
                  <span className="font-semibold text-gray-700">Domain:</span>{" "}
                  {fyp.domain}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Duration:</span>{" "}
                  {fyp.duration}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Mode:</span>{" "}
                  {fyp.collaborationMode}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Qualification:
                  </span>{" "}
                  {fyp.qualification}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Requirements:
                  </span>{" "}
                  {fyp.requirements}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  {fyp.location}
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
              Post a New FYP
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newFyp.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newFyp.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Domain
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={newFyp.domain}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={newFyp.duration}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Collaboration Mode
                  </label>
                  <select
                    name="collaborationMode"
                    value={newFyp.collaborationMode}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select Mode</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={newFyp.qualification}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
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
                  value={newFyp.requirements}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={newFyp.location}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Post FYP
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
