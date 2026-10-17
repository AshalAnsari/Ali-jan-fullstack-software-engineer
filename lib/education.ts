/**
 * Education, as Ali lists it on the previous portfolio
 * (alijanportfolios.vercel.app). Most recent first.
 */

export type EducationEntry = {
  id: string;
  institution: string;
  qualification: string;
  field: string | null;
  location: string;
  startYear: number;
  endYear: number;
  summary: string;
  /** Short topics shown as tags. */
  focus: string[];
  url?: string;
};

export const education: EducationEntry[] = [
  {
    id: "university-of-karachi",
    institution: "University of Karachi",
    qualification: "Bachelor of Science",
    field: "Computer Science",
    location: "Karachi, Pakistan",
    startYear: 2021,
    endYear: 2025,
    summary: "Four-year computer science degree, focused on software development and web technologies.",
    focus: ["Software development", "Web technologies"],
    url: "https://www.uok.edu.pk/",
  },
  {
    id: "adamjee",
    institution: "Adamjee Govt. Science College",
    qualification: "Intermediate",
    field: null,
    location: "Karachi, Pakistan",
    startYear: 2018,
    endYear: 2020,
    summary: "Higher secondary studies in the sciences and mathematics, completed with honors.",
    focus: ["Sciences", "Mathematics"],
  },
];
