"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import type { Layer, LayerId } from "@/lib/stack";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/animations/motion-provider";

export type LayerUsage = Partial<Record<LayerId, { slug: string; name: string }[]>>;

/**
 * The engineering range as a navigable map: eight layers, top of the
 * stack to the bottom. Selecting a layer reveals its technologies and
 * the case studies where that layer is publicly verifiable.
 */
export function EngineeringMap({ layers, usage }: { layers: Layer[]; usage: LayerUsage }) {
  const [active, setActive] = useState<LayerId>(layers[0]!.id);
  const current = layers.find((l) => l.id === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <ol className="relative" aria-label="Engineering layers">
        <span aria-hidden className="absolute bottom-6 left-[15px] top-6 w-px bg-border" />
        {layers.map((layer) => {
          const on = layer.id === active;
          return (
            <li key={layer.id} className="relative">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`layer-panel-${layer.id}`}
                onClick={() => setActive(layer.id)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(layer.id)}
                className="group flex w-full items-center gap-5 py-3.5 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 grid size-[31px] shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-colors duration-300",
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border-strong bg-background text-subtle group-hover:text-foreground",
                  )}
                >
                  {layer.code}
                </span>
                <span
                  className={cn(
                    "text-2xl font-medium tracking-[-0.03em] transition-colors duration-300 sm:text-3xl",
                    on ? "text-foreground" : "text-subtle group-hover:text-muted",
                  )}
                >
                  {layer.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "ml-auto hidden font-mono text-[11px] text-subtle transition-opacity sm:block",
                    on ? "opacity-100" : "opacity-0",
                  )}
                >
                  {layer.technologies.length} {layer.technologies.length === 1 ? "tool" : "tools"}
                </span>
              </button>

              {/* Inline panel on small screens */}
              <AnimatePresence initial={false}>
                {on && (
                  <m.div
                    key="inline"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="overflow-hidden pl-[52px] lg:hidden"
                  >
                    <LayerDetail layer={layer} usage={usage[layer.id]} id={`layer-panel-${layer.id}`} className="pb-5" />
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>

      {/* Sticky panel on large screens */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(var(--header-h)+32px)] overflow-hidden rounded-lg border border-border bg-surface">
          <div aria-hidden className="bg-dots absolute inset-0 opacity-40" />
          <div className="relative p-8 xl:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <p className="font-mono text-label uppercase text-primary">
                  {current.code} / {current.label}
                </p>
                <LayerDetail layer={current} usage={usage[current.id]} large />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayerDetail({
  layer,
  usage,
  large,
  id,
  className,
}: {
  layer: Layer;
  usage?: { slug: string; name: string }[];
  large?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <div id={id} className={className}>
      <p className={cn("text-muted", large ? "mt-5 text-xl leading-snug text-foreground" : "text-sm leading-relaxed")}>
        {layer.summary}
      </p>
      <ul className={cn("flex flex-wrap gap-2", large ? "mt-8" : "mt-4")}>
        {layer.technologies.map((t) => (
          <li
            key={t.name}
            className="inline-flex h-8 items-center gap-2 rounded-full border border-border-strong bg-background/70 px-3.5 text-[13px] text-foreground"
          >
            {t.name}
            {t.domain && <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">{t.domain}</span>}
          </li>
        ))}
      </ul>
      {usage && usage.length > 0 && (
        <div className={cn(large ? "mt-10 border-t border-border pt-6" : "mt-4")}>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">Visible in case studies</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {usage.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-sm text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-primary"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
