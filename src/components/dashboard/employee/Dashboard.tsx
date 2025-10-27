"use client";

import React from "react";
import {
  Briefcase,
  FileText,
  Bookmark,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle,
  ChevronRight,
  Brain,
  Award,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

interface Job {
  title: string;
  company: string;
  status: "open" | "applied" | "closed";
}

interface SkillProgress {
  skill: string;
  level: number;
}

interface Deadline {
  task: string;
  due: string;
}

export default function EmployeeDashboard() {
  let plan: "Basic" | "Premium" = "Basic";

  // Dummy Data
  const jobs: Job[] = [
    { title: "Frontend Developer (React)", company: "Techify Labs", status: "open" },
    { title: "Backend Engineer (Node.js)", company: "InnovaSoft", status: "applied" },
    { title: "AI Engineer", company: "CognitiveX", status: "closed" },
  ];

  const skills: SkillProgress[] = [
    { skill: "React + Next.js", level: 75 },
    { skill: "Node.js + Express", level: 65 },
    { skill: "AI Resume Optimization", level: 45 },
  ];

  const deadlines: Deadline[] = [
    { task: "Submit Resume for Techify Labs", due: "Tomorrow" },
    { task: "Interview (InnovaSoft)", due: "Nov 3" },
    { task: "Update LinkedIn Portfolio", due: "Nov 5" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, <span className="text-[#00bb98]">Professional</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your career progress, job applications, and AI-enhanced resume tools.
          </p>
        </div>
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

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<Briefcase className="w-10 h-10" />}
          title="Active Job Applications"
          value="3"
          gradient="from-[#00bb98] to-[#00d4ae]"
        />
        <StatCard
          icon={<Brain className="w-10 h-10" />}
          title="Profile Strength"
          value="82%"
          gradient="from-blue-500 to-indigo-600"
        />
        <StatCard
          icon={<Bookmark className="w-10 h-10" />}
          title="Saved Jobs"
          value="6"
          gradient="from-orange-500 to-pink-500"
        />
        <StatCard
          icon={<Award className="w-10 h-10" />}
          title="Certifications"
          value="2"
          gradient="from-purple-500 to-blue-500"
        />
      </div>

      {/* ===== FEATURES ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <FeatureCard
          icon={<FileText className="w-6 h-6 text-emerald-600" />}
          title="AI Resume Parser"
          color="emerald"
          desc="Extract, analyze, and structure your resume for better job matching and visibility."
          href="/resume-parser"
          linkText="Upload Resume"
        />
        <FeatureCard
          icon={<TrendingUp className="w-6 h-6 text-indigo-600" />}
          title="Smart Job Recommendations"
          color="indigo"
          desc="Get AI-suggested jobs tailored to your skills and career growth."
          href="/job-recommendations"
          linkText="View Jobs"
        />
        <FeatureCard
          icon={<Sparkles className="w-6 h-6 text-pink-600" />}
          title="CV Enrichment (Premium)"
          color="pink"
          desc="Upgrade your CV with skill gaps filled, keyword optimization, and role-fit alignment."
          href={plan === "Basic" ? "/upgrade" : "/cv-enrichment"}
          linkText={plan === "Basic" ? "Upgrade for Access" : "Enrich CV"}
        />
      </div>

      {/* ===== JOBS + DEADLINES ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobListSection
          icon={<Briefcase className="text-[#00bb98]" />}
          title="Recommended Jobs"
          jobs={jobs}
        />
        <DeadlineSection
          icon={<Clock className="text-[#00bb98]" />}
          title="Upcoming Deadlines"
          data={deadlines}
        />
      </div>

      {/* ===== SKILL PROGRESS ===== */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Lightbulb className="text-[#00bb98]" /> Skill Progress Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{s.skill}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 bg-[#00bb98] rounded-full"
                  style={{ width: `${s.level}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{s.level}% proficiency</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PREMIUM UPGRADE CTA ===== */}
      {plan === "Basic" && (
        <div className="mt-10 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Upgrade to Premium 🚀</h2>
            <p className="text-white/90 mt-2 text-sm">
              Unlock Smart Job Matching, AI-driven CV Enrichment, and Personalized Career Insights.
            </p>
          </div>
          <Link
            href="/upgrade"
            className="mt-4 md:mt-0 px-6 py-2 bg-white text-[#00bb98] font-semibold rounded-xl shadow hover:bg-gray-100"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
}

// ===== REUSABLE SMALL COMPONENTS =====

const StatCard = ({
  icon,
  title,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  gradient: string;
}) => (
  <div
    className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-lg flex items-center gap-4`}
  >
    {icon}
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-semibold">{value}</h2>
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  color,
  desc,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  desc: string;
  href: string;
  linkText: string;
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className={`bg-${color}-100 p-3 rounded-xl`}>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
    <Link
      href={href}
      className={`inline-flex items-center text-${color}-600 hover:text-${color}-700 font-medium text-sm`}
    >
      {linkText} <ChevronRight className="ml-1 w-4 h-4" />
    </Link>
  </div>
);

const JobListSection = ({
  icon,
  title,
  jobs,
}: {
  icon: React.ReactNode;
  title: string;
  jobs: Job[];
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {jobs.map((job, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{job.title}</p>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              job.status === "open"
                ? "bg-green-100 text-green-700"
                : job.status === "applied"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const DeadlineSection = ({
  icon,
  title,
  data,
}: {
  icon: React.ReactNode;
  title: string;
  data: Deadline[];
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {data.map((d, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-3"
        >
          <p className="font-medium text-gray-700">{d.task}</p>
          <span className="text-sm text-gray-500">{d.due}</span>
        </li>
      ))}
    </ul>
  </div>
);
