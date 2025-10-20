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
} from "lucide-react";

const modules = [
  {
    name: "HireConnect",
    color: "from-blue-600 to-blue-700",
    icon: "🤝",
    angle: 0,
    content: {
      title1: "Connect",
      title2: "Recruit",
      title3: "Hire Fast",
      description:
        "Bridge the gap between talent and opportunity with AI-powered matching",
      lucideIcon: Briefcase,
      buttonPrimary: "Find Talent",
      buttonSecondary: "Post Jobs",
    },
  },
  {
    name: "FYP Bridge",
    color: "from-yellow-500 to-amber-500",
    icon: "🌉",
    angle: 45,
    content: {
      title1: "Link Projects",
      title2: "Build Bridges",
      title3: "Launch Ideas",
      description:
        "Connect final year projects with industry needs and real-world solutions",
      lucideIcon: GitBranch,
      buttonPrimary: "Explore Projects",
      buttonSecondary: "Submit FYP",
    },
  },
  {
    name: "Idea Vault",
    color: "from-blue-700 to-blue-800",
    icon: "💡",
    angle: 90,
    content: {
      title1: "Innovate",
      title2: "Collaborate",
      title3: "Create Value",
      description:
        "Secure your innovations and transform ideas into market-ready solutions",
      lucideIcon: Lightbulb,
      buttonPrimary: "Submit Ideas",
      buttonSecondary: "Browse Vault",
    },
  },
  {
    name: "ProjectHub",
    color: "from-yellow-600 to-amber-600",
    icon: "🚀",
    angle: 135,
    content: {
      title1: "Manage",
      title2: "Track",
      title3: "Deliver Fast",
      description:
        "Centralized hub for managing student projects with industry mentorship",
      lucideIcon: Rocket,
      buttonPrimary: "Start Project",
      buttonSecondary: "View Hub",
    },
  },
  {
    name: "CV Forge",
    color: "from-blue-600 to-blue-700",
    icon: "📄",
    angle: 180,
    content: {
      title1: "Build CV",
      title2: "Stand Out",
      title3: "Get Hired",
      description:
        "AI-powered resume builder that highlights your skills for employers",
      lucideIcon: FileText,
      buttonPrimary: "Create CV",
      buttonSecondary: "View Templates",
    },
  },
  {
    name: "TalentMatch AI",
    color: "from-yellow-500 to-amber-500",
    icon: "⭐",
    angle: 225,
    content: {
      title1: "Match Smart",
      title2: "Hire Right",
      title3: "Grow Teams",
      description:
        "Intelligent algorithms matching candidates with perfect-fit opportunities",
      lucideIcon: Zap,
      buttonPrimary: "Get Matched",
      buttonSecondary: "See Matches",
    },
  },
  {
    name: "SkillBoost Pro",
    color: "from-blue-700 to-blue-800",
    icon: "📈",
    angle: 270,
    content: {
      title1: "Learn Fast",
      title2: "Skill Up",
      title3: "Excel Now",
      description:
        "Professional development programs tailored to industry demands",
      lucideIcon: Brain,
      buttonPrimary: "Start Learning",
      buttonSecondary: "View Courses",
    },
  },
  {
    name: "LearnEdge",
    color: "from-yellow-600 to-amber-600",
    icon: "🎓",
    angle: 315,
    content: {
      title1: "Study Smart",
      title2: "Master Skills",
      title3: "Lead Future",
      description:
        "Cutting-edge learning platform connecting education with career success",
      lucideIcon: GraduationCap,
      buttonPrimary: "Join Platform",
      buttonSecondary: "Explore Learning",
    },
  },
];

export default function HeroSection() {
  const [activeModule, setActiveModule] = useState(0);
  const [poppedModules, setPoppedModules] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => (prev + 1) % 8);
      setPoppedModules((prev) => [...prev, activeModule]);
      setTimeout(() => {
        setPoppedModules((prev) => prev.filter((m) => m !== activeModule));
      }, 800);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeModule]);

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
                    className={`text-6xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
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
                    className={`text-6xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
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
                    className={`text-6xl font-extrabold leading-tight tracking-tight transition-colors duration-500 ${
                      isBlueModule ? "text-yellow-600" : " text-blue-700"
                    }`}
                  >
                    {activeContent.title3}
                  </h2>
                </div>
              </div>

              {/* Dynamic Paragraph */}
              {/* <p
                key={`desc-${activeModule}`}
                className={`text-sm text-yellow-600 leading-relaxed max-w-xl animate-slideInLeft font-medium transition-all duration-500 ${
                    activeModule ? 'text-blue-600' : ' text-yellow-700'
                  }`}
                style={{ animationDelay: "0.45s" }}
              >
                {activeContent.description}
              </p> */}
              <p
                key={`desc-${activeModule}`}
                className={`text-base leading-relaxed max-w-xl animate-slideInLeft font-medium transition-all duration-500 ${
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
              <div className="absolute z-30 w-60 h-60 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex items-center justify-center">
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
                    className="absolute transition-all duration-500 cursor-pointer"
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${
                        isPopped ? 1.3 : 1
                      })`,
                      zIndex: isPopped ? 40 : 20,
                    }}
                    onClick={() => setActiveModule(index)}
                  >
                    {/* Connection Line to Center */}
                    <div
                      className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-blue-300/60 to-transparent"
                      style={{
                        height: "220px",
                        transformOrigin: "0 0",
                        transform: `rotate(${module.angle + 90}deg)`,
                        opacity: isActive ? 1 : 0.3,
                      }}
                    ></div>

                    {/* Module Card */}
                    <div
                      className={`relative w-36 h-36 rounded-3xl bg-gradient-to-br ${
                        module.color
                      } shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center group overflow-hidden border-4 border-white
                      ${isPopped ? "animate-popBounce" : ""}`}
                    >
                      {/* Shine Effect */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transition-all duration-700 ${
                          isPopped
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-full"
                        }`}
                      ></div>

                      {/* Glow Effect when Active */}
                      {isActive && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
                      )}

                      <div className="relative z-10 text-center">
                        <div
                          className={`text-5xl mb-2 transition-all duration-500 ${
                            isPopped ? "scale-125" : "scale-100"
                          }`}
                        >
                          {module.icon}
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
                        left: pos.x > 0 ? "100%" : "auto",
                        right: pos.x < 0 ? "100%" : "auto",
                        marginLeft: pos.x > 0 ? "12px" : "0",
                        marginRight: pos.x < 0 ? "12px" : "0",
                      }}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${
                          isActive
                            ? "bg-yellow-500 animate-pulse"
                            : "bg-blue-400"
                        } transition-all duration-300`}
                      ></div>
                      <div
                        className={`h-px w-6 ${
                          isActive ? "bg-yellow-500" : "bg-blue-400"
                        } transition-all duration-300`}
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
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popBounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
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
          animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
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
