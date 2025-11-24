// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState, DragEvent, ChangeEvent } from "react";
// import {
//   Upload,
//   FileText,
//   Loader2,
//   CheckCircle,
//   BookText,
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";
// import { useUploadResume } from "@/hooks/useUploadResume";
// import { useUploadCV } from "@/hooks/useUploadCV";
// import EmployeeCvTemplate from "./EmployeeCvTemplate";
// import EnrichEmployeeResume from "./EnrichEmployeeResume";

// export default function EmployeeCvForge() {
//   const [showFinalized, setShowFinalized] = useState(false);
//   const [, setFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);

//   // ✅ Custom hooks
//   const { loading, error, parsedData, handleUpload, setParsedData, setError } =
//     useUploadResume();
//   const { uploadCV,  uploadingCV } = useUploadCV();
//  console.log("Uploading CV:", parsedData);
//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       const maxSize = 2 * 1024 * 1024; // 2 MB
//       if (selectedFile.size > maxSize) {
//         toast.error("File size exceeds 2 MB. Please upload a smaller PDF.");
//         return;
//       }
//       if (
//         selectedFile.type !== "application/pdf" &&
//         selectedFile.type !==
//           "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//       ) {
//         toast.error("Only PDF or DOCX files are allowed.");
//         return;
//       }
//       setFile(selectedFile);
//       handleUpload(selectedFile);
//     }
//   };

//   // Drag events
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const droppedFile = e.dataTransfer.files?.[0];
//     if (droppedFile) handleUpload(droppedFile);
//   };

//   // ✅ Submit parsed data to backend
//   const handleSubmit = async () => {
//     if (!parsedData) {
//       toast.error("No resume data found to submit!");
//       return;
//     }
//     try {
//       toast.loading("Uploading your resume...");
//       const response = await uploadCV(parsedData);
//       toast.dismiss();
//       toast.success("Resume uploaded successfully!");
//     } catch (err) {
//       toast.dismiss();
//       toast.error("Failed to upload resume.");
//     }
//   };

//   const enrichCv = () => {
//     localStorage.setItem("parsedData", JSON.stringify(parsedData));
//     setShowFinalized(true);
//   };

//     if (showFinalized) {
//       return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//           <div className="max-w-6xl mx-auto">
//             {/* <FinalizedStudentResume /> */}
//             <EnrichEmployeeResume />
//           </div>
//         </div>
//       );
//     }
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
//       <Toaster position="top-center" />

//       <div className="max-w-5xl mx-auto">
//         {/* Error */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700">
//             {error}
//           </div>
//         )}

//         {/* Upload Section */}
//         {!parsedData && (
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <div
//               className={`border-3 border-dashed rounded-xl p-12 text-center transition-all ${
//                 dragActive
//                   ? "border-emerald-500 bg-emerald-50"
//                   : "border-gray-300 hover:border-emerald-400"
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//             >
//               {loading ? (
//                 <div className="flex flex-col items-center">
//                   <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     Parsing Resume...
//                   </h3>
//                   <p className="text-gray-500">
//                     Extracting information from your document
//                   </p>
//                 </div>
//               ) : (
//                 <>
//                   <Upload className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                     Drop your resume here
//                   </h3>
//                   <p className="text-gray-500 mb-4">or click to browse</p>

//                   <input
//                     type="file"
//                     accept=".pdf,.doc,.docx"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     id="file-upload"
//                   />

//                   <label
//                     htmlFor="file-upload"
//                     className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
//                   >
//                     <FileText className="w-5 h-5 mr-2" />
//                     Upload PDF or Word Document
//                   </label>

