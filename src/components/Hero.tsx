"use client"
import React, { useState, useEffect } from 'react';
import { Briefcase, Search, FileCheck, Calendar, LayoutDashboard, Rocket, Users, GitBranch, Trophy, Lightbulb, MessageSquare, ThumbsUp, DollarSign, FileText, Shield, Star, Upload, Target, TrendingUp, BookOpen, Video, Award, GraduationCap, Presentation, Code, UserCheck, ClipboardList, BarChart } from 'lucide-react';

const modules = [
  { 
    name: "HireConnect", 
    color: "from-blue-600 to-blue-700", 
    iconEmoji: "🤝", 
    angle: 0,
    title: "Job Posting & Hiring",
    subtitle: "Where employers post and candidates get hired",
    features: [
      { text: "Job Posting", icon: Briefcase },
      { text: "Job Search & Filters", icon: Search },
      { text: "Application Tracking", icon: FileCheck },
      { text: "Shortlisting Tools", icon: UserCheck },
      { text: "Interview Scheduling", icon: Calendar },
      { text: "Employer Dashboard", icon: LayoutDashboard }
    ],
    accentColor: "blue",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent"
  },
  { 
    name: "FYP Bridge", 
    color: "from-yellow-500 to-amber-500", 
    iconEmoji: "🌉", 
    angle: 45,
    title: "Industry-Sponsored FYPs",
    subtitle: "Linking industry challenges with student projects",
    features: [
      { text: "Industry Project Submission", icon: Rocket },
      { text: "Student Project Selection", icon: ClipboardList },
      { text: "Mentor Assignment", icon: Users },
      { text: "Progress Tracking", icon: BarChart },
      { text: "Deliverable Submission", icon: FileText },
      { text: "Feedback & Evaluation", icon: Trophy }
    ],
    accentColor: "yellow",
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent"
  },
  { 
    name: "IdeaVault", 
    color: "from-blue-700 to-blue-800", 
    iconEmoji: "💡", 
    angle: 90,
    title: "FYP Idea Bank",
    subtitle: "A repository of project ideas for students",
    features: [
      { text: "Idea Submission", icon: Lightbulb },
      { text: "Categories & Tags", icon: GitBranch },
      { text: "Browse & Save Ideas", icon: Search },
      { text: "Collaboration Requests", icon: MessageSquare },
      { text: "Voting System", icon: ThumbsUp },
      { text: "Idea-to-Project Conversion", icon: Rocket }
    ],
    accentColor: "blue",
    gradient: "from-blue-600/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "ProjectHub", 
    color: "from-yellow-600 to-amber-600", 
    iconEmoji: "🚀", 
    angle: 135,
    title: "Commercial Projects",
    subtitle: "Marketplace for outsourcing projects",
    features: [
      { text: "Project Posting", icon: Presentation },
      { text: "Bidding System", icon: DollarSign },
      { text: "Proposal Submission", icon: FileText },
      { text: "Secure Contracting", icon: Shield },
      { text: "Progress Tracking", icon: TrendingUp },
      { text: "Review & Ratings", icon: Star }
    ],
    accentColor: "yellow",
    gradient: "from-amber-600/20 via-yellow-500/10 to-transparent"
  },
  { 
    name: "CV Forge", 
    color: "from-blue-600 to-blue-700", 
    iconEmoji: "📄", 
    angle: 180,
    title: "CV Builder",
    subtitle: "Crafting resumes that stand out",
    features: [
      { text: "Guided CV Templates", icon: FileText },
      { text: "Skill-Based Sections", icon: Code },
      { text: "Cover Letter Generator", icon: FileCheck },
      { text: "Portfolio Showcase", icon: LayoutDashboard },
      { text: "Export to PDF/Word", icon: Upload },
      { text: "One-Click Apply", icon: Target }
    ],
    accentColor: "blue",
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent"
  },
  { 
    name: "TalentMatch AI", 
    color: "from-yellow-500 to-amber-500", 
    iconEmoji: "⭐", 
    angle: 225,
    title: "Smart CV Analyzer",
    subtitle: "AI-powered CV analysis & automatic matching",
    features: [
      { text: "CV Upload & Parsing", icon: Upload },
      { text: "Skill Extraction", icon: Target },
      { text: "Auto-Match with Jobs/FYPs", icon: GitBranch },
      { text: "Personalized Recommendations", icon: Lightbulb },
      { text: "Scoring System", icon: Trophy },
      { text: "Career Path Suggestions", icon: TrendingUp }
    ],
    accentColor: "yellow",
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent"
  },
  { 
    name: "SkillBoost Pro", 
    color: "from-blue-700 to-blue-800", 
    iconEmoji: "📈", 
    angle: 270,
    title: "Corporate Training",
    subtitle: "Company-led upskilling for employees",
    features: [
      { text: "Training Requests", icon: Briefcase },
      { text: "Custom Course Builder", icon: BookOpen },
      { text: "Trainer Onboarding", icon: UserCheck },
      { text: "Progress Tracking", icon: BarChart },
      { text: "Employee Management", icon: Users },
      { text: "Certification & Reporting", icon: Award }
    ],
    accentColor: "blue",
    gradient: "from-blue-600/20 via-blue-500/10 to-transparent"
  },
  { 
    name: "LearnEdge", 
    color: "from-yellow-600 to-amber-600", 
    iconEmoji: "🎓", 
    angle: 315,
    title: "Individual Training",
    subtitle: "Students and job seekers upskill themselves",
    features: [
      { text: "Course Catalog", icon: BookOpen },
      { text: "Skill Recommendations", icon: Target },
      { text: "Live/Recorded Classes", icon: Video },
      { text: "Practice Assignments", icon: ClipboardList },
      { text: "Peer Communities", icon: MessageSquare },
      { text: "Certificates & Badges", icon: Award }
    ],
    accentColor: "yellow",
    gradient: "from-amber-600/20 via-yellow-500/10 to-transparent"
  }
];

