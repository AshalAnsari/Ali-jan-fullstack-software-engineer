import { renderOg, ogSize } from "@/lib/og";
import { getProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Ali Jan Jameel";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOg({
    eyebrow: project ? `Case study · ${project.category}` : "Case study",
    title: project?.name ?? "Project",
    subtitle: project?.summary ?? site.description,
    footer: site.name,
  });
}
