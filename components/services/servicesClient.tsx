"use client";

import Link from "next/link";
import { motion, easeOut } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Code,
  Search,
  ShoppingCart,
  Server,
  MessageSquare,
  LifeBuoy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import TypingText from "@/components/ui/shadcn-io/typing-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { CardContainer, CardBody, CardItem } from "@/components/ui/shadcn-io/3d-card";

interface Props {
  dict: any;
}

const ICONS: Record<string, LucideIcon> = {
  Code,
  Search,
  ShoppingCart,
  Server,
  MessageSquare,
  LifeBuoy,
};

const CARD_ACCENTS = [
  {
    icon: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    border: "hover:border-amber-400/40 dark:hover:border-amber-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    icon: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
    border: "hover:border-blue-400/40 dark:hover:border-blue-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "hover:border-emerald-400/40 dark:hover:border-emerald-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
    border: "hover:border-violet-400/40 dark:hover:border-violet-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    border: "hover:border-rose-400/40 dark:hover:border-rose-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(244,63,94,0.18)]",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    icon: "bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400",
    border: "hover:border-sky-400/40 dark:hover:border-sky-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(14,165,233,0.18)]",
    badge: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
];

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

export default function ServicesClient({ dict }: Props) {
  const params = useParams();
  const locale = (params.locale as string) || "tr";

  return (
    <DotPattern className="relative min-h-screen">
      <motion.div
        className="py-28 px-4 md:px-10 font-sans"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="mx-auto max-w-6xl">
          {/* Baslık */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
           
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <TypingText text={dict.title} cursorClassName="h-9 sm:h-10" />
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-white/80">
              {dict.subtitle}
            </p>

            {dict.trust && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {dict.trust.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-white/80"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Hizmet Kartları */}
          <motion.div
            variants={containerVariants}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {dict.items.map((item: any, i: number) => {
              const Icon = ICONS[item.icon] || Code;
              const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
              return (
                <motion.div key={i} variants={itemVariants}>
                  <CardContainer className="w-full" containerClassName="py-0">
                    <CardBody
                      className={`relative h-auto w-full rounded-2xl border border-border dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6 shadow-sm hover:shadow-xl transition-colors duration-300 ${accent.border} ${accent.glow}`}
                    >
                      <CardItem
                        translateZ={50}
                        className="absolute! top-5 right-5 w-auto!"
                      >
                        <span
                          className={`text-[11px] font-mono font-semibold rounded-full h-7 w-7 flex items-center justify-center ${accent.badge}`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </CardItem>

                      <CardItem translateZ={60} className="w-auto!">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.icon}`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                      </CardItem>

                      <CardItem
                        translateZ={40}
                        as="h3"
                        className="mt-4 w-full! text-lg font-semibold text-gray-900 dark:text-white pr-8"
                      >
                        {item.title}
                      </CardItem>

                      <CardItem
                        translateZ={25}
                        as="p"
                        className="mt-2 w-full! text-sm text-gray-700 dark:text-white/70 leading-relaxed"
                      >
                        {item.description}
                      </CardItem>

                      <CardItem
                        translateZ={15}
                        as="p"
                        className="mt-3 pt-3 w-full! border-t border-border dark:border-white/10 text-xs text-gray-600 dark:text-white/60 leading-relaxed"
                      >
                        {item.detail}
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Çalısma Süreci */}
          <motion.div variants={itemVariants} className="mt-28">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {dict.processEyebrow}
              </span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                {dict.processTitle}
              </h2>
            </div>
            <div className="relative mt-12">
              <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-amber-300/0 via-amber-400/50 to-amber-300/0 dark:via-amber-400/30" />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {dict.process.map((step: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="relative rounded-2xl border border-border dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white font-mono font-semibold text-sm shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      {step.step}
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-white/70 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-28 rounded-2xl border border-border dark:border-white/10 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-amber-950/40 dark:via-black/60 dark:to-amber-950/40 p-8 md:p-12 text-center shadow-sm"
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
      </motion.div>
    </DotPattern>
  );
}
