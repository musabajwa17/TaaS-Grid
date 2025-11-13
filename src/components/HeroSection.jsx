// "use client";
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Handshake, 
//   FolderSymlink, 
//   Lightbulb, 
//   Rocket, 
//   NotepadText, 
//   Star, 
//   TrendingUp, 
//   GraduationCap,
//   Briefcase,
//   GitBranch,
//   FileText,
//   Zap
// } from 'lucide-react';
// import Image from 'next/image';

// const modules = [
//   {
//     name: "HireConnect",
//     color: "from-blue-600 to-blue-700",
//     icon: Handshake,
//     angle: 0,
//     content: {
//       title1: "Job Posting",
//       title2: "Job Search & Filters",
//       title3: "Application Tracking",
//       title4: "Shortlisting Tools",
//       title5: "Interview Scheduling",
//       title6: "Employer Dashboard",
//       description: "Where employers post and candidates get hired",
//       lucideIcon: Handshake,
//       buttonPrimary: "Find Talent",
//       buttonSecondary: "Post Jobs",
//     },
//     keywords: "Job Posting & Hiring",
//   },
//   {
//     name: "FYP Bridge",
//     color: "from-yellow-500 to-amber-500",
//     icon: FolderSymlink,
//     angle: 45,
//     content: {
//       title1: "Project Selection",
//       title2: "Mentor Assign",
//       title3: "Progress Tracking",
//       title4: "Submission Portal",
//       title5: "Project Submission",
//       title6: "Feedback & Evaluation",
//       description: "Linking industry challenges with student projects",
//       lucideIcon: FolderSymlink,
//       buttonPrimary: "Explore Projects",
//       buttonSecondary: "Submit FYP",
//     },
//     keywords: "Industry-Sponsored Final Year Projects",
//   },
//   {
//     name: "Idea Vault",
//     color: "from-blue-600 to-blue-700",
//     icon: Lightbulb,
//     angle: 90,
//     content: {
//       title1: "Idea Submission",
//       title2: "Idea Categories & Tags",
//       title3: "Student Browse & Ideas",
//       title4: "Collaboration Requests",
//       title5: "Voting / Rating System",
//       title6: "Idea-to-Project Conversion",
//       description: "A repository of project ideas for students",
//       lucideIcon: Lightbulb,
//       buttonPrimary: "Submit Ideas",
//       buttonSecondary: "Browse Vault",
//     },
//     keywords: "FYP Idea Bank",
//   },
//   {
//     name: "ProjectHub",
//     color: "from-yellow-500 to-amber-500",
//     icon: Rocket,
//     angle: 135,
//     content: {
//       title1: "Project Posting",
//       title2: "Bidding System",
//       title3: "Proposal Submission",
//       title4: "Contracting & Escrow Payments",
//       title5: "Project Progress Tracking",
//       title6: "Review & Rating",
//       description: "Marketplace for outsourcing projects",
//       lucideIcon: Rocket,
//       buttonPrimary: "Start Project",
//       buttonSecondary: "View Hub",
//     },
//     keywords: "Commercial Projects",
//   },
//   {
//     name: "CV Forge",
//     color: "from-blue-600 to-blue-700",
//     icon: NotepadText,
//     angle: 180,
//     content: {
//       title1: "CV Templates",
//       title2: "Skill-Based Sections",
//       title3: "Cover Letter Generator",
//       title4: "Portfolio/Project Showcase",
//       title5: "Export to PDF",
//       title6: "One-Click Apply",
//       description: "Crafting resumes that stand out",
//       lucideIcon: NotepadText,
//       buttonPrimary: "Create CV",
//       buttonSecondary: "View Templates",
//     },
//     keywords: "CV Builder",
//   },
//   {
//     name: "TalentMatch AI",
//     color: "from-[#003366] to-[#003366]",
//     icon: Star,
//     angle: 225,
//     content: {
//       title1: "CV Upload & Parsing",
//       title2: "Skill Extraction",
//       title3: "Auto-Match",
//       title4: "Recommendations",
//       title5: "Scoring System",
//       title6: "Career Path Suggestions",
//       description: "CV analysis & automatic matching to jobs/projects",
//       lucideIcon: Star,
//       buttonPrimary: "Get Matched",
//       buttonSecondary: "See Matches",
//     },
//     keywords: "Smart CV Analyzer & Matching",
//   },
//   {
//     name: "SkillBoost Pro",
//     color: "from-blue-600 to-blue-700",
//     icon: TrendingUp,
//     angle: 270,
//     content: {
//       title1: "Employer Training",
//       title2: "Custom Course Builder",
//       title3: "Trainer Onboarding",
//       title4: "Learning Management Dashboard",
//       title5: "Employee Progress Tracking",
//       title6: "Certification & Reporting",
//       description: "Company-led upskilling for employees",
//       lucideIcon: TrendingUp,
//       buttonPrimary: "Start Learning",
//       buttonSecondary: "View Courses",
//     },
//     keywords: "Corporate Training",
//   },
//   {
//     name: "LearnEdge",
//     color: "from-yellow-500 to-amber-500",
//     icon: GraduationCap,
//     angle: 315,
//     content: {
//       title1: "Course Catalog",
//       title2: "Skill Based Recommendations",
//       title3: "Live / Recorded Classes",
//       title4: "Practice Assignment & Quizzes",
//       title5: "Discussions & Communities",
//       title6: "Certificates & Badges",
//       description: "students/job seekers upskill themselves individually",
//       lucideIcon: GraduationCap,
//       buttonPrimary: "Join Platform",
//       buttonSecondary: "Explore Learning",
//     },
//     keywords: "Individual Training",
//   },
// ];

