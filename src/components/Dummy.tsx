// import React, { useState } from 'react';
// import { CheckCircle, Download, Mail, Phone, MapPin, Linkedin, Github, User, Briefcase, GraduationCap, Code, Award, Sparkles } from 'lucide-react';

// export default function StunningCVDesigner() {
//   const [parsedData, setParsedData] = useState({
//     name: "Alexandra Morgan",
//     title: "Senior Product Designer & Creative Strategist",
//     email: "alex.morgan@email.com",
//     phone: "+1 (555) 123-4567",
//     location: "San Francisco, CA",
//     linkedin: "linkedin.com/in/alexmorgan",
//     github: "github.com/alexmorgan",
//     summary: "Award-winning designer with 8+ years of experience crafting user-centric digital experiences. Specialized in design systems, product strategy, and leading cross-functional teams to deliver innovative solutions that drive business growth.",
//     experience: [
//       {
//         role: "Senior Product Designer",
//         company: "TechVision Inc.",
//         years: "2021 - Present",
//         description: [
//           "Led design initiatives for 3 major product launches, resulting in 150% increase in user engagement",
//           "Established comprehensive design system used across 12+ products",
//           "Mentored team of 5 junior designers and collaborated with 20+ engineers"
//         ]
//       },
//       {
//         role: "Product Designer",
//         company: "DigitalCraft Studios",
//         years: "2018 - 2021",
//         description: [
//           "Redesigned core user flows, improving conversion rate by 45%",
//           "Conducted user research with 200+ participants to inform design decisions"
//         ]
//       }
//     ],
//     education: [
//       {
//         degree: "Master of Fine Arts in Digital Design",
//         institution: "Stanford University",
//         year: "2018"
//       },
//       {
//         degree: "Bachelor of Arts in Graphic Design",
//         institution: "Rhode Island School of Design",
//         year: "2016"
//       }
//     ],
//     skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Design Systems", "Prototyping", "User Research", "React", "CSS/HTML", "Design Thinking"],
//     certifications: [
//       "Google UX Design Professional Certificate (2023)",
//       "Nielsen Norman Group UX Certification (2022)"
//     ]
//   });

//   const [file, setFile] = useState(null);
//   const [error, setError] = useState(null);

//   const downloadPDF = () => {
//     console.log("Download PDF functionality");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">
//         {parsedData && (
//           <div className="space-y-6">
//             {/* Success Banner with Gradient */}
//             <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 shadow-2xl">
//               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
//               <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
//               <div className="relative flex items-center">
//                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
//                   <CheckCircle className="w-8 h-8 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-white text-xl mb-1">
//                     Resume Parsed Successfully! ✨
//                   </h3>
//                   <p className="text-white/90">
//                     Your resume has been transformed into a stunning masterpiece
//                   </p>
//                 </div>
//                 <button
//                   onClick={downloadPDF}
//                   className="flex items-center px-6 py-3 bg-white text-teal-600 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
//                 >
//                   <Download className="w-5 h-5 mr-2" />
//                   Download PDF
//                 </button>
//               </div>
//             </div>

//             {/* Resume Content with Modern Design */}
//             <div
//               id="resume-content"
//               className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
//             >
//               {/* Decorative Background Elements */}
//               <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -mr-48 -mt-48 opacity-50"></div>
//               <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-36 -mb-36 opacity-50"></div>
              
//               <div className="relative p-12">
//                 {/* Header with Gradient Accent */}
//                 <div className="relative pb-8 mb-8">
//                   <div className="absolute left-0 bottom-0 h-1 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                  
//                   {parsedData.name?.trim() && (
//                     <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 tracking-tight">
//                       {parsedData.name}
//                     </h1>
//                   )}

//                   {parsedData.title?.trim() && (
//                     <p className="text-2xl text-gray-700 mb-6 font-medium">
//                       {parsedData.title}
//                     </p>
//                   )}

//                   <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600">
//                     {parsedData.email && parsedData.email.trim() !== "" && (
//                       <div className="flex items-center group">
//                         <div className="bg-indigo-100 p-2 rounded-lg mr-2 group-hover:bg-indigo-200 transition-colors">
//                           <Mail className="w-4 h-4 text-indigo-600" />
//                         </div>
//                         <span className="text-sm">{parsedData.email}</span>
//                       </div>
//                     )}

//                     {parsedData.phone && parsedData.phone.trim() !== "" && (
//                       <div className="flex items-center group">
//                         <div className="bg-purple-100 p-2 rounded-lg mr-2 group-hover:bg-purple-200 transition-colors">
//                           <Phone className="w-4 h-4 text-purple-600" />
//                         </div>
//                         <span className="text-sm">{parsedData.phone}</span>
//                       </div>
//                     )}

//                     {parsedData.location && parsedData.location.trim() !== "" && (
//                       <div className="flex items-center group">
//                         <div className="bg-pink-100 p-2 rounded-lg mr-2 group-hover:bg-pink-200 transition-colors">
//                           <MapPin className="w-4 h-4 text-pink-600" />
//                         </div>
//                         <span className="text-sm">{parsedData.location}</span>
//                       </div>
//                     )}

