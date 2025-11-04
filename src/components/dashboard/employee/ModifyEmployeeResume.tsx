"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadCV } from "@/hooks/useUploadCV";
export default function ModifyEmployeeResume() {
  const { uploadCV } = useUploadCV();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [inputs, setInputs] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  console.log("ModifyEmployeeResume rendered", formData);
  useEffect(() => {
    const storedData = localStorage.getItem("enrichedData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setFormData(parsed.combined_cv || {});
      setSuggestions(parsed.suggestions || {});
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData && !showPreview) {
        router.push("/cvbuilder");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [formData, showPreview, router]);
  if (!formData && !showPreview) {
    return null;
  }
  const handleChange = (
    section: keyof ParsedData,
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      // shallow copy as a generic record to allow indexed updates
      const updated = { ...prev } as Record<string, unknown>;
      const sec = updated[section as string];
      if (Array.isArray(sec)) {
        const arr = sec as unknown[];
        // ensure array item exists and is a record
        const item = {
          ...((arr[index] as Record<string, unknown>) || {}),
        } as Record<string, unknown>;
        item[field] = value;
        updated[section as string] = [...arr];
        (updated[section as string] as unknown[])[index] = item;
      } else {
        updated[section as string] = value;
      }
      return updated as ParsedData;
    });
  };
  const handleSuggestionChange = (
    category: string,
    index: number,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [index]: value,
      },
    }));
  };
  const handleSubmit = async (e) => {
    console.log("Submitting form data...", formData);
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
    console.log("Submitting combined data:", combinedData);
    // 🧹 Clean up old localStorage
    localStorage.removeItem("enrichedData");
    localStorage.removeItem("modifyData");
    localStorage.removeItem("parsedData");
    localStorage.setItem("combinedData", JSON.stringify(combinedData));
    try {
      // 🔥 Upload CV to backend
      // await uploadCV(combinedData);
      await uploadCV(combinedData);
      setFormData(combinedData);
      setShowPreview(true);
    } catch (err: unknown) {
      console.error("CV upload failed:", err);
    }
  };

  if (!formData)
    return <p className="text-center mt-10 text-gray-600">Loading data...</p>;
  // 🧾 Resume Editing Form
  return (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "name",
              "email",
              "phone",
              "location",
              "linkedin",
              "github",
              "title",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={
                  ((formData)[
                    field
                  ]) || ""
                }
                onChange={(e) =>
                  handleChange(
                    field,
                    0,
                    field,
                    e.target.value
                  )
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
          {(formData.researchProjects && formData.researchProjects.length
            ? formData.researchProjects
            : []
          ).map((proj, i) => (
            <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.title || ""}
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

        {Array.isArray(formData.achievements) &&
 formData.achievements.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
      Achievements
    </h2>

    {formData.achievements.map((achievement: string, i: number) => (
      <div key={i} className="mb-3">
        <input
          type="text"
          placeholder={`Achievement #${i + 1}`}
          value={achievement || ""}
          onChange={(e) =>
            handleChange("achievements", i, "", e.target.value)
          }
          className="border p-2 rounded-md w-full"
        />
      </div>
    ))}
  </section>
)}


        {Array.isArray(formData.professionalActivities) &&
 formData.professionalActivities.some(
   (p) => p.heading || p.desc || p.year
 ) && (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
      Professional Activities
    </h2>

    {formData.professionalActivities.map((activity, i) => (
      <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            placeholder="Activity Heading"
            value={activity.heading || ""}
            onChange={(e) =>
              handleChange("professionalActivities", i, "heading", e.target.value)
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Year or Duration"
            value={activity.year || ""}
            onChange={(e) =>
              handleChange("professionalActivities", i, "year", e.target.value)
            }
            className="border p-2 rounded-md"
          />
        </div>

        <textarea
          placeholder="Description"
          value={activity.desc || ""}
          onChange={(e) =>
            handleChange("professionalActivities", i, "desc", e.target.value)
          }
          rows={3}
          className="border p-2 rounded-md w-full"
        />
      </div>
    ))}
  </section>
)}
{Array.isArray(formData.technicalSkills) &&
 formData.technicalSkills.some(
   (skill) => skill.category || skill.details
 ) && (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
      Technical Skills
    </h2>

    {formData.technicalSkills.map((skill, i) => (
      <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            placeholder="Skill Category (e.g. Programming Languages)"
            value={skill.category || ""}
            onChange={(e) =>
              handleChange("technicalSkills", i, "category", e.target.value)
            }
            className="border p-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Skill Details (e.g. Java, Python, C++)"
            value={skill.details || ""}
            onChange={(e) =>
              handleChange("technicalSkills", i, "details", e.target.value)
            }
            className="border p-2 rounded-md"
          />
        </div>
      </div>
    ))}
  </section>
)}
{Array.isArray(formData.bookAuthorship) &&
 formData.bookAuthorship.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
      Authorship
    </h2>

    {formData.bookAuthorship.map((book, i) => (
      <div
        key={i}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 border p-4 rounded-lg bg-gray-50"
      >
        <input
          type="text"
          placeholder="Book Title"
          value={book.title || ""}
          onChange={(e) =>
            handleChange("bookAuthorship", i, "title", e.target.value)
          }
          className="border p-2 rounded-md"
        />
        <input
          type="text"
          placeholder="Publisher"
          value={book.publisher || ""}
          onChange={(e) =>
            handleChange("bookAuthorship", i, "publisher", e.target.value)
          }
          className="border p-2 rounded-md"
        />
      </div>
    ))}
  </section>
)}



        {Array.isArray(formData.reference) &&
 formData.reference.some(
   (r) => r.prof || r.designation || r.mail || r.phone
 ) && (
  <section>
    <h2 className="text-xl font-semibold mb-3 border-b pb-1">
      References
    </h2>
    {formData.reference.map((ref, i) => (
      <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            placeholder="Professor / Name"
            value={ref.prof || ""}
            onChange={(e) =>
              handleChange("reference", i, "prof", e.target.value)
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Designation"
            value={ref.designation || ""}
            onChange={(e) =>
              handleChange("reference", i, "designation", e.target.value)
            }
            className="border p-2 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={ref.mail || ""}
            onChange={(e) =>
              handleChange("reference", i, "mail", e.target.value)
            }
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            value={ref.phone || ""}
            onChange={(e) =>
              handleChange("reference", i, "phone", e.target.value)
            }
            className="border p-2 rounded-md"
          />
        </div>
      </div>
    ))}
  </section>
)}


        

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
                {suggestions.missing_details.map(
                  (detail, i) => (
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
                  )
                )}
              </div>
            )}

            {/* Missing Sections */}
            {suggestions.missing_sections && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Missing Sections
                </h3>
                {suggestions.missing_sections.map(
                  (section, i) => (
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
                  )
                )}
              </div>
            )}

            {/* Suggested Additions */}
            {suggestions.suggested_additions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Suggested Additions
                </h3>
                {suggestions.suggested_additions.map(
                  (add: string, i: number) => (
                    <div key={i} className="flex flex-col mb-3">
                      <label className="text-sm text-gray-600 mb-1">
                        {add}
                      </label>
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
                  )
                )}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
