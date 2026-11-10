"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HoverEffect, HoverEffectItem } from "./ui/card-hover-effect";
import CoursesData from "../data/music_courses.json";

const additionalCourses: HoverEffectItem[] = CoursesData.courses
  .filter((course) => !course.isFeatured)
  .map((course) => ({
    title: course.title,
    description: course.description,
    link: `/courses#${course.slug}`,
    badge: "Course",
  }));

export function CardHoverEffect() {
  return (
    <section className="relative py-20 sm:py-24 bg-neutral-950 px-4 sm:px-6 lg:px-8 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-sm text-teal-400 font-semibold tracking-[0.2em] uppercase">
            More Courses
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Explore More Courses
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Browse additional subjects from the course catalogue.
          </p>
        </motion.div>

        <div className="mt-8">
          <HoverEffect items={additionalCourses} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mt-10 text-center"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white text-black font-semibold text-sm hover:bg-teal-300 hover:border-teal-300 transition-all duration-200 active:scale-[0.98]"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
