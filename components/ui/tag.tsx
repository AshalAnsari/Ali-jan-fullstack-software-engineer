import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border border-border bg-surface/70 px-3 font-mono text-[11px] tracking-tight text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Inline list separated by middle dots: "Next.js · TypeScript · AI". */
export function DotList({ items, className }: { items: string[]; className?: string }) {
  return (
    <p className={cn("font-mono text-xs text-muted", className)}>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span aria-hidden className="px-1.5 text-subtle">·</span>}
          {item}
        </span>
      ))}
    </p>
  );
}
