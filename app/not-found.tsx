import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route doesn't exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[88dvh] items-center overflow-hidden pt-(--header-h)">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-70" />
      <Container size="wide" className="py-20">
        <p className="enter-fade font-mono text-label uppercase text-primary">Error · 404</p>
        <h1 className="mt-6 text-display font-medium">
          <span className="enter-rise block">Route not found.</span>
        </h1>
        <p className="enter-fade mt-6 max-w-lg text-lead text-muted" style={{ "--delay": "120ms" } as React.CSSProperties}>
          Looks like this route got lost somewhere between the router and the handler.
        </p>

        {/* A tiny request trace that ends nowhere. */}
        <figure
          aria-hidden
          className="enter-fade mt-12 max-w-xl overflow-hidden rounded-lg border border-border bg-surface/70 font-mono text-xs"
          style={{ "--delay": "220ms" } as React.CSSProperties}
        >
          {[
            ["GET", "request received", "ok"],
            ["→", "matching route", "ok"],
            ["→", "resolving handler", "404"],
          ].map(([method, step, status], i) => (
            <div
              key={step}
              className="enter-fade flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0"
              style={{ "--delay": `${420 + i * 260}ms` } as React.CSSProperties}
            >
              <span className="w-8 text-subtle">{method}</span>
              <span className="flex-1 text-muted">{step}</span>
              <span className={status === "ok" ? "text-success" : "text-primary"}>{status}</span>
            </div>
          ))}
        </figure>

        <div className="enter-fade mt-12 flex flex-wrap gap-3" style={{ "--delay": "300ms" } as React.CSSProperties}>
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            See projects
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
