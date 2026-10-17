import type { LayerId } from "@/lib/stack";

export type Box = { id: LayerId; x: number; y: number; w: number; h: number; sub: string };
export type Wire = { d: string; ids: [LayerId, LayerId] };
export type Geometry = { width: number; height: number; boxes: Box[]; wires: Wire[] };

/** Short in-box descriptors; the full technology list lives in lib/stack. */
const sub: Record<LayerId, string> = {
  interface: "HTML · CSS",
  frontend: "React · Next.js · TS",
  api: "REST",
  backend: "Node · Nest · Express",
  data: "MongoDB · SQL",
  ai: "Bots · AI features",
  cloud: "AWS · S3",
  integrations: "Stripe · Teams · +2",
};

const box = (id: LayerId, x: number, y: number, w: number, h: number): Box => ({ id, x, y, w, h, sub: sub[id] });

/**
 * Wide layout: a request path down the centre, with AI and third-party
 * integrations hanging off the backend and data/cloud beneath it.
 */
export const wide: Geometry = {
  width: 600,
  height: 480,
  boxes: [
    box("interface", 195, 20, 210, 58),
    box("frontend", 195, 108, 210, 58),
    box("api", 195, 196, 210, 58),
    box("backend", 195, 284, 210, 58),
    box("ai", 16, 284, 150, 58),
    box("integrations", 434, 284, 150, 58),
    box("data", 110, 400, 172, 58),
    box("cloud", 318, 400, 172, 58),
  ],
  wires: [
    { d: "M300 78 V108", ids: ["interface", "frontend"] },
    { d: "M300 166 V196", ids: ["frontend", "api"] },
    { d: "M300 254 V284", ids: ["api", "backend"] },
    { d: "M195 313 H166", ids: ["backend", "ai"] },
    { d: "M405 313 H434", ids: ["backend", "integrations"] },
    { d: "M262 342 V400", ids: ["backend", "data"] },
    { d: "M338 342 V400", ids: ["backend", "cloud"] },
  ],
};

const order: LayerId[] = ["interface", "frontend", "api", "backend", "data", "ai", "cloud", "integrations"];

/** Compact layout for phones: the same layers as a single vertical stack. */
export const compact: Geometry = {
  width: 340,
  height: 8 + order.length * 54,
  boxes: order.map((id, i) => box(id, 34, 8 + i * 54, 302, 44)),
  wires: order.slice(0, -1).map((id, i) => ({
    d: `M16 ${30 + i * 54} V${30 + (i + 1) * 54}`,
    ids: [id, order[i + 1]!] as [LayerId, LayerId],
  })),
};

/** The order the diagram highlights layers in when idle. */
export const cycle = order;
