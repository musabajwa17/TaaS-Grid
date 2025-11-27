// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import axios from "axios";
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
//         const res = await axios.get(`http://localhost:3001/api/applicants?userId=${user._id}`);
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
//             ? `http://localhost:3001/api/student/stdresume/${user._id}`
//             : `http://localhost:3001/api/employee/resume/${user._id}`;

//         const res = await axios.get(route);
//         console.log("Resume fetch response:", res.data);
//         setResume(res.data.resume || null);
//       } catch {
//         setResume(null);
//       }
//     };

//     fetchResume();
//   }, [user?._id, user?.role]);
// //   // --- Apply handler ---
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
//       const res = await axios.post("http://localhost:3001/api/applicants", {
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
//               className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
//                 isActive ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : "bg-white text-gray-700 hover:shadow-lg"
//               }`}
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
//                   className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
//                     isSelected
//                       ? "border-green-500 bg-white shadow-2xl ring-2 ring-green-200"
//                       : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg"
//                   }`}
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
//                   className={`flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
//                     !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : appliedJobs.includes(selectedJob._id)
//                         ? "bg-gray-400 text-white cursor-not-allowed"
//                         : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:scale-[1.02]"
//                   }`}
//                 >
//                   <CheckCircle2 className="w-5 h-5" />
//                   { appliedJobs.includes(selectedJob._id) ? "Applied" : "Apply Now" }

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
import axios from "axios";
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
  FileText,
  Award,
  X,
  ArrowLeft,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

