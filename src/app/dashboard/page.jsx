"use client";

import { useAuth } from "../../auth/AuthContext";
import CompanySidebar from "@/components/sidebar/companysidebar/CompanySidebar";
import EmployeeSidebar from "@/components/sidebar/employeesidebar/EmployeeSidebar";
import UserSidebar from "@/components/sidebar/usersidebar/UserSidebar";
import EmployerSidebar from "@/components/sidebar/employersidebar/EmployerSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading]);

  if (!user) return null;

  const renderSidebar = () => {
    switch (user.role) {
      case "student":
        return <UserSidebar />;
      case "employee":
        return <EmployeeSidebar />;
      case "employer":
        return <EmployerSidebar />;
      case "company":
        return <CompanySidebar />;
      default:
        return null;
    }
  };

  return <>{renderSidebar()}</>;
}
