"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronDown, Music2 } from "lucide-react";
import UnderlineText from "./ui/UnderlineText";
import courseData from "@/data/music_courses.json";

const courseLinks = [
  { label: "All Courses", href: "/courses" },
  ...courseData.courses.slice(0, 4).map((course) => ({
    label: course.title,
    href: `/courses#${course.slug}`,
  })),
];

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 36;
    if (next !== scrolled) {
      setScrolled(next);
    }
  });

  return (
    <header
      className={cn(
        "fixed top-4 sm:top-6 inset-x-0 max-w-xl mx-auto z-50 px-4 transition-transform duration-300",
        className
      )}
    >
      <Menu setActive={setActive} scrolled={scrolled}>
        <Link
          href="/"
          aria-label="Harmony Academy Home"
          className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 mr-1 hover:bg-teal-500/25 transition-colors"
        >
          <Music2 className="w-4 h-4" />
        </Link>

        <MenuItem
          setActive={setActive}
          active={active}
          item="Home"
          href="/"
          isCurrent={pathname === "/"}
        />

        <MenuItem
          setActive={setActive}
          active={active}
          item="Our Courses"
          isCurrent={pathname?.startsWith("/courses")}
        >
          <div className="flex flex-col space-y-3 text-sm min-w-[190px]">
            {courseLinks.map((link) => (
              <HoveredLink
                key={link.label}
                href={link.href}
                onClick={() => setActive(null)}
                className="flex items-center justify-between py-0.5"
              >
                <UnderlineText>{link.label}</UnderlineText>
              </HoveredLink>
            ))}
          </div>
        </MenuItem>

        <MenuItem
          setActive={setActive}
          active={active}
          item="Contact Us"
          href="/contact"
          isCurrent={pathname === "/contact"}
        />

        <Link
          href="/courses"
          className="hidden sm:inline-flex items-center gap-1 ml-1 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-black font-semibold text-xs hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)]"
        >
          Start Learning
          <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
        </Link>
      </Menu>
    </header>
  );
}

export default Navbar;
