export interface CVData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: string[];
  education?: string[];
  skills?: string[];
  certifications?: string[];
  projects?: {
    name: string;
    description: string;
    domain?: string[];
    link?: string;
  }[];
  github?: string;
  linkedin?: string;
}