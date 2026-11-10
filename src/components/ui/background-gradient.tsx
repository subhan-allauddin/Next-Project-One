import { cn } from "@/utils/cn";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("relative p-[1.5px] group", containerClassName)}>
      {/* Soft ambient outer glow on hover — GPU-composited opacity transition */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute -inset-0.5 rounded-[24px] z-[1] opacity-25 group-hover:opacity-75 blur-lg transition-opacity duration-500 will-change-[opacity]",
          animate && "group-hover:duration-300",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      {/* Crisp 1.5px gradient border */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-[22px] z-[1] opacity-70 group-hover:opacity-100 transition-opacity duration-300",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
