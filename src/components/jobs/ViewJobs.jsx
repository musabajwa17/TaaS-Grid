"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
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
} from "lucide-react";

export default function JobView() {
  const router = useRouter();
  const { user } = useAuth(); 
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { jobs, selectedJob, setSelectedJob } = useJobs(activeCategory);
  const filteredJobs = useJobFilters(jobs, titleFilter, locationFilter, jobTypeFilter);

  const categories = [
    { id: "all", label: "All Opportunities", icon: Layers, gradient: "from-green-500 to-teal-500" },
    { id: "job", label: "Jobs", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
    { id: "internship", label: "Internships", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
    { id: "fyp", label: "FYP Ideas", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
  ];

  const canApply = user && ["student", "employee"].includes(user.role);

  // ✅ Fetch user's applied jobs
  useEffect(() => {
    if (!user) return;

    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/applicants?userId=${user._id}`);
        if (res.data.success) {
          setAppliedJobs(res.data.applicants.map(a => a.jobId));
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };
    fetchAppliedJobs();
  }, [user]);

const { resume, fetchResume, loading: loadingResume } = useResume(user?._id);

useEffect(() => {
  if (user?._id) {
    fetchResume(); // Fetch the resume for this user
  }
}, [user?._id]);

const handleApply = async () => {
  console.log("Resume on apply:", resume);

  if (!user) return router.push("/login");
  if (!canApply) return toast.error("Only students and employees can apply");
  if (!selectedJob) return toast.error("No job selected");
  if (!resume?.exists || !resume?.resume?._id) 
    return toast.error("No resume found. Please create a resume first.");
  if (appliedJobs.includes(selectedJob._id)) return toast.error("You already applied for this job");

  try {
    const response = await axios.post("http://localhost:3001/api/applicants", {
      userId: user._id,
      jobId: selectedJob._id,
      resumeId: resume.resume._id, // ✅ Correct resumeId
    });

    if (response.data.success) {
      toast.success("Applied successfully!");
      setAppliedJobs(prev => [...prev, selectedJob._id]);
    } else {
      toast.error(response.data.message || "Failed to apply");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong while applying");
    console.error("Apply error:", error);
  }
};



  const handleSave = () => {
    if (!user) return router.push("/login");
    toast.success("Saved for later!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-6 my-16">
      {/* Search Filters */}
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
              onClick={() => { setActiveCategory(cat.id); setJobTypeFilter(""); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                isActive ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` : "bg-white text-gray-700 hover:shadow-lg"
              }`}
            >
              <Icon className="w-5 h-5" /> {cat.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Jobs List */}
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No opportunities found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const badge = getCategoryBadge(job.category);
              const BadgeIcon = badge.icon;
              const isSelected = selectedJob?._id === job._id;
              return (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "border-green-500 bg-white shadow-2xl ring-2 ring-green-200"
                      : "border-gray-200 bg-white hover:border-green-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-lg text-gray-800 flex-1 leading-tight">{job.title}</h3>
                    <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.gradient} text-white shadow-sm shrink-0`}>
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {badge.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4 text-teal-500 shrink-0" />
                      <span className="whitespace-nowrap">{prettyDate(job.createdAt)}</span>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(job.status)} shadow-sm shrink-0`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Job Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 max-h-[80vh] overflow-y-auto border border-gray-100">
          {selectedJob ? (
            <div className="animate-fadeIn">
              {/* Title & Info */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">{selectedJob.title}</h1>
                    <div className="flex flex-wrap gap-3 mt-3">
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
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(selectedJob.status)} shadow-md`}>{selectedJob.status}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{selectedJob.description}</p>
              </div>

              {/* Company Info */}
              {selectedJob.postedBy && (
                <div className="border-2 border-green-100 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-teal-50 shadow-sm mb-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800">
                    <Building2 className="w-5 h-5 text-green-500" />
                    Company Information
                  </h4>
                  <div className="space-y-3">
                    <p className="text-gray-800 font-semibold text-lg">{selectedJob.postedBy.companyName || selectedJob.postedBy.name}</p>
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

              {/* Apply & Save */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleApply}
                  disabled={appliedJobs.includes(selectedJob._id)}
                  className={`flex-1 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    !user
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : appliedJobs.includes(selectedJob._id)
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {!user ? "Easy Apply" : appliedJobs.includes(selectedJob._id) ? "Applied" : "Apply Now"}
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Save for Later
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6 shadow-lg">
                <ChevronRight className="w-16 h-16 text-green-600" />
              </div>
              <p className="text-gray-500 text-xl font-medium mb-2">Select an opportunity</p>
              <p className="text-gray-400 text-sm">Choose from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}





// "use client";

// import { useState } from "react";
// import { useAuth } from "@/auth/AuthContext";
// import useActiveJobs from "@/hooks/useActiveJobs";
// import useAppliedJobs from "@/hooks/useAppliedJobs";
// import { useResume } from "@/hooks/useResume";

// import Filters from "@/components/ui/Job/Filters";
// import Categories from "@/components/ui/Job/Categories";
// import JobList from "@/components/ui/Job/JobList";
// import JobDetails from "@/components/ui/Job/JobDetails";
// import ApplyButton from "@/components/ui/Job/ApplyButton";

// import axios from "axios";
// import toast from "react-hot-toast";

// export default function JobView() {
//   const { user } = useAuth();

//   const [title, setTitle] = useState("");
//   const [location, setLocation] = useState("");
//   const [category, setCategory] = useState("all");

//   const allJobs = useActiveJobs(category);
//   const applied = useAppliedJobs();
//   const { resume } = useResume();

//   const [selected, setSelected] = useState(null);

//   const filtered = allJobs.filter((job) => {
//     return (
//       job.title.toLowerCase().includes(title.toLowerCase()) &&
//       job.location.toLowerCase().includes(location.toLowerCase())
//     );
//   });

//   const handleApply = async () => {
//     if (!user) return toast.error("Please login first");
//     if (!resume) return toast.error("Create a resume first");

//     try {
//       const res = await axios.post(
//         "http://localhost:3001/api/applicants",
//         { jobId: selected._id, resumeId: resume._id },
//         { withCredentials: true }
//       );

//       if (res.data.success) toast.success("Applied successfully!");
//     } catch (err) {
//       toast.error("Failed to apply");
//     }
//   };

//   return (
//     <div className="p-6 my-10">
//       <Filters
//         title={title}
//         setTitle={setTitle}
//         location={location}
//         setLocation={setLocation}
//       />

//       <Categories active={category} setActive={setCategory} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <JobList jobs={filtered} selected={selected} setSelected={setSelected} />

//         <div className="col-span-2 bg-white shadow p-6 rounded-xl">
//           <JobDetails job={selected} />

//           {selected && (
//             <ApplyButton
//               user={user}
//               selectedJob={selected}
//               applied={applied}
//               resume={resume}
//               onApply={handleApply}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
