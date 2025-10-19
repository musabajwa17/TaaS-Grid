import React, { useEffect, useState } from "react";
import {
  CvTemplateProps,
  Experience,
  Education,
  Certification,
  Project,
  ParsedData,
} from "../../types/ParsedData";

const FinalizedResume: React.FC<CvTemplateProps> = ({ parsedData }) => {
  const [cvData, setCvData] = useState<ParsedData>(parsedData);

  // Save to localStorage & clear old keys
  useEffect(() => {
    if (parsedData) {
      const combinedData = { ...parsedData };
      localStorage.setItem("combinedData", JSON.stringify(combinedData));
      localStorage.removeItem("enrichedData");
      localStorage.removeItem("modifyData");
      localStorage.removeItem("parsedData");

      console.log("✅ combinedData saved to localStorage:", combinedData);
    }
  }, [parsedData]);

  // Fetch CV from localStorage
  const fetchFromLocalStorage = () => {
    const stored = localStorage.getItem("combinedData");
    if (stored) {
      const data = JSON.parse(stored);
      setCvData(data);
      console.log("📄 Loaded CV from localStorage:", data);
    }
  };

  // Download CV as a real PDF using html2pdf.js
const downloadPDF = async () => {
  const el = document.getElementById("cv-content");
  if (!el) return;

  try {
    const html2pdfModule: any = await import("html2pdf.js");

    // Clone node for consistent layout
    const clone = el.cloneNode(true) as HTMLElement;
    const wrapper = document.createElement("div");
    wrapper.style.background = "#fff";
    wrapper.style.padding = "0";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Remove interactive elements
    clone.querySelectorAll("button, a").forEach((elem) => elem.remove());

    // Core layout fixes
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
    clone.style.width = "210mm"; // A4 width
    clone.style.minHeight = "297mm";
    clone.style.boxSizing = "border-box";
    clone.style.padding = "18mm"; // increased padding for breathing space
    clone.style.fontFamily = "Arial, sans-serif";
    clone.style.fontSize = "12px";

    // ✅ Fix borders — add under sections only, not under name/title
    const style = document.createElement("style");
    style.textContent = `
      /* Headings for sections only */
      section > h2, .section-title {
        margin-top: 18px !important;
        margin-bottom: 10px !important;
        padding-bottom: 5px;
        border-bottom: 1.5px solid #000 !important;
      }

      /* Remove borders from header elements (name, title, contact info) */
      header h1, header h2, header h3 {
        border: none !important;
        padding-bottom: 0 !important;
        margin-bottom: 4px !important;
      }

      /* Adjust hr spacing */
      hr {
        margin-top: 10px !important;
        margin-bottom: 18px !important;
        border: 0;
        border-top: 1px solid #000;
      }

      /* Center skill boxes neatly */
      .skills-container, .skills-grid, .skills-box {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-wrap: wrap;
        gap: 8px;
      }
    `;
    clone.appendChild(style);

    // ✅ Sanitize unsupported colors
    const sanitizeColors = (element: HTMLElement) => {
      const computed = window.getComputedStyle(element);
      const fixColor = (value: string): string =>
        value.includes("lab(") || value.includes("oklab(") || value.includes("var(")
          ? "#000000"
          : value;
      const fixBackground = (value: string): string =>
        value.includes("lab(") ||
        value.includes("oklab(") ||
        value.includes("var(") ||
        value.includes("gradient")
          ? "#ffffff"
          : value;

      element.style.color = fixColor(computed.color);
      element.style.backgroundColor = fixBackground(computed.backgroundColor);
      element.style.borderColor = fixColor(computed.borderColor);
      element.style.backgroundImage = "none";

      Array.from(element.children).forEach((child) =>
        sanitizeColors(child as HTMLElement)
      );
    };

    sanitizeColors(clone);

    // ✅ PDF Options
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${(cvData?.name || "resume").replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdfModule().set(opt).from(clone).save();

    document.body.removeChild(wrapper);
  } catch (err) {
    console.error("Failed to generate PDF:", err);
  }
};





  const {
    name,
    title,
    email,
    phone,
    location,
    summary,
    experience = [],
    education = [],
    skills = [],
    certifications = [],
    projects = [],
    github,
    linkedin,
    filledSuggestions = {},
  } = cvData || ({} as ParsedData);

  const {
    missing_details = [],
    missing_sections = [],
    suggested_additions = [],
  } = filledSuggestions as any;

  return (
    <>
    <div className="flex justify-end space-x-3 mb-4
    bg-white my-25 text-black font-sans max-w-4xl mx-auto">
        <button
          onClick={downloadPDF}
          className="border border-gray-700 px-4 py-1 text-sm hover:bg-gray-100"
        >
          Download PDF
        </button>
      </div>
    <div className="bg-white my-5 text-black font-sans p-10 max-w-4xl mx-auto border border-gray-300 shadow-lg">
      <div id="cv-content">
        {/* Header */}
        <header className="text-center border-b border-gray-400 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{name}</h1>
          <p className="text-lg font-medium">{title}</p>
          <div className="flex justify-center space-x-4 text-sm mt-2">
            {email && <span>{email}</span>}
            {phone && <span>• {phone}</span>}
            {location && <span>• {location}</span>}
          </div>
          <div className="flex justify-center space-x-4 text-sm mt-1">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noreferrer" className="underline">
                {linkedin}
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="underline">
                {github}
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Experience
            </h2>
            {experience.map((exp: Experience, index: number) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{exp.role}</h3>
                  <span className="text-sm text-gray-700">{exp.years}</span>
                </div>
                <p className="italic text-sm">{exp.company}</p>
                {Array.isArray(exp.description) ? (
                  <ul className="list-disc list-inside text-sm mt-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  exp.description && (
                    <p className="text-sm mt-1">{exp.description}</p>
                  )
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Education
            </h2>
            {education.map((edu: Education, index: number) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-gray-700">{edu.year}</span>
                </div>
                <p className="italic text-sm">{edu.institution}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="border border-gray-400 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Projects
            </h2>
            {projects.map((proj: Project, index: number) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold">{proj.name}</h3>
                <p className="text-sm">{proj.description}</p>
                {proj.domain && (
                  <p className="text-xs text-gray-700 mt-1">
                    <strong>Tech:</strong> {proj.domain}
                  </p>
                )}
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline text-gray-700"
                  >
                    {proj.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="font-bold text-lg border-b border-gray-300 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-sm">
              {certifications.map((cert: Certification, index: number) => {
                if (typeof cert === "string") return <li key={index}>{cert}</li>;
                return (
                  <li key={index}>
                    {cert.title || cert.name}
                    {cert.description && <span> — {cert.description}</span>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* AI-Suggested Enhancements */}
       {/* AI-Generated Insights */}
{(missing_details.length > 0 ||
  missing_sections.length > 0 ||
  suggested_additions.length > 0) && (
  <section className="mt-6">
    <h2 className="text-lg font-bold mb-4 border-b border-gray-300 mb-2">
      AI Recommendations to Enhance Your CV
    </h2>

    {/* Achievements & Academic Enhancements */}
    {missing_details.length > 0 && (
      <div className="mb-5">
        <h3 className="font-semibold mb-1">
          Achievements & Academic Enhancements
        </h3>
        <ul className="list-disc list-inside text-sm leading-snug">
          {missing_details.map((detail: string, index: number) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Recognitions and Intellectual Contributions */}
    {missing_sections.length > 0 && (
      <div className="mb-5">
        <h3 className="font-semibold mb-2">
          Recognitions and Intellectual Contributions
        </h3>
        <ul className="list-disc list-inside text-sm leading-snug">
          {missing_sections.map((section: string, index: number) => (
            <li key={index}>{section}</li>
          ))}
        </ul>
      </div>
    )}

    {/* Projects, Design, and Technical Enhancements */}
    {suggested_additions.length > 0 && (
      <div>
        <h3 className="font-semibold mb-2">
          Projects, Design, and Technical Enhancements
        </h3>
        <ul className="list-disc list-inside text-sm leading-snug">
          {suggested_additions.map((addition: string, index: number) => (
            <li key={index}>{addition}</li>
          ))}
        </ul>
      </div>
    )}
  </section>
)}

      </div>
    </div>
    </>
  );
};

export default FinalizedResume;
