import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(base: string, path = "/") {
  return new URL(path, base).toString();
}

/** Two-digit section index: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
