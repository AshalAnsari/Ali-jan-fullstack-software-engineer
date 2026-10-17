import type { Metadata } from "next";
import { getLayerUsage } from "@/lib/layer-usage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { education } from "@/lib/education";
import { expertise, layers } from "@/lib/stack";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EngineeringMap } from "@/components/about/engineering-map";
import { EducationList } from "@/components/education/education-list";
import { ContactCta } from "@/components/contact/contact-cta";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "About Ali Jan Jameel, a software engineer and University of Karachi computer science graduate working across frontend, backend, APIs, databases, AI, AWS and integrations like Stripe.";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: `About ${site.name} | ${site.role}`,
  description,
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/about", name: `About ${site.name}`, description, type: "AboutPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="About"
        title={
          <>
            I work across the <Accent>whole</Accent> stack.
          </>
        }
        description={
          <>
            I&apos;m {site.name}, a software engineer. My work runs from the interface to the infrastructure: frontend and
            backend development, REST APIs, database and system design, AI bots and integrations, AWS — and the
            payment, communication and e-commerce platforms products plug into.
          </>
        }
      />

      <Section labelledBy="map-title">
        <SectionHeading
          id="map-title"
          index="01"
          eyebrow="Engineering map"
          title={
            <>
              Eight layers, <Accent>one</Accent> request path.
            </>
          }
          description="Read it top to bottom: what a user touches, how it reaches the server, where data lives, and the services around it. Select a layer for the tools I use there."
        />
        <div className="mt-16 lg:mt-20">
          <EngineeringMap layers={layers} usage={getLayerUsage()} />
        </div>
      </Section>

      <Section labelledBy="areas-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <SectionHeading
            id="areas-title"
            index="02"
            eyebrow="Areas of experience"
            align="start"
            title={
              <>
                What I&apos;ve <Accent>worked</Accent> on.
              </>
            }
          />
          <ul className="grid self-start overflow-hidden rounded-lg border-l border-t border-border sm:grid-cols-2">
            {expertise.map((area, i) => (
              <Reveal as="li" key={area} delay={(i % 6) * 0.04} className="flex items-center gap-4 border-b border-r border-border bg-background px-5 py-4">
                <span className="font-mono text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-foreground">{area}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="education-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <div>
            <SectionHeading
              id="education-title"
              index="03"
              eyebrow="Education"
              align="start"
              title={
                <>
                  Computer science, <Accent>Karachi</Accent>.
                </>
              }
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A BS in Computer Science from the University of Karachi (2021–2025), after intermediate studies at Adamjee
              Govt. Science College.
            </p>
          </div>
          <EducationList entries={education} compact />
        </div>
      </Section>

      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
          <SectionHeading
            id="story-title"
            index="04"
            eyebrow="Background"
            align="start"
            title={
              <>
                The <Accent>longer</Accent> version.
              </>
            }
          />
          <div className="space-y-8">
            <p className="text-lead text-muted">
              My path so far runs through three companies — an internship at Softly, full stack development at
              ThreatCure, and software engineering at Tafsol Technologies — built on a computer science degree from the
              University of Karachi.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/experience" variant="secondary">
                Experience
              </ButtonLink>
              <ButtonLink href="/projects" variant="secondary">
                Case studies
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
