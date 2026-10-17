import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DesktopNav } from "./desktop-nav";
import { HeaderFrame } from "./header-frame";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <HeaderFrame>
      <Container size="wide" className="flex h-full items-center justify-between gap-6">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" variant="primary" className="hidden h-10 px-4 text-[13px] sm:inline-flex">
            Let&apos;s talk
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </HeaderFrame>
  );
}
