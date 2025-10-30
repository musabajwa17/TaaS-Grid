"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Handshake, 
  FolderSymlink, 
  Lightbulb, 
  Rocket, 
  NotepadText, 
  Star, 
  TrendingUp, 
  GraduationCap,
  Briefcase,
  GitBranch,
  FileText,
  Zap
} from 'lucide-react';
import Image from 'next/image';

const modules = [
  {
    name: "HireConnect",
    color: "from-blue-600 to-blue-700",
    icon: Handshake,
    angle: 0,
    content: {
      title1: "Job Posting",
      title2: "Job Search & Filters",
      title3: "Application Tracking",
      title4: "Shortlisting Tools",
      title5: "Interview Scheduling",
      title6: "Employer Dashboard",
      description: "Where employers post and candidates get hired",
      lucideIcon: Handshake,
      buttonPrimary: "Find Talent",
      buttonSecondary: "Post Jobs",
    },
    keywords: "Job Posting & Hiring",
  },
  {
    name: "FYP Bridge",
    color: "from-yellow-500 to-amber-500",
    icon: FolderSymlink,
    angle: 45,
    content: {
      title1: "Project Selection",
      title2: "Mentor Assign",
      title3: "Progress Tracking",
      title4: "Submission Portal",
      title5: "Project Submission",
      title6: "Feedback & Evaluation",
      description: "Linking industry challenges with student projects",
      lucideIcon: FolderSymlink,
      buttonPrimary: "Explore Projects",
      buttonSecondary: "Submit FYP",
    },
    keywords: "Industry-Sponsored Final Year Projects",
  },
  {
    name: "Idea Vault",
    color: "from-blue-600 to-blue-700",
    icon: Lightbulb,
    angle: 90,
    content: {
      title1: "Idea Submission",
      title2: "Idea Categories & Tags",
      title3: "Student Browse & Ideas",
      title4: "Collaboration Requests",
      title5: "Voting / Rating System",
      title6: "Idea-to-Project Conversion",
      description: "A repository of project ideas for students",
      lucideIcon: Lightbulb,
      buttonPrimary: "Submit Ideas",
      buttonSecondary: "Browse Vault",
    },
    keywords: "FYP Idea Bank",
  },
  {
    name: "ProjectHub",
    color: "from-yellow-500 to-amber-500",
    icon: Rocket,
    angle: 135,
    content: {
      title1: "Project Posting",
      title2: "Bidding System",
      title3: "Proposal Submission",
      title4: "Contracting & Escrow Payments",
      title5: "Project Progress Tracking",
      title6: "Review & Rating",
      description: "Marketplace for outsourcing projects",
      lucideIcon: Rocket,
      buttonPrimary: "Start Project",
      buttonSecondary: "View Hub",
    },
    keywords: "Commercial Projects",
  },
  {
    name: "CV Forge",
    color: "from-blue-600 to-blue-700",
    icon: NotepadText,
    angle: 180,
    content: {
      title1: "CV Templates",
      title2: "Skill-Based Sections",
      title3: "Cover Letter Generator",
      title4: "Portfolio/Project Showcase",
      title5: "Export to PDF",
      title6: "One-Click Apply",
      description: "Crafting resumes that stand out",
      lucideIcon: NotepadText,
      buttonPrimary: "Create CV",
      buttonSecondary: "View Templates",
    },
    keywords: "CV Builder",
  },
  {
    name: "TalentMatch AI",
    color: "from-yellow-500 to-amber-500",
    icon: Star,
    angle: 225,
    content: {
      title1: "CV Upload & Parsing",
      title2: "Skill Extraction",
      title3: "Auto-Match",
      title4: "Recommendations",
      title5: "Scoring System",
      title6: "Career Path Suggestions",
      description: "AI-powered CV analysis & automatic matching to jobs/projects",
      lucideIcon: Star,
      buttonPrimary: "Get Matched",
      buttonSecondary: "See Matches",
    },
    keywords: "Smart CV Analyzer & Matching",
  },
  {
    name: "SkillBoost Pro",
    color: "from-blue-600 to-blue-700",
    icon: TrendingUp,
    angle: 270,
    content: {
      title1: "Employer Training",
      title2: "Custom Course Builder",
      title3: "Trainer Onboarding",
      title4: "Learning Management Dashboard",
      title5: "Employee Progress Tracking",
      title6: "Certification & Reporting",
      description: "Company-led upskilling for employees",
      lucideIcon: TrendingUp,
      buttonPrimary: "Start Learning",
      buttonSecondary: "View Courses",
    },
    keywords: "Corporate Training",
  },
  {
    name: "LearnEdge",
    color: "from-yellow-500 to-amber-500",
    icon: GraduationCap,
    angle: 315,
    content: {
      title1: "Course Catalog",
      title2: "Skill Based Recommendations",
      title3: "Live / Recorded Classes",
      title4: "Practice Assignment & Quizzes",
      title5: "Discussions & Communities",
      title6: "Certificates & Badges",
      description: "students/job seekers upskill themselves individually",
      lucideIcon: GraduationCap,
      buttonPrimary: "Join Platform",
      buttonSecondary: "Explore Learning",
    },
    keywords: "Individual Training",
  },
];