//                   <p className="text-sm text-gray-400 mt-3">
//                     Supported formats:{" "}
//                     <span className="font-medium text-gray-600">
//                       .pdf, .doc, .docx
//                     </span>{" "}
//                     — Max size:{" "}
//                     <span className="font-medium text-gray-600">2 MB</span>
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Parsed Resume Display */}
//         {parsedData && (
//           <div className="space-y-6">
//             <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
//                 <div>
//                   <h3 className="font-semibold text-green-800">
//                     Resume Parsed Successfully!
//                   </h3>
//                   <p className="text-sm text-green-600">
//                     Your resume has been processed and structured
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={enrichCv}
//                   className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   <BookText className="w-4 h-4 mr-2" />
//                   Enrich CV
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={uploadingCV}
//                   className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
//                     uploadingCV
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                 >
//                   {uploadingCV ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading
//                     </>
//                   ) : (
//                     <>
//                       <FileText className="w-4 h-4 mr-2" /> Submit
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Resume Content */}
//             <EmployeeCvTemplate
//               parsedData={parsedData}
//             />

//             {/* Upload Another */}
//             <div className="flex justify-center">
//               <button
//                 onClick={() => {
//                   setParsedData(null);
//                   setFile(null);
//                   setError(null);
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





/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle, BookText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useUploadResume } from "@/hooks/useUploadResume";
import { useUploadCV } from "@/hooks/useUploadCV";
import EmployeeCvTemplate from "./EmployeeCvTemplate";
import EnrichEmployeeResume from "./EnrichEmployeeResume";
import { useAuth } from "@/auth/AuthContext";

export default function EmployeeCvForge() {
  const {user} = useAuth();
  console.log(user)
  const userID = user._id;
  const { uploadCV, loading: cvLoading } = useUploadCV(userID);
  const [showFinalized, setShowFinalized] = useState(false);
  const [, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

const {
  loading: resumeLoading,
  error,
  parsedData,
  handleUpload,
  setParsedData,
  setError,
} = useUploadResume();
  // ✅ File validation helper
  const validateFile = (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (file.size > maxSize) {
      toast.error("File size exceeds 2 MB. Please upload a smaller PDF.");
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF or DOCX files are allowed.");
      return false;
    }
    return true;
  };

  // ✅ File select
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      handleUpload(selectedFile);
    }
  };

  // ✅ Drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      handleUpload(droppedFile);
    }
  };

  // ✅ Submit parsed data
  const handleSubmit = async () => {
    if (!parsedData) {
      toast.error("No resume data found to submit!");
      return;
    }
    try {
      toast.loading("Uploading your resume...");
      await uploadCV(parsedData);
      toast.dismiss();
      toast.success("Resume uploaded successfully!");
    } catch {
      toast.dismiss();
      toast.error("Failed to upload resume.");
    }
  };

  // ✅ Enrich CV
  const enrichCv = () => {
    localStorage.setItem("parsedData", JSON.stringify(parsedData));
    setShowFinalized(true);
  };

  // ✅ Finalized View
  if (showFinalized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          <EnrichEmployeeResume />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <Toaster position="top-center" />

      <div className="max-w-5xl mx-auto">
        {/* Error Message */}
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
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {resumeLoading ? (
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
                  <Upload className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Drop your resume here
                  </h3>
                  <p className="text-gray-500 mb-4">or click to browse</p>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />

                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Upload PDF or Word Document
                  </label>

                  <p className="text-sm text-gray-400 mt-3">
                    Supported formats:{" "}
                    <span className="font-medium text-gray-600">
                      .pdf, .doc, .docx
                    </span>{" "}
                    — Max size:{" "}
                    <span className="font-medium text-gray-600">2 MB</span>
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Parsed Resume Display */}
        {parsedData && (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    Resume Parsed Successfully!
                  </h3>
                  <p className="text-sm text-green-600">
                    Your resume has been processed and structured
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={enrichCv}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <BookText className="w-4 h-4 mr-2" />
                  Enrich CV
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={cvLoading}
                  className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
                    cvLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {cvLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" /> Submit
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resume Template */}
            <EmployeeCvTemplate parsedData={parsedData} />

            {/* Upload Another */}
            <div className="flex justify-center">
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
