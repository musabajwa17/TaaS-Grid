"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  BarChart3,
  FileText,
  PlusCircle,
  Lightbulb,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function CompanyDashboard() {
  const plan = "Basic";
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const companyString = localStorage.getItem("company");
    if (companyString) {
      try {
        const company = JSON.parse(companyString);
        setCompanyName(company.companyName?.toUpperCase() || "");
      } catch (error) {
        console.error("Failed to parse company from localStorage", error);
      }
    }
  }, []);

 const [analytics, setAnalytics] = useState([
    { metric: "Total Internships", value: "-", growth: "+0%" },
    { metric: "Total Jobs", value: "-", growth: "+0%" },
    { metric: "FYP Ideas Shared", value: "-", growth: "+0%" },
  ]);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const company = JSON.parse(localStorage.getItem("company"));
      console.log(company)
      if (!company || !company._id) return;
   
      const res = await axios.get(`http://localhost:3001/api/company/${company._id}/dashboard`)
      console.log(res)
      if (res.data.success) {
        const { counts, topJobs } = res.data.data;

        setAnalytics([
          { metric: "Total Internships", value: counts.internships, growth: "+12%" },
          { metric: "Total Jobs", value: counts.jobs, growth: "+8%" },
          { metric: "FYP Ideas Shared", value: counts.fyps, growth: "+15%" },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

  const features = [
    {
      icon: <PlusCircle className="w-6 h-6 text-emerald-600" />,
      title: "Post Internship",
      color: "emerald",
      desc: "Create and publish internship opportunities instantly.",
      href: "/company/post-internship",
      linkText: "Post Internship",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-indigo-600" />,
      title: "Post Job",
      color: "indigo",
      desc: "Offer job opportunities and attract top talent.",
      href: "/company/post-job",
      linkText: "Post Job",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-orange-600" />,
      title: "FYP Ideas",
      color: "orange",
      desc: "Share innovative project ideas with universities and students.",
      href: "/company/fyp-ideas",
      linkText: "View Ideas",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-pink-600" />,
      title: "Analytics",
      color: "pink",
      desc: "Monitor engagement and response rates easily.",
      href: "/company/analytics",
      linkText: "View Stats",
    },
  ];

  const jobPosts = [
    { title: "React Developer", applicants: 35, status: "active" },
    { title: "AI Engineer", applicants: 21, status: "closed" },
  ];

  const internshipPosts = [
    { title: "Frontend Intern", applicants: 14, status: "active" },
    { title: "Data Science Intern", applicants: 8, status: "active" },
  ];

  const fypIdeas = [
    { title: "Smart Farming System", field: "IoT & AI", status: "open" },
    { title: "AI Resume Analyzer", field: "Machine Learning", status: "open" },
    { title: "Blockchain Voting App", field: "Blockchain", status: "review" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-[#00bb98]">{companyName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage internships, jobs, and share FYP ideas with universities.
          </p>
        </div>
        <div
          className={`px-5 py-2 rounded-full font-semibold text-sm mt-4 md:mt-0 shadow-sm ${
            plan === "Premium"
              ? "bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}
        >
          {plan === "Premium" ? "🌟 Premium Plan Active" : "Basic Plan"}
        </div>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        analytics.map((a, i) => (
          <StatCard
            key={i}
            icon={<BarChart3 className="w-10 h-10" />}
            title={a.metric}
            value={a.value}
            subtitle={a.growth}
            gradient="from-[#00bb98] to-[#00d4ae]"
          />
        ))
      )}
    </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-10">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>

      {/* JOBS + INTERNSHIPS + FYP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PostSection icon={<Briefcase className="text-[#00bb98]" />} title="Job Posts" posts={jobPosts} />
        <PostSection icon={<FileText className="text-[#00bb98]" />} title="Internships" posts={internshipPosts} />
        <FypSection icon={<Lightbulb className="text-[#00bb98]" />} title="FYP Ideas" ideas={fypIdeas} />
      </div>
    </div>
  );
}

// ===== SMALL COMPONENTS =====

const StatCard = ({ icon, title, value, subtitle, gradient }) => (
  <div
    className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-lg flex items-center gap-4`}
  >
    {icon}
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-semibold">{value}</h2>
      <p className="text-xs opacity-80 mt-1">{subtitle} this month</p>
    </div>
  </div>
);

// export default StatCard;


const FeatureCard = ({ icon, title, color, desc, href, linkText }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className={`bg-${color}-100 p-3 rounded-xl`}>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
    <Link href={href} className={`inline-flex items-center text-${color}-600 hover:text-${color}-700 font-medium text-sm`}>
      {linkText} <ChevronRight className="ml-1 w-4 h-4" />
    </Link>
  </div>
);

const PostSection = ({ icon, title, posts }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {posts.map((p, i) => (
        <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <p className="font-semibold text-gray-800">{p.title}</p>
            <p className="text-sm text-gray-500">{p.applicants} applicants</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              p.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {p.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const FypSection = ({ icon, title, ideas }) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {ideas.map((idea, i) => (
        <li key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <p className="font-semibold text-gray-800">{idea.title}</p>
            <p className="text-sm text-gray-500">{idea.field}</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              idea.status === "open"
                ? "bg-blue-100 text-blue-700"
                : idea.status === "review"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {idea.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);