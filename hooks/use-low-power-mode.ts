"use client";

import { useIsMobile } from "./use-mobile";
import { useReducedMotion } from "./use-reduced-motion";

/**
 * True when decorative-only effects (particle canvases, glow blobs, heavy
 * blur/backdrop-filter) should be skipped or scaled down: mobile viewports
 * (limited GPU/CPU headroom) or an explicit prefers-reduced-motion request.
 */
export function useLowPowerMode(): boolean {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  return isMobile || prefersReducedMotion;
}
