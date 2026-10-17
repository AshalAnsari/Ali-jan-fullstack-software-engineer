/**
 * Site-wide configuration.
 *
 * Contact details and social profiles are intentionally empty until Ali
 * provides them — every consumer renders a clean fallback instead of a
 * made-up URL. Fill these in and the header, footer, contact page and
 * structured data pick them up automatically.
 */

export type SocialLink = {
  label: string;
  href: string;
};

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  name: "Ali Jan Jameel",
  shortName: "Ali Jan",
  initials: "AJ",
  role: "Software Engineer",
  url: resolveSiteUrl(),
  locale: "en_US",
  description:
    "Ali Jan Jameel is a software engineer building web products end to end — React and Next.js interfaces, Node.js and NestJS APIs, MongoDB and SQL data, AWS, AI integrations and third-party services like Stripe.",
  /** Leave empty to hide email everywhere; the contact form appears once it's set. */
  email: "" as string,
  /** Display and dialable forms of the same number. */
  phone: { display: "+92 310 2866415", href: "tel:+923102866415" } as { display: string; href: string } | null,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ali-jan-software-developer" },
    { label: "GitHub", href: "https://github.com/AliJanGithub" },
  ] as SocialLink[],
  themeColor: "#0b0c0e",
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavHref = (typeof navigation)[number]["href"];
