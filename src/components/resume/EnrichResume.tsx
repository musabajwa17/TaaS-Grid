"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEnrichResume } from "../../hooks/useEnrichResume";

export default function EnrichResume() {
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [tone, setTone] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const router = useRouter();

  const { enrichResume, enrichedData, loading, error } = useEnrichResume();

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
    if (!parsedData || !enrichedData) return;

    // Combine the original parsed data and AI suggestions
    const combinedData = {
      ...parsedData,
      ai_suggestions: enrichedData.suggestions || {},
    };

    // Save combined data to localStorage to access in ModifyResume
    localStorage.setItem("modifyData", JSON.stringify(combinedData));

    // Navigate to modify resume page
    router.push("/modifyresume");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white rounded-2xl shadow-md border border-gray-100 my-25">
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
        <div className="mt-10 p-6 bg-gray-50 border border-gray-200 rounded-xl">
          <h2 className="text-xl font-semibold text-green-700 mb-2">AI Suggestions</h2>
          <pre className="text-sm bg-white p-4 rounded-lg border border-gray-200 overflow-auto max-h-96">
            {JSON.stringify(enrichedData.suggestions, null, 2)}
          </pre>
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
