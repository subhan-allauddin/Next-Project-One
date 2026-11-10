"use client";

import { cn } from "@/utils/cn";
import React from "react";
import { Quote, Star } from "lucide-react";

type CardItem = {
  quote: string;
  name: string;
  title: string;
};

interface InfiniteMovingCardsProps {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const animationDuration =
    speed === "fast" ? "24s" : speed === "normal" ? "44s" : "70s";
  const animationDirection = direction === "left" ? "normal" : "reverse";

  const renderCard = (item: CardItem, index: number, isDuplicate: boolean) => (
    <li
      key={`${isDuplicate ? "dup" : "orig"}-${item.name}-${index}`}
      aria-hidden={isDuplicate || undefined}
      className="w-[320px] sm:w-[400px] md:w-[440px] max-w-full relative rounded-2xl border border-white/10 flex-shrink-0 px-7 py-6 bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-teal-400/35 transition-colors duration-300"
    >
      <blockquote className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Quote className="w-5 h-5 text-teal-400/70" />
            <div className="flex items-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
          </div>
          <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-200 font-normal">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-teal-400/30 to-emerald-500/20 border border-teal-400/30 flex items-center justify-center text-xs font-bold text-teal-200">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">
              {item.name}
            </span>
            <span className="text-xs text-neutral-400">{item.title}</span>
          </div>
        </div>
      </blockquote>
    </li>
  );

  return (
    <div
      style={
        {
          "--animation-duration": animationDuration,
          "--animation-direction": animationDirection,
        } as React.CSSProperties
      }
      className={cn(
        "scroller relative z-20 max-w-7xl w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_14%,white_86%,transparent)]",
        className
      )}
    >
      <ul
        className={cn(
          "flex w-max shrink-0 flex-nowrap py-4 gap-4 pr-4 animate-scroll will-change-transform motion-reduce:animate-none",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => renderCard(item, idx, false))}
        {items.map((item, idx) => renderCard(item, idx, true))}
      </ul>
    </div>
  );
};
