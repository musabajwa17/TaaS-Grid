"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useActiveJobs(category) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchActiveJobs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/jobs?category=${category}&status=active`
        );

        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error loading active jobs:", error);
      }
    };

    fetchActiveJobs();
  }, [category]);

  return jobs;
}