//                     {parsedData.linkedin && parsedData.linkedin.trim() !== "" && (
//                       <div className="flex items-center group">
//                         <div className="bg-blue-100 p-2 rounded-lg mr-2 group-hover:bg-blue-200 transition-colors">
//                           <Linkedin className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <span className="text-sm">{parsedData.linkedin}</span>
//                       </div>
//                     )}

//                     {parsedData.github && parsedData.github.trim() !== "" && (
//                       <div className="flex items-center group">
//                         <div className="bg-gray-100 p-2 rounded-lg mr-2 group-hover:bg-gray-200 transition-colors">
//                           <Github className="w-4 h-4 text-gray-700" />
//                         </div>
//                         <span className="text-sm">{parsedData.github}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Summary with Accent Box */}
//                 {parsedData.summary && (
//                   <div className="mb-10">
//                     <div className="flex items-center mb-4">
//                       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 rounded-xl mr-3 shadow-lg">
//                         <User className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         Professional Summary
//                       </h2>
//                     </div>

//                     <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-l-4 border-indigo-600">
//                       {(() => {
//                         let summaryContent: string | string[] = "";
//                         const summary = parsedData.summary as
//                       | string
//                       | string[]
//                       | { text?: string }
//                       | null
//                       | undefined;

//                         if (typeof summary === "string") {
//                           summaryContent = summary.trim();
//                         } else if (Array.isArray(summary)) {
//                           summaryContent = summary
//                             .filter((s : unknown) => typeof s === "string" && s.trim() !== "")
//                             .map((s : string) => s.trim());
//                         } else if (summary && typeof summary === "object" && "text" in summary) {
//                            summaryContent =
//                         typeof summary.text === "string"
//                           ? summary.text.trim()
//                           : "";
//                         }

//                         if (Array.isArray(summaryContent)) {
//                           return (
//                             <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
//                               {summaryContent.map((item, i) => (
//                                 <li key={i} className="text-base">{item}</li>
//                               ))}
//                             </ul>
//                           );
//                         }

//                         if (typeof summaryContent === "string" && summaryContent) {
//                           return (
//                             <p className="text-gray-700 leading-relaxed text-base">
//                               {summaryContent}
//                             </p>
//                           );
//                         }

//                         return null;
//                       })()}
//                     </div>
//                   </div>
//                 )}

//                 {/* Experience with Timeline Design */}
//                 {Array.isArray(parsedData?.experience) && parsedData.experience.length > 0 && (
//                   <div className="mb-10">
//                     <div className="flex items-center mb-6">
//                       <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl mr-3 shadow-lg">
//                         <Briefcase className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         Work Experience
//                       </h2>
//                     </div>

//                     <div className="space-y-6">
//                       {parsedData.experience.map((exp : any, idx : number) => {
//                         if (typeof exp === "string") {
//                           const expText = exp.trim();
//                           if (!expText) return null;
//                           return (
//                             <div key={idx} className="relative pl-8 pb-6 border-l-2 border-purple-200">
//                               <div className="absolute left-0 top-0 w-4 h-4 bg-purple-600 rounded-full -ml-2.5"></div>
//                               <h3 className="text-xl font-semibold text-gray-800">{expText}</h3>
//                             </div>
//                           );
//                         }

//                         const role = typeof exp.role === "string" ? exp.role.trim() : "";
//                         const company = typeof exp.company === "string" ? exp.company.trim() : "";
//                         const years = typeof exp.years === "string" ? exp.years.trim() : "";

//                         let descriptionItems: string[] = [];
//                         if (Array.isArray(exp.description)) {
//                           descriptionItems = exp.description
//                             .filter((d : any) => typeof d === "string" && d.trim() !== "")
//                             .map((d : any) => d.trim());
//                         } else if (typeof exp.description === "string" && exp.description.trim()) {
//                           descriptionItems = [exp.description.trim()];
//                         }

//                         if (!role && !company && !years && descriptionItems.length === 0) return null;

//                         return (
//                           <div key={idx} className="relative pl-8 pb-6 border-l-2 border-purple-200 last:border-l-0">
//                             <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -ml-2.5 shadow-lg"></div>
                            
//                             <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
//                               {role && (
//                                 <h3 className="text-xl font-bold text-gray-800 mb-1">
//                                   {role}
//                                 </h3>
//                               )}
//                               {company && (
//                                 <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//                                   {company}
//                                 </p>
//                               )}
//                               {years && (
//                                 <p className="text-sm text-gray-500 mb-3 flex items-center">
//                                   <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
//                                   {years}
//                                 </p>
//                               )}

//                               {descriptionItems.length > 0 && (
//                                 <ul className="space-y-2 mt-4">
//                                   {descriptionItems.map((item, i) => (
//                                     <li key={i} className="flex items-start text-gray-700">
//                                       <span className="text-purple-600 mr-3 mt-1.5 text-lg">▪</span>
//                                       <span className="flex-1">{item}</span>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Education with Card Design */}
//                 {Array.isArray(parsedData?.education) && parsedData.education.length > 0 && (
//                   <div className="mb-10">
//                     <div className="flex items-center mb-6">
//                       <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-2.5 rounded-xl mr-3 shadow-lg">
//                         <GraduationCap className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         Education
//                       </h2>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {parsedData.education.map((edu : any, idx : number) => {
//                         if (typeof edu === "string") {
//                           const eduText = edu.trim();
//                           if (!eduText) return null;
//                           return (
//                             <div key={idx} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600">
//                               <h3 className="text-lg font-semibold text-gray-800">{eduText}</h3>
//                             </div>
//                           );
//                         }

