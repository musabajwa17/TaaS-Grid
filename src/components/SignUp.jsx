// "use client";
// import { useState } from "react";
// import {
//   LayoutGrid,
//   Zap,
//   TrendingUp,
//   Mail,
//   Lock,
//   User,
//   CheckCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { useRegisterUser } from "@/hooks/useRegisterUser";
// import { useRouter } from "next/navigation";

// // const PRIMARY_COLOR_HEX = "#00BB98";

// const features = [
//   {
//     icon: LayoutGrid,
//     title: "Modular Ecosystem",
//     text: "Navigate through specialized modules like HireConnect and FYP Bridge.",
//   },
//   {
//     icon: Zap,
//     title: "AI-Powered Matches",
//     text: "Leverage TalentMatch AI for perfect project and talent connections.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Career Growth",
//     text: "Utilize CV Forge and SkillBoost Pro to unlock your potential.",
//   },
// ];

// const roles = [
//   { id: "employer", label: "Employer" },
//   { id: "student", label: "Student" },
//   { id: "employee", label: "Job-Seeker" },
//   { id: "company", label: "Company" },
// ];

// export default function SignUp() {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const route = useRouter();
//   const { registerUser } = useRegisterUser();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = { fullName, email, password, role };

//     await registerUser(formData);
//   route.push("/login")
//   };

//   return (
//     <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
//       {/* Centered container with a max width so content never overflows horizontally */}
//       <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//         {/* LEFT: Info column */}
//         <div className="px-4 lg:px-8 flex flex-col justify-center gap-8">
//           {/* <div className="flex items-center gap-4">
//             <img src='logo.png' className='w-[240px] h-[55px]' />
//           </div> */}

//           <div>
//             <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
//               Join the Grid.
//               <br />
//               <span className="text-gray-600 font-semibold">Start your journey.</span>
//             </h1>
//             <p className="text-base sm:text-lg text-gray-600 mt-3 max-w-xl">
//               Create an account to unlock a world of opportunities in our talent ecosystem.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 w-full">
//             {features.map((f) => (
//               <div
//                 key={f.title}
//                 className="bg-white p-4 sm:p-5 rounded-xl flex items-start gap-4 border border-gray-100 shadow-sm hover:shadow-md transition"
//               >
//                 <f.icon
//                   className="h-6 w-6 flex-shrink-0 mt-1 text-green-600"
//                 //   style={{ color: PRIMARY_COLOR_HEX }}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-gray-900">{f.title}</h3>
//                   <p className="text-sm text-gray-500">{f.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT: Form column */}
//         <div className="flex items-center justify-center px-4 lg:px-8">
//           {/* Constrain the card width so it never grows too big and stays centered */}
//           <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-7 sm:p-9">
//             {/* Header */}
//             <div className="text-center mb-3">
//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Create Your Account</h2>
//               <p className="text-sm sm:text-base text-gray-500 mt-1">Join thousands of users on TaaS Grid.</p>
//             </div>

//             {/* Form */}
//             <form className="space-y-4" onSubmit={handleSubmit}>
//       <div className="relative">
//         <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//           required
//         />
//       </div>

//       <div className="relative">
//         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//           required
//         />
//       </div>

//       <div className="relative">
//         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//         <input
//           type="password"
//           placeholder="Create a strong password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl text-gray-800 placeholder-gray-400 transition"
//           minLength={8}
//           required
//         />
//       </div>

//       <fieldset className="pt-2">
//         <legend className="block text-sm font-medium text-gray-500 mb-2">
//           Select your role
//         </legend>

//         <div className="grid grid-cols-2 gap-3">
//           {roles.map((r) => (
//             <label
//               key={r.id}
//               htmlFor={r.id}
//               className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition text-sm ${
//                 role === r.id
//                   ? "bg-[#E6FAF6] border-green-600 ring-1 ring-green-600 text-gray-900 font-semibold shadow-sm"
//                   : "border-gray-300 hover:bg-gray-50 text-gray-600"
//               }`}
//             >
//               <input
//                 id={r.id}
//                 type="radio"
//                 name="role"
//                 value={r.id}
//                 checked={role === r.id}
//                 onChange={() => setRole(r.id)}
//                 className="sr-only"
//               />
//               <div className="flex items-center gap-2">
//                 {role === r.id ? (
//                   <CheckCircle className="h-5 w-5 text-green-600" />
//                 ) : (
//                   <span className="h-5 w-5 border-2 border-gray-300 rounded-full" />
//                 )}
//                 <span>{r.label}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       </fieldset>

