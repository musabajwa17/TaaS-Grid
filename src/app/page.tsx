import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import StatsSection from "@/components/StatsSection";
import TalentServices from "@/components/TalentServices";
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <StatsSection />
      <Services />
      <TalentServices />
    </>
  );
}
