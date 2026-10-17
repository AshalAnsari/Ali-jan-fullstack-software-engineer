import type { Feature } from "@/lib/projects";
import { EvidenceBadge } from "@/components/ui/evidence";
import { Reveal } from "@/components/animations/reveal";
import { featureIcons } from "./icons";

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <ul className="grid overflow-hidden rounded-lg border-l border-t border-border sm:grid-cols-2 xl:grid-cols-3">
      {features.map((feature, i) => {
        const Icon = featureIcons[feature.icon];
        return (
          <Reveal
            as="li"
            key={feature.title}
            delay={(i % 3) * 0.06}
            className="group relative flex flex-col border-b border-r border-border bg-background p-6 transition-colors duration-500 hover:bg-surface sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid size-10 place-items-center rounded-md border border-border-strong bg-surface text-muted transition-colors duration-500 group-hover:border-primary/50 group-hover:text-primary">
                <Icon aria-hidden className="size-[18px]" strokeWidth={1.6} />
              </span>
              {feature.evidence && <EvidenceBadge evidence={feature.evidence} />}
            </div>
            <h3 className="mt-6 text-lg font-medium tracking-[-0.02em] text-foreground">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}
