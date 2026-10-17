import Link from "next/link";
import { navigation, site } from "@/lib/site";
import { pad } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/navigation/logo";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <Container size="wide" className="grid gap-12 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <LogoMark className="size-9" />
          <div>
            <p className="text-lg font-medium tracking-tight">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.role}</p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-subtle">
            Interfaces, APIs, data, AI, cloud and the integrations between them.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-label uppercase text-subtle">Index</p>
          <ul className="mt-5 grid gap-2.5">
            {navigation.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} className="group inline-flex items-baseline gap-3 text-sm text-muted transition-colors hover:text-foreground">
                  <span className="font-mono text-[10px] text-subtle group-hover:text-primary">{pad(i + 1)}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-label uppercase text-subtle">Elsewhere</p>
          {site.socials.length > 0 || site.email || site.phone ? (
            <ul className="mt-5 grid gap-2.5">
              {site.phone && (
                <li>
                  <a href={site.phone.href} className="text-sm text-muted hover:text-foreground">
                    {site.phone.display}
                  </a>
                </li>
              )}
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-foreground">
                    {site.email}
                  </a>
                </li>
              )}
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-sm text-muted hover:text-foreground">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-subtle">
              Use the <Link href="/contact" className="text-muted underline decoration-border-strong underline-offset-4 hover:text-foreground">contact page</Link> to get in touch.
            </p>
          )}
        </div>
      </Container>

      <Container size="wide" className="flex flex-col gap-2 border-t border-border py-6 font-mono text-[11px] text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}
        </p>
        <p>Built with Next.js, TypeScript and Motion</p>
      </Container>
    </footer>
  );
}
