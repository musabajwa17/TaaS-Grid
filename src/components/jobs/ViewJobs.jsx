// "use client";
// import { useState, useEffect } from 'react';
// import { Search, MapPin, Briefcase, DollarSign, Clock, Star, Building2, Calendar, BookOpen, Lightbulb, TrendingUp, Layers, ChevronRight, Filter, X, CheckCircle2, ArrowRight, Zap } from 'lucide-react';

// export default function JobView() {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [titleFilter, setTitleFilter] = useState('');
//   const [locationFilter, setLocationFilter] = useState('');
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [hoveredJob, setHoveredJob] = useState(null);

//   const jobs = [
//     {
//       id: 1,
//       title: 'Full Stack Developer',
//       company: 'ASK Development Limited',
//       location: 'Islamabad',
//       salary: 'Rs 150,000 a month',
//       type: 'Full-time',
//       category: 'job',
//       rating: 3.3,
//       reviews: 245,
//       easyApply: true,
//       postedDays: 3,
//       urgent: false,
//       featured: true,
//       description: `We are looking for a talented Full Stack Developer to join our growing team.

// Key Responsibilities:
// • Develop and maintain web applications using modern frameworks
// • Collaborate with cross-functional teams to define and ship new features
// • Write clean, maintainable, and efficient code
// • Participate in code reviews and mentor junior developers
// • Troubleshoot and debug applications

// Required Skills:
// • 3+ years of experience in full stack development
// • Proficiency in React, Node.js, and databases
// • Strong understanding of web technologies (HTML, CSS, JavaScript)
// • Experience with RESTful APIs and Git
// • Excellent problem-solving skills

// Benefits:
// • Competitive salary
// • Health insurance
// • Professional development opportunities
// • Flexible working hours`
//     },
//     {
//       id: 2,
//       title: 'Frontend Development Intern',
//       company: 'TechHub Pakistan',
//       location: 'Islamabad',
//       salary: 'Rs 30,000 a month',
//       type: 'Internship',
//       category: 'internship',
//       rating: 4.6,
//       reviews: 142,
//       easyApply: true,
//       postedDays: 2,
//       urgent: true,
//       featured: false,
//       description: `Exciting opportunity for students to gain hands-on experience in frontend development.

// What You'll Learn:
// • Modern React development practices
// • UI/UX implementation
// • Version control with Git
// • Agile development methodologies
// • Code review and testing

// Requirements:
// • Currently enrolled in CS/IT program
// • Basic knowledge of HTML, CSS, JavaScript
// • Eagerness to learn and grow
// • Good communication skills

// Duration: 3-6 months
// Potential for full-time conversion`
//     },
//     {
//       id: 3,
//       title: 'AI-Powered Healthcare Chatbot',
//       company: 'FYP Project Idea',
//       location: 'Remote',
//       salary: 'Academic Project',
//       type: 'Final Year Project',
//       category: 'fyp',
//       rating: 4.9,
//       reviews: 89,
//       easyApply: false,
//       postedDays: 1,
//       urgent: false,
//       featured: true,
//       description: `Develop an intelligent healthcare chatbot using NLP and machine learning.

// Project Overview:
// Build a conversational AI system that can assist patients with preliminary diagnosis, medication reminders, and health information.

// Key Features:
// • Natural language understanding for symptom analysis
// • Integration with medical databases
// • Appointment scheduling system
// • Medication tracking and reminders
// • Multi-language support

// Technologies:
// • Python, TensorFlow/PyTorch
// • NLP libraries (NLTK, spaCy)
// • React for frontend
// • Node.js backend
// • MongoDB database

// Learning Outcomes:
// • Machine learning and AI implementation
// • Healthcare domain knowledge
// • Full-stack development
// • Natural language processing

// Difficulty: Advanced
// Team Size: 3-4 members
// Duration: 6-8 months`
//     },
//     {
//       id: 4,
//       title: 'Web Developer',
//       company: 'OCAnalytics',
//       location: 'Taxila',
//       salary: 'Rs 70,000 - Rs 120,000 a month',
//       type: 'Full-time',
//       category: 'job',
//       rating: 4.1,
//       reviews: 189,
//       easyApply: true,
//       postedDays: 1,
//       urgent: true,
//       featured: false,
//       description: `Join our dynamic team as a Web Developer and help build innovative web solutions.

