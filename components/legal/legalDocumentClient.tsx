"use client";

import { motion, easeOut } from "framer-motion";
import { Clock, Mail, Shield, Scale, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  scale: Scale,
};

interface Props {
  dict: any;
  icon: "shield" | "scale";
  eyebrow: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.6 },
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

export default function LegalDocumentClient({ dict, icon, eyebrow }: Props) {
  const Icon = ICONS[icon] ?? Shield;

  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-[#F5F7FA] via-gray-200 to-[#F5F7FA] dark:from-black dark:via-slate-900 dark:to-black font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div variants={itemVariants} className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-400/30 bg-slate-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <Icon className="h-3.5 w-3.5" />
            {eyebrow}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dict.title}
          </h1>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs text-gray-500 dark:text-white/50">
            <Clock className="h-3 w-3" />
            {dict.updatedAt}
          </span>

          <p className="mt-6 text-sm sm:text-base text-gray-700 dark:text-white/80 leading-relaxed max-w-xl mx-auto">
            {dict.intro}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="mt-12 flex flex-col gap-4"
        >
          {dict.sections.map((section: any, i: number) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex gap-4 rounded-2xl border border-border dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-5 sm:p-6"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-xs font-mono font-semibold text-slate-600 dark:text-white/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {section.heading}
                </h2>
                <p className="mt-1.5 text-sm sm:text-base text-gray-700 dark:text-white/70 leading-relaxed">
                  {section.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 rounded-2xl border border-border dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 text-center"
        >
          <Mail className="h-4 w-4 text-gray-500 dark:text-white/50" />
          <p className="text-sm text-gray-600 dark:text-white/60">
            {dict.contactNote}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
