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
} from "lucide-react";
import type {
  CvTemplateProps,
  Experience,
  Education,
  Skill,
  ProfessionalTraining
} from "@/types/CvTypes";

const CvTemplate: React.FC<CvTemplateProps> = ({ parsedData }) => {
  const hasArray = <T,>(arr: T[] | undefined): arr is T[] =>
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
        {hasArray(parsedData.experience) && (
          <Section
            title="Work Experience"
            icon={<Briefcase className="w-6 h-6 text-white" />}
            gradient="from-purple-600 to-pink-600"
          >
            {parsedData.experience?.map((exp: Experience, idx: number) => (
              <div key={idx} className="mb-5">
                <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                <p className="text-sm text-gray-500">{exp.company}</p>
                {exp.years && (
                  <p className="text-sm text-gray-500">{exp.years}</p>
                )}
                {Array.isArray(exp.description) && (
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    {exp.description.map((d: string, i: number) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
                {typeof exp.description === "string" && (
                  <p className="text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </Section>
        )}

        {/* EDUCATION */}
        {hasArray(parsedData.education) && (
          <Section
            title="Education"
            icon={<GraduationCap className="w-6 h-6 text-white" />}
            gradient="from-pink-600 to-orange-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parsedData.education?.map((edu: Education, idx: number) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-xl p-5 border-l-4 border-pink-600"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {edu.degree}
                  </h3>
                  <p className="font-semibold text-pink-700">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* TECHNICAL SKILLS */}
        {hasArray(parsedData.technicalSkills) && (
          <Section
            title="Technical Skills"
            icon={<Wrench className="w-6 h-6 text-white" />}
            gradient="from-cyan-600 to-blue-600"
          >
            <div className="flex flex-wrap gap-3">
              {parsedData.technicalSkills?.map(
                (skill: Skill | string, idx: number) => {
                  const skillName =
                    typeof skill === "string"
                      ? skill
                      : skill?.name || skill?.title || "";
                  if (!skillName) return null;
                  return (
                    <span
                      key={idx}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold shadow-md"
                      role="listitem"
                    >
                      {skillName}
                    </span>
                  );
                }
              )}
            </div>
          </Section>
        )}

        {/* ACHIEVEMENTS */}
        {Array.isArray(parsedData.achievements) &&
          parsedData.achievements.some(
            (a) =>
              typeof a === "string" ||
              (typeof a !== "string" &&
                ((a as any).award || (a as any).issuer || (a as any).year))
          ) && (
            <Section
              title="Achievements"
              icon={<Star className="w-6 h-6 text-white" />}
              gradient="from-yellow-500 to-amber-600"
            >
              <ul className="list-disc list-inside text-gray-700">
                {parsedData.achievements.map((a: any, i: number) => {
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
        {hasArray(parsedData.professionalTraining) && (
          <Section
            title="Professional Training"
            icon={<ClipboardCheck className="w-6 h-6 text-white" />}
            gradient="from-green-600 to-emerald-600"
          >
            <ul className="list-disc list-inside text-gray-700">
              {parsedData.professionalTraining?.map(
                (p: ProfessionalTraining, i: number) => (
                  <li key={i}>
                    {p.name || p.title || ""}{" "}
                    {p.institution && `— ${p.institution}`}
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
              (r) => typeof r === "object" && (r as any).journal || (r as any).workshop
            ) && (
              <Section
                title="Research Publications"
                icon={<BookOpen className="w-6 h-6 text-white" />}
                gradient="from-indigo-600 to-purple-600"
              >
                <ul className="list-disc list-inside text-gray-700">
                  {parsedData.researchPublications
                    .filter((r: any) => typeof r === "object" && (r.journal || r.workshop))
                    .map((r: any, i: number) => (
                      <li key={i}>
                        {r.journal && <span className="font-semibold">{r.journal}</span>}
                        {r.workshop && (
                          <>
                            {" — "}
                            <span className="italic text-gray-600">{r.workshop}</span>
                          </>
                        )}
                      </li>
                    ))}
                </ul>
              </Section>
            )}

            {/* If entries are plain strings (books/publications), render them separately */}
            {parsedData.researchPublications.some((r) => typeof r === "string") && (
              <Section
                title="Publications & Books"
                icon={<BookOpen className="w-6 h-6 text-white" />}
                gradient="from-indigo-600 to-purple-600"
              >
                <ul className="list-disc list-inside text-gray-700">
                  {parsedData.researchPublications
                    .filter((r: any) => typeof r === "string")
                    .map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                </ul>
              </Section>
            )}
          </>
        )}



        {hasArray(parsedData.researchProjects) && (
          <Section
            title="Research Projects"
            icon={<Target className="w-6 h-6 text-white" />}
            gradient="from-purple-600 to-pink-600"
          >
            <ul className="list-disc list-inside text-gray-700">
              {parsedData.researchProjects?.map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Section>
        )}

        {/* MEMBERSHIPS */}
       {Array.isArray(parsedData.membershipsAndAssociations) && parsedData.membershipsAndAssociations.length > 0 && (
  <Section
    title="Memberships & Associations"
    icon={<Users className="w-6 h-6 text-white" />}
    gradient="from-blue-600 to-cyan-600"
  >
    <ul className="list-disc list-inside text-gray-700">
      {parsedData.membershipsAndAssociations.map((m: any, i: number) => (
        <li key={i}>
          {m?.heading && <span className="font-semibold">{m.heading}</span>}
          {m?.desc && (
            <>
              {" — "}
              <span className="text-gray-600">{m.desc}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  </Section>
)}


        {Array.isArray(parsedData.references) &&
          parsedData.references.some(
            (r) => r.prof || r.designation || r.email || r.phone
          ) && (
            <Section
              title="References"
              icon={<Users className="w-6 h-6 text-white" />}
              gradient="from-indigo-600 to-purple-600"
            >
              {parsedData.references.map((r, i) => {
                // Skip empty references
                if (!r.prof && !r.designation && !r.email && !r.phone)
                  return null;
                return (
                  <div key={i} className="mb-2">
                    {r.prof && (
                      <p className="font-semibold text-gray-800">{r.prof}</p>
                    )}
                    {r.designation && (
                      <p className="text-sm text-gray-600">{r.designation}</p>
                    )}
                    {r.email && (
                      <p className="text-sm text-gray-600">{r.email}</p>
                    )}
                    {r.phone && (
                      <p className="text-sm text-gray-600">{r.phone}</p>
                    )}
                  </div>
                );
              })}
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
}: {
  title: string;
  icon: React.ReactNode;
  gradient?: string;
  children: React.ReactNode;
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

export default CvTemplate;
