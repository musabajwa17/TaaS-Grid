import { useState } from "react";
import axios from "axios";

interface UploadResponse {
  message: string;
  cv?: any;
  error?: string;
}

export const useUploadCV = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadCV = async (combinedData: any) => {
    console.log(combinedData)
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ✅ Extract userId from localStorage or auth context
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?._id || user?.id; // adjust key if different

      if (!userId) {
        throw new Error("User not logged in or missing ID.");
      }
      console.log("User CV Details", userId , combinedData)
      // ✅ Send POST request to backend
      const response = await axios.post<UploadResponse>(
        "http://localhost:3001/api/cv/upload",
        {
          userId,
          combinedData, // include all parsed CV data
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(response.data.message);
      return response.data;
    } catch (err: any) {
      console.error("Error uploading CV:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { uploadCV, loading, error, success };
};
