import type { Project } from "@/lib/projects";
import { EvidenceBadge, EvidenceDot } from "@/components/ui/evidence";
import { cn } from "@/lib/utils";

/** Integrations and technologies, each carrying its evidence level. */
export function TechStack({ project }: { project: Project }) {
  const hasIntegrations = project.integrations.length > 0;

  return (
    <div className={cn("grid gap-10", hasIntegrations && "lg:grid-cols-2 lg:gap-14")}>
      {hasIntegrations && (
        <div>
          <h3 className="font-mono text-label uppercase text-subtle">Integrations & services</h3>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {project.integrations.map((integration) => (
              <li key={integration.name} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-medium text-foreground">{integration.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{integration.role}</p>
                </div>
                <EvidenceBadge evidence={integration.evidence} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-mono text-label uppercase text-subtle">Technology</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech.name}
              title={tech.note}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-border-strong bg-surface px-3.5 text-[13px] text-foreground"
            >
              <EvidenceDot evidence={tech.evidence} />
              {tech.name}
            </li>
          ))}
        </ul>
        {project.technologies.some((t) => t.note) && (
          <ul className="mt-5 space-y-1.5 text-xs leading-relaxed text-subtle">
            {project.technologies
              .filter((t) => t.note)
              .map((t) => (
                <li key={t.name}>
                  <span className="text-muted">{t.name}:</span> {t.note}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
