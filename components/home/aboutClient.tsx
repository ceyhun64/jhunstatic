"use client";

import { GradientText } from "@/components/ui/shadcn-io/gradient-text";
import { FireworksBackground } from "@/components/ui/shadcn-io/fireworks-background";
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";
import TypingText from "@/components/ui/shadcn-io/typing-text";
import { PixelImage } from "@/components/ui/shadcn-io/pixel-image";
import { SparklesCore } from "@/components/ui/shadcn-io/sparkles";
import Link from "next/link";
import { Download, Users, FolderCheck, Smile, Award } from "lucide-react";
import { easeOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  dict: any;
}

interface Company {
  src: string;
  alt: string;
}

interface Achievement {
  label: string;
  value: string;
}

const ACHIEVEMENT_ICONS = [Users, FolderCheck, Smile, Award];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.6 },
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

function CodeWindow({
  filename,
  children,
  className,
}: {
  filename: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 dark:border-white/5 bg-gray-50/80 dark:bg-white/3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        <span className="ml-2 text-[11px] font-mono text-gray-600 dark:text-white/60">
          {filename}
        </span>
      </div>
      <pre className="p-4 sm:p-5 font-mono overflow-x-auto whitespace-pre-wrap text-[13px] sm:text-sm leading-relaxed text-gray-900 dark:text-white">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export default function AboutClient({ dict }: Props) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useTheme için mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Tema durumuna göre parçacık rengini belirle
  const currentTheme = mounted ? resolvedTheme || theme : "light";
  const particleColor = currentTheme === "dark" ? "#FFFFFF" : "#000000";

  const defaultAchievements: Achievement[] = [
    { label: dict.achievement_1_label, value: dict.achievement_1_value },
    { label: dict.achievement_2_label, value: dict.achievement_2_value },
    { label: dict.achievement_3_label, value: dict.achievement_3_value },
    { label: dict.achievement_4_label, value: dict.achievement_4_value },
  ];

  return (
    <motion.section
      className="py-8 md:py-16 px-4 md:px-10 bg-gradient-to-b from-gray-200 via-gray-200 to-gray-200 dark:from-black dark:via-black dark:to-slate-950 font-sans"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto">
        {/* Baslık ve açıklama */}
        <div className="mb-2 md:mb-4 grid gap-5 text-center md:grid-cols-2 md:text-left px-2 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-gray-900 dark:text-white">
            <TypingText text={dict.typingTitle} cursorClassName="h-8 sm:h-9" />
          </h1>

          <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-0 mt-1 md:not-first:mt-4 text-gray-700 dark:text-white">
            {dict.lead}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {/* Sol Görsel Alanı */}
          <div className="lg:col-span-2">
            <div className="relative flex-1 rounded-xl overflow-hidden">
              <SparklesCore
                id="tsparticles-left-section-home"
                background="transparent"
                minSize={1}
                maxSize={2}
                particleDensity={50}
                className="absolute inset-0 w-full h-full"
                particleColor={particleColor}
                speed={1}
              />
              <div className="relative z-10 flex flex-col justify-between h-full overflow-hidden p-0 md:p-4 space-y-4">
                {/* 1. ve 2. Paragrafı içeren Ana Kod Blogu */}
                <CodeWindow filename="giris.tsx">
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;section id=
                  </span>
                  <span className="text-amber-700 dark:text-amber-400">
                    "giris"
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">&gt;</span>
                  {"\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;h2&gt;
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {dict.paragraph1_title}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;/h2&gt;
                  </span>
                  {"\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;p&gt;
                  </span>
                  {"\n    "}
                  {dict.paragraph1_text}
                  {"\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;/p&gt;
                  </span>
                  {"\n\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;h3&gt;
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {dict.mission_title}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;/h3&gt;
                  </span>
                  {"\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;p&gt;
                  </span>
                  {"\n    "}
                  {dict.mission_text}
                  {"\n  "}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;/p&gt;
                  </span>
                  {"\n"}
                  <span className="text-blue-600 dark:text-blue-400">
                    &lt;/section&gt;
                  </span>
                </CodeWindow>

                <motion.div
                  variants={{}}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {/* Vizyon Paragrafı (Küçük Kutucuk) */}
                  <CodeWindow filename="vizyon.tsx" className="h-full">
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;div id=
                    </span>
                    <span className="text-amber-700 dark:text-amber-400">
                      "vizyon"
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      &gt;
                    </span>
                    {"\n  "}
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;h4&gt;
                    </span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      {dict.vision_title}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;/h4&gt;
                    </span>
                    {"\n  "}
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;p&gt;
                    </span>
                    {"\n    "}
                    {dict.vision_text}
                    <span className="ml-1 animate-blink text-green-600 dark:text-green-400">
                      _
                    </span>
                    {"\n  "}
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;/p&gt;
                    </span>
                    {"\n"}
                    <span className="text-blue-600 dark:text-blue-400">
                      &lt;/div&gt;
                    </span>
                  </CodeWindow>

                  <style jsx>{`
                    .animate-blink {
                      display: inline-block;
                      width: 1ch;
                      animation: blink 2s infinite;
                    }
                    @keyframes blink {
                      0%,
                      50%,
                      100% {
                        opacity: 1;
                      }
                      25%,
                      75% {
                        opacity: 0;
                      }
                    }
                  `}</style>

                  {/* Görsel Kutusu */}
                  <div className="w-full sm:w-auto h-96 sm:h-72 md:h-full rounded-2xl overflow-hidden flex items-center justify-center">
                    <PixelImage src="/logo/logo.webp" grid="4x6" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Sag Içerik */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-sm p-6 md:p-8">
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
                <motion.div
                  animate={{ x: [-60, 60, -60], y: [-30, 30, -30] }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-200 dark:from-amber-400 dark:via-amber-500 dark:to-amber-300 opacity-20 dark:opacity-20 rounded-full filter blur-3xl"
                />
                <motion.div
                  animate={{ x: [40, -40, 40], y: [20, -20, 20] }}
                  transition={{
                    repeat: Infinity,
                    duration: 14,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-200 dark:from-indigo-400 dark:via-blue-500 dark:to-indigo-300 opacity-15 dark:opacity-15 rounded-full filter blur-2xl"
                />
              </div>

              <div className="relative z-10 flex flex-col gap-4 text-gray-900 dark:text-white">
                <Link href="/">
                  <GradientText
                    className="text-2xl font-bold font-mono"
                    text={dict.title}
                  />
                </Link>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  {dict.projects_heading}
                </h2>
                <p className="leading-7 text-sm sm:text-base">
                  {dict.projects_description}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight mt-6">
                  {dict.logo_title}
                </h3>
                <p className="mt-2 text-sm sm:text-base">
                  {dict.logo_paragraph1}
                </p>
                <p className="mt-2 text-sm sm:text-base">
                  {dict.logo_paragraph2}
                </p>
                <blockquote className="mt-4 border-l-2 pl-4 italic text-sm sm:text-base">
                  "{dict.quote}"
                </blockquote>

                <motion.div whileHover={{ scale: 1.03 }} className="mt-2">
                  <a
                    href="/cv/Ceyhun_Turkmen_CV.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-md hover:shadow-lg transition-all"
                  >
                    <Download className="h-4 w-4" />
                    {dict.cvButtonLabel}
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Basarılarımız */}
        <div className="mt-16 relative overflow-hidden rounded-2xl  border border-gray-200 dark:border-white/10 backdrop-blur-md py-8 px-4 md:p-16  text-gray-900 dark:text-white shadow-sm">
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: [-60, 60, -60], y: [-30, 30, -30] }}
              transition={{
                repeat: Infinity,
                duration: 18,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 -left-10 w-72 h-72 bg-gradient-to-tr from-amber-200 via-amber-300 to-amber-200 dark:from-amber-400 dark:via-amber-500 dark:to-amber-300 opacity-20 dark:opacity-20 rounded-full filter blur-3xl"
            />
            <motion.div
              animate={{ x: [40, -40, 40], y: [20, -20, 20] }}
              transition={{
                repeat: Infinity,
                duration: 14,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-indigo-200 via-blue-300 to-indigo-200 dark:from-indigo-400 dark:via-blue-500 dark:to-indigo-300 opacity-15 dark:opacity-15 rounded-full filter blur-2xl"
            />
          </div>
          <FireworksBackground
            className="absolute inset-0 w-full h-full"
            population={0.1}
          />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-semibold">
              {dict.achievement_heading}
            </h2>
            <p className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base">
              {dict.achievement_sub}
            </p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {defaultAchievements.map((a, i) => {
                const Icon = ACHIEVEMENT_ICONS[i] ?? Users;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center md:items-start gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm p-5 text-center md:text-left"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-semibold">
                      {a.value}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-white/60">
                      {a.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
