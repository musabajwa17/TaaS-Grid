// 'use client'
// import { useState, useEffect } from 'react';
// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
//   const performanceData = [
//     { month: 'Jan', jobs: 20, applications: 145 },
//     { month: 'Feb', jobs: 35, applications: 230 },
//     { month: 'Mar', jobs: 25, applications: 180 },
//     { month: 'Apr', jobs: 50, applications: 340 },
//     { month: 'May', jobs: 40, applications: 280 },
//     { month: 'Jun', jobs: 60, applications: 420 },
//   ];

//   const recentJobs = [
//     { title: 'Senior React Developer', applicants: 24, status: 'active', postedDays: 2 },
//     { title: 'UX/UI Designer', applicants: 18, status: 'active', postedDays: 5 },
//     { title: 'Product Manager', applicants: 31, status: 'active', postedDays: 7 },
//     { title: 'DevOps Engineer', applicants: 15, status: 'active', postedDays: 3 },
//   ];

//   const upcomingInterviews = [
//     { candidate: 'Sarah Johnson', position: 'Senior Developer', time: 'Today, 2:00 PM' },
//     { candidate: 'Michael Chen', position: 'UX Designer', time: 'Today, 4:30 PM' },
//     { candidate: 'Emma Williams', position: 'Product Manager', time: 'Tomorrow, 10:00 AM' },
//   ];

// export default function EmployerDashboard() {
//   const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   // const [notificationCount, setNotificationCount] = useState(3);
//   const [, setShowNotificationPulse] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   const targetStats = [9, 52, 17, 5];

//   useEffect(() => {
//     setMounted(true);
//     const duration = 1500;
//     const steps = 60;
//     const increment = duration / steps;

//     let currentStep = 0;
//     const timer = setInterval(() => {
//       currentStep++;
//       const progress = currentStep / steps;
      
//       setAnimatedStats(targetStats.map(target => 
//         Math.floor(target * Math.min(progress, 1))
//       ));

//       if (currentStep >= steps) {
//         clearInterval(timer);
//         setAnimatedStats(targetStats);
//       }
//     }, increment);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const pulseTimer = setInterval(() => {
//       setShowNotificationPulse(prev => !prev);
//     }, 2000);

//     return () => clearInterval(pulseTimer);
//   }, []);
//     // const performanceData: PerformanceData[] = []
//   return (
//     <>
//     <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 overflow-hidden">
//       <div className="layout-container flex h-full grow flex-col relative z-10">
//         {/* <Navbar /> */}

