"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import {
  Upload,
  FileText,
  Download,
  Loader2,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Linkedin,
  Github,
} from "lucide-react";
import { useUploadResume } from "@/hooks/useUploadResume";
export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { loading, error, parsedData, handleUpload, setParsedData, setError } =
    useUploadResume();
  // File input handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  // Drag events
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  // Download placeholder
  const downloadPDF = () => {
    alert("PDF download requires integration with jsPDF or similar library");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 mt-18">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Resume Parser
          </h1>
          <p className="text-gray-600">
            Upload your PDF resume and get structured data instantly
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {/* Upload Section */}
        {!parsedData && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div
              className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {loading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Parsing Resume...
                  </h3>
                  <p className="text-gray-500">
                    Extracting information from your document
                  </p>
                </div>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Drop your resume here
                  </h3>
                  <p className="text-gray-500 mb-6">or click to browse</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Select PDF File
                  </label>
                  {file && (
                    <p className="mt-4 text-sm text-gray-600">
                      Selected: {file.name}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Parsed Resume Display */}
        {parsedData && (
          <div className="space-y-6">
            {/* Success */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">
                  Resume Parsed Successfully!
                </h3>
                <p className="text-sm text-green-600">
                  Your resume has been processed and structured
                </p>
              </div>
              <button
                onClick={downloadPDF}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>

            {/* Resume Content */}
            <div
              id="resume-content"
              className="bg-white rounded-2xl shadow-xl p-10"
            >
              {/* Header */}
              <div className="border-b-2 border-gray-200 pb-6 mb-6">
                {parsedData.name?.trim() && (
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {parsedData.name}
                  </h1>
                )}

                {parsedData.title?.trim() && (
                  <p className="text-xl text-indigo-600 mb-4">
                    {parsedData.title}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-gray-600">
                  {parsedData.email && parsedData.email.trim() !== "" && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{parsedData.email}</span>
                    </div>
                  )}

                  {parsedData.phone && parsedData.phone.trim() !== "" && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{parsedData.phone}</span>
                    </div>
                  )}

                  {parsedData.location && parsedData.location.trim() !== "" && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{parsedData.location}</span>
                    </div>
                  )}

                  {parsedData.linkedin && parsedData.linkedin.trim() !== "" && (
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      <span>{parsedData.linkedin}</span>
                    </div>
                  )}

                  {parsedData.github && parsedData.github.trim() !== "" && (
                    <div className="flex items-center">
                      <Github className="w-4 h-4 mr-2" />
                      <span>{parsedData.github}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {parsedData.summary && (
                <div className="mb-8">
                  <div className="flex items-center mb-3">
                    <User className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Professional Summary
                    </h2>
                  </div>

                  {(() => {
                    // Define summaryContent that can be string or array of strings
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
                        .filter(
                          (s: unknown): s is string =>
                            typeof s === "string" && s.trim() !== ""
                        )
                        .map((s: string) => s.trim());
                    } else if (
                      summary &&
                      typeof summary === "object" &&
                      "text" in summary
                    ) {
                      summaryContent =
                        typeof summary.text === "string"
                          ? summary.text.trim()
                          : "";
                    }

                    if (Array.isArray(summaryContent)) {
                      return (
                        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1">
                          {summaryContent.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    if (typeof summaryContent === "string" && summaryContent) {
                      return (
                        <p className="text-gray-700 leading-relaxed">
                          {summaryContent}
                        </p>
                      );
                    }

                    return null;
                  })()}
                </div>
              )}

              {/* Experience */}
              {Array.isArray(parsedData?.experience) &&
                parsedData.experience.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
                      <h2 className="text-2xl font-bold text-gray-800">
                        Work Experience
                      </h2>
                    </div>

                    {parsedData.experience.map((exp: any, idx: number) => {
                      // Handle simple string case
                      if (typeof exp === "string") {
                        const expText = exp.trim();
                        if (!expText) return null;
                        return (
                          <div key={idx} className="mb-6 last:mb-0">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {expText}
                            </h3>
                          </div>
                        );
                      }

                      // Safely extract and trim fields
                      const role =
                        typeof exp.role === "string" ? exp.role.trim() : "";
                      const company =
                        typeof exp.company === "string"
                          ? exp.company.trim()
                          : "";
                      const years =
                        typeof exp.years === "string" ? exp.years.trim() : "";

                      // Description can be string or array
                      let descriptionItems: string[] = [];
                      if (Array.isArray(exp.description)) {
                        descriptionItems = exp.description
                          .filter(
                            (d: any) => typeof d === "string" && d.trim() !== ""
                          )
                          .map((d: any) => d.trim());
                      } else if (
                        typeof exp.description === "string" &&
                        exp.description.trim()
                      ) {
                        descriptionItems = [exp.description.trim()];
                      }

                      // Skip empty experience
                      if (
                        !role &&
                        !company &&
                        !years &&
                        descriptionItems.length === 0
                      )
                        return null;

                      return (
                        <div key={idx} className="mb-6 last:mb-0">
                          {role && (
                            <h3 className="text-xl font-semibold text-gray-800">
                              {role}
                            </h3>
                          )}
                          {company && (
                            <p className="text-indigo-600 font-medium">
                              {company}
                            </p>
                          )}
                          {years && (
                            <p className="text-sm text-gray-500 mb-2">
                              {years}
                            </p>
                          )}

                          {descriptionItems.length > 0 && (
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                              {descriptionItems.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              {/* Education */}
              {Array.isArray(parsedData?.education) &&
                parsedData.education.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
                      <h2 className="text-2xl font-bold text-gray-800">
                        Education
                      </h2>
                    </div>

                    {parsedData.education.map((edu: any, idx: number) => {
                      // handle string entries
                      if (typeof edu === "string") {
                        const eduText = edu.trim();
                        if (!eduText) return null;
                        return (
                          <div key={idx} className="mb-4 last:mb-0">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {eduText}
                            </h3>
                          </div>
                        );
                      }

                      // safely coerce to string before trimming
                      const degree =
                        typeof edu.degree === "string" ? edu.degree.trim() : "";
                      const institution =
                        typeof edu.institution === "string"
                          ? edu.institution.trim()
                          : "";
                      const year =
                        typeof edu.year === "string" ? edu.year.trim() : "";

                      if (!degree && !institution && !year) return null;

                      return (
                        <div key={idx} className="mb-4 last:mb-0">
                          {degree && (
                            <h3 className="text-xl font-semibold text-gray-800">
                              {degree}
                            </h3>
                          )}
                          {institution && (
                            <p className="text-indigo-600 font-medium">
                              {institution}
                            </p>
                          )}
                          {year && (
                            <p className="text-sm text-gray-500">{year}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              {/* Skills */}
              {Array.isArray(parsedData?.skills) &&
                parsedData.skills.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Code className="w-6 h-6 text-indigo-600 mr-2" />
                      <h2 className="text-2xl font-bold text-gray-800">
                        Skills
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {parsedData.skills.map((skill: any, idx: number) => {
                        let skillName = "";

                        if (typeof skill === "string") {
                          skillName = skill.trim();
                        } else if (
                          typeof skill === "object" &&
                          (typeof skill.name === "string" ||
                            typeof skill.title === "string")
                        ) {
                          skillName = (skill.name || skill.title || "").trim();
                        }

                        if (!skillName) return null;

                        return (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                          >
                            {skillName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Certifications */}
              {Array.isArray(parsedData?.certifications) &&
                parsedData.certifications.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Award className="w-6 h-6 text-indigo-600 mr-2" />
                      <h2 className="text-2xl font-bold text-gray-800">
                        Certifications
                      </h2>
                    </div>

                    <ul className="space-y-2">
                      {parsedData.certifications.map(
                        (cert: any, idx: number) => {
                          // Handle string case
                          if (typeof cert === "string") {
                            const certText = cert.trim();
                            if (!certText) return null;

                            return (
                              <li key={idx} className="text-gray-700">
                                • {certText}
                              </li>
                            );
                          }

                          // Handle object case safely
                          const name =
                            typeof cert.name === "string"
                              ? cert.name.trim()
                              : typeof cert.title === "string"
                              ? cert.title.trim()
                              : "";

                          const description =
                            typeof cert.description === "string"
                              ? cert.description.trim()
                              : "";

                          // Skip if both empty
                          if (!name && !description) return null;

                          return (
                            <li key={idx} className="text-gray-700">
                              • {name || "Untitled Certification"}
                              {description && (
                                <p className="text-gray-500 text-sm ml-4">
                                  {description}
                                </p>
                              )}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setParsedData(null);
                  setFile(null);
                  setError(null);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
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
