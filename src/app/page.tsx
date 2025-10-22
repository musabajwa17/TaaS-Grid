import ServiceCards from "@/components/cards/ServiceCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/cards/ServicesCard";
import StatsSection from "@/components/StatsSection";
import TalentServices from "@/components/TalentServices";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import UserTypesSection from "@/components/UserTypes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
    </>
  );
}
