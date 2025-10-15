import ServiceCards from "@/components/cards/ServiceCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
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
    </>
  );
}
