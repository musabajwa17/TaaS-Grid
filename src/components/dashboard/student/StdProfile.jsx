"use client";
import { useEffect, useState } from "react";
import { useResume } from "@/hooks/useStdPreviewResume";
export default function CVPreview({ userId }) {
    const { resume, fetchResume, updateResume, loading } = useResume(userId);
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    summary: "",
    skills: [],
    certifications: [],
    education: [],
    experience: [],
    projects: [],
    filledSuggestions: {
      missing_details: [],
      missing_sections: [],
      suggested_additions: [],
      summary_improvement: []
    }
  });
useEffect(() => {
  const loadResume = async () => {
    const data = await fetchResume();   // Make fetchResume() return the actual resume
    console.log("Fetched Resume Data:", data);
    if (data && data.resume) {
      const r = data.resume;
      setForm({
        name: r.name || "",
        title: r.title || "",
        email: r.email || "",
        phone: r.phone || "",
        location: r.location || "",
        github: r.github || "",
        linkedin: r.linkedin || "",
        summary: r.summary || "",
        skills: r.skills || [],
        certifications: r.certifications || [],
        education: r.education || [],
        experience: r.experience || [],
        projects: r.projects || [],
        filledSuggestions: r.filledSuggestions || {
          missing_details: [],
          missing_sections: [],
          suggested_additions: [],
          summary_improvement: []
        }
      });
    } else {
      // No resume exists → keep empty defaults
      setForm(prev => ({ ...prev }));
    }
  };
  if (userId) loadResume();
}, [userId]);
console.log("Form Data:", resume);
  // --------------------------
  // Handle top-level input
  // --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  // --------------------------
  // Handle array input (skills, etc.)
  // --------------------------
  const updateArrayValue = (arrayName, index, key, value) => {
    setForm((prev) => {
      const newArray = [...prev[arrayName]];
      if (typeof newArray[index] === "string") {
        newArray[index] = value; // for skills
      } else {
        newArray[index] = { ...newArray[index], [key]: value };
      }
      return { ...prev, [arrayName]: newArray };
    });
  };

  // --------------------------
  // Update Resume Handler
  // --------------------------
  const handleUpdate = async () => {
    await updateResume(form);
    alert("Updated Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">

      <h1 className="text-2xl font-bold mb-6 text-center">Update Resume</h1>

      {/* ==============================
          BASIC INFO
      =============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Title" name="title" value={form.title} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input label="GitHub" name="github" value={form.github} onChange={handleChange} />
        <Input label="LinkedIn" name="linkedin" value={form.linkedin} onChange={handleChange} />

      </div>

      {/* SUMMARY */}
      <div className="mt-6">
        <label className="font-semibold">Summary</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mt-1"
          rows="4"
        ></textarea>
      </div>

      {/* ==============================
          SKILLS
      =============================== */}
      <Section title="Skills">
        {form.skills.map((skill, index) => (
          <input
            key={index}
            value={skill}
            onChange={(e) => updateArrayValue("skills", index, null, e.target.value)}
            className="border w-full p-2 rounded mb-2"
          />
        ))}
      </Section>

      {/* ==============================
          CERTIFICATIONS
      =============================== */}
      <Section title="Certifications">
        {form.certifications.map((item, index) => (
          <Input
            key={item._id}
            label={item._id}
            value={item.name}
            onChange={(e) =>
              updateArrayValue("certifications", index, "name", e.target.value)
            }
          />
        ))}
      </Section>

      {/* ==============================
          EDUCATION
      =============================== */}
      <Section title="Education">
        {form.education.map((item, index) => (
          <div key={item._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Degree" value={item.degree} onChange={(e) => updateArrayValue("education", index, "degree", e.target.value)} />
            <Input label="Institution" value={item.institution} onChange={(e) => updateArrayValue("education", index, "institution", e.target.value)} />
            <Input label="Year" value={item.year} onChange={(e) => updateArrayValue("education", index, "year", e.target.value)} />
          </div>
        ))}
      </Section>

      {/* ==============================
          EXPERIENCE
      =============================== */}
      <Section title="Experience">
        {form.experience.map((item, index) => (
          <div key={item._id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Role" value={item.role} onChange={(e) => updateArrayValue("experience", index, "role", e.target.value)} />
            <Input label="Company" value={item.company} onChange={(e) => updateArrayValue("experience", index, "company", e.target.value)} />
            <Input label="Years" value={item.years} onChange={(e) => updateArrayValue("experience", index, "years", e.target.value)} />
          </div>
        ))}
      </Section>

      {/* ==============================
          PROJECTS
      =============================== */}
      <Section title="Projects">
        {form.projects.map((item, index) => (
          <div key={item._id} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input label="Name" value={item.name} onChange={(e) => updateArrayValue("projects", index, "name", e.target.value)} />
            <Input label="Domain" value={item.domain} onChange={(e) => updateArrayValue("projects", index, "domain", e.target.value)} />
            <Input label="Description" value={item.description} onChange={(e) => updateArrayValue("projects", index, "description", e.target.value)} />
            <Input label="Link" value={item.link} onChange={(e) => updateArrayValue("projects", index, "link", e.target.value)} />
          </div>
        ))}
      </Section>

      {/* ==============================
          CONDITIONAL SECTIONS
      =============================== */}
      {form.filledSuggestions.missing_details.length > 0 && (
        <Section title="Missing Details">
          {form.filledSuggestions.missing_details.map((d, i) => (
            <p key={i} className="text-red-600">{d}</p>
          ))}
        </Section>
      )}

      {form.filledSuggestions.missing_sections.length > 0 && (
        <Section title="Missing Sections">
          {form.filledSuggestions.missing_sections.map((d, i) => (
            <p key={i} className="text-blue-600">{d}</p>
          ))}
        </Section>
      )}

      {form.filledSuggestions.suggested_additions.length > 0 && (
        <Section title="Suggested Additions">
          {form.filledSuggestions.suggested_additions.map((d, i) => (
            <p key={i} className="text-green-600">{d}</p>
          ))}
        </Section>
      )}

      {/* ==============================
          UPDATE BUTTON
      =============================== */}
      <button
        onClick={handleUpdate}
        className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
      >
        Update Resume
      </button>
    </div>
  );
}

/* ==========================================================
   REUSABLE SMALL COMPONENTS
========================================================== */

function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col mb-3">
      <label className="font-semibold">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded"
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}
