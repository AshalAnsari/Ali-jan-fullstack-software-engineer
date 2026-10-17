import Link from "next/link";
import type { Project } from "@/lib/projects";
import { cn, pad } from "@/lib/utils";
import { ButtonArrow } from "@/components/ui/button";
import { DotList } from "@/components/ui/tag";
import { ProjectVisual } from "./project-visual";

type ProjectCardProps = {
  project: Project;
  index: number;
  /** "feature": wide, text beside visual. "standard": visual on top. "row": compact list row. */
  variant?: "feature" | "standard" | "row";
  priority?: boolean;
  /** Feature variant only: put the visual on the left. */
  reverse?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

function verifiedStack(project: Project, count = 3) {
  return project.technologies.filter((t) => t.evidence === "verified" || t.evidence === "confirmed").slice(0, count).map((t) => t.name);
}

export function ProjectCard({
  project,
  index,
  variant = "standard",
  priority,
  reverse = false,
  headingLevel: Heading = "h3",
  className,
}: ProjectCardProps) {
  const href = `/projects/${project.slug}`;

  if (variant === "row") {
    return (
      <Link
        href={href}
        data-cursor="View"
        className={cn(
          "group/btn group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-5 transition-colors hover:border-border-strong sm:grid-cols-[3rem_1.2fr_1fr_auto] sm:gap-8",
          className,
        )}
      >
        <span className="font-mono text-xs text-subtle group-hover:text-primary">{pad(index + 1)}</span>
        <Heading className="text-xl font-medium tracking-[-0.03em] text-foreground sm:text-2xl">{project.name}</Heading>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-muted sm:block">{project.category}</span>
        <ButtonArrow className="text-muted group-hover:text-primary" />
      </Link>
    );
  }

  const isFeature = variant === "feature";

  return (
    <Link
      href={href}
      data-cursor="View"
      className={cn(
        "group/btn group relative grid gap-6 rounded-lg outline-offset-8",
        isFeature && "lg:items-center lg:gap-14",
        isFeature && (reverse ? "lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]" : "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)]"),
        className,
      )}
    >
      <ProjectVisual
        project={project}
        priority={priority}
        sizes={isFeature ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className={cn(isFeature && !reverse && "lg:order-2")}
      />

      <div className={cn("flex flex-col", isFeature && !reverse && "lg:order-1")}>
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="text-muted">{project.category}</span>
          <span className="text-subtle">{pad(index + 1)}</span>
        </div>
        <Heading
          className={cn(
            "mt-4 font-medium text-foreground transition-colors",
            isFeature ? "text-h2" : "text-[clamp(1.75rem,1.5rem+1vw,2.5rem)] leading-[1.05] tracking-[-0.035em]",
          )}
        >
          {project.name}
        </Heading>
        <p className={cn("mt-4 max-w-xl leading-relaxed text-muted", isFeature && "sm:text-lg")}>{project.tagline}</p>
        <DotList items={verifiedStack(project)} className="mt-5" />
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-primary">
          View case study
          <ButtonArrow />
        </span>
      </div>
    </Link>
  );
}