//         {/* Main Content */}
//         <div className="px-10 flex flex-1 justify-center py-8">
//           <div className="layout-content-container flex flex-col w-full max-w-[1400px]">
//             <div className={`flex flex-wrap justify-between gap-3 p-4 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`}>
//               <div>
//                 <p className="text-gray-900 tracking-light text-[32px] font-bold leading-tight">Employer Dashboard</p>
//                 <p className="text-gray-600 text-base mt-2">Manage your recruitment pipeline efficiently</p>
//               </div>
//               {/* <div className="flex items-center gap-2 mt-">
//                 <span className="text-sm text-gray-600">Last updated: Just now</span>
//                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               </div> */}
//                {/* Action Buttons */}
//             <div className={`flex justify-center animate-fadeIn ${mounted ? '' : 'opacity-0'}} style={{ animationDelay: '800ms' }`}>
//               <div className="flex gap-4 px-4 py-6">
//                 <button className="flex items-center gap-2 min-w-[180px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 relative group shadow-lg">
//                   <span className="truncate">Post New Job</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
//                   </svg>
//                 </button>
//                 <button className="flex items-center gap-2 min-w-[180px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-r from-blue-700 to-blue-800 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 relative group shadow-lg">
//                   <span className="truncate">View All Applicants</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="group-hover:translate-x-1 transition-transform">
//                     <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
//                   </svg>
//                 </button>
//                 <button className="flex items-center gap-2 min-w-[180px] cursor-pointer justify-center overflow-hidden rounded-lg h-12 px-6 bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 relative group shadow-lg">
//                   <span className="truncate">Schedule Interview</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="group-hover:scale-110 transition-transform">
//                     <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
//                   </svg>
//                 </button>
//               </div>
//               </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
//               {[
//                 { label: 'Active Jobs', gradient: 'from-blue-700 to-blue-800', icon: '💼', delay: '0ms' },
//                 { label: 'Total Applicants', gradient: 'from-yellow-600 to-amber-600', icon: '👥', delay: '100ms' },
//                 { label: 'Interviews Scheduled', gradient: 'from-blue-700 to-blue-800', icon: '📅', delay: '200ms' },
//                 { label: 'New Hires', gradient: 'from-yellow-600 to-amber-600', icon: '✓', delay: '300ms' }
//               ].map((stat, index) => (
//                 <div
//                   key={index}
//                   onMouseEnter={() => setHoveredCard(index)}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{ animationDelay: stat.delay }}
//                   className={`flex flex-col gap-3 rounded-xl p-6 bg-gradient-to-br ${stat.gradient} text-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${mounted ? 'animate-slideUp' : 'opacity-0'} ${
//                     hoveredCard === index ? 'scale-105 -translate-y-2' : ''
//                   } relative overflow-hidden`}
//                 >
//                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
//                   <div className="flex items-center justify-between relative z-10">
//                     <p className="text-white text-base font-medium leading-normal">{stat.label}</p>
//                     <span className="text-2xl">{stat.icon}</span>
//                   </div>
//                   <div className="relative z-10">
//                     <p className="text-white tracking-light text-3xl font-bold leading-tight flex items-baseline gap-2">
//                       {animatedStats[index]}
//                       {hoveredCard === index && (
//                         <span className="text-base ml-1 inline-block animate-bounce">↑</span>
//                       )}
//                     </p>
//                     <p className="text-white text-opacity-80 text-sm mt-1">+12% from last month</p>
//                   </div>
//                   {hoveredCard === index && (
//                     <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden relative z-10">
//                       <div className="h-full bg-white rounded-full animate-progressBar"></div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 py-6">
//               {/* Performance Chart */}
//               <div className={`lg:col-span-2 flex flex-col gap-4 rounded-xl border border-blue-200 p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-gray-900 text-xl font-bold leading-tight">Job Performance Overview</h2>
//                     <p className="text-gray-600 text-sm mt-1">Jobs posted and applications received</p>
//                   </div>
//                   <div className="flex gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-blue-600"></div>
//                       <span className="text-gray-600">Jobs</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                       <span className="text-gray-600">Applications</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className='mt-[60px] w-full' style={{ height: 280 }}>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                       <defs>
//                         <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.4}/>
//                           <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
//                         </linearGradient>
//                         <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
//                           <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
//                         </linearGradient>
//                       </defs>
//                       <XAxis dataKey="month" tick={{ fill: '#1E3A8A', fontWeight: 600, fontSize: 12 }} />
//                       <YAxis tick={{ fill: '#1E3A8A', fontWeight: 600, fontSize: 12 }} />
//                       <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: 'rgba(255,255,255,0.95)',
//                           border: '1px solid #BFDBFE',
//                           borderRadius: '10px',
//                           fontWeight: 600,
//                         }}
//                       />
//                       <Area type="monotone" dataKey="jobs" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorJobs)" animationDuration={1500} />
//                       <Area type="monotone" dataKey="applications" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorApplications)" animationDuration={1500} animationBegin={300} />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Upcoming Interviews */}
//               <div className={`flex flex-col gap-4 rounded-2xl p-6 bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 ${mounted ? 'animate-fadeIn' : 'opacity-0'}`} style={{ animationDelay: '500ms' }}>
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
//                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
//                         <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/>
//                       </svg>
//                     </div>
//                     <h2 className="text-gray-900 text-xl font-bold leading-tight">Upcoming Interviews</h2>
//                   </div>
//                   <span className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full font-bold shadow-md">{upcomingInterviews.length} Today</span>
//                 </div>
//                 <div className="space-y-3 flex-1">
//                   {upcomingInterviews.map((interview, index) => (
//                     <div key={index} className="relative p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 hover:shadow-lg overflow-hidden">
//                       <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
//                       <div className="relative z-10">
//                         <div className="flex items-start justify-between mb-2">
//                           <div className="flex items-center gap-3">
//                             <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
//                               {interview.candidate.split(' ').map(n => n[0]).join('')}
//                             </div>
//                             <div>
//                               <p className="text-gray-900 font-bold text-sm group-hover:text-blue-700 transition-colors">{interview.candidate}</p>
//                               <p className="text-gray-500 text-xs mt-0.5">{interview.position}</p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
//                           <div className="flex items-center gap-2 text-xs text-gray-600">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
//                               <path d="M128,64a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64Zm0,112a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176ZM128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/>
//                             </svg>
//                             <span className="font-semibold">{interview.time}</span>
//                           </div>
//                           <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-blue-600">
//                             <span className="text-xs font-semibold">Join</span>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256" className="group-hover:translate-x-1 transition-transform">
//                               <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="cursor-pointer w-full py-3 text-center text-blue-700 font-bold text-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white rounded-xl transition-all duration-300 border-2 border-blue-200 hover:border-transparent hover:shadow-lg">
//                   View All Interviews →
//                 </button>
//               </div>
//             </div>

