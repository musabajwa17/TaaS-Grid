"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start as loading

  // 🔹 Auto-login on mount if cookie exists
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/auth/me", {
        withCredentials: true,
      });

      setUser(res.data.user);
    } catch (err) {
      // 🔥 TOKEN EXPIRED OR INVALID
      console.log("Token expired → logging out");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  // 🔹 Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const loggedUser = res.data.user; // backend must return { user: { role, ... } }
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // allow frontend to handle error
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout function
  const logout = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3001/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };
  const register = async (role, data) => {
  const endpoint =
    role === "student" || role === "employee"
      ? "http://localhost:3001/api/auth/register/user"
      : "http://localhost:3001/api/auth/register/company"

  const res = await fetch(endpoint, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await res.json();
  return await res.json();
};

  return (
    <AuthContext.Provider value={{ user, login, logout,register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};




// 🔹 Hook to consume context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
