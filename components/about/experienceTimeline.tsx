"use client";

import { motion, easeOut } from "framer-motion";
import { Briefcase, CheckCircle2, Calendar, Sparkles } from "lucide-react";

type Engagement = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  stack: string[];
};

type Props = {
  dict: {
    heading: string;
    subtitle: string;
    role: string;
    period: string;
    summary: string[];
    stack: string[];
    engagementsHeading: string;
    engagements: Engagement[];
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const GLOW_ACCENTS = [
  "bg-amber-400/30 dark:bg-amber-500/20",
  "bg-emerald-400/25 dark:bg-emerald-500/15",
  "bg-blue-400/25 dark:bg-blue-500/15",
  "bg-violet-400/25 dark:bg-violet-500/15",
];

export default function ExperienceTimeline({ dict }: Props) {
  return (
    <section className="mt-20 md:mt-28">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
          {dict.heading}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-white/60">
          {dict.subtitle}
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mt-10 max-w-5xl mx-auto"
      >
        {/* Ana rol kartı */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 md:p-8 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {dict.role}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50">
                  {dict.period}
                </p>
              </div>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {dict.summary.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-white/70 leading-relaxed"
              >
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {dict.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-[11px] font-mono text-gray-700 dark:text-white/70 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Öne çıkan projeler - glassmorphism kartlar */}
        <motion.div variants={itemVariants} className="relative mt-12">
          <div className="flex items-center gap-2 mb-6 pl-1">
            <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
              {dict.engagementsHeading}
            </h3>
          </div>

          {/* Glassmorphism için renkli, bulanık arkaplan lekeleri */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <div className="absolute -top-10 left-[5%] h-64 w-64 rounded-full bg-amber-400/25 dark:bg-amber-500/15 blur-3xl" />
            <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 dark:bg-emerald-500/15 blur-3xl" />
            <div className="absolute bottom-0 right-[5%] h-60 w-60 rounded-full bg-blue-400/25 dark:bg-blue-500/15 blur-3xl" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {dict.engagements.map((eng, i) => (
              <motion.div
                key={eng.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-white/[0.06] backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/55 dark:hover:bg-white/[0.1] hover:border-white/60 dark:hover:border-white/20 hover:shadow-[0_8px_40px_rgba(245,158,11,0.15)]"
              >
                {/* Cam üstü ince parlaklık çizgisi */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 dark:via-white/30 to-transparent" />
                <div
                  className={`pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300 ${GLOW_ACCENTS[i % GLOW_ACCENTS.length]}`}
                />

                <div className="relative flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-gray-500 dark:text-white/50">
                    <Calendar className="h-3 w-3" />
                    {eng.period}
                  </span>
                </div>

                <h4 className="relative text-base font-semibold text-gray-900 dark:text-white">
                  {eng.title}
                </h4>
                <p className="relative text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">
                  {eng.subtitle}
                </p>
                <p className="relative mt-3 text-sm text-gray-700 dark:text-white/70 leading-relaxed flex-1">
                  {eng.description}
                </p>
                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {eng.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono text-gray-700 dark:text-white/70 bg-white/50 dark:bg-white/10 border border-white/50 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
