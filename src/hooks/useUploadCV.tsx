import { useState } from "react";
import axios from "axios";
// import api from "@/utils/axiosInstance";

// interface UploadResponse {
//   message: string;
//   cv?: any;
//   error?: string;
// }

export const useUploadCV = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadCV = async (combinedData: unknown) => {
    console.log(combinedData)
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ✅ Extract userId from localStorage or auth context
      // const user = JSON.parse(localStorage.getItem("user") || "{}");
      // const userId = user?._id || user?.id; // adjust key if different

      // if (!userId) {
      //   throw new Error("User not logged in or missing ID.");
      // }
      console.log("User CV Details", combinedData)
      // ✅ Send POST request to backend
     const response = await axios.post("http://localhost:3001/api/cv/upload", { combinedData });
      setSuccess(response.data.message);
      return response.data;
    } catch (err: unknown) {
      let message = "Something went wrong";
      console.error("Error uploading CV:", err);

      if (axios.isAxiosError(err) && err.response?.data) {
        // prefer message from server
        message = String(err.response.data?.message || err.response.data);
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadCV, loading, error, success };
};
