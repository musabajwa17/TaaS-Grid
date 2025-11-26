// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function CVEditor({ userId }) {
//   const [form, setForm] = useState(null); // Initially null to check if data exists
//   const [loading, setLoading] = useState(false);
  
//   // ---------------- FETCH RESUME ----------------
//   const fetchResume = async () => {
//     if (!userId) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:3001/api/employee/resume/${userId}`);
//       console.log("Response Data ",res.data)
//       if (res.data && Object.keys(res.data).length > 0) {
//         setForm(res.data.resume);
//       } else {
//         setForm(null); // No resume stored
//       }
//     } catch (error) {
//       console.error("Error fetching resume:", error);
//       setForm(null); // Treat error as no resume stored
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------- UPDATE RESUME ----------------
//   const updateResume = async () => {
//     try {
//       await axios.put(`http://localhost:3001/api/resume/${userId}`, form);
//       alert("Resume updated successfully!");
//     } catch (error) {
//       console.error("Error updating resume:", error);
//       alert("Failed to update resume.");
//     }
//   };

//   useEffect(() => {
//     fetchResume();
//   }, [userId]);

//   // ---------------- HANDLE INPUTS ----------------
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const updateArrayField = (arrayName, index, key, value) => {
//     setForm(prev => {
//       const newArray = [...(prev[arrayName] || [])];
//       if (typeof newArray[index] === "string" || key === null) {
//         newArray[index] = value; // for string arrays
//       } else {
//         newArray[index] = { ...newArray[index], [key]: value };
//       }
//       return { ...prev, [arrayName]: newArray };
//     });
//   };

//   if (loading) return <p>Loading...</p>;

//   if (!form) return <p className="text-center mt-10 font-semibold text-gray-600">No resume stored</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
//       <h1 className="text-2xl font-bold mb-6 text-center">Update Resume</h1>

//       {/* ---------------- BASIC INFO ---------------- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Input label="Name" name="name" value={form.name} onChange={handleChange} />
//         <Input label="Email" name="email" value={form.email} onChange={handleChange} />
//         <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
//       </div>

//       {/* ---------------- EDUCATION ---------------- */}
//       {form.education?.length > 0 && (
//         <Section title="Education">
//           {form.education.map((edu, i) => (
//             <div key={edu._id || i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
//               <Input label="Degree" value={edu.degree} onChange={(e) => updateArrayField("education", i, "degree", e.target.value)} />
//               <Input label="Institution" value={edu.institution} onChange={(e) => updateArrayField("education", i, "institution", e.target.value)} />
//               <Input label="Year" value={edu.year} onChange={(e) => updateArrayField("education", i, "year", e.target.value)} />
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* ---------------- EXPERIENCE ---------------- */}
//       {form.experience?.length > 0 && (
//         <Section title="Experience">
//           {form.experience.map((exp, i) => (
//             <div key={exp._id || i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
//               <Input label="Role" value={exp.role} onChange={(e) => updateArrayField("experience", i, "role", e.target.value)} />
//               <Input label="Company" value={exp.company} onChange={(e) => updateArrayField("experience", i, "company", e.target.value)} />
//               <Input label="Years" value={exp.years} onChange={(e) => updateArrayField("experience", i, "years", e.target.value)} />
//             </div>
//           ))}
//         </Section>
//       )}

