"use client"
import React from 'react';
import { Check, Briefcase, GraduationCap, Laptop } from 'lucide-react';

interface UserType {
  id: string;
  title: string;
  avatar: string;
  bgColor: string;
  features: string[];
  position: 'left' | 'right' | 'center';
}

const userTypes: UserType[] = [
  {
    id: 'students',
    title: 'Students',
    avatar: '🎓',
    bgColor: 'from-orange-200 to-orange-100',
    position: 'left',
    features: [
      'Discover internships and jobs',
      'Collaborate on final year projects',
      'Enhance skills with Courses',
      'Build a professional resume'
    ]
  },
  {
    id: 'employers',
    title: 'Employers',
    avatar: '💼',
    bgColor: 'from-rose-200 to-rose-100',
    position: 'right',
    features: [
      'Find and hire top talent',
      'Sponsor innovative Projects',
      'Offer Corporate training',
      'Streamline your hiring process'
    ]
  },
  {
    id: 'freelancers',
    title: 'Freelancers',
    avatar: '💻',
    bgColor: 'from-amber-200 to-amber-100',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
            Who We Serve
          </h1>
          <p className="text-xl text-slate-600">
            Connecting students, employers, and freelancers in one powerful platform
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Students Card - Top Left */}
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-emerald-300">
              <div className="flex items-start gap-8">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${userTypes[0].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-7xl">{userTypes[0].avatar}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    {userTypes[0].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[0].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` 
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-lg group-hover/item:text-emerald-600 transition-colors duration-300">
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
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-blue-300">
              <div className="flex items-start gap-8">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${userTypes[1].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-7xl">{userTypes[1].avatar}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    {userTypes[1].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[1].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` 
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-lg group-hover/item:text-blue-600 transition-colors duration-300">
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
        <div className="max-w-2xl mx-auto">
          <div className="group relative">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-purple-300">
              <div className="flex items-start gap-8">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${userTypes[2].bgColor} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-7xl">{userTypes[2].avatar}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                    <Laptop className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4">
                  <h2 className="text-3xl font-bold text-slate-800 mb-6">
                    {userTypes[2].title}
                  </h2>
                  <div className="space-y-3">
                    {userTypes[2].features.map((feature, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 group/item"
                        style={{ 
                          animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both` 
                        }}
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-lg group-hover/item:text-purple-600 transition-colors duration-300">
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
        <div className="text-center mt-16">
          <button className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
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
      `}</style>
    </div>
  );
};

export default UserTypesSection;