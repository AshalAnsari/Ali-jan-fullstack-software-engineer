import { cn } from "@/lib/utils";

/** Monospace technical label, optionally prefixed with a section index. */
export function Label({
  index,
  children,
  className,
  as: Tag = "p",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag className={cn("flex items-center gap-3 font-mono text-label uppercase text-muted", className)}>
      {index && (
        <>
          <span className="text-primary">{index}</span>
          <span aria-hidden className="h-px w-6 bg-border-strong" />
        </>
      )}
      <span>{children}</span>
    </Tag>
  );
}
