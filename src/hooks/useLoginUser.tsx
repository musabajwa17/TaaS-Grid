import { useState } from "react";
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.BASE_URL;

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    console.log("Login Credentials",email, password)
    setLoading(true);
    try {
      console.log("Login Credentials 1")
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      // ✅ Example: Save token (optional)
      if (response.data?.accessToken && response.data?.user?.role) {
  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("role", response.data.user.role);
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
