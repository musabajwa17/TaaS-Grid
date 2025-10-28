"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
// import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  // const { user, logout } = useAuth();
  // const router = useRouter();
  // const isLoggedIn = !!user;
  const [isScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // You can replace this logic with your auth token or role check
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("role");
  //   setIsLoggedIn(false);
  //   window.location.href = "/"; // Redirect to home after logout
  // };
  const pathname = usePathname();
  // 🧭 Define your navigation structure (easy to extend later)
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    // { name: "CV Forge", href: "/cvbuilder" },
  ];
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
      className={`relative object-contain transition-all duration-700 group-hover:scale-110 ${
        isScrolled ? "h-12" : "h-14"
      }`}
      priority
    />

              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  // onClick={() => handleNavigation(item.href)}
                  href={item.href}
                  className={`relative px-5 py-2.5 font-bold text-base transition-all duration-500 group ${
                    pathname === item.href
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-800"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Text */}
                  <span className="relative z-10">{item.name}</span>

                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-green-600 rounded-xl scale-0 group-hover:scale-100 transition-all duration-500 ease-out opacity-40"></div>

                  {/* Active / Hover Underline */}
                  <div
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 rounded-full transition-all duration-500 ease-out ${
                      pathname === item.href
                        ? "w-3/4 bg-green-600"
                        : "w-0 bg-green-600 group-hover:w-3/4"
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
          className="relative px-10 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-base rounded-full hover:scale-110 transition-all duration-500 ease-out overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Dashboard
            <span className="group-hover:translate-x-1 transition-transform duration-500">
              →
            </span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        </Link>
      ) : (
        <Link
          href="/login"
          className="relative px-10 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-base rounded-full transition-all duration-500 ease-out overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            Login
            <span className="group-hover:translate-x-1 transition-transform duration-500">
              →
            </span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        </Link>
      )}


              {/* <Link
                href="/career"
                className="relative px-10 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-base rounded-full hover:scale-110 transition-all duration-500 ease-out overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Build Career
                  <span className="group-hover:translate-x-1 transition-transform duration-500">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ae] to-[#00bb98] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              </Link> */}
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
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out rounded-2xl ${
              isMobileMenuOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div className="px-6 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  // onClick={() => handleNavigation(item.href)}
                  href={item.href}
                  className={`block px-4 py-3 font-semibold rounded-lg transition-all duration-300 ${
                    pathname === item.href
                      ? "text-[#00bb98] bg-[#00bb98]/10"
                      : "text-gray-700 hover:bg-[#00bb98]/10 hover:text-[#00bb98]"
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
                  className="block px-4 py-3 text-center text-gray-700 font-semibold rounded-lg border-2 border-[#00bb98] hover:bg-[#00bb98]/10 transition-all duration-300"
                >
                  Sign In
                </Link>
                {/* <Link
                  href="/career"
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white font-bold rounded-lg transition-all duration-300"
                >
                  Build Career
                </Link> */}
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
