"use client";

import { motion, easeOut } from "framer-motion";

interface Props {
  dict: any;
  accent?: "slate" | "blue" | "purple";
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

export default function LegalDocumentClient({ dict }: Props) {
  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-[#F5F7FA] via-gray-200 to-[#F5F7FA] dark:from-black dark:via-slate-900 dark:to-black font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-3xl">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {dict.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-white/50">
            {dict.updatedAt}
          </p>
          <p className="mt-6 text-sm sm:text-base text-gray-700 dark:text-white/80 leading-relaxed">
            {dict.intro}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col gap-8 rounded-2xl border border-border dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 sm:p-8"
        >
          {dict.sections.map((section: any, i: number) => (
            <div key={i}>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {section.heading}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-white/70 leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-gray-600 dark:text-white/60 text-center"
        >
          {dict.contactNote}
        </motion.p>
      </div>
    </motion.section>
  );
}
