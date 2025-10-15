// import React, { useState } from 'react';
// import { Upload, FileText, Download, Loader2, CheckCircle, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code } from 'lucide-react';

// export default function ResumeParser() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [parsedData, setParsedData] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   const handleUpload = async (uploadFile: any) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("resume", uploadFile);
    
//     try {
//       const res = await fetch("/api/parse-resume", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       console.log("✅ Parsed Resume Data:", data);
//       setParsedData(data);
//     } catch (error) {
//       console.error("Error parsing resume:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e : any) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile && selectedFile.type === 'application/pdf') {
//       setFile(selectedFile);
//       handleUpload(selectedFile);
//     }
//   };

//   const handleDrag = (e: any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e : any) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile && droppedFile.type === 'application/pdf') {
//       setFile(droppedFile);
//       handleUpload(droppedFile);
//     }
//   };

//   const downloadPDF = () => {
//     const element = document.getElementById('resume-content');
//     // This is a placeholder - you'll need to integrate a library like jsPDF or html2pdf
//     console.log('Downloading resume...', element);
//     alert('PDF download functionality requires integration with jsPDF or similar library');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Parser</h1>
//           <p className="text-gray-600">Upload your PDF resume and get structured data instantly</p>
//         </div>

//         {/* Upload Section */}
//         {!parsedData && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <div
//               className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
//                 dragActive
//                   ? 'border-indigo-500 bg-indigo-50'
//                   : 'border-gray-300 hover:border-indigo-400'
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//             >
//               {loading ? (
//                 <div className="flex flex-col items-center">
//                   <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">Parsing Resume...</h3>
//                   <p className="text-gray-500">Extracting information from your document</p>
//                 </div>
//               ) : (
//                 <>
//                   <Upload className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     Drop your resume here
//                   </h3>
//                   <p className="text-gray-500 mb-6">or click to browse</p>
//                   <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     id="file-upload"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
//                   >
//                     <FileText className="w-5 h-5 mr-2" />
//                     Select PDF File
//                   </label>
//                   {file && (
//                     <p className="mt-4 text-sm text-gray-600">
//                       Selected: {file.name}
//                     </p>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Parsed Resume Display */}
//         {parsedData && (
//           <div className="space-y-6">
//             {/* Success Message */}
//             <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
//               <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
//               <div className="flex-1">
//                 <h3 className="font-semibold text-green-800">Resume Parsed Successfully!</h3>
//                 <p className="text-sm text-green-600">Your resume has been processed and structured</p>
//               </div>
//               <button
//                 onClick={downloadPDF}
//                 className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download PDF
//               </button>
//             </div>

//             {/* Resume Content */}
//             <div id="resume-content" className="bg-white rounded-2xl shadow-xl p-10">
//               {/* Header Section */}
//               <div className="border-b-2 border-gray-200 pb-6 mb-6">
//                 <h1 className="text-4xl font-bold text-gray-800 mb-2">
//                   {parsedData.name || 'John Doe'}
//                 </h1>
//                 <p className="text-xl text-indigo-600 mb-4">
//                   {parsedData.title || 'Professional Title'}
//                 </p>
//                 <div className="flex flex-wrap gap-4 text-gray-600">
//                   {parsedData.email && (
//                     <div className="flex items-center">
//                       <Mail className="w-4 h-4 mr-2" />
//                       <span>{parsedData.email}</span>
//                     </div>
//                   )}
//                   {parsedData.phone && (
//                     <div className="flex items-center">
//                       <Phone className="w-4 h-4 mr-2" />
//                       <span>{parsedData.phone}</span>
//                     </div>
//                   )}
//                   {parsedData.location && (
//                     <div className="flex items-center">
//                       <MapPin className="w-4 h-4 mr-2" />
//                       <span>{parsedData.location}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Summary */}
//               {parsedData.summary && (
//                 <div className="mb-8">
//                   <div className="flex items-center mb-3">
//                     <User className="w-6 h-6 text-indigo-600 mr-2" />
//                     <h2 className="text-2xl font-bold text-gray-800">Professional Summary</h2>
//                   </div>
//                   <p className="text-gray-700 leading-relaxed">{parsedData.summary}</p>
//                 </div>
//               )}

