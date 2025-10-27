"use client";

import React from "react";
import {
  GraduationCap,
  Brain,
  BookOpen,
  FileText,
  ChevronRight,
  Clock,
  Lightbulb,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Shield,
  Rocket,
  Award,
} from "lucide-react";
import Link from "next/link";

// =================== TYPES ===================
interface ProjectIdea {
  title: string;
  domain: string;
  status: "active" | "in-progress" | "completed";
}

interface Module {
  title: string;
  category: string;
  progress: number;
}

interface Deadline {
  task: string;
  due: string;
}

// =================== DUMMY DATA ===================
const projectIdeas: ProjectIdea[] = [
  { title: "AI-Powered Resume Analyzer", domain: "MERN + LangChain", status: "active" },
  { title: "Smart Waste Segregation System", domain: "IoT + ML", status: "in-progress" },
  { title: "Plant-Based Protein Analysis", domain: "Food Biotechnology", status: "completed" },
];

const modules: Module[] = [
  { title: "MERN Stack Development", category: "Web", progress: 80 },
  { title: "AI Chatbot using LangChain", category: "AI/ML", progress: 60 },
  { title: "Research Paper Writing", category: "Academics", progress: 45 },
];

const deadlines: Deadline[] = [
  { task: "Submit Project Synopsis", due: "Tomorrow" },
  { task: "AI Module Integration", due: "Nov 2" },
  { task: "Viva Presentation", due: "Nov 10" },
];

// =================== COMPONENT ===================
export default function StudentDashboard() {
  let plan: "Basic" | "Premium" = "Basic"; // can be dynamically fetched later

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ====== HERO HEADER ====== */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, <span className="text-[#00bb98]">Student</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your projects, skills, and progress — all in one place.
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

      {/* ====== STATS CARDS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-2xl shadow-lg flex items-center gap-4">
          <GraduationCap className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Overall Learning Progress</p>
            <h2 className="text-3xl font-semibold">90%</h2>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg flex items-center gap-4">
          <Brain className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Active Learning Modules</p>
            <h2 className="text-3xl font-semibold">3</h2>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl shadow-lg flex items-center gap-4">
          <Lightbulb className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Project Ideas in Progress</p>
            <h2 className="text-3xl font-semibold">{projectIdeas.length}</h2>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg flex items-center gap-4">
          <Award className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Certifications Earned</p>
            <h2 className="text-3xl font-semibold">4</h2>
          </div>
        </div>
      </div>

      {/* ====== FEATURE MODULES ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        {/* --- CV Parser & Builder --- */}
        <FeatureCard
          icon={<FileText className="w-6 h-6 text-emerald-600" />}
          title="AI Resume Parser & Builder"
          color="emerald"
          desc="Build an optimized, ATS-friendly resume in minutes using AI-powered parsing and formatting."
          href="/cv-builder"
          linkText="Get Started"
        />

        {/* --- Project Ideas --- */}
        <FeatureCard
          icon={<Lightbulb className="w-6 h-6 text-indigo-600" />}
          title="Final Year Project Ideas"
          color="indigo"
          desc="Get trending, domain-specific project ideas powered by AI and research recommendations."
          href="/fyp-ideas"
          linkText="Explore Ideas"
        />

        {/* --- Training Programs --- */}
        <FeatureCard
          icon={<Rocket className="w-6 h-6 text-pink-600" />}
          title="Student Training & Internships"
          color="pink"
          desc="Enroll in AI, Web Dev, and Research training programs to enhance your professional profile."
          href="/training"
          linkText="View Trainings"
        />
      </div>

      {/* ====== PROJECT IDEAS + DEADLINES ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Final Year Project Ideas */}
        <DataSection
          icon={<Lightbulb className="text-[#00bb98]" />}
          title="Active Final Year Ideas"
          items={projectIdeas.map((idea, i) => ({
            title: idea.title,
            subtitle: idea.domain,
            status: idea.status,
          }))}
        />

        {/* Upcoming Deadlines */}
        <DeadlineSection
          icon={<Clock className="text-[#00bb98]" />}
          title="Upcoming Deadlines"
          data={deadlines}
        />
      </div>

      {/* ====== LEARNING MODULES ====== */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="text-[#00bb98]" /> Recent Learning Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{m.title}</p>
              <p className="text-sm text-gray-500 mb-2">{m.category}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-[#00bb98] rounded-full"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{m.progress}% completed</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====== UPGRADE CTA ====== */}
      {plan === "Basic" && (
        <div className="mt-10 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Upgrade to Premium 🚀</h2>
            <p className="text-white/90 mt-2 text-sm">
              Unlock unlimited AI tools, personalized mentorship, and advanced project tracking.
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

// =================== SMALL COMPONENTS ===================
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

const DataSection = ({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { title: string; subtitle: string; status: string }[];
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              item.status === "active"
                ? "bg-green-100 text-green-700"
                : item.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {item.status}
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
