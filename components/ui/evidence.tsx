import type { Evidence } from "@/lib/projects";
import { cn } from "@/lib/utils";

const copy: Record<Evidence, { label: string; title: string }> = {
  verified: { label: "Verified", title: "Directly observable on the public product" },
  confirmed: { label: "Confirmed", title: "Confirmed by Ali from the project itself" },
  interpreted: { label: "Interpreted", title: "A reasonable reading of public evidence" },
};

export function EvidenceDot({ evidence, className }: { evidence: Evidence; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 shrink-0 rounded-full",
        evidence === "verified" && "bg-success",
        evidence === "confirmed" && "bg-primary",
        evidence === "interpreted" && "bg-accent",
        className,
      )}
    />
  );
}

export function EvidenceBadge({
  evidence,
  compact = false,
  className,
}: {
  evidence: Evidence;
  /** Dot only; the label stays available to screen readers. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <span
      title={copy[evidence].title}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted",
        className,
      )}
    >
      <EvidenceDot evidence={evidence} className={compact ? "size-2" : undefined} />
      <span className={compact ? "sr-only" : undefined}>{copy[evidence].label}</span>
    </span>
  );
}

export function EvidenceLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)} aria-label="Evidence legend">
      {(Object.keys(copy) as Evidence[]).map((e) => (
        <li key={e} className="flex items-center gap-2 text-xs text-muted">
          <EvidenceDot evidence={e} />
          <span>
            <span className="text-foreground">{copy[e].label}</span> — {copy[e].title.charAt(0).toLowerCase() + copy[e].title.slice(1)}
          </span>
        </li>
      ))}
    </ul>
  );
}
