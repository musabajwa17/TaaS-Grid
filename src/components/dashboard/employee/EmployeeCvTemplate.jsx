import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Star,
  Users,
  Wrench,
  Target,
  Newspaper,
  Book,
  ClipboardList,
  UserCheck,
} from "lucide-react";

const EmployeeCvTemplate = ({ parsedData }) => {
  const hasArray = (arr) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  arr.some((a) => a !== null && a !== undefined);



  return (
    <div
      id="resume-content"
      role="main"
      aria-label="Resume Content"
      className="relative bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100 to-transparent rounded-full -mr-48 -mt-48 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-100 to-transparent rounded-full -ml-36 -mb-36 opacity-50"></div>

      <div className="relative p-12">
        {/* HEADER */}
        <div className="relative pb-8 mb-8">
          <div className="absolute left-0 bottom-0 h-1 w-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full"></div>

          {parsedData.name && (
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 tracking-tight">
              {parsedData.name}
            </h1>
          )}

          {parsedData.title && (
            <p className="text-2xl text-gray-700 mb-6 font-medium">
              {parsedData.title}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-600">
            {parsedData.email && (
              <div className="flex items-center group">
                <div className="bg-indigo-100 p-2 rounded-lg mr-2 group-hover:bg-indigo-200 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-sm">{parsedData.email}</span>
              </div>
            )}

            {parsedData.phone && (
              <div className="flex items-center group">
                <div className="bg-purple-100 p-2 rounded-lg mr-2 group-hover:bg-purple-200 transition-colors">
                  <Phone className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm">{parsedData.phone}</span>
              </div>
            )}

            {parsedData.location && (
              <div className="flex items-center group">
                <div className="bg-pink-100 p-2 rounded-lg mr-2 group-hover:bg-pink-200 transition-colors">
                  <MapPin className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-sm">{parsedData.location}</span>
              </div>
            )}

            {parsedData.linkedin && (
              <div className="flex items-center group">
                <div className="bg-blue-100 p-2 rounded-lg mr-2 group-hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm">{parsedData.linkedin}</span>
              </div>
            )}

            {parsedData.github && (
              <div className="flex items-center group">
                <div className="bg-gray-100 p-2 rounded-lg mr-2 group-hover:bg-gray-200 transition-colors">
                  <Github className="w-4 h-4 text-gray-700" />
                </div>
                <span className="text-sm">{parsedData.github}</span>
              </div>
            )}
          </div>
        </div>

        {/* PROFESSIONAL SUMMARY */}
        {parsedData.summary && (
          <Section
            title="Professional Summary"
            icon={<User className="w-6 h-6 text-white" />}
          >
            <p className="text-gray-700 leading-relaxed text-base">
              {Array.isArray(parsedData.summary)
                ? parsedData.summary.join(", ")
                : parsedData.summary}
            </p>
          </Section>
        )}
        {/* WORK EXPERIENCE */}
        {Array.isArray(parsedData.experience) && parsedData.experience.length > 0 && (
  <Section
    title="Work Experience"
    icon={<Briefcase className="w-6 h-6 text-white" />}
    gradient="from-purple-600 to-pink-600"
  >
    {parsedData.experience.map((exp, idx) => (
      <div key={idx} className="mb-5">
        {exp.role && (
          <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
        )}
        {exp.company && (
          <p className="text-sm text-gray-500">{exp.company}</p>
        )}
        {exp.years && (
          <p className="text-sm text-gray-500">{exp.years}</p>
        )}

        {Array.isArray(exp.description) && exp.description.length > 0 && (
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {exp.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}

        {typeof exp.description === "string" && exp.description.trim() !== "" && (
          <p className="text-gray-700 mt-2">{exp.description}</p>
        )}
      </div>
    ))}
  </Section>
)}
        {/* EDUCATION */}
       {Array.isArray(parsedData.education) && parsedData.education.length > 0 && (
  <Section
    title="Education"
    icon={<GraduationCap className="w-6 h-6 text-white" />}
    gradient="from-pink-600 to-orange-600"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {parsedData.education.map((edu, idx) => (
        <div
          key={idx}
          className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600"
        >
          {edu.degree && (
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {edu.degree}
            </h3>
          )}
          {edu.institution && (
            <p className="font-semibold text-pink-700">{edu.institution}</p>
          )}
          {edu.year && (
            <p className="text-sm text-gray-600">{edu.year}</p>
          )}
        </div>
      ))}
    </div>
  </Section>
)}
        {/* TECHNICAL SKILLS */}
     {Array.isArray(parsedData.technicalSkills) &&
  parsedData.technicalSkills.some(
    (skill) =>
      skill &&
      Object.values(skill).some(
        (v) => v && String(v).trim() !== ""
      )
  ) && (
    <Section
      title="Technical Skills"
      icon={<Wrench className="w-6 h-6 text-white" />}
      gradient="from-cyan-600 to-blue-600"
    >
      <div className="flex flex-wrap gap-3">
        {parsedData.technicalSkills
          .filter(
            (skill) =>
              skill &&
              Object.values(skill).some(
                (v) => v && String(v).trim() !== ""
              )
          )
          .map((skill, idx) => {
            const skillName =
              skill.category ||
              skill.details ||
              skill.title ||
              skill.name ||
              "";
            if (!skillName.trim()) return null;
            return (
              <span
                key={idx}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow"
              >
                {skillName}
              </span>
            );
          })}
      </div>
    </Section>
  )}



        {/* ACHIEVEMENTS */}
        {Array.isArray(parsedData.achievements) &&
          parsedData.achievements.some(
            (a) =>
              typeof a === "string" ||
              (typeof a !== "string" &&
                ((a).award || (a).issuer || (a).year))
          ) && (
            <Section
              title="Achievements"
              icon={<Star className="w-6 h-6 text-white" />}
              gradient="from-yellow-500 to-amber-600"
            >
              <ul className="list-disc list-inside text-gray-700">
                {parsedData.achievements.map((a, i) => {
                  // If it's a plain string, render it directly
                  if (typeof a === "string") return <li key={i}>{a}</li>;

                  // If it's an object, render its properties nicely
                  if (
                    typeof a === "object" &&
                    (a.award || a.issuer || a.year)
                  ) {
                    return (
                      <li key={i}>
                        <span className="font-semibold">{a.award}</span>
                        {a.issuer && (
                          <>
                            {" "}
                            — <span>{a.issuer}</span>
                          </>
                        )}
                        {a.year && <> ({a.year})</>}
                      </li>
                    );
                  }

                  return null;
                })}
              </ul>
            </Section>
          )}
        {/* PROFESSIONAL TRAINING */}
        {Array.isArray(parsedData.professionalTraining) &&
          parsedData.professionalTraining.length > 0 && (
            <Section
              title="Professional Training"
              icon={<ClipboardCheck className="w-6 h-6 text-white" />}
              gradient="from-green-600 to-emerald-600"
            >
              <ul className="list-disc list-inside text-gray-700">
                {parsedData.professionalTraining.map(
                  (p, i) => (
                    <li key={i}>
                      {p.name || p.title || ""}
                      {p.institution && ` — ${p.institution}`}
                    </li>
                  )
                )}
              </ul>
            </Section>
          )}
        {/* RESEARCH PUBLICATIONS / PROJECTS / BOOKS */}
        {Array.isArray(parsedData.researchPublications) && (
          <>
            {/* If entries are objects (journal/workshop), render them */}
            {parsedData.researchPublications.some(
              (r) =>
                (typeof r === "object" && (r).journal) ||
                (r).workshop
            ) && (
              <Section
                title="Research Publications"
                icon={<BookOpen className="w-6 h-6 text-white" />}
                gradient="from-indigo-600 to-purple-600"
              >
                <ul className="list-disc list-inside text-gray-700">
                  {parsedData.researchPublications
                    .filter(
                      (r) =>
                        typeof r === "object" && (r.journal || r.workshop)
                    )
                    .map((r, i) => (
                      <li key={i}>
                        {r.journal && (
                          <span className="font-semibold">{r.journal}</span>
                        )}
                        {r.workshop && (
                          <>
                            {" — "}
                            <span className="italic text-gray-600">
                              {r.workshop}
                            </span>
                          </>
                        )}
                      </li>
                    ))}
                </ul>
              </Section>
            )}

            {/* If entries are plain strings (books/publications), render them separately */}
            {parsedData.researchPublications.some(
              (r) => typeof r === "string"
            ) && (
              <Section
                title="Publications & Books"
                icon={<BookOpen className="w-6 h-6 text-white" />}
                gradient="from-indigo-600 to-purple-600"
              >
                <ul className="list-disc list-inside text-gray-700">
                  {parsedData.researchPublications
                    .filter((r) => typeof r === "string")
                    .map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                </ul>
              </Section>
            )}
          </>
        )}

{/* {Array.isArray(parsedData.mssupervised) &&
  parsedData.mssupervised.length > 0 && (
    <Section
      title="M.S. Students Supervised"
      icon={<GraduationCap className="w-6 h-6 text-white" />}
      gradient="from-green-600 to-emerald-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.mssupervised.map((s, i) => (
          <li key={i}>
            <strong>{s.studentName}</strong>
            {s.thesisTitle && <span> — {s.thesisTitle}</span>}
            {s.year && <span className="italic text-gray-600"> ({s.year})</span>}
          </li>
        ))}
      </ul>
    </Section>
  )}



{Array.isArray(parsedData.phdstudentsupervised) &&
  parsedData.phdstudentsupervised.length > 0 && (
    <Section
      title="PhD Students Supervised"
      icon={<GraduationCap className="w-6 h-6 text-white" />}
      gradient="from-purple-600 to-pink-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.phdstudentsupervised.map((s, i) => (
          <li key={i}>
            <strong>{s.studentName}</strong>
            {s.thesisTitle && <span> — {s.thesisTitle}</span>}
            {s.year && <span className="italic text-gray-600"> ({s.year})</span>}
          </li>
        ))}
      </ul>
    </Section>
  )} */}



{Array.isArray(parsedData.journalGuestEditor) &&
  parsedData.journalGuestEditor.length > 0 && (
    <Section
      title="Journal Guest Editor"
      icon={<Newspaper className="w-6 h-6 text-white" />}
      gradient="from-sky-600 to-indigo-600"
    >
      {parsedData.journalGuestEditor.map((j, i) => (
        <div key={i} className="mb-2">
          <p className="font-semibold">{j.title}</p>
          <p className="text-sm text-gray-700">
            {j.section && <span>{j.section}, </span>}
            {j.publisher}
          </p>
        </div>
      ))}
    </Section>
  )}




{Array.isArray(parsedData.bookAuthorship) &&
  parsedData.bookAuthorship.length > 0 && (
    <Section
      title="Book Authorship"
      icon={<Book className="w-6 h-6 text-white" />}
      gradient="from-purple-600 to-pink-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.bookAuthorship.map((b, i) => (
          <li key={i}>
            <strong>{b.title}</strong> — {b.publisher}
          </li>
        ))}
      </ul>
    </Section>
  )}

{Array.isArray(parsedData.professionalActivities) &&
  parsedData.professionalActivities.length > 0 && (
    <Section
      title="Professional Activities"
      icon={<Briefcase className="w-6 h-6 text-white" />}
      gradient="from-blue-600 to-cyan-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.professionalActivities.map((p, i) => (
          <li key={i}>
            <strong>{p.heading}</strong>
            {p.desc && <span> — {p.desc}</span>}
            {p.year && (
              <span className="text-gray-600 italic"> ({p.year})</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )}




{Array.isArray(parsedData.professionalTraining) &&
  parsedData.professionalTraining.length > 0 && (
    <Section
      title="Professional Training"
      icon={<ClipboardList className="w-6 h-6 text-white" />}
      gradient="from-amber-600 to-yellow-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.professionalTraining.map((t, i) => (
          <li key={i}>
            <strong>{t.title || t.name}</strong>
            {t.description && <span> — {t.description}</span>}
            {t.year && <span> ({t.year})</span>}
          </li>
        ))}
      </ul>
    </Section>
  )}




{Array.isArray(parsedData.membershipsAndOtherAssociations) &&
  parsedData.membershipsAndOtherAssociations.length > 0 && (
    <Section
      title="Memberships & Other Associations"
      icon={<Users className="w-6 h-6 text-white" />}
      gradient="from-teal-600 to-green-600"
    >
      <ul className="list-disc list-inside text-gray-700">
        {parsedData.membershipsAndOtherAssociations.map((m, i) => (
          <li key={i}>
            <strong>{m.heading}</strong>
            {m.desc && <span> — {m.desc}</span>}
            {m.year && (
              <span className="text-gray-600 italic"> ({m.year})</span>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )}







      
        {Array.isArray(parsedData.researchProjects) &&
          parsedData.researchProjects.length > 0 && (
            <Section
              title="Research Projects"
              icon={<Target className="w-6 h-6 text-white" />}
              gradient="from-purple-600 to-pink-600"
            >
              <ul className="list-disc list-inside text-gray-700">
                {parsedData.researchProjects.map((p, i) => (
                  <li key={i}>
                    {p.title && (
                      <span className="font-semibold">{p.title}</span>
                    )}
                    {p.description && (
                      <span className="block text-sm text-gray-600">
                        {p.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        {/* MEMBERSHIPS */}
        {Array.isArray(parsedData.membershipsAndAssociations) &&
          parsedData.membershipsAndAssociations.length > 0 && (
            <Section
              title="Memberships & Associations"
              icon={<Users className="w-6 h-6 text-white" />}
              gradient="from-blue-600 to-cyan-600"
            >
              <ul className="list-disc list-inside text-gray-700">
                {parsedData.membershipsAndAssociations.map(
                  (m, i) => (
                    <li key={i}>
                      {m?.heading && (
                        <span className="font-semibold">{m.heading}</span>
                      )}
                      {m?.desc && (
                        <>
                          {" — "}
                          <span className="text-gray-600">{m.desc}</span>
                        </>
                      )}
                    </li>
                  )
                )}
              </ul>
            </Section>
          )}

      {Array.isArray(parsedData.reference) &&
  parsedData.reference.some(
    (r) =>
      r &&
      Object.values(r).some(
        (v) => v && String(v).trim() !== ""
      )
  ) && (
    <Section
      title="References"
      icon={<UserCheck className="w-6 h-6 text-white" />}
      gradient="from-gray-700 to-gray-900"
    >
      {parsedData.reference
        .filter(
          (r) =>
            r &&
            Object.values(r).some(
              (v) => v && String(v).trim() !== ""
            )
        )
        .map((r, i) => (
          <div key={i} className="mb-3">
            {r.prof && <p className="font-semibold">{r.prof}</p>}
            {r.designation && (
              <p className="text-sm text-gray-700">{r.designation}</p>
            )}
            {r.mail && <p className="text-sm text-gray-700">{r.mail}</p>}
            {r.phone && <p className="text-sm text-gray-700">{r.phone}</p>}
          </div>
        ))}
    </Section>
  )}




      </div>
    </div>
  );
};

// 🔹 Reusable Section Component
const Section = ({
  title,
  icon,
  gradient = "from-indigo-600 to-purple-600",
  children,
}) => (
  <div className="mb-10">
    <div className="flex items-center mb-6">
      <div
        className={`bg-gradient-to-r ${gradient} p-2.5 rounded-xl mr-3 shadow-lg`}
      >
        {icon}
      </div>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-l-4 border-indigo-600 shadow-sm">
      {children}
    </div>
  </div>
);

export default EmployeeCvTemplate;
