"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// ✅ Create context (no TypeScript generics)
const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error reading user from storage:", error);
    }
    setLoading(false);
  }, []);

  // ✅ Login function
  const login = (userData, tokens) => {
    if (tokens?.accessToken)
      localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens?.refreshToken)
      localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // immediate update
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
