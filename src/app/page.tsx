"use client";

import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
const ServiceCards = dynamic(() => import("@/components/cards/ServiceCards"), { ssr: false });
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const HeroSection = dynamic(() => import("@/components/HeroSection"), { ssr: false });
const Services = dynamic(() => import("@/components/cards/ServicesCard"), { ssr: false });
const StatsSection = dynamic(() => import("@/components/StatsSection"), { ssr: false });
const TalentServices = dynamic(() => import("@/components/TalentServices"), { ssr: false });
const TestimonialCarousel = dynamic(() => import("@/components/TestimonialCarousel"), { ssr: false });
const UserTypesSection = dynamic(() => import("@/components/UserTypes"), { ssr: false });

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