//                         const degree = typeof edu.degree === "string" ? edu.degree.trim() : "";
//                         const institution = typeof edu.institution === "string" ? edu.institution.trim() : "";
//                         const year = typeof edu.year === "string" ? edu.year.trim() : "";

//                         if (!degree && !institution && !year) return null;

//                         return (
//                           <div key={idx} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600 hover:shadow-lg transition-shadow">
//                             {degree && (
//                               <h3 className="text-lg font-bold text-gray-800 mb-2">
//                                 {degree}
//                               </h3>
//                             )}
//                             {institution && (
//                               <p className="font-semibold text-pink-700 mb-1">
//                                 {institution}
//                               </p>
//                             )}
//                             {year && (
//                               <p className="text-sm text-gray-600 flex items-center">
//                                 <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
//                                 {year}
//                               </p>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Skills with Pill Design */}
//                 {Array.isArray(parsedData?.skills) && parsedData.skills.length > 0 && (
//                   <div className="mb-10">
//                     <div className="flex items-center mb-6">
//                       <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2.5 rounded-xl mr-3 shadow-lg">
//                         <Code className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         Skills
//                       </h2>
//                     </div>

//                     <div className="flex flex-wrap gap-3">
//                       {parsedData.skills.map((skill : any, idx : number) => {
//                         let skillName = "";

//                         if (typeof skill === "string") {
//                           skillName = skill.trim();
//                         } else if (typeof skill === "object" && (typeof skill.name === "string" || typeof skill.title === "string")) {
//                           skillName = (skill.name || skill.title || "").trim();
//                         }

//                         if (!skillName) return null;

//                         const colors = [
//                           "from-indigo-500 to-purple-500",
//                           "from-purple-500 to-pink-500",
//                           "from-pink-500 to-rose-500",
//                           "from-cyan-500 to-blue-500",
//                           "from-blue-500 to-indigo-500",
//                           "from-teal-500 to-cyan-500"
//                         ];
//                         const colorClass = colors[idx % colors.length];

//                         return (
//                           <span
//                             key={idx}
//                             className={`px-5 py-2.5 bg-gradient-to-r ${colorClass} text-white rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300`}
//                           >
//                             {skillName}
//                           </span>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}

//                 {/* Certifications with Icon Design */}
//                 {Array.isArray(parsedData?.certifications) && parsedData.certifications.length > 0 && (
//                   <div className="mb-6">
//                     <div className="flex items-center mb-6">
//                       <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2.5 rounded-xl mr-3 shadow-lg">
//                         <Award className="w-6 h-6 text-white" />
//                       </div>
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         Certifications
//                       </h2>
//                     </div>

//                     <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 space-y-3">
//                       {parsedData.certifications.map((cert : any, idx : number) => {
//                         if (typeof cert === "string") {
//                           const certText = cert.trim();
//                           if (!certText) return null;

//                           return (
//                             <div key={idx} className="flex items-start text-gray-700">
//                               <Sparkles className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
//                               <span className="font-medium">{certText}</span>
//                             </div>
//                           );
//                         }

//                         const name = typeof cert.name === "string" ? cert.name.trim() : typeof cert.title === "string" ? cert.title.trim() : "";
//                         const description = typeof cert.description === "string" ? cert.description.trim() : "";

//                         if (!name && !description) return null;

//                         return (
//                           <div key={idx} className="flex items-start">
//                             <Sparkles className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
//                             <div>
//                               <span className="text-gray-800 font-medium">{name || "Untitled Certification"}</span>
//                               {description && (
//                                 <p className="text-gray-600 text-sm mt-1 ml-0">
//                                   {description}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons with Gradient */}
//             <div className="flex gap-4 justify-center pt-4">
//               <button
//                 onClick={() => {
//                 //   setParsedData(null);
//                   setFile(null);
//                   setError(null);
//                 }}
//                 className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
//               >
//                 Upload Another Resume
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }















// "use client";
// import React, { useState, useEffect } from 'react';
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
//   Zap,
//   Brain
// } from 'lucide-react';

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
//       description: "Bridge the gap between talent and opportunity with AI-powered matching",
//       lucideIcon: Briefcase,
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
//       description: "Connect final year projects with industry needs and real-world solutions",
//       lucideIcon: GitBranch,
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
//       description: "Secure your innovations and transform ideas into market-ready solutions",
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
//       description: "Centralized hub for managing student projects with industry mentorship",
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
//       description: "AI-powered resume builder that highlights your skills for employers",
//       lucideIcon: FileText,
//       buttonPrimary: "Create CV",
//       buttonSecondary: "View Templates",
//     },
//     keywords: "CV Builder",
//   },
//   {
//     name: "TalentMatch AI",
//     color: "from-yellow-500 to-amber-500",
//     icon: Star,
//     angle: 225,
//     content: {
//       title1: "CV Upload & Parsing",
//       title2: "Skill Extraction",
//       title3: "Auto-Match",
//       title4: "Recommendations",
//       title5: "Scoring System",
//       title6: "Career Path Suggestions",
//       description: "Intelligent algorithms matching candidates with perfect-fit opportunities",
//       lucideIcon: Zap,
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
//       description: "Professional development programs tailored to industry demands",
//       lucideIcon: Brain,
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
//       description: "Cutting-edge learning platform connecting education with career success",
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
//   const [hoveredModule, setHoveredModule] = useState<number | null>(null);
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

