"use client";

import { useState } from "react";
import { Mail, Lock, LayoutGrid, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const features = [
  { icon: LayoutGrid, title: "Modular Ecosystem", text: "Navigate through specialized modules like HireConnect and FYP Bridge." },
  { icon: Zap, title: "AI-Powered Matches", text: "Leverage TalentMatch AI for perfect project and talent connections." },
  { icon: TrendingUp, title: "Career Growth", text: "Utilize CV Forge and SkillBoost Pro to unlock your potential." },
];

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT INFO SECTION */}
        <div className="px-4 lg:px-8 flex flex-col justify-center gap-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Join the Grid.<br />
              <span className="text-gray-600 font-semibold">Start your journey.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl">
              Create an account to unlock a world of opportunities in our talent ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-4 sm:p-5 rounded-xl flex items-start gap-4 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <f.icon className="h-6 w-6 flex-shrink-0 mt-1 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="flex items-center justify-center px-4 lg:px-8">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Login to Your Account</h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">Welcome back to TaaS Grid.</p>
            </div>

            {/* LOGIN FORM */}
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 focus:ring-green-600" />
                  Remember me
                </label>
                <a href="#" className="font-medium text-green-600">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-3 rounded-xl bg-green-600 hover:opacity-95 transition shadow-md mt-3 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-gray-500 mt-5 text-sm">
              Don’t have an account?{" "}
              <Link href="/signup" className="font-medium text-green-600">Sign Up</Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
