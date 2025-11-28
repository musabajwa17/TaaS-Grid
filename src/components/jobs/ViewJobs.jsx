// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import api from "../../lib/api";
// import useJobs from "../../hooks/useJobs";
// import useJobFilters from "../../hooks/useJobsFilter";
// import { useAuth } from "../../auth/AuthContext";
// import { prettyDate } from "../../utils/date";
// import { getStatusColor } from "../../utils/statusColors";
// import { useResume } from "@/hooks/useStdPreviewResume";
// import { getCategoryBadge } from "../../utils/categoryBadges";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   DollarSign,
//   Clock,
//   CheckCircle2,
//   ChevronRight,
//   Building2,
//   Lightbulb,
//   BookOpen,
//   Layers,
//   Calendar,
//   Mail,
//   Home,
//   Sparkles,
// } from "lucide-react";

// export default function JobView() {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [titleFilter, setTitleFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [jobTypeFilter, setJobTypeFilter] = useState("");
//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const { jobs, selectedJob, setSelectedJob } = useJobs(activeCategory);
//   const filteredJobs = useJobFilters(jobs, titleFilter, locationFilter, jobTypeFilter);
//   const [resume, setResume] = useState(null);

//   const categories = [
//     { id: "all", label: "All Opportunities", icon: Layers, gradient: "from-green-500 to-teal-500" },
//     { id: "job", label: "Jobs", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
//     { id: "internship", label: "Internships", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
//     { id: "fyp", label: "FYP Ideas", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
//   ];

//   const canApply = user && ["student", "employee"].includes(user.role);

//   // ✅ Fetch user's applied jobs
//   useEffect(() => {
//     if (!user) return;
//     console.log("User for applied jobs fetch:", user);
//     const fetchAppliedJobs = async () => {
//       try {
//         const res = await api.get(`/api/applicants?userId=${user._id}`);
//         console.log("Applied Jobs Response:", res.data);
//         if (res.data.success) {
//           setAppliedJobs(res.data.applicants.map(a => a.jobId));
//         }
//       } catch (err) {
//         console.error("Error fetching applied jobs:", err);
//       }
//     };
//     fetchAppliedJobs();
//   }, [user]);

//   // --- Fetch resume per role ---
//   useEffect(() => {
//     if (!user?._id) return;

//     const fetchResume = async () => {
//       try {
//         const route =
//           user.role === "student"
//             ? `/api/student/stdresume/${user._id}`
//             : `/api/employee/resume/${user._id}`;

//         const res = await api.get(route);
//         console.log("Resume fetch response:", res.data);
//         setResume(res.data.resume || null);
//       } catch {
//         setResume(null);
//       }
//     };

//     fetchResume();
//   }, [user?._id, user?.role]);

//   //   // --- Apply handler ---
//   const handleApply = async () => {
//     console.log("Handle Apply Invoked", resume);
//     if (!user) return router.push("/login");
//     if (!canApply) return toast.error("Only students and employees can apply");
//     if (!selectedJob) return toast.error("No job selected");

//     if (!resume?._id)
//       return toast.error("No resume found. Please create a resume first.");

//     if (appliedJobs.includes(String(selectedJob._id)))
//       return toast.error("You already applied");

//     try {
//       const res = await api.post("/api/applicants", {
//         userId: user._id,
//         jobId: selectedJob._id,
//         resumeId: resume?._id || null,
//         resumeModel: user.role === "student" ? "StdResume" : "EmployeeResume"
//       });

//       if (res.data.success) {
//         setAppliedJobs(prev => [...prev, String(selectedJob._id)]);
//         toast.success("Applied successfully!");
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to apply");
//       console.error(err);
//     }
//   };

//   const handleSave = () => {
//     if (!user) return router.push("/login");
//     toast.success("Saved for later!");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-6 my-16">
//       {/* Search Filters */}
//       <div className="flex flex-col lg:flex-row gap-4 mb-6">
//         <div className="flex-1 relative group">
//           <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
//           <input
//             type="text"
//             placeholder="Search by job title, keywords..."
//             value={titleFilter}
//             onChange={(e) => setTitleFilter(e.target.value)}
//             className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
//           />
//         </div>
//         <div className="relative w-full lg:w-80 group">
//           <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
//           <input
//             type="text"
//             placeholder="Location..."
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
//           />
//         </div>
//       </div>

