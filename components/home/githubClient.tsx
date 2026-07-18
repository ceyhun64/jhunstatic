"use client";

import { motion, easeOut } from "framer-motion";
import Link from "next/link";
import { Github, Star, GitFork, ArrowUpRight, Circle } from "lucide-react";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "@/components/ui/shadcn-io/3d-card";
import { StarfieldBackground } from "@/components/ui/starfield";
import type { GithubShowcase } from "@/lib/github";

type Props = {
  dict: any;
  showcase: GithubShowcase | null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

function intensity(count: number) {
  if (count === 0) return "bg-white/5";
  if (count <= 2) return "bg-emerald-900/60";
  if (count <= 5) return "bg-emerald-700/70";
  if (count <= 9) return "bg-emerald-500/80";
  return "bg-emerald-400";
}

export default function GithubClient({ dict, showcase }: Props) {
  const profileUrl = showcase?.url ?? "https://github.com/ceyhun64";

  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4 md:px-10 font-sans bg-black">
      {/* Kod/GitHub temalı arka plan */}
      <div
        className="absolute inset-0"
      
      >
        <StarfieldBackground
          className="absolute inset-0"
          count={300}
          speed={0.4}
          starColor="#ffffff"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400 animate-pulse" />
            <span className="text-xs text-white/80 font-medium tracking-wide">
              {dict.badge}
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-emerald-300"
          >
            {dict.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-sm sm:text-base text-white/70"
          >
            {dict.subtitle}
          </motion.p>
        </motion.div>

        {showcase ? (
          <>
            {/* Contribution grafigi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.02] backdrop-blur-md p-5 md:p-8 shadow-[0_0_40px_rgba(16,185,129,0.06)]"
            >
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <span className="text-base md:text-lg font-semibold text-white">
                  {dict.contributionsLabel?.replace(
                    "{count}",
                    String(showcase.totalContributions),
                  )}
                </span>
                <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <span>Less</span>
                  {["bg-white/5", "bg-emerald-900/60", "bg-emerald-700/70", "bg-emerald-500/80", "bg-emerald-400"].map(
                    (c, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-2.5 rounded-[2px] ${c}`}
                      />
                    ),
                  )}
                  <span>More</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] w-fit">
                  {showcase.weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          title={`${day.date}: ${day.count}`}
                          className={`h-[10px] w-[10px] rounded-[2px] transition-transform hover:scale-125 ${intensity(day.count)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pinned repolar */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {showcase.pinnedRepos.map((repo) => (
                <motion.div key={repo.name} variants={itemVariants}>
                  <CardContainer className="w-full" containerClassName="py-0">
                    <CardBody className="group relative h-auto w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:border-emerald-400/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                      <CardItem
                        translateZ={40}
                        as="a"
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full! flex items-center gap-2"
                      >
                        <Github className="h-4 w-4 text-white/40 shrink-0 group-hover:text-emerald-400 transition-colors" />
                        <span className="font-mono text-sm font-semibold text-white truncate flex-1">
                          {repo.name}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/50 shrink-0 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </CardItem>
                      <CardItem
                        translateZ={25}
                        as="p"
                        className="mt-3 w-full! text-sm text-white/70 leading-relaxed line-clamp-3 min-h-[3.75rem]"
                      >
                        {repo.description || dict.noDescription}
                      </CardItem>
                      <CardItem
                        translateZ={15}
                        className="mt-4 w-full! flex items-center gap-4 text-xs text-white/60"
                      >
                        {repo.primaryLanguage && (
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  repo.primaryLanguage.color || "#999",
                              }}
                            />
                            {repo.primaryLanguage.name}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {repo.stargazerCount}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitFork className="h-3.5 w-3.5" />
                          {repo.forkCount}
                        </span>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-white text-black font-semibold text-sm shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_45px_rgba(52,211,153,0.35)] hover:scale-105 active:scale-100 transition-all duration-300 border border-white/20"
          >
            <Github className="h-4 w-4" />
            {dict.viewProfile}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
