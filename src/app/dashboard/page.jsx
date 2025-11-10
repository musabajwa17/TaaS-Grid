"use client";
import { useEffect, useState } from "react";
import CompanySidebar from "@/components/sidebar/companysidebar/CompanySidebar";
import EmployeeSidebar from "@/components/sidebar/employeesidebar/EmployeeSidebar";
import UserSidebar from "@/components/sidebar/usersidebar/UserSidebar";
import EmployerSidebar from "@/components/sidebar/employersidebar/EmployerSidebar";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for all possible keys
    const storedUser = localStorage.getItem("user");
    const storedEmployee = localStorage.getItem("employee");
    const storedEmployer = localStorage.getItem("employer");
    const storedCompany = localStorage.getItem("company");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    } else if (storedEmployee) {
      try {
        const empData = JSON.parse(storedEmployee);
        if (!empData.role) empData.role = "employee";
        setUser(empData);
      } catch (error) {
        console.error("Error parsing employee from localStorage:", error);
      }
    } else if (storedEmployer) {
      try {
        const empData = JSON.parse(storedEmployer);
        if (!empData.role) empData.role = "employer";
        setUser(empData);
      } catch (error) {
        console.error("Error parsing employer from localStorage:", error);
      }
    } else if (storedCompany) {
      try {
        const compData = JSON.parse(storedCompany);
        if (!compData.role) compData.role = "company";
        setUser(compData);
      } catch (error) {
        console.error("Error parsing company from localStorage:", error);
      }
    }
  }, []);

  const renderSidebar = () => {
    switch (user?.role) {
      case "student":
        return <UserSidebar />;
      case "employee":
        return <EmployeeSidebar />;
      case "employer":
        return <EmployerSidebar />;
      case "company":
        return <CompanySidebar />;
      default:
        return null; // Unknown role or not logged in
    }
  };

  return <>{renderSidebar()}</>;
}
