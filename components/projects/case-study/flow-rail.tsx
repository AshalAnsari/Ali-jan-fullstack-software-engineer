import type { Flow } from "@/lib/projects";
import { cn, pad } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

/** User journeys as numbered step rails — horizontal on wide screens, vertical on phones. */
export function FlowRails({ flows }: { flows: Flow[] }) {
  return (
    <div className="grid gap-5">
      {flows.map((flow, fi) => (
        <Reveal key={flow.actor} delay={fi * 0.08} className="rounded-lg border border-border bg-surface/50 p-5 sm:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-medium tracking-[-0.02em]">{flow.actor}</h3>
            {flow.description && <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">{flow.description}</p>}
          </div>
          <ol
            className={cn(
              "mt-6 grid gap-3",
              flow.steps.length >= 5 ? "md:grid-cols-5" : flow.steps.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3",
            )}
          >
            {flow.steps.map((step, i) => (
              <li key={step} className="relative flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-border-strong bg-background font-mono text-[10px] text-muted">
                  {pad(i + 1)}
                </span>
                {i < flow.steps.length - 1 && (
                  <span aria-hidden className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-border md:left-8 md:top-4 md:h-px md:w-[calc(100%-20px)]" />
                )}
                <span className="text-sm leading-snug text-foreground md:pr-4">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      ))}
    </div>
  );
}
