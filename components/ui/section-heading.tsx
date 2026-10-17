import { cn } from "@/lib/utils";
import { Label } from "./label";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  align?: "start" | "split";
};

/**
 * Numbered section header. "split" puts the description in a second
 * column on wide screens — the editorial layout used across the site.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  id,
  className,
  align = "split",
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "grid gap-6",
        align === "split" && description && "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-16",
        className,
      )}
    >
      <div className="space-y-5">
        <Label index={index}>{eyebrow}</Label>
        <Tag
          id={id}
          className={cn(
            "font-medium text-foreground",
            Tag === "h1" ? "text-h1" : "text-h2",
          )}
        >
          {title}
        </Tag>
      </div>
      {description && <div className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">{description}</div>}
    </header>
  );
}

/** Serif italic accent for a word or phrase inside a heading. */
export function Accent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <em className={cn("font-serif font-normal italic tracking-[-0.01em] text-foreground", className)}>{children}</em>;
}