//       {/* Category Tabs */}
//       <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
//         {categories.map((cat) => {
//           const Icon = cat.icon;
//           const isActive = activeCategory === cat.id;
//           return (
//             <button
//               key={cat.id}
//               onClick={() => { setActiveCategory(cat.id); setJobTypeFilter(""); }}
//               className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${isActive ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : "bg-white text-gray-700 hover:shadow-lg"
//                 }`}
//             >
//               <Icon className="w-5 h-5" /> {cat.label}
//             </button>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Jobs List */}
//         <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
//           {filteredJobs.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl shadow-md">
//               <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No opportunities found</p>
//               <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
//             </div>
//           ) : (
//             filteredJobs.map((job) => {
//               const badge = getCategoryBadge(job.category);
//               const BadgeIcon = badge.icon;
//               const isSelected = selectedJob?._id === job._id;
//               return (
//                 <div
//                   key={job._id}
//                   onClick={() => setSelectedJob(job)}
//                   className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected
//                     ? "border-green-500 bg-white shadow-2xl ring-2 ring-green-200"
//                     : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg"
//                     }`}
//                 >
//                   <div className="flex items-start justify-between gap-3 mb-3">
//                     <h3 className="font-bold text-lg text-gray-800 flex-1 leading-tight">{job.title}</h3>
//                     <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.gradient} text-white shadow-sm shrink-0`}>
//                       <BadgeIcon className="w-3.5 h-3.5" />
//                       {badge.label}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
//                     <MapPin className="w-4 h-4 text-green-500 shrink-0" />
//                     <span className="truncate">{job.location}</span>
//                   </div>
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-2 text-sm text-gray-500">
//                       <Calendar className="w-4 h-4 text-teal-500 shrink-0" />
//                       <span className="whitespace-nowrap">{prettyDate(job.createdAt)}</span>
//                     </div>
//                     <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(job.status)} shadow-sm shrink-0`}>
//                       {job.status}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Job Details */}
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 max-h-[80vh] overflow-y-auto border border-gray-100">
//           {selectedJob ? (
//             <div className="animate-fadeIn">
//               {/* Title & Info */}
//               <div className="mb-6">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex-1">
//                     <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">{selectedJob.title}</h1>
//                     <div className="flex flex-wrap gap-3 mt-3">
//                       <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
//                         <MapPin className="w-4 h-4 text-green-500" />
//                         <span className="font-medium">{selectedJob.location}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600 bg-teal-50 px-3 py-2 rounded-lg">
//                         <DollarSign className="w-4 h-4 text-teal-500" />
//                         <span className="font-medium">{selectedJob.salary}</span>
//                       </div>
//                       <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
//                         <Clock className="w-4 h-4 text-green-500" />
//                         <span className="font-medium">{selectedJob.jobType}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(selectedJob.status)} shadow-md`}>{selectedJob.status}</span>
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="mb-8">
//                 <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
//               </div>

//               {/* Company Info */}
//               {selectedJob.postedBy && (
//                 <div className="border-2 border-green-100 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-teal-50 shadow-sm mb-6">
//                   <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
//                     <Building2 className="w-5 h-5 text-green-500" />
//                     Company Information
//                   </h4>
//                   <div className="space-y-3">
//                     <p className="text-gray-800 font-semibold text-lg">{selectedJob.postedBy.companyName || selectedJob.postedBy.name}</p>
//                     {selectedJob.postedBy.email && (
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Mail className="w-4 h-4 text-teal-500" />
//                         <span>{selectedJob.postedBy.email}</span>
//                       </div>
//                     )}
//                     {selectedJob.postedBy.address && (
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <Home className="w-4 h-4 text-teal-500" />
//                         <span>{selectedJob.postedBy.address}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Apply & Save */}
//               <div className="flex gap-4 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={handleApply}
//                   disabled={appliedJobs.includes(selectedJob._id)}
//                   className={`flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${!user
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : appliedJobs.includes(selectedJob._id)
//                       ? "bg-gray-400 text-white cursor-not-allowed"
//                       : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:scale-[1.02]"
//                     }`}
//                 >
//                   <CheckCircle2 className="w-5 h-5" />
//                   {appliedJobs.includes(selectedJob._id) ? "Applied" : "Apply Now"}

//                 </button>

