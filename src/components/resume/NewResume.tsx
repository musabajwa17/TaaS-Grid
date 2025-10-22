'use client';
import React, { useState, FormEvent } from "react";

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
}

const NewResume: React.FC = () => {
  const [formData, setFormData] = useState<ResumeFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    title: "",
    summary: "",
    education: [
      { degree: "", institution: "", year: "" }
    ],
    experience: [
      { role: "", company: "", years: "" }
    ],
    projects: [
      { name: "", technologies: "", description: "", link: "" }
    ],
  });

  const handleChange = (
    section: keyof ResumeFormData,
    index: number | null,
    field: string,
    value: string
  ) => {
    if (index === null) {
      // top-level field
      setFormData({ ...formData, [section]: value });
    } else {
      // nested array field (education, experience, projects)
      const updatedSection = [...(formData[section] as any)];
      updatedSection[index][field] = value;
      setFormData({ ...formData, [section]: updatedSection });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted Resume Data:", formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl border rounded-2xl my-20">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-3">
        Create a New Resume
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Fill out your details to generate a new resume.
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
                value={(formData as any)[field]}
                onChange={(e) =>
                  handleChange(field as keyof ResumeFormData, null, "", e.target.value)
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
            value={formData.summary}
            onChange={(e) => handleChange("summary", null, "", e.target.value)}
            rows={4}
            className="border p-3 rounded-md w-full"
            placeholder="Enter your professional summary"
          />
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Education</h2>
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
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Experience</h2>
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
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-semibold mb-3 border-b pb-1">Projects</h2>
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
        </section>

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

export default NewResume;
