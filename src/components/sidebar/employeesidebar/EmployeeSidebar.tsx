"use client";
import { useState, useEffect, useRef, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  MapPin,
  Layers,
  FileText,
  Droplet,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import EmployeeDashboard from "@/components/dashboard/employee/Dashboard";
import EmployeeResume from "@/components/dashboard/employee/EmployeeResume";
import EmployeeResumeBuilder from "@/components/dashboard/employee/EmployeeResumeBuilder";
import BookMarkJobs from "@/components/dashboard/employee/BookMarkJobs";
import Image from "next/image";

interface Stage {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  locked?: boolean;
}

export default function EmployeeSidebar(): ReactElement {
  const { logout } = useAuth();
  const [selected, setSelected] = useState<string>("Dashboard Overview");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserEmail(parsed.email);
      } catch {
        setUserEmail(null);
      }
    }
  }, []);

  // ✅ Handle outside click for profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const stages: Stage[] = [
    { name: "Dashboard Overview", icon: Layers, color: "emerald" },
    { name: "Resume Forge", icon: FileText, color: "emerald" },
    { name: "Resume Builder", icon: MapPin, color: "emerald" },
    { name: "Saved Opportunities", icon: Droplet, color: "emerald" },
  ];

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white">
      {/* ✅ Sidebar - fixed height and scrollable independently */}
      <aside className="w-80 bg-gradient-to-br from-slate-50 via-white to-slate-50 border-r border-slate-200 shadow-xl flex flex-col">
        {/* Logo Section */}
        <div className="px-6 py-4 border-b border-slate-200 bg-white">
          <Link href="/" className="flex justify-center">
           <Image
  src="/logo5.png"
  alt="Logo"
  width={200}  // approximate value, you can adjust
  height={52}  // ~ matches h-13 ≈ 52px
  className="h-[52px] w-auto object-contain transition-transform duration-300 hover:scale-105"
/>
          </Link>
        </div>

        {/* ✅ Navigation Section - Scrollable only if overflow */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <div className="space-y-2">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              const isSelected = selected === stage.name;
              const isLocked = stage.locked;

              return (
                <button
                  key={index}
                  onClick={() => !isLocked && setSelected(stage.name)}
                  disabled={isLocked}
                  className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isLocked
                      ? "opacity-50 cursor-not-allowed bg-slate-100"
                      : isSelected
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-white/20"
                        : "bg-slate-200 group-hover:bg-emerald-100"
                    }`}
                  >
                    <StageIcon
                      className={`w-4 h-4 ${
                        isSelected
                          ? "text-white"
                          : "text-slate-600 group-hover:text-emerald-600"
                      }`}
                    />
                  </div>
                  <span>{stage.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* ✅ Footer / Logout Section */}
        {/* <div className="border-t border-slate-200 bg-white py-4 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:bg-red-50 w-full px-4 py-2 rounded-lg transition"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div> */}

        {/* Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        `}</style>
      </aside>

      {/* ✅ Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 shadow-lg flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{selected}</h1>
            <p className="text-emerald-50 text-sm">
              {selected === "Dashboard Overview"
                ? "Overview and insights"
                : selected === "Resume Forge"
                ? "Build and manage your resume"
                : selected === "Resume Builder"
                ? "Enhance your CV using AI"
                : "Save and manage your opportunities"}
            </p>
          </div>

          {/* Profile */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 bg-white text-green-900 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <User size={18} />
              <span className="text-sm">{userEmail || "User"}</span>
              <ChevronDown size={16} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-20">
                <button
                  type="button"
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings size={16} /> Settings
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            )}
            {/* )} */}
          </div>
        </header>

        {/* ✅ Main content (auto fills height with flex) */}
        <div className="flex-1 overflow-y-auto bg-white">
          {selected === "Dashboard Overview" && <EmployeeDashboard />}
          {selected === "Resume Forge" && <EmployeeResume />}
          {selected === "Resume Builder" && <EmployeeResumeBuilder />}
          {selected === "Saved Opportunities" && <BookMarkJobs />}
        </div>
      </main>
    </div>
  );
}
