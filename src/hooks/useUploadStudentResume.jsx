import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useUploadStdCV = (user) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  console.log("User in useUploadStdCV:", user);
  const uploadCV = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
   console.log("Uploading CV with formData:", formData);
    try {
      // ✅ Get userId directly from Auth
      const userId = user?._id;

      if (!userId) {
        throw new Error("User not found. Please log in again.");
      }

      // Merge userId into request body
      const payload = { ...formData, userId };

      const response = await axios.post(
        "http://localhost:3001/api/student/stdresume",
        payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      const msg = response.data.message || "Resume uploaded successfully!";
      setSuccess(msg);
      toast.success(msg);

      return response.data;
    } catch (err) {
      console.error("❌ Error uploading CV:", err);

      let message = "Something went wrong while uploading the resume.";

      if (axios.isAxiosError(err) && err.response?.data) {
        message = err.response.data.message || err.response.data;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      toast.error(message);

      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadCV, loading, error, success };
};

