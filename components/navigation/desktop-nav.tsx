"use client";

import Link from "next/link";
import { m } from "motion/react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SPRING } from "@/components/animations/motion-provider";
import { useActivePath } from "./use-active-path";

export function DesktopNav() {
  const isActive = useActivePath();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1 rounded-full border border-border bg-surface/50 p-1">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href} className="relative">
              {active && (
                <m.span
                  layoutId="nav-active"
                  transition={SPRING}
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-border-strong bg-surface-raised"
                />
              )}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative block rounded-full px-3.5 py-1.5 text-[13px] xl:px-4 tracking-tight transition-colors duration-300",
                  active ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
