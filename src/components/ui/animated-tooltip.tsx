"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/utils/cn";

export interface TooltipPerson {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export const AnimatedTooltip = ({
  items,
  activeId,
  onActiveChange,
}: {
  items: TooltipPerson[];
  activeId?: number | null;
  onActiveChange?: (id: number | null) => void;
}) => {
  const [internalHoveredId, setInternalHoveredId] = useState<number | null>(
    null
  );
  const currentId = activeId !== undefined ? activeId : internalHoveredId;

  const setHovered = (id: number | null) => {
    setInternalHoveredId(id);
    onActiveChange?.(id);
  };

  const springConfig = { stiffness: 120, damping: 14 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-60, 60], [-20, 20]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-60, 60], [-28, 28]),
    springConfig
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-wrap items-center justify-center">
      {items.map((item) => {
        const isSelected = currentId === item.id;
        return (
          <div
            className="-mr-3 sm:-mr-4 last:mr-0 relative group"
            key={item.id}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence mode="popLayout">
              {isSelected && (
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.85 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 20,
                      },
                    }}
                    exit={{ opacity: 0, y: 10, scale: 0.85 }}
                    style={{
                      translateX,
                      rotate,
                      whiteSpace: "nowrap",
                    }}
                    className="relative flex text-xs flex-col items-center justify-center rounded-xl bg-neutral-950/95 border border-white/15 backdrop-blur-md shadow-2xl px-4 py-2"
                  >
                    <div className="absolute inset-x-6 z-30 -bottom-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-px" />
                    <div className="absolute inset-x-10 z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-400 to-transparent h-px" />
                    <div className="font-semibold text-white relative z-30 text-sm">
                      {item.name}
                    </div>
                    <div className="text-teal-300 text-xs">
                      {item.designation}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onMouseMove={handleMouseMove}
              onClick={() => setHovered(isSelected ? null : item.id)}
              onFocus={() => setHovered(item.id)}
              aria-label={`${item.name}, ${item.designation}`}
              className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <Image
                height={100}
                width={100}
                src={item.image}
                alt={item.name}
                className={cn(
                  "object-cover !m-0 !p-0 object-top rounded-full h-16 w-16 sm:h-20 sm:w-20 border-2 relative transition-all duration-300 cursor-pointer",
                  isSelected
                    ? "scale-110 z-30 border-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.45)]"
                    : "border-white/80 group-hover:scale-105 group-hover:z-30 group-hover:border-teal-300"
                )}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};