// Key Responsibilities:
// • Design and develop responsive websites
// • Optimize applications for maximum speed
// • Implement SEO best practices
// • Collaborate with designers and backend developers

// Required Skills:
// • 2+ years of web development experience
// • Strong knowledge of HTML, CSS, JavaScript
// • Experience with modern frameworks (React, Vue, or Angular)
// • Understanding of responsive design principles`
//     },
//     {
//       id: 5,
//       title: 'Mobile App Development Intern',
//       company: 'InnovateTech Solutions',
//       location: 'Lahore',
//       salary: 'Rs 25,000 a month',
//       type: 'Internship',
//       category: 'internship',
//       rating: 4.4,
//       reviews: 98,
//       easyApply: true,
//       postedDays: 4,
//       urgent: false,
//       featured: false,
//       description: `Learn mobile app development with React Native in a supportive environment.

// Training Includes:
// • React Native fundamentals
// • Mobile UI/UX design
// • API integration
// • App deployment (iOS & Android)
// • Performance optimization

// Requirements:
// • Basic programming knowledge
// • Interest in mobile development
// • Quick learner with problem-solving skills

// Benefits:
// • Mentorship from senior developers
// • Certificate upon completion
// • Flexible hours for students
// • Modern office environment`
//     },
//     {
//       id: 6,
//       title: 'Smart Campus Management System',
//       company: 'FYP Project Idea',
//       location: 'Remote',
//       salary: 'Academic Project',
//       type: 'Final Year Project',
//       category: 'fyp',
//       rating: 4.7,
//       reviews: 156,
//       easyApply: false,
//       postedDays: 3,
//       urgent: false,
//       featured: true,
//       description: `Create a comprehensive digital solution for university campus management.

// Project Scope:
// Develop an integrated platform that connects students, faculty, and administration for efficient campus operations.

// Core Modules:
// • Attendance tracking with facial recognition
// • Digital library management
// • Online examination system
// • Event management and announcements
// • Transport and hostel management
// • Fee payment integration

// Technology Stack:
// • MERN Stack (MongoDB, Express, React, Node.js)
// • Face recognition API
// • Payment gateway integration
// • Mobile app (React Native)
// • Cloud deployment (AWS/Azure)

// Features:
// • Role-based access control
// • Real-time notifications
// • Analytics dashboard
// • Mobile and web compatibility

// Difficulty: Intermediate to Advanced
// Team Size: 4-5 members
// Duration: 8-10 months
// Impact: High practical value`
//     },
//     {
//       id: 7,
//       title: 'Full Stack Developer',
//       company: 'Cloudelligent',
//       location: 'Islamabad',
//       salary: 'Competitive',
//       type: 'Full-time',
//       category: 'job',
//       rating: 4.5,
//       reviews: 512,
//       easyApply: true,
//       postedDays: 5,
//       urgent: false,
//       featured: false,
//       description: `Cloudelligent is seeking an experienced Full Stack Developer to work on cutting-edge cloud solutions.

// Key Responsibilities:
// • Build scalable cloud-based applications
// • Work with AWS/Azure services
// • Implement CI/CD pipelines
// • Design and develop APIs

// Required Skills:
// • 4+ years of full stack development experience
// • Experience with cloud platforms (AWS/Azure)
// • Strong knowledge of microservices architecture
// • Proficiency in Docker and Kubernetes`
//     },
//     {
//       id: 8,
//       title: 'Blockchain-Based Voting System',
//       company: 'FYP Project Idea',
//       location: 'Remote',
//       salary: 'Academic Project',
//       type: 'Final Year Project',
//       category: 'fyp',
//       rating: 4.8,
//       reviews: 203,
//       easyApply: false,
//       postedDays: 2,
//       urgent: false,
//       featured: false,
//       description: `Design a secure, transparent, and tamper-proof voting system using blockchain technology.

// Project Vision:
// Create a decentralized voting platform that ensures election integrity and voter privacy.

// Key Components:
// • Smart contracts for vote recording
// • Voter authentication system
// • Real-time vote counting
// • Audit trail and transparency
// • Admin dashboard for election management