//             {/* Recent Jobs & Activity */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 py-2">
//               {/* Recent Jobs */}
//               <div className={`flex flex-col gap-4 rounded-2xl p-6 bg-gradient-to-br from-white via-green-50 to-emerald-50 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 ${mounted ? 'animate-slideInLeft' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
//                       <path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/>
//                     </svg>
//                   </div>
//                   <h2 className="text-gray-900 text-xl font-bold leading-tight">Active Job Postings</h2>
//                 </div>
//                 <div className="space-y-3">
//                   {recentJobs.map((job, index) => (
//                     <div key={index} className="relative flex items-center justify-between p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-green-200 hover:shadow-lg overflow-hidden">
//                       <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                       {/* <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div> */}
//                       <div className="flex-1 relative z-10 pl-2">
//                         <div className="flex items-center gap-2 mb-1">
//                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                           <p className="text-gray-900 font-bold text-sm group-hover:text-green-700 transition-colors">{job.title}</p>
//                         </div>
//                         <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
//                           <div className="flex items-center gap-1 font-semibold">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
//                               <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
//                             </svg>
//                             {job.applicants} applicants
//                           </div>
//                           <span className="text-gray-400">•</span>
//                           <span>{job.postedDays}d ago</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-3 relative z-10">
//                         <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full font-bold shadow-md">Active</span>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all">
//                           <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
//                         </svg>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Recent Activity */}
//               {/* Recent Activity */}
// <div
//   className={`flex flex-col gap-4 rounded-2xl p-6 bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 ${
//     mounted ? 'animate-slideInRight' : 'opacity-0'
//   }`}
//   style={{ animationDelay: '700ms' }}
// >
//   <div className="flex items-center gap-3 mb-2">
//     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
//       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 256 256">
//         <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"/>
//       </svg>
//     </div>
//     <h2 className="text-gray-900 text-xl font-bold leading-tight">Recent Activity</h2>
//   </div>

//   <div className="space-y-3">
//     {[
//       { text: 'New job posting: "Junior UX Designer"', bg: 'from-blue-500 to-cyan-500', icon: '💼', time: '2h ago' },
//       { text: 'Amelia Harper shortlisted for Senior Developer', bg: 'from-amber-500 to-orange-500', icon: '⭐', time: '4h ago' },
//       { text: 'Interview scheduled: Software Engineer', bg: 'from-purple-500 to-pink-500', icon: '📅', time: '6h ago' },
//       { text: 'New applicant: John Doe for Product Manager', bg: 'from-green-500 to-emerald-500', icon: '👤', time: '8h ago' }
//     ].map((activity, index) => (
//       <div
//         key={index}
//         className="relative flex items-center gap-4 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 px-4 py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-purple-200 overflow-hidden"
//       >
//         <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activity.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

