import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The AJ mark — same geometry as the favicon (app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)}>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="8" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
      <path d="M7 23.5 11.75 8.5l4.75 15" fill="none" stroke="var(--foreground)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18h5.5" stroke="var(--foreground)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24.5 8.5v10.25a4.25 4.25 0 0 1-6.9 3.3" fill="none" stroke="var(--primary)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3 rounded-md", className)}
      aria-label={`${site.name} — home`}
    >
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:-rotate-6" />
      <span className="hidden flex-col leading-none sm:flex lg:hidden xl:flex">
        <span className="text-sm font-medium tracking-tight text-foreground">{site.name}</span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{site.role}</span>
      </span>
    </Link>
  );
}
