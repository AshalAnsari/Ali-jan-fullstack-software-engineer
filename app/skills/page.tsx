import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { skillCategories } from "@/lib/stack";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { ContactCta } from "@/components/contact/contact-cta";
import { Accent } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "The technologies Ali Jan Jameel works with: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, NestJS, Express, MongoDB, SQL, AWS, S3, AI bots, Stripe, Microsoft Teams, SendCloud and eBay.";

export const metadata: Metadata = pageMetadata({ title: "Skills", description, path: "/skills" });

export default function SkillsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/skills", name: `Skills — ${site.name}`, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Skills", path: "/skills" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Skills"
        title={
          <>
            Tools, arranged as a <Accent>system</Accent>.
          </>
        }
        description="Six areas: frontend, backend, data, cloud, AI and third-party integrations. Backend sits in the middle because that's where the others meet."
      />

      <Section labelledBy="explorer-title" flushTop bordered={false}>
        <h2 id="explorer-title" className="sr-only">
          Skills by category
        </h2>
        <SkillsExplorer categories={skillCategories} />
      </Section>

      <ContactCta />
    </>
  );
}
