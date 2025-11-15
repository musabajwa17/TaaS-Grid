import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginUser = async (role, email, password) => {
    setLoading(true);

    try {
      const endpointMap = {
        student: "/api/user/login",
        employee: "/api/user/login",
        employer: "/api/employer/login",
        company: "/api/company/login",
      };

      if (!endpointMap[role]) throw new Error("Invalid role");

      const res = await axios.post(
        `http://localhost:3001${endpointMap[role]}`,
        { email, password },
        { withCredentials: true } // important for refresh cookie
      );

      const { accessToken, data } = res.data;

      // Store access token in memory ONLY
      setUser({
        ...data,
        role,
        accessToken,
      });

      toast.success("Login successful");
      return data;

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:3001/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return { loginUser, logoutUser, user, loading };
};