//       {/* ---------------- ACHIEVEMENTS ---------------- */}
//       {form.achievements?.length > 0 && (
//         <Section title="Achievements">
//           {form.achievements.map((a, i) => (
//             <Input key={i} label={`Achievement ${i+1}`} value={a} onChange={(e) => updateArrayField("achievements", i, null, e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- TECHNICAL SKILLS ---------------- */}
//       {form.technicalSkills?.length > 0 && (
//         <Section title="Technical Skills">
//           {form.technicalSkills.map((skill, i) => (
//             <Input key={i} label={`Skill ${i+1}`} value={skill} onChange={(e) => updateArrayField("technicalSkills", i, null, e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- BOOKS & PUBLICATIONS ---------------- */}
//       {form.bookAuthorship?.length > 0 && (
//         <Section title="Book Authorship">
//           {form.bookAuthorship.map((b, i) => (
//             <Input key={i} label={`Book ${i+1}`} value={b.title || ""} onChange={(e) => updateArrayField("bookAuthorship", i, "title", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.journalGuestEditor?.length > 0 && (
//         <Section title="Journal Guest Editor">
//           {form.journalGuestEditor.map((j, i) => (
//             <Input key={i} label={`Journal ${i+1}`} value={j.title || ""} onChange={(e) => updateArrayField("journalGuestEditor", i, "title", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.researchPublications?.length > 0 && (
//         <Section title="Research Publications">
//           {form.researchPublications.map((r, i) => (
//             <Input key={i} label={`Publication ${i+1}`} value={r.title || ""} onChange={(e) => updateArrayField("researchPublications", i, "title", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.mssupervised?.length > 0 && (
//         <Section title="MS Supervised">
//           {form.mssupervised.map((m, i) => (
//             <Input key={i} label={`MS Student ${i+1}`} value={m.name || ""} onChange={(e) => updateArrayField("mssupervised", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.phdstudentsupervised?.length > 0 && (
//         <Section title="PhD Students Supervised">
//           {form.phdstudentsupervised.map((p, i) => (
//             <Input key={i} label={`PhD Student ${i+1}`} value={p.name || ""} onChange={(e) => updateArrayField("phdstudentsupervised", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.researchProjects?.length > 0 && (
//         <Section title="Research Projects">
//           {form.researchProjects.map((p, i) => (
//             <Input key={i} label={`Project ${i+1}`} value={p.title || ""} onChange={(e) => updateArrayField("researchProjects", i, "title", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- PROFESSIONAL ACTIVITIES & TRAINING ---------------- */}
//       {form.professionalActivities?.length > 0 && (
//         <Section title="Professional Activities">
//           {form.professionalActivities.map((p, i) => (
//             <Input key={i} label={`Activity ${i+1}`} value={p.name || ""} onChange={(e) => updateArrayField("professionalActivities", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {form.professionalTraining?.length > 0 && (
//         <Section title="Professional Training">
//           {form.professionalTraining.map((p, i) => (
//             <Input key={i} label={`Training ${i+1}`} value={p.name || ""} onChange={(e) => updateArrayField("professionalTraining", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- MEMBERSHIPS ---------------- */}
//       {form.membershipsAndOtherAssociations?.length > 0 && (
//         <Section title="Memberships & Associations">
//           {form.membershipsAndOtherAssociations.map((m, i) => (
//             <Input key={i} label={`Membership ${i+1}`} value={m.name || ""} onChange={(e) => updateArrayField("membershipsAndOtherAssociations", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- REFERENCES ---------------- */}
//       {form.reference?.length > 0 && (
//         <Section title="References">
//           {form.reference.map((r, i) => (
//             <Input key={i} label={`Reference ${i+1}`} value={r.name || ""} onChange={(e) => updateArrayField("reference", i, "name", e.target.value)} />
//           ))}
//         </Section>
//       )}

//       {/* ---------------- AI SUGGESTIONS ---------------- */}
//       {form.ai_suggestions &&
//   Object.entries(form.ai_suggestions)
//     .filter(([_, val]) => Array.isArray(val)) // only arrays allowed
//     .map(([key, arr]) =>
//       arr.length > 0 ? (
//         <Section key={key} title={key.replace(/_/g, " ")}>
//           <ul className="list-disc ml-6 text-sm text-gray-700">
//             {arr.map((item, i) => (
//               <li key={i}>{item}</li>
//             ))}
//           </ul>
//         </Section>
//       ) : null
//     )}


//       {/* ---------------- UPDATE BUTTON ---------------- */}
//       <button
//         onClick={updateResume}
//         className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
//       >
//         Update Resume
//       </button>
//     </div>
//   );
// }

// /* =================================================
//    Reusable Components
// ================================================= */
// function Input({ label, name, value, onChange }) {
//   return (
//     <div className="flex flex-col mb-3">
//       <label className="font-semibold">{label}</label>
//       <input name={name} value={value} onChange={onChange} className="border p-2 rounded" />
//     </div>
//   );
// }

