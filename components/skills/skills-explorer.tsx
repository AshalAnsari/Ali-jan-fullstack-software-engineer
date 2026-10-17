"use client";

import { useState } from "react";
import { m } from "motion/react";
import type { SkillCategory } from "@/lib/stack";
import { cn, pad } from "@/lib/utils";
import { SPRING } from "@/components/animations/motion-provider";
import { Constellation } from "./constellation";

/**
 * Skills as a system rather than a logo wall: filter by category, and
 * the grid and the constellation highlight together. Hovering a skill
 * previews its category.
 */
export function SkillsExplorer({ categories }: { categories: SkillCategory[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const active = preview ?? selected;
  const current = categories.find((c) => c.id === active);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div>
        <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
          <FilterButton label="All" pressed={selected === null} onClick={() => setSelected(null)} />
          {categories.map((c) => (
            <FilterButton
              key={c.id}
              label={c.label}
              count={c.skills.length}
              pressed={selected === c.id}
              onClick={() => setSelected((s) => (s === c.id ? null : c.id))}
            />
          ))}
        </div>

        <p className="mt-6 min-h-[3em] max-w-lg text-sm leading-relaxed text-muted" aria-live="polite">
          {current ? current.description : "Six areas, one system. Pick an area to see how it fits into the whole."}
        </p>

        <ul className="mt-6 grid grid-cols-2 overflow-hidden rounded-lg border-l border-t border-border sm:grid-cols-3">
          {categories.flatMap((c, ci) =>
            c.skills.map((skill, si) => {
              const dim = active !== null && active !== c.id;
              const hot = active === c.id;
              return (
                <li
                  key={`${c.id}-${skill.name}`}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(c.id)}
                  onPointerLeave={() => setPreview(null)}
                  className={cn(
                    "group relative flex min-h-[104px] flex-col justify-between border-b border-r border-border bg-background p-4 transition-[background-color,opacity] duration-500 sm:min-h-[116px] sm:p-5",
                    dim ? "opacity-35" : "opacity-100",
                    hot && "bg-surface",
                  )}
                >
                  <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
                    <span className={cn("transition-colors", hot && "text-primary")}>{c.label}</span>
                    <span>
                      {pad(ci + 1)}.{si + 1}
                    </span>
                  </span>
                  <span>
                    <span className="block text-lg font-medium tracking-[-0.02em] text-foreground">{skill.name}</span>
                    {skill.domain && <span className="mt-0.5 block text-xs text-subtle">{skill.domain}</span>}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px origin-left bg-primary transition-transform duration-700 ease-out-expo",
                      hot ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </li>
              );
            }),
          )}
        </ul>
      </div>

      <div className="relative lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
        <div className="relative overflow-hidden rounded-lg border border-border bg-background-secondary">
          <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-60" />
          <Constellation active={active} className="relative mx-auto max-w-[560px]" />
          <p className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
            Backend at the centre · layers in orbit
          </p>
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  label,
  count,
  pressed,
  onClick,
}: {
  label: string;
  count?: number;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[13px] transition-colors duration-300",
        pressed ? "border-transparent text-primary-foreground" : "border-border-strong text-muted hover:text-foreground",
      )}
    >
      {pressed && <m.span layoutId="skill-filter" transition={SPRING} aria-hidden className="absolute inset-0 rounded-full bg-primary" />}
      <span className="relative">{label}</span>
      {count !== undefined && <span className={cn("relative font-mono text-[10px]", pressed ? "text-primary-foreground/70" : "text-subtle")}>{count}</span>}
    </button>
  );
}
