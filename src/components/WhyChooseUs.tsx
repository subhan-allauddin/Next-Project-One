"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CoursesData from "../data/music_courses.json";

const courseSlugs = new Set([
  "guitar-fundamentals",
  "advanced-vocal-techniques",
  "jazz-improvisation",
  "music-production-fundamentals",
]);

const subjectCourses = CoursesData.courses.filter((course) =>
  courseSlugs.has(course.slug)
);

function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="text-xs sm:text-sm text-teal-400 font-semibold tracking-[0.2em] uppercase">
            Course Catalogue
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Explore Music Subjects
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Explore course descriptions and ask us about availability or
            enrollment.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjectCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
          >
            <Link
              href={`/courses#${course.slug}`}
              className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-teal-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {course.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