//                 <button
//                   onClick={handleSave}
//                   className="flex-1 bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
//                 >
//                   <Briefcase className="w-5 h-5" />
//                   Save for Later
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-full text-center py-20">
//               <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6 shadow-lg">
//                 <ChevronRight className="w-16 h-16 text-green-600" />
//               </div>
//               <p className="text-gray-500 text-xl font-medium mb-2">Select an opportunity</p>
//               <p className="text-gray-400 text-sm">Choose from the list to view details</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "../../lib/api";
import useJobs from "../../hooks/useJobs";
import useJobFilters from "../../hooks/useJobsFilter";
import { useAuth } from "../../auth/AuthContext";
import { prettyDate } from "../../utils/date";
import { getStatusColor } from "../../utils/statusColors";
import { useResume } from "@/hooks/useStdPreviewResume";
import { getCategoryBadge } from "../../utils/categoryBadges";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle2,
  ChevronRight,
  Building2,
  Lightbulb,
  BookOpen,
  Layers,
  Calendar,
  Mail,
  Home,
  Sparkles,
  AlertCircle,
  Award,
  TrendingUp,
  Filter,
  X,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Target,
  FileText,
} from "lucide-react";

export default function JobView() {
  const router = useRouter();
  const { user } = useAuth();
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showMatchScreen, setShowMatchScreen] = useState(false);
  const { jobs, selectedJob, setSelectedJob } = useJobs(activeCategory);
  const filteredJobs = useJobFilters(jobs, titleFilter, locationFilter, jobTypeFilter);
  const [resume, setResume] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const categories = [
    { id: "all", label: "All Opportunities", icon: Layers, gradient: "from-green-500 to-teal-500" },
    { id: "job", label: "Jobs", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
    { id: "internship", label: "Internships", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
    { id: "fyp", label: "FYP Ideas", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Remote"];

  const canApply = user && ["student", "employee"].includes(user.role);

  // Fetch applied jobs
  useEffect(() => {
    if (!user) return;
    const fetchAppliedJobs = async () => {
      try {
        const res = await api.get(`/api/applicants?userId=${user._id}`);
        if (res.data.success) {
          setAppliedJobs(res.data.applicants.map(a => a.jobId));
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };
    fetchAppliedJobs();
  }, [user]);

  // Fetch resume
  useEffect(() => {
    if (!user?._id) return;

    const fetchResume = async () => {
      try {
        const route =
          user.role === "student"
            ? `/api/student/stdresume/${user._id}`
            : `/api/employee/resume/${user._id}`;

        const res = await api.get(route);
        setResume(res.data.resume || null);
      } catch {
        setResume(null);
      }
    };

    fetchResume();
  }, [user?._id, user?.role]);

  // Advanced credential matching algorithm
  const checkCredentialMatch = () => {
    if (!resume || !selectedJob) return { isMatch: false, issues: [], matchScore: 0, matchDetails: {} };

    const issues = [];
    let matchScore = 0;
    const matchDetails = {
      titleMatch: 0,
      skillsMatch: 0,
      experienceMatch: 0,
      descriptionMatch: 0
    };

    // ==================== TITLE MATCHING (35 points) ====================
    const jobTitle = selectedJob.title.toLowerCase().trim();
    const resumeTitle = (resume.title || "").toLowerCase().trim();

    // Extract meaningful keywords (ignore common words)
    const commonWords = ['developer', 'engineer', 'designer', 'manager', 'specialist', 'intern', 'junior', 'senior', 'lead'];
    const jobTitleWords = jobTitle.split(/[\s\-\/,]+/).filter(w => w.length > 2);
    const resumeTitleWords = resumeTitle.split(/[\s\-\/,]+/).filter(w => w.length > 2);

    // Technology/Stack keywords (weighted more heavily)
    const techKeywords = ['mern', 'mean', 'full stack', 'fullstack', 'frontend', 'front-end', 'backend', 'back-end',
      'react', 'angular', 'vue', 'node', 'express', 'mongodb', 'postgresql', 'mysql',
      'java', 'python', 'javascript', 'typescript', 'php', 'ruby', 'golang', 'c++', 'c#',
      'devops', 'data', 'machine learning', 'ai', 'mobile', 'ios', 'android', 'flutter'];

    // Check for exact title match
    if (jobTitle === resumeTitle) {
      matchScore += 35;
      matchDetails.titleMatch = 100;
    } else {
      // Check for tech stack match in titles
      let techMatches = 0;
      techKeywords.forEach(tech => {
        if (jobTitle.includes(tech) && resumeTitle.includes(tech)) {
          techMatches++;
        }
      });

      // Calculate keyword overlap
      const matchingWords = jobTitleWords.filter(jWord =>
        resumeTitleWords.some(rWord =>
          rWord.includes(jWord) || jWord.includes(rWord) ||
          (jWord.length > 3 && rWord.length > 3 && (rWord.startsWith(jWord.slice(0, 4)) || jWord.startsWith(rWord.slice(0, 4))))
        )
      );

      const titleMatchPercentage = techMatches > 0
        ? Math.min(100, (techMatches * 40 + (matchingWords.length / jobTitleWords.length) * 60))
        : (matchingWords.length / jobTitleWords.length) * 100;

      matchScore += Math.round((titleMatchPercentage / 100) * 35);
      matchDetails.titleMatch = Math.round(titleMatchPercentage);

      if (titleMatchPercentage < 30) {
        issues.push({
          type: "title",
          severity: "high",
          message: `Your resume title "${resume.title}" doesn't align with "${selectedJob.title}"`
        });
      }
    }

    // ==================== SKILLS MATCHING (35 points) ====================
    const jobDescription = (selectedJob.description || "").toLowerCase();
    const resumeSkills = (resume.skills || []).map(s => s.toLowerCase().trim());

    // Extract skills mentioned in job description
    const requiredSkills = [];
    resumeSkills.forEach(skill => {
      if (jobDescription.includes(skill.toLowerCase()) || jobTitle.includes(skill.toLowerCase())) {
        requiredSkills.push(skill);
      }
    });

    // Extract tech keywords from job description
    const jobTechKeywords = [];
    techKeywords.forEach(tech => {
      if (jobDescription.includes(tech) || jobTitle.includes(tech)) {
        jobTechKeywords.push(tech);
      }
    });

    // Additional common tech terms to check
    const allTechTerms = [
      'react', 'reactjs', 'react.js', 'angular', 'vue', 'vuejs',
      'node', 'nodejs', 'node.js', 'express', 'expressjs', 'express.js',
      'mongodb', 'mongo', 'postgresql', 'postgres', 'mysql', 'sql',
      'javascript', 'typescript', 'html', 'css', 'sass', 'less',
      'tailwind', 'bootstrap', 'material ui', 'mui',
      'redux', 'context api', 'hooks', 'jwt', 'oauth',
      'rest api', 'graphql', 'websocket', 'socket.io',
      'git', 'github', 'gitlab', 'docker', 'kubernetes',
      'aws', 'azure', 'gcp', 'heroku', 'vercel', 'netlify',
      'jest', 'mocha', 'cypress', 'testing', 'unit test',
      'agile', 'scrum', 'jira', 'ci/cd', 'devops'
    ];

    let matchedSkillsCount = 0;
    const matchedSkills = [];

    allTechTerms.forEach(term => {
      if ((jobDescription.includes(term) || jobTitle.includes(term)) &&
        resumeSkills.some(skill => skill.includes(term) || term.includes(skill))) {
        matchedSkillsCount++;
        matchedSkills.push(term);
      }
    });

    if (resumeSkills.length > 0) {
      const skillMatchPercentage = jobTechKeywords.length > 0
        ? Math.min(100, (matchedSkillsCount / jobTechKeywords.length) * 100)
        : matchedSkillsCount > 0 ? Math.min(100, matchedSkillsCount * 20) : 50;

      matchScore += Math.round((skillMatchPercentage / 100) * 35);
      matchDetails.skillsMatch = Math.round(skillMatchPercentage);

      if (skillMatchPercentage < 40) {
        issues.push({
          type: "skills",
          severity: "high",
          message: `Limited skill alignment. Job requires: ${jobTechKeywords.slice(0, 3).join(', ')}${jobTechKeywords.length > 3 ? ', etc.' : ''}`
        });
      } else if (skillMatchPercentage < 60) {
        issues.push({
          type: "skills",
          severity: "medium",
          message: "Some required skills are missing from your resume"
        });
      }
    } else {
      issues.push({
        type: "skills",
        severity: "high",
        message: "No skills listed on your resume"
      });
    }

    // ==================== EXPERIENCE MATCHING (20 points) ====================
    const jobRequiresExp = jobDescription.includes("experience") || jobDescription.includes("year");

    if (resume.experience && resume.experience.length > 0) {
      let experienceScore = 0;

      // Check if any experience title/description matches job keywords
      const hasRelevantExp = resume.experience.some(exp => {
        const expTitle = (exp.title || exp.position || "").toLowerCase();
        const expDesc = (exp.description || "").toLowerCase();
        const expContent = `${expTitle} ${expDesc}`;

        // Check for tech stack matches in experience
        return jobTechKeywords.some(tech => expContent.includes(tech)) ||
          jobTitleWords.some(word => expContent.includes(word));
      });

      if (hasRelevantExp) {
        experienceScore = 100;
        matchScore += 20;
      } else if (jobRequiresExp) {
        experienceScore = 40;
        matchScore += 8;
        issues.push({
          type: "experience",
          severity: "medium",
          message: "Your experience doesn't directly relate to this role's requirements"
        });
      } else {
        experienceScore = 70;
        matchScore += 14;
      }

      matchDetails.experienceMatch = experienceScore;
    } else {
      if (jobRequiresExp) {
        issues.push({
          type: "experience",
          severity: "high",
          message: "This position requires work experience which is not listed on your resume"
        });
        matchDetails.experienceMatch = 0;
      } else {
        matchScore += 10;
        matchDetails.experienceMatch = 50;
      }
    }

    // ==================== DESCRIPTION RELEVANCE (10 points) ====================
    const resumeSummary = (resume.summary || "").toLowerCase();
    let descriptionMatchCount = 0;

    jobTechKeywords.forEach(tech => {
      if (resumeSummary.includes(tech)) {
        descriptionMatchCount++;
      }
    });

    const descriptionMatchPercentage = jobTechKeywords.length > 0
      ? (descriptionMatchCount / jobTechKeywords.length) * 100
      : 50;

    matchScore += Math.round((descriptionMatchPercentage / 100) * 10);
    matchDetails.descriptionMatch = Math.round(descriptionMatchPercentage);

    // Final score calculation
    matchScore = Math.min(100, Math.max(0, matchScore));

    return {
      isMatch: matchScore >= 70,
      issues,
      matchScore: Math.round(matchScore),
      matchDetails
    };
  };

  // Handle Apply Click - Show Match Screen
  const handleApplyClick = () => {
    if (!user) return router.push("/login");
    if (!canApply) {
      toast.error("Only students and employees can apply to positions");
      return;
    }
    if (!selectedJob) return toast.error("No job selected");

    if (!resume?._id) {
      toast.error("Resume Required - Please create a resume before applying", {
        duration: 4000,
      });
      return;
    }

    if (appliedJobs.includes(String(selectedJob._id))) {
      toast.error("You've already submitted an application for this position");
      return;
    }

    // Show match screen
    setShowMatchScreen(true);
  };

  // Final Apply Handler
  const handleFinalApply = async () => {
    const { isMatch, matchScore } = checkCredentialMatch();

    if (!isMatch || matchScore < 70) {
      toast.error("Profile Match Too Low", {
        description: "This job doesn't match your CV. Please update your resume or find a better match.",
        duration: 5000,
      });

      // Go back to job search after 2 seconds
      setTimeout(() => {
        setShowMatchScreen(false);
        setSelectedJob(null);
      }, 2000);
      return;
    }

    setIsApplying(true);

    try {
      const res = await api.post("/api/applicants", {
        userId: user._id,
        jobId: selectedJob._id,
        resumeId: resume?._id || null,
        resumeModel: user.role === "student" ? "StdResume" : "EmployeeResume"
      });

      if (res.data.success) {
        setAppliedJobs(prev => [...prev, String(selectedJob._id)]);
        toast.success("Application Submitted Successfully! 🎉", {
          description: "Returning to job search...",
          duration: 3000,
        });

        // Go back to job search after success
        setTimeout(() => {
          setShowMatchScreen(false);
          setSelectedJob(null);
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  const handleSave = () => {
    if (!user) return router.push("/login");
    if (!selectedJob) return;

    const jobId = String(selectedJob._id);
    const isSaved = savedJobs.includes(jobId);

    if (isSaved) {
      setSavedJobs(prev => prev.filter(id => id !== jobId));
      toast.success("Removed from saved jobs");
    } else {
      setSavedJobs(prev => [...prev, jobId]);
      toast.success("Saved for later!");
    }
  };

  const clearFilters = () => {
    setTitleFilter("");
    setLocationFilter("");
    setJobTypeFilter("");
  };

  const hasActiveFilters = titleFilter || locationFilter || jobTypeFilter;

  // Profile Match Screen Component
  if (showMatchScreen && selectedJob) {
    const { isMatch, issues, matchScore } = checkCredentialMatch();

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setShowMatchScreen(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Job Details</span>
          </button>

          {/* Match Score Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 border-2 border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Profile Match Analysis
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Analyzing your resume for: <span className="font-semibold text-green-600">{selectedJob.title}</span>
              </p>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-8">
              <div className={`relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center ${matchScore >= 70
                ? "bg-gradient-to-br from-green-100 to-emerald-100 border-4 border-green-500"
                : matchScore >= 40
                  ? "bg-gradient-to-br from-amber-100 to-yellow-100 border-4 border-amber-500"
                  : "bg-gradient-to-br from-red-100 to-orange-100 border-4 border-red-500"
                }`}>
                <div className="text-center">
                  <div className={`text-5xl sm:text-6xl font-bold ${matchScore >= 70 ? "text-green-600" : matchScore >= 40 ? "text-amber-600" : "text-red-600"
                    }`}>
                    {matchScore}%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-semibold mt-1">Match Score</div>
                </div>
                {matchScore >= 70 ? (
                  <CheckCircle2 className="absolute -top-2 -right-2 w-12 h-12 text-green-600 bg-white rounded-full p-2 shadow-lg" />
                ) : (
                  <AlertCircle className="absolute -top-2 -right-2 w-12 h-12 text-red-600 bg-white rounded-full p-2 shadow-lg" />
                )}
              </div>
            </div>

            {/* Status Message */}
            <div className={`text-center mb-8 p-6 rounded-2xl ${matchScore >= 70
              ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
              : "bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200"
              }`}>
              <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${matchScore >= 70 ? "text-green-800" : "text-red-800"
                }`}>
                {matchScore >= 70 ? "Excellent Match! ✨" : "Profile Doesn't Match 😔"}
              </h2>
              <p className={`text-sm sm:text-base ${matchScore >= 70 ? "text-green-700" : "text-red-700"
                }`}>
                {matchScore >= 70
                  ? "Your profile aligns well with this position. You're good to apply!"
                  : "Your current resume doesn't meet the requirements for this position. Please update your resume or find a better match."}
              </p>
            </div>

            {/* Detailed Match Breakdown */}
            {(() => {
              const { matchDetails } = checkCredentialMatch();
              return (
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Title Match</span>
                      <span className={`text-lg font-bold ${matchDetails.titleMatch >= 70 ? 'text-green-600' : matchDetails.titleMatch >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {matchDetails.titleMatch}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${matchDetails.titleMatch >= 70 ? 'bg-green-500' : matchDetails.titleMatch >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${matchDetails.titleMatch}%` }} />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Skills Match</span>
                      <span className={`text-lg font-bold ${matchDetails.skillsMatch >= 70 ? 'text-green-600' : matchDetails.skillsMatch >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {matchDetails.skillsMatch}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${matchDetails.skillsMatch >= 70 ? 'bg-green-500' : matchDetails.skillsMatch >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${matchDetails.skillsMatch}%` }} />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Experience</span>
                      <span className={`text-lg font-bold ${matchDetails.experienceMatch >= 70 ? 'text-green-600' : matchDetails.experienceMatch >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {matchDetails.experienceMatch}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${matchDetails.experienceMatch >= 70 ? 'bg-green-500' : matchDetails.experienceMatch >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${matchDetails.experienceMatch}%` }} />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Summary</span>
                      <span className={`text-lg font-bold ${matchDetails.descriptionMatch >= 70 ? 'text-green-600' : matchDetails.descriptionMatch >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                        {matchDetails.descriptionMatch}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${matchDetails.descriptionMatch >= 70 ? 'bg-green-500' : matchDetails.descriptionMatch >= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${matchDetails.descriptionMatch}%` }} />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Resume Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 mb-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Your Resume</h3>
                  <p className="text-gray-700 font-medium break-words">{resume.title}</p>
                  {resume.skills && resume.skills.length > 0 && (
                    <p className="text-xs text-gray-600 mt-2">
                      <span className="font-semibold">Skills:</span> {resume.skills.slice(0, 5).join(', ')}
                      {resume.skills.length > 5 && ` +${resume.skills.length - 5} more`}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Issues/Feedback */}
            {issues.length > 0 ? (
              <div className="space-y-3 mb-8">
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-600" />
                  Issues Found ({issues.length})
                </h3>
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-xl ${issue.severity === "high"
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-amber-50 border-2 border-amber-200"
                      }`}
                  >
                    <div className={`mt-1 shrink-0 ${issue.severity === "high" ? "text-red-600" : "text-amber-600"
                      }`}>
                      {issue.severity === "high" ? "⚠️" : "💡"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold mb-1 text-sm sm:text-base ${issue.severity === "high" ? "text-red-800" : "text-amber-800"
                        }`}>
                        {issue.type === "title" ? "Title Mismatch" : issue.type === "skills" ? "Skills Gap" : "Experience Gap"}
                      </p>
                      <p className={`text-sm ${issue.severity === "high" ? "text-red-700" : "text-amber-700"
                        }`}>
                        {issue.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-6 mb-8">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1 text-sm sm:text-base">Perfect Alignment</h3>
                    <p className="text-green-700 text-sm sm:text-base">
                      Your resume matches all key requirements for this position
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {matchScore >= 70 ? (
                <>
                  <button
                    onClick={handleFinalApply}
                    disabled={isApplying}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApplying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        Confirm & Apply
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowMatchScreen(false)}
                    className="flex-1 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowMatchScreen(false);
                    setSelectedJob(null);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all duration-300"
                >
                  <ArrowLeft className="w-6 h-6" />
                  Back to Job Search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 py-4 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        {/* <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Find Your Next Opportunity
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
            {hasActiveFilters && " matching your criteria"}
          </p>
        </div> */}

        {/* Unified Search + Category Bar */}
        {/* Unified Category + Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-4 border border-gray-100 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Category Tabs (Opportunities First) */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent lg:w-auto">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                const count = jobs.filter(j => cat.id === "all" || j.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setJobTypeFilter("");
                    }}
                    className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap ${isActive
                      ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:shadow-lg"
                      }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
                    <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Fields */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1 lg:ml-4">
              {/* Job Title */}
              <div className="flex-1 relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5 transition-colors group-focus-within:text-green-500" />
                <input
                  type="text"
                  placeholder="Job title or keywords"
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                />
              </div>

              {/* Location */}
              <div className="relative w-full sm:w-64 lg:w-80 group">
                <MapPin className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5 transition-colors group-focus-within:text-green-500" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white transition-all duration-300"
                />
              </div>
            </div>

          </div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Jobs List */}
          <div className={`space-y-3 sm:space-y-4 max-h-[calc(100vh-22rem)] sm:max-h-[calc(100vh-13rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent ${selectedJob ? 'hidden lg:block' : ''}`}>
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-md">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-base sm:text-lg font-medium">No opportunities found</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your search filters</p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-green-600 hover:text-green-700 font-semibold text-xs sm:text-sm"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              filteredJobs.map((job) => {
                const badge = getCategoryBadge(job.category);
                const BadgeIcon = badge.icon;
                const isSelected = selectedJob?._id === job._id;
                const isApplied = appliedJobs.includes(job._id);
                const isSaved = savedJobs.includes(String(job._id));

                return (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`relative p-4 sm:p-5 rounded-xl m-5 sm:rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected
                      ? "border-green-500 bg-white shadow-2xl ring-2 ring-green-200 scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg hover:scale-[1.01]"
                      }`}
                  >
                    {/* Applied/Saved Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex gap-1 sm:gap-2">
                      {isApplied && (
                        <div className="bg-green-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span className="hidden sm:inline">Applied</span>
                        </div>
                      )}
                      {isSaved && (
                        <div className="bg-teal-500 text-white p-1 rounded-full">
                          <BookmarkCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3 mb-2 sm:mb-3 pr-16 sm:pr-20">
                      <h3 className="font-bold text-sm sm:text-lg text-gray-800 flex-1 leading-tight line-clamp-2">
                        {job.title}
                      </h3>
                    </div>

                    {/* Company Name */}
                    {job.postedBy?.companyName && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                        <span className="font-medium truncate">{job.postedBy.companyName}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>

                    {/* Job Type & Salary */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                      {job.jobType && (
                        <span className="text-[10px] sm:text-xs bg-green-50 text-green-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
                          {job.jobType}
                        </span>
                      )}
                      {job.salary && (
                        <span className="text-[10px] sm:text-xs bg-teal-50 text-teal-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium flex items-center gap-1">
                          <DollarSign className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {job.salary}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 sm:pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500 shrink-0" />
                        <span className="whitespace-nowrap">{prettyDate(job.createdAt)}</span>
                      </div>
                      <div className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${badge.gradient} text-white shadow-sm shrink-0`}>
                        <BadgeIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        {badge.label}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Job Details */}
          <div className={`lg:col-span-2 bg-white m-3 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 max-h-[calc(100vh-22rem)] sm:max-h-[calc(100vh-13rem)] overflow-y-auto ${!selectedJob ? 'hidden lg:flex' : ''}`}>
            {selectedJob ? (
              <div className="p-4 sm:p-6 lg:p-8 w-full animate-fadeIn">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Jobs</span>
                </button>

                {/* Header Section */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 sm:gap-3 mb-3">
                        <div className="p-2 sm:p-3 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl shrink-0">
                          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2 break-words">
                            {selectedJob.title}
                          </h1>
                          {selectedJob.postedBy?.companyName && (
                            <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-semibold flex items-center gap-2 flex-wrap">
                              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
                              <span className="break-words">{selectedJob.postedBy.companyName}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${getStatusColor(selectedJob.status)} shadow-md shrink-0 whitespace-nowrap`}>
                      {selectedJob.status}
                    </span>
                  </div>

                  {/* Key Info Pills */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-green-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-green-100">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                      <span className="font-medium">{selectedJob.location}</span>
                    </div>
                    {selectedJob.salary && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-teal-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-teal-100">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                        <span className="font-medium">{selectedJob.salary}</span>
                      </div>
                    )}
                    {selectedJob.jobType && (
                      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-green-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-green-100">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                        <span className="font-medium">{selectedJob.jobType}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-100">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 shrink-0" />
                      <span className="font-medium">Posted {prettyDate(selectedJob.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    Job Description
                  </h3>
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedJob.description}
                    </p>
                  </div>
                </div>

                {/* Company Info */}
                {selectedJob.postedBy && (
                  <div className="border-2 border-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-green-50 to-teal-50 shadow-sm mb-6 sm:mb-8">
                    <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2 text-gray-800">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      About the Company
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-gray-800 font-semibold text-base sm:text-xl break-words">
                        {selectedJob.postedBy.companyName || selectedJob.postedBy.name}
                      </p>
                      {selectedJob.postedBy.email && (
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 bg-white/60 rounded-lg p-2 sm:p-3">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                          <a
                            href={`mailto:${selectedJob.postedBy.email}`}
                            className="hover:text-teal-600 transition-colors break-all"
                          >
                            {selectedJob.postedBy.email}
                          </a>
                        </div>
                      )}
                      {selectedJob.postedBy.address && (
                        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 bg-white/60 rounded-lg p-2 sm:p-3">
                          <Home className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600 shrink-0" />
                          <span className="break-words">{selectedJob.postedBy.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t-2 border-gray-100 sticky bottom-0 bg-white">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={handleApplyClick}
                      disabled={!user || !canApply || appliedJobs.includes(selectedJob._id)}
                      className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${!user || !canApply
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : appliedJobs.includes(selectedJob._id)
                          ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                        }`}
                    >
                      {appliedJobs.includes(selectedJob._id) ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="hidden sm:inline">Application Submitted</span>
                          <span className="sm:hidden">Applied</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                          Apply Now
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleSave}
                      className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${savedJobs.includes(String(selectedJob._id))
                        ? "bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg"
                        : "bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl"
                        }`}
                    >
                      {savedJobs.includes(String(selectedJob._id)) ? (
                        <>
                          <BookmarkCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="hidden sm:inline">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
                          <span className="hidden sm:inline">Save</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Help Text */}
                  {!user && (
                    <p className="text-center text-xs sm:text-sm text-gray-500">
                      Please{" "}
                      <button
                        onClick={() => router.push("/login")}
                        className="text-green-600 hover:text-green-700 font-semibold underline"
                      >
                        sign in
                      </button>{" "}
                      to apply
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 sm:py-20 px-6 sm:px-8 w-full">
                <div className="p-6 sm:p-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4 sm:mb-6 shadow-lg">
                  <ChevronRight className="w-12 h-12 sm:w-20 sm:h-20 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                  Select an Opportunity
                </h3>
                <p className="text-sm sm:text-lg text-gray-500 mb-2">
                  Choose from the list to view full details
                </p>
                <p className="text-xs sm:text-sm text-gray-400 max-w-md">
                  Browse available positions to find the perfect match
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #86efac;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #4ade80;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}