//   const getModulePosition = (angle: number, radius: number) => {
//     const radian = (angle - 90) * (Math.PI / 180);
//     return {
//       x: radius * Math.cos(radian),
//       y: radius * Math.sin(radian),
//     };
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 overflow-hidden">
//       {/* Connected Hexagon Background */}
//       {/* <div className="absolute inset-0 opacity-20">
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
//       </div> */}
//        <div className="absolute inset-0 opacity-10">
//          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//            <defs>
//              <pattern
//               id="hexagons"
//               width="100"
//               height="86.6"
//               patternUnits="userSpaceOnUse"
//             >
//               <polygon
//                 points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
//                 fill="none"
//                 stroke="#3b82f6"
//                 strokeWidth="1.5"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexagons)" />
//         </svg>
//       </div>


//       <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
//         <div className="grid lg:grid-cols-2 gap-20 items-center">
          
//           {/* Left Side - Content */}
//           <div className="space-y-5">
//             {/* Description as Main Heading */}
//             <div 
//               className="transition-all duration-1000 ease-out"
//               style={{
//                 opacity: animationPhase >= displayModule ? 1 : 0,
//                 transform: animationPhase >= displayModule ? 'translateY(0)' : 'translateY(30px)',
//                 transition: 'all 1s ease-out',
//               }}
//             >
//               <h1 className={`text-xl lg:text-3xl font-extrabold bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent leading-tight mb-6`}>
//                 {currentModule.content.description}
//               </h1>
//             </div>

//             {/* Feature Cards with Icons - 3x2 Grid */}
//             <div className="grid grid-cols-3 gap-5">
//               {[1, 2, 3, 4, 5, 6].map((num) => {
//                 type TitleKey = 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'title6';
//                 const titleKey = `title${num}` as TitleKey;
//                 const icons = [Briefcase, GitBranch, Lightbulb, Rocket, FileText, Zap];
//                 const CardIcon = icons[num - 1];
                
//                 return (
//                   <div
//                     key={num}
//                     className={`group relative bg-white rounded-2xl p-3 border-2 transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl cursor-pointer ${
//                       isYellow 
//                         ? 'border-amber-200 hover:border-amber-400 hover:shadow-amber-500/30' 
//                         : 'border-blue-200 hover:border-blue-400 hover:shadow-blue-500/30'
//                     }`}
//                     style={{
//                       opacity: animationPhase >= displayModule ? 1 : 0,
//                       transform: animationPhase >= displayModule ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
//                       transitionDelay: `${num * 120}ms`,
//                       transition: 'all 0.7s ease-out',
//                     }}
//                   >
//                     <div className="flex flex-col items-center text-center space-y-3">
//                       <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-8 transition-all duration-700 shadow-lg`}>
//                         <CardIcon className="w-5 h-5 text-white" />
//                       </div>
//                       <p className={`text-xs font-bold leading-tight bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}>
//                         {String(currentModule.content[titleKey])}
//                       </p>
//                     </div>
//                     <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${currentModule.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Module Name with Icon */}
//             {/* <div 
//               className="flex items-center gap-4"
//               style={{
//                 opacity: animationPhase >= displayModule ? 1 : 0,
//                 transform: animationPhase >= displayModule ? 'translateX(0)' : 'translateX(-30px)',
//                 transitionDelay: '800ms',
//                 transition: 'all 1s ease-out',
//               }}
//             >
//               <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center shadow-lg`}>
//                 {React.createElement(currentModule.icon, {
//                   className: "w-7 h-7 text-white",
//                 })}
//               </div>
//               <h2 className={`text-3xl font-bold bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}>
//                 {currentModule.name}
//               </h2>
//             </div> */}

