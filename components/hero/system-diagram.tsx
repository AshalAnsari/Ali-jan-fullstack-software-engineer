"use client";

import { useEffect, useId, useState } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { layerById, type LayerId } from "@/lib/stack";
import { cn } from "@/lib/utils";
import { compact, cycle, wide, type Geometry } from "./diagram-geometry";

const CYCLE_MS = 2600;

/**
 * Interactive architecture of the stack Ali works across. Idle, it walks
 * the request path layer by layer; hover or focus takes over. Pointer
 * movement adds a small amount of tilt for depth on desktop.
 */
export function SystemDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [auto, setAuto] = useState(0);
  const [pinned, setPinned] = useState<LayerId | null>(null);
  const active = pinned ?? cycle[auto % cycle.length]!;
  const detailId = useId();

  useEffect(() => {
    if (reduce || pinned) return;
    const t = window.setInterval(() => setAuto((n) => n + 1), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [reduce, pinned]);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const layer = layerById[active];
  const interact = {
    active,
    animate: !reduce,
    describedBy: detailId,
    onEnter: (id: LayerId) => setPinned(id),
    onLeave: () => setPinned(null),
  };

  return (
    <div className={cn("relative [perspective:1400px]", className)}>
      <m.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
        <div className="hidden sm:block">
          <Diagram geometry={wide} label="System architecture diagram" {...interact} />
        </div>
        <div className="sm:hidden">
          <Diagram geometry={compact} label="System architecture diagram" {...interact} />
        </div>
      </m.div>

      <div
        id={detailId}
        className="mt-5 grid gap-3 rounded-lg border border-border bg-surface/60 p-4 backdrop-blur sm:grid-cols-[auto_1fr] sm:gap-5"
      >
        <p className="flex items-center gap-2 font-mono text-label uppercase text-primary">
          <span>{layer.code}</span>
          <span className="text-foreground">{layer.label}</span>
        </p>
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-muted">{layer.summary}</p>
          <p className="font-mono text-xs text-foreground/80">
            {layer.technologies.map((t) => t.name).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

type DiagramProps = {
  geometry: Geometry;
  label: string;
  active: LayerId;
  animate: boolean;
  describedBy: string;
  onEnter: (id: LayerId) => void;
  onLeave: () => void;
};

function Diagram({ geometry, label, active, animate, describedBy, onEnter, onLeave }: DiagramProps) {
  const pathId = useId();
  const isCompact = geometry === compact;

  return (
    <svg
      viewBox={`0 0 ${geometry.width} ${geometry.height}`}
      role="group"
      aria-label={label}
      className="h-auto w-full overflow-visible select-none"
    >
      {/* Wires */}
      {geometry.wires.map((wire, i) => {
        const hot = wire.ids.includes(active);
        return (
          <g key={wire.d}>
            <path id={`${pathId}-${i}`} d={wire.d} fill="none" stroke="var(--border-strong)" strokeWidth={1} />
            <path
              d={wire.d}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={1.25}
              strokeDasharray="4 6"
              className={cn("transition-opacity duration-500", animate && "animate-flow", hot ? "opacity-100" : "opacity-0")}
            />
            {animate && (
              <circle r={2.5} fill="var(--primary)" opacity={hot ? 1 : 0.35}>
                <animateMotion dur={isCompact ? "1.6s" : "1.8s"} begin={`${i * 0.35}s`} repeatCount="indefinite">
                  <mpath href={`#${pathId}-${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        );
      })}

      {/* Compact layout: ticks from the spine into each box */}
      {isCompact &&
        geometry.boxes.map((b) => (
          <path key={`tick-${b.id}`} d={`M16 ${b.y + b.h / 2} H${b.x}`} stroke="var(--border-strong)" strokeWidth={1} />
        ))}

      {/* Layer boxes */}
      {geometry.boxes.map((b) => {
        const layer = layerById[b.id];
        const on = b.id === active;
        return (
          <g
            key={b.id}
            tabIndex={0}
            role="button"
            aria-pressed={on}
            aria-label={`${layer.code} ${layer.label}: ${layer.technologies.map((t) => t.name).join(", ")}`}
            aria-describedby={describedBy}
            onPointerEnter={() => onEnter(b.id)}
            onPointerLeave={onLeave}
            onFocus={() => onEnter(b.id)}
            onBlur={onLeave}
            className="cursor-default outline-none [&:focus-visible>rect:first-child]:stroke-[var(--primary)] [&:focus-visible>rect:first-child]:[stroke-width:2]"
          >
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={10}
              fill={on ? "var(--surface-raised)" : "var(--surface)"}
              stroke={on ? "var(--primary)" : "var(--border-strong)"}
              strokeWidth={1}
              className="transition-[fill,stroke] duration-500"
            />
            {on && (
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={10} fill="var(--primary)" opacity={0.06} />
            )}
            {isCompact ? (
              <>
                <text x={b.x + 14} y={b.y + 27} className="fill-subtle font-mono text-[10px]">
                  <tspan className={on ? "fill-primary" : undefined}>{layer.code}</tspan>
                </text>
                <text x={b.x + 44} y={b.y + 28} className={cn("text-[14px] font-medium", on ? "fill-foreground" : "fill-muted")}>
                  {layer.label}
                </text>
                <text x={b.x + b.w - 14} y={b.y + 27} textAnchor="end" className="fill-subtle font-mono text-[10px]">
                  {b.sub}
                </text>
              </>
            ) : (
              <>
                <text x={b.x + 14} y={b.y + 24} className={cn("font-mono text-[10px] tracking-[0.1em]", on ? "fill-primary" : "fill-subtle")}>
                  {layer.code}
                </text>
                <text x={b.x + 38} y={b.y + 24} className={cn("text-[14px] font-medium", on ? "fill-foreground" : "fill-muted")}>
                  {layer.label}
                </text>
                <text x={b.x + 14} y={b.y + 44} className="fill-subtle font-mono text-[10.5px]">
                  {b.sub}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
