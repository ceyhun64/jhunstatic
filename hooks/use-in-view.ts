"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is inside the viewport so callers can pause
 * expensive work (canvas loops, particle engines) while it's scrolled away.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(!!entry?.isIntersecting),
      { threshold: 0, rootMargin: "150px", ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}
