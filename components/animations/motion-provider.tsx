"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * Motion language
 * - Entrances: expo-out, 0.6–0.9s, 12–24px travel. Nothing bounces.
 * - Interactions: springs (stiffness ~320, damping ~30) for pointer-driven values.
 * - reducedMotion="user" turns transforms off for people who ask for it.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring", stiffness: 320, damping: 30, mass: 0.6 } as const;

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: EASE_OUT }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
