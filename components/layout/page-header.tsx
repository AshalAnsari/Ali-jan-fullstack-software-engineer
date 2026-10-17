import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/** Top-of-page header for inner routes: the page's single h1. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative isolate overflow-hidden pt-(--header-h)">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60" />
      <Container size="wide" className="pb-14 pt-16 sm:pb-20 sm:pt-24 lg:pt-28">
        <div className="enter-fade">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} />
        </div>
        {children}
      </Container>
    </div>
  );
}
