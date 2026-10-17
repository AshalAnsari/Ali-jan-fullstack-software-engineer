import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

/** Standard vertical rhythm for top-level page sections. */
export function Section({
  id,
  labelledBy,
  className,
  children,
  bordered = true,
  flushTop = false,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
  bordered?: boolean;
  /** Drop the top padding when the section directly follows a page header. */
  flushTop?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(bordered && "border-t border-border", className)}>
      <Container size="wide" className={cn("py-20 sm:py-28 lg:py-32", flushTop && "pt-4 sm:pt-4 lg:pt-4")}>
        {children}
      </Container>
    </section>
  );
}
