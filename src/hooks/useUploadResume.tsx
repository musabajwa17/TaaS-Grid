import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import type { ParsedData } from "@/types/ParsedData";

export function useUploadResume() {
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleUpload = async (uploadFile: File) => {
    setLoading(true);
    setError(null);
    setParsedData(null);

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const source = axios.CancelToken.source();

      // Timeout handler (10s)
      const timeout = setTimeout(() => {
        source.cancel("⏰ Request timed out. Please try a smaller or valid file.");
      }, 10000);

      const res = await axios.post(`${apiUrl}/parse-resume`, formData, {
        cancelToken: source.token,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearTimeout(timeout);
      setParsedData(res.data);
      toast.success("✅ Resume parsed successfully!");
    } catch (err: any) {
      let message = "An unknown error occurred.";

      if (axios.isCancel(err)) {
        message = err.message;
      } else if (err.response?.data?.error) {
        message = err.response.data.error;
      } else if (err.message) {
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
