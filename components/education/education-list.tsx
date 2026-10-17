import { ArrowUpRight, GraduationCap } from "lucide-react";
import type { EducationEntry } from "@/lib/education";
import { cn, pad } from "@/lib/utils";
import { Reveal } from "@/components/animations/reveal";

/**
 * Education as a pair of "records": qualification first, institution and
 * years as metadata, with a thin bar showing each programme's span on a
 * shared year axis so the two read as one continuous path.
 */
export function EducationList({ entries, compact = false }: { entries: EducationEntry[]; compact?: boolean }) {
  const first = Math.min(...entries.map((e) => e.startYear));
  const last = Math.max(...entries.map((e) => e.endYear));
  const span = Math.max(1, last - first);

  return (
    <ol className="grid gap-5">
      {entries.map((entry, i) => {
        const left = ((entry.startYear - first) / span) * 100;
        const width = ((entry.endYear - entry.startYear) / span) * 100;
        const title = entry.field ? `${entry.qualification} in ${entry.field}` : entry.qualification;

        return (
          <Reveal
            as="li"
            key={entry.id}
            delay={i * 0.08}
            className={cn(
              "group relative overflow-hidden rounded-lg border border-border bg-surface/50 transition-colors duration-500 hover:border-border-strong",
              compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
            )}
          >
            <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start md:gap-8">
              <span className="grid size-11 place-items-center rounded-md border border-border-strong bg-background text-muted transition-colors duration-500 group-hover:border-primary/50 group-hover:text-primary">
                <GraduationCap aria-hidden className="size-5" strokeWidth={1.6} />
              </span>

              <div className="min-w-0">
                <p className="font-mono text-label uppercase text-subtle">
                  {pad(i + 1)} · {entry.qualification}
                </p>
                <h3
                  className={cn(
                    "mt-3 font-medium tracking-[-0.03em] text-foreground",
                    compact ? "text-xl" : "text-[clamp(1.5rem,1.3rem+0.9vw,2.25rem)] leading-[1.1]",
                  )}
                >
                  {title}
                </h3>
                <p className="mt-2 text-lg text-muted">
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
                    >
                      {entry.institution}
                      <ArrowUpRight aria-hidden className="size-4" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    entry.institution
                  )}
                </p>
                {!compact && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.focus.map((f) => (
                    <li key={f} className="inline-flex h-7 items-center rounded-full border border-border px-3 font-mono text-[11px] text-muted">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="flex gap-6 font-mono text-xs md:flex-col md:items-end md:gap-1.5 md:text-right">
                <div>
                  <dt className="sr-only">Years</dt>
                  <dd className="text-foreground">
                    {entry.startYear} — {entry.endYear}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Location</dt>
                  <dd className="text-subtle">{entry.location}</dd>
                </div>
              </dl>
            </div>

            {/* Shared year axis */}
            <div aria-hidden className="mt-7 border-t border-border pt-4">
              <div className="relative h-1 rounded-full bg-border">
                <span
                  className="absolute inset-y-0 rounded-full bg-primary"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle">
                <span>{first}</span>
                <span>{last}</span>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
