import { useState } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.BASE_URL;

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      // ✅ Example: Save token (optional)
      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading };
};
