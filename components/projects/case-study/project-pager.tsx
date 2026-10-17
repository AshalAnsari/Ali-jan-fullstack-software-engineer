import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectPager({ previous, next }: { previous: Project; next: Project }) {
  return (
    <nav aria-label="More case studies" className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
      {[
        { project: previous, dir: "Previous" as const },
        { project: next, dir: "Next" as const },
      ].map(({ project, dir }) => (
        <Link
          key={dir}
          href={`/projects/${project.slug}`}
          rel={dir === "Next" ? "next" : "prev"}
          data-cursor="View"
          className={`group flex flex-col gap-3 bg-background p-6 transition-colors duration-500 hover:bg-surface sm:p-8 ${dir === "Next" ? "sm:items-end sm:text-right" : ""}`}
        >
          <span className="flex items-center gap-2 font-mono text-label uppercase text-subtle">
            {dir === "Previous" && <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />}
            {dir} case study
            {dir === "Next" && <ArrowRight aria-hidden className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />}
          </span>
          <span className="text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-3xl">{project.name}</span>
          <span className="text-sm text-muted">{project.category}</span>
        </Link>
      ))}
    </nav>
  );
}
