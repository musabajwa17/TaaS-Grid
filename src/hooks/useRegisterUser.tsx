import { useState } from "react";
import axios from "axios";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: string;
}
const BASE_URL = process.env.BASE_URL;
export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const registerUser = async (formData: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

    //   const response = await axios.post(`${BASE_URL}/register`, formData, {
      const response = await axios.post("http://localhost:3001/register", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Registration Success:", response.data);
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      console.error("❌ Registration Error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
