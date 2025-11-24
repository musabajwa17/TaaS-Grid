"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export function useResume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/resume/my", {
          withCredentials: true,
        });

        setResume(res.data.resume || null);
      } catch {
        setResume(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  return { resume, loading };
}
