"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ResumeParser from "@/components/resume/ResumeParser";

export default function CvBuilderPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const hasChecked = useRef(false); // 🧠 Prevent double execution

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
        Checking authorization...
      </div>
    );
  }

  return (
    <>
      <Header />
      <ResumeParser />
      <Footer />
    </>
  );
}
