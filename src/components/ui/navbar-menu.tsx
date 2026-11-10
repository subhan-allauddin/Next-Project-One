"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 22,
  stiffness: 260,
  restDelta: 0.001,
  restSpeed: 0.001,
};

interface MenuItemProps {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  href?: string;
  isCurrent?: boolean;
  children?: ReactNode;
}

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
  isCurrent,
  children,
}: MenuItemProps) => {
  const isOpen = active === item && Boolean(children);
  const itemId = `nav-menu-${item.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const triggerClassName = cn(
    "relative inline-flex items-center gap-1 whitespace-nowrap cursor-pointer text-xs sm:text-sm font-medium px-2 sm:px-3 py-1.5 rounded-full transition-colors duration-200 select-none",
    isCurrent || active === item
      ? "text-white"
      : "text-neutral-300 hover:text-white"
  );
  const triggerContent = (
    <>
      {isCurrent && (
        <motion.span
          layoutId="nav-active-pill"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute inset-0 rounded-full bg-white/10 border border-white/15 -z-10"
        />
      )}
      {item}
    </>
  );

  return (
    <div
      onMouseEnter={() => children && setActive(item)}
      className="relative"
    >
      {children ? (
        <button
          type="button"
          className={triggerClassName}
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={itemId}
          onFocus={() => setActive(item)}
          onClick={() => setActive(item)}
        >
          {triggerContent}
        </button>
      ) : (
        <Link
          href={href ?? "/"}
          className={triggerClassName}
          aria-current={isCurrent ? "page" : undefined}
        >
          {triggerContent}
        </Link>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 6 }}
            transition={transition}
            id={itemId}
            className="absolute top-[calc(100%_+_0.85rem)] left-1/2 -translate-x-1/2 pt-2 z-50"
          >
            <motion.div
              transition={transition}
              layoutId="active"
              className="bg-neutral-950/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
            >
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MenuProps {
  setActive: (item: string | null) => void;
  scrolled?: boolean;
  children: ReactNode;
}

export const Menu = ({ setActive, scrolled = false, children }: MenuProps) => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActive(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setActive]);

  return (
    <nav
      ref={navRef}
      onMouseLeave={() => setActive(null)}
      aria-label="Main navigation"
      className={cn(
        "relative rounded-full border backdrop-blur-xl flex items-center justify-center gap-0 sm:gap-2 px-2 sm:px-6 transition-all duration-300",
        scrolled
          ? "py-2.5 bg-neutral-950/85 border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          : "py-3.5 bg-neutral-950/65 border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
      )}
    >
      <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
      {children}
    </nav>
  );
};

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: ProductItemProps) => {
  return (
    <Link href={href} className="flex space-x-2 group">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl group-hover:scale-105 transition-transform duration-200"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">{title}</h4>
        <p className="text-sm max-w-[10rem] text-neutral-300">{description}</p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...rest}
      className={cn(
        "text-neutral-300 hover:text-teal-300 transition-colors duration-200",
        className
      )}
    >
      {children}
    </Link>
  );
};
