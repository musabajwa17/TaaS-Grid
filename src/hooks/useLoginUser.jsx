import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState(null);

  /**
   * loginUser: logs in a user/company based on role
   * @param {string} role - "student" | "employee" | "employer" | "company"
   * @param {string} email
   * @param {string} password
   * @returns logged in user/company object
   */
  const loginUser = async (role, email, password) => {
    setLoading(true);

    try {
      let endpoint = "";

      switch (role) {
        case "student":
        case "employee":
          endpoint = "/api/user/login";
          break;
        case "employer":
          endpoint = "/api/employer/login";
          break;
        case "company":
          endpoint = "/api/company/login";
          break;
        default:
          throw new Error("Invalid role selected");
      }

      const response = await axios.post(`http://localhost:3001${endpoint}`, { email, password });
      setLoginData(response.data);

      const { accessToken, refreshToken } = response.data;
      const dataKey = role === "company" || role === "employer" ? "company" : "user";
      const objectData = role === "company" || role === "employer" ? response.data.company || response.data.employer : response.data.user;

      // Save to localStorage
      localStorage.setItem(dataKey, JSON.stringify(objectData));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success(response.data.message || "Logged in successfully!");
      return objectData;
    } catch (error) {
      console.error("Login failed:", error);

      let errorMessage = "Something went wrong";
      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage = String(error.response.data?.error || error.response.data || errorMessage);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * logoutUser: logs out user/company based on stored role
   */
  const logoutUser = async () => {
    const storedUser = localStorage.getItem("user") || localStorage.getItem("company");
    const dataKey = localStorage.getItem("user") ? "user" : "company";
    const storedObj = storedUser ? JSON.parse(storedUser) : null;

    if (!storedObj) return;

    try {
      const endpoint = dataKey === "company" ? "/api/company/logout" : "/api/users/logout";
      const body = dataKey === "company" ? { companyId: storedObj._id } : { userId: storedObj._id };

      await axios.post(`http://localhost:3001${endpoint}`, body);

      localStorage.removeItem(dataKey);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return { loginUser, loginData, logoutUser, loading };
};
