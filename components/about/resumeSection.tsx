"use client";

import { motion, easeOut } from "framer-motion";
import { GraduationCap, BadgeCheck, Languages, Download } from "lucide-react";

type Props = {
  dict: {
    heading: string;
    subtitle: string;
    educationTitle: string;
    educationDegree: string;
    educationSchool: string;
    educationPeriod: string;
    certificatesTitle: string;
    certificates: string[];
    languagesTitle: string;
    languages: { name: string; level: string }[];
    downloadLabel: string;
  };
  locale: "tr" | "en";
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function ResumeSection({ dict, locale }: Props) {
  const pdfHref =
    locale === "tr"
      ? encodeURI("/cv/Ceyhun Türkmen - CV(Tr).pdf")
      : encodeURI("/cv/Ceyhun Türkmen - CV.pdf");

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
        className="mt-10 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
            {dict.educationTitle}
          </h3>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {dict.educationDegree}
          </p>
          <p className="text-sm text-gray-600 dark:text-white/60">{dict.educationSchool}</p>
          <p className="text-xs text-gray-500 dark:text-white/40 mt-1 font-mono">
            {dict.educationPeriod}
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
            {dict.certificatesTitle}
          </h3>
          <ul className="space-y-1.5">
            {dict.certificates.map((c) => (
              <li key={c} className="text-sm text-gray-700 dark:text-white/70">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4">
            <Languages className="h-5 w-5" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50 mb-2">
            {dict.languagesTitle}
          </h3>
          <ul className="space-y-1.5">
            {dict.languages.map((l) => (
              <li key={l.name} className="text-sm text-gray-700 dark:text-white/70">
                <span className="font-semibold text-gray-900 dark:text-white">{l.name}</span>{" "}
                — {l.level}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a
          href={pdfHref}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-gray-900 shadow-md hover:shadow-lg transition-all"
        >
          <Download className="h-4 w-4" />
          {dict.downloadLabel}
        </a>
      </motion.div>
    </section>
  );
}