const HeroSection = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  useEffect(() => {
    if (animationPhase < modules.length) {
      const timer = setTimeout(() => {
        setAnimationPhase(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animationPhase]);

  useEffect(() => {
    if (!isHovered && animationPhase >= modules.length) {
      const interval = setInterval(() => {
        setActiveModule(prev => (prev + 1) % modules.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, animationPhase]);

  const displayModule = hoveredModule !== null ? hoveredModule : activeModule;
  const currentModule = modules[displayModule];
  
  const isYellow = currentModule.color.includes('yellow');

  const getModulePosition = (number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(radian),
      y: radius * Math.sin(radian),
    };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
      {/* Connected Hexagon Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <polygon 
                points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto px-12 py-12 lg:px-20 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side - Content with Framer Motion animations */}
          <div className="space-y-10">
            {/* Variants for stagger and directional motion */}
            {/* Parent container keyed by displayModule to re-trigger animations on change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={displayModule}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  // tighter stagger and a small delay so cards feel connected
                  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
                }}
                className="space-y-6"
              >
                {/* Heading (drops from top) */}
                <motion.h1
                  variants={{
                    hidden: { y: -60, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
                  }}
                  className={`text-2xl lg:text-4xl font-extrabold bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent leading-tight mb-6`}
                >
                  {currentModule.content.description}
                </motion.h1>

                {/* Feature Cards (slide left → right with stagger) */}
                <motion.div className="grid grid-cols-3 gap-5 w-125" variants={{ hidden: {}, visible: {} }}>
                  {[1, 2, 3, 4, 5, 6].map((num) => {
                      "title1"
                      | "title2"
                      | "title3"
                      | "title4"
                      | "title5"
                      | "title6";
                    const titleKey = `title${num}`;
                    const icons = [Briefcase, GitBranch, Lightbulb, Rocket, FileText, Zap];
                    const CardIcon = icons[num - 1];
                    const titleValue = String((currentModule.content)[titleKey]);

                    return (
                      <motion.div
                        key={num}
                        variants={{
                          hidden: { x: -60, y: 8, opacity: 0, scale: 0.98 },
                          visible: {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.6 },
                          },
                        }}
                        whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                        whileTap={{ scale: 0.995 }}
                        className={`group relative bg-white rounded-2xl p-3 border-2 hover:shadow-2xl cursor-pointer ${
                          isYellow
                            ? "border-amber-200 hover:border-amber-400 hover:shadow-amber-500/30"
                            : "border-blue-200 hover:border-blue-400 hover:shadow-blue-500/30"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-3 ">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg`}
                          >
                            <CardIcon className="w-5 h-5 text-white" />
                          </div>
                          <p
                            className={`text-xs font-bold leading-tight bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}
                          >
                            {titleValue}
                          </p>
                        </div>
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentModule.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                        ></div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Buttons (slide bottom → top) */}
                <motion.div
                  className="flex gap-5 pt-4"
                  variants={{
                    hidden: { y: 60, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.45 } },
                  }}
                >
                  <button
                    className={`group relative px-8 py-3 bg-gradient-to-r ${currentModule.color} text-white rounded-2xl font-bold text-base overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 ${
                      isYellow
                        ? "hover:shadow-2xl hover:shadow-amber-500/50"
                        : "hover:shadow-2xl hover:shadow-blue-500/50"
                    }`}
                  >
                    <span className="relative z-10">
                      {currentModule.content.buttonPrimary}
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  </button>

                  <button
                    className={`group relative px-8 bg-white text-gray-800 rounded-2xl font-bold text-lg border-2 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                      isYellow
                        ? "border-amber-300 hover:border-amber-500"
                        : "border-blue-300 hover:border-blue-500"
                    }`}
                  >
                    <span
                      className={`relative z-10 bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}
                    >
                      {currentModule.content.buttonSecondary}
                    </span>
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${currentModule.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
                    ></div>
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Right Side - Circular Module Display */}
          <div className="relative flex items-center justify-center h-[650px]">
            {/* Central Circle with Module Name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-42 h-42 rounded-full">

<Image
  src="/logo7.png"
  alt="Logo"
  width={500}     // you can adjust this as needed
  height={500}    // adjust to your actual image ratio
  className="w-full h-full mb-4 object-contain"
/>

                </div>
              </div>
            </div>

            {/* Orbiting Modules */}
            {modules.map((module, index) => {
              const pos = getModulePosition(module.angle, 200);
              const isActive = index === displayModule;
              const isVisible = animationPhase > index;
              const Icon = module.icon;
              const moduleIsYellow = module.color.includes('yellow');

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-1000 ease-out cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isActive ? 1 : 0.8}) rotate(${module.angle}deg)`,
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${index * 100}ms`,
                    zIndex: isActive ? 20 : 10,
                  }}
                  onMouseEnter={() => {
                    setIsHovered(true);
                    setHoveredModule(index);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    setHoveredModule(null);
                  }}
                >
                  <div
                    className="relative group"
                    style={{
                      transform: `rotate(-${module.angle}deg)`,
                    }}
                  >
                    <div
                      className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${module.color} shadow-xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
                        isActive ? 'ring-4 ring-white ring-offset-4 ring-offset-slate-100' : ''
                      } group-hover:-translate-y-1 group-hover:scale-110 group-hover:ring-4 group-hover:ring-white group-hover:ring-offset-4 group-hover:ring-offset-slate-100 ${
                        moduleIsYellow ? 'group-hover:shadow-2xl group-hover:shadow-amber-500/50' : 'group-hover:shadow-2xl group-hover:shadow-blue-500/50'
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        {React.createElement(Icon, {
                          className: "w-12 h-12 text-white",
                        })}
                        <p className="text-white text-sm font-bold text-center px-1">
                          {module.name}
                        </p>
                        <span className="text-white text-[11px] font-semibold text-center px-1">
                          ({module.keywords})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;