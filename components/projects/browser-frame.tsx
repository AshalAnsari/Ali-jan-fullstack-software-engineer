import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";
import { cn } from "@/lib/utils";

/** Minimal window chrome around a screenshot — frames the work without dressing it up. */
export function BrowserFrame({
  image,
  host,
  sizes,
  priority,
  className,
  imageClassName,
}: {
  image: ProjectImage;
  host?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border-strong bg-surface", className)}>
      <div className="flex h-8 items-center gap-3 border-b border-border px-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
        </span>
        {host && (
          <span className="mx-auto max-w-[60%] truncate rounded bg-background/70 px-3 py-0.5 font-mono text-[10px] text-subtle">
            {host}
          </span>
        )}
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover object-top", imageClassName)}
        />
      </div>
    </div>
  );
}
