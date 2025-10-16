"use client"
import React, { useState, useEffect } from 'react';
import { Briefcase, Brain, Users } from "lucide-react";
const modules = [
  { name: "HireConnect", color: "from-blue-600 to-blue-700", icon: "🏠", angle: 0 },
  { name: "FYP Bridge", color: "from-yellow-500 to-amber-500", icon: "💻", angle: 45 },
  { name: "Idea Vault", color: "from-blue-700 to-blue-800", icon: "⚡", angle: 90 },
  { name: "ProjectHub", color: "from-yellow-600 to-amber-600", icon: "🤖", angle: 135 },
  { name: "CV Forge", color: "from-blue-600 to-blue-700", icon: "🤝", angle: 180 },
  { name: "TalentMatch AI", color: "from-yellow-500 to-amber-500", icon: "🌉", angle: 225 },
  { name: "SkillBoost Pro", color: "from-blue-700 to-blue-800", icon: "💡", angle: 270 },
  { name: "LearnEdge", color: "from-yellow-600 to-amber-600", icon: "🚀", angle: 315 }
];

export default function HeroSection() {
  const [activeModule, setActiveModule] = useState(0);
  const [poppedModules, setPoppedModules] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule(prev => (prev + 1) % 8);
      setPoppedModules(prev => [...prev, activeModule]);
      setTimeout(() => {
        setPoppedModules(prev => prev.filter(m => m !== activeModule));
      }, 800);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeModule]);

  const getPosition = (index: number) => {
    const angle = (modules[index].angle - 90) * (Math.PI / 180);
    const radius = 220;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden mt-10">
      {/* Hexagonal Network Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div>

      {/* Animated Network Dots */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
          
          {/* Left Content */}
           <div className="space-y-8 mx-8">
      {/* Headings Section */}
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          {/* Hire Faster */}
          <div
            className="flex items-center gap-4 animate-slideInLeft"
            style={{ animationDelay: "0s" }}
          >
            <div className="p-3 bg-[#00bb98]/10 rounded-2xl">
              <Briefcase className="w-6 h-6 text-[#00bb98]" />
            </div>
            <h2 className="text-6xl font-extrabold text-black leading-tight tracking-tight">
              Hire Faster
            </h2>
          </div>

          {/* Train Smarter */}
          <div
            className="flex items-center gap-4 animate-slideInLeft"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="p-3 bg-[#00bb98]/10 rounded-2xl">
              <Brain className="w-6 h-6 text-[#00bb98]" />
            </div>
            <h2 className="text-6xl font-extrabold text-black leading-tight tracking-tight">
              Train Smarter
            </h2>
          </div>

          {/* Grow Together */}
          <div
            className="flex items-center gap-4 animate-slideInLeft"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="p-3 bg-[#00bb98]/10 rounded-2xl">
              <Users className="w-6 h-6 text-[#00bb98]" />
            </div>
            <h2 className="text-6xl font-extrabold text-black leading-tight tracking-tight">
              Grow Together
            </h2>
          </div>
        </div>

        {/* Paragraph */}
        <p
          className="text-base text-gray-700 leading-relaxed max-w-xl animate-slideInLeft font-medium"
          style={{ animationDelay: "0.45s" }}
        >
          An integrated ecosystem connecting students, employers, and educators
          — building the future of talent with speed, skill, and synergy.
        </p>
      </div>

      {/* Buttons */}
      <div
        className="flex flex-wrap gap-4 animate-slideInLeft"
        style={{ animationDelay: "0.6s" }}
      >
        <button className="group px-8 py-2 bg-[#00bb98] rounded-full text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
          Explore Opportunities
          <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </button>

        <button className="group px-8 py-2 bg-white border-2 border-[#00bb98] rounded-full text-[#00bb98] font-bold text-lg shadow-md hover:bg-[#00bb98]/10 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3">
          Hire Talent
          <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </button>
      </div>
    </div>

          {/* Right Side - Circular Module Layout */}
          <div className="relative flex items-center justify-center h-[650px]">
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Center Circle - Domains Included */}
              <div className="absolute z-30 w-56 h-56 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex items-center justify-center border-4 border-white">
                <div className="text-center">
                  <h3 className="text-white font-extrabold text-3xl mb-1">Domains</h3>
                  <p className="text-yellow-400 font-bold text-2xl">Included</p>
                </div>
              </div>

              {/* Orbital Rings */}
              <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-blue-200/50"></div>
              <div className="absolute w-[520px] h-[520px] rounded-full border border-blue-100/30"></div>

              {/* Circular Modules */}
              {modules.map((module, index) => {
                const pos = getPosition(index);
                const isActive = activeModule === index;
                const isPopped = poppedModules.includes(index);
                
                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-500"
                    style={{
                      transform: `translate(${pos.x}px, ${pos.y}px) scale(${isPopped ? 1.3 : 1})`,
                      zIndex: isPopped ? 40 : 20,
                    }}
                  >
                    {/* Connection Line to Center */}
                    <div 
                      className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-blue-300/60 to-transparent"
                      style={{
                        height: '220px',
                        transformOrigin: '0 0',
                        transform: `rotate(${module.angle + 90}deg)`,
                        opacity: isActive ? 1 : 0.3
                      }}
                    ></div>

                    {/* Module Card */}
                    <div className={`relative w-36 h-36 rounded-3xl bg-gradient-to-br ${module.color} shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group overflow-hidden border-4 border-white
                      ${isPopped ? 'animate-popBounce' : ''}`}>
                      
                      {/* Shine Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent transition-all duration-700 ${isPopped ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}></div>
                      
                      {/* Glow Effect when Active */}
                      {isActive && (
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
                      )}

                      <div className="relative z-10 text-center">
                        <div className={`text-5xl mb-2 transition-all duration-500 ${isPopped ? 'scale-125' : 'scale-100'}`}>
                          {module.icon}
                        </div>
                        <p className="text-white font-bold text-xs px-2 leading-tight drop-shadow-lg">
                          {module.name}
                        </p>
                      </div>

                      {/* Pulse Ring when Popped */}
                      {isPopped && (
                        <div className="absolute inset-0 rounded-3xl border-4 border-white animate-pingRing"></div>
                      )}
                    </div>

                    {/* Side Label with Dot */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
                      style={{
                        left: pos.x > 0 ? '100%' : 'auto',
                        right: pos.x < 0 ? '100%' : 'auto',
                        marginLeft: pos.x > 0 ? '12px' : '0',
                        marginRight: pos.x < 0 ? '12px' : '0'
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-yellow-500 animate-pulse' : 'bg-blue-400'} transition-all duration-300`}></div>
                      <div className={`h-px w-6 ${isActive ? 'bg-yellow-500' : 'bg-blue-400'} transition-all duration-300`}></div>
                    </div>
                  </div>
                );
              })}

              {/* Swipe For Details Button */}
              {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20">
                <button className="relative px-12 py-5 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-full text-yellow-400 font-extrabold text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 group overflow-hidden border-4 border-blue-600">
                  <span className="relative z-10 flex items-center gap-4">
                    Swipe For Details
                    <span className="text-3xl group-hover:translate-x-3 transition-transform duration-300">»»</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes popBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }

        @keyframes pingRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-popBounce {
          animation: popBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-pingRing {
          animation: pingRing 0.8s cubic-bezier(0.4, 0, 0.6, 1);
        }
      `}</style>
    </div>
  );
}




// "use client"
// import React, { useState, useEffect } from 'react';

// const modules = [
//   { name: "Home Inventions", color: "from-[#00bb98] to-[#00a085]", icon: "🏠", angle: 45 },
//   { name: "Application Development", color: "from-[#fbbf24] to-[#f59e0b]", icon: "💻", angle: 90 },
//   { name: "Electronics", color: "from-[#00bb98] to-[#00a085]", icon: "⚡", angle: 135 },
//   { name: "AI & Machine Learning", color: "from-[#fbbf24] to-[#f59e0b]", icon: "🤖", angle: 180 },
//   { name: "HireConnect", color: "from-[#00bb98] to-[#00a085]", icon: "🤝", angle: 225 },
//   { name: "FYP Bridge", color: "from-[#fbbf24] to-[#f59e0b]", icon: "🌉", angle: 270 },
//   { name: "Idea Vault", color: "from-[#00bb98] to-[#00a085]", icon: "💡", angle: 315 },
//   { name: "ProjectHub", color: "from-[#fbbf24] to-[#f59e0b]", icon: "🚀", angle: 0 }
// ];

// export default function JobHeroSection() {
//   const [activeModule, setActiveModule] = useState(0);
//   const [poppedModules, setPoppedModules] = useState<number[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule(prev => (prev + 1) % 8);
//       setPoppedModules(prev => [...prev, activeModule]);
//       setTimeout(() => {
//         setPoppedModules(prev => prev.filter(m => m !== activeModule));
//       }, 800);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, [activeModule]);

//   const getPosition = (index: number) => {
//     const angle = (modules[index].angle - 90) * (Math.PI / 180);
//     const radius = 220;
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//       angle: modules[index].angle
//     };
//   };

//   return (
//     <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden">
//       {/* Hexagonal Network Background */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
//               <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#00bb98" strokeWidth="1.5"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexagons)"/>
//         </svg>
//       </div>

//       {/* Animated Network Dots */}
//       <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00bb98] rounded-full animate-pulse"></div>
//       <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#00bb98] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
//       <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#00bb98] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-[#00bb98] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

//       <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
          
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <div className="flex flex-col space-y-4">
//                 <h2 className="text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight animate-slideInLeft">
//                   Hire Faster
//                 </h2>
//                 <h2 className="text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight animate-slideInLeft" style={{ animationDelay: '0.15s' }}>
//                   Train Smarter
//                 </h2>
//                 <h2 className="text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight animate-slideInLeft" style={{ animationDelay: '0.3s' }}>
//                   Grow Together
//                 </h2>
//               </div>
              
//               <p className="text-xl text-gray-600 leading-relaxed max-w-xl animate-slideInLeft font-medium" style={{ animationDelay: '0.45s' }}>
//                 An integrated ecosystem connecting students, employers and educators for the future of talent
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4 animate-slideInLeft" style={{ animationDelay: '0.6s' }}>
//               <button className="group px-10 py-5 bg-[#00bb98] rounded-full text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
//                 Explore Opportunities
//                 <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
//               </button>
//               <button className="group px-10 py-5 bg-white border-3 border-[#00bb98] rounded-full text-[#00bb98] font-bold text-lg shadow-lg hover:bg-[#f1f5f9] hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
//                 Hire Talent
//                 <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Circular Module Layout */}
//           <div className="relative flex items-center justify-center h-[650px]">
//             <div className="relative w-full h-full flex items-center justify-center">
              
//               {/* Center Circle - Domains Included */}
//               <div className="absolute z-30 w-56 h-56 rounded-full bg-gradient-to-br from-[#00bb98] via-[#00a085] to-[#008f73] shadow-2xl flex items-center justify-center border-4 border-white">
//                 <div className="text-center">
//                   <h3 className="text-white font-extrabold text-3xl mb-1">Domains</h3>
//                   <p className="text-yellow-400 font-bold text-2xl">Included</p>
//                 </div>
//               </div>

//               {/* Orbital Rings */}
//               <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-[#00bb98]/30"></div>
//               <div className="absolute w-[520px] h-[520px] rounded-full border border-[#00bb98]/20"></div>

//               {/* Circular Modules */}
//               {modules.map((module, index) => {
//                 const pos = getPosition(index);
//                 const isActive = activeModule === index;
//                 const isPopped = poppedModules.includes(index);
                
//                 // Calculate rotation to point towards center
//                 const rotationAngle = pos.angle + 180;
                
//                 return (
//                   <div
//                     key={index}
//                     className="absolute transition-all duration-500"
//                     style={{
//                       transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotationAngle}deg) scale(${isPopped ? 1.3 : 1})`,
//                       zIndex: isPopped ? 40 : 20,
//                     }}
//                   >
//                     {/* Connection Line to Center */}
//                     <div 
//                       className="absolute top-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-[#00bb98]/40 to-[#00bb98]/60"
//                       style={{
//                         height: '220px',
//                         opacity: isActive ? 1 : 0.3
//                       }}
//                     ></div>

//                     {/* Trapezoid Module Card - Pointing towards center */}
//                     <div className="relative" style={{ perspective: '1000px' }}>
//                       <div 
//                         className={`relative w-32 bg-gradient-to-br ${module.color} shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-end cursor-pointer group overflow-hidden border-4 border-white
//                           ${isPopped ? 'animate-popBounce' : ''}`}
//                         style={{
//                           height: '140px',
//                           clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
//                           borderRadius: '8px'
//                         }}
//                       >
                        
//                         {/* Shine Effect */}
//                         <div className={`absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent transition-all duration-700 ${isPopped ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}></div>
                        
//                         {/* Glow Effect when Active */}
//                         {isActive && (
//                           <div className="absolute -inset-2 bg-gradient-to-r from-[#00bb98] to-[#fbbf24] blur-lg opacity-60 animate-pulse" style={{ clipPath: 'polygon(23% -10%, 77% -10%, 105% 110%, -5% 110%)' }}></div>
//                         )}

//                         <div className="relative z-10 text-center pb-4" style={{ transform: `rotate(${-rotationAngle}deg)` }}>
//                           <div className={`text-4xl mb-2 transition-all duration-500 ${isPopped ? 'scale-125' : 'scale-100'}`}>
//                             {module.icon}
//                           </div>
//                           <p className="text-white font-bold text-xs px-2 leading-tight drop-shadow-lg">
//                             {module.name}
//                           </p>
//                         </div>

//                         {/* Pulse Ring when Popped */}
//                         {isPopped && (
//                           <div className="absolute inset-0 border-4 border-white animate-pingRing" style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' }}></div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Side Label with Dot */}
//                     <div 
//                       className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//                       style={{ transform: `rotate(${-rotationAngle}deg)` }}
//                     >
//                       <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-yellow-400 animate-pulse' : 'bg-[#00bb98]'} transition-all duration-300`}></div>
//                       <div className={`w-px h-6 ${isActive ? 'bg-yellow-400' : 'bg-[#00bb98]'} transition-all duration-300`}></div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Swipe For Details Button */}
//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20">
//                 <button className="relative px-12 py-5 bg-gradient-to-r from-[#00bb98] via-[#00a085] to-[#008f73] rounded-full text-yellow-400 font-extrabold text-xl shadow-2xl hover:shadow-[#00bb98]/50 transition-all duration-300 group overflow-hidden border-4 border-[#00bb98]">
//                   <span className="relative z-10 flex items-center gap-4">
//                     Swipe For Details
//                     <span className="text-3xl group-hover:translate-x-3 transition-transform duration-300">»»</span>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes popBounce {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.3); }
//         }

//         @keyframes pingRing {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
//         }

//         .animate-popBounce {
//           animation: popBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         .animate-pingRing {
//           animation: pingRing 0.8s cubic-bezier(0.4, 0, 0.6, 1);
//         }
//       `}</style>
//     </div>
//   );
// }




// "use client"
// import React, { useState, useEffect } from 'react';

// const modules = [
//   { name: "HireConnect", icon: "🤝", angle: 0 },
//   { name: "FYP Bridge", icon: "🌉", angle: 45 },
//   { name: "Idea Vault", icon: "💡", angle: 90 },
//   { name: "ProjectHub", icon: "🚀", angle: 135 },
//   { name: "CV Forge", icon: "📄", angle: 180 },
//   { name: "Talent Match", icon: "⭐", angle: 225 },
//   { name: "SkillBoost Pro", icon: "📈", angle: 270 },
//   { name: "LearnEdge", icon: "🎓", angle: 315 }
// ];

// export default function JobHeroSection() {
//   const [activeModule, setActiveModule] = useState(0);
//   const [hoveredModule, setHoveredModule] = useState<number | null>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule(prev => (prev + 1) % 8);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const getPosition = (index: number) => {
//     const angle = (modules[index].angle - 90) * (Math.PI / 180);
//     const radius = 280;
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//       angle: modules[index].angle
//     };
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden">
//       {/* Animated gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-[#00bb98]/5 to-white"></div>
      
//       {/* Floating circles background */}
//       <div className="absolute top-20 right-20 w-96 h-96 bg-[#00bb98]/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#00bb98]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

//       {/* Network dots */}
//       <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00bb98] rounded-full animate-ping"></div>
//       <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#00bb98] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
//       <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#00bb98] rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-[#00bb98] rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>

//       <div className="relative z-10 container mx-auto px-6 py-16 flex items-center min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-24 items-center w-full">
          
//           {/* Left Content */}
//           <div className="space-y-10">
//             <div className="space-y-8">
//               <div className="flex flex-col space-y-5">
//                 <h1 className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm">
//                   Hire Faster
//                 </h1>
//                 <h1 className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm" style={{ animationDelay: '0.2s' }}>
//                   Train Smarter
//                 </h1>
//                 <h1 className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm" style={{ animationDelay: '0.4s' }}>
//                   Grow Together
//                 </h1>
//               </div>
              
//               <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl animate-slideInLeft font-medium" style={{ animationDelay: '0.6s' }}>
//                 An integrated ecosystem connecting students, employers and educators for the future of talent
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-6 animate-slideInLeft" style={{ animationDelay: '0.8s' }}>
//               <button className="group relative px-12 py-6 bg-[#00bb98] rounded-full text-white font-bold text-xl shadow-2xl shadow-[#00bb98]/40 hover:shadow-[#00bb98]/60 hover:scale-110 transition-all duration-300 overflow-hidden">
//                 <span className="relative z-10 flex items-center gap-3">
//                   Explore Opportunities
//                   <span className="text-2xl group-hover:translate-x-3 transition-transform duration-300">→</span>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>
//               <button className="group px-12 py-6 bg-white border-4 border-[#00bb98] rounded-full text-[#00bb98] font-bold text-xl shadow-xl hover:bg-[#00bb98] hover:text-white hover:scale-110 transition-all duration-300 flex items-center gap-3">
//                 Hire Talent
//                 <span className="text-2xl group-hover:translate-x-3 transition-transform duration-300">→</span>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Circular Module Layout */}
//           <div className="relative flex items-center justify-center h-[700px]">
//             <div className="relative w-full h-full flex items-center justify-center">
              
//               {/* Rotating outer ring */}
//               <div className="absolute w-[600px] h-[600px] rounded-full border-4 border-[#00bb98]/20 animate-spin-slow"></div>
//               <div className="absolute w-[620px] h-[620px] rounded-full border-2 border-[#00bb98]/10 animate-spin-slower"></div>
              
//               {/* Center Circle - Domains Included */}
//               <div className="absolute z-40 w-64 h-64 rounded-full bg-gradient-to-br from-[#00bb98] via-[#00d4ae] to-[#00bb98] shadow-2xl shadow-[#00bb98]/50 flex items-center justify-center border-8 border-white animate-pulse-slow">
//                 <div className="absolute inset-0 rounded-full bg-[#00bb98] animate-ping opacity-20"></div>
//                 <div className="relative text-center">
//                   <div className="text-6xl mb-2">🎯</div>
//                   <h3 className="text-white font-black text-4xl mb-1 drop-shadow-lg">Domains</h3>
//                   <p className="text-white/90 font-bold text-2xl drop-shadow">Included</p>
//                 </div>
//               </div>

//               {/* Circular Modules with Trapezoid Shape */}
//               {modules.map((module, index) => {
//                 const pos = getPosition(index);
//                 const isActive = activeModule === index;
//                 const isHovered = hoveredModule === index;
//                 const rotationAngle = pos.angle + 180;
//                 const scale = isActive || isHovered ? 1.4 : 1;
                
//                 return (
//                   <div
//                     key={index}
//                     className="absolute transition-all duration-700"
//                     style={{
//                       transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotationAngle}deg) scale(${scale})`,
//                       zIndex: isActive || isHovered ? 50 : 30,
//                     }}
//                     onMouseEnter={() => setHoveredModule(index)}
//                     onMouseLeave={() => setHoveredModule(null)}
//                   >
//                     {/* Connection beam to center */}
//                     <div 
//                       className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 transition-all duration-700 ${
//                         isActive ? 'bg-gradient-to-b from-transparent via-[#00bb98] to-[#00bb98]' : 'bg-gradient-to-b from-transparent via-[#00bb98]/30 to-[#00bb98]/50'
//                       }`}
//                       style={{
//                         height: '280px',
//                         boxShadow: isActive ? '0 0 20px rgba(0, 187, 152, 0.6)' : 'none'
//                       }}
//                     ></div>

//                     {/* Trapezoid Module */}
//                     <div 
//                       className={`relative w-40 bg-gradient-to-b from-[#00bb98] to-[#00a085] shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden border-4 border-white group ${
//                         isActive ? 'shadow-[#00bb98]/60' : 'shadow-[#00bb98]/30'
//                       }`}
//                       style={{
//                         height: '160px',
//                         clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
//                       }}
//                     >
//                       {/* Shine effect */}
//                       <div className={`absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent transition-all duration-700 ${
//                         isActive || isHovered ? 'opacity-100' : 'opacity-0'
//                       }`}></div>
                      
//                       {/* Glow pulse */}
//                       {(isActive || isHovered) && (
//                         <>
//                           <div className="absolute -inset-4 bg-[#00bb98] blur-2xl opacity-50 animate-pulse" style={{ clipPath: 'polygon(18% -10%, 82% -10%, 110% 110%, -10% 110%)' }}></div>
//                           <div className="absolute inset-0 border-4 border-white/50 animate-pulse" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
//                         </>
//                       )}

//                       {/* Content */}
//                       <div className="relative h-full flex flex-col items-center justify-end pb-6" style={{ transform: `rotate(${-rotationAngle}deg)` }}>
//                         <div className={`text-5xl mb-3 transition-all duration-500 filter drop-shadow-xl ${
//                           isActive || isHovered ? 'scale-125' : 'scale-100'
//                         }`}>
//                           {module.icon}
//                         </div>
//                         <p className="text-white font-black text-sm px-3 leading-tight drop-shadow-lg text-center">
//                           {module.name}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Indicator dot */}
//                     <div 
//                       className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-12"
//                       style={{ transform: `rotate(${-rotationAngle}deg) translate(-50%, 48px)` }}
//                     >
//                       <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
//                         isActive ? 'bg-white animate-bounce shadow-lg shadow-[#00bb98]' : 'bg-[#00bb98]'
//                       }`}></div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Swipe Button */}
//               <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
//                 <button className="relative px-16 py-6 bg-gradient-to-r from-[#00bb98] via-[#00d4ae] to-[#00bb98] rounded-full text-white font-black text-2xl shadow-2xl shadow-[#00bb98]/50 hover:shadow-[#00bb98]/80 transition-all duration-300 group overflow-hidden border-4 border-white hover:scale-110">
//                   <span className="relative z-10 flex items-center gap-4 drop-shadow-lg">
//                     Swipe For Details
//                     <span className="text-3xl group-hover:translate-x-4 transition-transform duration-300">»»»</span>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-80px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes spin-slower {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(-360deg); }
//         }

//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 30s linear infinite;
//         }

//         .animate-spin-slower {
//           animation: spin-slower 50s linear infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         .animate-shimmer {
//           animation: shimmer 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// const modules = [
//   { name: "HireConnect", icon: "🤝", angle: 0 },
//   { name: "FYP Bridge", icon: "🌉", angle: 45 },
//   { name: "Idea Vault", icon: "💡", angle: 90 },
//   { name: "ProjectHub", icon: "🚀", angle: 135 },
//   { name: "CV Forge", icon: "📄", angle: 180 },
//   { name: "Talent Match", icon: "⭐", angle: 225 },
//   { name: "SkillBoost Pro", icon: "📈", angle: 270 },
//   { name: "LearnEdge", icon: "🎓", angle: 315 },
// ];
// export default function JobHeroSection() {
//   const [activeModule, setActiveModule] = useState(0);
//   const [hoveredModule, setHoveredModule] = useState<number | null>(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule((prev) => (prev + 1) % 8);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   const getPosition = (index: number) => {
//     const angle = (modules[index].angle - 90) * (Math.PI / 180);
//     const radius = 180; // smaller circle
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//       angle: modules[index].angle,
//     };
//   };

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white via-[#00bb98]/5 to-white"></div>

//       {/* Floating background circles */}
//       <div className="absolute top-20 right-20 w-64 h-64 bg-[#00bb98]/10 rounded-full blur-3xl animate-pulse"></div>
//       <div
//         className="absolute bottom-20 left-20 w-56 h-56 bg-[#00bb98]/10 rounded-full blur-3xl animate-pulse"
//         style={{ animationDelay: "1s" }}
//       ></div>

//       {/* Decorative network dots */}
//       <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00bb98] rounded-full animate-ping"></div>
//       <div
//         className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#00bb98] rounded-full animate-ping"
//         style={{ animationDelay: "0.5s" }}
//       ></div>

//       <div className="relative z-10 container mx-auto px-6 py-16 flex items-center min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
//           {/* LEFT CONTENT */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <h1 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm">
//                 Hire Faster
//               </h1>
//               <h1
//                 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm"
//                 style={{ animationDelay: "0.2s" }}
//               >
//                 Train Smarter
//               </h1>
//               <h1
//                 className="text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00bb98] to-[#00d4ae] leading-tight animate-slideInLeft drop-shadow-sm"
//                 style={{ animationDelay: "0.4s" }}
//               >
//                 Grow Together
//               </h1>
//               <p
//                 className="text-lg text-gray-700 leading-relaxed max-w-xl animate-slideInLeft font-medium"
//                 style={{ animationDelay: "0.6s" }}
//               >
//                 An integrated ecosystem connecting students, employers and educators for the future of talent.
//               </p>
//             </div>

//             <div
//               className="flex flex-wrap gap-4 animate-slideInLeft"
//               style={{ animationDelay: "0.8s" }}
//             >
//               <button className="group relative px-8 py-4 bg-[#00bb98] rounded-full text-white font-bold text-lg shadow-2xl shadow-[#00bb98]/40 hover:scale-110 transition-all duration-300 overflow-hidden">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Explore Opportunities
//                   <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
//                     →
//                   </span>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </button>

//               <button className="group px-8 py-4 bg-white border-2 border-[#00bb98] rounded-full text-[#00bb98] font-bold text-lg shadow-xl hover:bg-[#00bb98] hover:text-white hover:scale-110 transition-all duration-300 flex items-center gap-2">
//                 Hire Talent
//                 <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
//                   →
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* RIGHT SIDE (CIRCULAR MODULES) */}
//           <div className="relative flex items-center justify-center h-[450px]">
//             <div className="relative w-full h-full flex items-center justify-center">
//               {/* Outer Rings */}
//               <div className="absolute w-[400px] h-[400px] rounded-full border-4 border-[#00bb98]/20 animate-spin-slow"></div>
//               <div className="absolute w-[420px] h-[420px] rounded-full border-2 border-[#00bb98]/10 animate-spin-slower"></div>

//               {/* Center Circle */}
//               <div className="absolute z-40 w-44 h-44 rounded-full bg-gradient-to-br from-[#00bb98] via-[#00d4ae] to-[#00bb98] shadow-2xl shadow-[#00bb98]/50 flex items-center justify-center border-4 border-white animate-pulse-slow">
//                 <div className="relative text-center">
//                   <div className="text-4xl mb-1">🎯</div>
//                   <h3 className="text-white font-black text-2xl mb-1">
//                     Domains
//                   </h3>
//                   <p className="text-white/90 font-semibold text-lg">
//                     Included
//                   </p>
//                 </div>
//               </div>

//               {/* Rotating modules */}
//               {modules.map((module, index) => {
//                 const pos = getPosition(index);
//                 const isActive = activeModule === index;
//                 const isHovered = hoveredModule === index;
//                 const rotationAngle = pos.angle + 180;
//                 const scale = isActive || isHovered ? 1.2 : 1;

//                 return (
//                   <div
//                     key={index}
//                     className="absolute transition-all duration-700"
//                     style={{
//                       transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotationAngle}deg) scale(${scale})`,
//                       zIndex: isActive || isHovered ? 50 : 30,
//                     }}
//                     onMouseEnter={() => setHoveredModule(index)}
//                     onMouseLeave={() => setHoveredModule(null)}
//                   >
//                     {/* Beam */}
//                     <div
//                       className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 transition-all duration-700 ${
//                         isActive
//                           ? "bg-gradient-to-b from-transparent via-[#00bb98] to-[#00bb98]"
//                           : "bg-gradient-to-b from-transparent via-[#00bb98]/30 to-[#00bb98]/50"
//                       }`}
//                       style={{ height: "180px" }}
//                     ></div>

//                     {/* Module */}
//                     <div
//                       className={`relative w-28 bg-gradient-to-b from-[#00bb98] to-[#009b80] shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden border-2 border-white group ${
//                         isActive ? "shadow-[#00bb98]/60" : "shadow-[#00bb98]/30"
//                       }`}
//                       style={{
//                         height: "120px",
//                         clipPath:
//                           "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
//                       }}
//                     >
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent transition-all duration-700 ${
//                           isActive || isHovered ? "opacity-100" : "opacity-0"
//                         }`}
//                       ></div>

//                       <div
//                         className="relative h-full flex flex-col items-center justify-end pb-4"
//                         style={{
//                           transform: `rotate(${-rotationAngle}deg)`,
//                         }}
//                       >
//                         <div
//                           className={`text-3xl mb-2 transition-all duration-500 ${
//                             isActive || isHovered ? "scale-125" : "scale-100"
//                           }`}
//                         >
//                           {module.icon}
//                         </div>
//                         <p className="text-white font-bold text-xs text-center leading-tight">
//                           {module.name}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-80px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes spin-slower {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(-360deg);
//           }
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 30s linear infinite;
//         }

//         .animate-spin-slower {
//           animation: spin-slower 50s linear infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </div>
//   );
// }





// "use client";
// import React, { useState, useEffect } from "react";

// const modules = [
//   { name: "Home Inventions", color: "from-[#00bb98] to-[#00bb98]", icon: "🏠", angle: 45 },
//   { name: "Application Development", color: "from-[#00bb98] to-[#00bb98]", icon: "💻", angle: 90 },
//   { name: "Electronics", color: "from-[#00bb98] to-[#00bb98]", icon: "⚡", angle: 135 },
//   { name: "AI & Machine Learning", color: "from-[#00bb98] to-[#00bb98]", icon: "🤖", angle: 180 },
//   { name: "HireConnect", color: "from-[#00bb98] to-[#00bb98]", icon: "🤝", angle: 225 },
//   { name: "FYP Bridge", color: "from-[#00bb98] to-[#00bb98]", icon: "🌉", angle: 270 },
//   { name: "Idea Vault", color: "from-[#00bb98] to-[#00bb98]", icon: "💡", angle: 315 },
//   { name: "ProjectHub", color: "from-[#00bb98] to-[#00bb98]", icon: "🚀", angle: 0 },
// ];

// export default function HeroSection() {
//   const [activeModule, setActiveModule] = useState(0);
//   const [poppedModules, setPoppedModules] = useState<number[]>([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModule((prev) => (prev + 1) % 8);
//       setPoppedModules((prev) => [...prev, activeModule]);
//       setTimeout(() => {
//         setPoppedModules((prev) => prev.filter((m) => m !== activeModule));
//       }, 800);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, [activeModule]);

//   const getPosition = (index: number) => {
//     const angle = (modules[index].angle - 90) * (Math.PI / 180);
//     const radius = 220;
//     return {
//       x: Math.cos(angle) * radius,
//       y: Math.sin(angle) * radius,
//     };
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden">
//       {/* Subtle Hex Background */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
//               <polygon
//                 points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
//                 fill="none"
//                 stroke="#00bb98"
//                 strokeWidth="1.2"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#hexagons)" />
//         </svg>
//       </div>

//       <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
//         <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <div className="flex flex-col space-y-4">
//                 <h2 className="text-6xl lg:text-7xl font-extrabold text-[#00bb98] leading-tight animate-slideInLeft">
//                   Hire Faster
//                 </h2>
//                 <h2
//                   className="text-6xl lg:text-7xl font-extrabold text-[#00bb98] leading-tight animate-slideInLeft"
//                   style={{ animationDelay: "0.15s" }}
//                 >
//                   Train Smarter
//                 </h2>
//                 <h2
//                   className="text-6xl lg:text-7xl font-extrabold text-[#00bb98] leading-tight animate-slideInLeft"
//                   style={{ animationDelay: "0.3s" }}
//                 >
//                   Grow Together
//                 </h2>
//               </div>

//               <p
//                 className="text-xl text-[#00bb98] leading-relaxed max-w-xl animate-slideInLeft font-medium"
//                 style={{ animationDelay: "0.45s" }}
//               >
//                 An integrated ecosystem connecting students, employers and educators for the
//                 future of talent.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4 animate-slideInLeft" style={{ animationDelay: "0.6s" }}>
//               <button className="group px-10 py-5 bg-[#00bb98] rounded-full text-black font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
//                 Explore Opportunities
//                 <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
//                   →
//                 </span>
//               </button>
//               <button className="group px-10 py-5 bg-black border-2 border-[#00bb98] rounded-full text-[#00bb98] font-bold text-lg shadow-lg hover:bg-[#00bb98] hover:text-black hover:scale-105 transition-all duration-300 flex items-center gap-3">
//                 Hire Talent
//                 <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
//                   →
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Circular Modules */}
//           <div className="relative flex items-center justify-center h-[650px]">
//             <div className="relative w-full h-full flex items-center justify-center">
//               {/* Center Circle */}
//               <div className="absolute z-30 w-56 h-56 rounded-full bg-[#00bb98] shadow-2xl flex items-center justify-center border-4 border-black">
//                 <div className="text-center">
//                   <h3 className="text-black font-extrabold text-3xl mb-1">Domains</h3>
//                   <p className="text-black font-bold text-2xl opacity-80">Included</p>
//                 </div>
//               </div>

//               {/* Orbital Rings */}
//               <div className="absolute w-[500px] h-[500px] rounded-full border border-[#00bb98]/40"></div>
//               <div className="absolute w-[520px] h-[520px] rounded-full border border-[#00bb98]/25"></div>

//               {/* Circular Modules */}
//               {modules.map((module, index) => {
//                 const pos = getPosition(index);
//                 const isActive = activeModule === index;
//                 const isPopped = poppedModules.includes(index);

//                 return (
//                   <div
//                     key={index}
//                     className="absolute transition-all duration-500"
//                     style={{
//                       transform: `translate(${pos.x}px, ${pos.y}px) scale(${isPopped ? 1.3 : 1})`,
//                       zIndex: isPopped ? 40 : 20,
//                     }}
//                   >
//                     <div
//                       className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-r from-[#00bb98]/60 to-transparent"
//                       style={{
//                         height: "220px",
//                         transformOrigin: "0 0",
//                         transform: `rotate(${module.angle + 90}deg)`,
//                         opacity: isActive ? 1 : 0.3,
//                       }}
//                     ></div>

//                     <div
//                       className={`relative w-36 h-36 rounded-3xl bg-gradient-to-br ${module.color} shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center cursor-pointer group overflow-hidden border-4 border-black
//                       ${isPopped ? "animate-popBounce" : ""}`}
//                     >
//                       <div className="relative z-10 text-center">
//                         <div
//                           className={`text-5xl mb-2 transition-all duration-500 ${
//                             isPopped ? "scale-125" : "scale-100"
//                           }`}
//                         >
//                           {module.icon}
//                         </div>
//                         <p className="text-black font-bold text-xs px-2 leading-tight drop-shadow-lg">
//                           {module.name}
//                         </p>
//                       </div>
//                       {isPopped && (
//                         <div className="absolute inset-0 rounded-3xl border-4 border-black animate-pingRing"></div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20">
//                 <button className="relative px-12 py-5 bg-[#00bb98] rounded-full text-black font-extrabold text-xl shadow-2xl hover:shadow-lg transition-all duration-300 group overflow-hidden border-4 border-black">
//                   <span className="relative z-10 flex items-center gap-4">
//                     Swipe For Details
//                     <span className="text-3xl group-hover:translate-x-3 transition-transform duration-300">
//                       »»
//                     </span>
//                   </span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-60px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         @keyframes popBounce {
//           0%,
//           100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.3);
//           }
//         }
//         @keyframes pingRing {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: scale(1.5);
//             opacity: 0;
//           }
//         }
//         .animate-slideInLeft {
//           animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
//         }
//         .animate-popBounce {
//           animation: popBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }
//         .animate-pingRing {
//           animation: pingRing 0.8s cubic-bezier(0.4, 0, 0.6, 1);
//         }
//       `}</style>
//     </div>
//   );
// }