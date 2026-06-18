"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
        {/* Outer slow counter-rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(245,158,11,0.35) 50%, transparent 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner fast rotating ring */}
        <motion.div
          className="absolute inset-3 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #f59e0b 50%, transparent 100%)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
        />

        {/* Static track */}
        <div className="absolute inset-3 rounded-full border border-foreground/10" />

        {/* Soft glow */}
        <motion.div
          className="absolute inset-3 rounded-full bg-amber-500/20 blur-xl"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Brand mark */}
        <motion.span
          className="relative font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          animate={{ scale: [0.92, 1, 0.92] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {"{ }"}
        </motion.span>
      </div>
    </motion.div>
  );
}
