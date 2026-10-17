import type { Metadata } from "next";
import { education } from "@/lib/education";
import { experience } from "@/lib/experience";
import { getLayerUsage } from "@/lib/layer-usage";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { layers, skillCategories } from "@/lib/stack";
import { graph, projectListSchema, webPageSchema } from "@/lib/structured-data";
import { Hero } from "@/components/hero/hero";
import { Section } from "@/components/layout/section";
import { EngineeringMap } from "@/components/about/engineering-map";
import { ProjectCard } from "@/components/projects/project-card";
import { Timeline } from "@/components/experience/timeline";
import { EducationList } from "@/components/education/education-list";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { ContactCta } from "@/components/contact/contact-cta";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "Ali Jan Jameel is a software engineer building web products end to end — React and Next.js, Node.js and NestJS, MongoDB and SQL, AWS, AI integrations and services like Stripe.";

export const metadata: Metadata = pageMetadata({ description, path: "/" });

export default function HomePage() {
  const [featured, ...rest] = projects;
  const grid = rest.slice(0, 2);
  const list = rest.slice(2);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/", name: `${site.name} | ${site.role}`, description, type: "ProfilePage" }),
          projectListSchema(projects),
        )}
      />

      <Hero />

      <Section id="range" labelledBy="range-title">
        <SectionHeading
          id="range-title"
          index="01"
          eyebrow="Range"
          title={
            <>
              One engineer across the <Accent>whole</Accent> request path.
            </>
          }
          description="Products tend to break at the seams — between interface and API, API and database, app and payment provider. I work on both sides of each seam, so they get designed rather than discovered."
        />
        <div className="mt-16 lg:mt-20">
          <EngineeringMap layers={layers} usage={getLayerUsage()} />
        </div>
        <div className="mt-14">
          <ButtonLink href="/about" variant="secondary">
            More about me
          </ButtonLink>
        </div>
      </Section>

      <Section id="work" labelledBy="work-title">
        <SectionHeading
          id="work-title"
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Real products, written up as <Accent>case studies</Accent>.
            </>
          }
          description="AI wellbeing, education hiring, infrastructure talent, construction procurement, food delivery and e-commerce. Each case study is written from what the live product shows."
        />

        <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
          {featured && (
            <Reveal>
              <ProjectCard project={featured} index={0} variant="feature" />
            </Reveal>
          )}
          <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-14">
            {grid.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.1} className={i === 1 ? "md:mt-24" : undefined}>
                <ProjectCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>
          <div>
            <p className="font-mono text-label uppercase text-subtle">Also</p>
            <div className="mt-4 border-t border-border">
              {list.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i + 3} variant="row" />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14">
          <ButtonLink href="/projects" variant="secondary">
            All case studies
          </ButtonLink>
        </div>
      </Section>

      <Section id="path" labelledBy="path-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
            <SectionHeading
              id="path-title"
              index="03"
              eyebrow="Path"
              align="start"
              title={
                <>
                  From intern to <Accent>engineer</Accent>.
                </>
              }
            />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Three roles so far — Softly, ThreatCure and Tafsol Technologies — from internship to software engineering.
            </p>
            <div className="mt-10">
              <ButtonLink href="/experience" variant="secondary">
                Experience in detail
              </ButtonLink>
            </div>
          </div>
          <Timeline entries={experience} compact />
        </div>
      </Section>

      <Section id="education" labelledBy="education-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
            <SectionHeading
              id="education-title"
              index="04"
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
            <div className="mt-10">
              <ButtonLink href="/education" variant="secondary">
                Education in detail
              </ButtonLink>
            </div>
          </div>
          <EducationList entries={education} compact />
        </div>
      </Section>

      <Section id="toolkit" labelledBy="toolkit-title">
        <SectionHeading
          id="toolkit-title"
          index="05"
          eyebrow="Toolkit"
          title={
            <>
              The stack, as a <Accent>system</Accent>.
            </>
          }
          description="Tools matter less than how they connect. Pick an area to see where it sits relative to the rest."
        />
        <div className="mt-16 lg:mt-20">
          <SkillsExplorer categories={skillCategories} />
        </div>
      </Section>

      <ContactCta index="06" />
    </>
  );
}
