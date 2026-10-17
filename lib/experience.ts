/**
 * Career history.
 *
 * Dates, summaries and highlights are optional — fill them in and the
 * timeline renders them; leave them empty and they are simply omitted.
 */

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  /** Stage in the progression, e.g. "Foundation". Presentation only. */
  stage: string;
  /** e.g. "2022 — 2023". */
  period: string | null;
  location: string | null;
  summary: string | null;
  highlights: string[];
  technologies: string[];
};

/** Ordered from first role to most recent, matching the career progression. */
export const experience: ExperienceEntry[] = [
  {
    id: "softly",
    company: "Softly",
    role: "Intern",
    stage: "Foundation",
    period: null,
    location: null,
    summary: null,
    highlights: [],
    technologies: [],
  },
  {
    id: "threatcure",
    company: "ThreatCure",
    role: "Full Stack Developer",
    stage: "Full stack",
    period: null,
    location: null,
    summary: null,
    highlights: [],
    technologies: [],
  },
  {
    id: "tafsol",
    company: "Tafsol Technologies",
    role: "Software Engineer",
    stage: "Engineering",
    period: null,
    location: null,
    summary: null,
    highlights: [],
    technologies: [],
  },
];
