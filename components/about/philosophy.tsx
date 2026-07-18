"use client";

import { motion, easeOut } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Gauge,
  Accessibility,
  Code2,
  FlaskConical,
  ShieldCheck,
  Puzzle,
  type LucideIcon,
} from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/shadcn-io/3d-card";

type Props = {
  dict: {
    heading: string;
    subtitle: string;
    items: { title: string; text: string; icon: string }[];
  };
};

const ICONS: Record<string, LucideIcon> = {
  Layers,
  TrendingUp,
  Gauge,
  Accessibility,
  Code2,
  FlaskConical,
  ShieldCheck,
  Puzzle,
};

const ACCENTS = [
  "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10",
  "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10",
  "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10",
  "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10",
  "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/10",
  "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/10",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function Philosophy({ dict }: Props) {
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
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {dict.items.map((item, i) => {
          const Icon = ICONS[item.icon] || Layers;
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.div key={item.title} variants={itemVariants}>
              <CardContainer className="w-full" containerClassName="py-0">
                <CardBody className="relative h-auto w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardItem translateZ={40} className="w-auto!">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </CardItem>
                  <CardItem
                    translateZ={30}
                    as="h3"
                    className="mt-4 w-full! text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    {item.title}
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="p"
                    className="mt-2 w-full! text-xs leading-relaxed text-gray-600 dark:text-white/60"
                  >
                    {item.text}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
