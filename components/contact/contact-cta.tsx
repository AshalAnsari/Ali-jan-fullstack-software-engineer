import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/animations/reveal";

/** Closing call to action used at the end of most pages. */
export function ContactCta({ index }: { index?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-t border-border">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -bottom-72 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(ellipse, var(--primary) 0%, transparent 70%)" }}
      />
      <Container size="wide" className="py-24 sm:py-32 lg:py-40">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Label index={index} className="justify-center">
            Contact
          </Label>
          <h2 id="cta-title" className="mt-7 text-h1 font-medium">
            Have a system to build?{" "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-primary">Let&apos;s talk.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lead text-muted">
            A product from scratch, an API that needs to talk to Stripe or Teams, or an AI feature that has to hold up in
            production — tell me what you&apos;re building.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
