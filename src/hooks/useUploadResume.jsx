import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// import type { ParsedData } from "@/types/ParsedData";

export function useUploadResume(user) {
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleUpload = async (uploadFile) => {
    setLoading(true);
    setError(null);
    setParsedData(null);

    const formData = new FormData();
    formData.append("file", uploadFile);
    console.log("USer", user)
const role = user?.role ?? null;

console.log("User role:", role);
const endpoint =
  role === "student" ? `${apiUrl}/parse-resume` : `${apiUrl}/employee-parser`;

    try {
      const source = axios.CancelToken.source();

      // Timeout handler (10s)
      const timeout = setTimeout(() => {
        source.cancel("Request timed out. Please try a smaller or valid file.");
      }, 10000);

      const res = await axios.post(endpoint, formData, {
        cancelToken: source.token,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearTimeout(timeout);
      setParsedData(res.data);
    // response logged
      toast.success("Resume parsed successfully!");
    } catch (err) {
      let message = "An unknown error occurred.";

      if (axios.isCancel(err)) {
        message = (err).message;
      } else if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = String(err.response.data.error);
      } else if (err instanceof Error) {
        message = err.message;
      }

      // Clean error string
      if (typeof message === "object") {
        message = JSON.stringify(message);
      }

      setError(message);
      toast.error(message);
      console.error("Error:", message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, parsedData, handleUpload, setParsedData, setError };
}
