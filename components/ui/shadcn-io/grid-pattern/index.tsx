"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[number, number]>;
  strokeDasharray?: string;
  className?: string;
  [key: string]: any;
}

// The outer wrapper always wins over any className/style passed in, so the
// pattern's hit area exactly matches whatever positioned container it's
// dropped into and never leaks outside it.
const WRAPPER_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

// The SVG itself is rendered oversized and centered so that consumer-supplied
// transforms (skew-y-12, rotate, scale, ...) never reveal empty corners —
// the wrapper above clips anything that spills past the real container edges.
const PATTERN_STYLE: React.CSSProperties = {
  position: "absolute",
  top: "-30%",
  left: "-30%",
  width: "160%",
  height: "160%",
};

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  squares,
  className,
  style,
  ...props
}: GridPatternProps) {
  const id = React.useId();

  return (
    <div style={WRAPPER_STYLE} aria-hidden="true" className="pointer-events-none">
      <svg
        className={cn(
          "fill-gray-400/30 stroke-gray-400/30",
          className
        )}
        style={{ ...PATTERN_STYLE, ...style }}
        {...(props as any)}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        {squares && (
          <svg x={x} y={y} className="overflow-visible">
            {squares.map(([x, y], index) => (
              <rect
                strokeWidth="0"
                key={`${x}-${y}-${index}`}
                width={width - 1}
                height={height - 1}
                x={x * width + 1}
                y={y * height + 1}
              />
            ))}
          </svg>
        )}
      </svg>
    </div>
  );
}

export type { GridPatternProps };
