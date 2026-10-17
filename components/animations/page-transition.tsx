"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import { EASE_OUT } from "./motion-provider";

// The first render is the initial page load: show it immediately so the
// transition never delays Largest Contentful Paint. Only client-side
// navigations after that get the entrance.
const session = { hasMounted: false };

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => session.hasMounted);

  useEffect(() => {
    session.hasMounted = true;
  }, []);

  return (
    <m.div
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
