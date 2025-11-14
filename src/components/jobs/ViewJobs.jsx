"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Search, MapPin, Briefcase, DollarSign, Clock, CheckCircle2, ChevronRight, Building2, Lightbulb, BookOpen, Layers, Calendar, Mail, Home, Sparkles, TrendingUp } from "lucide-react";

export default function JobView() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const categories = [
    { id: "all", label: "All Opportunities", icon: Layers, gradient: "from-green-500 to-teal-500" },
    { id: "job", label: "Jobs", icon: Briefcase, gradient: "from-green-500 to-teal-500" },
    { id: "internship", label: "Internships", icon: BookOpen, gradient: "from-teal-500 to-green-500" },
    { id: "fyp", label: "FYP Ideas", icon: Lightbulb, gradient: "from-green-600 to-teal-600" },
  ];

  const jobTypes = [
    { id: "Full-Time", label: "Full-Time", icon: Clock },
    { id: "Part-Time", label: "Part-Time", icon: Clock },
    { id: "Contract", label: "Contract", icon: CheckCircle2 },
  ];

  const normalizeJob = (raw, category) => ({
    _id: raw._id,
    title: raw.title || raw.name,
    description: raw.description || "",
    location: raw.location || "",
    salary: raw.salary || "Not specified",
    jobType: raw.jobType || raw.type || category,
    category,
    postedBy: raw.postedBy || null,
    createdAt: raw.createdAt,
    status: raw.status || "Pending",
  });

  const fetchJobs = useCallback(async () => {
    try {
      let fetched = [];
      if (activeCategory === "job") {
        const res = await axios.get(`${baseURL}/api/jobs`);
        fetched = res.data.jobs.filter(j => j.jobType.toLowerCase() !== "internship").map(j => normalizeJob(j, "job"));
      } else if (activeCategory === "internship") {
        const res = await axios.get(`${baseURL}/api/jobs/internships`);
        fetched = res.data.data.map(j => normalizeJob(j, "internship"));
      } else if (activeCategory === "fyp") {
        const res = await axios.get(`${baseURL}/api/fyps`);
        fetched = res.data.fyps.map(f => normalizeJob(f, "fyp"));
      } else {
        const [jobsRes, internsRes, fypsRes] = await Promise.all([
          axios.get(`${baseURL}/api/jobs`),
          axios.get(`${baseURL}/api/jobs/internships`),
          axios.get(`${baseURL}/api/fyps`),
        ]);
        fetched = [
          ...jobsRes.data.jobs.filter(j => j.jobType.toLowerCase() !== "internship").map(j => normalizeJob(j, "job")),
          ...internsRes.data.data.map(j => normalizeJob(j, "internship")),
          ...fypsRes.data.fyps.map(f => normalizeJob(f, "fyp")),
        ];
      }
      setJobs(fetched);
      setSelectedJob(fetched[0] || null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch opportunities");
    }
  }, [activeCategory]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => 
      job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      (jobTypeFilter === "" || job.jobType === jobTypeFilter)
    );
  }, [jobs, titleFilter, locationFilter, jobTypeFilter]);

  const updateJobStatus = async (id, status) => {
    try {
      await axios.put(`${baseURL}/api/jobs/${id}`, { status });
      setJobs(jobs.map(j => j._id === id ? { ...j, status } : j));
      toast.success("Status updated!");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/jobs/${id}`);
      setJobs(jobs.filter(j => j._id !== id));
      if (selectedJob?._id === id) setSelectedJob(null);
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const getCategoryBadge = (cat) => {
    if (cat === "job") return { label: "Job", gradient: "from-green-500 to-teal-500", icon: Briefcase };
    if (cat === "internship") return { label: "Internship", gradient: "from-teal-500 to-green-500", icon: BookOpen };
    if (cat === "fyp") return { label: "FYP Idea", gradient: "from-green-600 to-teal-600", icon: Lightbulb };
  };

  const getStatusColor = (status) => {
    if (status === "Active") return "bg-gradient-to-r from-green-500 to-teal-500 text-white";
    if (status === "Pending") return "bg-gradient-to-r from-teal-400 to-green-400 text-white";
    if (status === "Closed") return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
  };

  const prettyDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-6 my-16">
      {/* Spacer for layout */}
      <div className="mb-6"></div>


      {/* Search & JobType filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
          <input
            type="text"
            placeholder="Search by job title, keywords..."
            value={titleFilter}
            onChange={e => setTitleFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
          />
        </div>
        <div className="relative w-full lg:w-80 group">
          <MapPin className="absolute left-4 top-4 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-500" />
          <input
            type="text"
            placeholder="Location..."
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-white shadow-sm transition-all duration-300"
          />
        </div>
        {/* {activeCategory === "job" && (
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => setJobTypeFilter("")} 
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                jobTypeFilter === "" 
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md" 
                  : "bg-white text-gray-700 hover:shadow-md"
              }`}
            >
              All Types
            </button>
            {jobTypes.map(t => (
              <button 
                key={t.id} 
                onClick={() => setJobTypeFilter(t.id)} 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  jobTypeFilter === t.id 
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md" 
                    : "bg-white text-gray-700 hover:shadow-md"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )} */}
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setJobTypeFilter(""); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                isActive 
                  ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg` 
                  : "bg-white text-gray-700 hover:shadow-lg"
              }`}
            >
              <Icon className="w-5 h-5" /> {cat.label}
            </button>
          );
        })}
      </div>


      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Job Cards */}
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-transparent">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-md">
              <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No opportunities found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredJobs.map(job => {
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

        {/* Right Panel - Job Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 max-h-[80vh] overflow-y-auto border border-gray-100">
          {selectedJob ? (
            <div className="animate-fadeIn">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                      {selectedJob.title}
                    </h1>
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
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(selectedJob.status)} shadow-md`}>
                    {selectedJob.status}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedJob.description}
                </p>
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

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Apply Now
                </button>
                <button className="flex-1 bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
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