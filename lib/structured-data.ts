import type { Project } from "./projects";
import { site } from "./site";
import { education } from "./education";
import { expertise } from "./stack";
import { absoluteUrl } from "./utils";

/**
 * schema.org JSON-LD builders. Only facts present in the site data are
 * emitted — no ratings, reviews, awards or employers-by-date.
 */

const url = (path = "/") => absoluteUrl(site.url, path);

export const personId = `${url("/")}#person`;
export const websiteId = `${url("/")}#website`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    jobTitle: site.role,
    url: url("/"),
    description: site.description,
    knowsAbout: [...expertise],
    ...(site.email ? { email: `mailto:${site.email}` } : {}),
    ...(site.phone ? { telephone: site.phone.display } : {}),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
      ...(e.url && { url: e.url }),
    })),
    ...(site.socials.length > 0 && { sameAs: site.socials.map((s) => s.href) }),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: url("/"),
    name: `${site.name} — ${site.role}`,
    description: site.description,
    inLanguage: "en",
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
}) {
  return {
    "@type": type,
    "@id": `${url(path)}#webpage`,
    url: url(path),
    name,
    description,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

export function projectSchema(project: Project) {
  const primary = project.links.find((l) => l.primary) ?? project.links[0];
  const base = {
    "@type": project.schemaType === "MobileApplication" ? "MobileApplication" : "WebApplication",
    "@id": `${url(`/projects/${project.slug}`)}#project`,
    name: project.name,
    description: project.summary,
    url: primary?.href,
    image: url(project.cover.src),
    applicationCategory:
      project.schemaType === "MobileApplication" ? "EducationalApplication" : "BusinessApplication",
    mainEntityOfPage: url(`/projects/${project.slug}`),
  };

  return project.schemaType === "MobileApplication" ? { ...base, operatingSystem: "Android" } : base;
}

export function projectListSchema(projects: Project[]) {
  return {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: url(`/projects/${p.slug}`),
      name: p.name,
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
