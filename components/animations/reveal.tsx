"use client";

import { m, type HTMLMotionProps } from "motion/react";
import { EASE_OUT } from "./motion-provider";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ delay = 0, y = 18, as = "div", children, ...props }: RevealProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Clip-path wipe for imagery — reads as the image being "developed". */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <m.div
      className={className}
      initial={{ clipPath: "inset(12% 6% 12% 6% round 16px)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
