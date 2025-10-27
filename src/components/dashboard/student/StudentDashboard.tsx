"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  GraduationCap,
  Brain,
  BookOpen,
  Clock,
  Lightbulb,
  TrendingUp,
  MessageCircle,
} from "lucide-react";

// =================== TYPES ===================
interface PerformanceData {
  month: string;
  progress: number;
}

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
const performanceData: PerformanceData[] = [
  { month: "Jan", progress: 40 },
  { month: "Feb", progress: 55 },
  { month: "Mar", progress: 65 },
  { month: "Apr", progress: 72 },
  { month: "May", progress: 81 },
  { month: "Jun", progress: 90 },
];

const projectIdeas: ProjectIdea[] = [
  {
    title: "AI-Powered Resume Analyzer",
    domain: "MERN + LangChain",
    status: "active",
  },
  {
    title: "Smart Waste Segregation System",
    domain: "IoT + ML",
    status: "in-progress",
  },
  {
    title: "Plant-Based Protein Analysis",
    domain: "Food Biotechnology",
    status: "completed",
  },
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
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Student Dashboard
      </h1> */}

      {/* ====== STATS CARDS ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-2xl shadow-lg flex items-center gap-4">
          <GraduationCap className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Overall Progress</p>
            <h2 className="text-3xl font-semibold">90%</h2>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg flex items-center gap-4">
          <Brain className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Active Modules</p>
            <h2 className="text-3xl font-semibold">3</h2>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-2xl shadow-lg flex items-center gap-4">
          <Lightbulb className="w-10 h-10" />
          <div>
            <p className="text-sm opacity-80">Project Ideas</p>
            <h2 className="text-3xl font-semibold">{projectIdeas.length}</h2>
          </div>
        </div>
      </div>

      {/* ====== PERFORMANCE CHART ====== */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#00bb98]" /> Performance Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="progress"
              stroke="#00bb98"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Performance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ====== GRID SECTIONS ====== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Final Year Project Ideas */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Lightbulb className="text-[#00bb98]" /> Active Final Year Ideas
          </h2>
          <ul className="space-y-4">
            {projectIdeas.map((idea, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b border-gray-100 pb-3"
              >
                <div>
                  <p className="font-semibold text-gray-800">{idea.title}</p>
                  <p className="text-sm text-gray-500">{idea.domain}</p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    idea.status === "active"
                      ? "bg-green-100 text-green-700"
                      : idea.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {idea.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-[#00bb98]" /> Upcoming Deadlines
          </h2>
          <ul className="space-y-4">
            {deadlines.map((d, i) => (
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
    </div>
  );
}