export default function HeroSection() {
  const [activeModule, setActiveModule] = useState(0);
  const [poppedModules, setPoppedModules] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % 8);
      setPoppedModules(prev => [...prev, activeModule]);
      setTimeout(() => {
        setPoppedModules(prev => prev.filter(m => m !== activeModule));
      }, 800);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeModule]);

  const getPosition = (index: number) => {
    const angle = (modules[index].angle - 90) * (Math.PI / 180);
    const radius = 220;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  const currentModule = modules[activeModule];
  const isBlue = currentModule.accentColor === "blue";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${currentModule.gradient} rounded-full blur-3xl animate-pulse transition-all duration-1000`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl ${currentModule.gradient} rounded-full blur-3xl animate-pulse transition-all duration-1000`} style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-10" key={activeModule}>
            {/* Module Header with animated background */}
            <div className={`relative p-8 rounded-3xl bg-gradient-to-br ${currentModule.gradient} backdrop-blur-xl border border-white/10 animate-slideInLeft overflow-hidden group`}>
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative flex items-start gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${currentModule.color} shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <span className="text-5xl">{currentModule.iconEmoji}</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-black text-white leading-tight mb-2 tracking-tight">
                    {currentModule.name}
                  </h2>
                  <p className={`text-lg font-semibold ${isBlue ? 'text-blue-400' : 'text-amber-400'}`}>
                    {currentModule.title}
                  </p>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                    {currentModule.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Features Grid with staggered animation */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white/80 animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentModule.features.map((feature, idx) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={idx}
                      className="group animate-slideInLeft"
                      style={{ animationDelay: `${0.15 + idx * 0.05}s` }}
                    >
                      <div className={`relative p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden`}>
                        {/* Hover glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${isBlue ? 'from-blue-500/10' : 'from-amber-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                        
                        <div className="relative flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isBlue ? 'bg-blue-500/20' : 'bg-amber-500/20'} group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-5 h-5 ${isBlue ? 'text-blue-400' : 'text-amber-400'}`} />
                          </div>
                          <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                            {feature.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Buttons with enhanced styling */}
            <div className="flex flex-wrap gap-4 animate-slideInLeft" style={{ animationDelay: "0.5s" }}>
              <button className={`group relative px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden bg-gradient-to-r ${currentModule.color}`}>
                <span className="relative z-10 flex items-center gap-3 text-white">
                  Explore {currentModule.name}
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>

              <button className={`group px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border-2 ${
                isBlue 
                  ? 'bg-blue-500/10 border-blue-400 text-blue-400 hover:bg-blue-500/20' 
                  : 'bg-amber-500/10 border-amber-400 text-amber-400 hover:bg-amber-500/20'
              }`}>
                <span className="flex items-center gap-3">
                  Learn More
                  <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Circular Module Layout */}
          <div className="relative flex items-center justify-center h-[650px]">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Center Circle - Domains Included */}
              <div className="absolute z-30 w-56 h-56 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex items-center justify-center border-4 border-white/20">
                <div className="text-center">
                  <h3 className="text-white font-extrabold text-3xl mb-1">Domains</h3>
                  <p className="text-yellow-400 font-bold text-2xl">Included</p>
                </div>
              </div>

              {/* Orbital Rings */}
              <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-white/10"></div>
              <div className="absolute w-[520px] h-[520px] rounded-full border border-white/5"></div>

              {/* Circular Modules */}
              {modules.map((module, index) => {
                const pos = getPosition(index);
                const isActive = activeModule === index;
                const isPopped = poppedModules.includes(index);
                
                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-500"
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${isPopped ? 1.3 : 1})`,
                      zIndex: isPopped ? 40 : 20,
                    }}
                  >
                    {/* Connection Line to Center */}
                    <div 
                      className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-blue-300/60 to-transparent"
                      style={{
                        height: '220px',
                        transformOrigin: '0 0',
                        transform: `rotate(${module.angle + 90}deg)`,
                        opacity: isActive ? 1 : 0.3
                      }}
                    ></div>

                    {/* Module Card */}
                    <div className={`relative w-36 h-36 rounded-3xl bg-gradient-to-br ${module.color} shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group overflow-hidden border-4 border-white/20
                      ${isPopped ? 'animate-popBounce' : ''}`}>
                      
                      {/* Shine Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transition-all duration-700 ${isPopped ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}></div>
                      
                      {/* Glow Effect when Active */}
                      {isActive && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
                      )}

                      <div className="relative z-10 text-center">
                        <div className={`text-5xl mb-2 transition-all duration-500 ${isPopped ? 'scale-125' : 'scale-100'}`}>
                          {module.iconEmoji}
                        </div>
                        <p className="text-white font-bold text-xs px-2 leading-tight drop-shadow-lg">
                          {module.name}
                        </p>
                      </div>

                      {/* Pulse Ring when Popped */}
                      {isPopped && (
                        <div className="absolute inset-0 rounded-3xl border-4 border-white animate-pingRing"></div>
                      )}
                    </div>

                    {/* Side Label with Dot */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                      style={{
                        left: pos.x > 0 ? '100%' : 'auto',
                        right: pos.x < 0 ? '100%' : 'auto',
                        marginLeft: pos.x > 0 ? '12px' : '0',
                        marginRight: pos.x < 0 ? '12px' : '0'
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-yellow-500 animate-pulse' : 'bg-blue-400'} transition-all duration-300`}></div>
                      <div className={`h-px w-6 ${isActive ? 'bg-yellow-500' : 'bg-blue-400'} transition-all duration-300`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @keyframes pingRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-popBounce {
          animation: popBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pingRing {
          animation: pingRing 0.8s cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </div>
  );
}