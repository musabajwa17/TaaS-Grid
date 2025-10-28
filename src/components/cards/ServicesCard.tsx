"use client";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Rocket,
  Target,
  Users,
  TrendingUp,
  Award,
  Zap,
  Globe,
  CheckCircle2,
  Lightbulb,
  BarChart,
  Settings,
  UserCheck,
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "HireConnect",
    description: "Discover top-tier professionals perfectly aligned with your organization’s goals.",
    icon: Sparkles,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: UserCheck, text: "AI-based candidate matching" },
      { icon: Lightbulb, text: "Smart skill recommendations" },
      { icon: BarChart, text: "Talent analytics dashboard" },
      { icon: Settings, text: "Customizable search filters" },
    ],
  },
  {
    id: 2,
    title: "FYP Bridge",
    description: "Empower your business expansion through data-driven team scaling.",
    icon: Rocket,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: TrendingUp, text: "Predictive workforce planning" },
      { icon: CheckCircle2, text: "Goal-based hiring strategy" },
      { icon: BarChart, text: "Real-time progress tracking" },
      { icon: Settings, text: "Flexible scaling tools" },
    ],
  },
  {
    id: 3,
    title: "IdeaVault",
    description: "Ensure every team member’s goals align with your company’s vision.",
    icon: Target,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: CheckCircle2, text: "OKR-based progress" },
      { icon: BarChart, text: "Smart performance metrics" },
      { icon: Settings, text: "Real-time feedback loop" },
      { icon: Lightbulb, text: "Improvement suggestions" },
    ],
  },
  {
    id: 4,
    title: "ProjectHub",
    description: "Build strong, collaborative teams that deliver consistent results.",
    icon: Users,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: UserCheck, text: "Team compatibility insights" },
      { icon: BarChart, text: "Strength-based assignment" },
      { icon: Settings, text: "Adaptive workflow design" },
      { icon: Lightbulb, text: "Cohesion recommendations" },
    ],
  },
  {
    id: 5,
    title: "CV Forge",
    description: "Boost productivity through targeted insights and intelligent tracking.",
    icon: TrendingUp,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: BarChart, text: "Performance dashboards" },
      { icon: CheckCircle2, text: "Goal-based scoring" },
      { icon: Settings, text: "Smart task automation" },
      { icon: Lightbulb, text: "Optimization suggestions" },
    ],
  },
  {
    id: 6,
    title: "TalentMatch AI",
    description: "Foster continuous improvement and skill enhancement across your workforce.",
    icon: Award,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: CheckCircle2, text: "Employee growth paths" },
      { icon: UserCheck, text: "Mentorship matching" },
      { icon: Lightbulb, text: "Skill gap detection" },
      { icon: BarChart, text: "Progress analytics" },
    ],
  },
  {
    id: 7,
    title: "SkillBoost Pro",
    description: "Drive creativity with an environment built for breakthrough thinking.",
    icon: Zap,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: Lightbulb, text: "Innovation tracking" },
      { icon: CheckCircle2, text: "Idea validation system" },
      { icon: Settings, text: "Rapid prototyping" },
      { icon: BarChart, text: "Success scoring" },
    ],
  },
  {
    id: 8,
    title: "LearnEdge",
    description: "Connect with skilled professionals worldwide for limitless potential.",
    icon: Globe,
    gradient: "from-[#00bb98] to-black",
    points: [
      { icon: UserCheck, text: "Cross-border sourcing" },
      { icon: Lightbulb, text: "Global team insights" },
      { icon: BarChart, text: "Timezone coordination" },
      { icon: Settings, text: "International compliance" },
    ],
  },
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % modules.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getVisibleModules = () => {
    const prev = (currentIndex - 1 + modules.length) % modules.length;
    const next = (currentIndex + 1) % modules.length;
    return [prev, currentIndex, next];
  };

  const visibleIndices = getVisibleModules();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f4f8fd] py-20 px-4">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Empower Your Growth Journey
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Transform your business with powerful modules designed for talent,
            performance, and innovation.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative h-[620px] md:h-[560px] flex items-center justify-center">
          <div
            className="relative w-full max-w-7xl flex items-center justify-center"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {visibleIndices.map((index, position) => {
              const mod = modules[index];
              const Icon = mod.icon;
              const isCenter = position === 1;
              const isLeft = position === 0;
              const isRight = position === 2;

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-[900ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer ${
                    isCenter ? "z-30" : "z-10"
                  }`}
                  onClick={() => !isCenter && setCurrentIndex(index)}
                  style={{
                    transform: `translateX(${isLeft ? "-420px" : isRight ? "420px" : "0px"}) scale(${isCenter ? "1.08" : "0.85"})`,
                    opacity: isCenter ? 1 : 0.6,
                  }}
                >
                  {/* Card: flexible column layout */}
                  <div
                    className={`relative w-[360px] md:w-[380px] rounded-3xl border border-green-600 bg-white p-6 md:p-8 flex flex-col transition-all duration-700 ${
                      isCenter ? "scale-105" : "scale-95"
                    }`}
                    aria-hidden={false}
                  >
                    {/* Top row: number (left) + icon (right) */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-b from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {mod.id.toString().padStart(2, "0")}
                      </div>
            <div className={`p-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 ${mod.gradient}`}>
              <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Title & paragraph */}
                        <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-semibold text-black">
                        {mod.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base mt-2">
                        {mod.description}
                      </p>
                    </div>

                    {/* Points: push to bottom when space allows */}
                    <div className="mt-auto space-y-3">
                      {mod.points.map((point, idx) => {
                        const PIcon = point.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-3 border border-green-200 rounded-xl p-3 hover:bg-[#00bb98]/5 transition-all"
                          >
                            <div className="w-10 h-10 rounded-full border border-green-600 flex items-center justify-center bg-white">
                              <PIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-black">
                                {point.text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-12">
          {modules.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-10 bg-green-600" : "bg-gray-300 hover:bg-[#00bb98]/40"
              }`}
              aria-label={`Go to module ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
