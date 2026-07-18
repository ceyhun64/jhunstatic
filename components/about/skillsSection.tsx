"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import {
  Layout,
  Server,
  Database as DatabaseIcon,
  Cloud,
  Code2,
  FileText,
  type LucideIcon,
} from "lucide-react";
import type { Technology } from "@/lib/staticData";

type Props = {
  dict: {
    heading: string;
    subtitle: string;
    toolsHeading: string;
    tools: string[];
  };
  technologies: Technology[];
};

const CATEGORY_ORDER = ["Frontend", "Backend", "Database", "DevOps", "Language", "CMS"];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  Database: DatabaseIcon,
  DevOps: Cloud,
  Language: Code2,
  CMS: FileText,
};

const MAX_YOE = 5;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function SkillsSection({ dict, technologies }: Props) {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: technologies
      .filter((t) => t.type === category)
      .sort((a, b) => b.yoe - a.yoe),
  })).filter((g) => g.items.length > 0);

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
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {grouped.map(({ category, items }) => {
          const CategoryIcon = CATEGORY_ICONS[category] ?? Code2;
          return (
            <motion.div
              key={category}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-5 shadow-sm transition-all duration-300 hover:border-amber-400/40 dark:hover:border-amber-400/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]"
            >
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-amber-400/10 dark:bg-amber-400/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

              <div className="relative flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <CategoryIcon className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-white/70">
                  {category}
                </h3>
                <span className="ml-auto text-[10px] font-mono text-gray-400 dark:text-white/30">
                  {items.length}
                </span>
              </div>

              <ul className="relative space-y-4">
                {items.map((tech) => {
                  const fillPct = Math.min(100, (tech.yoe / MAX_YOE) * 100);
                  return (
                    <li key={tech.id} className="flex items-center gap-3">
                      <div
                        className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${tech.color}1F`,
                          border: `1px solid ${tech.color}40`,
                        }}
                      >
                        <div className="relative h-4.5 w-4.5">
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm text-gray-800 dark:text-white/85 truncate">
                            {tech.name}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 dark:text-white/35 shrink-0">
                            {tech.yoe}y
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${fillPct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: tech.color }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Entegrasyonlar & Araçlar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50 mb-4">
          {dict.toolsHeading}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {dict.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-white/70 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 transition-colors hover:border-amber-400/40 hover:text-amber-700 dark:hover:text-amber-300"
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