//             {/* Beautiful Buttons */}
//             <div 
//               className="flex gap-5 pt-4"
//               style={{
//                 opacity: animationPhase >= displayModule ? 1 : 0,
//                 transform: animationPhase >= displayModule ? 'translateY(0)' : 'translateY(30px)',
//                 transitionDelay: '900ms',
//                 transition: 'all 1s ease-out',
//               }}
//             >
//               <button className={`group relative px-10 py-5 bg-gradient-to-r ${currentModule.color} text-white rounded-2xl font-bold text-lg overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 ${
//                 isYellow ? 'hover:shadow-2xl hover:shadow-amber-500/50' : 'hover:shadow-2xl hover:shadow-blue-500/50'
//               }`}>
//                 <span className="relative z-10">{currentModule.content.buttonPrimary}</span>
//                 <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
//               </button>
//               <button className={`group relative px-10 py-5 bg-white text-gray-800 rounded-2xl font-bold text-lg border-2 overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
//                 isYellow 
//                   ? 'border-amber-300 hover:border-amber-500' 
//                   : 'border-blue-300 hover:border-blue-500'
//               }`}>
//                 <span className={`relative z-10 bg-gradient-to-r ${currentModule.color} bg-clip-text text-transparent`}>
//                   {currentModule.content.buttonSecondary}
//                 </span>
//                 <div className={`absolute inset-0 bg-gradient-to-r ${currentModule.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Circular Module Display */}
//           <div className="relative flex items-center justify-center h-[700px]">
//             {/* Central Circle with Module Name */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative">
//                 <div className={`w-42 h-42 rounded-full bg-gradient-to-br ${currentModule.color} shadow-2xl flex flex-col items-center justify-center transition-all duration-1000 ${
//                   isYellow ? 'shadow-amber-500/40' : 'shadow-blue-500/40'
//                 }`}>
//                   {React.createElement(currentModule.content.lucideIcon, {
//                     className: "w-15 h-15 text-white mb-3",
//                   })}
//                   <p className="text-base font-bold text-white text-center px-4">
//                     {currentModule.name}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Orbiting Modules */}
//             {modules.map((module, index) => {
//               const pos = getModulePosition(module.angle, 260);
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
//                     transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${isActive ? 1.2 : 1}) rotate(${module.angle}deg)`,
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
//                       className={`relative w-30 h-30 rounded-2xl bg-gradient-to-br ${module.color} shadow-xl flex flex-col items-center justify-center transition-all duration-1000 ease-out ${
//                         isActive ? 'ring-4 ring-white ring-offset-4 ring-offset-slate-100' : ''
//                       } group-hover:-translate-y-4 group-hover:scale-110 group-hover:ring-4 group-hover:ring-white group-hover:ring-offset-4 group-hover:ring-offset-slate-100 ${
//                         moduleIsYellow ? 'group-hover:shadow-2xl group-hover:shadow-amber-500/50' : 'group-hover:shadow-2xl group-hover:shadow-blue-500/50'
//                       }`}
//                     >
//                       <div className="flex flex-col items-center justify-center space-y-2">
//                         {React.createElement(Icon, {
//                           className: "w-14 h-14 text-white",
//                         })}
//                         <p className="text-white text-xs font-bold text-center px-2">
//                           {module.name}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:-translate-y-1">
//                       <p className={`text-xs font-semibold whitespace-nowrap bg-white px-4 py-2 rounded-xl backdrop-blur-sm border-2 shadow-lg ${
//                         moduleIsYellow 
//                           ? 'border-amber-300 text-amber-700' 
//                           : 'border-blue-300 text-blue-700'
//                       }`}>
//                         {module.keywords}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             {/* Connecting Lines with Glow */}
//             {/* <svg className="absolute inset-0 w-full h-full pointer-events-none">
//               <defs>
//                 <filter id="glow">
//                   <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
//                   <feMerge>
//                     <feMergeNode in="coloredBlur"/>
//                     <feMergeNode in="SourceGraphic"/>
//                   </feMerge>
//                 </filter>
//               </defs>
//               {modules.map((module, index) => {
//                 if (index === displayModule) {
//                   const pos = getModulePosition(module.angle, 260);
//                   return (
//                     <line
//                       key={index}
//                       x1="50%"
//                       y1="50%"
//                       x2={`calc(50% + ${pos.x}px)`}
//                       y2={`calc(50% + ${pos.y}px)`}
//                       stroke={isYellow ? "#f59e0b" : "#3b82f6"}
//                       strokeWidth="4"
//                       className="animate-pulse"
//                       filter="url(#glow)"
//                       opacity="0.7"
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </svg> */}

//             {/* Orbit Rings */}
//             {/* <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//               <div className={`w-[375px] h-[375px] rounded-full border-2 animate-pulse ${
//                 isYellow ? 'border-amber-300/30' : 'border-blue-300/30'
//               }`} style={{ animationDuration: '3s' }}></div>
//               <div className={`absolute w-[400px] h-[400px] rounded-full border animate-pulse ${
//                 isYellow ? 'border-amber-200/20' : 'border-blue-200/20'
//               }`} style={{ animationDuration: '4s' }}></div>
//             </div> */}
//           </div>
//         </div>
//       </div>

//       {/* Floating Particles */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(60)].map((_, i) => (
//           <div
//             key={i}
//             className={`absolute w-2 h-2 rounded-full animate-pulse ${
//               i % 2 === 0 ? 'bg-blue-400' : 'bg-amber-400'
//             }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default HeroSection;













// import React, { useState, useEffect } from "react";
// import {
//   Briefcase,
//   Brain,
//   Users,
//   Rocket,
//   Lightbulb,
//   GitBranch,
//   FileText,
//   GraduationCap,
//   Zap,
//   Handshake,
//   FolderSymlink,
//   RocketIcon,
//   NotepadText,
//   Star,
//   TrendingUp,
// } from "lucide-react";

