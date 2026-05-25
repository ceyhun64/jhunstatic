"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function ScrollToTopButton(): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-300px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Sentinel: sayfanın en üstünde görünmez bir referans noktası */}
      <div ref={sentinelRef} className="absolute top-0 left-0 h-px w-px pointer-events-none" aria-hidden="true" />

      <AnimatePresence>
        {visible && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Sayfanın üstüne çık"
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, scale: 0.6, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: shouldReduceMotion ? 0 : 40 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.12, y: -6 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.92, y: 2 }}
            className="fixed bottom-24 right-8 z-50 p-px rounded-full
               bg-linear-to-br from-zinc-300 via-zinc-400 to-zinc-500
               dark:from-blue-700 dark:via-blue-600 dark:to-cyan-500
               shadow-md dark:shadow-[0_0_8px_rgba(100,180,255,0.15)]
               hover:shadow-lg dark:hover:shadow-[0_0_28px_rgba(120,200,255,0.65)]
               transition-shadow duration-500"
          >
            <div className="relative bg-white dark:bg-[#0a0f1c] rounded-full p-3 flex items-center justify-center">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full
                             bg-linear-to-br from-zinc-200/20 to-zinc-300/20
                             dark:from-blue-400/10 dark:to-cyan-400/10
                             blur-xl"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <ArrowUp className="w-5 h-5 text-zinc-700 dark:text-cyan-300
                                 drop-shadow-none dark:drop-shadow-[0_0_8px_rgba(100,200,255,0.6)]" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
