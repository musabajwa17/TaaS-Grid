"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  role?: string;
  id?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User, tokens?: { accessToken?: string; refreshToken?: string }) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage immediately on mount
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
  const login = (userData: User, tokens?: { accessToken?: string; refreshToken?: string }) => {
    if (tokens?.accessToken) localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens?.refreshToken) localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // ✅ immediate update — no refresh needed
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

// ✅ Hook to access auth state
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