// Technologies:
// • Ethereum/Hyperledger blockchain
// • Solidity for smart contracts
// • React for frontend
// • Web3.js for blockchain interaction
// • Cryptographic security

// Learning Objectives:
// • Blockchain fundamentals
// • Smart contract development
// • Cryptography and security
// • Decentralized application (DApp) creation

// Innovation Points:
// • Prevents vote tampering
// • Ensures voter anonymity
// • Provides complete transparency
// • Reduces election costs

// Difficulty: Advanced
// Team Size: 3-4 members
// Duration: 7-9 months
// Research Potential: High`
//     },
//     {
//       id: 9,
//       title: 'Data Science Intern',
//       company: 'DataMinds Analytics',
//       location: 'Karachi',
//       salary: 'Rs 35,000 a month',
//       type: 'Internship',
//       category: 'internship',
//       rating: 4.5,
//       reviews: 167,
//       easyApply: true,
//       postedDays: 1,
//       urgent: true,
//       featured: false,
//       description: `Join our data science team and work on real-world analytics projects.

// What You'll Do:
// • Data cleaning and preprocessing
// • Statistical analysis
// • Machine learning model development
// • Data visualization
// • Report creation

// Requirements:
// • Understanding of Python and pandas
// • Basic statistics knowledge
// • Familiarity with ML concepts
// • Strong analytical thinking

// Tools & Technologies:
// • Python, Jupyter Notebooks
// • Scikit-learn, TensorFlow
// • SQL databases
// • Tableau/Power BI

// Duration: 4-6 months
// Great learning opportunity!`
//     },
//     {
//       id: 10,
//       title: 'Front-End / Full-Stack Developer',
//       company: 'Securiti',
//       location: 'Islamabad',
//       salary: 'Rs 180,000 a month',
//       type: 'Full-time',
//       category: 'job',
//       rating: 4.8,
//       reviews: 823,
//       easyApply: true,
//       postedDays: 2,
//       urgent: false,
//       featured: true,
//       description: `Securiti is looking for a talented Front-End/Full-Stack Developer to join our privacy and security platform team.

// Key Responsibilities:
// • Develop modern, responsive user interfaces
// • Build scalable front-end architectures
// • Collaborate with product and design teams
// • Ensure high performance and quality

// Required Skills:
// • 3+ years of front-end development experience
// • Expert in React and TypeScript
// • Experience with state management (Redux, Context API)
// • Strong CSS skills and design sensibility`
//     }
//   ];

//   const filteredJobs = jobs.filter(job => {
//     const matchesTitle = job.title.toLowerCase().includes(titleFilter.toLowerCase());
//     const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
//     const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
//     return matchesTitle && matchesLocation && matchesCategory;
//   });

//   useEffect(() => {
//     if (filteredJobs.length > 0 && !selectedJob) {
//       setSelectedJob(filteredJobs[0]);
//     }
//   }, [filteredJobs, selectedJob]);

//   const categories = [
//     { id: 'all', label: 'All Opportunities', icon: Layers, color: 'from-purple-500 to-indigo-600', count: jobs.length },
//     { id: 'job', label: 'Jobs', icon: Briefcase, color: 'from-blue-500 to-cyan-600', count: jobs.filter(j => j.category === 'job').length },
//     { id: 'internship', label: 'Internships', icon: BookOpen, color: 'from-emerald-500 to-teal-600', count: jobs.filter(j => j.category === 'internship').length },
//     { id: 'fyp', label: 'FYP Ideas', icon: Lightbulb, color: 'from-amber-500 to-orange-600', count: jobs.filter(j => j.category === 'fyp').length }
//   ];

//   const getCategoryBadge = (category) => {
//     if (category === 'internship') return {
//       bg: 'bg-emerald-500',
//       text: 'text-white',
//       label: 'Internship',
//       border: 'border-emerald-200'
//     };
//     if (category === 'fyp') return {
//       bg: 'bg-emerald-500',
//       text: 'text-white',
//       label: 'FYP Idea',
//       border: 'border-emerald-200'
//     };
//     return {
//       bg: 'bg-emerald-500',
//       text: 'text-white',
//       label: 'Job',
//       border: 'border-emerald-200'
//     };
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 mt-18">
//       {/* Enhanced Header */}
//       <div className="bg-emerald-600 shadow-2xl">
//         <div className="max-w-full flex justify-between px-6 py-4">
        
