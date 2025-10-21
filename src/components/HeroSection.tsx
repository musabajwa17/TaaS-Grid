"use client";
import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Brain,
  Users,
  Rocket,
  Lightbulb,
  GitBranch,
  FileText,
  GraduationCap,
  Zap,
  Handshake,
  FolderSymlink,
  RocketIcon,
  NotepadText,
  Star,
  TrendingUp,
} from "lucide-react";

const modules = [
  {
    name: "HireConnect",
    color: "from-blue-600 to-blue-700",
    icon: <Handshake className="w-10 h-10 text-white" />,
    angle: 0,
    content: {
      title1: "Job Posting",
      title2: "Job Search & Filters",
      title3: "Application Tracking",
      title4: "Shortlisting Tools",
      title5: "Interview Scheduling",
      title6: "Employer Dashboard",
      description:
        "Bridge the gap between talent and opportunity with AI-powered matching",
      lucideIcon: Briefcase,
      buttonPrimary: "Find Talent",
      buttonSecondary: "Post Jobs",
    },
    keywords: "Job Posting & Hiring",
  },
  {
    name: "FYP Bridge",
    color: "from-yellow-500 to-amber-500",
    icon: <FolderSymlink className="w-10 h-10 text-white" />,
    angle: 45,
    content: {
      title1: "Project Selection",
      title2: "Mentor Assign",
      title3: "Progress Tracking",
      title4: "Submission Portal",
      title5: "Project Submission",
      title6: "Feedback & Evaluation",
      description:
        "Connect final year projects with industry needs and real-world solutions",
      lucideIcon: GitBranch,
      buttonPrimary: "Explore Projects",
      buttonSecondary: "Submit FYP",
    },
    keywords: "Industry-Sponsored Final Year Projects",
  },
  {
    name: "Idea Vault",
    color: "from-blue-600 to-blue-700",
    icon: <Lightbulb className="w-10 h-10 text-white" />,
    angle: 90,
    content: {
      title1: "Idea Submission",
      title2: "Idea Categories & Tags",
      title3: "Student Browse & Ideas",
      title4: "Collaboration Requests",
      title5: "Voting / Rating System",
      title6: "Idea-to-Project Conversion",
      description:
        "Secure your innovations and transform ideas into market-ready solutions",
      lucideIcon: Lightbulb,
      buttonPrimary: "Submit Ideas",
      buttonSecondary: "Browse Vault",
    },
    keywords: "FYP Idea Bank",
  },
  {
    name: "ProjectHub",
    color: "from-yellow-500 to-amber-500",
    icon: <RocketIcon className="w-10 h-10 text-white" />,
    angle: 135,
    content: {
      title1: "Project Posting",
      title2: "Bidding System",
      title3: "Proposal Submission",
      title4: "Contracting & Escrow Payments",
      title5: "Project Progress Tracking",
      title6: "Review & Rating",
      description:
        "Centralized hub for managing student projects with industry mentorship",
      lucideIcon: Rocket,
      buttonPrimary: "Start Project",
      buttonSecondary: "View Hub",
    },
    keywords: "Commercial Projects",
  },
  {
    name: "CV Forge",
    color: "from-blue-600 to-blue-700",
    icon: <NotepadText className="w-10 h-10 text-white" />,
    angle: 180,
    content: {
      title1: "CV Templates",
      title2: "Skill-Based Sections",
      title3: "Cover Letter Generator",
      title4: "Porfolio/Project Showcase",
      title5: "Export to PDF",
      title6: "One-Click Apply",
      description:
        "AI-powered resume builder that highlights your skills for employers",
      lucideIcon: FileText,
      buttonPrimary: "Create CV",
      buttonSecondary: "View Templates",
    },
    keywords: "CV Builder",
  },
  {
    name: "TalentMatch AI",
    color: "from-yellow-500 to-amber-500",
    icon: <Star className="w-10 h-10 text-white" />,
    angle: 225,
    content: {
      title1: "CV Upload & Parsing",
      title2: "Skill Extraction",
      title3: "Auto-Match",
      title4: "Recommandations",
      title5: "Scoring System",
      title6: "Career Path Suggestions",
      description:
        "Intelligent algorithms matching candidates with perfect-fit opportunities",
      lucideIcon: Zap,
      buttonPrimary: "Get Matched",
      buttonSecondary: "See Matches",
    },
    keywords: "Smart CV Analyzer & Matching",
  },
  {
    name: "SkillBoost Pro",
    color: "from-blue-600 to-blue-700",
    icon: <TrendingUp className="w-10 h-10 text-white" />,
    angle: 270,
    content: {
      title1: "Employer Training",
      title2: "Custom Course Builder",
      title3: "Trainer Onboarding",
      title4: "Learning Management Dashboard",
      title5: "Employee Progress Tracking",
      title6: "Certification & Reporting",
      description:
        "Professional development programs tailored to industry demands",
      lucideIcon: Brain,
      buttonPrimary: "Start Learning",
      buttonSecondary: "View Courses",
    },
    keywords: "Corporate Training",
  },
  {
    name: "LearnEdge",
    color: "from-yellow-500 to-amber-500",
    icon: <GraduationCap className="w-10 h-10 text-white" />,
    angle: 315,
    content: {
      title1: "Course Catalog",
      title2: "Skill Based Recommendations",
      title3: "Live / Recorded Classes",
      title4: "Practice Assignment & Quizzes",
      title5: "Discussions & Communities",
      title6: "Certificates & Badges",
      description:
        "Cutting-edge learning platform connecting education with career success",
      lucideIcon: GraduationCap,
      buttonPrimary: "Join Platform",
      buttonSecondary: "Explore Learning",
    },
    keywords: "Individual Training",
  },
];