// const HeroSection = () => {
//   const [activeModule, setActiveModule] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [hoveredModule, setHoveredModule] = useState(null);
//   const [animationPhase, setAnimationPhase] = useState(0);
//   useEffect(() => {
//     if (animationPhase < modules.length) {
//       const timer = setTimeout(() => {
//         setAnimationPhase(prev => prev + 1);
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [animationPhase]);

//   useEffect(() => {
//     if (!isHovered && animationPhase >= modules.length) {
//       const interval = setInterval(() => {
//         setActiveModule(prev => (prev + 1) % modules.length);
//       }, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [isHovered, animationPhase]);

//   const displayModule = hoveredModule !== null ? hoveredModule : activeModule;
//   const currentModule = modules[displayModule];
  
//   const isYellow = currentModule.color.includes('yellow');

//   const getModulePosition = (angle, radius) => {
//     const radian = (angle - 90) * (Math.PI / 180);
//     return {
//       x: radius * Math.cos(radian),
//       y: radius * Math.sin(radian),
//     };
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
//       {/* Connected Hexagon Background */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
//               <polygon 
//                 points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
//                 fill="none" 
//                 stroke="#3b82f6" 
//                 strokeWidth="2"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexagons)" />
//         </svg>
//       </div>

//       <div className="relative z-10 mx-auto px-12 py-12 lg:px-20 lg:py-20">
//         <div className="grid lg:grid-cols-2 gap-20 items-center">
          
//           {/* Left Side - Content with Framer Motion animations */}
//           <div className="space-y-10">
//             {/* Variants for stagger and directional motion */}
//             {/* Parent container keyed by displayModule to re-trigger animations on change */}
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={displayModule}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//                 variants={{
//                   hidden: {},
//                   // tighter stagger and a small delay so cards feel connected
//                   visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
//                 }}
//                 className="space-y-6"
//               >
//                 {/* Heading (drops from top) */}
//                 <motion.h1
//                   variants={{
//                     hidden: { y: -60, opacity: 0 },
//                     visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
//                   }}
//                   className={`text-base lg:text-2xl font-extrabold bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent leading-tight mb-6`}
//                 >
//                   {currentModule.content.description}
//                 </motion.h1>

//                 {/* Feature Cards (slide left → right with stagger) */}
//                 <motion.div className="grid grid-cols-3 gap-5 w-125" variants={{ hidden: {}, visible: {} }}>
//                   {[1, 2, 3, 4, 5, 6].map((num) => {
//                       "title1"
//                       | "title2"
//                       | "title3"
//                       | "title4"
//                       | "title5"
//                       | "title6";
//                     const titleKey = `title${num}`;
//                     const icons = [Briefcase, GitBranch, Lightbulb, Rocket, FileText, Zap];
//                     const CardIcon = icons[num - 1];
//                     const titleValue = String((currentModule.content)[titleKey]);

