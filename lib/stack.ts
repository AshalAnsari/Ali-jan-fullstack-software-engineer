/**
 * The engineering stack, modelled as layers.
 *
 * This single taxonomy drives the hero diagram, the About engineering
 * map, the Skills explorer and the case-study architecture diagrams, so
 * the whole site tells the same story: UI → Frontend → APIs → Backend →
 * Data → AI → Cloud → Integrations.
 *
 * Only technologies Ali has listed appear here.
 */

export type LayerId =
  | "interface"
  | "frontend"
  | "api"
  | "backend"
  | "data"
  | "ai"
  | "cloud"
  | "integrations";

export type Technology = {
  name: string;
  /** Neutral domain descriptor — what the tool is, not a claim about usage. */
  domain?: string;
};

export type Layer = {
  id: LayerId;
  code: string;
  label: string;
  summary: string;
  technologies: Technology[];
};

export const layers: Layer[] = [
  {
    id: "interface",
    code: "L1",
    label: "Interface",
    summary: "Semantic, responsive markup and styling that holds up on every screen.",
    technologies: [{ name: "HTML" }, { name: "CSS" }],
  },
  {
    id: "frontend",
    code: "L2",
    label: "Frontend",
    summary: "Typed, component-driven applications with React and Next.js.",
    technologies: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
    ],
  },
  {
    id: "api",
    code: "L3",
    label: "APIs",
    summary: "REST APIs as the contract between clients, services and partners.",
    technologies: [{ name: "REST APIs" }],
  },
  {
    id: "backend",
    code: "L4",
    label: "Backend",
    summary: "Node.js services — structured with NestJS or kept lean with Express.",
    technologies: [{ name: "Node.js" }, { name: "NestJS" }, { name: "Express.js" }],
  },
  {
    id: "data",
    code: "L5",
    label: "Data",
    summary: "Database design across document and relational models.",
    technologies: [{ name: "MongoDB" }, { name: "SQL" }],
  },
  {
    id: "ai",
    code: "L6",
    label: "AI",
    summary: "AI bots and AI-powered features wired into real product flows.",
    technologies: [{ name: "AI Bots" }, { name: "AI Integrations" }],
  },
  {
    id: "cloud",
    code: "L7",
    label: "Cloud",
    summary: "AWS services, including S3 for file and media storage.",
    technologies: [{ name: "AWS" }, { name: "AWS S3", domain: "Object storage" }],
  },
  {
    id: "integrations",
    code: "L8",
    label: "Integrations",
    summary: "Third-party platforms for payments, communication and commerce.",
    technologies: [
      { name: "Stripe", domain: "Payments" },
      { name: "Microsoft Teams", domain: "Communication" },
      { name: "SendCloud", domain: "Shipping" },
      { name: "eBay", domain: "Marketplace" },
    ],
  },
];

export const layerById = Object.fromEntries(layers.map((l) => [l.id, l])) as Record<
  LayerId,
  Layer
>;

/** Skill categories as presented on the Skills page. */
export type SkillCategory = {
  id: string;
  label: string;
  layer: LayerId;
  description: string;
  skills: Technology[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    layer: "frontend",
    description: "Interfaces people use, from semantic markup to typed React applications.",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Next.js" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    layer: "backend",
    description: "Server-side JavaScript: APIs, business logic and service structure.",
    skills: [{ name: "Node.js" }, { name: "NestJS" }, { name: "Express.js" }],
  },
  {
    id: "database",
    label: "Database",
    layer: "data",
    description: "Modelling and querying data in document and relational stores.",
    skills: [{ name: "MongoDB" }, { name: "SQL" }],
  },
  {
    id: "cloud",
    label: "Cloud",
    layer: "cloud",
    description: "Running and storing on AWS.",
    skills: [{ name: "AWS" }, { name: "AWS S3", domain: "Object storage" }],
  },
  {
    id: "ai",
    label: "AI",
    layer: "ai",
    description: "Bots and AI-powered features integrated into products.",
    skills: [{ name: "AI Bots" }, { name: "AI Integrations" }],
  },
  {
    id: "integrations",
    label: "Integrations",
    layer: "integrations",
    description: "Connecting products to payment, communication and commerce platforms.",
    skills: [
      { name: "Stripe", domain: "Payments" },
      { name: "Microsoft Teams", domain: "Communication" },
      { name: "SendCloud", domain: "Shipping" },
      { name: "eBay", domain: "Marketplace" },
    ],
  },
];

/** Areas of experience Ali listed, used in copy and structured data. */
export const expertise = [
  "Frontend development",
  "Backend development",
  "Full-stack applications",
  "REST APIs",
  "Database design",
  "System design",
  "AI bots",
  "AI integrations",
  "Cloud services",
  "AWS",
  "AWS S3",
  "Third-party integrations",
  "Payment systems",
  "Communication platforms",
  "E-commerce integrations",
] as const;
