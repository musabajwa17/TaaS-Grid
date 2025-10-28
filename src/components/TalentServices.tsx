'use client'

import { useState, useEffect, MouseEvent } from 'react'
import {
  Users,
  Briefcase,
  GraduationCap,
  FolderGit2,
  FileText,
  Rocket,
  Sparkles,
  ArrowRight,
  Search,
  ClipboardCheck,
  Network,
  Lightbulb,
  Brain,
  TrendingUp,
  CheckCircle2,
  Settings
} from 'lucide-react'
import Image from 'next/image';

// ---------- Type Definitions ----------
interface Feature {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  color: string;
}

interface TabContent {
  title: string;
  description: string;
  image: string;
  gradient: string;
  features: Feature[];
}

interface ColorClasses {
  bg: string;
  text: string;
  border: string;
  hover: string;
}

// ---------- Main Component ----------
const TalentServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const [, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState<boolean>(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | any) => {
      if (isHovering) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  // ---------- Tab Content (5 tabs: 0..4) ----------
  const tabContent: Record<number, TabContent> = {
    0: {
      title: "Hire Connect",
      description: "AI-driven employer-candidate matching that surfaces relevant talent based on skills, culture-fit, and role requirements.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      gradient: "from-emerald-500/20 to-teal-500/20",
      features: [
        { icon: Users, text: "AI Candidate Matching", color: "emerald" },
        { icon: Search, text: "Smart Talent Search", color: "teal" },
        { icon: ClipboardCheck, text: "Interview Automation", color: "cyan" },
        { icon: Briefcase, text: "Verified Employers", color: "green" }
      ]
    },
    1: {
      title: "FYP Bridge",
      description: "Bridge final-year projects with companies: mentorship, real datasets, and pathways to internships and hiring.",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
      gradient: "from-blue-500/20 to-indigo-500/20",
      features: [
        { icon: GraduationCap, text: "Industry Mentors", color: "blue" },
        { icon: Network, text: "Company Projects", color: "indigo" },
        { icon: Lightbulb, text: "Research & Innovation", color: "violet" },
        { icon: TrendingUp, text: "Placement Pathways", color: "purple" }
      ]
    },
    2: {
      title: "ProjectHub",
      description: "A collaboration hub for short-term projects, freelance teams, and company sprints — manage, deliver and get rated.",
      image: "https://media.istockphoto.com/id/1434212178/photo/middle-eastern-lady-using-laptop-working-online-sitting-in-office.jpg?b=1&s=612x612&w=0&k=20&c=-a7kN9ndCDdQEvklOFxJbmcvWOJ9sQQ8ZxvE64AsDEE=",
      gradient: "from-amber-500/20 to-orange-500/20",
      features: [
        { icon: FolderGit2, text: "Collaborative Workspaces", color: "amber" },
        { icon: Rocket, text: "Rapid Delivery", color: "orange" },
        { icon: Users, text: "Team Matchmaking", color: "yellow" },
        { icon: Settings, text: "Project Analytics", color: "lime" }
      ]
    },
    3: {
      title: "CV Forge",
      description: "AI-powered resume & portfolio creation that optimizes content for recruiters and Applicant Tracking Systems (ATS).",
      image: "https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg",
      gradient: "from-sky-500/20 to-blue-500/20",
      features: [
        { icon: FileText, text: "AI Resume Builder", color: "sky" },
        { icon: Brain, text: "Skill Gap Analysis", color: "blue" },
        { icon: CheckCircle2, text: "ATS Optimization", color: "cyan" },
        { icon: Rocket, text: "One-click Export", color: "teal" }
      ]
    },
    4: {
      title: "SkillBoast Pro",
      description: "Upskilling platform with curated learning paths, hands-on labs, assessments and verifiable certificates.",
      image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
      gradient: "from-rose-500/20 to-pink-500/20",
      features: [
        { icon: Lightbulb, text: "Skill Assessments", color: "rose" },
        { icon: Brain, text: "Curated Pathways", color: "pink" },
        { icon: TrendingUp, text: "Certifications", color: "fuchsia" },
        { icon: FileText, text: "Badge & Portfolio", color: "purple" }
      ]
    }
  }

  const tabs = [
    { icon: Users, title: "Hire Connect", shortTitle: "Hire Connect" },
    { icon: GraduationCap, title: "FYP Bridge", shortTitle: "FYP Bridge" },
    { icon: FolderGit2, title: "ProjectHub", shortTitle: "ProjectHub" },
    { icon: FileText, title: "CV Forge", shortTitle: "CV Forge" },
    { icon: Rocket, title: "SkillBoast Pro", shortTitle: "SkillBoast Pro" }
  ]

  const currentContent = tabContent[activeTab]

  // ---------- Helper Functions ----------
  const getFeatureDescription = (featureText: string): string => {
    const descriptions: Record<string, string> = {
      "AI Candidate Matching": "Advanced AI pairs open roles with candidates based on skills, experience, and culture-fit signals.",
      "Smart Talent Search": "Filter professionals by verified skills, past projects, and soft-skill indicators quickly.",
      "Interview Automation": "Schedule, score, and track interviews with integrated calendar and feedback pipelines.",
      "Verified Employers": "Organizations and job postings go through verification for trust and transparency.",

      "Industry Mentors": "Students get paired with domain experts who guide research and implementation.",
      "Company Projects": "Real-world problems provided by companies help students build industry-ready solutions.",
      "Research & Innovation": "Teams access datasets and tools to prototype and publish meaningful work.",
      "Placement Pathways": "High-achieving students are showcased directly to hiring partners.",

      "Collaborative Workspaces": "Realtime document sharing, task boards, and versioned artifacts for smooth delivery.",
      "Rapid Delivery": "Kickstart sprints with templates, milestones and built-in time tracking.",
      "Team Matchmaking": "Find complementary freelancers & micro-teams based on project needs.",
      "Project Analytics": "Monitor velocity, quality, and delivery KPIs to improve outcomes.",

      "AI Resume Builder": "Generate role-focused resumes with suggested phrasing and achievement statements.",
      "Skill Gap Analysis": "AI analyzes your profile and recommends the most impactful skills to learn.",
      "ATS Optimization": "Resumes formatted and keyword-optimized for higher ATS visibility.",
      "One-click Export": "Export in PDF/Word or publish as a web portfolio in a single click.",

      "Skill Assessments": "Timed quizzes and practical labs validate capability with scorecards.",
      "Curated Pathways": "Learning tracks built by industry practitioners for highest ROI.",
      "Certifications": "Earn verifiable certificates you can share on profiles and LinkedIn.",
      "Badge & Portfolio": "Showcase validated badges and project work to stand out to recruiters."
    }
    return descriptions[featureText] || "Comprehensive talent solution built to accelerate hiring, growth and career pathways."
  }

  const getColorClasses = (color: string): ColorClasses => {
    const colors: Record<string, ColorClasses> = {
      emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', border: 'border-emerald-200', hover: 'hover:bg-emerald-500/20' },
      teal: { bg: 'bg-teal-500/10', text: 'text-teal-600', border: 'border-teal-200', hover: 'hover:bg-teal-500/20' },
      cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-600', border: 'border-cyan-200', hover: 'hover:bg-cyan-500/20' },
      green: { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-200', hover: 'hover:bg-green-500/20' },
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-500/20' },
      indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-600', border: 'border-indigo-200', hover: 'hover:bg-indigo-500/20' },
      violet: { bg: 'bg-violet-500/10', text: 'text-violet-600', border: 'border-violet-200', hover: 'hover:bg-violet-500/20' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-500/20' },
      amber: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200', hover: 'hover:bg-amber-500/20' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200', hover: 'hover:bg-orange-500/20' },
      yellow: { bg: 'bg-yellow-500/10', text: 'text-yellow-600', border: 'border-yellow-200', hover: 'hover:bg-yellow-500/20' },
      lime: { bg: 'bg-lime-500/10', text: 'text-lime-600', border: 'border-lime-200', hover: 'hover:bg-lime-500/20' },
      sky: { bg: 'bg-sky-500/10', text: 'text-sky-600', border: 'border-sky-200', hover: 'hover:bg-sky-500/20' },
      rose: { bg: 'bg-rose-500/10', text: 'text-rose-600', border: 'border-rose-200', hover: 'hover:bg-rose-500/20' },
      pink: { bg: 'bg-pink-500/10', text: 'text-pink-600', border: 'border-pink-200', hover: 'hover:bg-pink-500/20' },
      fuchsia: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-600', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-500/20' }
    }
    return colors[color] || colors.emerald
  }

  // ---------- JSX ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400 to-cyan-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6 animate-bounce">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-800">Next-Gen Talent as a Service</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Empower Teams & Careers with <br />TaasGrid Talent Platform
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Want to streamline hiring, projects, and upskilling? 
            <span className="font-semibold text-green-600"> TaasGrid</span> brings talent, projects, and growth together.
          </p>

          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modern Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-2 border border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {tabs.map((tab, index) => {
              const IconComponent = tab.icon
              const isActive = activeTab === index
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative p-4 rounded-2xl transition-all duration-500 group ${
                    isActive 
                      ? 'bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-lg scale-105' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 shadow-lg' 
                        : 'bg-white group-hover:bg-green-100'
                    }`}>
                      <IconComponent className={`w-6 h-6 transition-colors ${
                        isActive ? 'text-white' : 'text-green-600'
                      }`} />
                    </div>
                    <span className="text-sm font-semibold text-center leading-tight">
                      {tab.shortTitle}
                    </span>
                  </div>
                  
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 blur-xl -z-10 animate-pulse"></div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-33xl font-bold text-slate-900 leading-tight">
                {currentContent.title}
              </h2>
              
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentContent.description}
              </p>
            </div>
            
            {/* Features List */}
            <div className="space-y-3">
              {currentContent.features.map((feature, index) => {
                const IconComponent = feature.icon
                const colorClasses = getColorClasses(feature.color)
                const isOpen = openDropdown === index
                
                return (
                  <div 
                    key={index}
                    className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? `${colorClasses.border} shadow-xl scale-102` 
                        : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : index)}
                      className={`w-full flex items-center justify-between p-5 transition-all duration-300 ${
                        isOpen ? colorClasses.hover : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? `${colorClasses.bg} scale-110` 
                            : 'bg-slate-100'
                        }`}>
                          <IconComponent className={`w-6 h-6 transition-colors ${
                            isOpen ? colorClasses.text : 'text-slate-600'
                          }`} />
                        </div>
                        <span className="text-lg font-bold text-slate-900">
                          {feature.text}
                        </span>
                      </div>
                      
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen 
                          ? `${colorClasses.bg} rotate-180` 
                          : 'bg-slate-100'
                      }`}>
                        <span className={`text-lg font-bold ${
                          isOpen ? colorClasses.text : 'text-slate-600'
                        }`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className={`px-5 pb-5 ${colorClasses.bg}`}>
                        <div className="pl-16 pr-4">
                          <p className="text-slate-700 leading-relaxed">
                            {getFeatureDescription(feature.text)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="sticky top-8">
              <div className="relative group">
                {/* Animated gradient background */}
                <div className={`absolute -inset-4 bg-gradient-to-r ${currentContent.gradient} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Main image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <Image
  src={currentContent.image}
  alt={currentContent.title}
  width={1000} // approximate width, adjust as needed
  height={500} // matches h-[500px]
  className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
/>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Stats overlay (updated for TaaS) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">95%</div>
                          <div className="text-xs text-slate-600">Placement Success</div>
                        </div>
                        <div className="text-center border-x border-slate-200">
                          <div className="text-2xl font-bold text-blue-600">50+</div>
                          <div className="text-xs text-slate-600">Hiring Partners</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">10k+</div>
                          <div className="text-xs text-slate-600">Active Users</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce" style={{animationDuration: '3s'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-slate-700">Live Matches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Workforce?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals and employers redefining how talent, projects, and career growth connect.
            </p>
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Explore TaasGrid
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalentServices
