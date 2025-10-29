import { useState } from "react";
import toast from "react-hot-toast";
// import api from "@/utils/axiosInstance";
import axios from "axios";

// const BASE_URL = "http://localhost:3001";
// const BASE_URL = process.env.BASE_URL;

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState<Record<string, unknown> | null>(null);
  const loginUser = async (email: string, password: string) => {
    // Removed logging of credentials for security
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/user/login", {
        email,
        password,
      });
      setUserLogin(response.data as Record<string, unknown>);
      const { user, accessToken, refreshToken } = response.data;
      // setUser(user);
      // console.log("User Login", user);
      // console.log("Login Response:", response.data);
      localStorage.setItem("user", JSON.stringify(user)); // contains _id, fullName, role, email
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      toast.success(response.data.message);
      return user;
    } catch (error: unknown) {
      console.error("Login failed:", error);
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error as any) && (error as any).response?.data) {
        // best effort for axios error
        errorMessage = String((error as any).response.data?.error || (error as any).response.data || errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      // ✅ show toast
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) return;

    try {
      await axios.post("http://localhost:3001/api/users/logout", { userId: user._id });
      localStorage.removeItem("user");
    } catch (err: unknown) {
      console.error("Logout Error:", err);
    }
  };

  return { loginUser,userLogin, logout, loading };
};
