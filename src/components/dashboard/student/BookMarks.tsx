"use client";
import { Bookmark, Star, FolderSymlink, ChevronRight } from "lucide-react";
import Link from "next/link";

const bookmarkedIdeas = [
  {
    title: "AI-Based Health Diagnostic System",
    domain: "AI + Deep Learning",
    dateAdded: "Oct 20, 2025",
    status: "active",
    premium: true,
  },
  {
    title: "Smart Farming using IoT Sensors",
    domain: "IoT + Agriculture",
    dateAdded: "Oct 15, 2025",
    status: "in-progress",
    premium: false,
  },
  {
    title: "Personalized Learning App",
    domain: "EdTech + AI",
    dateAdded: "Oct 5, 2025",
    status: "completed",
    premium: false,
  },
  {
    title: "Blockchain-Based Voting System",
    domain: "Blockchain + Security",
    dateAdded: "Sep 28, 2025",
    status: "active",
    premium: true,
  },
  {
    title: "Weather Forecasting with ML",
    domain: "Machine Learning + Cloud",
    dateAdded: "Sep 21, 2025",
    status: "in-progress",
    premium: false,
  },
  {
    title: "Virtual Career Assistant (LLM-based)",
    domain: "AI + NLP + LangChain",
    dateAdded: "Sep 18, 2025",
    status: "active",
    premium: true,
  },
  {
    title: "Waste Management Monitoring System",
    domain: "IoT + Smart City",
    dateAdded: "Sep 10, 2025",
    status: "completed",
    premium: false,
  },
  {
    title: "Elderly Care Companion Robot",
    domain: "Robotics + AI",
    dateAdded: "Sep 4, 2025",
    status: "in-progress",
    premium: true,
  },
  {
    title: "Food Quality Detection using Computer Vision",
    domain: "AI + Food Tech",
    dateAdded: "Aug 29, 2025",
    status: "active",
    premium: false,
  },
];

export default function BookMarks() {
  const plan: "Basic" | "Premium" = "Basic"; // Replace with dynamic logic later

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mx-4 my-10 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Bookmark className="text-[#00bb98]" /> FYP Bookmarks
        </h2>

        <div
          className={`px-5 py-2 rounded-full font-semibold text-sm mt-4 md:mt-0 shadow-sm ${
            plan
              ? "bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}
        >
          {plan  ? "🌟 Premium Plan Active" : "Basic Plan"}
        </div>
      </div>

      {/* Bookmarked Ideas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedIdeas.map((idea, i) => (
          <div
            key={i}
            className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{idea.title}</h3>
              {idea.premium && (
                <Star className="w-5 h-5 text-yellow-400" fill="#facc15" />
              )}
            </div>

            <p className="text-sm text-gray-500 mb-3">{idea.domain}</p>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  idea.status === "active"
                    ? "bg-green-100 text-green-700"
                    : idea.status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {idea.status}
              </span>

              <span className="text-xs text-gray-400">
                Added {idea.dateAdded}
              </span>
            </div>

            <Link
              href={`/fyp-ideas/${i}`}
              className="mt-4 inline-flex items-center text-[#00bb98] hover:text-[#00a385] font-medium text-sm"
            >
              View Details <FolderSymlink className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Upgrade Banner */}
      {plan === "Basic" && (
        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-[#00bb98]/10 to-[#00d4ae]/10 text-gray-700 border border-[#00bb98]/20 text-center">
          <p className="font-medium mb-2">
            🔒 You’ve reached your Basic plan limit (9 bookmarks)
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
