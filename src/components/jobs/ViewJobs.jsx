"use client";
import { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, ChevronRight, Star, Building2, Calendar } from 'lucide-react';

export default function JobView() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'ASK Development Limited',
      location: 'Islamabad',
      salary: 'Rs 150,000 a month',
      type: 'Full-time',
      rating: 3.3,
      reviews: 245,
      easyApply: true,
      postedDays: 3,
      description: `We are looking for a talented Full Stack Developer to join our growing team.

Key Responsibilities:
• Develop and maintain web applications using modern frameworks
• Collaborate with cross-functional teams to define and ship new features
• Write clean, maintainable, and efficient code
• Participate in code reviews and mentor junior developers
• Troubleshoot and debug applications

Required Skills:
• 3+ years of experience in full stack development
• Proficiency in React, Node.js, and databases
• Strong understanding of web technologies (HTML, CSS, JavaScript)
• Experience with RESTful APIs and Git
• Excellent problem-solving skills

Benefits:
• Competitive salary
• Health insurance
• Professional development opportunities
• Flexible working hours`
    },
    {
      id: 2,
      title: 'Web Developer',
      company: 'OCAnalytics',
      location: 'Taxila',
      salary: 'Rs 70,000 - Rs 120,000 a month',
      type: 'Full-time',
      rating: 4.1,
      reviews: 189,
      easyApply: true,
      postedDays: 1,
      description: `Join our dynamic team as a Web Developer and help build innovative web solutions.

Key Responsibilities:
• Design and develop responsive websites
• Optimize applications for maximum speed
• Implement SEO best practices
• Collaborate with designers and backend developers

Required Skills:
• 2+ years of web development experience
• Strong knowledge of HTML, CSS, JavaScript
• Experience with modern frameworks (React, Vue, or Angular)
• Understanding of responsive design principles`
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Cloudelligent',
      location: 'Islamabad',
      salary: 'Competitive',
      type: 'Full-time',
      rating: 4.5,
      reviews: 512,
      easyApply: true,
      postedDays: 5,
      description: `Cloudelligent is seeking an experienced Full Stack Developer to work on cutting-edge cloud solutions.

Key Responsibilities:
• Build scalable cloud-based applications
• Work with AWS/Azure services
• Implement CI/CD pipelines
• Design and develop APIs

Required Skills:
• 4+ years of full stack development experience
• Experience with cloud platforms (AWS/Azure)
• Strong knowledge of microservices architecture
• Proficiency in Docker and Kubernetes`
    },
    {
      id: 4,
      title: 'Front-End / Full-Stack Developer',
      company: 'Securiti',
      location: 'Islamabad',
      salary: 'Rs 180,000 a month',
      type: 'Full-time',
      rating: 4.8,
      reviews: 823,
      easyApply: true,
      postedDays: 2,
      description: `Securiti is looking for a talented Front-End/Full-Stack Developer to join our privacy and security platform team.

Key Responsibilities:
• Develop modern, responsive user interfaces
• Build scalable front-end architectures
• Collaborate with product and design teams
• Ensure high performance and quality

Required Skills:
• 3+ years of front-end development experience
• Expert in React and TypeScript
• Experience with state management (Redux, Context API)
• Strong CSS skills and design sensibility`
    },
    {
      id: 5,
      title: 'Senior Full Stack Developer',
      company: 'Systems Limited',
      location: 'Lahore',
      salary: 'Rs 200,000 a month',
      type: 'Full-time',
      rating: 4.2,
      reviews: 1045,
      easyApply: false,
      postedDays: 7,
      description: `We are hiring a Senior Full Stack Developer to lead our development initiatives.

Key Responsibilities:
• Lead development of complex web applications
• Mentor junior developers
• Architect scalable solutions
• Coordinate with stakeholders

Required Skills:
• 5+ years of full stack development experience
• Leadership experience
• Strong technical and communication skills`
    },
    {
      id: 6,
      title: 'React Developer',
      company: 'TechVision',
      location: 'Karachi',
      salary: 'Rs 90,000 - Rs 140,000 a month',
      type: 'Full-time',
      rating: 3.9,
      reviews: 367,
      easyApply: true,
      postedDays: 4,
      description: `Join TechVision as a React Developer and work on exciting projects.

Key Responsibilities:
• Build reusable React components
• Implement pixel-perfect designs
• Optimize application performance
• Write unit and integration tests

Required Skills:
• 2+ years of React experience
• Strong JavaScript fundamentals
• Experience with React hooks and modern patterns`
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesTitle = job.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesTitle && matchesLocation;
  });

  if (selectedJob === null && filteredJobs.length > 0) {
    setSelectedJob(filteredJobs[0]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Find Your Dream Job
          </h1>
          
          {/* Search Filters */}
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 font-medium"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="City or location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700 font-medium"
              />
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            {filteredJobs.length} jobs found
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Sidebar - Job List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                {filteredJobs.length === 0 ? (
                  <div className="p-12 text-center">
                    <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No jobs found matching your filters.</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`p-5 border-b border-gray-100 cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${
                        selectedJob?.id === job.id 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-600' 
                          : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        {job.easyApply && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                            Easy Apply
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-sm font-semibold text-gray-700">{job.company}</p>
                        <div className="flex items-center text-xs">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-semibold text-gray-700">{job.rating}</span>
                          <span className="text-gray-400 ml-1">({job.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {job.location}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                          {job.salary}
                        </span>
                        <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {job.type}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Posted {job.postedDays} {job.postedDays === 1 ? 'day' : 'days'} ago
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Job Details */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 sticky top-8">
              {selectedJob ? (
                <div className="overflow-y-auto max-h-[calc(100vh-280px)]">
                  <div className="p-8">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 -m-8 mb-6 p-8 text-white">
                      <h1 className="text-3xl font-bold mb-3">{selectedJob.title}</h1>
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                          <Building2 className="w-4 h-4 mr-2" />
                          <span className="font-semibold">{selectedJob.company}</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                          <Star className="w-4 h-4 mr-1 fill-yellow-300 text-yellow-300" />
                          <span className="font-semibold">{selectedJob.rating}</span>
                          <span className="ml-1 text-sm">({selectedJob.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center text-white/90 mb-4">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span className="text-lg">{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center text-white/90 mb-6">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Posted {selectedJob.postedDays} {selectedJob.postedDays === 1 ? 'day' : 'days'} ago</span>
                      </div>
                      
                      <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                        Apply now
                      </button>
                    </div>

                    {/* Job Details Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center mb-2">
                          <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                          <span className="font-bold text-gray-900">Salary</span>
                        </div>
                        <div className="text-lg font-semibold text-blue-700">
                          {selectedJob.salary}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center mb-2">
                          <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                          <span className="font-bold text-gray-900">Job Type</span>
                        </div>
                        <div className="text-lg font-semibold text-purple-700">
                          {selectedJob.type}
                        </div>
                      </div>
                    </div>

                    {/* Full Job Description */}
                    <div className="border-t-2 border-gray-100 pt-6">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">Full Job Description</h2>
                      <div className="text-gray-700 whitespace-pre-line leading-relaxed text-base">
                        {selectedJob.description}
                      </div>
                    </div>

                    {/* Apply Button at Bottom */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-100">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                        Apply for this position
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Briefcase className="w-20 h-20 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-xl font-semibold">Select a job to view details</p>
                    <p className="text-gray-400 text-sm mt-2">Click on any job from the list</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}