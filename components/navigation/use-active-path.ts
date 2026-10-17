"use client";

import { usePathname } from "next/navigation";

/** Returns a matcher: "/projects" is active on "/projects/newvana" too. */
export function useActivePath() {
  const pathname = usePathname();
  return (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
}
