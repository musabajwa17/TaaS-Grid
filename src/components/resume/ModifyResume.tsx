'use client';

import { useEffect, useState } from 'react';

export default function ModifyResume() {
  const [formData, setFormData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);
  const [inputs, setInputs] = useState<any>({});

  useEffect(() => {
    const storedData = localStorage.getItem('enrichedData');
    console.log(storedData)
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setFormData(parsed.combined_cv || {});
      setSuggestions(parsed.suggestions || {});
    }
  }, []);

  const handleChange = (section: string, index: number, field: string, value: string) => {
    const updated = { ...formData };
    if (Array.isArray(updated[section])) {
      updated[section][index][field] = value;
    } else {
      updated[section] = value;
    }
    setFormData(updated);
  };

  const handleSuggestionChange = (category: string, index: number, value: string) => {
    setInputs((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedData = [{
      ...formData,
      filledSuggestions: inputs,
    }];
    console.log("Final Combined Resume Data:", combinedData); // array of one object
    alert("Data logged successfully! Check console.");
  };

  if (!formData) return <p className="text-center mt-10 text-gray-600">Loading data...</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl border rounded-xl rounded-2xl my-25">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-3">Modify Your Resume</h1>
      <p className="text-center text-gray-500 mb-8">
        Review your parsed resume and fill in missing or AI-suggested fields.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Personal Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "email", "phone", "location", "linkedin", "github", "title"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ""}
                onChange={(e) => handleChange(field, 0, field, e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            ))}
          </div>
        </section>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Professional Summary</h2>
          <textarea
            value={formData.summary || ""}
            onChange={(e) => handleChange("summary", 0, "summary", e.target.value)}
            rows={4}
            className="border p-3 rounded-md w-full"
            placeholder="Enter your professional summary"
          />
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Education</h2>
          {formData.education?.map((edu: any, i: number) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleChange("education", i, "degree", e.target.value)}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleChange("education", i, "institution", e.target.value)}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleChange("education", i, "year", e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
          ))}
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Experience</h2>
          {formData.experience?.map((exp: any, i: number) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleChange("experience", i, "role", e.target.value)}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleChange("experience", i, "company", e.target.value)}
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Years"
                value={exp.years}
                onChange={(e) => handleChange("experience", i, "years", e.target.value)}
                className="border p-2 rounded-md"
              />
            </div>
          ))}
        </section>

        {/* --- AI Suggestions Section --- */}
        {suggestions && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-[#00bb98]">AI Suggestions</h2>

            {/* Missing Details */}
            {suggestions.missing_details && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Missing Details</h3>
                {suggestions.missing_details.map((detail: string, i: number) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">{detail}</label>
                    <input
                      type="text"
                      placeholder="Add detail..."
                      value={inputs.missing_details?.[i] || ""}
                      onChange={(e) => handleSuggestionChange("missing_details", i, e.target.value)}
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Missing Sections */}
            {suggestions.missing_sections && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Missing Sections</h3>
                {suggestions.missing_sections.map((section: string, i: number) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">{section}</label>
                    <input
                      type="text"
                      placeholder={`Add content for ${section}`}
                      value={inputs.missing_sections?.[i] || ""}
                      onChange={(e) => handleSuggestionChange("missing_sections", i, e.target.value)}
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Additions */}
            {suggestions.suggested_additions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Suggested Additions</h3>
                {suggestions.suggested_additions.map((add: string, i: number) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">{add}</label>
                    <input
                      type="text"
                      placeholder="Add your input..."
                      value={inputs.suggested_additions?.[i] || ""}
                      onChange={(e) => handleSuggestionChange("suggested_additions", i, e.target.value)}
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Summary Improvement */}
            {suggestions.summary_improvement && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Summary Improvement</h3>
                <p className="text-sm text-gray-600 mb-2">{suggestions.summary_improvement}</p>
                <textarea
                  placeholder="Improve your summary here..."
                  value={inputs.summary_improvement?.[0] || ""}
                  onChange={(e) => handleSuggestionChange("summary_improvement", 0, e.target.value)}
                  className="border p-2 rounded-md w-full"
                  rows={3}
                />
              </div>
            )}
          </section>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="px-8 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-[#009f85] transition-all duration-300"
          >
            Submit 
          </button>
        </div>
      </form>
    </div>
  );
}
