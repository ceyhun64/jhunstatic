"use client";

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TypingText from "@/components/ui/shadcn-io/typing-text";

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

export default function FaqClient({ dict }: Props) {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-[#F5F7FA] via-gray-200 to-[#F5F7FA] dark:from-black dark:via-indigo-950 dark:to-black font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-3xl">
        {/* Baslık */}
        <motion.div variants={itemVariants} className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-300">
            <HelpCircle className="h-3.5 w-3.5" />
            {dict.badge}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            <TypingText text={dict.title} cursorClassName="h-8 sm:h-9" />
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-white/80">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Sorular */}
        <motion.div
          variants={itemVariants}
          className="mt-12 rounded-2xl border border-border dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-4 sm:px-6 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {dict.items.map((item: any, i: number) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border dark:border-white/10"
              >
                <AccordionTrigger className="gap-4 text-left text-base font-semibold text-gray-900 dark:text-white hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/10 text-xs font-mono font-semibold text-purple-600 dark:text-purple-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-10 text-sm sm:text-base text-gray-700 dark:text-white/70 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-16 rounded-2xl border border-border dark:border-white/10 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950/40 dark:via-black/60 dark:to-amber-950/40 p-8 md:p-12 text-center shadow-sm"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            {dict.cta.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-white/70 max-w-xl mx-auto">
            {dict.cta.text}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-300 rounded-full text-white font-semibold text-base md:text-lg shadow-[0_0_20px_rgba(255,200,0,0.7)] hover:scale-105 hover:shadow-[0_0_40px_rgba(255,220,100,0.8)] transition-all duration-300"
          >
            {dict.cta.button} <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
