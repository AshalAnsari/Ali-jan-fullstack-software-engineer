import type { Metadata } from "next";
import { experience } from "@/lib/experience";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Timeline } from "@/components/experience/timeline";
import { ButtonLink } from "@/components/ui/button";
import { ContactCta } from "@/components/contact/contact-cta";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "Ali Jan Jameel's career path: intern at Softly, full stack developer at ThreatCure, and software engineer at Tafsol Technologies.";

export const metadata: Metadata = pageMetadata({ title: "Experience", description, path: "/experience" });

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/experience", name: `Experience — ${site.name}`, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Experience", path: "/experience" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Experience"
        title={
          <>
            Intern to <Accent>software</Accent> engineer.
          </>
        }
        description="Three roles, in the order they happened. Dates and details are on their way."
      />

      <Section id="work-history" labelledBy="timeline-title">
        <SectionHeading
          id="timeline-title"
          index="01"
          eyebrow="Work"
          align="start"
          title={
            <>
              Where I&apos;ve <Accent>worked</Accent>.
            </>
          }
        />
        <div className="mt-14 max-w-4xl">
          <Timeline entries={experience} />
        </div>
        <div className="mt-14">
          <ButtonLink href="/education" variant="secondary">
            Education
          </ButtonLink>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
