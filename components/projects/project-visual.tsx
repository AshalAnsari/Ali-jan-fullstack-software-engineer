import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn, hostname } from "@/lib/utils";
import { BrowserFrame } from "./browser-frame";

/**
 * The card/hero visual for a project. Web products sit in a browser
 * frame; mobile-first products get a fanned stack of app screens.
 */
export function ProjectVisual({
  project,
  sizes,
  priority,
  className,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const phones = project.gallery.filter((g) => g.kind === "phone").slice(0, 3);

  if (phones.length >= 3) {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden rounded-lg border border-border-strong bg-surface", className)}>
        <div aria-hidden className="bg-dots absolute inset-0 opacity-50" />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 opacity-30"
          style={{ background: "radial-gradient(ellipse at 50% 100%, var(--accent) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-[3%]">
          {phones.map((phone, i) => (
            <div
              key={phone.src}
              className={cn(
                "relative aspect-[9/16] w-[26%] overflow-hidden rounded-[10%/5.6%] border border-border-strong shadow-2xl shadow-black/60 transition-transform duration-700 ease-out-expo",
                i === 0 && "translate-y-[5%] -rotate-[5deg] group-hover:translate-y-[1%]",
                i === 1 && "z-10 -translate-y-[2%] group-hover:-translate-y-[5%]",
                i === 2 && "translate-y-[5%] rotate-[5deg] group-hover:translate-y-[1%]",
              )}
            >
              <Image src={phone.src} alt={i === 1 ? phone.alt : ""} fill sizes="(min-width: 1024px) 14vw, 26vw" priority={priority} className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const primary = project.links.find((l) => l.primary) ?? project.links[0];
  return (
    <BrowserFrame
      image={project.cover}
      host={primary ? hostname(primary.href) : undefined}
      sizes={sizes}
      priority={priority}
      className={className}
      imageClassName="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
    />
  );
}
