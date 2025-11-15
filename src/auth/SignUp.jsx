// "use client";

// import { useState } from "react";
// import { User, Mail, Lock, Phone, Globe, MapPin, CheckCircle } from "lucide-react";
// import { LayoutGrid, Zap, TrendingUp } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/auth/AuthContext";

// const roles = [
//   { id: "student", label: "Student" },
//   { id: "employee", label: "Job-Seeker" },
//   { id: "company", label: "Company" },
// ];

// const features = [
//   { icon: LayoutGrid, title: "Modular Ecosystem", text: "Navigate through specialized modules like HireConnect and FYP Bridge." },
//   { icon: Zap, title: "AI-Powered Matches", text: "Leverage TalentMatch AI for perfect project and talent connections." },
//   { icon: TrendingUp, title: "Career Growth", text: "Utilize CV Forge and SkillBoost Pro to unlock your potential." },
// ];

// export default function SignUp() {
//   const { login } = useAuth();
//   const [role, setRole] = useState("");
//   const router = useRouter();

//   // Common fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Student/Employee
//   const [fullName, setFullName] = useState("");

//   // Employer/Company
//   const [companyName, setCompanyName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [website, setWebsite] = useState("");
//   const [industry, setIndustry] = useState("");
//   const [size, setSize] = useState("1-10 employees");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!role) return alert("Please select a role");

//     try {
//       let formData= { email, password, role };

//       if (role === "student" || role === "employee") formData.name = fullName;
//       else {
//         formData.name = companyName;
//         formData.companyName = companyName;
//         formData.phone = phone;
//         formData.address = address;
//         formData.website = website;
//         formData.industry = industry;
//         formData.size = size;
//       }

//       const endpoint =
//         role === "student" || role === "employee"
//           ? "http://localhost:3001/api/user/register"
//           : "http://localhost:3001/api/company/register";
//       console.log(formData)
//       console.log(role)
//       const res = await fetch(endpoint, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw await res.json();

//       router.push("/login");
//     } catch (err) {
//       alert(err?.message || "Signup failed");
//     }
//   };

//   // 🌟 STEP 1: Role Selection
//   if (!role) {
//     return (
//       <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
//         <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* LEFT INFO */}
//           <div className="flex flex-col justify-center gap-8">
//             <div>
//               <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
//                 Choose Your Role.<br />
//                 <span className="text-gray-600 font-semibold">Start your journey.</span>
//               </h1>
//               <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl">
//                 Join our TaaS Grid and access customized tools, dashboards, and connections designed for your role.
//               </p>
//             </div>
//             <div className="space-y-3">
//               {features.map((f) => (
//                 <div key={f.title} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
//                   <f.icon className="h-6 w-6 text-green-600 mt-1" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{f.title}</h3>
//                     <p className="text-sm text-gray-500">{f.text}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT ROLE SELECTION */}
//           <div className="flex flex-col justify-center items-center">
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
//               Select Your Role
//             </h2>
//             <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
//               {roles.map((r) => (
//                 <button
//                   key={r.id}
//                   onClick={() => setRole(r.id)}
//                   className="p-5 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold transition text-gray-700 hover:text-green-700"
//                 >
//                   {r.label}
//                 </button>
//               ))}
//             </div>
//             <p className="text-sm text-gray-500 mt-6">
//               Already have a role? <Link href="/login" className="text-green-600 font-medium">Proceed to login</Link>
//             </p>
//           </div>
//         </div>
//       </main>
//     );
//   }

//   // STEP 2: Role-specific form
//   return (
//     <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
//       <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
//           {role.charAt(0).toUpperCase() + role.slice(1)} Sign Up
//         </h2>

//         {role === "student" || role === "employee" ? (
//           <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 required
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md"
//             >
//               Create Account
//             </button>
//           </form>
//         ) : (
//           <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
//             {/* LEFT */}
//             <div className="space-y-4">
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Company Name"
//                   value={companyName}
//                   onChange={(e) => setCompanyName(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                   required
//                 />
//               </div>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 />
//               </div>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 />
//               </div>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                   required
//                 />
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="space-y-4">
//               <div className="relative">
//                 <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Website"
//                   value={website}
//                   onChange={(e) => setWebsite(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 />
//               </div>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Industry"
//                   value={industry}
//                   onChange={(e) => setIndustry(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 />
//               </div>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Size (e.g., 1-10 employees)"
//                   value={size}
//                   onChange={(e) => setSize(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                 />
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-2 mt-2">
//               <button
//                 type="submit"
//                 className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md"
//               >
//                 Create Account
//               </button>
//             </div>
//           </form>
//         )}

//         <p className="text-center text-gray-500 mt-6 text-sm">
//           Already have an account? <Link href="/login" className="font-medium text-green-600">Sign In</Link>
//         </p>
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Globe,
  MapPin,
  LayoutGrid,
  Zap,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";

const roles = [
  { id: "student", label: "Student" },
  { id: "employee", label: "Job-Seeker" },
  { id: "company", label: "Company" },
];

const features = [
  { icon: LayoutGrid, title: "Modular Ecosystem", text: "Navigate through specialized modules like HireConnect and FYP Bridge." },
  { icon: Zap, title: "AI-Powered Matches", text: "Leverage TalentMatch AI for perfect project and talent connections." },
  { icon: TrendingUp, title: "Career Growth", text: "Utilize CV Forge and SkillBoost Pro to unlock your potential." },
];

export default function SignUp() {
  const { register } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState("");

  // Common
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Student/Employee
  const [fullName, setFullName] = useState("");

  // Company
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("1-10 employees");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) return alert("Select a role first");

    let payload = { email, password, role };

    if (role === "student" || role === "employee") {
      payload.name = fullName;
    } else {
      payload.name = companyName;
      payload.companyName = companyName;
      payload.phone = phone;
      payload.address = address;
      payload.website = website;
      payload.industry = industry;
      payload.size = size;
    }

    try {
      await register(role, payload);
      router.push("/login"); // redirect after signup
    } catch (err) {
      alert(err?.message || "Signup failed");
    }
  };

  // ---------------------------
  // STEP 1: ROLE SELECTION
  // ---------------------------
  if (!role) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT INFO */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Choose Your Role.<br />
                <span className="text-gray-600 font-semibold">Start your journey.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl">
                Join our TaaS Grid and access customized tools, dashboards, and connections designed for your role.
              </p>
            </div>
            <div className="space-y-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <f.icon className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ROLE SELECT */}
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              Select Your Role
            </h2>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className="p-5 rounded-xl border border-gray-300 hover:bg-gray-50 font-semibold transition text-gray-700 hover:text-green-700"
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Already have a role?{" "}
              <Link href="/login" className="text-green-600 font-medium">Proceed to login</Link>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------
  // STEP 2: ROLE-SPECIFIC FORMS
  // ---------------------------
  return (
    <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          {role.charAt(0).toUpperCase() + role.slice(1)} Sign Up
        </h2>

        {role === "student" || role === "employee" ? (
          // STUDENT / EMPLOYEE FORM
          <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
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
                placeholder="Email"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md"
            >
              Create Account
            </button>
          </form>
        ) : (
          // COMPANY FORM
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Size (e.g., 1–10 employees)"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-600">Sign In</Link>
        </p>
      </div>
    </main>
  );
}
