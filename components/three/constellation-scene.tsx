"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { edges, nodes, type ConstellationNode } from "@/components/skills/constellation-layout";

const EMBER = new THREE.Color("#ff6a3d");
const STEEL = new THREE.Color("#9fb6cc");
const PAPER = new THREE.Color("#edeae4");
const LINE = new THREE.Color("#3a3e46");

type SceneProps = { active: string | null; running: boolean };

/**
 * The skills constellation. Kept deliberately small: ~20 points, one
 * line-segment buffer and canvas-texture labels — no models, no
 * post-processing. Rendering pauses entirely when off-screen.
 */
export default function ConstellationScene({ active, running }: SceneProps) {
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ touchAction: "pan-y" }}
    >
      <Constellation active={active} />
    </Canvas>
  );
}

function Constellation({ active }: { active: string | null }) {
  const group = useRef<THREE.Group>(null);
  const drag = useRef({ down: false, lastX: 0, lastY: 0, vx: 0, vy: 0 });
  const canvas = useThree((state) => state.gl.domElement);

  // Drag to spin, with momentum. Listeners live on the canvas and window
  // so a drag that leaves the canvas still ends cleanly.
  useEffect(() => {
    const down = (e: PointerEvent) => {
      Object.assign(drag.current, { down: true, lastX: e.clientX, lastY: e.clientY });
    };
    const move = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      d.vx = (e.clientX - d.lastX) * 0.004;
      d.vy = (e.clientY - d.lastY) * 0.002;
      d.lastX = e.clientX;
      d.lastY = e.clientY;
    };
    const up = () => {
      drag.current.down = false;
    };
    canvas.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [canvas]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current;
    if (!d.down) {
      d.vx *= 0.94;
      d.vy *= 0.94;
    }
    g.rotation.y += delta * 0.12 + d.vx;
    g.rotation.x = THREE.MathUtils.clamp(g.rotation.x + d.vy, -0.6, 0.6);
    // Gentle parallax toward the pointer when idle.
    g.rotation.x += (state.pointer.y * 0.18 - g.rotation.x) * (d.down ? 0 : 0.02);
  });

  const lineGeometry = useMemo(() => {
    const positions = new Float32Array(edges.flatMap(([a, b]) => [...a, ...b]));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const activeLineGeometry = useMemo(() => {
    const positions = new Float32Array(
      edges.filter(([, , c]) => c === active).flatMap(([a, b]) => [...a, ...b]),
    );
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [active]);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);
  useEffect(() => () => activeLineGeometry.dispose(), [activeLineGeometry]);

  return (
    <group ref={group}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={LINE} transparent opacity={active ? 0.45 : 0.8} />
      </lineSegments>
      <lineSegments geometry={activeLineGeometry}>
        <lineBasicMaterial color={EMBER} transparent opacity={0.9} />
      </lineSegments>

      {nodes.map((node) => (
        <Node key={node.id} node={node} active={active} />
      ))}
    </group>
  );
}

function Node({ node, active }: { node: ConstellationNode; active: string | null }) {
  const on = active === null || node.category === active;
  const highlighted = node.category === active;
  const color = highlighted ? EMBER : node.hub ? PAPER : STEEL;

  return (
    <group position={node.position}>
      <mesh>
        <sphereGeometry args={[node.hub ? 0.1 : 0.065, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={on ? 1 : 0.25} />
      </mesh>
      <Label text={node.hub ? node.label.toUpperCase() : node.label} hub={node.hub} opacity={on ? (node.hub ? 1 : 0.85) : 0.2} />
    </group>
  );
}

function Label({ text, hub, opacity }: { text: string; hub: boolean; opacity: number }) {
  const { texture, aspect } = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim() || "monospace";
    const size = 44;
    ctx.font = `${hub ? 500 : 400} ${size}px ${family}`;
    const width = Math.ceil(ctx.measureText(text).width) + 16;
    canvas.width = width;
    canvas.height = size + 20;
    ctx.font = `${hub ? 500 : 400} ${size}px ${family}`;
    ctx.fillStyle = hub ? "#edeae4" : "#a9abb1";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 8, canvas.height / 2);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return { texture: t, aspect: canvas.width / canvas.height };
  }, [text, hub]);

  useEffect(() => () => texture.dispose(), [texture]);

  const height = hub ? 0.28 : 0.22;
  return (
    <sprite position={[0, hub ? 0.3 : 0.22, 0]} scale={[height * aspect, height, 1]}>
      <spriteMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </sprite>
  );
}
