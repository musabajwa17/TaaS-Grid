import React, { useEffect, useState } from "react";
import {
  CvTemplateProps,
  Experience,
  Education,
  Certification,
  Project,
  ParsedData,
} from "../../../types/ParsedData";
import dynamic from "next/dynamic";
const DownloadEmployeeResume = dynamic(() => import("./DownloadEmployeeResume"), { ssr: false });
import { useUploadCV } from "@/hooks/useUploadCV";
const FinalizedEmployeeResume: React.FC<CvTemplateProps> = ({ parsedData }) => {
  const [cvData, setCvData] = useState<ParsedData>(parsedData);
  const [showDownload, setShowDownload] = useState(false);
  // Save to localStorage & clear old keys
  useEffect(() => {
    if (parsedData) {
      const combinedData = { ...parsedData };
      localStorage.setItem("combinedData", JSON.stringify(combinedData));
      localStorage.removeItem("enrichedData");
      localStorage.removeItem("modifyData");
      localStorage.removeItem("parsedData");

      console.log("✅ combinedData saved to localStorage:", combinedData);
    }
  }, [parsedData]);
  // Fetch CV from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("combinedData");
    if (stored) {
      const data = JSON.parse(stored);
      setCvData(data);
      console.log("📄 Loaded CV from localStorage:", data);
    }
  }, []);
  // Download CV as a real PDF using html2pdf.js
  const { uploadCV } = useUploadCV();

  const handleNewSubmit = async () => {
  // parsedData uploaded
    try {
      if (!parsedData) {
        return alert("No resume data available to upload.");
      }

      // ✅ Trigger the upload function returned by the hook
      await uploadCV(parsedData);

  // uploaded successfully
    } catch (error) {
      console.error("❌ Resume upload failed:", error);
    }
  };

  const handleDownloadClick = () => {
    setShowDownload(true); // ✅ this will render the component
  };
  const {
    name,
    title,
    email,
    phone,
    location,
    summary,
    experience = [],
    education = [],
    skills = [],
    certifications = [],
    projects = [],
    github,
    linkedin,
    filledSuggestions = {},
  } = cvData || ({} as ParsedData);
  const {
    missing_details = [],
    missing_sections = [],
    suggested_additions = [],
  } = filledSuggestions || {};
  return (
    <>
      <div
        className="flex justify-end space-x-3 mb-4
    bg-white my-10 text-black font-sans max-w-4xl mx-auto"
      >
        <button
          onClick={handleNewSubmit}
          className="border border-gray-700 px-4 py-1 text-sm hover:bg-gray-100"
        >
          Submit
        </button>
        <button
          onClick={handleDownloadClick}
          className="border border-gray-700 px-4 py-1 text-sm hover:bg-gray-100"
        >
          Download PDF
        </button>
      </div>
      <div className="bg-white my-5 text-black font-sans p-10 max-w-4xl mx-auto border border-gray-300 shadow-lg">
        <div id="cv-content">
          {/* Header */}
          <header className="text-center border-b border-gray-400 pb-4 mb-6">
            <h1 className="text-3xl font-bold uppercase tracking-wide">
              {name}
            </h1>
            <p className="text-lg font-medium">{title}</p>
            <div className="flex justify-center space-x-4 text-sm mt-2">
              {email && <span>{email}</span>}
              {phone && <span>• {phone}</span>}
              {location && <span>• {location}</span>}
            </div>
            <div className="flex justify-center space-x-4 text-sm mt-1">
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {linkedin}
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {github}
                </a>
              )}
            </div>
          </header>

          {/* Summary */}
          {summary && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Experience
              </h2>
              {experience.map((exp: Experience, index: number) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <span className="text-sm text-gray-700">{exp.years}</span>
                  </div>
                  <p className="italic text-sm">{exp.company}</p>
                  {Array.isArray(exp.description) ? (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  ) : (
                    exp.description && (
                      <p className="text-sm mt-1">{exp.description}</p>
                    )
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Education
              </h2>
              {education.map((edu: Education, index: number) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <span className="text-sm text-gray-700">{edu.year}</span>
                  </div>
                  <p className="italic text-sm">{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="border border-gray-400 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Projects
              </h2>
              {projects.map((proj: Project, index: number) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold">{proj.name}</h3>
                  <p className="text-sm">{proj.description}</p>
                  {proj.domain && (
                    <p className="text-xs text-gray-700 mt-1">
                      <strong>Tech:</strong> {proj.domain}
                    </p>
                  )}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs underline text-gray-700"
                    >
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="mb-6">
              <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-sm">
                {certifications.map((cert: Certification, index: number) => {
                  if (typeof cert === "string")
                    return <li key={index}>{cert}</li>;
                  return (
                    <li key={index}>
                      {cert.title || cert.name}
                      {cert.description && <span> — {cert.description}</span>}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* AI-Suggested Enhancements */}
          {/* AI-Generated Insights */}
          {(missing_details.length > 0 ||
            missing_sections.length > 0 ||
            suggested_additions.length > 0) && (
            <section className="mt-6">
              <h2 className="text-lg font-bold mb-4 border-b border-gray-300 mb-2">
                AI Recommendations to Enhance Your CV
              </h2>

              {/* Achievements & Academic Enhancements */}
              {missing_details.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold mb-1">
                    Achievements & Academic Enhancements
                  </h3>
                  <ul className="list-disc list-inside text-sm leading-snug">
                    {missing_details.map((detail: string, index: number) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recognitions and Intellectual Contributions */}
              {missing_sections.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold mb-2">
                    Recognitions and Intellectual Contributions
                  </h3>
                  <ul className="list-disc list-inside text-sm leading-snug">
                    {missing_sections.map((section: string, index: number) => (
                      <li key={index}>{section}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects, Design, and Technical Enhancements */}
              {suggested_additions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">
                    Projects, Design, and Technical Enhancements
                  </h3>
                  <ul className="list-disc list-inside text-sm leading-snug">
                    {suggested_additions.map(
                      (addition: string, index: number) => (
                        <li key={index}>{addition}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
      {showDownload && <DownloadEmployeeResume data={cvData as any} />}
    </>
  );
};

export default FinalizedEmployeeResume;