// const modules = [
//   {
//     name: "HireConnect",
//     color: "from-blue-600 to-blue-700",
//     icon: <Handshake className="w-10 h-10 text-white" />,
//     angle: 0,
//     content: {
//       title1: "Job Posting",
//       title2: "Job Search & Filters",
//       title3: "Application Tracking",
//       title4: "Shortlisting Tools",
//       title5: "Interview Scheduling",
//       title6: "Employer Dashboard",
//       description:
//         "Bridge the gap between talent and opportunity with AI-powered matching",
//       lucideIcon: Briefcase,
//       buttonPrimary: "Find Talent",
//       buttonSecondary: "Post Jobs",
//     },
//     keywords: "Job Posting & Hiring",
//   },
//   {
//     name: "FYP Bridge",
//     color: "from-yellow-500 to-amber-500",
//     icon: <FolderSymlink className="w-10 h-10 text-white" />,
//     angle: 45,
//     content: {
//       title1: "Project Selection",
//       title2: "Mentor Assign",
//       title3: "Progress Tracking",
//       title4: "Submission Portal",
//       title5: "Project Submission",
//       title6: "Feedback & Evaluation",
//       description:
//         "Connect final year projects with industry needs and real-world solutions",
//       lucideIcon: GitBranch,
//       buttonPrimary: "Explore Projects",
//       buttonSecondary: "Submit FYP",
//     },
//     keywords: "Industry-Sponsored Final Year Projects",
//   },
//   {
//     name: "Idea Vault",
//     color: "from-blue-600 to-blue-700",
//     icon: <Lightbulb className="w-10 h-10 text-white" />,
//     angle: 90,
//     content: {
//       title1: "Idea Submission",
//       title2: "Idea Categories & Tags",
//       title3: "Student Browse & Ideas",
//       title4: "Collaboration Requests",
//       title5: "Voting / Rating System",
//       title6: "Idea-to-Project Conversion",
//       description:
//         "Secure your innovations and transform ideas into market-ready solutions",
//       lucideIcon: Lightbulb,
//       buttonPrimary: "Submit Ideas",
//       buttonSecondary: "Browse Vault",
//     },
//     keywords: "FYP Idea Bank",
//   },
//   {
//     name: "ProjectHub",
//     color: "from-yellow-500 to-amber-500",
//     icon: <RocketIcon className="w-10 h-10 text-white" />,
//     angle: 135,
//     content: {
//       title1: "Project Posting",
//       title2: "Bidding System",
//       title3: "Proposal Submission",
//       title4: "Contracting & Escrow Payments",
//       title5: "Project Progress Tracking",
//       title6: "Review & Rating",
//       description:
//         "Centralized hub for managing student projects with industry mentorship",
//       lucideIcon: Rocket,
//       buttonPrimary: "Start Project",
//       buttonSecondary: "View Hub",
//     },
//     keywords: "Commercial Projects",
//   },
//   {
//     name: "CV Forge",
//     color: "from-blue-600 to-blue-700",
//     icon: <NotepadText className="w-10 h-10 text-white" />,
//     angle: 180,
//     content: {
//       title1: "CV Templates",
//       title2: "Skill-Based Sections",
//       title3: "Cover Letter Generator",
//       title4: "Porfolio/Project Showcase",
//       title5: "Export to PDF",
//       title6: "One-Click Apply",
//       description:
//         "AI-powered resume builder that highlights your skills for employers",
//       lucideIcon: FileText,
//       buttonPrimary: "Create CV",
//       buttonSecondary: "View Templates",
//     },
//     keywords: "CV Builder",
//   },
//   {
//     name: "TalentMatch AI",
//     color: "from-yellow-500 to-amber-500",
//     icon: <Star className="w-10 h-10 text-white" />,
//     angle: 225,
//     content: {
//       title1: "CV Upload & Parsing",
//       title2: "Skill Extraction",
//       title3: "Auto-Match",
//       title4: "Recommandations",
//       title5: "Scoring System",
//       title6: "Career Path Suggestions",
//       description:
//         "Intelligent algorithms matching candidates with perfect-fit opportunities",
//       lucideIcon: Zap,
//       buttonPrimary: "Get Matched",
//       buttonSecondary: "See Matches",
//     },
//     keywords: "Smart CV Analyzer & Matching",
//   },
//   {
//     name: "SkillBoost Pro",
//     color: "from-blue-600 to-blue-700",
//     icon: <TrendingUp className="w-10 h-10 text-white" />,
//     angle: 270,
//     content: {
//       title1: "Employer Training",
//       title2: "Custom Course Builder",
//       title3: "Trainer Onboarding",
//       title4: "Learning Management Dashboard",
//       title5: "Employee Progress Tracking",
//       title6: "Certification & Reporting",
//       description:
//         "Professional development programs tailored to industry demands",
//       lucideIcon: Brain,
//       buttonPrimary: "Start Learning",
//       buttonSecondary: "View Courses",
//     },
//     keywords: "Corporate Training",
//   },
//   {
//     name: "LearnEdge",
//     color: "from-yellow-500 to-amber-500",
//     icon: <GraduationCap className="w-10 h-10 text-white" />,
//     angle: 315,
//     content: {
//       title1: "Course Catalog",
//       title2: "Skill Based Recommendations",
//       title3: "Live / Recorded Classes",
//       title4: "Practice Assignment & Quizzes",
//       title5: "Discussions & Communities",
//       title6: "Certificates & Badges",
//       description:
//         "Cutting-edge learning platform connecting education with career success",
//       lucideIcon: GraduationCap,
//       buttonPrimary: "Join Platform",
//       buttonSecondary: "Explore Learning",
//     },
//     keywords: "Individual Training",
//   },
// ];

