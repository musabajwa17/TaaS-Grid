"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function useAppliedJobs() {
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/applicants/my",
          { withCredentials: true }
        );

        setApplied(res.data.appliedJobIds || []);
      } catch (err) {
        console.error("Error loading applied jobs:", err);
      }
    };

    fetchApplied();
  }, []);

  return applied;
}
