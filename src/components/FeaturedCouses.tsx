"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CoursesData from "../data/music_courses.json";
import { BackgroundGradient } from "./ui/background-gradient";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  image?: string;
}

function FeaturedCourses() {
  const featuredCourses = CoursesData.courses.filter(
    (course: Course) => course.isFeatured
  );

  return (
    <section
      id="featured-courses"
      className="relative py-20 sm:py-24 bg-neutral-950 px-4 sm:px-6 lg:px-8 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block text-xs sm:text-sm text-teal-400 font-semibold tracking-[0.2em] uppercase">
            Featured Courses
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Explore Featured Courses
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400">
            Browse selected offerings from the course catalogue.
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredCourses.map((course: Course, index: number) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-center"
            >
              <BackgroundGradient
                containerClassName="w-full max-w-sm h-full"
                className="flex flex-col rounded-[21px] bg-zinc-950 overflow-hidden h-full"
              >
                {course.image && (
                  <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-teal-300 transition-colors duration-200">
                    {course.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-neutral-400 leading-relaxed flex-grow">
                    {course.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <Link
                      href={`/courses#${course.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </BackgroundGradient>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="mt-14 sm:mt-16 text-center"
        >
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white text-black font-semibold text-sm hover:bg-teal-300 hover:border-teal-300 transition-all duration-200 active:scale-[0.98] shadow-[0_0_25px_rgba(255,255,255,0.12)]"
          >
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedCourses;
