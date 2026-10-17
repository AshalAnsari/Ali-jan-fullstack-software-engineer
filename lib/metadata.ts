import type { Metadata } from "next";
import { site } from "./site";

type PageMetadataInput = {
  /** Page title without the site suffix; omit for the homepage. */
  title?: string;
  /** Full title override (used when the suffix pattern doesn't fit). */
  absoluteTitle?: string;
  description: string;
  path: `/${string}`;
  /** Defaults to the site-wide share image. */
  image?: { url: string; alt: string };
  type?: "website" | "article" | "profile";
};

/**
 * Page-level metadata with canonical URL, Open Graph and Twitter cards.
 * Titles render through the root layout's template: "%s | Ali Jan Jameel".
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const resolvedTitle = absoluteTitle ?? (title ? `${title} | ${site.name}` : `${site.name} | ${site.role}`);
  // A page-level openGraph object replaces the parent's, so the site-wide
  // image (app/opengraph-image.tsx) has to be restated here. Routes with
  // their own opengraph-image file (case studies) still override it.
  const shareImage = image ?? { url: "/opengraph-image", alt: `${site.name} — ${site.role}` };

  return {
    title: absoluteTitle || !title ? { absolute: resolvedTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: resolvedTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: shareImage.url, alt: shareImage.alt, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [{ url: image?.url.replace(/opengraph-image$/, "twitter-image") ?? "/twitter-image", alt: shareImage.alt }],
    },
  };
}
