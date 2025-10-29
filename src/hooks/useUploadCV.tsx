import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useUploadCV = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const uploadCV = async (formData: any) => {
    console.log("Uploading Resume:", formData);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // ✅ Extract userId from localStorage
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?._id;

      if (!userId) {
        throw new Error("User ID not found in localStorage. Please log in again.");
      }

      // ✅ Merge userId into the payload
      const payload = { ...formData, userId };

      // ✅ Send POST request to backend
      const response = await axios.post(
        "http://localhost:3001/api/cv/resume",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ CV Upload Success:", response.data);
      const msg = response.data.message || "Resume uploaded successfully!";
      setSuccess(msg);
      toast.success(msg); // ✅ Success toast
      return response.data;
    } catch (err: unknown) {
      console.error("❌ Error uploading CV:", err);

      let message = "Something went wrong while uploading the resume.";
      if (axios.isAxiosError(err) && err.response?.data) {
        message = String(err.response.data?.message || err.response.data);
      } else if (err instanceof Error) {
        message = err.message;
      }

      setError(message);
      toast.error(message); // ❌ Error toast
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadCV, loading, error, success };
};
