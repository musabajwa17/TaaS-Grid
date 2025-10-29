export interface Experience {
  role: string;
  company: string;
  years?: string;
  description?: string[] | string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Skill {
  name?: string;
  title?: string;
}

export interface ProfessionalTraining {
  name?: string;
  title?: string;
  institution?: string;
}

export interface Reference {
  prof: string;
  designation: string;
  phone: string;
  email: string;
}
export interface Achievements {
    awards?: string[];
    issuer?: string[];
    year?: string[];
}

export interface ParsedCvData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  summary?: string | string[];
  experience?: Experience[];
  education?: Education[];
  technicalSkills?: (Skill | string)[];
  achievements?: string[];
  professionalTraining?: ProfessionalTraining[];
  researchPublications?: string[];
  researchProjects?: string[];
  membershipsAndAssociations?: string[];
  references?: Reference[];
}

export interface CvTemplateProps {
  parsedData: ParsedCvData;
}