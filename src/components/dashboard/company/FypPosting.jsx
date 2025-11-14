"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus,
  X,
  FileText,
  Trash2,
  Edit2,
  Eye,
  Check,
  Loader2,
} from "lucide-react";

/**
 * FypDashboard.jsx
 *
 * Features:
 * - Table listing of company's FYPs
 * - View details modal
 * - Post / Edit modal (same form)
 * - Delete with confirmation
 * - Toast notifications
 *
 * Notes:
 * - API base: use NEXT_PUBLIC_API_URL env or fallback to http://localhost:3001
 * - localStorage key expected: "company" (JSON with _id)
 */

const API ="http://localhost:3001";

export default function FypDashboard() {
  const [fyps, setFyps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Selected for view or edit
  const [selectedFyp, setSelectedFyp] = useState(null);

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Company id
  const [companyId, setCompanyId] = useState(null);

  // Form state
  const emptyFyp = {
    title: "",
    description: "",
    domain: "",
    duration: "",
    collaborationMode: "",
    requirements: "",
    location: "",
  };
  const [form, setForm] = useState(emptyFyp);
  const [submitting, setSubmitting] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Load company ID from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("company") || localStorage.getItem("companyId");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && parsed._id) {
        setCompanyId(parsed._id);
      } else if (typeof raw === "string") {
        // maybe stored directly as id string
        setCompanyId(raw);
      }
    } catch (err) {
      console.error("Failed to parse company from localStorage:", err);
    }
  }, []);

  // Fetch FYPs for this company
  useEffect(() => {
    if (!companyId) {
      setLoading(false);
      return;
    }
    fetchFyps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const fetchFyps = async () => {
    setFetching(true);
    setLoading(true);
    try {
      const res = await axios.get(`${API}/api/fyps`);
      if (res.data?.success) {
        // Filter client-side by postedBy (robust)
        const filtered = res.data.fyps.filter(
          (f) =>
            f?.postedBy?._id?.toString() === companyId?.toString() ||
            f?.postedBy?.toString() === companyId?.toString()
        );
        setFyps(filtered);
      } else {
        toast.error("Failed to fetch FYPs.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching FYPs.");
    } finally {
      setFetching(false);
      setLoading(false);
    }
  };

  // Utility: limit description to 500 words (returns string)
  const limitTo500Words = (text) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= 500) return text;
    return words.slice(0, 500).join(" ");
  };

  // Handle form input changes (with description word limit)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      const limited = limitTo500Words(value);
      setForm((p) => ({ ...p, [name]: limited }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
  };

  // Open Post modal (for create)
  const openPostModal = () => {
    setIsEditMode(false);
    setEditId(null);
    setForm(emptyFyp);
    setShowFormModal(true);
  };

  // Open Edit modal (prefill)
  const openEditModal = (fyp) => {
    setIsEditMode(true);
    setEditId(fyp._id);
    setForm({
      title: fyp.title || "",
      description: fyp.description || "",
      domain: fyp.domain || "",
      duration: fyp.duration || "",
      collaborationMode: fyp.collaborationMode || "",
      requirements: fyp.requirements || "",
      location: fyp.location || "",
    });
    setShowFormModal(true);
  };

  // Submit Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required.");
    if (!form.description.trim()) return toast.error("Description is required.");
    if (!form.domain.trim()) return toast.error("Domain is required.");
    if (!form.duration) return toast.error("Duration is required.");
    if (!form.collaborationMode) return toast.error("Collaboration mode is required.");
    if (!companyId) return toast.error("Company ID missing.");

    const payload = { ...form, postedBy: companyId, postedByModel: "Company" };

    try {
      setSubmitting(true);
      if (isEditMode && editId) {
        await toast.promise(
          axios.put(`${API}/api/fyps/${editId}`, payload),
          {
            loading: "Updating FYP...",
            success: "FYP updated.",
            error: "Failed to update FYP.",
          }
        );
        // Update local list
        setFyps((prev) => prev.map((f) => (f._id === editId ? { ...f, ...payload } : f)));
        toast.success("FYP updated successfully.");
      } else {
        const res = await toast.promise(axios.post(`${API}/api/fyps`, payload), {
          loading: "Posting FYP...",
          success: "FYP posted.",
          error: "Failed to post FYP.",
        });
        // Push created item
        if (res.data?.success && res.data?.fyp) {
          setFyps((prev) => [res.data.fyp, ...prev]);
          toast.success("FYP posted successfully.");
        } else {
          toast.error("Unexpected response from server.");
        }
      }
      setShowFormModal(false);
      setForm(emptyFyp);
      setIsEditMode(false);
      setEditId(null);
    } catch (err) {
      console.error(err);
      toast.error("Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete FYP
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this FYP?");
    if (!confirmed) return;
    try {
      await toast.promise(axios.delete(`${API}/api/fyps/${id}`), {
        loading: "Deleting FYP...",
        success: "FYP deleted.",
        error: "Failed to delete FYP.",
      });
      setFyps((prev) => prev.filter((f) => f._id !== id));
      toast.success("FYP deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };

  // Open view details modal
  const handleView = (fyp) => {
    setSelectedFyp(fyp);
    setShowViewModal(true);
  };

  // Word count helper for UI
  const descriptionWordCount = (text) =>
    text && text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Final Year Projects</h1>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
            onClick={openPostModal}
          >
            <Plus className="w-4 h-4" /> Post New FYP
          </button>
          <button
            className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg hover:shadow-sm"
            onClick={fetchFyps}
            title="Refresh"
          >
            {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span className="text-sm text-gray-700">Refresh</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-teal-600 text-white text-left">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Domain</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4">Mode</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  Loading FYPs...
                </td>
              </tr>
            ) : fyps.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500 italic">
                  No FYPs posted yet.
                </td>
              </tr>
            ) : (
              fyps.map((fyp) => (
                <tr key={fyp._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-800">{fyp.title}</td>
                  <td className="py-3 px-4">{fyp.domain}</td>
                  <td className="py-3 px-4">{fyp.duration}</td>
                  <td className="py-3 px-4">{fyp.collaborationMode}</td>
                  <td className="py-3 px-4">{fyp.location || "-"}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleView(fyp)}
                        className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-2"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>

                      <button
                        onClick={() => openEditModal(fyp)}
                        className="p-2 rounded-md bg-yellow-50 text-yellow-700 hover:bg-yellow-100 flex items-center gap-2"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>

                      <button
                        onClick={() => handleDelete(fyp._id)}
                        className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== View Modal ===== */}
      {showViewModal && selectedFyp && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-3">{selectedFyp.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <div>
                <p className="text-sm">
                  <strong>Domain:</strong> {selectedFyp.domain}
                </p>
                <p className="text-sm mt-2">
                  <strong>Duration:</strong> {selectedFyp.duration}
                </p>
                <p className="text-sm mt-2">
                  <strong>Mode:</strong> {selectedFyp.collaborationMode}
                </p>
                <p className="text-sm mt-2">
                  <strong>Location:</strong> {selectedFyp.location || "-"}
                </p>
                {selectedFyp.requirements && (
                  <p className="text-sm mt-2">
                    <strong>Requirements:</strong> {selectedFyp.requirements}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm">
                  <strong>Posted By:</strong>{" "}
                  {selectedFyp.postedBy?.name || selectedFyp.postedBy || "Company"}
                </p>
                <p className="text-sm mt-2">
                  <strong>Created At:</strong>{" "}
                  {new Date(selectedFyp.createdAt).toLocaleString()}
                </p>
                <p className="text-sm mt-2">
                  <strong>Updated At:</strong>{" "}
                  {new Date(selectedFyp.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-gray-700">
              <p className="font-semibold mb-2">Description</p>
              <div className="prose max-w-none">
                <p>{selectedFyp.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Post / Edit Modal ===== */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-6 relative">
            <button
              onClick={() => {
                setShowFormModal(false);
                setIsEditMode(false);
                setEditId(null);
                setForm(emptyFyp);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-4">
              {isEditMode ? "Edit FYP" : "Post a New FYP"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Enter project description (max 500 words)"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Words: {descriptionWordCount(form.description)} / 500
                </p>
              </div>

              {/* Domain + Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Domain</label>
                  <input
                    type="text"
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Duration</label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select Duration</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </div>
              </div>

              {/* Mode + Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Collaboration Mode</label>
                  <select
                    name="collaborationMode"
                    value={form.collaborationMode}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="">Select Mode</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Requirements</label>
                  <input
                    type="text"
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    placeholder="E.g., Python, ML basics..."
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City or Remote"
                  className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-green-600 text-white py-2 px-4 rounded-lg font-semibold shadow hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {isEditMode ? "Update FYP" : "Post FYP"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyFyp);
                    if (isEditMode) {
                      setIsEditMode(false);
                      setEditId(null);
                    }
                  }}
                  className="px-3 py-2 rounded-lg border"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
