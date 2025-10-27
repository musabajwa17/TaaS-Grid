"use client";
import React from "react";
import { Mail, Phone, GraduationCap, Briefcase, Award, Book, Users, Star, Wrench, BookOpen, UserCircle } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Experience {
  role: string;
  institute: string;
  years: string;
}

interface Training {
  title: string;
  description: string;
  year: string;
}

interface Skill {
  title: string;
  lang: string;
}

interface Membership {
  heading: string;
  desc: string;
}

interface Reference {
  prof: string;
  designation: string;
  mail: string;
  phone: string;
}

interface ParsedData {
  name?: string;
  email?: string;
  phone?: string;
  citations?: string;
  impactFactor?: string;
  scholar?: string;
  education?: Education[];
  experience?: Experience[];
  achievements?: string[];
  bookAuthorship?: string[];
  journalGuestEditor?: string[];
  researchPublications?: {
    journal?: string[];
    workshop?: string[];
  };
  bookChapters?: string[];
  msStudentsSupervised?: string[];
  phdStudentsSupervised?: string[];
  researchProjects?: string[];
  professionalServices?: string[];
  professionalTraining?: Training[];
  technicalSkills?: Skill[];
  membershipsAndAssociations?: Membership[];
  references?: Reference[];
}

const EmployeeResumeTemplate: React.FC<{ parsedData: ParsedData }> = ({ parsedData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200 space-y-8 text-gray-800">
      {/* Header */}
      <div className="text-center border-b pb-4">
        {parsedData.name && <h1 className="text-3xl font-bold text-gray-900">{parsedData.name}</h1>}
        <div className="flex justify-center gap-4 text-gray-600 mt-2">
          {parsedData.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {parsedData.email}
            </div>
          )}
          {parsedData.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {parsedData.phone}
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      {(parsedData.citations || parsedData.impactFactor || parsedData.scholar) && (
        <div className="grid grid-cols-3 gap-4 text-center">
          {parsedData.citations && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold">{parsedData.citations}</p>
              <p className="text-sm text-gray-600">Citations</p>
            </div>
          )}
          {parsedData.impactFactor && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold">{parsedData.impactFactor}</p>
              <p className="text-sm text-gray-600">Impact Factor</p>
            </div>
          )}
          {parsedData.scholar && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-lg font-semibold">{parsedData.scholar}</p>
              <p className="text-sm text-gray-600">Google Scholar</p>
            </div>
          )}
        </div>
      )}

      {/* Education */}
  {(parsedData.education?.length ?? 0) > 0 && (
        <Section title="Education" icon={<GraduationCap className="w-5 h-5" />}>
          {parsedData.education?.map((edu, idx) => (
            <Item key={idx} title={edu.degree} subtitle={edu.institution} detail={edu.year} />
          ))}
        </Section>
      )}

      {/* Experience */}
  {(parsedData.experience?.length ?? 0) > 0 && (
        <Section title="Experience" icon={<Briefcase className="w-5 h-5" />}>
          {parsedData.experience?.map((exp, idx) => (
            <Item key={idx} title={exp.role} subtitle={exp.institute} detail={exp.years} />
          ))}
        </Section>
      )}

      {/* Achievements */}
  {(parsedData.achievements?.length ?? 0) > 0 && (
        <Section title="Achievements" icon={<Award className="w-5 h-5" />}>
          <ul className="list-disc ml-6 space-y-1">
            {parsedData.achievements?.map((a, idx) => (
              <li key={idx}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Research & Publications */}
      {((parsedData.researchPublications?.journal?.length ?? 0) || (parsedData.researchPublications?.workshop?.length ?? 0)) > 0 && (
        <Section title="Research Publications" icon={<Book className="w-5 h-5" />}>
          {parsedData.researchPublications?.journal && (
            <>
              <h4 className="font-semibold text-sm mt-2">Journals</h4>
              <ul className="list-disc ml-6 space-y-1">
                {parsedData.researchPublications?.journal?.map((j, idx) => <li key={idx}>{j}</li>)}
              </ul>
            </>
          )}
          {parsedData.researchPublications?.workshop && (
            <>
              <h4 className="font-semibold text-sm mt-2">Workshops</h4>
              <ul className="list-disc ml-6 space-y-1">
                {parsedData.researchPublications?.workshop?.map((w, idx) => <li key={idx}>{w}</li>)}
              </ul>
            </>
          )}
        </Section>
      )}

      {/* Supervision */}
  {((parsedData.msStudentsSupervised?.length ?? 0) || (parsedData.phdStudentsSupervised?.length ?? 0)) > 0 && (
        <Section title="Student Supervision" icon={<Users className="w-5 h-5" />}>
          {(parsedData.msStudentsSupervised?.length ?? 0) > 0 && (
            <p><strong>MS Students:</strong> {parsedData.msStudentsSupervised?.join(", ")}</p>
          )}
          {(parsedData.phdStudentsSupervised?.length ?? 0) > 0 && (
            <p><strong>PhD Students:</strong> {parsedData.phdStudentsSupervised?.join(", ")}</p>
          )}
        </Section>
      )}

      {/* Research Projects */}
      {(parsedData.researchProjects?.length ?? 0) > 0 && (
        <Section title="Research Projects" icon={<Star className="w-5 h-5" />}>
          <ul className="list-disc ml-6 space-y-1">
            {parsedData.researchProjects?.map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
        </Section>
      )}

      {/* Professional Training */}
      {(parsedData.professionalTraining?.length ?? 0) > 0 && (
        <Section title="Professional Training" icon={<BookOpen className="w-5 h-5" />}>
          {parsedData.professionalTraining?.map((t, idx) => (
            <Item key={idx} title={t.title} subtitle={t.description} detail={t.year} />
          ))}
        </Section>
      )}

      {/* Technical Skills */}
      {(parsedData.technicalSkills?.length ?? 0) > 0 && (
        <Section title="Technical Skills" icon={<Wrench className="w-5 h-5" />}>
          <ul className="list-disc ml-6 space-y-1">
            {parsedData.technicalSkills?.map((s, idx) => (
              <li key={idx}>
                <strong>{s.title}:</strong> {s.lang}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Memberships */}
      {(parsedData.membershipsAndAssociations?.length ?? 0) > 0 && (
        <Section title="Memberships & Associations" icon={<UserCircle className="w-5 h-5" />}>
          {parsedData.membershipsAndAssociations?.map((m, idx) => (
            <Item key={idx} title={m.heading} subtitle={m.desc} />
          ))}
        </Section>
      )}

      {/* References */}
      {(parsedData.references?.length ?? 0) > 0 && (
        <Section title="References" icon={<Users className="w-5 h-5" />}>
          {parsedData.references?.map((r, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{r.prof}</p>
              <p className="text-sm">{r.designation}</p>
              <p className="text-sm">{r.mail}</p>
              <p className="text-sm">{r.phone}</p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
};

/* --- Helper Components --- */
const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({
  title,
  icon,
  children,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-3 border-b pb-1">
      {icon}
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const Item: React.FC<{ title: string; subtitle?: string; detail?: string }> = ({ title, subtitle, detail }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-100 pb-2">
    <div>
      <p className="font-medium text-gray-800">{title}</p>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
    {detail && <p className="text-sm text-gray-500">{detail}</p>}
  </div>
);

export default EmployeeResumeTemplate;
