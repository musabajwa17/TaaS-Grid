import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useUploadCV = (userID) => {
  const [loading, setLoading] = useState(false);

  const uploadCV = async (formData = {}) => {
    setLoading(true);
    try {
      const parsedUser = JSON.parse(localStorage.getItem("user") || "null");
      const userId = userID;
      if (!userID) throw new Error("User ID not found. Please log in again.");

      const payload = { ...formData, userId };
      console.log("Payload for CV upload:", payload);

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
      const response = await axios.post(`${baseURL}/api/employee/resume`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const msg = response.data?.message || "Resume uploaded successfully!";
      console.log("✅ CV uploaded:", msg);
      toast.success(msg);
      return response.data;

    } catch (err) {
      console.error("❌ Upload error:", err);
      let message = "Something went wrong while uploading the resume.";
      if (axios.isAxiosError(err) && err.response?.data)
        message = String(err.response.data?.message || err.response.data);
      else if (err instanceof Error)
        message = err.message;

      toast.error(message);
      throw new Error(message);

    } finally {
      setLoading(false);
    }
  };

  return { uploadCV, loading };
};
