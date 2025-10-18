import React, { useState } from 'react';
import { CheckCircle, Download, Mail, Phone, MapPin, Linkedin, Github, User, Briefcase, GraduationCap, Code, Award, Sparkles } from 'lucide-react';

export default function StunningCVDesigner() {
  const [parsedData, setParsedData] = useState({
    name: "Alexandra Morgan",
    title: "Senior Product Designer & Creative Strategist",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan",
    github: "github.com/alexmorgan",
    summary: "Award-winning designer with 8+ years of experience crafting user-centric digital experiences. Specialized in design systems, product strategy, and leading cross-functional teams to deliver innovative solutions that drive business growth.",
    experience: [
      {
        role: "Senior Product Designer",
        company: "TechVision Inc.",
        years: "2021 - Present",
        description: [
          "Led design initiatives for 3 major product launches, resulting in 150% increase in user engagement",
          "Established comprehensive design system used across 12+ products",
          "Mentored team of 5 junior designers and collaborated with 20+ engineers"
        ]
      },
      {
        role: "Product Designer",
        company: "DigitalCraft Studios",
        years: "2018 - 2021",
        description: [
          "Redesigned core user flows, improving conversion rate by 45%",
          "Conducted user research with 200+ participants to inform design decisions"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Fine Arts in Digital Design",
        institution: "Stanford University",
        year: "2018"
      },
      {
        degree: "Bachelor of Arts in Graphic Design",
        institution: "Rhode Island School of Design",
        year: "2016"
      }
    ],
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Design Systems", "Prototyping", "User Research", "React", "CSS/HTML", "Design Thinking"],
    certifications: [
      "Google UX Design Professional Certificate (2023)",
      "Nielsen Norman Group UX Certification (2022)"
    ]
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const downloadPDF = () => {
    console.log("Download PDF functionality");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {parsedData && (
          <div className="space-y-6">
            {/* Success Banner with Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-6 shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="relative flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-xl mb-1">
                    Resume Parsed Successfully! ✨
                  </h3>
                  <p className="text-white/90">
                    Your resume has been transformed into a stunning masterpiece
                  </p>
                </div>
                <button
                  onClick={downloadPDF}
                  className="flex items-center px-6 py-3 bg-white text-teal-600 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Resume Content with Modern Design */}
            <div
              id="resume-content"
              className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -mr-48 -mt-48 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-36 -mb-36 opacity-50"></div>
              
              <div className="relative p-12">
                {/* Header with Gradient Accent */}
                <div className="relative pb-8 mb-8">
                  <div className="absolute left-0 bottom-0 h-1 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>
                  
                  {parsedData.name?.trim() && (
                    <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 tracking-tight">
                      {parsedData.name}
                    </h1>
                  )}

                  {parsedData.title?.trim() && (
                    <p className="text-2xl text-gray-700 mb-6 font-medium">
                      {parsedData.title}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600">
                    {parsedData.email && parsedData.email.trim() !== "" && (
                      <div className="flex items-center group">
                        <div className="bg-indigo-100 p-2 rounded-lg mr-2 group-hover:bg-indigo-200 transition-colors">
                          <Mail className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-sm">{parsedData.email}</span>
                      </div>
                    )}

                    {parsedData.phone && parsedData.phone.trim() !== "" && (
                      <div className="flex items-center group">
                        <div className="bg-purple-100 p-2 rounded-lg mr-2 group-hover:bg-purple-200 transition-colors">
                          <Phone className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm">{parsedData.phone}</span>
                      </div>
                    )}

                    {parsedData.location && parsedData.location.trim() !== "" && (
                      <div className="flex items-center group">
                        <div className="bg-pink-100 p-2 rounded-lg mr-2 group-hover:bg-pink-200 transition-colors">
                          <MapPin className="w-4 h-4 text-pink-600" />
                        </div>
                        <span className="text-sm">{parsedData.location}</span>
                      </div>
                    )}

                    {parsedData.linkedin && parsedData.linkedin.trim() !== "" && (
                      <div className="flex items-center group">
                        <div className="bg-blue-100 p-2 rounded-lg mr-2 group-hover:bg-blue-200 transition-colors">
                          <Linkedin className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm">{parsedData.linkedin}</span>
                      </div>
                    )}

                    {parsedData.github && parsedData.github.trim() !== "" && (
                      <div className="flex items-center group">
                        <div className="bg-gray-100 p-2 rounded-lg mr-2 group-hover:bg-gray-200 transition-colors">
                          <Github className="w-4 h-4 text-gray-700" />
                        </div>
                        <span className="text-sm">{parsedData.github}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary with Accent Box */}
                {parsedData.summary && (
                  <div className="mb-10">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 rounded-xl mr-3 shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Professional Summary
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border-l-4 border-indigo-600">
                      {(() => {
                        let summaryContent: string | string[] = "";
                        const summary = parsedData.summary as
                      | string
                      | string[]
                      | { text?: string }
                      | null
                      | undefined;

                        if (typeof summary === "string") {
                          summaryContent = summary.trim();
                        } else if (Array.isArray(summary)) {
                          summaryContent = summary
                            .filter((s : unknown) => typeof s === "string" && s.trim() !== "")
                            .map((s : string) => s.trim());
                        } else if (summary && typeof summary === "object" && "text" in summary) {
                           summaryContent =
                        typeof summary.text === "string"
                          ? summary.text.trim()
                          : "";
                        }

                        if (Array.isArray(summaryContent)) {
                          return (
                            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                              {summaryContent.map((item, i) => (
                                <li key={i} className="text-base">{item}</li>
                              ))}
                            </ul>
                          );
                        }

                        if (typeof summaryContent === "string" && summaryContent) {
                          return (
                            <p className="text-gray-700 leading-relaxed text-base">
                              {summaryContent}
                            </p>
                          );
                        }

                        return null;
                      })()}
                    </div>
                  </div>
                )}

                {/* Experience with Timeline Design */}
                {Array.isArray(parsedData?.experience) && parsedData.experience.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2.5 rounded-xl mr-3 shadow-lg">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Work Experience
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {parsedData.experience.map((exp : any, idx : number) => {
                        if (typeof exp === "string") {
                          const expText = exp.trim();
                          if (!expText) return null;
                          return (
                            <div key={idx} className="relative pl-8 pb-6 border-l-2 border-purple-200">
                              <div className="absolute left-0 top-0 w-4 h-4 bg-purple-600 rounded-full -ml-2.5"></div>
                              <h3 className="text-xl font-semibold text-gray-800">{expText}</h3>
                            </div>
                          );
                        }

                        const role = typeof exp.role === "string" ? exp.role.trim() : "";
                        const company = typeof exp.company === "string" ? exp.company.trim() : "";
                        const years = typeof exp.years === "string" ? exp.years.trim() : "";

                        let descriptionItems: string[] = [];
                        if (Array.isArray(exp.description)) {
                          descriptionItems = exp.description
                            .filter((d : any) => typeof d === "string" && d.trim() !== "")
                            .map((d : any) => d.trim());
                        } else if (typeof exp.description === "string" && exp.description.trim()) {
                          descriptionItems = [exp.description.trim()];
                        }

                        if (!role && !company && !years && descriptionItems.length === 0) return null;

                        return (
                          <div key={idx} className="relative pl-8 pb-6 border-l-2 border-purple-200 last:border-l-0">
                            <div className="absolute left-0 top-0 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full -ml-2.5 shadow-lg"></div>
                            
                            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                              {role && (
                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                  {role}
                                </h3>
                              )}
                              {company && (
                                <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                  {company}
                                </p>
                              )}
                              {years && (
                                <p className="text-sm text-gray-500 mb-3 flex items-center">
                                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                  {years}
                                </p>
                              )}

                              {descriptionItems.length > 0 && (
                                <ul className="space-y-2 mt-4">
                                  {descriptionItems.map((item, i) => (
                                    <li key={i} className="flex items-start text-gray-700">
                                      <span className="text-purple-600 mr-3 mt-1.5 text-lg">▪</span>
                                      <span className="flex-1">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Education with Card Design */}
                {Array.isArray(parsedData?.education) && parsedData.education.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-pink-600 to-orange-600 p-2.5 rounded-xl mr-3 shadow-lg">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Education
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {parsedData.education.map((edu : any, idx : number) => {
                        if (typeof edu === "string") {
                          const eduText = edu.trim();
                          if (!eduText) return null;
                          return (
                            <div key={idx} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600">
                              <h3 className="text-lg font-semibold text-gray-800">{eduText}</h3>
                            </div>
                          );
                        }

                        const degree = typeof edu.degree === "string" ? edu.degree.trim() : "";
                        const institution = typeof edu.institution === "string" ? edu.institution.trim() : "";
                        const year = typeof edu.year === "string" ? edu.year.trim() : "";

                        if (!degree && !institution && !year) return null;

                        return (
                          <div key={idx} className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600 hover:shadow-lg transition-shadow">
                            {degree && (
                              <h3 className="text-lg font-bold text-gray-800 mb-2">
                                {degree}
                              </h3>
                            )}
                            {institution && (
                              <p className="font-semibold text-pink-700 mb-1">
                                {institution}
                              </p>
                            )}
                            {year && (
                              <p className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                                {year}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Skills with Pill Design */}
                {Array.isArray(parsedData?.skills) && parsedData.skills.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-2.5 rounded-xl mr-3 shadow-lg">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Skills
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {parsedData.skills.map((skill : any, idx : number) => {
                        let skillName = "";

                        if (typeof skill === "string") {
                          skillName = skill.trim();
                        } else if (typeof skill === "object" && (typeof skill.name === "string" || typeof skill.title === "string")) {
                          skillName = (skill.name || skill.title || "").trim();
                        }

                        if (!skillName) return null;

                        const colors = [
                          "from-indigo-500 to-purple-500",
                          "from-purple-500 to-pink-500",
                          "from-pink-500 to-rose-500",
                          "from-cyan-500 to-blue-500",
                          "from-blue-500 to-indigo-500",
                          "from-teal-500 to-cyan-500"
                        ];
                        const colorClass = colors[idx % colors.length];

                        return (
                          <span
                            key={idx}
                            className={`px-5 py-2.5 bg-gradient-to-r ${colorClass} text-white rounded-full font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300`}
                          >
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Certifications with Icon Design */}
                {Array.isArray(parsedData?.certifications) && parsedData.certifications.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2.5 rounded-xl mr-3 shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        Certifications
                      </h2>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 space-y-3">
                      {parsedData.certifications.map((cert : any, idx : number) => {
                        if (typeof cert === "string") {
                          const certText = cert.trim();
                          if (!certText) return null;

                          return (
                            <div key={idx} className="flex items-start text-gray-700">
                              <Sparkles className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="font-medium">{certText}</span>
                            </div>
                          );
                        }

                        const name = typeof cert.name === "string" ? cert.name.trim() : typeof cert.title === "string" ? cert.title.trim() : "";
                        const description = typeof cert.description === "string" ? cert.description.trim() : "";

                        if (!name && !description) return null;

                        return (
                          <div key={idx} className="flex items-start">
                            <Sparkles className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-gray-800 font-medium">{name || "Untitled Certification"}</span>
                              {description && (
                                <p className="text-gray-600 text-sm mt-1 ml-0">
                                  {description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons with Gradient */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={() => {
                //   setParsedData(null);
                  setFile(null);
                  setError(null);
                }}
                className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
              >
                Upload Another Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}