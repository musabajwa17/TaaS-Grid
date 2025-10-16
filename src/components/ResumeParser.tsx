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
import axios from "axios";

// Interfaces
interface Experience {
  role: string;
  company: string;
  years: string;
  description?: string[] | string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}
interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
}
interface Certifications {
  title: string;
}
interface ParsedData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  certifications?: Certifications[];
  projects?: Project[];
  github?: string;
  linkedin?: string;
}

export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // 📤 Handle upload with timeout
  const handleUpload = async (uploadFile: File) => {
    setLoading(true);
    setError(null);
    setParsedData(null);

    const formData = new FormData();
    formData.append("file", uploadFile);

    try {
      const source = axios.CancelToken.source();

      // Timeout after 10 seconds
      const timeout = setTimeout(() => {
        source.cancel(
          "⏰ Parsing Timeout: The uploaded file could not be processed. " +
            "Please ensure it is a valid resume (PDF) and does not exceed the maximum allowed length."
        );
      }, 10000);

      const res = await axios.post(
        "http://127.0.0.1:8000/parse-resume",
        formData,
        {
          cancelToken: source.token,
        }
      );

      clearTimeout(timeout);

      const data: ParsedData = res.data;
     console.log(data)
      // Check required fields
      if (!data.name || !data.skills?.length || !data.education?.length) {
        setError(
          "⚠️ Required fields missing. Name, Skills, and education must be present."
        );
      } else {
        setParsedData(data);
      }
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log(err);
        setError(err.message);
      } else {
        setError("❌ Error parsing resume. Please try again.");
        console.log(err.response.data.error);
        let alertMessage = "An unexpected error occurred.";

        // Make sure we have a string
        let errorStr = err.response?.data;
        if (typeof errorStr !== "string") {
          errorStr = JSON.stringify(errorStr);
        }

        // Extract 'message': '...'
        const match = errorStr.match(/'message':\s*'(.*?)'/);
        if (match && match[1]) {
          let fullMessage = match[1];

          // Split into "lines" by period + space (.) or newline, take first 2 lines
          const lines = fullMessage.split(/\. |\n/).filter(Boolean);
          alertMessage =
            lines.slice(0, 2).join(". ") + (lines.length > 2 ? "..." : "");
        }

        alert(alertMessage);
      }
    } finally {
      setLoading(false);
    }
  };

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
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  {parsedData.name || "John Doe"}
                </h1>
                <p className="text-xl text-indigo-600 mb-4">
                  {parsedData.title || "Professional Title"}
                </p>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  {parsedData.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{parsedData.email}</span>
                    </div>
                  )}
                  {parsedData.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{parsedData.phone}</span>
                    </div>
                  )}
                  {parsedData.location && (
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{parsedData.location}</span>
                    </div>
                  )}
                  {parsedData.linkedin && (
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      <span>{parsedData.linkedin}</span>
                    </div>
                  )}
                  {parsedData.phone && (
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
                  <p className="text-gray-700 leading-relaxed">
                    {parsedData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {parsedData.experience?.length && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Work Experience
                    </h2>
                  </div>
                  {parsedData.experience?.map((exp, idx) => (
                    <div key={idx} className="mb-6 last:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {exp.role}
                      </h3>
                      <p className="text-indigo-600 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {exp.years}
                      </p>
                      {exp.description && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {Array.isArray(exp.description) ? (
                            exp.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))
                          ) : (
                            <li>{exp.description}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {parsedData.education?.length && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Education
                    </h2>
                  </div>
                  {parsedData.education?.map((edu, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {edu.degree}
                      </h3>
                      <p className="text-indigo-600 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {parsedData.skills?.length && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Code className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {parsedData.certifications?.length && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Certifications
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {parsedData.certifications?.map((cert, idx) => (
                      <li key={idx} className="text-gray-700">
                        • {cert.title}
                      </li>
                    ))}
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
