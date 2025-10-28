"use client";
import React, { useState, FormEvent } from "react";
import { Plus } from "lucide-react";
// import FinalizedResume from "./FinalizedResume";
import FinalizedResume from "../../resume/FinalizedResume";
interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  role: string;
  company: string;
  years: string;
}

interface Project {
  name: string;
  technologies: string;
  description: string;
  link: string;
}

interface Certification {
  title: string;
  organization: string;
  year: string;
}
interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  title: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  skills: string[];
}


// NewResume Form Component
const EmployeeResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState<ResumeFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    title: "",
    summary: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ role: "", company: "", years: "" }],
    projects: [{ name: "", technologies: "", description: "", link: "" }],
    certifications: [{ title: "", organization: "", year: "" }],
    skills: [""],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (
    section: keyof ResumeFormData,
    index: number | null,
    field: string,
    value: string
  ) => {
    if (index === null) {
      setFormData({ ...formData, [section]: value as any });
    } else {
      // treat section as an array of records for editing purposes
      const updatedSection = [...(formData[section] as unknown as Record<string, string>[])];
      updatedSection[index] = { ...updatedSection[index], [field]: value };
      setFormData({ ...formData, [section]: updatedSection } as any);
    }
  };

  const addItem = (section: keyof ResumeFormData, emptyItem: unknown) => {
    setFormData({
      ...formData,
      [section]: [...(formData[section] as unknown as unknown[]), emptyItem],
    } as any);
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted Resume Data:", formData);
    setShowPreview(true); // Show finalized resume
  };

  const renderSectionHeader = (
    title: string,
    onAdd?: () => void,
    addText?: string
  ) => (
    <div className="flex items-center justify-between mb-3 border-b border-black pb-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      {onAdd && addText && (
        <button
          type="button"
          onClick={onAdd}
          className="text-black text-sm flex items-center gap-1 font-medium hover:text-gray-700"
        >
          <Plus className="w-4 h-4" />
          <span>{addText}</span>
        </button>
      )}
    </div>
  );

  if (showPreview) {
    return <FinalizedResume parsedData={formData} />;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl border border-gray-200 rounded-2xl my-5 ">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-3">
        Create a New Resume
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Fill out your details to generate a new resume.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Personal Info */}
        {renderSectionHeader("Personal Information")}
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
              value={(formData as unknown as Record<string, string>)[field] || ""}
              onChange={(e) =>
                handleChange(
                  field as keyof ResumeFormData,
                  null,
                  "",
                  e.target.value
                )
              }
              className="border p-2 rounded-md w-full"
            />
          ))}
        </div>

        {/* Summary */}
        {renderSectionHeader("Professional Summary")}
        <textarea
          value={formData.summary}
          onChange={(e) => handleChange("summary", null, "", e.target.value)}
          rows={4}
          className="border p-3 rounded-md w-full"
          placeholder="Enter your professional summary"
        />

        {/* Education */}
        {renderSectionHeader(
          "Education",
          () => addItem("education", { degree: "", institution: "", year: "" }),
          "Add Education"
        )}
        {formData.education.map((edu, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleChange("education", i, "degree", e.target.value)
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleChange("education", i, "institution", e.target.value)
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) =>
                handleChange("education", i, "year", e.target.value)
              }
              className="border p-2 rounded-md"
            />
          </div>
        ))}

        {/* Experience */}
        {renderSectionHeader(
          "Experience",
          () => addItem("experience", { role: "", company: "", years: "" }),
          "Add Experience"
        )}
        {formData.experience.map((exp, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) =>
                handleChange("experience", i, "role", e.target.value)
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleChange("experience", i, "company", e.target.value)
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Years"
              value={exp.years}
              onChange={(e) =>
                handleChange("experience", i, "years", e.target.value)
              }
              className="border p-2 rounded-md"
            />
          </div>
        ))}

        {/* Projects */}
        {renderSectionHeader(
          "Projects",
          () =>
            addItem("projects", {
              name: "",
              technologies: "",
              description: "",
              link: "",
            }),
          "Add Project"
        )}
        {formData.projects.map((proj, i) => (
          <div key={i} className="mb-4 border p-4 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Project Name"
                value={proj.name}
                onChange={(e) =>
                  handleChange("projects", i, "name", e.target.value)
                }
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={proj.technologies}
                onChange={(e) =>
                  handleChange("projects", i, "technologies", e.target.value)
                }
                className="border p-2 rounded-md"
              />
            </div>
            <textarea
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) =>
                handleChange("projects", i, "description", e.target.value)
              }
              rows={3}
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              placeholder="Project Link (optional)"
              value={proj.link}
              onChange={(e) =>
                handleChange("projects", i, "link", e.target.value)
              }
              className="border p-2 rounded-md w-full"
            />
          </div>
        ))}

        {/* Certifications */}
        {renderSectionHeader(
          "Certifications",
          () =>
            addItem("certifications", {
              title: "",
              organization: "",
              year: "",
            }),
          "Add Certification"
        )}
        {formData.certifications.map((cert, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <input
              type="text"
              placeholder="Title"
              value={cert.title}
              onChange={(e) =>
                handleChange("certifications", i, "title", e.target.value)
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Organization"
              value={cert.organization}
              onChange={(e) =>
                handleChange(
                  "certifications",
                  i,
                  "organization",
                  e.target.value
                )
              }
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Year"
              value={cert.year}
              onChange={(e) =>
                handleChange("certifications", i, "year", e.target.value)
              }
              className="border p-2 rounded-md"
            />
          </div>
        ))}

        {/* Skills */}
        {renderSectionHeader("Skills", addSkill, "Add Skill")}
        {formData.skills.map((skill, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Skill ${i + 1}`}
            value={skill}
            onChange={(e) => handleSkillChange(i, e.target.value)}
            className="border p-2 rounded-md w-full mb-2"
          />
        ))}

        {/* Submit */}
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
  );
};

export default EmployeeResumeBuilder;
