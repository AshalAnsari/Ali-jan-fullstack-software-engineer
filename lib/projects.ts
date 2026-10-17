import type { LayerId } from "./stack";

/**
 * Project case studies.
 *
 * Research rule: everything here comes from the live product — public
 * pages, page metadata, store listings, and what the production front
 * end publicly loads (frameworks, API hosts, third-party SDKs). Each
 * technical claim carries an evidence level:
 *
 *   verified     — directly observable on the public product
 *   confirmed    — confirmed by Ali from the project itself (not public)
 *   interpreted  — a reasonable reading of public evidence, phrased as such
 *
 * Marketing figures shown on the products themselves (user counts,
 * ratings, order volumes) are deliberately not repeated here.
 */

export type Evidence = "verified" | "confirmed" | "interpreted";

export type IconName =
  | "bot"
  | "users"
  | "audio"
  | "sparkles"
  | "shield"
  | "route"
  | "layers"
  | "file"
  | "gavel"
  | "hardhat"
  | "badge"
  | "languages"
  | "store"
  | "filter"
  | "leaf"
  | "phone"
  | "calendar"
  | "video"
  | "clock"
  | "chart"
  | "message"
  | "card"
  | "globe"
  | "lock"
  | "image"
  | "search"
  | "ranking"
  | "school";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Portrait phone screenshots render in a device frame. */
  kind?: "screen" | "phone";
};

export type Feature = {
  title: string;
  description: string;
  icon: IconName;
  evidence?: Evidence;
};

export type Flow = {
  actor: string;
  description?: string;
  steps: string[];
};

export type ArchitectureNode = {
  label: string;
  detail: string;
  layer: LayerId | "client";
  evidence: Evidence;
};

export type TechEntry = {
  name: string;
  evidence: Evidence;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  /** Short card description. */
  tagline: string;
  /** One-line description for hero and meta description. */
  summary: string;
  platform: "Web platform" | "Mobile + web" | "Internal web app";
  region?: string;
  links: { label: string; href: string; primary?: boolean }[];
  cover: ProjectImage;
  gallery: ProjectImage[];
  overview: string[];
  problem: string;
  solution: string;
  features: Feature[];
  flows: Flow[];
  architecture: {
    nodes: ArchitectureNode[];
    note: string;
  };
  /** Services from Ali's integration list (or others) observed on this project. */
  integrations: { name: string; role: string; evidence: Evidence }[];
  technologies: TechEntry[];
  /** Ali's role on the project. The section is hidden while null. */
  contribution: string | null;
  sources: { label: string; href: string }[];
  schemaType: "WebApplication" | "MobileApplication";
};

