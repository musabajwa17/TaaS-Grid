"use client";

import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-700 ease-out ${
          isScrolled ? "py-3 px-8 md:px-8" : "py-0 bg-[#f4f8fd]"
        }`}
      >
        <div
          className={`transition-all duration-700 ease-out ${
            isScrolled ? "backdrop-blur-2xl rounded-3xl" : ""
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgba(244,248,253,0.45) 0%, rgba(244,248,253,0.35) 100%)",
            border: isScrolled ? "1px solid rgba(244,248,253,0.3)" : "none",
            boxShadow: isScrolled
              ? "0 4px 30px rgba(0, 0, 0, 0.05)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          <div className="flex items-center justify-between px-8 py-5">
            {/* Logo */}
            <a href="/" className="flex items-center group">
              <div
                className={`relative transition-all duration-700 ease-out ${
                  isScrolled ? "scale-90" : "scale-100"
                }`}
              >
                <img
                  src="/logo2.png"
                  alt="Logo"
                  className={`relative h-14 w-auto object-contain transition-all duration-700 group-hover:scale-110 ${
                    isScrolled ? "h-12" : "h-14"
                  }`}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {["Home", "Jobs", "Services", "Contact", "About"].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="relative px-6 py-2.5 text-gray-700 font-bold text-sm hover:text-[#00bb98] transition-all duration-500 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00bb98]/10 to-[#00d4ae]/10 rounded-xl scale-0 group-hover:scale-100 transition-all duration-500 ease-out"></div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] rounded-full group-hover:w-3/4 transition-all duration-500 ease-out"></div>
                  </a>
                )
              )}
            </div>

            {/* Right Side Buttons */}
            <div className="hidden md:flex items-center gap-5">
              <a
                href="#"
                className="relative text-gray-700 font-bold text-sm hover:text-[#00bb98] transition-all duration-500 group"
              >
                <span className="relative">Sign In</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] group-hover:w-full transition-all duration-500 ease-out"></div>
              </a>
              <button
                type="button"
                className="relative px-10 py-3.5 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white font-black text-sm rounded-full hover:scale-110 transition-all duration-500 ease-out overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Build Career
                  <span className="group-hover:translate-x-1 transition-transform duration-500">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden inline-flex items-center justify-center p-3 w-12 h-12 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-[#00bb98]/10 hover:to-[#00d4ae]/10 transition-all duration-500 border border-white/30 backdrop-blur-md"
            >
              <svg
                className={`w-6 h-6 transition-all duration-500 ${
                  isMobileMenuOpen ? "rotate-90 text-[#00bb98]" : ""
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
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="px-6 pb-6 space-y-2">
              {["Home", "Jobs", "Services", "Contact", "About"].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-3 text-gray-700 font-semibold rounded-lg hover:bg-[#00bb98]/10 hover:text-[#00bb98] transition-all duration-300"
                    style={{
                      animation: isMobileMenuOpen
                        ? `slideInRight 0.3s ease-out ${index * 0.1}s both`
                        : "none",
                    }}
                  >
                    {item}
                  </a>
                )
              )}
              <div className="pt-4 space-y-2">
                <a
                  href="#"
                  className="block px-4 py-3 text-center text-gray-700 font-semibold rounded-lg border-2 border-[#00bb98] hover:bg-[#00bb98]/10 transition-all duration-300"
                >
                  Sign In
                </a>
                <button
                  type="button"
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white font-bold rounded-lg transition-all duration-300"
                >
                  Build Career
                </button>
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
