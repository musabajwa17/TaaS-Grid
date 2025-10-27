"use client";
import React, { useState, DragEvent, ChangeEvent, useEffect } from "react";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle,
  BookText,
  Search,
} from "lucide-react";
import { useUploadResume } from "@/hooks/useUploadResume";
import { useRouter } from "next/navigation";
import ResumeTemplate from "../../resume/ResumeTemplate";
export default function CvForge() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { loading, error, parsedData, handleUpload, setParsedData, setError } =
    useUploadResume();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes

      if (selectedFile.size > maxSize) {
        alert("File size exceeds 2 MB. Please upload a smaller PDF file.");
        e.target.value = ""; // reset file input
        return;
      }

      if (selectedFile.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        e.target.value = "";
        return;
      }

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
  const handleNewResume = () => {
    router.push("/newresume");
  };
  // Download placeholder
  const downloadPDF = () => {
    alert("PDF download requires integration with jsPDF or similar library");
  };
  const enrichCv = () => {
    localStorage.setItem("parsedData", JSON.stringify(parsedData));
    router.push("/enrichcv");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Resume Parser & Builder
          </h1>
          <p className="text-gray-600 mb-4">
            Upload your PDF resume and get structured data instantly
          </p>

          <button
            onClick={() => handleNewResume() }
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-200"
          >
            Create New Resume
          </button>
        </div> */}

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
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-400"
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
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Upload PDF or Word Document
                  </label>

                  <p className="text-sm text-gray-400 mt-3">
                    Supported formats:{" "}
                    <span className="font-medium text-gray-600">
                      .pdf, .doc, .docx
                    </span>{" "}
                    — Max file size:{" "}
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
              <div className="flex gap-3">
                <button
                  onClick={enrichCv}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <BookText className="w-4 h-4 mr-2" />
                  Enrich CV
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Job Search
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <ResumeTemplate parsedData={parsedData} />

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
