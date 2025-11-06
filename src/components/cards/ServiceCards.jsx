"use client"
import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';

const cards = [
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
      "TaaS Grid's automation engine streamlines operations, connects systems, and eliminates repetitive tasks — empowering teams to focus on strategic outcomes.",
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
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-900 to-zinc-950 p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Success Stories</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Transforming Business at Scale
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Discover how industry leaders leverage TaaS Grid to drive innovation and accelerate growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{ 
                  backgroundImage: `url(${card.image})`,
                  filter: hoveredCard === card.id ? 'blur(8px) brightness(0.2)' : 'brightness(0.5)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-700 ${
                hoveredCard === card.id 
                  ? 'from-cyan-950/95 via-zinc-900/90 to-zinc-950/95 opacity-100' 
                  : 'from-transparent via-zinc-900/40 to-zinc-950/90 opacity-100'
              }`} />

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top Section - Logo */}
                <div className={`transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="inline-block px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-cyan-400">{card.logo}</h3>
                  </div>
                </div>

                {/* Hover Content - Center */}
                <div className={`absolute inset-0 flex flex-col justify-center items-center p-8 text-center transition-all duration-700 ${
                  hoveredCard === card.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}>
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-4"></div>
                  <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {card.hoverTitle}
                  </h3>
                  <p className="text-base text-neutral-300 leading-relaxed">
                    {card.hoverDescription}
                  </p>
                  <div className="mt-6 pt-6 border-t border-cyan-500/20">
                    <p className="text-white font-semibold text-base">{card.author}</p>
                    <p className="text-cyan-400 text-sm font-medium">{card.authorRole}</p>
                  </div>
                </div>

                {/* Bottom Section - Title & Play Button */}
                <div className={`transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white leading-tight mb-1">
                        {card.title}
                      </h4>
                      <p className="text-sm text-cyan-400 font-medium">
                        {card.description}
                      </p>
                    </div>
                    <button 
                      className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 group-hover:from-cyan-300 group-hover:to-cyan-400"
                      aria-label="Play video"
                    >
                      <Play className="w-6 h-6 text-zinc-950 fill-zinc-950 ml-1 transition-transform duration-300 group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Glow Border */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                hoveredCard === card.id 
                  ? 'shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-500/50' 
                  : 'ring-1 ring-white/5'
              }`} />
              
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full transition-opacity duration-500 ${
                hoveredCard === card.id ? 'opacity-100' : 'opacity-0'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;