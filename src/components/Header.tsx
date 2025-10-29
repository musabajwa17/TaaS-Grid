"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    const token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    setIsLoggedIn(!!token);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-700 ease-out ${
          isScrolled ? "py-3 px-8 md:px-8" : "py-0 bg-gradient-to-br from-[#f0f9ff] via-[#f4f8fd] to-[#e0f2fe]"
        }`}
      >
        <div
          className={`transition-all duration-700 ease-out ${
            isScrolled ? "backdrop-blur-2xl rounded-3xl shadow-lg shadow-emerald-500/5" : ""
          }`}
          style={{
            background: isScrolled 
              ? "linear-gradient(135deg, rgba(240,249,255,0.45) 0%, rgba(224,242,254,0.35) 100%)"
              : "transparent",
            border: isScrolled ? "1px solid rgba(167,243,208,0.2)" : "none",
            boxShadow: isScrolled
              ? "0 8px 32px rgba(16,185,129,0.08), 0 0 0 1px rgba(167,243,208,0.1)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          <div className="flex items-center justify-between px-8 py-2">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div
                className={`relative transition-all duration-700 ms-10 ease-out ${
                  isScrolled ? "scale-90" : "scale-100"
                }`}
              >
                <Image
                  src="/logo9.png"
                  alt="Logo"
                  width={200}
                  height={50}
                  className={`relative object-contain transition-all duration-700 group-hover:scale-110 drop-shadow-md ${
                    isScrolled ? "h-12" : "h-14"
                  }`}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2.5 font-bold text-base transition-all duration-500 group ${
                    pathname === item.href
                      ? "text-emerald-600"
                      : "text-slate-700 hover:text-emerald-700"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:scale-105 inline-block">
                    {item.name}
                  </span>

                  {/* Animated Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl scale-0 group-hover:scale-100 transition-all duration-500 ease-out opacity-0 group-hover:opacity-15 blur-sm"></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-xl"></div>

                  {/* Active / Hover Underline with Gradient */}
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-500 ease-out ${
                      pathname === item.href
                        ? "w-3/4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 shadow-lg shadow-emerald-500/50"
                        : "w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 group-hover:w-3/4 group-hover:shadow-lg group-hover:shadow-emerald-500/50"
                    }`}
                  ></div>
                </Link>
              ))}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center gap-5">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="relative px-10 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-black text-base rounded-full hover:scale-105 transition-all duration-500 ease-out overflow-hidden group shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Dashboard
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="relative px-10 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-black text-base rounded-full hover:scale-105 transition-all duration-500 ease-out overflow-hidden group shadow-xl shadow-emerald-400/10 hover:shadow-2xl hover:shadow-emerald-500/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Login
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                      →
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center p-3 w-12 h-12 text-slate-700 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-teal-500/10 transition-all duration-500 border border-emerald-200/50 backdrop-blur-md shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <svg
                className={`w-6 h-6 transition-all duration-500 ${
                  isMobileMenuOpen ? "rotate-90 text-emerald-600" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out rounded-2xl ${
              isMobileMenuOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(240,253,250,0.95) 0%, rgba(236,254,255,0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(167,243,208,0.3)",
            }}
          >
            <div className="px-6 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 font-semibold rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? "text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-md shadow-emerald-500/10"
                      : "text-slate-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-700 hover:shadow-md hover:shadow-emerald-500/10"
                  }`}
                  style={{
                    animation: isMobileMenuOpen
                      ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                      : "none",
                  }}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                <Link
                  href="/signin"
                  className="block px-4 py-3 text-center text-slate-700 font-semibold rounded-lg border-2 border-emerald-500 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;