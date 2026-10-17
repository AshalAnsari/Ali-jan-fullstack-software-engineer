import type { Metadata } from "next";
import { education } from "@/lib/education";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { EducationList } from "@/components/education/education-list";
import { ContactCta } from "@/components/contact/contact-cta";
import { ButtonLink } from "@/components/ui/button";
import { Accent } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "Ali Jan Jameel's education: a Bachelor of Science in Computer Science from the University of Karachi (2021–2025) and Intermediate at Adamjee Govt. Science College (2018–2020).";

export const metadata: Metadata = pageMetadata({ title: "Education", description, path: "/education" });

export default function EducationPage() {
  const [degree] = education;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/education", name: `Education — ${site.name}`, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Education", path: "/education" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Education"
        title={
          <>
            Computer science, <Accent>Karachi</Accent>.
          </>
        }
        description="A four-year computer science degree from the University of Karachi, after intermediate studies in the sciences and mathematics."
      >
        {degree && (
          <dl className="enter-fade mt-12 grid grid-cols-2 overflow-hidden rounded-lg border-l border-t border-border md:grid-cols-4">
            {[
              { label: "Degree", value: `BS ${degree.field ?? ""}`.trim() },
              { label: "University", value: degree.institution },
              { label: "Years", value: `${degree.startYear} — ${degree.endYear}` },
              { label: "Location", value: degree.location },
            ].map((f) => (
              <div key={f.label} className="border-b border-r border-border bg-background px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{f.label}</dt>
                <dd className="mt-1.5 text-sm text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </PageHeader>

      <Section labelledBy="education-list-title" flushTop bordered={false}>
        <h2 id="education-list-title" className="sr-only">
          Qualifications
        </h2>
        <div className="max-w-5xl">
          <EducationList entries={education} />
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/experience" variant="secondary">
            Work experience
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Case studies
          </ButtonLink>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