//           {/* Bottom Row - Categories */}
//           <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//             {categories.map((cat) => {
//               const Icon = cat.icon;
//               const isActive = activeCategory === cat.id;
//               return (
//                 <button
//                   key={cat.id}
//                   onClick={() => {
//                     setActiveCategory(cat.id);
//                     setSelectedJob(null);
//                   }}
//                   className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-101 whitespace-nowrap ${
//                     isActive
//                       ? 'bg-white text-green-700'
//                       : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
//                   }`}
//                 >
//                   <Icon className="w-4 h-4 " />
//                   <span>{cat.label}</span>
//                   <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                     isActive ? 'bg-gradient-to-br from-green-50 to-emerald-100 text-green-700' : 'bg-white/20'
//                   }`}>
//                     {cat.count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>
//            {/* Top Row - Logo and Search */}
//           <div className="flex items-center gap-4 mb-4">
//             <div className="flex gap-3 flex-1 max-w-3xl">
//               <div className="flex-1 relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Job title, keywords, or company..."
//                   value={titleFilter}
//                   onChange={(e) => setTitleFilter(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-gray-700 font-medium shadow-lg placeholder-gray-400"
//                 />
//               </div>
//               <div className="w-64 relative">
//                 <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="City or location..."
//                   value={locationFilter}
//                   onChange={(e) => setLocationFilter(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-gray-700 font-medium shadow-lg placeholder-gray-400"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
//           {/* Left Panel - Job List */}
//           <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
//             {filteredJobs.length === 0 ? (
//               <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
//                 <Search className="w-20 h-20 mx-auto text-gray-300 mb-4" />
//                 <p className="text-gray-700 text-xl font-bold mb-2">No results found</p>
//                 <p className="text-gray-500">Try adjusting your search filters</p>
//               </div>
//             ) : (
//               filteredJobs.map((job, index) => {
//                 const badge = getCategoryBadge(job.category);
//                 const isSelected = selectedJob?.id === job.id;
//                 const isHovered = hoveredJob === job.id;

//                 return (
//                   <div
//                     key={job.id}
//                     onClick={() => setSelectedJob(job)}
//                     onMouseEnter={() => setHoveredJob(job.id)}
//                     onMouseLeave={() => setHoveredJob(null)}
//                     className={`relative bg-white rounded-2xl p-6 mt-2 w-100 mx-5 cursor-pointer transition-all duration-300 border-2 ${
//                       isSelected
//                         ? 'border-green-500 shadow-xl scale-105'
//                         : 'border-gray-200 hover:border-green-600 hover:shadow-xl'
//                     }`}
//                     style={{
//                       animation: `slideIn 0.4s ease-out ${index * 0.05}s both`
//                     }}
//                   >
//                     <div className="flex justify-between items-start mb-3">
//                       <h3 className="font-bold text-lg text-gray-900 pr-4 leading-tight">
//                         {job.title}
//                       </h3>
//                       {job.easyApply && (
//                         <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold whitespace-nowrap flex items-center gap-1">
//                           <CheckCircle2 className="w-3 h-3" />
//                           Easy Apply
//                         </span>
//                       )}
//                     </div>

//                     <span className={`inline-block ${badge.bg} ${badge.text} px-3 py-1 rounded-lg text-xs font-bold mb-3`}>
//                       {badge.label}
//                     </span>

//                     <div className="space-y-2 mb-4">
//                       <div className="flex items-center gap-2">
//                         <Building2 className="w-4 h-4 text-green-600 flex-shrink-0" />
//                         <p className="text-sm font-semibold text-gray-800 truncate">{job.company}</p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
//                         <p className="text-sm text-gray-600">{job.location}</p>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <Star className="w-4 h-4 text-green-600 flex-shrink-0" />
//                         <span className="text-sm font-bold text-gray-800">{job.rating}</span>
//                         <span className="text-xs text-gray-500">({job.reviews})</span>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
//                         <span className="text-sm font-bold text-green-700">{job.salary}</span>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                       <div className="text-xs text-gray-500 flex items-center">
//                         <Clock className="w-3 h-3 mr-1" />
//                         {job.postedDays}d ago
//                       </div>
//                       <ArrowRight className={`w-5 h-5 transition-all ${
//                         isSelected || isHovered ? 'text-green-600 translate-x-1' : 'text-gray-400'
//                       }`} />
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>

