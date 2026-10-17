import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, projectSchema, webPageSchema } from "@/lib/structured-data";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { JsonLd } from "@/components/ui/json-ld";
import { ProjectVisual } from "@/components/projects/project-visual";
import { CaseSection, type CaseSectionMeta } from "@/components/projects/case-study/case-section";
import { CaseToc } from "@/components/projects/case-study/case-toc";
import { FeatureGrid } from "@/components/projects/case-study/feature-grid";
import { FlowRails } from "@/components/projects/case-study/flow-rail";
import { ArchitectureDiagram } from "@/components/projects/case-study/architecture-diagram";
import { TechStack } from "@/components/projects/case-study/tech-stack";
import { Gallery } from "@/components/projects/case-study/gallery";
import { ProjectPager } from "@/components/projects/case-study/project-pager";
import { ContactCta } from "@/components/contact/contact-cta";
import { Reveal } from "@/components/animations/reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
    image: { url: `/projects/${project.slug}/opengraph-image`, alt: `${project.name} — case study by ${site.name}` },
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const path = `/projects/${project.slug}`;
  const primary = project.links.find((l) => l.primary) ?? project.links[0];

  const sections: CaseSectionMeta[] = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem & solution" },
    { id: "features", label: "Key features" },
    { id: "experience", label: "User experience" },
    { id: "architecture", label: "Architecture" },
    { id: "stack", label: "Integrations & tech" },
    ...(project.gallery.length > 0 ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(project.contribution ? [{ id: "contribution", label: "My contribution" }] : []),
    { id: "sources", label: "Sources" },
  ];
  const n = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const facts = [
    { label: "Category", value: project.category },
    { label: "Platform", value: project.platform },
    ...(project.region ? [{ label: "Region", value: project.region }] : []),
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: `${project.name} — ${site.name}`, description: project.summary }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path },
          ]),
          projectSchema(project),
        )}
      />

      {/* Hero */}
      <div className="relative isolate overflow-hidden pt-(--header-h)">
        <div aria-hidden className="bg-grid mask-fade-b absolute inset-x-0 top-0 -z-10 h-[640px] opacity-60" />
        <Container size="wide" className="pt-12 sm:pt-16 lg:pt-20">
          <nav aria-label="Breadcrumb" className="enter-fade">
            <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
              <li>
                <Link href="/projects" className="hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-muted">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div>
              <Label className="enter-fade">{project.category}</Label>
              <h1 className={`mt-5 font-medium ${project.name.length > 14 ? "text-h1" : "text-display"}`}>
                <span className="enter-rise block" style={{ "--delay": "60ms" } as React.CSSProperties}>
                  {project.name}
                </span>
              </h1>
            </div>
            <div className="enter-fade space-y-7" style={{ "--delay": "160ms" } as React.CSSProperties}>
              <p className="text-lead text-muted">{project.summary}</p>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <ButtonLink key={link.href} href={link.href} variant={link.primary ? "primary" : "secondary"} icon="external">
                    {link.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>

          <dl
            className={`enter-fade mt-14 grid grid-cols-2 overflow-hidden rounded-lg border-l border-t border-border ${facts.length === 3 ? "md:grid-cols-3" : ""}`}
            style={{ "--delay": "220ms" } as React.CSSProperties}
          >
            {facts.map((f) => (
              <div key={f.label} className="border-b border-r border-border bg-background px-5 py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{f.label}</dt>
                <dd className="mt-1.5 text-sm text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="enter-fade mt-10" style={{ "--delay": "280ms" } as React.CSSProperties}>
            <ProjectVisual project={project} priority sizes="(min-width: 1600px) 1520px, 100vw" />
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container size="wide" className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <CaseToc sections={sections} />
        </aside>

        <article aria-label={`${project.name} case study`} className="min-w-0">
          <CaseSection id="overview" index={n("overview")} label="Overview" title={`What ${project.name} is`}>
            <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
              {project.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="problem" index={n("problem")} label="Problem & solution">
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
              {[
                { label: "Problem", body: project.problem },
                { label: "Solution", body: project.solution },
              ].map((block) => (
                <Reveal key={block.label} className="bg-background p-6 sm:p-8">
                  <h3 className="font-mono text-label uppercase text-primary">{block.label}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-foreground/90">{block.body}</p>
                </Reveal>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="features" index={n("features")} label="Key features" title="What it does">
            <FeatureGrid features={project.features} />
          </CaseSection>

          <CaseSection id="experience" index={n("experience")} label="User experience" title="How people move through it">
            <FlowRails flows={project.flows} />
          </CaseSection>

          <CaseSection id="architecture" index={n("architecture")} label="Architecture" title="From the browser down">
            <ArchitectureDiagram nodes={project.architecture.nodes} note={project.architecture.note} />
          </CaseSection>

          <CaseSection id="stack" index={n("stack")} label="Integrations & tech">
            <TechStack project={project} />
          </CaseSection>

          {project.gallery.length > 0 && (
            <CaseSection id="gallery" index={n("gallery")} label="Gallery" title="Screens from the product">
              <Gallery images={project.gallery} />
            </CaseSection>
          )}

          {project.contribution && (
            <CaseSection id="contribution" index={n("contribution")} label="My contribution">
              <p className="max-w-3xl text-lg leading-relaxed text-foreground/90">{project.contribution}</p>
            </CaseSection>
          )}

          <CaseSection id="sources" index={n("sources")} label="Sources">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {project.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted underline decoration-border-strong underline-offset-4 hover:text-foreground"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </CaseSection>

          {primary && (
            <div className="border-t border-border py-16 sm:py-20">
              <div className="flex flex-col gap-8 rounded-lg border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                <div>
                  <Label>Live product</Label>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                    {project.platform === "Internal web app"
                      ? `${project.name} is private — only its sign-in screen is public.`
                      : `See ${project.name} for yourself.`}
                  </p>
                </div>
                <ButtonLink href={primary.href} icon="external">
                  {primary.label}
                </ButtonLink>
              </div>
            </div>
          )}
        </article>
      </Container>

      <Container size="wide" className="pb-20">
        <ProjectPager previous={previous} next={next} />
      </Container>

      <ContactCta />
    </>
  );
}
