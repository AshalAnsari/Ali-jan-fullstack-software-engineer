import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export type CaseSectionMeta = { id: string; label: string };

/** A numbered case-study section: mono index/label rail on the left, content on the right. */
export function CaseSection({
  id,
  index,
  label,
  title,
  children,
  className,
}: {
  id: string;
  index: string;
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-28 border-t border-border py-16 sm:py-20", className)}>
      <Label index={index} as="div">
        {label}
      </Label>
      {title ? (
        <h2 id={`${id}-title`} className="mt-5 max-w-3xl text-[clamp(1.75rem,1.4rem+1.3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          {title}
        </h2>
      ) : (
        <h2 id={`${id}-title`} className="sr-only">
          {label}
        </h2>
      )}
      <div className={cn(title ? "mt-10" : "mt-8")}>{children}</div>
    </section>
  );
}
