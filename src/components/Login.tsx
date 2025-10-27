"use client";
import { useState } from "react";
import { Mail, Lock, LayoutGrid, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useLoginUser } from "@/hooks/useLoginUser";
import { useRouter } from "next/navigation";

// const PRIMARY_COLOR_HEX = "#00BB98";

const features = [
  {
    icon: LayoutGrid,
    title: "Modular Ecosystem",
    text: "Navigate through specialized modules like HireConnect and FYP Bridge.",
  },
  {
    icon: Zap,
    title: "AI-Powered Matches",
    text: "Leverage TalentMatch AI for perfect project and talent connections.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    text: "Utilize CV Forge and SkillBoost Pro to unlock your potential.",
  },
];

export default function Login() {
    const { loginUser, loading } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       console.log("Login Api")
      const response = await loginUser(email, password);
      route.push("/userdashboard");
    } catch (err) {
      console.log("Error login", err)
    }
  };

  return (
    <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
      {/* Centered container */}
       {/* <div className="absolute inset-0 opacity-10 mt-17">
        <svg className="w-full h-screen" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="100" height="86.6" patternUnits="userSpaceOnUse">
              <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)"/>
        </svg>
      </div> */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT: Info Section */}
        <div className="px-4 lg:px-8 flex flex-col justify-center gap-8">
          {/* <div className="flex items-center gap-4">
           <img src='logo2.png' className='w-[240px] h-[55px]' />
          </div> */}

          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Join the Grid.
              <br />
              <span className="text-gray-600 font-semibold">
                Start your journey.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl">
              Create an account to unlock a world of opportunities in our talent
              ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-4 sm:p-5 rounded-xl flex items-start gap-4 border border-gray-100 shadow-sm hover:shadow-md transition"
              >
                <f.icon
                  className="h-6 w-6 flex-shrink-0 mt-1"
                  // style={{ color: PRIMARY_COLOR_HEX }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="flex items-center justify-center px-4 lg:px-8">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Login to Your Account
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Welcome back to TaaS Grid.
              </p>
            </div>

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
          <input
            type="checkbox"
            className="rounded border-gray-300 focus:ring-[#00BB98]"
          />
          Remember me
        </label>
        <a
          href="#"
          className="font-medium text-green-600"
          // style={{ color: PRIMARY_COLOR_HEX }}
        >
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        disabled={loading}
        // style={{ backgroundColor: PRIMARY_COLOR_HEX }}
        className={`w-full text-white font-semibold py-3 rounded-xl bg-green-600 hover:opacity-95 transition shadow-md mt-3 ${
          loading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>

            {/* Divider + Google Button */}
            <div className="mt-6">
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-sm font-medium text-gray-500">
                    OR
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                <img alt="Google logo" className="h-5 w-5" src="/Google.jpeg" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              <p className="text-center text-gray-500 mt-5 text-sm">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-green-600"
                  // style={{ color: PRIMARY_COLOR_HEX }}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
 