//                     return (
//                       <motion.div
//                         key={num}
//                         variants={{
//                           hidden: { x: -60, y: 8, opacity: 0, scale: 0.98 },
//                           visible: {
//                             x: 0,
//                             y: 0,
//                             opacity: 1,
//                             scale: 1,
//                             transition: { type: 'spring', stiffness: 100, damping: 14, mass: 0.6 },
//                           },
//                         }}
//                         whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
//                         whileTap={{ scale: 0.995 }}
//                         className={`group relative bg-white rounded-2xl p-3 border-2 hover:shadow-2xl cursor-pointer ${
//                           isYellow
//                             ? "border-amber-200 hover:border-amber-400 hover:shadow-amber-500/30"
//                             : "border-blue-200 hover:border-blue-400 hover:shadow-blue-500/30"
//                         }`}
//                       >
//                         <div className="flex flex-col items-center text-center space-y-3 ">
//                           <div
//                             className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg`}
//                           >
//                             <CardIcon className="w-5 h-5 text-white" />
//                           </div>
//                           <p
//                             className={`text-xs font-bold leading-tight bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}
//                           >
//                             {titleValue}
//                           </p>
//                         </div>
//                         <div
//                           className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentModule.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
//                         ></div>
//                       </motion.div>
//                     );
//                   })}
//                 </motion.div>

//                 {/* Buttons (slide bottom → top) */}
//                 <motion.div
//                   className="flex gap-5 pt-4"
//                   variants={{
//                     hidden: { y: 60, opacity: 0 },
//                     visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay: 0.45 } },
//                   }}
//                 >
//                   <button
//                     className={`group relative px-8 py-3 bg-gradient-to-r ${currentModule.color} text-white rounded-2xl font-bold text-base overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 ${
//                       isYellow
//                         ? "hover:shadow-2xl hover:shadow-amber-500/50"
//                         : "hover:shadow-2xl hover:shadow-blue-500/50"
//                     }`}
//                   >
//                     <span className="relative z-10">
//                       {currentModule.content.buttonPrimary}
//                     </span>
//                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
//                   </button>

