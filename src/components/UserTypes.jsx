"use client"
import React from 'react';
import { Check, Briefcase, GraduationCap, Laptop, Sparkles } from 'lucide-react';

// interface UserType {
//   id: string;
//   title: string;
//   avatar: React.ReactNode;
//   bgColor: string;
//   features: string[];
//   position: 'left' | 'right' | 'center';
// }

const userTypes = [
  {
    id: 'students',
    title: 'Students',
    avatar: <GraduationCap className="w-16 h-16 text-white" />,
    bgColor: 'from-green-600 to-emerald-600',
    position: 'left',
    features: [
      'Discover internships and jobs',
      'Collaborate on final year projects',
      'Enhance skills with Courses'
    ]
  },
  {
    id: 'employers',
    title: 'Employers',
    avatar: <Briefcase className="w-16 h-16 text-white" />,
    bgColor: 'from-blue-600 to-blue-700',
    position: 'right',
    features: [
      'Find and hire top talent',
      'Sponsor innovative Projects',
      'Offer Corporate training'
    ]
  },
  {
    id: 'freelancers',
    title: 'Freelancers',
    avatar: <Laptop className="w-16 h-16 text-white" />,
    bgColor: 'from-yellow-500 to-amber-500',
    position: 'center',
    features: [
      'Find and hire top talent',
      'Sponsor innovative Projects',
      'Offer Corporate training'
    ]
  }
];

const UserTypesSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-semibold text-slate-700">Our Community</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-blue-800 to-emerald-800">
            Who We Serve
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Connecting students, employers, and freelancers in one powerful platform
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Students Card - Top Left */}
          <div className="group relative animate-slide-in-left">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-emerald-300 overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${userTypes[0].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {userTypes[0].avatar}
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 group-hover:text-emerald-700 transition-colors duration-300">
                    {userTypes[0].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[0].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both` 
                        }}
                      >
                        <div className="relative mt-0.5">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-sm opacity-50"></div>
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300 shadow-lg">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="text-slate-700 text-base leading-relaxed group-hover/item:text-emerald-700 group-hover/item:translate-x-1 transition-all duration-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Employers Card - Top Right */}
          <div className="group relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-blue-300 overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${userTypes[1].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {userTypes[1].avatar}
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 group-hover:text-blue-700 transition-colors duration-300">
                    {userTypes[1].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[1].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both` 
                        }}
                      >
                        <div className="relative mt-0.5">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full blur-sm opacity-50"></div>
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300 shadow-lg">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="text-slate-700 text-base leading-relaxed group-hover/item:text-blue-700 group-hover/item:translate-x-1 transition-all duration-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Freelancers Card - Bottom Center */}
        <div className="max-w-3xl mx-auto animate-slide-in-up">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-transparent hover:border-yellow-400 overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-amber-500/10 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${userTypes[2].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {userTypes[2].avatar}
                    <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6 group-hover:text-amber-600 transition-colors duration-300">
                    {userTypes[2].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[2].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both` 
                        }}
                      >
                        <div className="relative mt-0.5">
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-sm opacity-50"></div>
                          <div className="relative w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-300 shadow-lg">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="text-slate-700 text-base leading-relaxed group-hover/item:text-amber-600 group-hover/item:translate-x-1 transition-all duration-300 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='flex justify-center mt-16 animate-fade-in-delayed'>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <button className="relative px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base rounded-full hover:scale-110 transition-all duration-500 ease-out overflow-hidden group shadow-xl hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.05);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 30px) scale(1.05);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, 20px) scale(1.08);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fadeIn 1.2s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-slide-in-up {
          animation: slideInUp 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserTypesSection;