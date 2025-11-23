import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useResume = (userId) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

const fetchResume = async () => {
  if (!userId) return null;

  try {
    setLoading(true);

    const res = await axios.get(
      `http://localhost:3001/api/student/stdresume/${userId}`
    );

    // If resume doesn't exist
    if (!res.data || res.data.exists === false) {
      toast.error("No resume found for this user");
      setResume(null);
      return { exists: false };
    }

    // Success
    setResume(res.data);
    return res.data;   // ✅ NOW it returns the resume

  } catch (err) {
    toast.error("Failed to fetch resume");
    return null;       // prevent undefined
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
      alert("Resume updated successfully!");
      setResume(res.data.updated);
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return { resume, fetchResume, updateResume, loading };
};
