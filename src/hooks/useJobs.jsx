import { useState, useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import {
  getJobs,
  getInternships,
  getFyps,
  updateJobStatusRequest,
  deleteJobRequest,
} from "../services/jobsService";
import normalizeJob from "../utils/normalizeJob";

export default function useJobs(activeCategory) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const mounted = useRef(true);

  const fetchJobs = useCallback(async () => {
    try {
      let fetched = [];

      if (activeCategory === "job") {
        const data = await getJobs();
        fetched = data.jobs
          .filter((j) => (j.jobType || "").toLowerCase() !== "internship")
          .map((j) => normalizeJob(j, "job"));
      } else if (activeCategory === "internship") {
        const data = await getInternships();
        fetched = data.internships.map((j) => normalizeJob(j, "internship"));
      } else if (activeCategory === "fyp") {
        const data = await getFyps();
        fetched = data.fyps.map((f) => normalizeJob(f, "fyp"));
      } else {
        // all categories
        const [jobsData, internsData, fypsData] = await Promise.all([
          getJobs(),
          getInternships(),
          getFyps(),
        ]);

        fetched = [
          ...jobsData.jobs
            .filter((j) => (j.jobType || "").toLowerCase() !== "internship")
            .map((j) => normalizeJob(j, "job")),
          ...internsData.internships.map((j) => normalizeJob(j, "internship")),
          ...fypsData.fyps.map((f) => normalizeJob(f, "fyp")),
        ];
      }

      if (!mounted.current) return;

      // 🔥 Only keep Active opportunities
      const activeFetched = fetched.filter((item) => item.status === "Active");

      setJobs(activeFetched);
      setSelectedJob(activeFetched[0] || null);
    } catch (err) {
      console.error("useJobs: fetch error", err);
      toast.error("Failed to fetch opportunities");
    }
  }, [activeCategory]);

  useEffect(() => {
    mounted.current = true;
    fetchJobs();
    return () => (mounted.current = false);
  }, [fetchJobs]);

  const updateJobStatus = useCallback(async (id, status) => {
    try {
      await updateJobStatusRequest(id, status);
      setJobs((prev) =>
        prev.map((j) => (j._id === id ? { ...j, status } : j))
      );
      toast.success("Status updated!");
    } catch (e) {
      console.error("updateJobStatus error", e);
      toast.error("Failed to update status");
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
    try {
      await deleteJobRequest(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
      setSelectedJob((prev) => (prev?._id === id ? null : prev));
      toast.success("Deleted successfully");
    } catch (e) {
      console.error("deleteJob error", e);
      toast.error("Failed to delete");
    }
  }, []);

  return {
    jobs,
    selectedJob,
    setSelectedJob,
    updateJobStatus,
    deleteJob,
    fetchJobs,
  };
}
