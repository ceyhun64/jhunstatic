// components/projects/projectsClient.tsx

"use client";

import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { FlickeringGrid } from "../ui/shadcn-io/flickering-grid";
import { TextReveal } from "../ui/shadcn-io/text-reveal";
import { ProjectWithTechnologies } from "@/lib/staticData";

type Props = {
  dict: any;
  locale: "tr" | "en";
  projects: ProjectWithTechnologies[];
};

export default function ProjectsClient({ dict, locale, projects }: Props) {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] via-gray-200 to-[#F5F7FA] dark:from-black dark:via-amber-950/80 dark:to-black text-gray-900 dark:text-white py-15 md:py-20 px-4 md:px-10 relative overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={20}
        gridGap={5}
        color="#6D6A75"
        maxOpacity={0.1}
        flickerChance={0.1}
      />

      {/* BAŞLIK */}
      <div className="relative w-full flex flex-col justify-center items-center text-center z-10 mt-5">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-9xl font-extrabold mb-0 md:mb-2 z-10 font-mono"
        >
          <TextReveal
            text={dict.title_main}
            revealText={dict.title_reveal}
            className="h-20"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 w-full max-w-2xl mx-auto mb-6 text-sm md:text-base z-10 font-mono"
        >
          {dict.subtitle}
        </motion.p>
      </div>

      {/* İçerik */}
      <div className="max-w-7xl mx-auto text-center relative z-10 font-mono">
        {projects.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 mt-10">
            {dict.empty}
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10">
            {projects.map((proj, index) => {
              const displayTitle =
                locale === "en" && proj.titleEng ? proj.titleEng : proj.title;
              const displaySummary =
                locale === "en" && proj.summaryEng
                  ? proj.summaryEng
                  : proj.summary;

              return (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-[400px]"
                >
                  {isMobile ? (
                    <div className="bg-white dark:bg-zinc-950/50 border border-gray-300 dark:border-zinc-800 rounded-2xl p-2.5 shadow-lg hover:shadow-xl transition-all duration-300 text-left">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
                        <Link href={`/${locale}/projects/${proj.id}`}>
                          <Image
                            src={proj.image}
                            alt={displayTitle}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </Link>
                      </div>
                      <div className="p-1.5">
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                          {displayTitle}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                          {displaySummary}
                        </p>
                        <div className="mt-4 flex justify-between items-center">
                          <Link
                            href={`/${locale}/projects/${proj.id}`}
                            className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                          >
                            <Eye className="w-4 h-4" /> {dict.view_project}
                          </Link>
                          <Button
                            onClick={() => window.open(proj.url, "_blank")}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-4 py-2 rounded-full font-semibold"
                          >
                            {dict.visit_site} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CardContainer
                      className="inter-var"
                      containerClassName="py-6 scale-95 md:scale-100 transition-transform duration-300"
                    >
                      <CardBody className="relative bg-gradient-to-b from-zinc-50/5 via-zinc-100/20 to-zinc-300/40 dark:from-zinc-950/5 dark:via-zinc-900/20 dark:to-zinc-800/50 border border-gray-800/10 dark:border-gray-200/10 rounded-2xl p-3 group/card hover:border-blue-500/40 transition-all duration-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:z-10 text-left">
                        <CardItem translateZ="140" className="w-full">
                          <div className="relative aspect-[3/2] overflow-hidden rounded-xl cursor-pointer">
                            <Link href={`/${locale}/projects/${proj.id}`}>
                              <Image
                                src={proj.image}
                                alt={displayTitle}
                                fill
                                className="object-cover object-center transition-transform duration-500 group-hover/card:brightness-110"
                              />
                            </Link>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-orange-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                          </div>
                        </CardItem>

                        <CardItem
                          translateZ="120"
                          className="mt-5 text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors text-left"
                        >
                          {displayTitle}
                        </CardItem>

                        <CardItem
                          as="p"
                          translateZ="60"
                          className="text-sm text-gray-700 dark:text-gray-400 mt-2 line-clamp-3 text-left transition-colors duration-300"
                        >
                          {displaySummary}
                        </CardItem>

                        <div className="mt-5 flex justify-between items-center">
                          <CardItem translateZ={60} as="span">
                            <Link
                              href={`/${locale}/projects/${proj.id}`}
                              className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
                            >
                              <Eye className="w-4 h-4" /> {dict.view_project}
                            </Link>
                          </CardItem>

                          <CardItem translateZ={40} as="div">
                            <Button
                              onClick={() => window.open(proj.url, "_blank")}
                              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)] transition-all"
                            >
                              {dict.visit_site}{" "}
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </CardItem>
                        </div>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-orange-500/10 to-blue-500/10 dark:from-blue-500/20 dark:via-orange-500/20 dark:to-blue-500/20 opacity-0 group-hover/card:opacity-100 blur-[25px] transition-opacity duration-700" />
                      </CardBody>
                    </CardContainer>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-32 mb-20 text-center relative z-10"
      >
        <div className="relative inline-block px-10 py-8 rounded-3xl bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-[#0a0f1f] dark:via-[#101a3b] dark:to-[#1e2b4b] border border-gray-300 dark:border-indigo-900/30 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(24,39,94,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_0_80px_rgba(60,90,180,0.7)] transition-all duration-700 backdrop-blur-md">
          <h2 className="text-3xl md:text-5xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-sky-300 dark:via-indigo-300 dark:to-blue-100 drop-shadow-[0_0_15px_rgba(90,160,255,0.3)]">
            {dict.cta_title}
          </h2>
          <p className="text-gray-700 dark:text-slate-300 text-base sm:text-lg mt-3 font-sans leading-relaxed">
            {dict.cta_text}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-6 w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 rounded-full text-white font-semibold text-lg shadow-[0_0_20px_rgba(56,189,248,0.7)] hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,1)] transition-all duration-300"
          >
            {dict.cta_button} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
