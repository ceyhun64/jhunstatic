"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useId, useRef } from "react";

interface ShootingStarState {
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

function getRandomStartPoint(): { x: number; y: number; angle: number } {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;
  switch (side) {
    case 0: return { x: offset, y: 0, angle: 45 };
    case 1: return { x: window.innerWidth, y: offset, angle: 135 };
    case 2: return { x: offset, y: window.innerHeight, angle: 225 };
    default: return { x: 0, y: offset, angle: 315 };
  }
}

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 10,
  maxSpeed = 30,
  minDelay = 1200,
  maxDelay = 4200,
  starColor = "#9E00FF",
  trailColor = "#2EB9DF",
  starWidth = 10,
  starHeight = 1,
  className,
}) => {
  const uid = useId().replace(/:/g, "");
  const gradientId = `ss-grad-${uid}`;

  const rectRef = useRef<SVGRectElement>(null);
  const gradStartRef = useRef<SVGStopElement>(null);
  const gradEndRef = useRef<SVGStopElement>(null);

  useEffect(() => {
    let animFrame: number;
    let timeout: ReturnType<typeof setTimeout>;
    let star: ShootingStarState | null = null;

    const hideStar = () => {
      if (rectRef.current) rectRef.current.setAttribute("width", "0");
    };

    const startStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      star = {
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      };
    };

    const scheduleStar = () => {
      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeout = setTimeout(() => {
        startStar();
        animFrame = requestAnimationFrame(animate);
      }, delay);
    };

    const animate = () => {
      if (!star || !rectRef.current) {
        hideStar();
        scheduleStar();
        return;
      }

      const rad = (star.angle * Math.PI) / 180;
      star.x += star.speed * Math.cos(rad);
      star.y += star.speed * Math.sin(rad);
      star.distance += star.speed;
      star.scale = 1 + star.distance / 100;

      const w = Math.max(0, starWidth * star.scale);

      if (
        star.x < -20 ||
        star.x > window.innerWidth + 20 ||
        star.y < -20 ||
        star.y > window.innerHeight + 20
      ) {
        star = null;
        hideStar();
        scheduleStar();
        return;
      }

      const rect = rectRef.current;
      rect.setAttribute("x", String(star.x));
      rect.setAttribute("y", String(star.y));
      rect.setAttribute("width", String(w));
      rect.setAttribute(
        "transform",
        `rotate(${star.angle},${star.x + w / 2},${star.y + starHeight / 2})`,
      );

      animFrame = requestAnimationFrame(animate);
    };

    startStar();
    animFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeout);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay, starWidth, starHeight]);

  useEffect(() => {
    if (gradStartRef.current)
      gradStartRef.current.style.stopColor = trailColor;
    if (gradEndRef.current)
      gradEndRef.current.style.stopColor = starColor;
  }, [starColor, trailColor]);

  return (
    <svg
      className={cn("absolute inset-0 w-full h-full", className)}
      aria-hidden="true"
    >
      <rect
        ref={rectRef}
        x="0"
        y="0"
        width="0"
        height={starHeight}
        fill={`url(#${gradientId})`}
      />
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            ref={gradStartRef}
            offset="0%"
            style={{ stopColor: trailColor, stopOpacity: 0 }}
          />
          <stop
            ref={gradEndRef}
            offset="100%"
            style={{ stopColor: starColor, stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};
