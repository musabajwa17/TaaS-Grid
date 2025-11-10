import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const useLoginCompany = () => {
  const [loading, setLoading] = useState(false);
  const [companyLogin, setCompanyLogin] = useState(null);

  const loginCompany = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/company/login", {
        email,
        password,
      });

      setCompanyLogin(response.data);
      const { company, accessToken, refreshToken } = response.data;

      // Store in localStorage
      localStorage.setItem("company", JSON.stringify(company)); // contains _id, companyName, email, plan, etc.
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success(response.data.message || "Logged in successfully!");
      return company;
    } catch (error) {
      console.error("Company login failed:", error);

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

  const logoutCompany = async () => {
    const storedCompany = localStorage.getItem("company");
    const company = storedCompany ? JSON.parse(storedCompany) : null;

    if (!company) return;

    try {
      await axios.post("http://localhost:3001/api/company/logout", { companyId: company._id });
      localStorage.removeItem("company");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      console.error("Company logout error:", err);
    }
  };

  return { loginCompany, companyLogin, logoutCompany, loading };
};
