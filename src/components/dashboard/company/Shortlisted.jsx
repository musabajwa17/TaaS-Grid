import { useEffect, useState } from "react";
import { X, Briefcase, MapPin, Building2, User, Mail, Phone, FileText, Calendar } from "lucide-react";

const API = "http://localhost:3001/api";

const ShortlistedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch(`${API}/jobs`);
            const data = await res.json();
            const jobsList = data?.jobs || [];
            const activeJobs = jobsList.filter(job => job.status === "Active");
            setJobs(activeJobs);
        } catch (error) {
            console.log("Jobs Error:", error);
        }
    };

    const loadApplicantsForJob = async (job) => {
        setSelectedJob(job);
        setApplicants([]);

        try {
            const res = await fetch(`${API}/applicants/job/${job._id}`);
            const data = await res.json();
            const applicantsList = data?.applicants || [];
            const shortlisted = applicantsList.filter(app => app.status === "Shortlisted");
            setApplicants(shortlisted);
        } catch (error) {
            console.log("Applicants Error:", error);
        }
    };

    const openResumeModal = (resume) => {
        setSelectedResume(resume);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedResume(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
            <div className="max-w-7xl mx-auto p-6 pt-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        Shortlisted Applicants Panel
                    </h1>
                    <p className="text-gray-600">Review and manage your shortlisted candidates</p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* LEFT: JOB LIST */}
                    <div className="col-span-4">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Briefcase className="w-6 h-6 text-green-600" />
                                <h2 className="text-xl font-bold text-gray-800">Active Jobs</h2>
                                <span className="ml-auto bg-green-100 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                                    {jobs.length}
                                </span>
                            </div>

                            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                {jobs.map(job => (
                                    <div
                                        key={job._id}
                                        onClick={() => loadApplicantsForJob(job)}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md ${selectedJob?._id === job._id
                                                ? "bg-gradient-to-r from-green-50 to-teal-50 border-green-500 shadow-md"
                                                : "bg-white border-gray-200 hover:border-green-300"
                                            }`}
                                    >
                                        <p className="font-bold text-lg text-gray-800 mb-2">{job.title}</p>

                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{job.location}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Building2 className="w-3.5 h-3.5" />
                                            <span>{job.postedBy?.companyName || "N/A"}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: APPLICANTS LIST */}
                    <div className="col-span-8">
                        {!selectedJob && (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Select a job from the left to view shortlisted applicants
                                </p>
                            </div>
                        )}

                        {selectedJob && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="mb-6 pb-4 border-b-2 border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                                        Shortlisted Candidates
                                    </h2>
                                    <p className="text-green-600 font-semibold">{selectedJob.title}</p>
                                    <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {applicants.length} Shortlisted
                                    </span>
                                </div>

                                {applicants.length === 0 ? (
                                    <div className="text-center py-12">
                                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500 italic">No shortlisted applicants yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {applicants.map(app => (
                                            <div
                                                key={app._id}
                                                className="p-5 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                                                                <User className="w-5 h-5 text-white" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-lg text-gray-800">
                                                                    {app.resumeId.name}
                                                                </p>
                                                                <p className="text-sm text-gray-600">{app.resumeId.title}</p>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3 ml-12">
                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Mail className="w-4 h-4 text-green-500" />
                                                                <span>{app.resumeId.email}</span>
                                                            </div>

                                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                                <Phone className="w-4 h-4 text-teal-500" />
                                                                <span>{app.resumeId.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => openResumeModal(app.resumeId)}
                                                        className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 font-semibold"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        View Resume
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && selectedResume && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-t-2xl relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200 hover:rotate-90"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <User className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{selectedResume.name}</h3>
                                    <p className="text-green-100 text-lg">{selectedResume.title}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Contact Info */}
                            <div>
                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-green-600" />
                                    </div>
                                    Contact Information
                                </h4>
                                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-5 space-y-4 border border-green-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                            <Mail className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Email</p>
                                            <p className="text-gray-800 font-medium">{selectedResume.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                            <Phone className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Phone</p>
                                            <p className="text-gray-800 font-medium">{selectedResume.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Experience */}
                            {selectedResume.experience && selectedResume.experience.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-teal-600" />
                                        </div>
                                        Professional Experience
                                        <span className="ml-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            {selectedResume.experience.length} {selectedResume.experience.length === 1 ? 'Role' : 'Roles'}
                                        </span>
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedResume.experience.map((exp, index) => (
                                            <div
                                                key={exp._id || index}
                                                className="bg-gradient-to-r from-green-50 via-teal-50 to-green-50 rounded-xl p-5 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-all duration-200"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <h5 className="text-lg font-bold text-gray-800 mb-1">
                                                            {exp.role}
                                                        </h5>
                                                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                            <Building2 className="w-4 h-4 text-teal-600" />
                                                            <p className="font-semibold">{exp.company}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4 text-green-600" />
                                                            <p>{exp.years}</p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm">
                                                        <span className="text-xs font-bold text-gray-600">
                                                            #{index + 1}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(!selectedResume.experience || selectedResume.experience.length === 0) && (
                                <div className="bg-gray-50 rounded-xl p-8 text-center">
                                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 italic">No experience information available</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-b-2xl flex justify-end border-t border-gray-200">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShortlistedJobs;