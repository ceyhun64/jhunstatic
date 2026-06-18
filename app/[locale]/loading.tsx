"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Core */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring (Sabit) */}
        <div className="absolute h-64 w-64 rounded-full border border-white/10">
          {/* Dönen Nokta */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 3600 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_20px_#f59e0b]" />
          </motion.div>
        </div>

        {/* Middle Ring */}
        <motion.div
          className="absolute h-48 w-48 rounded-full border border-amber-500/30"
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glass Core */}
        <motion.div
          className="
            relative
            flex
            h-32
            w-32
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="
              font-mono
              text-4xl
              font-bold
              text-amber-400
              drop-shadow-[0_0_25px_rgba(245,158,11,0.8)]
            "
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            {"{ }"}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
