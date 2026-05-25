import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/**
 * Returns true when the OS/browser has `prefers-reduced-motion: reduce` set.
 * Use to gracefully disable or simplify animations for accessibility.
 */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