export default function HeroSection() {
  const [activeModule, setActiveModule] = useState(0);
  const [poppedModules, setPoppedModules] = useState<number[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => {
        setPoppedModules((prevPopped) => [...prevPopped, prev]);
        setTimeout(() => {
          setPoppedModules((prevPopped) =>
            prevPopped.filter((m) => m !== prev)
          );
        }, 3000);
        return (prev + 1) % modules.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []); // run once on mount

  const getPosition = (index: number) => {
    const angle = (modules[index].angle - 90) * (Math.PI / 180);
    const radius = 220;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const activeContent = modules[activeModule].content;
  const ActiveIcon = activeContent.lucideIcon;
  const isBlueModule = modules[activeModule].color.includes("blue");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden mt-10">
      {/* Hexagonal Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexagons"
              width="100"
              height="86.6"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Animated Network Dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div
        className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 py-10 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
          {/* Left Content - Dynamic based on active module */}
          <div className="space-y-8 mx-8">
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                {/* Dynamic Title 1 */}
                <div
                  key={`title1-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10 "
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600 " : "text-blue-700"
                    }`}
                  >
                    {activeContent.title1}
                  </h2>
                </div>

                {/* Dynamic Title 2 */}
                <div
                  key={`title2-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0.15s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600 " : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600 " : "text-blue-700"
                    }`}
                  >
                    {activeContent.title2}
                  </h2>
                </div>

                {/* Dynamic Title 3 */}
                <div
                  key={`title3-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10 " : "bg-blue-600/10"
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600 " : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600" : " text-blue-700"
                    }`}
                  >
                    {activeContent.title3}
                  </h2>
                </div>
                <div
                  key={`title4-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10 " : "bg-blue-600/10"
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600 " : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600" : " text-blue-700"
                    }`}
                  >
                    {activeContent.title4}
                  </h2>
                </div>
                <div
                  key={`title5-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10 " : "bg-blue-600/10"
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600 " : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600" : " text-blue-700"
                    }`}
                  >
                    {activeContent.title5}
                  </h2>
                </div>
                <div
                  key={`title6-${activeModule}`}
                  className="flex items-center gap-4 animate-slideInLeft"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div
                    className={`p-3 rounded-2xl transition-colors duration-500 ${
                      isBlueModule ? "bg-yellow-500/10 " : "bg-blue-600/10"
                    }`}
                  >
                    <ActiveIcon
                      className={`w-6 h-6 transition-colors duration-500 ${
                        isBlueModule ? "text-yellow-600 " : "text-blue-600"
                      }`}
                    />
                  </div>
                  <h2
                    className={`text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600" : " text-blue-700"
                    }`}
                  >
                    {activeContent.title6}
                  </h2>
                </div>
              </div>
              <p
                key={`desc-${activeModule}`}
                className={`text-lg leading-relaxed max-w-xl animate-slideInLeft font-medium transition-all duration-500 ${
                  isBlueModule ? "text-yellow-600" : " text-blue-700"
                }`}
                style={{ animationDelay: "0.45s" }}
              >
                {activeContent.description}
              </p>
            </div>

            {/* Dynamic Buttons */}
            <div
              key={`buttons-${activeModule}`}
              className="flex flex-wrap gap-4 animate-slideInLeft"
              style={{ animationDelay: "0.6s" }}
            >
              <button
                className={`group px-8 py-2 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 ${
                  isBlueModule
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-600 hover:bg-blue-700 "
                }`}
              >
                {activeContent.buttonPrimary}
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </button>

              <button
                className={`group px-8 py-2 bg-white rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 ${
                  isBlueModule
                    ? "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                    : "border-blue-600 text-blue-600 hover:bg-blue-50 "
                }`}
              >
                {activeContent.buttonSecondary}
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right Side - Circular Module Layout */}
          <div className="relative flex items-center justify-center h-[650px]">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Center Circle - Domains Included */}
              <div className="absolute z-30 w-45 h-45 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex items-center justify-center">
                <div className="text-center rounded-full overflow-hidden w-full h-full">
                  <img
                    src="/logo3.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Orbital Rings */}
              <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-blue-200/50"></div>
              <div className="absolute w-[520px] h-[520px] rounded-full border border-blue-100/30"></div>

              {/* Circular Modules */}
              {modules.map((module, index) => {
                const pos = getPosition(index);
                const isActive = activeModule === index;
                const isPopped = poppedModules.includes(index);

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-700 cursor-pointer"
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${
                        isPopped ? 1.2 : 0.9
                      })`,
                      zIndex: isPopped ? 25 : 18,
                    }}
                    onClick={() => setActiveModule(index)}
                  >
                    {/* Module Card with Enhanced Effects */}
                    <div
                      className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${
                        module.color
                      } shadow-2xl hover:shadow-3xl transition-all duration-700 flex flex-col items-center justify-center group overflow-hidden border-4 border-white/20
                      ${isPopped ? "animate-popBounce" : ""}`}
                    >
                      {/* Shine Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-all duration-1000 ${
                          isPopped
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-full"
                        }`}
                      ></div>

                      <div className="relative z-10 text-center">
                        <div
                          className={`text-5xl mb-2 flex justify-center transition-all duration-700 drop-shadow-2xl ${
                            isPopped ? "scale-125 rotate-12" : "scale-100"
                          }`}
                        >
                          {module.icon}
                        </div>
                        <p className="text-white font-bold text-sm px-2 leading-tight drop-shadow-lg">
                          {module.name}
                        </p>
                        <p className="text-white text-xs px-2 leading-tight drop-shadow-lg">
                          {module.keywords}
                        </p>
                      </div>

                      {/* Multiple Pulse Rings when Popped */}
                      {isPopped && (
                        <>
                          <div className="absolute inset-0 animate-pingRing"></div>
                          <div
                            className="absolute inset-0 animate-pingRing"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </>
                      )}
                    </div>

                    {/* Enhanced Side Label with Dot */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                      style={{
                        left: pos.x > 0 ? "100%" : "auto",
                        right: pos.x < 0 ? "100%" : "auto",
                        marginLeft: pos.x > 0 ? "12px" : "0",
                        marginRight: pos.x < 0 ? "12px" : "0",
                      }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full transition-all duration-700 ${
                          isActive
                            ? "bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50 scale-125"
                            : "bg-blue-400/50"
                        }`}
                      ></div>
                      <div
                        className={`h-px w-6 transition-all duration-700 ${
                          isActive
                            ? "bg-yellow-400 shadow-sm shadow-yellow-400"
                            : "bg-blue-400/50"
                        }`}
                      ></div>
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
            transform: translateX(-80px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popBounce {
          0% {
            transform: scale(0.8);
          }
          60% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes pingRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slowSpinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-popBounce {
          animation: popBounce 1.2s cubic-bezier(0.24, 1.12, 0.48, 0.8);
        }

        .animate-pingRing {
          animation: pingRing 1.2s cubic-bezier(0.4, 0, 0.6, 1);
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-slowSpin {
          animation: slowSpin 30s linear infinite;
        }

        .animate-slowSpinReverse {
          animation: slowSpinReverse 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
