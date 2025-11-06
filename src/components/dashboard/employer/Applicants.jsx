"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  FileText,
  Mail,
  Phone,
  X,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
const dummyApplicants = [
  {
    id: 1,
    name: "Ayesha Khan",
    jobTitle: "Frontend Developer",
    experience: "2 Years",
    status: "Pending",
    date: "Nov 3, 2025",
    email: "ayesha.khan@example.com",
    phone: "+92 300 1112233",
    resumeUrl: "#",
  },
  {
    id: 2,
    name: "Ali Raza",
    jobTitle: "Backend Engineer",
    experience: "3 Years",
    status: "Interviewed",
    date: "Nov 2, 2025",
    email: "ali.raza@example.com",
    phone: "+92 312 9876543",
    resumeUrl: "#",
  },
  {
    id: 3,
    name: "Fatima Iftikhar",
    jobTitle: "AI Research Intern",
    experience: "1 Year",
    status: "Shortlisted",
    date: "Nov 1, 2025",
    email: "fatima.i@example.com",
    phone: "+92 301 5678910",
    resumeUrl: "#",
  },
];

export default function Applicants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(
    null
  );
  const [applicants, setApplicants] = useState(dummyApplicants);

  const handleStatusChange = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((applicant) =>
        applicant.id === id ? { ...applicant, status: newStatus } : applicant
      )
    );
  };

  const filteredApplicants = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage <span className="text-[#00bb98]">Applicants</span> 👥
          </h1>
          <p className="text-gray-500 mt-1">
            Track, shortlist, and manage all candidate applications efficiently.
          </p>
        </div>
      </div>

      {/* ===== SEARCH + FILTER ===== */}
      <div className="bg-white rounded-2xl shadow-md p-5 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center w-full md:w-1/2 bg-gray-100 rounded-xl px-4 py-2">
          <Search className="text-gray-400 mr-2 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applicants or job titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-gray-700"
          />
        </div>
        <button className="flex items-center gap-2 text-sm bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* ===== APPLICANT TABLE ===== */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#00bb98]/10 to-[#00d4ae]/10 text-gray-700 text-sm uppercase">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Job Title</th>
              <th className="py-4 px-6">Experience</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Applied On</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr
                key={applicant.id}
                className=" hover:bg-gray-50 transition-all duration-200"
              >
                <td className="py-3 px-6 font-semibold text-gray-800">
                  {applicant.name}
                </td>
                <td className="py-3 px-6 text-gray-600">{applicant.jobTitle}</td>
                <td className="py-3 px-6 text-gray-600">
                  {applicant.experience}
                </td>
                <td className="py-3 px-6">
                  <div className="relative inline-block">
                    <select
                      value={applicant.status}
                      onChange={(e) =>
                        handleStatusChange(
                          applicant.id,
                          e.target.value
                        )
                      }
                      className={`appearance-none rounded-lg px-3 py-1.5 text-sm font-medium cursor-pointer pr-8 focus:outline-none border-0 ${
                        applicant.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : applicant.status === "Interviewed"
                          ? "bg-blue-100 text-blue-700"
                          : applicant.status === "Shortlisted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Interviewed">Interviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>
                </td>
                <td className="py-3 px-6 text-gray-500">{applicant.date}</td>
                <td className="py-3 px-6 text-right">
                  <button
                    onClick={() => setSelectedApplicant(applicant)}
                    className="text-[#00bb98] hover:text-[#009f82] transition"
                  >
                    <Eye className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No applicants found.
          </div>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedApplicant.name}
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Job Applied:</strong> {selectedApplicant.jobTitle}
              </p>
              <p>
                <strong>Experience:</strong> {selectedApplicant.experience}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-[#00bb98]">{selectedApplicant.status}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {selectedApplicant.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {selectedApplicant.phone}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={selectedApplicant.resumeUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white px-4 py-2 rounded-xl shadow hover:opacity-90 transition"
              >
                <FileText className="w-4 h-4" /> View Resume
              </a>
              <button
                onClick={() => {
                  handleStatusChange(selectedApplicant.id, "Shortlisted");
                  setSelectedApplicant(null);
                }}
                className="inline-flex items-center gap-2 text-white bg-green-500 px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
              >
                <CheckCircle className="w-4 h-4" /> Shortlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
