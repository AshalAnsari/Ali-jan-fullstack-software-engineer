import { renderOg, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg({
    eyebrow: site.role,
    title: "Ali Jan",
    accent: "Jameel",
    subtitle: "AI · Systems · Web · Cloud — full-stack products, from the interface to the integrations.",
  });
}
