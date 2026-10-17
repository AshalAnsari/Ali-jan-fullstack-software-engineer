import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/animations/reveal";

/**
 * Screens from the live product. Landscape screenshots alternate between
 * full width and paired; portrait phone screens sit in a row.
 */
export function Gallery({ images }: { images: ProjectImage[] }) {
  const phones = images.filter((i) => i.kind === "phone");
  const screens = images.filter((i) => i.kind !== "phone");

  return (
    <div className="space-y-6">
      {phones.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {phones.map((image, i) => (
            <li key={image.src} className={cn(i === 2 && "col-span-2 mx-auto w-1/2 sm:col-span-1 sm:w-full")}>
              <Figure image={image} aspect="aspect-[9/16]" sizes="(min-width: 640px) 30vw, 50vw" delay={i * 0.08} />
            </li>
          ))}
        </ul>
      )}
      {screens.length > 0 && (
        <ul className="grid gap-6 md:grid-cols-2">
          {screens.map((image, i) => (
            <li key={image.src} className={cn(i % 3 === 0 && "md:col-span-2")}>
              <Figure
                image={image}
                aspect="aspect-[16/10]"
                sizes={i % 3 === 0 ? "(min-width: 1280px) 1100px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Figure({ image, aspect, sizes, delay = 0 }: { image: ProjectImage; aspect: string; sizes: string; delay?: number }) {
  return (
    <figure>
      <ImageReveal delay={delay} className={cn("relative overflow-hidden rounded-lg border border-border-strong bg-surface", aspect)}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover object-top" />
      </ImageReveal>
      {image.caption && <figcaption className="mt-3 text-sm leading-relaxed text-subtle">{image.caption}</figcaption>}
    </figure>
  );
}