//         {/* <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div> */}

//         <div className={`relative z-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${activity.bg} shrink-0 w-11 h-11 text-lg shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
//           <span className="text-white drop-shadow-md">{activity.icon}</span>
//         </div>

//         <div className="flex-1 relative z-10">
//           <p className="text-gray-900 text-sm font-semibold group-hover:text-purple-700 transition-colors leading-tight">
//             {activity.text}
//           </p>
//           <div className="flex items-center gap-2 mt-1.5">
//             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" className="text-gray-400">
//               <path d="M128,64a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64Zm0,112a48,48,0,1,1,48-48A48.05,48.05,0,0,1,128,176ZM128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"/>
//             </svg>
//             <p className="text-gray-500 text-xs font-medium">{activity.time}</p>
//           </div>
//         </div>

//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className="text-gray-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all relative z-10">
//           <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/>
//         </svg>
//       </div>
//     ))}
//   </div>
// </div>

//               </div>
//             </div>
//             </div>
//           </div>
//         </div>
//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slideInLeft {
//           from {
//             opacity: 0;
//             transform: translateX(-30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes progressBar {
//           from { width: 0%; }
//           to { width: 100%; }
//         }

//         @keyframes swing {
//           0%, 100% { transform: rotate(0deg); }
//           25% { transform: rotate(15deg); }
//           75% { transform: rotate(-15deg); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) translateX(0px); }
//           50% { transform: translateY(-30px) translateX(20px); }
//         }

//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px) translateX(0px); }
//           50% { transform: translateY(40px) translateX(-30px); }
//         }

//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) translateX(0px); }
//           50% { transform: translateY(-20px) translateX(-20px); }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.8s ease-out forwards;
//         }

//         .animate-slideUp {
//           animation: slideUp 0.6s ease-out forwards;
//         }

//         .animate-slideInLeft {
//           animation: slideInLeft 0.6s ease-out forwards;
//         }

//         .animate-slideInRight {
//           animation: slideInRight 0.6s ease-out forwards;
//         }

//         .animate-progressBar {
//           animation: progressBar 1s ease-out;
//         }

//         .animate-swing {
//           animation: swing 0.6s ease-in-out;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-float-slow {
//           animation: float-slow 8s ease-in-out infinite;
//         }

//         .animate-float-delayed {
//           animation: float-delayed 7s ease-in-out infinite 1s;
//         }
//       `}</style>
//     </>
//   );
// }



