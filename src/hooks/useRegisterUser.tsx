"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "@/utils/axiosInstance";

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
      const response = await api.post("/user/register", formData);

      console.log("✅ Registration Success:", response.data);
      toast.success(response.data.message)
      setSuccess(true);
      return response.data;
    } catch (err: unknown) {
      console.error("❌ Registration Error:", err);
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(err) && err.response?.data) {
        errorMessage = String(err.response.data?.error || err.response.data);
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      // ✅ show toast
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
};
