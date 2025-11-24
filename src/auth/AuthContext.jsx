"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext(undefined);

const API_URL = process.env.NEXT_PUBLIC_BASE_URL; // backend base URL

// -------------------- Axios Instance -------------------- //
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // send cookies automatically
});

// -------------------- Axios Interceptor for Token Refresh -------------------- //
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post("/api/auth/refresh"); // refresh access token
        return api(originalRequest); // retry original request
      } catch (err) {
        console.log("Refresh token failed → logging out");
        window.location.href = "/login"; // force logout
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// -------------------- AuthProvider -------------------- //
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Auto-login on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return res.data.user;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await api.post("/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register
  const register = async (role, data) => {
     const endpoint =
        role === "student" || role === "employee"
          ? "/api/user/register"
          : role === "employer"
          ? "/api/employer/register"
          : "/api/company/register";

    const res = await api.post(endpoint, data);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// -------------------- Hook -------------------- //
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