//               {/* Experience */}
//               {parsedData.experience && parsedData.experience.length > 0 && (
//                 <div className="mb-8">
//                   <div className="flex items-center mb-4">
//                     <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
//                     <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
//                   </div>
//                   {parsedData.experience.map((exp, idx) => (
//                     <div key={idx} className="mb-6 last:mb-0">
//                       <h3 className="text-xl font-semibold text-gray-800">{exp.position}</h3>
//                       <p className="text-indigo-600 font-medium">{exp.company}</p>
//                       <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
//                       {exp.description && (
//                         <ul className="list-disc list-inside text-gray-700 space-y-1">
//                           {Array.isArray(exp.description) ? (
//                             exp.description.map((item, i) => <li key={i}>{item}</li>)
//                           ) : (
//                             <li>{exp.description}</li>
//                           )}
//                         </ul>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Education */}
//               {parsedData.education && parsedData.education.length > 0 && (
//                 <div className="mb-8">
//                   <div className="flex items-center mb-4">
//                     <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
//                     <h2 className="text-2xl font-bold text-gray-800">Education</h2>
//                   </div>
//                   {parsedData.education.map((edu, idx) => (
//                     <div key={idx} className="mb-4 last:mb-0">
//                       <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
//                       <p className="text-indigo-600 font-medium">{edu.institution}</p>
//                       <p className="text-sm text-gray-500">{edu.year}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Skills */}
//               {parsedData.skills && parsedData.skills.length > 0 && (
//                 <div className="mb-8">
//                   <div className="flex items-center mb-4">
//                     <Code className="w-6 h-6 text-indigo-600 mr-2" />
//                     <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {parsedData.skills.map((skill, idx) => (
//                       <span
//                         key={idx}
//                         className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Certifications */}
//               {parsedData.certifications && parsedData.certifications.length > 0 && (
//                 <div className="mb-8">
//                   <div className="flex items-center mb-4">
//                     <Award className="w-6 h-6 text-indigo-600 mr-2" />
//                     <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
//                   </div>
//                   <ul className="space-y-2">
//                     {parsedData.certifications.map((cert, idx) => (
//                       <li key={idx} className="text-gray-700">
//                         • {cert}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={() => {
//                   setParsedData(null);
//                   setFile(null);
//                 }}
//                 className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//               >
//                 Upload Another Resume
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


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
} from "lucide-react";
import axios from "axios";

// Define interfaces for parsed resume data
interface Experience {
  position: string;
  company: string;
  duration: string;
  description?: string[] | string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
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
  certifications?: string[];
}

export default function ResumeParser() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // 📤 Handle upload to API
const handleUpload = async (uploadFile: File) => {
  setLoading(true);

  const formData = new FormData();
  formData.append("file", uploadFile); // key must match FastAPI endpoint

  // Debug FormData contents
  for (const [key, value] of formData.entries()) {
    console.log("FormData entry:", key, value);
  }

  try {
    // Call your FastAPI endpoint
    const res = await axios.post("http://127.0.0.1:8000/parse-resume", formData);
    
    console.log("✅ Parsed Resume Data:", res.data);
    setParsedData(res.data); // store the structured JSON directly

  } catch (error: any) {
    console.error("Error parsing resume:", error);
    setParsedData(null);
  } finally {
    setLoading(false);
  }
};


  // 📁 When user selects file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  // 🖱️ Drag-and-drop events
  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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

  // 🧾 Placeholder download (you can integrate jsPDF later)
  const downloadPDF = () => {
    alert("PDF download functionality requires integration with jsPDF or similar library");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Parser</h1>
          <p className="text-gray-600">Upload your PDF resume and get structured data instantly</p>
        </div>

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
                    <p className="mt-4 text-sm text-gray-600">Selected: {file.name}</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* Parsed Resume Display */}
        {parsedData && (
          <div className="space-y-6">
            {/* Success Message */}
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
            <div id="resume-content" className="bg-white rounded-2xl shadow-xl p-10">
              {/* Header Section */}
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
              {parsedData.experience && parsedData.experience.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Work Experience
                    </h2>
                  </div>
                  {parsedData.experience.map((exp, idx) => (
                    <div key={idx} className="mb-6 last:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {exp.position}
                      </h3>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                      {exp.description && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {Array.isArray(exp.description)
                            ? exp.description.map((item, i) => <li key={i}>{item}</li>)
                            : <li>{exp.description}</li>}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {parsedData.education && parsedData.education.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                  </div>
                  {parsedData.education.map((edu, idx) => (
                    <div key={idx} className="mb-4 last:mb-0">
                      <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                      <p className="text-indigo-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {parsedData.skills && parsedData.skills.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Code className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills.map((skill, idx) => (
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
              {parsedData.certifications && parsedData.certifications.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-indigo-600 mr-2" />
                    <h2 className="text-2xl font-bold text-gray-800">
                      Certifications
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {parsedData.certifications.map((cert, idx) => (
                      <li key={idx} className="text-gray-700">
                        • {cert}
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