//       <button
//         type="submit"
//         className="w-full text-white font-semibold py-3 bg-green-600 rounded-xl hover:opacity-95 transition shadow-md mt-2"
//       >
//         Create Account
//       </button>
//     </form>

//             {/* Divider + Google + Sign in link */}
//             <div className="mt-4">
//               {/* <div className="relative my-4">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200" />
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="bg-white px-3 text-sm font-medium text-gray-500">OR</span>
//                 </div>
//               </div> */}

//               {/* <button
//                 type="button"
//                 className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
//               >
//                 <img alt="Google logo" className="h-5 w-5" src="/Google.png" />
//                 <span className="font-medium text-gray-700">Continue with Google</span>
//               </button> */}

//               <p className="text-center text-gray-500 mt-3 text-sm">
//                 Already have an account?{" "}
//                 <Link
//                   href="/login"
//                   className="font-medium text-green-600"
//                 //   style={{ color: PRIMARY_COLOR_HEX }}
//                 >
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }




"use client";

import { useState } from "react";
import { User, Mail, Lock, Phone, Globe, MapPin, CheckCircle } from "lucide-react";
import { LayoutGrid, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const roles = [
  { id: "student", label: "Student" },
  { id: "employee", label: "Job-Seeker" },
  { id: "employer", label: "Employer" },
  { id: "company", label: "Company" },
];
const features = [
  { icon: LayoutGrid, title: "Modular Ecosystem", text: "Navigate through specialized modules like HireConnect and FYP Bridge." },
  { icon: Zap, title: "AI-Powered Matches", text: "Leverage TalentMatch AI for perfect project and talent connections." },
  { icon: TrendingUp, title: "Career Growth", text: "Utilize CV Forge and SkillBoost Pro to unlock your potential." },
];

export default function SignUp() {
  const [role, setRole] = useState("");
  const router = useRouter();

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Student/Employee fields
  const [fullName, setFullName] = useState("");
  const [college, setCollege] = useState("");

  // Employer/Company fields
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [size, setSize] = useState("1-10 employees");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = { email, password };

      // Role-specific fields
      if (role === "student" || role === "employee") {
  formData.fullName = fullName;
} else if (role === "employer" || role === "company") {
  formData.fullName = companyName; // map companyName to fullName for backend
  formData.companyName = companyName;
  formData.phone = phone;
  formData.address = address;
  formData.website = website;
  formData.industry = industry;
  formData.size = size;
}

      // Determine endpoint
      const endpoint =
        role === "student" || role === "employee"
          ? "/api/user/register"
          : "/api/auth/register/company";

      const res = await axios.post(`http://localhost:3001${endpoint}`, formData);
      toast.success("Register Successful")
      console.log(res)
      if (res.data.success) {
        router.push("/login");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

 // 🌟 STEP 1: ROLE SELECTION PAGE
  if (!role) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-6xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT INFO SECTION */}
          <div className="flex flex-col justify-center gap-8 text-left">
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
                <div key={f.title} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                  <f.icon className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ROLE SELECTION */}
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
              Already have a role? <span className="text-green-600 font-medium">Proceed to login</span>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Step 2: Role-specific form
  return (
    <main className="mt-10 bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center p-6">
  <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
      {role.charAt(0).toUpperCase() + role.slice(1)} Sign Up
    </h2>

    {role === "student" || role === "employee" ? (
      // STUDENT / EMPLOYEE: single column
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
            minLength={8}
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
      // EMPLOYER / COMPANY: two-column layout
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
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
              placeholder="Size (e.g., 1-10 employees)"
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
              minLength={8}
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
      <Link href="/login" className="font-medium text-green-600">
        Sign In
      </Link>
    </p>
  </div>
</main>


  );
}

