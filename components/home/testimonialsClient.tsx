"use client";

import { motion, easeOut } from "framer-motion";
import { Quote, Star } from "lucide-react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/shadcn-io/marquee";

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

function TestimonialCard({ item }: { item: any }) {
  return (
    <div className="flex w-75 sm:w-90 flex-col gap-4 rounded-2xl border border-border dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm hover:border-amber-400/40 dark:hover:border-amber-400/30 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300">
      <div className="flex items-center justify-between">
        <Quote className="h-6 w-6 text-amber-500/60 dark:text-amber-400/50" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, s) => (
            <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="text-sm sm:text-base text-gray-700 dark:text-white/80 leading-relaxed italic">
        "{item.quote}"
      </p>
      <div className="mt-auto pt-2 border-t border-border dark:border-white/10 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {item.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-white/50">
          {item.timeAgo}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsClient({ dict }: Props) {
  const items: any[] = dict.items ?? [];
  const half = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, half);
  const rowTwo = items.slice(half);

  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-gray-200 via-[#F5F7FA] to-gray-200 dark:from-slate-950 dark:via-black dark:to-slate-950 font-sans overflow-hidden"
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
      </div>

      <motion.div variants={itemVariants} className="mt-12 flex flex-col gap-6">
        <Marquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent pauseOnHover speed={35} autoFill>
            {rowOne.map((item, i) => (
              <MarqueeItem key={i}>
                <TestimonialCard item={item} />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>

        {rowTwo.length > 0 && (
          <Marquee>
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />
            <MarqueeContent pauseOnHover speed={35} autoFill direction="right">
              {rowTwo.map((item, i) => (
                <MarqueeItem key={i}>
                  <TestimonialCard item={item} />
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        )}
      </motion.div>
    </motion.section>
  );
}
