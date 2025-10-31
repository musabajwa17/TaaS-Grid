"use client";

import { useState, useEffect } from "react";
import { useEnrichResume } from "@/hooks/useEnrichResume";
import ModifyEmployeeResume from "./ModifyEmployeeResume";

export default function EnrichEmployeeResume() {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [tone, setTone] = useState("");
  const [showModifyResume, setShowModifyResume] = useState(false);
 const [parsedData, setParsedData] = useState<Record<string, unknown> | null>(null);

  const { enrichResume, enrichedData, loading, error } = useEnrichResume();

  type Suggestions = {
    summary_improvement?: string;
    missing_sections?: string[];
    missing_details?: string[];
    suggested_additions?: string[];
    tone_recommendation?: string;
  };

  const suggestions = enrichedData ? (enrichedData as { suggestions?: Suggestions }).suggestions : undefined;
  useEffect(() => {
    const stored = localStorage.getItem("parsedData");
    if (stored) setParsedData(JSON.parse(stored));
  }, []);

  const handleSubmit = async () => {
    if (!role || !industry || !experience || !tone) {
      alert("Please select all fields before proceeding.");
      return;
    }

    await enrichResume(parsedData, {
      role,
      industry,
      experience_level: experience,
      tone,
    });
  };

  // ✅ Handle modify navigation
 const handleModifyResume = () => {
    if (!parsedData || !enrichedData) {
      alert("Parse your resume first");
      return;
    }

    // Combine parsed data + AI suggestions
    const combinedData = {
      ...parsedData,
      ai_suggestions: suggestions || {},
    };

    localStorage.setItem("modifyData", JSON.stringify(combinedData));

    // ✅ Instead of routing, toggle the view
    setShowModifyResume(true);
  };
  if (showModifyResume) {
  return <ModifyEmployeeResume />;
}

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-2xl shadow-md border border-gray-100 my-5">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        Enrich Your CV with AI
      </h1>
      <p className="text-gray-600 text-center mt-2">
        Select your preferences below to generate a tailored and professional CV enhancement.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <Dropdown
          label="Target Role"
          value={role}
          onChange={setRole}
          options={["Frontend Developer", "Backend Developer", "Data Analyst", "Project Manager", "UI/UX Designer"]}
        />
        <Dropdown
          label="Industry"
          value={industry}
          onChange={setIndustry}
          options={["Technology", "Finance", "Education", "Healthcare", "Marketing"]}
        />
        <Dropdown
          label="Experience Level"
          value={experience}
          onChange={setExperience}
          options={["Entry Level", "Mid Level", "Senior Level"]}
        />
        <Dropdown
          label="Tone"
          value={tone}
          onChange={setTone}
          options={["Formal", "Friendly", "Technical", "Concise"]}
        />
      </div>

      <div className="flex justify-center mt-10 space-x-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Enriching..." : "Generate Enriched CV"}
        </button>

        {/* ✅ Show Modify CV button only when enriched data is available */}
        {enrichedData && (
          <button
            onClick={handleModifyResume}
            className="px-8 py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300"
          >
            Modify Your CV
          </button>
        )}
      </div>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      {enrichedData && (
  <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm">
    <h2 className="text-2xl font-semibold text-green-700 mb-6 flex items-center gap-2">
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
        AI Suggestions
      </span>
    </h2>

    <div className="space-y-6">
      {/* Summary Improvement */}
  {suggestions?.summary_improvement && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📝 Summary Improvement</h3>
          <p className="text-gray-600 leading-relaxed">
            {suggestions?.summary_improvement}
          </p>
        </div>
      )}

      {/* Missing Sections */}
  {Array.isArray(suggestions?.missing_sections) && suggestions!.missing_sections!.length > 0 && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📂 Missing Sections</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {suggestions!.missing_sections!.map((section: string, i: number) => (
              <li key={i}>{section}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Details */}
  {Array.isArray(suggestions?.missing_details) && suggestions!.missing_details!.length > 0 && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">⚠️ Missing Details</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {suggestions!.missing_details!.map((detail: string, i: number) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Additions */}
  {Array.isArray(suggestions?.suggested_additions) && suggestions!.suggested_additions!.length > 0 && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Suggested Additions</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {suggestions!.suggested_additions!.map((addition: string, i: number) => (
              <li key={i}>{addition}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tone Recommendation */}
  {suggestions?.tone_recommendation && (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Tone Recommendation</h3>
          <p className="text-gray-600 leading-relaxed">
            {suggestions?.tone_recommendation}
          </p>
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00bb98] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase().replace(/\s+/g, "-")}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
