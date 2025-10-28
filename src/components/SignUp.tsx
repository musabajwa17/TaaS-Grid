"use client";
import { useState } from "react";
import {
  LayoutGrid,
  Zap,
  TrendingUp,
  Mail,
  Lock,
  User,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRegisterUser } from "@/hooks/useRegisterUser";
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

const roles = [
  { id: "employer", label: "Employer" },
  { id: "student", label: "Student" },
  { id: "employee", label: "Employee" },
  { id: "company", label: "Company" },
];

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const route = useRouter();
  const { registerUser } = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = { fullName, email, password, role };
    console.log("Form Data to send:", formData);

    await registerUser(formData);
  route.push("/login")
  };

  return (
    <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
      {/* Centered container with a max width so content never overflows horizontally */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT: Info column */}
        <div className="px-4 lg:px-8 flex flex-col justify-center gap-8">
          {/* <div className="flex items-center gap-4">
            <img src='logo.png' className='w-[240px] h-[55px]' />
          </div> */}

          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              Join the Grid.
              <br />
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
                <f.icon
                  className="h-6 w-6 flex-shrink-0 mt-1 text-green-600"
                //   style={{ color: PRIMARY_COLOR_HEX }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Form column */}
        <div className="flex items-center justify-center px-4 lg:px-8">
          {/* Constrain the card width so it never grows too big and stays centered */}
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-7 sm:p-9">
            {/* Header */}
            <div className="text-center mb-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Your Account</h2>
              <p className="text-sm sm:text-base text-gray-500 mt-1">Join thousands of users on TaaS Grid.</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
          required
        />
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
          required
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="password"
          placeholder="Create a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
          minLength={8}
          required
        />
      </div>

      <fieldset className="pt-2">
        <legend className="block text-sm font-medium text-gray-500 mb-2">
          Select your role
        </legend>

        <div className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <label
              key={r.id}
              htmlFor={r.id}
              className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition text-sm ${
                role === r.id
                  ? "bg-[#E6FAF6] border-green-600 ring-1 ring-green-600 text-gray-900 font-semibold shadow-sm"
                  : "border-gray-300 hover:bg-gray-50 text-gray-600"
              }`}
            >
              <input
                id={r.id}
                type="radio"
                name="role"
                value={r.id}
                checked={role === r.id}
                onChange={() => setRole(r.id)}
                className="sr-only"
              />
              <div className="flex items-center gap-2">
                {role === r.id ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <span className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                )}
                <span>{r.label}</span>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md mt-2"
      >
        Create Account
      </button>
    </form>

            {/* Divider + Google + Sign in link */}
            <div className="mt-4">
              {/* <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-sm font-medium text-gray-500">OR</span>
                </div>
              </div> */}

              {/* <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
              >
                <img alt="Google logo" className="h-5 w-5" src="/Google.png" />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button> */}

              <p className="text-center text-gray-500 mt-3 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-green-600"
                //   style={{ color: PRIMARY_COLOR_HEX }}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