// Utility functions (keep your existing ones)
const prettyDate = (date) => new Date(date).toLocaleDateString();
const getStatusColor = (status) => {
  const colors = {
    active: "bg-green-100 text-green-700",
    closed: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};
const getCategoryBadge = (category) => {
  const badges = {
    job: { label: "Job", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
    internship: { label: "Internship", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
    fyp: { label: "FYP", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
  };
  return badges[category] || badges.job;
};

// Resume Match Score Component
const MatchScore = ({ score }) => {
  const getScoreColor = () => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Match";
    return "Fair Match";
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-700 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Resume Match
        </h4>
        <span className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
          {score}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${getScoreColor()} transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">{getScoreLabel()}</p>
    </div>
  );
};

// Resume Preview Card Component
const ResumePreviewCard = ({ resume, matchScore }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-500" />
          Your Resume
        </h3>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
          Active
        </span>
      </div>

      <MatchScore score={matchScore} />

      {/* Personal Info */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-bold text-lg text-gray-800 mb-1">{resume.name || "Your Name"}</h4>
        <p className="text-gray-600 text-sm mb-3">{resume.email}</p>
        {resume.phone && (
          <p className="text-gray-600 text-sm">{resume.phone}</p>
        )}
      </div>

      {/* Experience */}
      {resume.experience && resume.experience.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-teal-500" />
            Experience
          </h4>
          <div className="space-y-3">
            {resume.experience.slice(0, 2).map((exp, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <p className="font-medium text-gray-800 text-sm">{exp.title || exp.position}</p>
                <p className="text-gray-600 text-xs">{exp.company}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {exp.years || exp.duration || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-teal-500" />
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {resume.skills.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-500" />
            Education
          </h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-medium text-gray-800 text-sm">
              {resume.education[0].degree}
            </p>
            <p className="text-gray-600 text-xs">{resume.education[0].institution}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Application Modal Component
const ApplicationModal = ({ isOpen, onClose, job, resume, matchScore, onConfirmApply, isApplying }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">Review Your Application</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <MatchScore score={matchScore} />

          {matchScore < 60 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-1">Lower Match Score</h4>
                  <p className="text-sm text-yellow-700">
                    Your resume match score is below 60%. Consider updating your resume to better match the job requirements.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Applying For:</h4>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
              <p className="font-bold text-lg text-gray-800 mb-2">{job.title}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.postedBy?.companyName || job.postedBy?.name}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Your Information:</h4>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-600">Name:</span> <span className="font-medium text-gray-800">{resume.name}</span></p>
              <p><span className="text-gray-600">Email:</span> <span className="font-medium text-gray-800">{resume.email}</span></p>
              {resume.phone && (
                <p><span className="text-gray-600">Phone:</span> <span className="font-medium text-gray-800">{resume.phone}</span></p>
              )}
              <p><span className="text-gray-600">Experience:</span> <span className="font-medium text-gray-800">{resume.experience?.length || 0} positions</span></p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirmApply}
              disabled={isApplying}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isApplying ? "Submitting..." : "Confirm Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function JobView() {
  const router = useRouter();
  const [user, setUser] = useState(null); // Replace with your useAuth hook
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [showApplicationView, setShowApplicationView] = useState(false);
  const [matchScore, setMatchScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const categories = [
    { id: "all", label: "All Opportunities", icon: Layers, gradient: "from-green-500 to-teal-500" },
    { id: "job", label: "Jobs", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
    { id: "internship", label: "Internships", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
    { id: "fyp", label: "FYP Ideas", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
  ];

  // Calculate match score based on resume and job
  const calculateMatchScore = (resume, job) => {
    let score = 50; // Base score

    // Title matching
    const jobTitleWords = job.title.toLowerCase().split(" ");
    const resumeText = JSON.stringify(resume).toLowerCase();
    const titleMatch = jobTitleWords.filter(word => resumeText.includes(word)).length;
    score += (titleMatch / jobTitleWords.length) * 20;

    // Experience matching
    if (resume.experience && resume.experience.length > 0) {
      const requiredExp = parseInt(job.experience) || 0;
      const totalExp = resume.experience.length;
      if (totalExp >= requiredExp) score += 15;
      else score += (totalExp / requiredExp) * 15;
    }

    // Skills matching
    if (resume.skills && job.description) {
      const matchedSkills = resume.skills.filter(skill =>
        job.description.toLowerCase().includes(skill.toLowerCase())
      );
      score += (matchedSkills.length / resume.skills.length) * 15;
    }

    return Math.min(Math.round(score), 100);
  };

  const handleApplyClick = () => {
    if (!user) return router.push("/login");
    if (!resume?._id) return toast.error("No resume found. Please create a resume first.");
    if (appliedJobs.includes(String(selectedJob._id))) return toast.error("You already applied");

    const score = calculateMatchScore(resume, selectedJob);
    setMatchScore(score);
    setShowApplicationView(true);
    setShowModal(true);
  };

  const handleConfirmApply = async () => {
    setIsApplying(true);
    try {
      const res = await axios.post("http://localhost:3001/api/applicants", {
        userId: user._id,
        jobId: selectedJob._id,
        resumeId: resume._id,
        resumeModel: user.role === "student" ? "StdResume" : "EmployeeResume",
        matchScore: matchScore,
      });

      if (res.data.success) {
        setAppliedJobs(prev => [...prev, String(selectedJob._id)]);
        setShowModal(false);
        toast.success("Application submitted successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to apply");
    } finally {
      setIsApplying(false);
    }
  };

  const handleContinueJobSearch = () => {
    setShowApplicationView(false);
    setSelectedJob(null);
  };

  const isJobApplied = selectedJob && appliedJobs.includes(String(selectedJob._id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-6 my-16">
      {/* Search Filters */}
      {!showApplicationView && (
        <>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
              <input
                type="text"
                placeholder="Search by job title, keywords..."
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
              />
            </div>
            <div className="relative w-full lg:w-80 group">
              <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                    isActive ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : "bg-white text-gray-700 hover:shadow-lg"
                  }`}
                >
                  <Icon className="w-5 h-5" /> {cat.label}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Application View */}
      {showApplicationView ? (
        <div className="animate-fadeIn">
          <button
            onClick={handleContinueJobSearch}
            className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Job Search
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resume Preview - Left */}
            <div className="lg:col-span-1">
              <ResumePreviewCard resume={resume} matchScore={matchScore} />
            </div>

            {/* Job Details - Right */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      {selectedJob.title}
                    </h1>
                    <p className="text-gray-600 mb-4">{selectedJob.postedBy?.companyName || selectedJob.postedBy?.name}</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-teal-50 px-3 py-2 rounded-lg">
                        <DollarSign className="w-4 h-4 text-teal-500" />
                        <span className="font-medium">{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="font-medium">{selectedJob.jobType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Job Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
              </div>

              {selectedJob.postedBy && (
                <div className="border-2 border-green-100 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-teal-50 shadow-sm mb-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
                    <Building2 className="w-5 h-5 text-green-500" />
                    Company Information
                  </h4>
                  <div className="space-y-3">
                    <p className="text-gray-800 font-semibold text-lg">
                      {selectedJob.postedBy.companyName || selectedJob.postedBy.name}
                    </p>
                    {selectedJob.postedBy.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-teal-500" />
                        <span>{selectedJob.postedBy.email}</span>
                      </div>
                    )}
                    {selectedJob.postedBy.address && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Home className="w-4 h-4 text-teal-500" />
                        <span>{selectedJob.postedBy.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                {isJobApplied ? (
                  <>
                    <div className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gray-100 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-700">Application Submitted</span>
                    </div>
                    <button
                      onClick={handleContinueJobSearch}
                      className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Continue Job Search
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleApplyClick}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
            {jobs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-md">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No opportunities found</p>
              </div>
            ) : (
              jobs.map((job) => {
                const badge = getCategoryBadge(job.category);
                const BadgeIcon = badge.icon;
                const isSelected = selectedJob?._id === job._id;
                return (
                  <div
                    key={job._id}
                    onClick={() => setSelectedJob(job)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-green-500 bg-white shadow-2xl"
                        : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-bold text-lg text-gray-800 flex-1">{job.title}</h3>
                      <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.gradient} text-white`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {badge.label}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{prettyDate(job.createdAt)}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Job Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {selectedJob ? (
              <div>
                {/* Your existing job details JSX */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleApplyClick}
                    disabled={!user || isJobApplied}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isJobApplied
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg"
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    {isJobApplied ? "Applied" : "Apply Now"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-20">
                <ChevronRight className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-xl">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        job={selectedJob}
        resume={resume}
        matchScore={matchScore}
        onConfirmApply={handleConfirmApply}
        isApplying={isApplying}
      />
    </div>
  );
}