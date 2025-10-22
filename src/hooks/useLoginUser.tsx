import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "@/utils/axiosInstance";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.BASE_URL;

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    console.log("Login Credentials", email, password);
    setLoading(true);
    try {
      console.log("Login Credentials 1");
      const response = await api.post("/user/login", {
        email,
        password,
      });
      const { user, accessToken, refreshToken } = response.data;
      console.log("User Login", user);
      console.log("Login Response:", response.data);
      localStorage.setItem("user", JSON.stringify(user)); // contains _id, fullName, role, email
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success(response.data.message);
      return user;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.error || "Something went wrong";

      // ✅ show toast
      toast.error(errorMessage);
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) return;

    try {
      await api.post("/users/logout", { userId: user._id });
      localStorage.removeItem("user");
    } catch (err: any) {
      console.error("Logout Error:", err.response?.data || err.message);
    }
  };

  return { loginUser, logout, loading };
};
