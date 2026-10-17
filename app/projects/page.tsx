import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, projectListSchema, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { ContactCta } from "@/components/contact/contact-cta";
import { Reveal } from "@/components/animations/reveal";
import { EvidenceLegend } from "@/components/ui/evidence";
import { Accent } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "Case studies by Ali Jan Jameel: Newvana, SamurAI, Sansaino, Consult Hub, Hua Hin Eats and Little Hidden Treasures — AI, marketplaces, education, food delivery and e-commerce.";

export const metadata: Metadata = pageMetadata({ title: "Projects", description, path: "/projects" });

export default function ProjectsPage() {
  const [first, second, ...others] = projects;

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/projects", name: `Projects — ${site.name}`, description, type: "CollectionPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
          projectListSchema(projects),
        )}
      />

      <PageHeader
        eyebrow={`Projects · ${projects.length}`}
        title={
          <>
            Engineering <Accent>case studies</Accent>.
          </>
        }
        description="Each write-up is built from the live product — its pages, store listing and what its front end publicly loads. Where something isn't visible from the outside, it's marked rather than guessed."
      >
        <EvidenceLegend className="mt-12 border-t border-border pt-6" />
      </PageHeader>

      <Section labelledBy="all-projects" flushTop bordered={false}>
        <h2 id="all-projects" className="sr-only">
          All projects
        </h2>
        <div className="space-y-24 lg:space-y-32">
          {first && <ProjectCard project={first} index={0} variant="feature" priority />}
          {second && (
            <Reveal>
              <ProjectCard project={second} index={1} variant="feature" reverse />
            </Reveal>
          )}
          <div className="grid gap-20 md:grid-cols-2 md:gap-x-10 md:gap-y-24 lg:gap-x-14">
            {others.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={project} index={i + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <ContactCta />
    </>
  );
}
