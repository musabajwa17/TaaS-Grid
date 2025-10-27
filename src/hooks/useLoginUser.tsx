import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/utils/axiosInstance";

// const BASE_URL = "http://localhost:3001";
const BASE_URL = process.env.BASE_URL;

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState<any>(null);
  const loginUser = async (email: string, password: string) => {
    console.log("Login Credentials", email, password);
    setLoading(true);
    try {
      console.log("Login Credentials 1");
      const response = await api.post("/user/login", {
        email,
        password,
      });
      
// Log the full JSON
console.log("Login Response:", response.data);

// Set the entire JSON object to your state
setUserLogin(response.data);
      const { user, accessToken, refreshToken } = response.data;
      // setUser(user);
      // console.log("User Login", user);
      // console.log("Login Response:", response.data);
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

  return { loginUser,userLogin, logout, loading };
};
