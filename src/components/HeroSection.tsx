"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Music2, Sparkles } from "lucide-react";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "../components/ui/moving-border";
import CoursesData from "../data/music_courses.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.24,
      delayChildren: 0.22,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.05,
      ease: [0.19, 1, 0.22, 1] as const,
    },
  },
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black/[0.96] bg-grid-white/[0.03] pt-28 pb-20 px-4">
      {/* Radial ambient mask & glow (lightweight GPU fallback alongside Spotlight) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(20,184,166,0.18),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_25%,black_85%)]"
      />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto w-full text-center flex flex-col items-center"
      >
        {/* Top pill badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm text-neutral-200 mb-6 shadow-[0_0_25px_rgba(20,184,166,0.12)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
          </span>
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Music courses across instruments, voice, and production</span>
        </motion.div>

        {/* Main Hero Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.06] bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-500"
        >
          Master The Art{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-400">
            Of Music
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300/90 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Browse the course catalogue, find a subject that interests you, and
          contact us with questions about availability or enrollment.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/courses" className="inline-block rounded-[1.75rem]">
            <Button as="div" duration={4200} className="gap-2">
              <span>Explore Courses</span>
              <ArrowRight className="w-4 h-4 text-teal-400 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>

          <Link
            href="/contact?topic=Trial%20Availability"
            className="inline-flex items-center gap-2.5 h-12 sm:h-14 px-7 rounded-[1.75rem] border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 text-neutral-200 hover:text-white text-sm sm:text-base font-medium backdrop-blur-md transition-all duration-200 active:scale-[0.98]"
          >
            <Music2 className="w-4 h-4 text-teal-400" />
            <span>Ask about a trial</span>
          </Link>
        </motion.div>

        {/* Catalogue count, not a student or review metric. */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/10 max-w-xl w-full text-center"
        >
          <div>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {CoursesData.courses.length}
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Courses in the catalogue
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom fade & subtle scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-neutral-950 to-transparent"
      />
      <motion.a
        href="#featured-courses"
        aria-label="Scroll to featured courses"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.65, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 mt-10 inline-flex flex-col items-center gap-1 text-xs text-neutral-500 hover:text-teal-300 transition-colors"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </motion.a>
    </section>
  );
};

export default HeroSection;
