import { site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SystemDiagram } from "./system-diagram";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

const path = ["UI", "Frontend", "APIs", "Backend", "Data", "AI", "Cloud", "Integrations"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-(--header-h)">
      {/* Background: technical grid, faded at the edges, with one warm light source. */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute -right-40 top-10 -z-10 size-[720px] rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 65%)" }}
      />

      <Container size="wide" className="grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10 lg:pb-28 lg:pt-24 2xl:gap-24">
        <div>
          <p className="enter-fade flex items-center gap-3 font-mono text-label uppercase text-muted" style={delay(0)}>
            <span className="relative flex size-2">
              <span className="animate-pulse-dot size-2 rounded-full bg-success" />
            </span>
            {site.role}
          </p>

          <h1 id="hero-title" className="mt-7 text-display font-medium text-foreground">
            <span className="enter-rise block" style={delay(60)}>
              Ali Jan
            </span>
            <span className="enter-rise block font-serif font-normal italic tracking-[-0.02em]" style={delay(140)}>
              Jameel
            </span>
          </h1>

          <p className="enter-fade mt-8 max-w-xl text-lead text-muted" style={delay(260)}>
            I build software end to end — the interface people use, the APIs and data behind it, and the{" "}
            <span className="text-foreground">AI, cloud and payment services</span> a product depends on.
          </p>

          <div className="enter-fade mt-10 flex flex-wrap items-center gap-3" style={delay(340)}>
            <ButtonLink href="/projects">View projects</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Let&apos;s talk
            </ButtonLink>
          </div>

          <div className="enter-fade mt-14 hidden max-w-xl sm:block" style={delay(440)}>
            <div className="enter-draw hairline" style={delay(500)} />
            <ol aria-label="Layers I work across" className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-subtle">
              {path.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-border-strong">→</span>}
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="enter-fade relative" style={delay(200)}>
          <SystemDiagram className="mx-auto w-full max-w-[640px]" />
        </div>
      </Container>
    </section>
  );
}
