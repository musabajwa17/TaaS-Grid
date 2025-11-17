"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Save, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

export default function CompanyProfile() {
  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3001/api/auth/me", {
        withCredentials: true, // send cookies
      });

      const user = res.data.user;

      if (user && user._id) {
        setCompanyId(user._id);
      } else {
        setError("You are not logged in as a company.");
      }
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      setError("Failed to fetch logged-in company.");
    } finally {
      setLoading(false);
    }
  };

  fetchCurrentUser();
}, []);


  // Fetch company data when companyId is available
  useEffect(() => {
    if (!companyId) return;

    const fetchCompany = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:3001/api/company/${companyId}`);
        console.log(res)
        if (res.data?.success) {
          // normalize keys to match form fields
          const data = res.data.company;
          setCompany({
            companyName: data.companyName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            website: data.website || "",
            description: data.description || "",
            industry: data.industry || "",
            size: data.size || "",
            plan: data.plan || "",
            establishedYear: data.establishedYear || "",
            logo: data.logo || "",
            // keep raw for sending
            _raw: data,
          });
        } else {
          setError(res.data?.message || "Failed to fetch company.");
        }
      } catch (err) {
        console.error("Error fetching company:", err);
        setError(err.response?.data?.message || "Server error while fetching company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Name", name)
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Hello")
    if (!companyId) {
      setError("Company ID is missing.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // prepare payload: only send allowed fields
      const payload = {
        companyName: company.companyName,
        email: company.email,
        phone: company.phone,
        address: company.address,
        website: company.website,
        description: company.description,
        industry: company.industry,
        size: company.size,
        plan: company.plan
      };

      const res = await axios.put(`http://localhost:3001/api/company/${companyId}`, payload);
      console.log(res)
      if (res.data?.success) {
        toast.success(res.data?.message)
        setCompany((prev) => ({ ...prev, ...res.data.company }));
        setIsEditing(false);
      } else {
        setError(res.data?.message || "Failed to update company");
      }
    } catch (err) {
      console.error("Error updating company:", err);
      setError(err.response?.data?.message || "Server error while updating company");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <p className="text-gray-600">No company data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Company Profile</h2>
        <button
          onClick={() => {
            setIsEditing((s) => !s);
            setError(null);
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          <Edit3 size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="space-y-4">
        <label className="block text-sm text-gray-600">Company Name</label>
        <input
          name="companyName"
          value={company.companyName}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Email</label>
        <input
          name="email"
          value={company.email}
          onChange={handleChange}
          disabled={!isEditing}
          type="email"
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Phone</label>
        <input
          name="phone"
          value={company.phone}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Address</label>
        <input
          name="address"
          value={company.address}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Website</label>
        <input
          name="website"
          value={company.website}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Industry</label>
        <input
          name="industry"
          value={company.industry}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        <label className="block text-sm text-gray-600">Company Size</label>
        <input
          name="size"
          value={company.size}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />

        {/* <label className="block text-sm text-gray-600">Established Year</label>
        <input
          name="establishedYear"
          value={company.establishedYear || ""}
          onChange={handleChange}
          disabled={!isEditing}
          type="number"
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        /> */}

        <label className="block text-sm text-gray-600">Description</label>
        <textarea
          name="description"
          value={company.description}
          onChange={handleChange}
          disabled={!isEditing}
          className="w-full mt-1 border rounded-md p-2 text-gray-800 disabled:bg-gray-100"
        />
      </div>

      {isEditing && (
        <div className="mt-6">
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
