"use client";

import React, {
  ElementType,
  HTMLAttributes,
  ReactNode,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/utils/cn";

// ----------------- Button Component -----------------

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  borderRadius?: string;
  children: ReactNode;
  as?: ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
}

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <Component
      className={cn(
        "bg-transparent relative text-base h-12 sm:h-14 px-[1.5px] p-[1.5px] overflow-hidden inline-flex items-center justify-center group",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 opacity-[0.85] bg-[radial-gradient(var(--teal-400)_40%,transparent_60%)]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative bg-slate-950/90 border border-slate-800/80 backdrop-blur-xl text-white flex items-center justify-center w-full h-full px-7 text-sm sm:text-base font-medium antialiased transition-colors duration-200 group-hover:bg-slate-900/95",
          className
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

// ----------------- MovingBorder Component -----------------

interface MovingBorderProps extends SVGProps<SVGSVGElement> {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}

export const MovingBorder = ({
  children,
  duration = 2600,
  rx,
  ry,
  ...otherProps
}: MovingBorderProps) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const totalLengthRef = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue<number>(0);
  const y = useMotionValue<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    const updateLength = () => {
      try {
        totalLengthRef.current = path.getTotalLength();
      } catch {
        totalLengthRef.current = 0;
      }
    };

    updateLength();

    const resizeObserver = new ResizeObserver(updateLength);
    resizeObserver.observe(svg);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(svg);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useAnimationFrame((time) => {
    if (!isVisible || shouldReduceMotion) return;
    const length = totalLengthRef.current;
    const path = pathRef.current;
    if (length && path) {
      const pxPerMillisecond = length / duration;
      const point = path.getPointAtLength((time * pxPerMillisecond) % length);
      x.set(point.x);
      y.set(point.y);
    }
  });

  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

  return (
    <>
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full pointer-events-none"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      {!shouldReduceMotion && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            transform,
            willChange: "transform",
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};