// export default function HeroSection() {
//   const [activeModule, setActiveModule] = useState(0);
//   const [poppedModules, setPoppedModules] = useState<number[]>([]);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule((prev) => {
//         setPoppedModules((prevPopped) => [...prevPopped, prev]);
//         setTimeout(() => {
//           setPoppedModules((prevPopped) =>
//             prevPopped.filter((m) => m !== prev)
//           );
//         }, 3000);
//         return (prev + 1) % modules.length;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []); // run once on mount

//   const getPosition = (index: number) => {
//     const angle = (modules[index].angle - 90) * (Math.PI / 180);
//     const radius = 220;
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//     };
//   };

//   const activeContent = modules[activeModule].content;
//   const ActiveIcon = activeContent.lucideIcon;
//   const isBlueModule = modules[activeModule].color.includes("blue");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden mt-10">
//       {/* Hexagonal Network Background */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern
//               id="hexagons"
//               width="100"
//               height="86.6"
//               patternUnits="userSpaceOnUse"
//             >
//               <polygon
//                 points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
//                 fill="none"
//                 stroke="#3b82f6"
//                 strokeWidth="1.5"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexagons)" />
//         </svg>
//       </div>

//       {/* Animated Network Dots */}
//       <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//       <div
//         className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
//         style={{ animationDelay: "0.5s" }}
//       ></div>
//       <div
//         className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse"
//         style={{ animationDelay: "1s" }}
//       ></div>
//       <div
//         className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"
//         style={{ animationDelay: "1.5s" }}
//       ></div>

//       <div className="relative z-10 container mx-auto px-6 py-10 flex items-center min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
//           {/* Left Content - Dynamic based on active module */}
//           <div className="space-y-8 mx-8">
//             <div className="space-y-6">
//               <div className="flex flex-col space-y-4">
//                 {/* Dynamic Title 1 */}
//                 <p
//                   key={`desc-${activeModule}`}
//                   className={`text-3xl leading-relaxed max-w-xl animate-slideInLeft font-bold transition-all duration-500 ${
//                     isBlueModule ? "text-yellow-600" : " text-blue-700"
//                   }`}
//                   style={{ animationDelay: "0.45s" }}
//                 >
//                   {activeContent.description}
//                 </p>
//                 <div className="max-w-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
//                   <div
//                     key={`title1-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-3 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title1}
//                     </h2>
//                   </div>
//                   <div
//                     key={`title2-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-5 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title2}
//                     </h2>
//                   </div>
//                   <div
//                     key={`title3-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-3 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title3}
//                     </h2>
//                   </div>
//                   <div
//                     key={`title4-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-3 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title4}
//                     </h2>
//                   </div>
//                   <div
//                     key={`title5-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-3 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title5}
//                     </h2>
//                   </div>
//                   <div
//                     key={`title6-${activeModule}`}
//                     className={`flex flex-col items-center justify-center mx-3 text-center p-2 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg ${
//                       isBlueModule ? "bg-yellow-50" : "bg-blue-50"
//                     } animate-slideInLeft`}
//                     style={{ animationDelay: "0s" }}
//                   >
//                     <div
//                       className={`p-2 rounded-full mb-2 transition-colors duration-500 ${
//                         isBlueModule ? "bg-yellow-500/10" : "bg-blue-600/10"
//                       }`}
//                     >
//                       <ActiveIcon
//                         className={`w-5 h-5 transition-colors duration-500 ${
//                           isBlueModule ? "text-yellow-600" : "text-blue-600"
//                         }`}
//                       />
//                     </div>

//                     <h2
//                       className={`text-xs leading-tight tracking-tight transition-colors duration-500 ${
//                         isBlueModule ? "text-yellow-600" : "text-blue-700"
//                       }`}
//                     >
//                       {activeContent.title6}
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Dynamic Buttons */}
//             <div
//               key={`buttons-${activeModule}`}
//               className="flex flex-wrap gap-4 animate-slideInLeft"
//               style={{ animationDelay: "0.6s" }}
//             >
//               <button
//                 className={`group px-8 py-2 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 ${
//                   isBlueModule
//                     ? "bg-yellow-500 hover:bg-yellow-600"
//                     : "bg-blue-600 hover:bg-blue-700 "
//                 }`}
//               >
//                 {activeContent.buttonPrimary}
//                 <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
//                   →
//                 </span>
//               </button>

