"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api"; // <-- Clean Axios instance

// -------------------- Create Context -------------------- //
const AuthContext = createContext(undefined);

// -------------------- AuthProvider -------------------- //
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Auto-login on mount
useEffect(() => {
  let isMounted = true; // prevent updates if component unmounts

  const fetchUser = async () => {
    try {
      const res = await api.get("/api/auth/me");
      if (isMounted) setUser(res.data.user);
    } catch (err) {
      if (isMounted) {
        setUser(null);
        // DON'T automatically push to /login here
        // Let the page or component handle redirect
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  fetchUser();

  return () => {
    isMounted = false;
  };
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
      await api.post("/api/auth/logout");
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
