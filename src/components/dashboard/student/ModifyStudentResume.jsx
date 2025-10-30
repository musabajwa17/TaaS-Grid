"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadCV } from "@/hooks/useUploadCV";
import { useUploadStdCV } from "@/hooks/useUploadStudentResume";
import FinalizedStudentResume from "./FinalizedStudentResume";

export default function ModifyStudentResume() {
  const { uploadCV } = useUploadStdCV();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [inputs, setInputs] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    const storedData = localStorage.getItem("enrichedData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setFormData(parsed.combined_cv || {});
      setSuggestions(parsed.suggestions || {});
    }
  }, []);
  if (!formData && !showPreview) {
    return null;
  }
  const handleChange = (section, index, field, value) => {
    setFormData((prev) => {
      if (!prev) return prev;

      const updated = { ...prev };

      // If it's an array (like education, experience, certifications)
      if (Array.isArray(updated[section])) {
        const arr = [...updated[section]];
        const item = { ...(arr[index] || {}) };
        item[field] = value;
        arr[index] = item;
        updated[section] = arr;
      }
      // If it's a top-level field (like name, email, etc.)
      else {
        updated[section] = value;
      }

      return updated;
    });
  };

  const handleSuggestionChange = (category, index, value) => {
    setInputs((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [index]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert object of objects → object of arrays
    const filledSuggestions = {};
    for (const key in inputs) {
      filledSuggestions[key] = Object.values(inputs[key] || {});
    }
    // Combine form data + suggestions
    const combinedData = {
      ...formData,
      filledSuggestions,
    };
    // 🧹 Clean up old localStorage
    localStorage.removeItem("enrichedData");
    localStorage.removeItem("modifyData");
    localStorage.removeItem("parsedData");
    // 💾 Save locally (for offline preview)
    localStorage.setItem("combinedData", JSON.stringify(combinedData));

    // Save combined resume data locally for preview
    try {
      // 🔥 Upload CV to backend
      // await uploadCV(combinedData);
      await uploadCV(combinedData);
      setFormData(combinedData);
      setShowPreview(true);
    } catch (err) {
      console.error("CV upload failed:", err);
    }
  };

  console.log("Form Data:", formData);
  if (!formData)
    return <p className="text-center mt-10 text-gray-600">Loading data...</p>;
  // 🧾 Resume Editing Form
  return (
    <>
      {
        !showPreview ? (
          <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl border rounded-2xl my-5">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-3">
        Modify Your Resume
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Review your parsed resume and fill in missing fields.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Info */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-1">
            Personal Information
          </h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData)
              .filter(([key, value]) => typeof value === "string") // ✅ only text fields
              .map(([field, value]) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={value || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                  className="border p-2 rounded-md w-full"
                />
              ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {["name", "email", "phone", "location", "linkedin", "github", "title"].map((field) => (
    <input
      key={field}
      type="text"
      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
      value={formData?.[field] || ""}
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }))
      }
      className="border p-2 rounded-md w-full"
    />
  ))}
</div>

        </section>

        {/* Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">
            Professional Summary
          </h2>
          <textarea
            value={formData.summary || ""}
            onChange={(e) =>
              handleChange("summary", 0, "summary", e.target.value)
            }
            rows={4}
            className="border p-3 rounded-md w-full"
            placeholder="Enter your professional summary"
          />
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">
            Education
          </h2>
          {formData.education?.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree || ""}
                onChange={(e) =>
                  handleChange("education", i, "degree", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution || ""}
                onChange={(e) =>
                  handleChange("education", i, "institution", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year || ""}
                onChange={(e) =>
                  handleChange("education", i, "year", e.target.value)
                }
                className="border p-2 rounded-md"
              />
            </div>
          ))}
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">
            Experience
          </h2>
          {formData.experience?.map((exp, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <input
                type="text"
                placeholder="Role"
                value={exp.role || ""}
                onChange={(e) =>
                  handleChange("experience", i, "role", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Company"
                value={exp.company || ""}
                onChange={(e) =>
                  handleChange("experience", i, "company", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Years"
                value={exp.years || ""}
                onChange={(e) =>
                  handleChange("experience", i, "years", e.target.value)
                }
                className="border p-2 rounded-md"
              />
            </div>
          ))}
        </section>

        {/* 🧩 Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Projects</h2>
          {(formData.projects && formData.projects.length
            ? formData.projects
            : [{}]
          ).map((proj, i) => (
            <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name || ""}
                  onChange={(e) =>
                    handleChange("projects", i, "name", e.target.value)
                  }
                  className="border p-2 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={proj.technologies || ""}
                  onChange={(e) =>
                    handleChange("projects", i, "technologies", e.target.value)
                  }
                  className="border p-2 rounded-md"
                />
              </div>

              <textarea
                placeholder="Project Description"
                value={proj.description || ""}
                onChange={(e) =>
                  handleChange("projects", i, "description", e.target.value)
                }
                rows={3}
                className="border p-2 rounded-md w-full mb-2"
              />
              <input
                type="text"
                placeholder="Project Link (optional)"
                value={proj.link || ""}
                onChange={(e) =>
                  handleChange("projects", i, "link", e.target.value)
                }
                className="border p-2 rounded-md w-full"
              />
            </div>
          ))}
        </section>

        {/* --- AI Suggestions Section --- */}
        {suggestions && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-[#00bb98]">
              Suggestions
            </h2>

            {/* Missing Details */}
            {suggestions.missing_details && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Missing Details
                </h3>
                {suggestions.missing_details.map((detail, i) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">
                      {detail}
                    </label>
                    <input
                      type="text"
                      placeholder="Add detail..."
                      value={inputs.missing_details?.[i] || ""}
                      onChange={(e) =>
                        handleSuggestionChange(
                          "missing_details",
                          i,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Missing Sections */}
            {suggestions.missing_sections && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Missing Sections
                </h3>
                {suggestions.missing_sections.map((section, i) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">
                      {section}
                    </label>
                    <input
                      type="text"
                      placeholder={`Add content for ${section}`}
                      value={inputs.missing_sections?.[i] || ""}
                      onChange={(e) =>
                        handleSuggestionChange(
                          "missing_sections",
                          i,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Additions */}
            {suggestions.suggested_additions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Suggested Additions
                </h3>
                {suggestions.suggested_additions.map((add, i) => (
                  <div key={i} className="flex flex-col mb-3">
                    <label className="text-sm text-gray-600 mb-1">{add}</label>
                    <input
                      type="text"
                      placeholder="Add your input..."
                      value={inputs.suggested_additions?.[i] || ""}
                      onChange={(e) =>
                        handleSuggestionChange(
                          "suggested_additions",
                          i,
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Summary Improvement */}
            {suggestions.summary_improvement && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Summary Improvement
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {suggestions.summary_improvement}
                </p>
                <textarea
                  placeholder="Improve your summary here..."
                  value={inputs.summary_improvement?.[0] || ""}
                  onChange={(e) =>
                    handleSuggestionChange(
                      "summary_improvement",
                      0,
                      e.target.value
                    )
                  }
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
            Submit & Preview
          </button>
        </div>
      </form>
    </div>
        ): (
          <FinalizedStudentResume parsedData={formData} />
        )
      }
    </>
  );
}