//                   <button
//                     className={`group relative px-8 bg-white text-gray-800 rounded-2xl font-bold text-lg border-2 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
//                       isYellow
//                         ? "border-amber-300 hover:border-amber-500"
//                         : "border-blue-300 hover:border-blue-500"
//                     }`}
//                   >
//                     <span
//                       className={`relative z-10 bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}
//                     >
//                       {currentModule.content.buttonSecondary}
//                     </span>
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-r ${currentModule.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
//                     ></div>
//                   </button>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>
//           </div>


//           {/* Right Side - Circular Module Display */}
//           <div className="relative flex items-center justify-center h-[650px]">
//             {/* Central Circle with Module Name */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative">
//                 <div className="w-42 h-42 rounded-full">

// <Image
//   src="/logo7.png"
//   alt="Logo"
//   width={500}     // you can adjust this as needed
//   height={500}    // adjust to your actual image ratio
//   className="w-full h-full mb-4 object-contain"
// />

//                 </div>
//               </div>
//             </div>

//             {/* Orbiting Modules */}
//             {modules.map((module, index) => {
//               const pos = getModulePosition(module.angle, 200);
//               const isActive = index === displayModule;
//               const isVisible = animationPhase > index;
//               const Icon = module.icon;
//               const moduleIsYellow = module.color.includes('yellow');

//               return (
//                 <div
//                   key={index}
//                   className="absolute transition-all duration-1000 ease-out cursor-pointer"
//                   style={{
//                     left: '50%',
//                     top: '50%',
//                     transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isActive ? 1 : 0.8}) rotate(${module.angle}deg)`,
//                     opacity: isVisible ? 1 : 0,
//                     transitionDelay: `${index * 100}ms`,
//                     zIndex: isActive ? 20 : 10,
//                   }}
//                   onMouseEnter={() => {
//                     setIsHovered(true);
//                     setHoveredModule(index);
//                   }}
//                   onMouseLeave={() => {
//                     setIsHovered(false);
//                     setHoveredModule(null);
//                   }}
//                 >
//                   <div
//                     className="relative group"
//                     style={{
//                       transform: `rotate(-${module.angle}deg)`,
//                     }}
//                   >
//                     <div
//                       className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${module.color} shadow-xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
//                         isActive ? 'ring-4 ring-white ring-offset-4 ring-offset-slate-100' : ''
//                       } group-hover:-translate-y-1 group-hover:scale-110 group-hover:ring-4 group-hover:ring-white group-hover:ring-offset-4 group-hover:ring-offset-slate-100 ${
//                         moduleIsYellow ? 'group-hover:shadow-2xl group-hover:shadow-amber-500/50' : 'group-hover:shadow-2xl group-hover:shadow-blue-500/50'
//                       }`}
//                     >
//                       <div className="flex flex-col items-center justify-center space-y-2">
//                         {React.createElement(Icon, {
//                           className: "w-12 h-12 text-white",
//                         })}
//                         <p className="text-white text-sm font-bold text-center px-1">
//                           {module.name}
//                         </p>
//                         <span className="text-white text-[11px] font-semibold text-center px-1">
//                           ({module.keywords})
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;




"use client";
import React, { useState, useEffect } from 'react';
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
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
const modules = [
  {
    name: "HireConnect",
    icon: Handshake,
    color: "blue",
    content: {
      title1: "Job Posting",
      title2: "Job Search & Filters",
      title3: "Application Tracking",
      title4: "Shortlisting Tools",
      title5: "Interview Scheduling",
      title6: "Employer Dashboard",
      description: "Where employers post and candidates get hired",
      buttonPrimary: "Find Talent",
      buttonSecondary: "Post Jobs",
    },
    keywords: "Job Posting & Hiring",
  },
  {
    name: "FYP Bridge",
    icon: FolderSymlink,
    color: "purple",
    content: {
      title1: "Project Selection",
      title2: "Mentor Assign",
      title3: "Progress Tracking",
      title4: "Submission Portal",
      title5: "Project Submission",
      title6: "Feedback & Evaluation",
      description: "Linking industry challenges with student projects",
      buttonPrimary: "Explore Projects",
      buttonSecondary: "Submit FYP",
    },
    keywords: "Industry-Sponsored Final Year Projects",
  },
  {
    name: "Idea Vault",
    icon: Lightbulb,
    color: "blue",
    content: {
      title1: "Idea Submission",
      title2: "Idea Categories & Tags",
      title3: "Student Browse & Ideas",
      title4: "Collaboration Requests",
      title5: "Voting / Rating System",
      title6: "Idea-to-Project Conversion",
      description: "A repository of project ideas for students",
      buttonPrimary: "Submit Ideas",
      buttonSecondary: "Browse Vault",
    },
    keywords: "FYP Idea Bank",
  },
  {
    name: "ProjectHub",
    icon: Rocket,
    color: "teal",
    content: {
      title1: "Project Posting",
      title2: "Bidding System",
      title3: "Proposal Submission",
      title4: "Contracting & Escrow Payments",
      title5: "Project Progress Tracking",
      title6: "Review & Rating",
      description: "Marketplace for outsourcing projects",
      buttonPrimary: "Start Project",
      buttonSecondary: "View Hub",
    },
    keywords: "Commercial Projects",
  },
  {
    name: "CV Forge",
    icon: NotepadText,
    color: "blue",
    content: {
      title1: "CV Templates",
      title2: "Skill-Based Sections",
      title3: "Cover Letter Generator",
      title4: "Portfolio/Project Showcase",
      title5: "Export to PDF",
      title6: "One-Click Apply",
      description: "Crafting resumes that stand out",
      buttonPrimary: "Create CV",
      buttonSecondary: "View Templates",
    },
    keywords: "CV Builder",
  },
  {
    name: "TalentMatch AI",
    icon: Star,
    color: "purple",
    content: {
      title1: "CV Upload & Parsing",
      title2: "Skill Extraction",
      title3: "Auto-Match",
      title4: "Recommendations",
      title5: "Scoring System",
      title6: "Career Path Suggestions",
      description: "CV analysis & automatic matching to jobs/projects",
      buttonPrimary: "Get Matched",
      buttonSecondary: "See Matches",
    },
    keywords: "Smart CV Analyzer & Matching",
  },
  {
    name: "SkillBoost Pro",
    icon: TrendingUp,
    color: "teal",
    content: {
      title1: "Employer Training",
      title2: "Custom Course Builder",
      title3: "Trainer Onboarding",
      title4: "Learning Management Dashboard",
      title5: "Employee Progress Tracking",
      title6: "Certification & Reporting",
      description: "Company-led upskilling for employees",
      buttonPrimary: "Start Learning",
      buttonSecondary: "View Courses",
    },
    keywords: "Corporate Training",
  },
  {
    name: "LearnEdge",
    icon: GraduationCap,
    color: "purple",
    content: {
      title1: "Course Catalog",
      title2: "Skill Based Recommendations",
      title3: "Live / Recorded Classes",
      title4: "Practice Assignment & Quizzes",
      title5: "Discussions & Communities",
      title6: "Certificates & Badges",
      description: "students/job seekers upskill themselves individually",
      buttonPrimary: "Join Platform",
      buttonSecondary: "Explore Learning",
    },
    keywords: "Individual Training",
  },
];
const colorThemes = {
  blue: {
    primary: 'from-blue-600 to-blue-700',
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'bg-blue-50',
    ring: 'ring-blue-600',
    shadow: 'shadow-blue-600/25',
  },
  purple: {
    primary: 'from-purple-600 to-purple-700',
    bg: 'bg-purple-600',
    text: 'text-purple-600',
    border: 'border-purple-600',
    hover: 'hover:bg-purple-700',
    light: 'bg-purple-50',
    ring: 'ring-purple-600',
    shadow: 'shadow-purple-600/25',
  },
  teal: {
    primary: 'from-teal-600 to-teal-700',
    bg: 'bg-teal-600',
    text: 'text-teal-600',
    border: 'border-teal-600',
    hover: 'hover:bg-teal-700',
    light: 'bg-teal-50',
    ring: 'ring-teal-600',
    shadow: 'shadow-teal-600/25',
  },
};
const HeroSection = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setActiveModule(prev => (prev + 1) % modules.length);
          setIsAnimating(false);
        }, 300);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating]);

  const currentModule = modules[activeModule];
  const ModuleIcon = currentModule.icon;
  const theme = colorThemes[currentModule.color];

  const handleModuleClick = (index) => {
    if (index !== activeModule) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveModule(index);
        setIsAnimating(false);
        setIsAutoRotating(false);
        setTimeout(() => setIsAutoRotating(true), 12000);
      }, 300);
    }
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Animated gradient orbs */}
      <div className={`absolute top-20 right-20 w-96 h-96 ${theme.light} rounded-full blur-3xl opacity-20 animate-pulse`}></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${theme.light} rounded-full blur-3xl opacity-10`}></div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Module Navigation */}
            <div className="space-y-4">
              {/* <div className="flex items-center gap-2 mb-6">
                <Sparkles className={`w-5 h-5 ${theme.text} animate-pulse`} />
                <span className={`text-sm font-semibold ${theme.text} tracking-wide uppercase`}>
                  Our Platform Modules
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  const moduleTheme = colorThemes[module.color];
                  const isActive = activeModule === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleModuleClick(index)}
                      className={`group relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium transition-all duration-500 transform ${
                        isActive
                          ? `${moduleTheme.bg} text-white shadow-lg ${moduleTheme.shadow} scale-105`
                          : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md hover:scale-102'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-transform duration-500 ${isActive ? 'rotate-12 scale-110' : 'group-hover:rotate-12 group-hover:scale-110'}`} />
                      <span className="text-sm font-semibold">{module.name}</span>
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl bg-white opacity-0 animate-ping"></div>
                      )}
                    </button>
                  );
                })}
              </div> */}
            </div>

            {/* Main Content with Stagger Animation */}
            <div className={`space-y-8 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              
              {/* Category Badge */}
              {/* <div className={`inline-flex items-center gap-3 px-5 py-2.5 ${theme.light} border-2 ${theme.border} rounded-full transition-all duration-500 hover:shadow-lg ${theme.shadow}`}>
                <div className={`w-2.5 h-2.5 ${theme.bg} rounded-full animate-pulse`}></div>
                <span className={`text-sm font-bold ${theme.text}}>{currentModule.keywords`}></span>
              </div> */}

              {/* Animated Headline */}
              <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {currentModule.content.description.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="inline-block transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                    style={{
                      animationDelay:` ${i * 100}ms`,
                      animation: isAnimating ? 'none' : 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    {word}&nbsp;
                  </span>
                ))}
              </h1>

              {/* Features Grid with Stagger */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => {
                  const titleKey = `title${num}`;
                  const titleValue = currentModule.content[titleKey];
                  
                  return (
                    <div 
                      key={num}
                      className="group flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-slate-100 hover:border-slate-200 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                      style={{
                        animationDelay: `${num * 100}ms`,
                        animation: isAnimating ? 'none' : 'slideInLeft 0.6s ease-out forwards'
                      }}
                    >
                      <div className={`mt-0.5 transition-all duration-500 ${theme.text} group-hover:scale-125 group-hover:rotate-12`}>
                        <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <span className="text-slate-700 font-semibold group-hover:text-slate-900 transition-colors duration-300 leading-relaxed">
                        {titleValue}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons with Animations */}
              <div className="flex flex-wrap gap-5 pt-6">
                <button className={`group relative px-8 py-4 bg-gradient-to-r ${theme.primary} text-white rounded-xl font-bold text-base overflow-hidden transition-all duration-500 hover:shadow-2xl ${theme.shadow} hover:scale-105 hover:-translate-y-1`}>
                  <span className="relative z-10 flex items-center gap-3">
                    {currentModule.content.buttonPrimary}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                
                <button className={`group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-base border-3 ${theme.border} overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-105 hover:-translate-y-1`}>
                  <span className={`relative z-10 flex items-center gap-3 ${theme.text}`}>
                    {currentModule.content.buttonSecondary}
                  </span>
                  <div className={`absolute inset-0 ${theme.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5">
            <div className={`relative transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95 rotate-3' : 'opacity-100 scale-100 rotate-0'}`}>
              
              {/* Main Module Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-slate-100 p-10 overflow-hidden">
                
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.primary} opacity-5`}></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-slate-100 to-transparent rounded-full blur-3xl opacity-50 animate-pulse"></div>
                
                {/* Content */}
                <div className="relative space-y-8">
                  
                  {/* Icon with Animation */}
                  <div className={`relative inline-flex p-5 bg-gradient-to-br ${theme.primary} rounded-2xl shadow-2xl ${theme.shadow} animate-pulse`}>
                    <ModuleIcon className="w-10 h-10 text-white" />
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 animate-ping"></div>
                  </div>

                  {/* Module Info */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-slate-900">
                      {currentModule.name}
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      {currentModule.content.description}
                    </p>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => {
                      const titleKey = `title${num}`;
                      const titleValue = currentModule.content[titleKey];
                      const icons = [Briefcase, GitBranch, Lightbulb, Rocket];
                      const FeatureIcon = icons[num - 1];
                      
                      return (
                        <div 
                          key={num}
                          className={`group p-4 ${theme.light} rounded-xl border-2 ${theme.border} border-opacity-20 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:scale-105 cursor-pointer`}
                        >
                          <FeatureIcon className={`w-6 h-6 ${theme.text} mb-3 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-125`} />
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {titleValue}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="flex items-center gap-2 pt-4">
                    {modules.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-700 cursor-pointer hover:scale-110 ${
                          index === activeModule
                            ? `w-12 ${theme.bg} shadow-lg ${theme.shadow}`
                            : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        onClick={() => handleModuleClick(index)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stat Cards with Animation */}
              <div className={`absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl border-2 ${theme.border} border-opacity-20 p-5 transition-all duration-700 hover:scale-110 hover:-translate-y-2 cursor-pointer animate-bounce} style={{ animationDuration: '3s' }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">8 Modules</div>
                    <div className="text-sm text-slate-500 font-medium">Integrated Platform</div>
                  </div>
                </div>
              </div>

              <div className={`absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl border-2 ${theme.border} border-opacity-20 p-5 transition-all duration-700 hover:scale-110 hover:-translate-y-2 cursor-pointer`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">All-in-One</div>
                    <div className="text-sm text-slate-500 font-medium">Complete Solution</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        {/* <div className="mt-28 pt-16 border-t-2 border-slate-100">
          <p className="text-center text-sm font-semibold text-slate-400 tracking-wider uppercase mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-32 h-12 bg-slate-100 rounded-lg opacity-40 hover:opacity-70 transition-all duration-500 hover:scale-110 cursor-pointer"
                style={{
                  animation: 'float 3s ease-in-out infinite',
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
    </>
  );
};
export default HeroSection;






