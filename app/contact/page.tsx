import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/structured-data";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/contact/contact-form";
import { ButtonArrow } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accent } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";

const description =
  "Get in touch with Ali Jan Jameel about a web product, an API or integration, or an AI feature you're building.";

export const metadata: Metadata = pageMetadata({ title: "Contact", description, path: "/contact" });

const helpful = [
  { title: "What you're building", body: "The product, who uses it, and the problem it solves." },
  { title: "Where it is now", body: "An idea, a prototype, or a live system that needs work." },
  { title: "What's involved", body: "Frontend, backend, data, AI, or integrations like Stripe, Teams, SendCloud or eBay." },
];

const channels = [
  ...(site.phone ? [{ label: "Phone", value: site.phone.display, href: site.phone.href, external: false }] : []),
  ...(site.email ? [{ label: "Email", value: site.email, href: `mailto:${site.email}`, external: false }] : []),
  ...site.socials.map((s) => ({
    label: s.label,
    value: s.href.replace(/^https?:\/\/(www\.)?/, ""),
    href: s.href,
    external: true,
  })),
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/contact", name: `Contact ${site.name}`, description, type: "ContactPage" }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Have a system to build? <Accent className="text-primary">Let&apos;s talk.</Accent>
          </>
        }
        description="Call, or reach out on LinkedIn or GitHub. A few lines about the project is plenty to start."
      />

      <Section labelledBy="contact-title" flushTop bordered={false}>
        <h2 id="contact-title" className="sr-only">
          Get in touch
        </h2>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
            <Label>What helps</Label>
            <ol className="mt-6 divide-y divide-border border-y border-border">
              {helpful.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[2rem_1fr] gap-3 py-5">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="self-start rounded-lg border border-border bg-surface/60 p-6 sm:p-10">
            <Label>Reach me directly</Label>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external && { target: "_blank", rel: "noopener noreferrer me" })}
                    className="group/btn group flex items-center justify-between gap-4 py-5"
                  >
                    <span>
                      <span className="block font-mono text-label uppercase text-subtle">{c.label}</span>
                      <span className="mt-2 block text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {c.value}
                      </span>
                    </span>
                    <ButtonArrow external={c.external} className="text-muted group-hover:text-primary" />
                    {c.external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
            {site.email && (
              <div className="mt-10">
                <ContactForm to={site.email} />
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
