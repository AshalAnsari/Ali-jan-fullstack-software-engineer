import { skillCategories } from "@/lib/stack";

export type Vec3 = [number, number, number];

export type ConstellationNode = {
  id: string;
  label: string;
  category: string;
  position: Vec3;
  hub: boolean;
};

/**
 * Backend sits at the centre — it's where the other layers meet. The
 * remaining categories orbit it on a pentagon with alternating depth,
 * and each category's skills cluster around their hub.
 */
const CENTER = "backend";
const ORBIT = ["frontend", "database", "cloud", "integrations", "ai"];
const ORBIT_RADIUS = 2.45;

function hubPosition(categoryId: string): Vec3 {
  if (categoryId === CENTER) return [0, 0, 0];
  const i = ORBIT.indexOf(categoryId);
  const angle = Math.PI / 2 + (i * 2 * Math.PI) / ORBIT.length;
  return [Math.cos(angle) * ORBIT_RADIUS, Math.sin(angle) * ORBIT_RADIUS * 0.82, i % 2 === 0 ? 0.7 : -0.7];
}

export const nodes: ConstellationNode[] = skillCategories.flatMap((category) => {
  const hub = hubPosition(category.id);
  const count = category.skills.length;
  const hubNode: ConstellationNode = { id: `hub-${category.id}`, label: category.label, category: category.id, position: hub, hub: true };

  const skills = category.skills.map((skill, i): ConstellationNode => {
    // Skills ring their hub. Orbiting rings are rotated so no skill points
    // straight back at the centre, where it would crowd the backend.
    const outward = Math.atan2(hub[1], hub[0]);
    const halfStep = count % 2 === 0 ? Math.PI / count : 0;
    const offset = category.id === CENTER ? Math.PI / 6 : outward + halfStep;
    const angle = offset + (i / count) * Math.PI * 2;
    // Bigger clusters get more room so labels don't collide.
    const r = 0.62 + count * 0.075;
    return {
      id: `${category.id}-${skill.name}`,
      label: skill.name,
      category: category.id,
      hub: false,
      position: [hub[0] + Math.cos(angle) * r, hub[1] + Math.sin(angle) * r, hub[2] + (i % 2 === 0 ? 0.28 : -0.28)],
    };
  });

  return [hubNode, ...skills];
});

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Hub-to-skill spokes plus the connections between layers. */
export const edges: [Vec3, Vec3, string][] = [
  ...nodes.filter((n) => !n.hub).map((n): [Vec3, Vec3, string] => [byId[`hub-${n.category}`]!.position, n.position, n.category]),
  ...ORBIT.map((id): [Vec3, Vec3, string] => [byId[`hub-${CENTER}`]!.position, byId[`hub-${id}`]!.position, "link"]),
  [byId["hub-database"]!.position, byId["hub-cloud"]!.position, "link"],
];