//               <button
//                 className={`group px-8 py-2 bg-white rounded-full font-bold text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 border-2 ${
//                   isBlueModule
//                     ? "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
//                     : "border-blue-600 text-blue-600 hover:bg-blue-50 "
//                 }`}
//               >
//                 {activeContent.buttonSecondary}
//                 <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
//                   →
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Circular Module Layout */}
//           <div className="relative flex items-center justify-center h-[650px]">
//             <div className="relative w-full h-full flex items-center justify-center">
//               {/* Center Circle - Domains Included */}
//               <div className="absolute z-30 w-45 h-45 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex items-center justify-center">
//                 <div className="text-center rounded-full overflow-hidden w-full h-full">
//                   <img
//                     src="/logo3.jpg"
//                     alt="Logo"
//                     className="w-full h-full object-cover rounded-full"
//                   />
//                 </div>
//               </div>

//               {/* Orbital Rings */}
//               <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-blue-200/50"></div>
//               <div className="absolute w-[520px] h-[520px] rounded-full border border-blue-100/30"></div>

//               {/* Circular Modules */}
//               {modules.map((module, index) => {
//                 const pos = getPosition(index);
//                 const isActive = activeModule === index;
//                 const isPopped = poppedModules.includes(index);

//                 return (
//                   <div
//                     key={index}
//                     className="absolute transition-all duration-700 cursor-pointer"
//                     style={{
//                       transform: `translate(${pos.x}px, ${pos.y}px) scale(${
//                         isPopped ? 1.2 : 0.9
//                       })`,
//                       zIndex: isPopped ? 25 : 18,
//                       // animation: isPopped
//                       //   ? "popBounce 1s cubic-bezier(0.25, 1.1, 0.3, 1)"
//                       //   : "none",
//                     }}
//                     // onMouseEnter={(e) =>
//                     //   (e.currentTarget.style.animation =
//                     //     "popBounce 1s cubic-bezier(0.25, 1.1, 0.3, 1)")
//                     // }
//                     // onMouseLeave={(e) =>
//                     //   (e.currentTarget.style.animation = "none")
//                     // }
//                     onClick={() => setActiveModule(index)}
//                   >
//                     {/* Module Card with Enhanced Effects */}
//                     <div
//                       className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${
//                         module.color
//                       } shadow-2xl hover:shadow-3xl transition-all duration-700 flex flex-col items-center justify-center group overflow-hidden border-4 border-white/20
//                       ${isPopped ? "animate-popBounce" : ""}`}
//                     >
//                       {/* Shine Effect */}
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-all duration-1000 ${
//                           isPopped
//                             ? "opacity-100 translate-x-0"
//                             : "opacity-0 -translate-x-full"
//                         }`}
//                       ></div>

//                       <div className="relative z-10 text-center">
//                         <div
//                           className={`text-5xl mb-2 flex justify-center transition-all duration-700 drop-shadow-2xl ${
//                             isPopped ? "scale-125 rotate-12" : "scale-100"
//                           }`}
//                         >
//                           {module.icon}
//                         </div>
//                         <p className="text-white font-bold text-sm px-2 leading-tight drop-shadow-lg">
//                           {module.name}
//                         </p>
//                         <p className="text-white text-xs px-2 leading-tight drop-shadow-lg">
//                           {module.keywords}
//                         </p>
//                       </div>

//                       {/* Multiple Pulse Rings when Popped */}
//                       {isPopped && (
//                         <>
//                           <div className="absolute inset-0 animate-pingRing"></div>
//                           <div
//                             className="absolute inset-0 animate-pingRing"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </>
//                       )}
//                     </div>

//                     {/* Enhanced Side Label with Dot */}
//                     <div
//                       className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
//                       style={{
//                         left: pos.x > 0 ? "100%" : "auto",
//                         right: pos.x < 0 ? "100%" : "auto",
//                         marginLeft: pos.x > 0 ? "12px" : "0",
//                         marginRight: pos.x < 0 ? "12px" : "0",
//                       }}
//                     >
//                       <div
//                         className={`w-3 h-3 rounded-full transition-all duration-700 ${
//                           isActive
//                             ? "bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50 scale-125"
//                             : "bg-blue-400/50"
//                         }`}
//                       ></div>
//                       <div
//                         className={`h-px w-6 transition-all duration-700 ${
//                           isActive
//                             ? "bg-yellow-400 shadow-sm shadow-yellow-400"
//                             : "bg-blue-400/50"
//                         }`}
//                       ></div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-80px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes popBounce {
//           0% {
//             transform: scale(0.8);
//           }
//           60% {
//             transform: scale(1);
//           }
//           100% {
//             transform: scale(1);
//           }
//         }

//         @keyframes pingRing {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(1.8);
//             opacity: 0;
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) translateX(0px);
//             opacity: 0.3;
//           }
//           50% {
//             transform: translateY(-20px) translateX(10px);
//             opacity: 0.6;
//           }
//         }

//         @keyframes slowSpin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes slowSpinReverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
//         }

//         .animate-popBounce {
//           animation: popBounce 1.2s cubic-bezier(0.24, 1.12, 0.48, 0.8);
//         }

//         .animate-pingRing {
//           animation: pingRing 1.2s cubic-bezier(0.4, 0, 0.6, 1);
//         }

//         .animate-float {
//           animation: float 8s ease-in-out infinite;
//         }

//         .animate-slowSpin {
//           animation: slowSpin 30s linear infinite;
//         }

//         .animate-slowSpinReverse {
//           animation: slowSpinReverse 40s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }























