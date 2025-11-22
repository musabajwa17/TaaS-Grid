import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useResume = (userId) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchResume = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/api/student/stdresume/${userId}`);
      setResume(res.data);
    } catch (err) {
      toast.error("Failed to fetch resume");
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (data) => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:3001/api/student/stdresume/${userId}`,
        data
      );

      toast.success("Updated Successfully!");
      setResume(res.data.updated);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { resume, fetchResume, updateResume, loading };
};
