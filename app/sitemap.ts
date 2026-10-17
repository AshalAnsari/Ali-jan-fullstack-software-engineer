import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { navigation, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navigation.map((item) => ({
    url: `${site.url}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : item.href === "/projects" ? 0.9 : 0.7,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${site.url}${project.cover.src}`],
  }));

  return [...pages, ...caseStudies];
}
