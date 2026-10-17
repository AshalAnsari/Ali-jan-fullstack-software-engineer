import type { ArchitectureNode } from "@/lib/projects";
import { layerById } from "@/lib/stack";
import { cn } from "@/lib/utils";
import { EvidenceBadge, EvidenceLegend } from "@/components/ui/evidence";
import { Reveal } from "@/components/animations/reveal";
import { layerIcons } from "./icons";

/** Consecutive nodes on the same layer share a row (e.g. two integrations). */
function toRows(nodes: ArchitectureNode[]) {
  const rows: ArchitectureNode[][] = [];
  for (const node of nodes) {
    const last = rows.at(-1);
    if (last && last[0]!.layer === node.layer) last.push(node);
    else rows.push([node]);
  }
  return rows;
}

/** Request path through a product, top to bottom. */
export function ArchitectureDiagram({ nodes, note }: { nodes: ArchitectureNode[]; note: string }) {
  const rows = toRows(nodes);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14">
      <div className="relative overflow-hidden rounded-lg border border-border bg-background-secondary p-4 sm:p-8">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
        <ol className="relative mx-auto max-w-xl">
          {rows.map((row, ri) => (
            <li key={row[0]!.label} className="relative">
              <Reveal delay={ri * 0.06} y={12} className={cn("grid gap-3", row.length > 1 && "sm:grid-cols-2")}>
                {row.map((node) => (
                  <NodeCard key={node.label} node={node} />
                ))}
              </Reveal>
              {ri < rows.length - 1 && <Connector />}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6">
        <p className="leading-relaxed text-muted">{note}</p>
        <EvidenceLegend className="flex-col" />
      </div>
    </div>
  );
}

function NodeCard({ node }: { node: ArchitectureNode }) {
  const Icon = layerIcons[node.layer];
  const layer = node.layer === "client" ? null : layerById[node.layer];

  return (
    <div
      className="flex items-center gap-4 rounded-md border border-border-strong bg-surface px-4 py-3.5"
    >
      <span
        className="grid size-9 shrink-0 place-items-center rounded-md border border-border-strong bg-surface-raised text-foreground"
      >
        <Icon aria-hidden className="size-4" strokeWidth={1.6} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
            {node.label}
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            {layer ? `${layer.code} ${layer.label}` : "Client"}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[13px] text-subtle" title={node.detail}>
          {node.detail}
        </p>
      </div>
      <EvidenceBadge evidence={node.evidence} compact className="shrink-0" />
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden className="relative mx-auto h-8 w-px">
      <span className="absolute inset-0 w-px bg-border-strong" />
      <span className="packet absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
    </div>
  );
}