export const projects: Project[] = [
  {
    slug: "newvana",
    name: "Newvana",
    category: "AI · Wellbeing",
    tagline:
      "A guided reflection product: talk things through with an AI mentor, then keep a personalised audio reflection of the conversation.",
    summary:
      "An AI-guided wellbeing platform where conversations with mentor personas become personalised audio reflections.",
    platform: "Web platform",
    links: [{ label: "Visit newvana.ai", href: "https://www.newvana.ai/", primary: true }],
    cover: {
      src: "/projects/newvana/cover.webp",
      alt: "Newvana homepage: “Your Personalised Reflection with Newvana” above a row of mentor cards.",
    },
    gallery: [
      {
        src: "/projects/newvana/focus-areas.webp",
        alt: "Guided reflection section listing focus areas, each paired with a mentor.",
        caption: "Focus areas route straight into a conversation with the best-suited mentor.",
      },
      {
        src: "/projects/newvana/how-it-works.webp",
        alt: "How it works strip and the “A Quieter Way To Begin” draw-a-word card.",
        caption: "Choose a mentor → start chatting → create an audio reflection, plus a quieter word-of-the-day entry point.",
      },
      {
        src: "/projects/newvana/mentors.webp",
        alt: "Meet the Newvana mentors page with mentor profile cards.",
        caption: "Mentor directory — each persona has its own focus and tone.",
      },
      {
        src: "/projects/newvana/approach.webp",
        alt: "About page describing Newvana's approach: safety and trust, human experience, design and accessibility.",
        caption: "Product principles: safety & trust, human experience, design & accessibility.",
      },
    ],
    overview: [
      "Newvana is an emotional-wellbeing product, currently in public beta. A visitor picks one of several AI mentors — each written around a specific situation such as conflict, anxiety or feeling stuck — and talks through what's on their mind.",
      "The conversation doesn't just end. Newvana turns it into a personalised audio reflection the user can listen back to, which is the core idea of the product: from conversation to reflection.",
      "It positions itself between isolated self-help tools and traditional therapy — accessible and non-judgmental, with safety, privacy and calm design treated as product requirements rather than decoration.",
    ],
    problem:
      "People who want to process a hard moment usually have two options: generic self-help content, or the much bigger step of formal therapy. There's little in between that is structured, private and low-pressure.",
    solution:
      "A conversation-first experience with no sign-up needed to begin. Users choose a mentor or a focus area, chat, and receive an audio reflection they can come back to. For people not ready to talk, a “draw a word” ritual offers a single intentional word for the day, linked to a mentor.",
    features: [
      {
        icon: "users",
        title: "Mentor personas",
        description:
          "Each mentor has a defined focus and voice — conflict and boundaries, anxiety and overwhelm, confidence and forward movement — so users start with the right kind of support.",
        evidence: "verified",
      },
      {
        icon: "route",
        title: "Guided focus areas",
        description:
          "Anxiety & Overwhelm, Low Self-Worth, Relationship Tension, Life Direction & Change, Habits & Resilience. Each area opens a conversation directly with its matched mentor.",
        evidence: "verified",
      },
      {
        icon: "audio",
        title: "Conversation → audio reflection",
        description:
          "The signature flow: a chat becomes a personalised audio reflection the user can replay.",
        evidence: "verified",
      },
      {
        icon: "sparkles",
        title: "Draw a word",
        description:
          "A quieter entry point — one word with its meaning to carry through the day, a cooldown before the next draw, and a link into the mentor conversation.",
        evidence: "verified",
      },
      {
        icon: "shield",
        title: "Safety-first design",
        description:
          "Guided conversations with clear boundaries and an emphasis on emotional safety and privacy are stated product pillars.",
        evidence: "verified",
      },
      {
        icon: "message",
        title: "Real-time conversation",
        description:
          "The client ships a real-time socket layer alongside its REST API, consistent with live chat sessions.",
        evidence: "interpreted",
      },
    ],
    flows: [
      {
        actor: "Talk it through",
        steps: ["Choose a mentor or focus area", "Start chatting", "Create an audio reflection", "Listen back"],
      },
      {
        actor: "Quiet start",
        steps: ["Draw a word", "Read what it means", "Talk to the linked mentor"],
      },
    ],
    architecture: {
      note: "Frontend framework, API host, real-time layer and storage are observable in the production app.",
      nodes: [
        { layer: "client", label: "Browser", detail: "Public site + chat", evidence: "verified" },
        { layer: "frontend", label: "Next.js", detail: "App Router · React · Redux Toolkit", evidence: "verified" },
        { layer: "api", label: "REST API", detail: "Versioned /api/v1 with token refresh", evidence: "verified" },
        { layer: "backend", label: "Real-time layer", detail: "Socket.IO client connection", evidence: "verified" },
        { layer: "cloud", label: "AWS S3", detail: "Media and asset storage", evidence: "verified" },
      ],
    },
    integrations: [
      { name: "AI", role: "Mentor conversations and audio reflections", evidence: "verified" },
      { name: "AWS S3", role: "Media storage", evidence: "verified" },
    ],
    technologies: [
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "Redux Toolkit", evidence: "verified" },
      { name: "Socket.IO", evidence: "verified" },
      { name: "REST API", evidence: "verified" },
      { name: "AWS S3", evidence: "verified" },
    ],
    contribution: null,
    sources: [
      { label: "newvana.ai", href: "https://www.newvana.ai/" },
      { label: "newvana.ai/about", href: "https://www.newvana.ai/about" },
      { label: "newvana.ai/mentors", href: "https://www.newvana.ai/mentors" },
    ],
    schemaType: "WebApplication",
  },
  {
    slug: "samurai",
    name: "SamurAI",
    category: "AI · Education Recruitment",
    tagline:
      "AI-matched substitute-teacher hiring for schools in Qatar — an Android app for teachers and a web dashboard for school HR.",
    summary:
      "An AI-powered platform that matches schools in Qatar with vetted substitute teachers — mobile app for teachers, web dashboard for school HR.",
    platform: "Mobile + web",
    region: "Qatar",
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.samurai", primary: true },
      { label: "samuraiinnovations.com", href: "https://www.samuraiinnovations.com/" },
    ],
    cover: {
      src: "/projects/samurai/cover.webp",
      alt: "SamurAI for School HR: “Hire Qualified Substitute Teachers in Minutes, Not Hours.”",
    },
    gallery: [
      {
        kind: "phone",
        src: "/projects/samurai/app-2.webp",
        alt: "SamurAI Android app onboarding screen: “Find the best teaching jobs instantly.”",
        caption: "Teacher app — AI-driven job matching.",
      },
      {
        kind: "phone",
        src: "/projects/samurai/app-4.webp",
        alt: "SamurAI Android app: step one of a six-step teacher profile, personal information.",
        caption: "Six-step teacher profile onboarding.",
      },
      {
        kind: "phone",
        src: "/projects/samurai/app-3.webp",
        alt: "SamurAI Android app password recovery screen with OTP by email.",
        caption: "Account recovery by email OTP.",
      },
      {
        src: "/projects/samurai/school-features.webp",
        alt: "Why Choose SamurAI: instant matching, pre-vetted teachers, one platform for all actions, covers all hiring needs.",
        caption: "School HR value proposition.",
      },
      {
        src: "/projects/samurai/school-flow.webp",
        alt: "How it works for schools: post a job, get instant matches, schedule interviews, hire and manage, monitor and approve.",
        caption: "The school hiring flow, end to end.",
      },
      {
        src: "/projects/samurai/teacher.webp",
        alt: "SamurAI for teachers page: “Find Teaching Jobs That Fit Your Life.”",
        caption: "Teacher-facing landing page.",
      },
    ],
    overview: [
      "SamurAI is an education-staffing platform built for Qatar's school community. It targets one operational problem — last-minute teacher absences — by matching schools with vetted substitute teachers on demand.",
      "It has two sides. Teachers use the Android app to build a profile, receive matched jobs, apply, log hours and get paid. School HR teams run the whole hiring cycle from a web dashboard: job requests, candidates and interviews, engagements, timesheets and approvals, reviews, issues and reporting.",
    ],
    problem:
      "When a teacher is absent at short notice, schools have hours — not weeks — to find qualified cover. Meanwhile, qualified teachers looking for flexible work have no fast way to find it. Conventional recruitment is built for neither.",
    solution:
      "An AI-assisted marketplace: a school posts a job request, the platform ranks suitable teachers by subject, grade level and availability, HR interviews and hires, and the engagement is tracked through timesheets and approvals to payment. Ratings then strengthen a teacher's profile for future matches.",
    features: [
      {
        icon: "ranking",
        title: "AI matching & candidate ranking",
        description: "Matches teachers to job requests on skills, subjects and availability, and ranks candidates for HR.",
        evidence: "verified",
      },
      {
        icon: "badge",
        title: "Pre-vetted teachers",
        description: "Candidates go through background checks and qualification screening before they reach schools.",
        evidence: "verified",
      },
      {
        icon: "school",
        title: "Role-based HR dashboards",
        description:
          "Separate HR Manager and HR Officer workspaces for job requests, candidates, engagements, reviews and settings.",
        evidence: "verified",
      },
      {
        icon: "video",
        title: "Interviews over Zoom",
        description: "Schools schedule and run candidate interviews without leaving the platform flow.",
        evidence: "verified",
      },
      {
        icon: "clock",
        title: "Timesheets & approvals",
        description: "Teachers log hours; HR monitors and approves them before payment.",
        evidence: "verified",
      },
      {
        icon: "chart",
        title: "Reports, reviews & issues",
        description: "Reporting and analytics, two-way feedback and ratings, and an issue-management workflow.",
        evidence: "verified",
      },
      {
        icon: "layers",
        title: "Curriculum-aware taxonomy",
        description:
          "Jobs are described with school types, stages and subjects — from early years to IB Diploma, including Islamic Studies and Qatar History.",
        evidence: "verified",
      },
      {
        icon: "phone",
        title: "Teacher mobile app",
        description: "Android app with six-step profile onboarding, tailored job alerts, one-tap apply and email OTP account recovery.",
        evidence: "verified",
      },
    ],
    flows: [
      {
        actor: "School HR",
        description: "Web dashboard",
        steps: ["Post a job", "Get instant matches", "Schedule interviews", "Hire & manage", "Monitor & approve"],
      },
      {
        actor: "Teacher",
        description: "Android app",
        steps: ["Build profile", "Get job matches", "Apply & interview", "Work & log hours", "Get paid"],
      },
    ],
    architecture: {
      note: "The Android client, the Next.js web dashboard, the versioned API, S3 storage and Zoom interviews are publicly observable.",
      nodes: [
        { layer: "client", label: "Android app + web", detail: "Teachers on mobile · HR on the web dashboard", evidence: "verified" },
        { layer: "frontend", label: "Next.js dashboard", detail: "Role-based routes for HR Manager / HR Officer", evidence: "verified" },
        { layer: "api", label: "REST API", detail: "Versioned /api/v1 with access + refresh tokens", evidence: "verified" },
        { layer: "ai", label: "Matching engine", detail: "Ranks teachers by subject, grade, availability", evidence: "verified" },
        { layer: "cloud", label: "AWS S3", detail: "Document and media storage", evidence: "verified" },
        { layer: "integrations", label: "Zoom", detail: "Candidate interviews", evidence: "verified" },
      ],
    },
    integrations: [
      { name: "AI", role: "Job matching and candidate ranking", evidence: "verified" },
      { name: "AWS S3", role: "Storage", evidence: "verified" },
      { name: "Zoom", role: "Interviews", evidence: "verified" },
    ],
    technologies: [
      { name: "Android", evidence: "verified" },
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "Redux", evidence: "verified" },
      { name: "REST API", evidence: "verified" },
      { name: "AWS S3", evidence: "verified" },
    ],
    contribution: null,
    sources: [
      { label: "Google Play listing", href: "https://play.google.com/store/apps/details?id=com.samurai" },
      { label: "samuraiinnovations.com/for-school-hr", href: "https://www.samuraiinnovations.com/for-school-hr" },
      { label: "samuraiinnovations.com/for-teacher", href: "https://www.samuraiinnovations.com/for-teacher" },
    ],
    schemaType: "MobileApplication",
  },
  {
    slug: "sansaino",
    name: "Sansaino",
    category: "Marketplace · Infrastructure Talent",
    tagline:
      "A verified talent marketplace for data-center, cloud and cybersecurity professionals — hire for a project or full time, anywhere.",
    summary:
      "A two-sided, verified talent marketplace for critical-infrastructure professionals, with proposals, milestones and secure payments.",
    platform: "Web platform",
    links: [{ label: "Visit sansaino.com", href: "https://sansaino.com/", primary: true }],
    cover: {
      src: "/projects/sansaino/cover.webp",
      alt: "Sansaino homepage: “Connecting You With Talent Who Get The Mission.” with a talent search bar.",
    },
    gallery: [
      {
        src: "/projects/sansaino/categories.webp",
        alt: "Sansaino expertise categories grid: cybersecurity, networking, application development, data center operations and more.",
        caption: "Expertise categories built around infrastructure work.",
      },
      {
        src: "/projects/sansaino/how-it-works.webp",
        alt: "How sansaino works: post or find talent, get proposals, choose and collaborate, pay securely.",
        caption: "The hiring loop for companies.",
      },
      {
        src: "/projects/sansaino/pricing.webp",
        alt: "Sansaino pricing plans: Starter, Scale and Global Employment (EOR).",
        caption: "Platform-fee tiers and an Employer-of-Record option.",
      },
    ],
    overview: [
      "Sansaino describes itself as “the verified talent marketplace powering the world's critical infrastructure.” It is a two-sided marketplace for the people who build and run digital infrastructure — data-center engineers and technicians, cloud architects, cybersecurity specialists, network engineers, and infrastructure project leaders.",
      "Companies hire verified professionals remote or onsite, for short projects or long-term and full-time roles. Professionals create a profile, get matched to opportunities, send proposals, and are paid through the platform as work is delivered.",
    ],
    problem:
      "General freelance marketplaces aren't built for infrastructure work, where credentials and trust carry real weight and engagements range from a short onsite job to an international full-time hire.",
    solution:
      "A specialist marketplace with verification at its core, direct negotiation between both sides, collaboration through chat, files and milestones, payments released as work is completed — and an Employer-of-Record route with partners for global full-time hiring.",
    features: [
      {
        icon: "badge",
        title: "Verified professionals",
        description: "Verification is the product's core promise; an identity-verification provider is integrated in the app.",
        evidence: "verified",
      },
      {
        icon: "search",
        title: "Infrastructure categories",
        description:
          "Data Center Operations, Cloud & DevOps, Cybersecurity, Networking, Databases, Backup & Continuity, AI/ML, Project Management and more.",
        evidence: "verified",
      },
      {
        icon: "file",
        title: "Proposals & direct negotiation",
        description: "Companies post roles or invite professionals; professionals respond with proposals and negotiate directly.",
        evidence: "verified",
      },
      {
        icon: "message",
        title: "Chat, files & milestones",
        description: "Collaboration happens in the platform — messaging, file sharing and milestone tracking.",
        evidence: "verified",
      },
      {
        icon: "card",
        title: "Milestone payments",
        description: "Payments are released when agreed work or a milestone is completed, backed by Stripe and Stripe Connect.",
        evidence: "verified",
      },
      {
        icon: "globe",
        title: "Global Employment (EOR)",
        description: "Full-time international hiring without a local entity, through Employer-of-Record partners.",
        evidence: "verified",
      },
    ],
    flows: [
      {
        actor: "Company",
        steps: ["Post or find talent", "Get proposals", "Choose & collaborate", "Pay securely"],
      },
      {
        actor: "Professional",
        steps: ["Create your profile", "Get matched", "Submit a proposal", "Work & get paid"],
      },
    ],
    architecture: {
      note: "Next.js front end, dedicated API, real-time layer, Stripe, identity verification and S3 are observable in the production app.",
      nodes: [
        { layer: "client", label: "Browser", detail: "Company + professional workspaces", evidence: "verified" },
        { layer: "frontend", label: "Next.js", detail: "React · Redux", evidence: "verified" },
        { layer: "api", label: "REST API", detail: "Dedicated API service", evidence: "verified" },
        { layer: "backend", label: "Real-time layer", detail: "Socket.IO for live collaboration", evidence: "verified" },
        { layer: "cloud", label: "AWS S3", detail: "Files and media", evidence: "verified" },
        { layer: "integrations", label: "Stripe + Connect", detail: "Payments, payouts, saved cards", evidence: "verified" },
        { layer: "integrations", label: "Identity verification", detail: "Verified-talent onboarding (Persona)", evidence: "verified" },
      ],
    },
    integrations: [
      { name: "Stripe", role: "Payments and Stripe Connect payouts", evidence: "verified" },
      { name: "AWS S3", role: "File storage", evidence: "verified" },
      { name: "Persona", role: "Identity verification", evidence: "verified" },
    ],
    technologies: [
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "Redux", evidence: "verified" },
      { name: "Socket.IO", evidence: "verified" },
      { name: "Stripe", evidence: "verified" },
      { name: "AWS S3", evidence: "verified" },
    ],
    contribution: null,
    sources: [{ label: "sansaino.com", href: "https://sansaino.com/" }],
    schemaType: "WebApplication",
  },
  {
    slug: "consult-hub",
    name: "Consult Hub",
    category: "Marketplace · Construction Procurement",
    tagline:
      "An Australian procurement platform that takes a construction project from client brief to consultant design to builder tender.",
    summary:
      "A procurement platform connecting clients, design consultants and licensed builders from first brief to construction tender.",
    platform: "Web platform",
    region: "Australia",
    links: [{ label: "Visit consulthub.au", href: "https://www.consulthub.au/", primary: true }],
    cover: {
      src: "/projects/consult-hub/cover.webp",
      alt: "Consult Hub homepage: “Australia's Procurement Platform for Design & Construction Projects.”",
    },
    gallery: [
      {
        src: "/projects/consult-hub/workflow.webp",
        alt: "Three-step workflow — client posts project, consultants design, builders tender — and role cards for clients, consultants and builders.",
        caption: "“Everyone plays their part. Nobody oversteps.” — three roles, one workflow.",
      },
      {
        src: "/projects/consult-hub/about.webp",
        alt: "About section describing procurement of design consultants and construction tendering.",
        caption: "Procure consultants, then tender construction — in one place.",
      },
      {
        src: "/projects/consult-hub/faq.webp",
        alt: "Frequently asked questions and the closing call to action.",
        caption: "FAQ and launch call to action.",
      },
    ],
    overview: [
      "Consult Hub is an Australian procurement platform for design and construction projects. It connects three parties in a single workflow: clients (developers, homeowners and project managers), design consultants (architects, engineers, certifiers and project managers) and licensed builders.",
      "The product's promise is to replace the email chaos of procurement with one connected flow — from the first sketch to construction tendering.",
    ],
    problem:
      "Procuring consultants and builders for a construction project usually runs through scattered emails and spreadsheets, and the handoff between design and tender is where information gets lost.",
    solution:
      "A role-based workflow with clear boundaries. Clients post a project and choose their team; consultants bid on the brief, deliver design documentation and obtain DA & CC approvals; licensed builders then submit competitive tenders, which the client reviews and awards.",
    features: [
      {
        icon: "users",
        title: "Three-sided roles",
        description: "Clients, consultants and builders each get a scoped part of the workflow — “Everyone plays their part. Nobody oversteps.”",
        evidence: "verified",
      },
      {
        icon: "file",
        title: "Project briefs",
        description: "Clients post projects of any scale — residential, commercial and larger developments.",
        evidence: "verified",
      },
      {
        icon: "gavel",
        title: "Fee proposals & bidding",
        description: "Consultants submit fee proposals against a client brief; the client reviews bids and chooses.",
        evidence: "verified",
      },
      {
        icon: "badge",
        title: "Design & approvals stage",
        description: "Winning consultants deliver the design and obtain DA & CC approvals so the project is ready to build.",
        evidence: "verified",
      },
      {
        icon: "hardhat",
        title: "Construction tendering",
        description: "Qualified builders submit competitive tenders; the client reviews and awards the work.",
        evidence: "verified",
      },
      {
        icon: "shield",
        title: "Verified consultants, licensed builders",
        description: "The marketplace is positioned around verified consultants and licensed builders.",
        evidence: "verified",
      },
    ],
    flows: [
      {
        actor: "Client",
        steps: ["Post a project", "Review consultant proposals", "Appoint a consultant", "Review builder tenders", "Award"],
      },
      {
        actor: "Consultant",
        steps: ["Bid on a brief", "Deliver design", "Obtain DA & CC approvals"],
      },
      {
        actor: "Builder",
        steps: ["Access projects", "Submit a tender", "Win the work"],
      },
    ],
    architecture: {
      note: "The Next.js front end and token-based API client are observable.",
      nodes: [
        { layer: "client", label: "Browser", detail: "Client, consultant and builder journeys", evidence: "verified" },
        { layer: "frontend", label: "Next.js", detail: "React · Redux", evidence: "verified" },
        { layer: "api", label: "REST API", detail: "Access + refresh token authentication", evidence: "verified" },
      ],
    },
    integrations: [],
    technologies: [
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "Redux", evidence: "verified" },
      { name: "REST API", evidence: "verified" },
    ],
    contribution: null,
    sources: [{ label: "consulthub.au", href: "https://www.consulthub.au/" }],
    schemaType: "WebApplication",
  },
  {
    slug: "huahineats",
    name: "Hua Hin Eats",
    category: "Food Delivery · Multi-portal",
    tagline:
      "A bilingual food-delivery platform for Hua Hin, Thailand — customer site, restaurant discovery and a separate partner portal.",
    summary:
      "A Thai/English food-delivery platform for Hua Hin with restaurant discovery, partner onboarding and a dedicated restaurant portal.",
    platform: "Web platform",
    region: "Thailand",
    links: [
      { label: "Visit huahineats.com", href: "https://huahineats.com/", primary: true },
      { label: "Partner portal", href: "https://restaurants.huahineats.com/" },
    ],
    cover: {
      src: "/projects/huahineats/cover.webp",
      alt: "Hua Hin Eats homepage: “Savor the Flavors of Hua Hin Eats, Instantly” with phone mockups of the ordering app.",
    },
    gallery: [
      {
        src: "/projects/huahineats/restaurants.webp",
        alt: "Newly onboarded restaurants page with a cuisine filter and restaurant cards showing delivery times.",
        caption: "Restaurant discovery with cuisine filtering and delivery-time estimates.",
      },
      {
        src: "/projects/huahineats/surplus.webp",
        alt: "Surplus food section: make an impact, affordable meals, see your impact grow, discover local options.",
        caption: "Surplus-food positioning for restaurants and customers.",
      },
      {
        src: "/projects/huahineats/partner.webp",
        alt: "Hua Hin Eats Partner Portal sign-in screen.",
        caption: "Separate partner portal for restaurants.",
      },
    ],
    overview: [
      "Hua Hin Eats is a local food-delivery platform for Hua Hin, Thailand. The public web platform introduces the service and its customer app, lets visitors browse restaurants by cuisine, and runs restaurant partner acquisition.",
      "Restaurants manage their presence through a separate Partner Portal. The platform also leans into surplus food — inviting restaurants to sell surplus at discounted prices and framing it around reducing waste.",
    ],
    problem:
      "Restaurants in a regional city need a delivery channel and a way to move surplus stock; customers need one place to see what's open nearby and order from it.",
    solution:
      "A multi-surface product: a bilingual customer-facing site and app, a restaurant directory with cuisine filtering, a partner sign-up funnel, and a dedicated portal where restaurants sign in to manage their side of the platform.",
    features: [
      {
        icon: "languages",
        title: "Thai / English",
        description: "Localised routes for both languages with an in-page language switcher.",
        evidence: "verified",
      },
      {
        icon: "filter",
        title: "Restaurant discovery",
        description: "Directory of newly onboarded restaurants, filterable across 30+ cuisine categories, with open status and delivery-time estimates.",
        evidence: "verified",
      },
      {
        icon: "store",
        title: "Partner portal",
        description: "A separate application on its own subdomain where restaurants sign in.",
        evidence: "verified",
      },
      {
        icon: "file",
        title: "Partner onboarding",
        description: "A sign-up form on the main site captures restaurant leads — name, restaurant, email, phone and city.",
        evidence: "verified",
      },
      {
        icon: "leaf",
        title: "Surplus food",
        description: "Discounted surplus meals, positioned around reducing food waste and tracking impact.",
        evidence: "verified",
      },
      {
        icon: "phone",
        title: "Customer app",
        description: "The site promotes a customer app for ordering and real-time delivery tracking.",
        evidence: "interpreted",
      },
    ],
    flows: [
      {
        actor: "Customer",
        steps: ["Browse restaurants", "Filter by cuisine", "Order in the app", "Track delivery"],
      },
      {
        actor: "Restaurant",
        steps: ["Sign up as a partner", "Sign in to the portal", "Manage the restaurant"],
      },
    ],
    architecture: {
      note: "Server-rendered Next.js with locale routing, a separate Next.js partner portal and S3-hosted media are observable.",
      nodes: [
        { layer: "client", label: "Web + app", detail: "Customers, restaurants", evidence: "verified" },
        { layer: "frontend", label: "Next.js (SSR)", detail: "Server-rendered, /th and /en locales", evidence: "verified" },
        { layer: "frontend", label: "Partner portal", detail: "Separate Next.js app on a subdomain", evidence: "verified" },
        { layer: "cloud", label: "AWS S3", detail: "Restaurant media and assets", evidence: "verified" },
      ],
    },
    integrations: [{ name: "AWS S3", role: "Media storage", evidence: "verified" }],
    technologies: [
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "i18n routing (TH/EN)", evidence: "verified" },
      { name: "AWS S3", evidence: "verified" },
    ],
    contribution: null,
    sources: [
      { label: "huahineats.com", href: "https://huahineats.com/" },
      { label: "Restaurants directory", href: "https://www.huahineats.com/en/restaurants" },
      { label: "Partner portal", href: "https://restaurants.huahineats.com/" },
    ],
    schemaType: "WebApplication",
  },
  {
    slug: "little-hidden-treasures",
    name: "Little Hidden Treasures",
    category: "E-commerce · eBay Automation",
    tagline:
      "An operations dashboard for an eBay store: AI-drafted listings, automatic relisting of stale items, pricing rules and buyer offers — published straight to eBay.",
    summary:
      "An AI-assisted eBay seller dashboard that drafts listings, relists stale items, automates pricing and offers, and publishes product data to eBay.",
    platform: "Internal web app",
    links: [
      { label: "View deployment", href: "https://little-hidden-treasures-web.vercel.app/", primary: true },
    ],
    cover: {
      src: "/projects/little-hidden-treasures/cover.webp",
      alt: "Little Hidden Treasures sign-in screen beside a preview of the Little Hidden Treasures LLC eBay storefront.",
    },
    gallery: [],
    overview: [
      "Little Hidden Treasures is a private operations dashboard for Little Hidden Treasures LLC, a business that sells through its eBay store. It connects to the seller's eBay account and takes on the repetitive work of running a large catalogue: creating listings, keeping them fresh, and pricing them.",
      "Product data is managed in the web app and published to eBay from there. AI drafts new listings for a person to review and approve, a nightly job finds listings that have gone stale and relists them, and rules handle price reductions and offers to interested buyers — with every automated action recorded in an activity log.",
    ],
    problem:
      "An eBay store with a large, one-of-a-kind catalogue needs constant upkeep. Listings that sit too long lose visibility and have to be relisted by hand, prices need adjusting, interested buyers need offers, and every new item needs a complete listing written and published. Done manually in eBay's seller tools, that work doesn't scale.",
    solution:
      "A dashboard connected to the store's eBay account that publishes listings from the website straight to eBay and automates the upkeep: AI-generated drafts that are approved and listed in one step, scheduled stale-listing detection with automatic relisting and optional price reductions, rule-based pricing and buyer offers, and reporting on everything the automation does.",
    features: [
      {
        icon: "store",
        title: "Publish to eBay",
        description:
          "Create and edit products in the dashboard — category, brand, shipping, fulfilment and return policies — and publish them to the connected eBay store, with sync back from eBay.",
        evidence: "confirmed",
      },
      {
        icon: "clock",
        title: "Stale listing relisting",
        description:
          "A job runs every night to check published listings. Anything older than the store's threshold with no watchers is flagged stale and can be relisted automatically, with an optional price reduction.",
        evidence: "confirmed",
      },
      {
        icon: "bot",
        title: "AI listing drafts",
        description:
          "AI generates listing drafts with a suggested price; they land in a review queue where a person approves and lists them, or deletes them.",
        evidence: "confirmed",
      },
      {
        icon: "file",
        title: "Relist failure queue",
        description:
          "Relists that eBay rejects are collected with their reason, searchable by SKU, title or item number, and can be marked resolved once fixed.",
        evidence: "confirmed",
      },
      {
        icon: "card",
        title: "Pricing & offer automation",
        description:
          "Automated pricing rules, plus auto-offer rules that send discounted offers to buyers watching a listing — within eBay's minimum-discount limits.",
        evidence: "confirmed",
      },
      {
        icon: "chart",
        title: "Reports & AI activity log",
        description:
          "Sales performance, revenue trends, top sellers and automation stats, alongside a full audit trail of every automated action.",
        evidence: "confirmed",
      },
      {
        icon: "users",
        title: "Staff, roles & permissions",
        description: "Invite team members and give them roles with specific permissions.",
        evidence: "confirmed",
      },
      {
        icon: "lock",
        title: "Secure access",
        description: "Email and password sign-in with OTP-based password recovery in front of a private dashboard.",
        evidence: "verified",
      },
    ],
    flows: [
      {
        actor: "New listing",
        description: "AI-assisted",
        steps: ["AI drafts the listing", "Review in the queue", "Approve & list", "Live on eBay"],
      },
      {
        actor: "Stale listings",
        description: "Nightly automation",
        steps: ["Nightly check", "Flag stale listings", "Relist, optionally cheaper", "Review failures"],
      },
      {
        actor: "Interested buyers",
        steps: ["Buyer watches a listing", "Offer rule matches", "Discounted offer sent"],
      },
    ],
    architecture: {
      note: "The eBay connection, scheduled relisting and AI drafting are confirmed from the project itself. The web app, versioned API, separate AI service and S3 storage are also observable from the public deployment.",
      nodes: [
        { layer: "client", label: "Browser", detail: "Store owner and staff", evidence: "verified" },
        { layer: "frontend", label: "Next.js on Vercel", detail: "React · Redux Toolkit", evidence: "verified" },
        { layer: "api", label: "REST API", detail: "Versioned /api/v1, separately hosted", evidence: "verified" },
        { layer: "backend", label: "Scheduled jobs", detail: "Nightly stale check and relist runs", evidence: "confirmed" },
        { layer: "ai", label: "AI service", detail: "Listing drafts and suggested prices", evidence: "confirmed" },
        { layer: "cloud", label: "AWS S3", detail: "Product media", evidence: "verified" },
        { layer: "integrations", label: "eBay", detail: "Listings, relisting, offers, sync", evidence: "confirmed" },
      ],
    },
    integrations: [
      { name: "eBay", role: "Publishing listings, relisting, buyer offers and store sync", evidence: "confirmed" },
      { name: "AI", role: "Listing drafts and suggested prices", evidence: "confirmed" },
      { name: "AWS S3", role: "Product media storage", evidence: "verified" },
    ],
    technologies: [
      { name: "Next.js", evidence: "verified" },
      { name: "React", evidence: "verified" },
      { name: "Redux Toolkit", evidence: "verified" },
      { name: "eBay APIs", evidence: "confirmed" },
      { name: "Vercel", evidence: "verified" },
      { name: "AWS S3", evidence: "verified" },
    ],
    contribution: null,
    sources: [
      { label: "little-hidden-treasures-web.vercel.app", href: "https://little-hidden-treasures-web.vercel.app/" },
    ],
    schemaType: "WebApplication",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return {
    previous: projects[(i - 1 + n) % n]!,
    next: projects[(i + 1) % n]!,
  };
}
