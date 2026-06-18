"use client";

import { motion, easeOut } from "framer-motion";
import { Quote } from "lucide-react";

interface Props {
  dict: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export default function TestimonialsClient({ dict }: Props) {
  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-gray-200 via-[#F5F7FA] to-gray-200 dark:from-slate-950 dark:via-black dark:to-slate-950 font-sans"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div variants={itemVariants} className="text-center">
          <span className="inline-block rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-amber-600 dark:text-amber-400">
            {dict.badge}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-700 dark:text-white/70">
            {dict.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {dict.items.map((item: any, i: number) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-4 rounded-2xl border border-border dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm transition-all duration-300"
            >
              <Quote className="h-6 w-6 text-amber-500/60 dark:text-amber-400/50" />
              <p className="text-sm sm:text-base text-gray-700 dark:text-white/80 leading-relaxed italic">
                "{item.quote}"
              </p>
              <div className="mt-auto pt-2 border-t border-border dark:border-white/10">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-white/50">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