"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Briefcase,
  BarChart3,
  PlusCircle,
  MessageSquare,
  Clock,
  ChevronRight,
  Lightbulb,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function EmployerDashboard() {
  const plan: string = "Premium";

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setFullName(user.fullName?.toUpperCase() || "");
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  // ===== Dummy Data =====
  const jobPosts = [
    { title: "Frontend Developer", applicants: 23, status: "active" },
    { title: "AI Engineer", applicants: 11, status: "closed" },
    { title: "Backend Developer", applicants: 17, status: "active" },
  ];

  const analytics = [
    { metric: "Total Applicants", value: "245", growth: "+12%" },
    { metric: "Interviews Scheduled", value: "37", growth: "+8%" },
    { metric: "Jobs Posted", value: "12", growth: "+5%" },
  ];

  const recentApplicants = [
    { name: "Ali Raza", role: "Frontend Developer", status: "Interview" },
    { name: "Sara Khan", role: "AI Engineer", status: "Shortlisted" },
    { name: "John Doe", role: "Backend Developer", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-[#00bb98]">{fullName}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage job postings, view applicants, and monitor hiring performance.
          </p>
        </div>
        <div
          className={`px-5 py-2 rounded-full font-semibold text-sm mt-4 md:mt-0 shadow-sm ${
            plan === "Premium"
              ? "bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white"
              : "bg-gray-100 text-gray-700 border border-gray-300"
          }`}
        >
          {plan === "Premium" ? "🌟 Premium Plan Active" : "Basic Plan"}
        </div>
      </div>

      {/* ===== ANALYTICS STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analytics.map((a, i) => (
          <StatCard
            key={i}
            icon={<BarChart3 className="w-10 h-10" />}
            title={a.metric}
            value={a.value}
            subtitle={a.growth}
            gradient="from-[#00bb98] to-[#00d4ae]"
          />
        ))}
      </div>

      {/* ===== FEATURES ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <FeatureCard
          icon={<PlusCircle className="w-6 h-6 text-emerald-600" />}
          title="Post a New Job"
          color="emerald"
          desc="Create and publish job listings instantly with AI-enhanced templates."
          href="/employer/post-job"
          linkText="Post Job"
        />
        <FeatureCard
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          title="Manage Applicants"
          color="indigo"
          desc="View, filter, and track candidate progress efficiently."
          href="/employer/applicants"
          linkText="View Applicants"
        />
        <FeatureCard
          icon={<BarChart3 className="w-6 h-6 text-pink-600" />}
          title="AI Hiring Insights"
          color="pink"
          desc="Get predictive insights and performance metrics for better hiring."
          href="/employer/insights"
          linkText="View Analytics"
        />
      </div>

      {/* ===== JOB POSTS + APPLICANTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <JobPostSection
          icon={<Briefcase className="text-[#00bb98]" />}
          title="Your Job Posts"
          jobs={jobPosts}
        />
        <ApplicantSection
          icon={<Users className="text-[#00bb98]" />}
          title="Recent Applicants"
          applicants={recentApplicants}
        />
      </div>

      {/* ===== PREMIUM FEATURE ===== */}
      {plan !== "Premium" && (
        <div className="mt-10 bg-gradient-to-r from-[#00bb98] to-[#00d4ae] text-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Upgrade to Premium 🚀</h2>
            <p className="text-white/90 mt-2 text-sm">
              Unlock AI Applicant Screening, Smart Job Matching, and Advanced Analytics.
            </p>
          </div>
          <Link
            href="/upgrade"
            className="mt-4 md:mt-0 px-6 py-2 bg-white text-[#00bb98] font-semibold rounded-xl shadow hover:bg-gray-100"
          >
            Upgrade Now
          </Link>
        </div>
      )}
    </div>
  );
}

// ===== SMALL COMPONENTS =====

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  gradient: string;
}) => (
  <div
    className={`p-6 bg-gradient-to-r ${gradient} text-white rounded-2xl shadow-lg flex items-center gap-4`}
  >
    {icon}
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-semibold">{value}</h2>
      <p className="text-xs opacity-80 mt-1">{subtitle} this month</p>
    </div>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  color,
  desc,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  desc: string;
  href: string;
  linkText: string;
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className={`bg-${color}-100 p-3 rounded-xl`}>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{desc}</p>
    <Link
      href={href}
      className={`inline-flex items-center text-${color}-600 hover:text-${color}-700 font-medium text-sm`}
    >
      {linkText} <ChevronRight className="ml-1 w-4 h-4" />
    </Link>
  </div>
);

const JobPostSection = ({
  icon,
  title,
  jobs,
}: {
  icon: React.ReactNode;
  title: string;
  jobs: { title: string; applicants: number; status: string }[];
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {jobs.map((job, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{job.title}</p>
            <p className="text-sm text-gray-500">{job.applicants} applicants</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              job.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const ApplicantSection = ({
  icon,
  title,
  applicants,
}: {
  icon: React.ReactNode;
  title: string;
  applicants: { name: string; role: string; status: string }[];
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon} {title}
    </h2>
    <ul className="space-y-4">
      {applicants.map((a, i) => (
        <li
          key={i}
          className="flex items-center justify-between border-b border-gray-100 pb-3"
        >
          <div>
            <p className="font-semibold text-gray-800">{a.name}</p>
            <p className="text-sm text-gray-500">{a.role}</p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              a.status === "Interview"
                ? "bg-blue-100 text-blue-700"
                : a.status === "Shortlisted"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {a.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);
