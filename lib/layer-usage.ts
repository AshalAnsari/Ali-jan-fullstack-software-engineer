import type { LayerUsage } from "@/components/about/engineering-map";
import { projects } from "./projects";

/**
 * For each stack layer, the case studies where that layer is verified or
 * confirmed in the architecture.
 */
export function getLayerUsage(): LayerUsage {
  const usage: LayerUsage = {};
  for (const project of projects) {
    const seen = new Set<string>();
    for (const node of project.architecture.nodes) {
      if (node.layer === "client" || (node.evidence !== "verified" && node.evidence !== "confirmed") || seen.has(node.layer)) continue;
      seen.add(node.layer);
      (usage[node.layer] ??= []).push({ slug: project.slug, name: project.name });
    }
  }
  return usage;
}
