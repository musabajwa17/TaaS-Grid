// types/ParsedData.ts

export interface Experience {
  role: string;
  company: string;
  years: string;
  description?: string[] | string;
}
export interface ParsedItem {
  field: string;
  value: string | string[];
}
export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  link?: string;
}

export type Certification =
  | string
  | {
      name?: string;
      title?: string;
      description?: string;
    };

export interface ParsedData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  certifications?: Certification[];
  projects?: Project[];
  github?: string;
  linkedin?: string;
}
