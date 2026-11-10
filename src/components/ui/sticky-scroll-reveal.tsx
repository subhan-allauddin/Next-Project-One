"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ContentBlock {
  title: string;
  description: string;
  tag?: string;
  content?: React.ReactNode;
}

const gradients = [
  "linear-gradient(135deg, rgba(20,184,166,0.22), rgba(16,185,129,0.12))",
  "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(56,189,248,0.12))",
  "linear-gradient(135deg, rgba(245,158,11,0.22), rgba(236,72,153,0.12))",
  "linear-gradient(135deg, rgba(6,182,212,0.22), rgba(59,130,246,0.12))",
];

function ScrollStep({
  item,
  index,
  isActive,
  onInView,
  onSelect,
}: {
  item: ContentBlock;
  index: number;
  isActive: boolean;
  onInView: (idx: number) => void;
  onSelect: (idx: number) => void;
}) {
  const stepRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(stepRef, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) {
      onInView(index);
    }
  }, [inView, index, onInView]);

  return (
    <button
      ref={stepRef}
      type="button"
      onClick={() => onSelect(index)}
      className={cn(
        "w-full text-left rounded-2xl p-6 sm:p-7 border transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
        isActive
          ? "bg-white/[0.06] border-teal-400/40 shadow-[0_0_35px_rgba(20,184,166,0.08)]"
          : "bg-white/[0.015] border-white/10 opacity-60 hover:opacity-90 hover:border-white/20"
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className={cn(
            "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-semibold border transition-colors",
            isActive
              ? "bg-teal-400 text-black border-teal-300"
              : "bg-white/5 text-neutral-400 border-white/15"
          )}
        >
          0{index + 1}
        </span>
        {item.tag && (
          <span className="text-xs uppercase tracking-wider font-medium text-teal-400">
            {item.tag}
          </span>
        )}
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white transition-colors">
        {item.title}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
        {item.description}
      </p>

      {/* Mobile inline preview */}
      {isActive && item.content && (
        <div className="mt-5 lg:hidden rounded-xl overflow-hidden border border-white/10 h-44">
          {item.content}
        </div>
      )}
    </button>
  );
}

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: ContentBlock[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 space-y-5">
          {content.map((item, index) => (
            <ScrollStep
              key={item.title}
              item={item}
              index={index}
              isActive={activeCard === index}
              onInView={setActiveCard}
              onSelect={setActiveCard}
            />
          ))}
        </div>

        <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
          <div
            style={{ background: gradients[activeCard % gradients.length] }}
            className={cn(
              "relative h-[24rem] w-full rounded-3xl border border-white/15 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 p-1",
              contentClassName
            )}
          >
            <div className="relative h-full w-full rounded-[20px] bg-zinc-950/85 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full w-full"
                >
                  {content[activeCard]?.content ?? null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