// function Section({ title, children }) {
//   return (
//     <div className="mt-6 border-t pt-4">
//       <h2 className="text-xl font-bold mb-2">{title}</h2>
//       {children}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CVEditor({ userId }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  // Normalize resume so every array is guaranteed to be an array
  const normalize = (data) => {
    const safe = { ...data };
    const arrayFields = [
      "education", "experience", "achievements", "technicalSkills",
      "bookAuthorship", "journalGuestEditor", "researchPublications",
      "mssupervised", "phdstudentsupervised", "researchProjects",
      "professionalActivities", "professionalTraining",
      "membershipsAndOtherAssociations", "reference"
    ];

    arrayFields.forEach((field) => {
      safe[field] = Array.isArray(safe[field]) ? safe[field] : [];
    });

    // AI suggestions normalization
    safe.ai_suggestions = Object.fromEntries(
      Object.entries(safe.ai_suggestions || {}).map(([k, v]) => [
        k,
        Array.isArray(v) ? v : []
      ])
    );

    return safe;
  };

  // ---------------- FETCH RESUME ----------------
  const fetchResume = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3001/api/employee/resume/${userId}`);
      console.log("Response Data ", res.data);
      if (res.data?.resume) {
        setForm(normalize(res.data.resume));
      } else {
        setForm(null);
      }
    } catch (err) {
      console.error("Error fetching resume:", err);
      setForm(null);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UPDATE RESUME ----------------
  const updateResume = async () => {
    try {
      await axios.put(`http://localhost:3001/api/resume/${userId}`, form);
      alert("Resume updated successfully!");
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Failed to update resume.");
    }
  };

  useEffect(() => {
    fetchResume();
  }, [userId]);

  // ---------------- Handle Inputs ----------------
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateArrayField = (arrayName, index, key, value) => {
    setForm((prev) => {
      const arr = Array.isArray(prev[arrayName]) ? [...prev[arrayName]] : [];
      arr[index] =
        typeof arr[index] === "string" || key === null
          ? value
          : { ...arr[index], [key]: value };

      return { ...prev, [arrayName]: arr };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!form) return <p className="text-center mt-10 font-semibold text-gray-600">No resume stored</p>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Update Resume</h1>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
      </div>

      {/* REPEATABLE ARRAY SECTIONS */}
      {renderArraySection("Education", form.education, (edu, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <Input label="Degree" value={edu.degree} onChange={(e) => updateArrayField("education", i, "degree", e.target.value)} />
          <Input label="Institution" value={edu.institution} onChange={(e) => updateArrayField("education", i, "institution", e.target.value)} />
          <Input label="Year" value={edu.year} onChange={(e) => updateArrayField("education", i, "year", e.target.value)} />
        </div>
      ))}

      {renderArraySection("Experience", form.experience, (exp, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <Input label="Role" value={exp.role} onChange={(e) => updateArrayField("experience", i, "role", e.target.value)} />
          <Input label="Company" value={exp.company} onChange={(e) => updateArrayField("experience", i, "company", e.target.value)} />
          <Input label="Years" value={exp.years} onChange={(e) => updateArrayField("experience", i, "years", e.target.value)} />
        </div>
      ))}

      {renderArraySection("Achievements", form.achievements, (ach, i) => (
        <Input key={i} label={`Achievement ${i + 1}`} value={ach} onChange={(e) => updateArrayField("achievements", i, null, e.target.value)} />
      ))}

      {renderArraySection("Technical Skills", form.technicalSkills, (skill, i) => (
        <Input key={i} label={`Skill ${i + 1}`} value={skill} onChange={(e) => updateArrayField("technicalSkills", i, null, e.target.value)} />
      ))}

      {/* Publications etc */}
      {renderArraySection("Book Authorship", form.bookAuthorship, (item, i) => (
        <Input key={i} label={`Book ${i + 1}`} value={item.title || ""} onChange={(e) => updateArrayField("bookAuthorship", i, "title", e.target.value)} />
      ))}

      {renderArraySection("Journal Guest Editor", form.journalGuestEditor, (item, i) => (
        <Input key={i} label={`Journal ${i + 1}`} value={item.title || ""} onChange={(e) => updateArrayField("journalGuestEditor", i, "title", e.target.value)} />
      ))}

      {/* AI SUGGESTIONS (SAFE) */}
      {Object.entries(form.ai_suggestions)
        .filter(([_, val]) => Array.isArray(val) && val.length > 0)
        .map(([key, arr]) => (
          <Section key={key} title={key.replace(/_/g, " ")}>
            <ul className="list-disc ml-6 text-sm text-gray-700">
              {arr.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Section>
        ))}

      {/* UPDATE BUTTON */}
      <button
        onClick={updateResume}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
      >
        Update Resume
      </button>
    </div>
  );
}

/* =================================================
   Reusable Components
================================================= */

function renderArraySection(title, arr, renderFn) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return <Section title={title}>{arr.map(renderFn)}</Section>;
}

function Input({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col mb-3">
      <label className="font-semibold">{label}</label>
      <input name={name} value={value} onChange={onChange} className="border p-2 rounded" />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-6 border-t pt-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}
