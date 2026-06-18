"use client";

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GradientText } from "@/components/ui/shadcn-io/gradient-text";
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
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-[#F5F7FA] via-gray-200 to-[#F5F7FA] dark:from-black dark:via-purple-950 dark:to-black font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-3xl">
        {/* Baslık */}
        <motion.div variants={itemVariants} className="text-center">
          <GradientText
            className="text-sm font-mono tracking-tight"
            text={dict.badge}
          />
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <TypingText text={dict.title} cursorClassName="h-8 sm:h-9" />
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-white/80">
            {dict.subtitle}
          </p>
        </motion.div>

        {/* Sorular */}
        <motion.div
          variants={itemVariants}
          className="mt-12 rounded-2xl border border-border dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md px-4 sm:px-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {dict.items.map((item: any, i: number) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border dark:border-white/10"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 dark:text-white hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-gray-700 dark:text-white/70 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-16 rounded-2xl border border-border dark:border-white/10 bg-gradient-to-br from-purple-50 via-white to-purple-50 dark:from-purple-950/40 dark:via-black dark:to-purple-950/40 p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            {dict.cta.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-white/70 max-w-xl mx-auto">
            {dict.cta.text}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block mt-6"
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg hover:shadow-xl transition-all"
            >
              {dict.cta.button}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
