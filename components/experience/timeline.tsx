"use client";

import { useRef, useState } from "react";
import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ExperienceEntry } from "@/lib/experience";
import { cn, pad } from "@/lib/utils";
import { EASE_OUT } from "@/components/animations/motion-provider";
import { Reveal } from "@/components/animations/reveal";

/**
 * Career progression as a vertical track. The ember line fills as the
 * reader scrolls; each stage lifts into place. Entries only become
 * expandable once they have details to show.
 */
export function Timeline({ entries, compact = false }: { entries: ExperienceEntry[]; compact?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-border sm:left-[23px]" />
      <m.span
        aria-hidden
        style={{ scaleY: progress }}
        className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-primary sm:left-[23px]"
      />
      {entries.map((entry, i) => (
        <TimelineItem key={entry.id} entry={entry} index={i} compact={compact} isLast={i === entries.length - 1} />
      ))}
    </ol>
  );
}

function TimelineItem({
  entry,
  index,
  compact,
  isLast,
}: {
  entry: ExperienceEntry;
  index: number;
  compact: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasDetails = !!entry.summary || entry.highlights.length > 0 || entry.technologies.length > 0;
  const panelId = `exp-${entry.id}`;

  return (
    <Reveal as="li" delay={index * 0.08} className={cn("relative pl-14 sm:pl-20", !isLast && (compact ? "pb-10" : "pb-14 sm:pb-20"))}>
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 grid size-10 place-items-center rounded-full border bg-background font-mono text-[11px] sm:size-12",
          isLast ? "border-primary text-primary" : "border-border-strong text-muted",
        )}
      >
        {pad(index + 1)}
      </span>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10">
        <div>
          <p className="font-mono text-label uppercase text-subtle">{entry.stage}</p>
          <h3 className={cn("mt-3 font-medium text-foreground", compact ? "text-h3" : "text-[clamp(1.75rem,1.4rem+1.4vw,2.75rem)] leading-[1.05] tracking-[-0.035em]")}>
            {entry.role}
          </h3>
          <p className="mt-2 text-lg text-muted">{entry.company}</p>
        </div>
        {(entry.period || entry.location) && (
          <dl className="flex gap-6 font-mono text-[11px] text-subtle md:flex-col md:items-end md:gap-1.5 md:pt-7 md:text-right">
            {entry.period && (
              <div>
                <dt className="sr-only">Period</dt>
                <dd>{entry.period}</dd>
              </div>
            )}
            {entry.location && (
              <div>
                <dt className="sr-only">Location</dt>
                <dd>{entry.location}</dd>
              </div>
            )}
          </dl>
        )}
      </div>

      {!compact && hasDetails && (
          <div className="mt-6">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {open ? "Hide details" : "Show details"}
              <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-500 ease-out-expo", open && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl space-y-4 pt-5 text-muted">
                    {entry.summary && <p className="leading-relaxed">{entry.summary}</p>}
                    {entry.highlights.length > 0 && (
                      <ul className="list-disc space-y-1.5 pl-5 marker:text-primary">
                        {entry.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                    {entry.technologies.length > 0 && (
                      <p className="font-mono text-xs">{entry.technologies.join(" · ")}</p>
                    )}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        )}
    </Reveal>
  );
}
