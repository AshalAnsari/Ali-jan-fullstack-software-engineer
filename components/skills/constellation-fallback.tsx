import { cn } from "@/lib/utils";
import { edges, nodes } from "./constellation-layout";

const SCALE = 58;
const W = 440;
const H = 400;
const project = ([x, y]: [number, number, number]) => [W / 2 + x * SCALE, H / 2 - y * SCALE] as const;

/**
 * Flat projection of the constellation. Shown while the 3D scene loads,
 * and permanently for reduced motion or when WebGL is unavailable.
 */
export function ConstellationFallback({ active, className }: { active: string | null; className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className={cn("h-full w-full", className)}>
      {edges.map(([a, b, category], i) => {
        const [x1, y1] = project(a);
        const [x2, y2] = project(b);
        const on = active === null || category === active || category === "link";
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={category === active ? "var(--primary)" : "var(--border-strong)"}
            strokeWidth={1}
            opacity={on ? 1 : 0.35}
          />
        );
      })}
      {nodes.map((n) => {
        const [x, y] = project(n.position);
        const on = active === null || n.category === active;
        return (
          <g key={n.id} opacity={on ? 1 : 0.3} className="transition-opacity duration-500">
            <circle
              cx={x}
              cy={y}
              r={n.hub ? 4.5 : 3}
              fill={n.category === active ? "var(--primary)" : n.hub ? "var(--foreground)" : "var(--accent)"}
            />
            <text
              x={x}
              y={y - (n.hub ? 11 : 8)}
              textAnchor="middle"
              className={cn("font-mono", n.hub ? "fill-foreground text-[10px] uppercase tracking-[0.12em]" : "fill-muted text-[9px]")}
            >
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
