"use client";
import { cn } from "@/utils/cn";
import React, { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { useReducedMotion } from "framer-motion";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = "#000000",
  blur = 14,
  speed = "fast",
  waveOpacity = 0.45,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const waveColors = useMemo(
    () =>
      colors ?? [
        "#14b8a6",
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#22d3ee",
      ],
    [colors]
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Render at half-resolution and rely on CSS blur for smooth GPU compositing.
    const SCALE = 0.5;
    let w = 0;
    let h = 0;
    let nt = 0;
    let animationId = 0;
    let isVisible = true;
    const stepSpeed = speed === "fast" ? 0.002 : 0.001;
    const strokeWidth = (waveWidth || 44) * SCALE;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = canvas.width = Math.max(1, Math.floor(rect.width * SCALE));
      h = canvas.height = Math.max(1, Math.floor(rect.height * SCALE));
    };

    const drawFrame = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, w, h);

      nt += stepSpeed;
      ctx.globalAlpha = waveOpacity;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x <= w; x += 12) {
          const y = noise(x / (800 * SCALE), 0.3 * i, nt) * (100 * SCALE);
          if (x === 0) {
            ctx.moveTo(x, y + h * 0.5);
          } else {
            ctx.lineTo(x, y + h * 0.5);
          }
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      if (!isVisible || document.hidden) {
        animationId = 0;
        return;
      }
      drawFrame();
      animationId = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (shouldReduceMotion) {
        drawFrame();
        return;
      }
      if (!animationId && isVisible && !document.hidden) {
        animationId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };

    resize();
    drawFrame();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (shouldReduceMotion || !isVisible) {
        drawFrame();
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [backgroundFill, noise, shouldReduceMotion, speed, waveColors, waveOpacity, waveWidth]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-[38rem] w-full flex flex-col items-center justify-center overflow-hidden bg-black",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none scale-105"
        style={{ filter: `blur(${blur}px)` }}
      />
      <div className={cn("relative z-10 w-full", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