//           {/* Right Panel - Job Details */}
//           <div className="lg:col-span-2 bg-white rounded-2xl mt-2 shadow-2xl max-h-[calc(100vh-200px)] overflow-hidden">
//             <div className="h-full overflow-y-auto">
//               {selectedJob ? (
//                 <div>
//                   {/* Header with Gradient */}
//                   <div className="bg-emerald-600 p-8 relative overflow-hidden">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

//                     <div className="relative z-10">
//                       <h1 className="text-4xl font-black mb-4 text-white leading-tight">{selectedJob.title}</h1>

//                       <div className="flex items-center gap-3 mb-4 flex-wrap">
//                         <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
//                           <Building2 className="w-5 h-5 mr-2 text-white" />
//                           <span className="font-bold text-white">{selectedJob.company}</span>
//                         </div>
//                         <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
//                           <Star className="w-5 h-5 mr-2 fill-white-300 text-white" />
//                           <span className="font-bold text-white">{selectedJob.rating}</span>
//                           <span className="ml-2 text-sm text-white/90">({selectedJob.reviews} reviews)</span>
//                         </div>
//                         <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
//                           <MapPin className="w-5 h-5 mr-2 text-white" />
//                           <span className="font-bold text-white">{selectedJob.location}</span>
//                         </div>
//                       </div>

//                       <div className="flex items-center text-white/90 mb-6">
//                         <Calendar className="w-4 h-4 mr-2" />
//                         <span className="text-sm">Posted {selectedJob.postedDays} days ago</span>
//                       </div>

//                       <button className="bg-white text-green-600 hover:bg-green-50 font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-101 shadow-2xl w-full flex items-center justify-center gap-2 group">
//                         Apply Now
//                         <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="p-8">
//                     {/* Info Cards Grid */}
//                     <div className="grid grid-cols-2 gap-4 mb-8">
//                       <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
//                         <div className="flex items-center mb-2">
//                           <DollarSign className="w-6 h-6 mr-2 text-green-600" />
//                           <span className="font-bold text-green-900 text-sm">Salary Range</span>
//                         </div>
//                         <div className="text-xl font-black text-green-700">
//                           {selectedJob.salary}
//                         </div>
//                       </div>

//                       <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
//                         <div className="flex items-center mb-2">
//                           <Briefcase className="w-6 h-6 mr-2 text-green-600" />
//                           <span className="font-bold text-green-900 text-sm">Employment Type</span>
//                         </div>
//                         <div className="text-xl font-black text-green-600">
//                           {selectedJob.type}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <div className="border-t-2 border-gray-100 pt-8">
//                       <h2 className="text-2xl font-black mb-6 text-gray-900 flex items-center">
//                         <div className="w-1.5 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mr-4"></div>
//                         Job Description
//                       </h2>
//                       <div className="text-gray-700 whitespace-pre-line leading-relaxed bg-gradient-to-br from-green-50 to-green-50 p-8 rounded-2xl border-2 border-slate-200">
//                         {selectedJob.description}
//                       </div>
//                     </div>

//                     {/* Apply Section */}
//                     <div className="mt-8 pt-8 border-t-2 border-gray-100">
//                       <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 mb-6">
//                         <div className="flex items-start gap-4">
//                           <div className="bg-green-600 p-3 rounded-xl">
//                             <Briefcase className="w-6 h-6 text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-bold text-lg text-green-900 mb-2">Ready to Apply?</h3>
//                             <p className="text-gray-600 text-sm">
//                               Join thousands of professionals who have found their dream career through our platform.
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <button className="w-full bg-emerald-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-5 rounded-2xl transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-3 group">
//                         <span>Submit Your Application</span>
//                         <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
//                       </button>

