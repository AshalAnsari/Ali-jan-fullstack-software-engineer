"use client";

import { useEffect, useState } from "react";
import { cn, pad } from "@/lib/utils";
import type { CaseSectionMeta } from "./case-section";

/** Sticky, scroll-aware table of contents for a case study (desktop only). */
export function CaseToc({ sections }: { sections: CaseSectionMeta[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Case study sections" className="sticky top-[calc(var(--header-h)+40px)]">
      <p className="font-mono text-label uppercase text-subtle">Contents</p>
      <ol className="mt-5 space-y-1 border-l border-border">
        {sections.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex items-baseline gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-300",
                  on ? "border-primary text-foreground" : "border-transparent text-subtle hover:text-muted",
                )}
              >
                <span className={cn("font-mono text-[10px]", on && "text-primary")}>{pad(i + 1)}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
