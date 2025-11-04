import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useUploadCV = () => {
  const [loading, setLoading] = useState(false);
  const uploadCV = async (formData) => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?._id;
      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }
      const payload = { ...formData, userId };
      console.log("Payload for CV upload:", payload);
      const response = await axios.post(
        "http://localhost:3001/api/employee/resume",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("✅ CV uploaded successfully:", response.data);
      const msg = response.data?.message || "Resume uploaded successfully!";
      console.log(msg);
      return response.data;
    } catch (err) {
      console.error("❌ Error uploading CV:", {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config?.url,
      });
      let message = "Something went wrong while uploading the resume.";
      if (axios.isAxiosError(err) && err.response?.data) {
        message = String(err.response.data?.message || err.response.data);
      } else if (err instanceof Error) {
        message = err.message;
      }
      console.log(message);
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };
  return { uploadCV };
};
