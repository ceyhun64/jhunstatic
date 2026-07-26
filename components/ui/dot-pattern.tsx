"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLowPowerMode } from "@/hooks/use-low-power-mode";

export interface DotPatternProps {
  className?: string;
  children?: React.ReactNode;
  /** Dot diameter in pixels */
  dotSize?: number;
  /** Gap between dots in pixels */
  gap?: number;
  /** Base dot color (hex) */
  baseColor?: string;
  /** Glow color on hover (hex) */
  glowColor?: string;
  /** Mouse proximity radius for highlighting */
  proximity?: number;
  /** Glow intensity multiplier */
  glowIntensity?: number;
  /** Wave animation speed (0 to disable) */
  waveSpeed?: number;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

interface Dot {
  x: number;
  y: number;
  baseOpacity: number;
}

// Theme-aware fallback colors, switched purely via the Tailwind `dark:` variant
// (no JS theme detection) — see the [--dot-pattern-base] classes below.
const BASE_COLOR_VAR = "--dot-pattern-base";
const GLOW_COLOR_VAR = "--dot-pattern-glow";

export function DotPattern({
  className,
  children,
  dotSize = 2,
  gap = 24,
  baseColor,
  glowColor,
  proximity = 120,
  glowIntensity = 1,
  waveSpeed = 0.5,
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef(Date.now());
  const baseRgbRef = useRef(hexToRgb(baseColor ?? "#94a3b8"));
  const glowRgbRef = useRef(hexToRgb(glowColor ?? "#f59e0b"));
  const activeRef = useRef(true);
  const isLowPower = useLowPowerMode();
  // Sparser grid + no wave animation on mobile/reduced-motion: this canvas
  // redraws every dot every frame, so dot count is the main cost knob.
  const effectiveGap = isLowPower ? gap * 2 : gap;
  const effectiveWaveSpeed = isLowPower ? 0 : waveSpeed;

  const resolveColors = useCallback(() => {
    const container = containerRef.current;

    if (baseColor) {
      baseRgbRef.current = hexToRgb(baseColor);
    } else if (container) {
      const cssValue = getComputedStyle(container)
        .getPropertyValue(BASE_COLOR_VAR)
        .trim();
      if (cssValue) baseRgbRef.current = hexToRgb(cssValue);
    }

    if (glowColor) {
      glowRgbRef.current = hexToRgb(glowColor);
    } else if (container) {
      const cssValue = getComputedStyle(container)
        .getPropertyValue(GLOW_COLOR_VAR)
        .trim();
      if (cssValue) glowRgbRef.current = hexToRgb(cssValue);
    }
  }, [baseColor, glowColor]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cellSize = dotSize + effectiveGap;
    const cols = Math.ceil(rect.width / cellSize) + 1;
    const rows = Math.ceil(rect.height / cellSize) + 1;

    const offsetX = (rect.width - (cols - 1) * cellSize) / 2;
    const offsetY = (rect.height - (rows - 1) * cellSize) / 2;

    const dots: Dot[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: offsetX + col * cellSize,
          y: offsetY + row * cellSize,
          baseOpacity: 0.3 + Math.random() * 0.2,
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, effectiveGap]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!activeRef.current) {
      animationRef.current = requestAnimationFrame(draw);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    const { x: mx, y: my } = mouseRef.current;
    const proxSq = proximity * proximity;
    const time = (Date.now() - startTimeRef.current) * 0.001 * effectiveWaveSpeed;
    const baseRgb = baseRgbRef.current;
    const glowRgb = glowRgbRef.current;

    for (const dot of dotsRef.current) {
      const dx = dot.x - mx;
      const dy = dot.y - my;
      const distSq = dx * dx + dy * dy;

      // Wave animation
      const wave = Math.sin(dot.x * 0.02 + dot.y * 0.02 + time) * 0.5 + 0.5;
      const waveOpacity = dot.baseOpacity + wave * 0.15;
      const waveScale = 1 + wave * 0.2;

      let opacity = waveOpacity;
      let scale = waveScale;
      let r = baseRgb.r;
      let g = baseRgb.g;
      let b = baseRgb.b;
      let glow = 0;

      // Mouse proximity effect
      if (distSq < proxSq) {
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / proximity;
        const easedT = t * t * (3 - 2 * t); // smoothstep

        // Interpolate color
        r = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * easedT);
        g = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * easedT);
        b = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * easedT);

        opacity = Math.min(1, waveOpacity + easedT * 0.7);
        scale = waveScale + easedT * 0.8;
        glow = easedT * glowIntensity;
      }

      const radius = (dotSize / 2) * scale;

      // Draw glow
      if (glow > 0) {
        const gradient = ctx.createRadialGradient(
          dot.x,
          dot.y,
          0,
          dot.x,
          dot.y,
          radius * 4,
        );
        gradient.addColorStop(
          0,
          `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.4})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${glow * 0.1})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, 0)`,
        );
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [proximity, dotSize, glowIntensity, effectiveWaveSpeed]);

  useEffect(() => {
    buildGrid();

    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(buildGrid);
    ro.observe(container);

    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    resolveColors();

    if (baseColor && glowColor) return;

    const observer = new MutationObserver(resolveColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [resolveColors, baseColor, glowColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // This canvas covers the full viewport (fixed inset-0) and animates
    // forever by default — only run the wave/glow math while actually
    // visible and the tab is focused.
    let inView = false;
    let tabVisible = !document.hidden;
    const updateActive = () => {
      activeRef.current = inView && tabVisible;
    };
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting;
        updateActive();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);
    const handleVisibilityChange = () => {
      tabVisible = !document.hidden;
      updateActive();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed inset-0 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black [--dot-pattern-base:#94a3b8] [--dot-pattern-glow:#f59e0b] dark:[--dot-pattern-base:#52525b]",
        className,
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette overlay (light) */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(255,255,255,0.7) 100%)",
        }}
      />

      {/* Vignette overlay (dark) */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(10,10,10,0.6) 100%)",
        }}
      />

      {/* Content layer */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}

export default function DotPatternDemo() {
  return <DotPattern />;
}
