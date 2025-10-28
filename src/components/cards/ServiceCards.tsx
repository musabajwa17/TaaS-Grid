"use client"
import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface Card {
  id: number;
  image: string;
  logo: string;
  title: string;
  description: string;
  hoverTitle: string;
  hoverDescription: string;
  author: string;
  authorRole: string;
}

const cards: Card[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598316560453-0246d4611979?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGVyJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    logo: "DataPulse",
    title: "Driving Smarter Insights at Scale",
    description: "with automated intelligence",
    hoverTitle: "Actionable Data Clarity",
    hoverDescription:
      "TaaS Grid empowers organizations to unify fragmented data streams into a single intelligent platform, transforming analytics into measurable business growth.",
    author: "Sarah Johnson",
    authorRole: "Chief Data Officer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800&h=600&fit=crop",
    logo: "EngageIQ",
    title: "Personalizing User Journeys Effortlessly",
    description: "with AI-driven engagement",
    hoverTitle: "Next-Level Personalization",
    hoverDescription:
      "Using behavioral segmentation and predictive algorithms, TaaS Grid helps brands craft hyper-personalized experiences that drive retention and loyalty.",
    author: "Michael Chen",
    authorRole: "VP of Customer Success"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
    logo: "AutoCore",
    title: "Reducing Manual Workload by 60%",
    description: "through workflow automation",
    hoverTitle: "Intelligent Process Automation",
    hoverDescription:
      "TaaS Grid’s automation engine streamlines operations, connects systems, and eliminates repetitive tasks — empowering teams to focus on strategic outcomes.",
    author: "Emily Rodriguez",
    authorRole: "Automation Lead"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    logo: "InsightEdge",
    title: "Predicting Market Shifts with Confidence",
    description: "using real-time analytics",
    hoverTitle: "Predictive Intelligence Suite",
    hoverDescription:
      "By integrating advanced predictive modeling, TaaS Grid enables data-driven forecasting that helps enterprises stay ahead of market trends and disruptions.",
    author: "James Wilson",
    authorRole: "Head of Predictive Strategy"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    logo: "Connect360",
    title: "Transforming Collaboration Efficiency",
    description: "with unified data access",
    hoverTitle: "Connected Operations Hub",
    hoverDescription:
      "TaaS Grid centralizes communication and analytics across departments — enabling seamless collaboration, transparency, and faster decision-making.",
    author: "Lisa Anderson",
    authorRole: "Director of Product Operations"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    logo: "LearnEdge",
    title: "Empowering Teams with Real-Time Learning",
    description: "through knowledge automation",
    hoverTitle: "Continuous Intelligence Learning",
    hoverDescription:
      "LearnEdge integrates directly into TaaS Grid, offering adaptive training modules and live analytics insights that help teams evolve alongside technology.",
    author: "Ayesha Malik",
    authorRole: "Director of Learning Innovation"
  }
];


const ServiceCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Customer Success Stories</h1>
          <p className="text-xl text-slate-300">See how leading companies transform their business with TaaS Grid</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/30"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ 
                  backgroundImage: `url(${card.image})`,
                  filter: hoveredCard === card.id ? 'blur(8px) brightness(0.3)' : 'brightness(0.7)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-700 ${
                hoveredCard === card.id 
                  ? 'from-purple-900/90 via-purple-800/80 to-slate-900/95 opacity-100' 
                  : 'from-transparent via-transparent to-slate-900/80 opacity-100'
              }`} />

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top Section - Logo */}
                <div className={`transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">{card.logo}</h3>
                </div>

                {/* Hover Content - Center */}
                <div className={`absolute inset-0 flex flex-col justify-center items-center p-8 text-center transition-all duration-700 ${
                  hoveredCard === card.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {card.hoverTitle}
                  </h3>
                  <p className="text-lg text-slate-200 leading-relaxed italic">
                    &ldquo;{card.hoverDescription}&rdquo;
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-white font-semibold text-lg">{card.author}</p>
                    <p className="text-slate-300 text-sm">{card.authorRole}</p>
                  </div>
                </div>

                {/* Bottom Section - Title & Play Button */}
                <div className={`transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white leading-tight mb-1">
                        {card.title}
                      </h4>
                      <p className="text-base text-slate-200 font-medium">
                        {card.description}
                      </p>
                    </div>
                    <button 
                      className="ml-4 flex-shrink-0 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-xl group-hover:bg-purple-500 group-hover:shadow-purple-500/50"
                      aria-label="Play video"
                    >
                      <Play className="w-6 h-6 text-slate-900 fill-slate-900 ml-1 group-hover:text-white group-hover:fill-white transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
                hoveredCard === card.id 
                  ? 'border-purple-400 shadow-lg shadow-purple-500/50' 
                  : 'border-transparent'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;