//                       <div className="grid grid-cols-2 gap-4 mt-6">
//                         <button className="bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-all">
//                           Save for Later
//                         </button>
//                         <button className="bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-all">
//                           Share Job
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center h-full p-12">
//                   <div className="text-center">
//                     <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-xl">
//                       <Briefcase className="w-16 h-16 text-indigo-600" />
//                     </div>
//                     <p className="text-gray-800 text-2xl font-black mb-3">Select an Opportunity</p>
//                     <p className="text-gray-500 text-sm">Choose from the list to view detailed information</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Search, MapPin, Briefcase, DollarSign, Clock, Star, Building2,
  Calendar, BookOpen, Lightbulb, Layers, ChevronRight, CheckCircle2, ArrowRight
} from "lucide-react";

export default function JobView() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredJob, setHoveredJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data from backend depending on category
 useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const baseURL = "http://localhost:3001";
      const endpoints = {
        job: `${baseURL}/api/jobs`,
        internship: `${baseURL}/api/internships`,
        fyp: `${baseURL}/api/fyps`,
      };

      let data = [];

      if (activeCategory === "all") {
        const [jobsRes, internRes, fypRes] = await Promise.all([
          axios.get(endpoints.job),
          axios.get(endpoints.internship),
          axios.get(endpoints.fyp),
        ]);

        const tagged = [
          ...jobsRes.data.jobs.map(j => ({ ...j, category: "job" })),
          ...internRes.data.internships.map(i => ({ ...i, category: "internship" })),
          ...fypRes.data.fyps.map(f => ({ ...f, category: "fyp" })),
        ];

        data = tagged;
      } else {
        const res = await axios.get(endpoints[activeCategory]);
        const key =
          activeCategory === "job"
            ? "jobs"
            : activeCategory === "internship"
            ? "internships"
            : "fyps";

        data = res.data[key].map(item => ({ ...item, category: activeCategory }));
      }

      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, [activeCategory]);


  // 🔹 Filtering
  const filteredJobs = jobs.filter(job => {
    const matchesTitle = job.title?.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesLocation = job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesTitle && matchesLocation;
  });

  // 🔹 Auto-select first job
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      setSelectedJob(filteredJobs[0]);
    }
  }, [filteredJobs, selectedJob]);

  // 🔹 Category buttons
  const categories = [
    { id: "all", label: "All Opportunities", icon: Layers },
    { id: "job", label: "Jobs", icon: Briefcase },
    { id: "internship", label: "Internships", icon: BookOpen },
    { id: "fyp", label: "FYP Ideas", icon: Lightbulb },
  ];
    const getCategoryBadge = (category) => {
    if (category === 'internship') return {
      bg: 'bg-emerald-500',
      text: 'text-white',
      label: 'Internship',
      border: 'border-emerald-200'
    };
    if (category === 'fyp') return {
      bg: 'bg-emerald-500',
      text: 'text-white',
      label: 'FYP Idea',
      border: 'border-emerald-200'
    };
    return {
      bg: 'bg-emerald-500',
      text: 'text-white',
      label: 'Job',
      border: 'border-emerald-200'
    };
  };


  // 🔹 Loader UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-500">
        Loading opportunities...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 mt-18">
      {/* Enhanced Header */}
      <div className="bg-emerald-600 shadow-2xl">
        <div className="max-w-full flex justify-between px-6 py-4">
        
          {/* Bottom Row - Categories */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedJob(null);
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-101 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-green-700'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                >
                  <Icon className="w-4 h-4 " />
                  <span>{cat.label}</span>
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-gradient-to-br from-green-50 to-emerald-100 text-green-700' : 'bg-white/20'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
           {/* Top Row - Logo and Search */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex gap-3 flex-1 max-w-3xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company..."
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-gray-700 font-medium shadow-lg placeholder-gray-400"
                />
              </div>
              <div className="w-64 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City or location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all text-gray-700 font-medium shadow-lg placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left Panel - Job List */}
          <div className="lg:col-span-1 space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
                <Search className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-700 text-xl font-bold mb-2">No results found</p>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            ) : (
              filteredJobs.map((job, index) => {
                const badge = getCategoryBadge(job.category);
                const isSelected = selectedJob?.id === job.id;
                const isHovered = hoveredJob === job.id;

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                    className={`relative bg-white rounded-2xl p-6 mt-2 w-100 mx-5 cursor-pointer transition-all duration-300 border-2 ${
                      isSelected
                        ? 'border-green-500 shadow-xl scale-105'
                        : 'border-gray-200 hover:border-green-600 hover:shadow-xl'
                    }`}
                    style={{
                      animation: `slideIn 0.4s ease-out ${index * 0.05}s both`
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-900 pr-4 leading-tight">
                        {job.title}
                      </h3>
                      {job.easyApply && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-bold whitespace-nowrap flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Easy Apply
                        </span>
                      )}
                    </div>

                    <span className={`inline-block ${badge.bg} ${badge.text} px-3 py-1 rounded-lg text-xs font-bold mb-3`}>
                      {badge.label}
                    </span>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-sm font-semibold text-gray-800 truncate">{job.company}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-gray-600">{job.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-gray-800">{job.rating}</span>
                        <span className="text-xs text-gray-500">({job.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm font-bold text-green-700">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {job.postedDays}d ago
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-all ${
                        isSelected || isHovered ? 'text-green-600 translate-x-1' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Panel - Job Details */}
          <div className="lg:col-span-2 bg-white rounded-2xl mt-2 shadow-2xl max-h-[calc(100vh-200px)] overflow-hidden">
            <div className="h-full overflow-y-auto">
              {selectedJob ? (
                <div>
                  {/* Header with Gradient */}
                  <div className="bg-emerald-600 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                      <h1 className="text-4xl font-black mb-4 text-white leading-tight">{selectedJob.title}</h1>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
                          <Building2 className="w-5 h-5 mr-2 text-white" />
                          <span className="font-bold text-white">{selectedJob.company}</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
                          <Star className="w-5 h-5 mr-2 fill-white-300 text-white" />
                          <span className="font-bold text-white">{selectedJob.rating}</span>
                          <span className="ml-2 text-sm text-white/90">({selectedJob.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/30">
                          <MapPin className="w-5 h-5 mr-2 text-white" />
                          <span className="font-bold text-white">{selectedJob.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-white/90 mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Posted {selectedJob.postedDays} days ago</span>
                      </div>

                      <button className="bg-white text-green-600 hover:bg-green-50 font-bold px-12 py-4 rounded-xl transition-all transform hover:scale-101 shadow-2xl w-full flex items-center justify-center gap-2 group">
                        Apply Now
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Info Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                          <span className="font-bold text-green-900 text-sm">Salary Range</span>
                        </div>
                        <div className="text-xl font-black text-green-700">
                          {selectedJob.salary}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
                        <div className="flex items-center mb-2">
                          <Briefcase className="w-6 h-6 mr-2 text-green-600" />
                          <span className="font-bold text-green-900 text-sm">Employment Type</span>
                        </div>
                        <div className="text-xl font-black text-green-600">
                          {selectedJob.type}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="border-t-2 border-gray-100 pt-8">
                      <h2 className="text-2xl font-black mb-6 text-gray-900 flex items-center">
                        <div className="w-1.5 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mr-4"></div>
                        Job Description
                      </h2>
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed bg-gradient-to-br from-green-50 to-green-50 p-8 rounded-2xl border-2 border-slate-200">
                        {selectedJob.description}
                      </div>
                    </div>

                    {/* Apply Section */}
                    <div className="mt-8 pt-8 border-t-2 border-gray-100">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl border-2 border-green-200 mb-6">
                        <div className="flex items-start gap-4">
                          <div className="bg-green-600 p-3 rounded-xl">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-green-900 mb-2">Ready to Apply?</h3>
                            <p className="text-gray-600 text-sm">
                              Join thousands of professionals who have found their dream career through our platform.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-emerald-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-5 rounded-2xl transition-all transform hover:scale-105 text-lg flex items-center justify-center gap-3 group">
                        <span>Submit Your Application</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </button>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <button className="bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-all">
                          Save for Later
                        </button>
                        <button className="bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 font-bold px-6 py-3 rounded-xl transition-all">
                          Share Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-12">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-xl">
                      <Briefcase className="w-16 h-16 text-indigo-600" />
                    </div>
                    <p className="text-gray-800 text-2xl font-black mb-3">Select an Opportunity</p>
                    <p className="text-gray-500 text-sm">Choose from the list to view detailed information</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

