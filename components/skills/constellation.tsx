"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { ConstellationFallback } from "./constellation-fallback";

// Three.js only loads for this component, only on the client, and only
// once the section approaches the viewport.
const Scene = dynamic(() => import("@/components/three/constellation-scene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Constellation({ active, className }: { active: string | null; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "300px 0px", once: true });
  const visible = useInView(ref, { margin: "0px" });
  const reduce = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Feature detection has to run in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWebgl(supportsWebGL());
  }, []);

  const use3D = near && webgl === true && !reduce;

  useEffect(() => {
    if (!use3D) return;
    const t = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(t);
  }, [use3D]);

  return (
    <div
      ref={ref}
      data-cursor={use3D ? "Drag" : undefined}
      className={cn("relative aspect-square w-full", className)}
    >
      <ConstellationFallback
        active={active}
        className={cn("absolute inset-0 transition-opacity duration-700", use3D && ready ? "opacity-0" : "opacity-100")}
      />
      {use3D && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <Scene active={active} running={visible} />
        </div>
      )}
    </div>
  );
}
