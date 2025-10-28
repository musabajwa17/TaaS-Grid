"use client";

import { Bookmark, Star, ChevronRight, Building2 } from "lucide-react";
import Link from "next/link";

const bookmarkedJobs = [
  {
    title: "Frontend Developer (React + TypeScript)",
    company: "Techify Labs",
    location: "Remote",
    type: "Full-Time",
    dateAdded: "Oct 25, 2025",
    status: "active",
    premium: false,
  },
  {
    title: "AI Research Engineer (LangChain)",
    company: "CognitiveX",
    location: "Lahore, PK",
    type: "Hybrid",
    dateAdded: "Oct 20, 2025",
    status: "active",
    premium: true,
  },
  {
    title: "Backend Engineer (Node.js + MongoDB)",
    company: "InnovaSoft",
    location: "Karachi, PK",
    type: "Full-Time",
    dateAdded: "Oct 15, 2025",
    status: "in-progress",
    premium: false,
  },
  {
    title: "Data Scientist (ML + Python)",
    company: "DeepData Labs",
    location: "Remote",
    type: "Contract",
    dateAdded: "Oct 12, 2025",
    status: "completed",
    premium: true,
  },
  {
    title: "Full Stack Developer (MERN)",
    company: "CloudBridge",
    location: "Islamabad, PK",
    type: "Full-Time",
    dateAdded: "Oct 5, 2025",
    status: "active",
    premium: false,
  },
  {
    title: "AI Resume Optimization Expert",
    company: "CareerBoost AI",
    location: "Remote",
    type: "Part-Time",
    dateAdded: "Sep 29, 2025",
    status: "in-progress",
    premium: true,
  },
  {
    title: "DevOps Engineer",
    company: "NextWave Systems",
    location: "Lahore, PK",
    type: "Full-Time",
    dateAdded: "Sep 21, 2025",
    status: "completed",
    premium: false,
  },
  {
    title: "React Native App Developer",
    company: "AppSync Studio",
    location: "Remote",
    type: "Contract",
    dateAdded: "Sep 10, 2025",
    status: "active",
    premium: false,
  },
  {
    title: "AI Chatbot Specialist (LLM + LangChain)",
    company: "GroqTech",
    location: "Hybrid",
    type: "Full-Time",
    dateAdded: "Sep 5, 2025",
    status: "active",
    premium: true,
  },
];

export default function BookmarkedJobs() {
  const plan: string = "Basic"; // replace later with dynamic logic

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-4 my-10 border border-gray-100">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Bookmark className="text-[#00bb98]" /> Bookmarked Jobs
        </h2>

        <div
          className={`px-5 py-2 rounded-full font-semibold text-sm mt-4 md:mt-0 shadow-sm ${
            plan 
              ? "bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}
        >
          {plan ? "🌟 Premium Plan Active" : "Basic Plan"}
        </div>
      </div>

      {/* ===== BOOKMARKED JOB CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedJobs.map((job, i) => (
          <div
            key={i}
            className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800 leading-snug">
                {job.title}
              </h3>
              {job.premium && <Star className="w-5 h-5 text-yellow-400" fill="#facc15" />}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span>{job.company}</span>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              📍 {job.location} • {job.type}
            </p>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  job.status === "active"
                    ? "bg-green-100 text-green-700"
                    : job.status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {job.status}
              </span>

              <span className="text-xs text-gray-400">Saved {job.dateAdded}</span>
            </div>

            <Link
              href={`/jobs/${i}`}
              className="mt-4 inline-flex items-center text-[#00bb98] hover:text-[#00a385] font-medium text-sm"
            >
              View Job Details <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* ===== UPGRADE SECTION ===== */}
      {plan === "Basic" && (
        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[#00bb98]/10 to-[#00d4ae]/10 text-gray-700 border border-[#00bb98]/20 text-center">
          <p className="font-medium mb-2">
            🔒 You’ve reached your Basic plan limit (9 bookmarked jobs)
          </p>
          <p className="text-sm text-gray-500 mb-3">
            Upgrade to Premium to unlock unlimited bookmarks and smart job tracking.
          </p>
          <Link
            href="/upgrade"
            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Upgrade to Premium <ChevronRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
