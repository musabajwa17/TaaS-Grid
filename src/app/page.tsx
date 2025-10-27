"use client";

import { Toaster } from "react-hot-toast";
import ServiceCards from "@/components/cards/ServiceCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/cards/ServicesCard";
import StatsSection from "@/components/StatsSection";
import TalentServices from "@/components/TalentServices";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import UserTypesSection from "@/components/UserTypes";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatsSection />
      <Services />
      <TalentServices />
      <ServiceCards />
      <UserTypesSection />
      <TestimonialCarousel />
      <Footer />

      {/* ✅ React Hot Toast setup — top center */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
            border: "1px solid #ddd",
            padding: "12px 16px",
            borderRadius: "8px",
          },
          success: {
            style: { background: "#e8f5e9", color: "#2e7d32" },
          },
          error: {
            style: { background: "#ffebee", color: "#c62828" },
          },
        }}
      />
    </>
  );
}
