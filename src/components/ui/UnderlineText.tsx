import React from "react";

interface UnderlineTextProps {
  children: React.ReactNode;
  className?: string;
}

const UnderlineText: React.FC<UnderlineTextProps> = ({ children, className }) => (
  <span
    className={`relative transition-all
      before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px]
      before:w-0 before:bg-current before:transition-all before:duration-300
      hover:before:w-full ${className || ""}`}
  >
    {children}
  </span>
);

export default UnderlineText;