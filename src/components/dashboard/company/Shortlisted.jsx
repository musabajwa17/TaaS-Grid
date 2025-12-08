import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3001/api";

const ShortlistedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    // Load all active jobs on mount
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await axios.get(`${API}/jobs`);
            console.log(res.data);
            const data = res.data?.jobs || [];

            // Only Active jobs
            const activeJobs = data.filter(job => job.status === "Active");

            setJobs(activeJobs);
        } catch (error) {
            console.log("Jobs Error:", error);
        }
    };

    const loadApplicantsForJob = async (job) => {
        setSelectedJob(job);
        setApplicants([]); // clear old data

        try {
            const res = await axios.get(`${API}/applicants/job/${job._id}`);
            console.log(res.data);
            const data = res.data?.applicants || [];

            // Only shortlisted
            const shortlisted = data.filter(app => app.status === "Shortlisted");

            setApplicants(shortlisted);
        } catch (error) {
            console.log("Applicants Error:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 mt-10">

            <h1 className="text-3xl font-bold mb-8">Shortlisted Applicants Panel</h1>

            <div className="grid grid-cols-12 gap-6">

                {/* ---------------- LEFT: JOB LIST ---------------- */}
                <div className="col-span-4 border-r pr-4">
                    <h2 className="text-xl font-semibold mb-4">Active Jobs</h2>

                    <div className="space-y-3">
                        {jobs.map(job => (
                            <div
                                key={job._id}
                                onClick={() => loadApplicantsForJob(job)}
                                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 transition
                  ${selectedJob?._id === job._id ? "bg-gray-100 border-blue-600" : ""}
                `}
                            >
                                <p className="font-bold text-lg">{job.title}</p>

                                <p className="text-sm text-gray-600">{job.location}</p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Posted By: {job.postedBy?.companyName}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------- RIGHT: APPLICANTS LIST ---------------- */}
                <div className="col-span-8 pl-4">
                    {!selectedJob && (
                        <p className="text-gray-500 italic text-lg">
                            Select a job from the left to view shortlisted applicants.
                        </p>
                    )}

                    {selectedJob && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">
                                Shortlisted For:{" "}
                                <span className="text-blue-600">{selectedJob.title}</span>
                            </h2>

                            {applicants.length === 0 ? (
                                <p className="text-gray-500 italic">No shortlisted applicants.</p>
                            ) : (
                                <div className="space-y-4">
                                    {applicants.map(app => (
                                        <div
                                            key={app._id}
                                            className="p-4 border rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    User ID: {app.resumeId.name}
                                                </p>

                                                <p className="text-sm text-gray-600">
                                                    Resume ID: {app.resumeId.email}
                                                </p>

                                                <p className="text-xs text-gray-600 mt-1">
                                                    Phone: {app.resumeId.phone}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    Title: {app.resumeId.title}
                                                </p>
                                            </div>

                                            <a
                                                href={`/resume/${app.resumeId}`}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                View Resume
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ShortlistedJobs;
