"use client";
import { useEffect, useState } from "react";
import CompanySidebar from "@/components/sidebar/companysidebar/CompanySidebar";
import EmployeeSidebar from "@/components/sidebar/employeesidebar/EmployeeSidebar";
import UserSidebar from "@/components/sidebar/usersidebar/UserSidebar";
// import EmployerDashboard from "@/components/dashboard/employer/EmployerDashboard";
import EmployerSidebar from "@/components/sidebar/employersidebar/EmployerSidebar";
export default function Home() {
  const [user, setUser] = useState();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);
  const renderSidebar = () => {
    switch (user?.role) {
      case "student":
        return <UserSidebar />;
      case "company":
        return <CompanySidebar />;
      case "employer":
        return <EmployerSidebar />;
      case "employee":
        return <EmployeeSidebar />;
      default:
        return null; // No sidebar for unknown roles
    }
  };

  return (
    <>
      {renderSidebar()}
      {/* <EmployerDashboard /> */}
    </>
  );
}
