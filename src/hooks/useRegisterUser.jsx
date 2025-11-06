"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
// const BASE_URL = process.env.BASE_URL;
export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const registerUser = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

    //   const response = await axios.post(`${BASE_URL}/register`, formData, {
      const response = await axios.post("http://localhost:3001/api/user/register", formData);

  // Registration success
      toast.success(response.data.message)
      setSuccess(true);
      return response.data;
    } catch (err) {
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
