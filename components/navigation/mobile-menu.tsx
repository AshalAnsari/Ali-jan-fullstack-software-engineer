"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { navigation, site } from "@/lib/site";
import { cn, pad } from "@/lib/utils";
import { EASE_OUT } from "@/components/animations/motion-provider";
import { useActivePath } from "./use-active-path";

export function MobileMenu() {
  // The menu remembers which route it was opened on, so navigating
  // anywhere closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const pathname = usePathname();
  const isActive = useActivePath();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isOpen = openOn === pathname;

  const close = useCallback(() => {
    setOpenOn(null);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panel) return;
      // Keep focus inside the dialog (toggle button included).
      const focusables = [
        toggleRef.current,
        ...panel.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const first = focusables[0]!;
      const last = focusables.at(-1)!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setOpenOn(isOpen ? null : pathname)}
        className="relative z-50 flex h-10 items-center gap-3 rounded-full border border-border-strong bg-surface/70 pl-4 pr-3 text-[13px] text-foreground"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <span aria-hidden className="relative block h-2.5 w-4">
          <span
            className={cn(
              "absolute left-0 top-0 h-px w-4 bg-foreground transition-transform duration-500 ease-out-expo",
              isOpen && "translate-y-1.25 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-px w-4 bg-foreground transition-transform duration-500 ease-out-expo",
              isOpen && "-translate-y-1 -rotate-45",
            )}
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="fixed inset-0 z-40 flex flex-col bg-background px-4 pb-8 pt-[calc(var(--header-h)+24px)] sm:px-6"
          >
            <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
            <nav aria-label="Mobile" className="relative flex-1">
              <ul className="divide-y divide-border border-y border-border">
                {navigation.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + i * 0.04, ease: EASE_OUT }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpenOn(null)}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline justify-between py-4"
                      >
                        <span className={cn("text-4xl font-medium tracking-[-0.04em]", active ? "text-foreground" : "text-muted")}>
                          {item.label}
                        </span>
                        <span className={cn("font-mono text-xs", active ? "text-primary" : "text-subtle")}>{pad(i + 1)}</span>
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
            </nav>
            <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
              <span>{site.name}</span>
              <span>{site.role}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
