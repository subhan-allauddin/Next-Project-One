import { Spotlight } from "../components/ui/Spotlight";
import "./ui/HeroSection.css";
import { Button } from "../components/ui/moving-border";
import React from "react";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <div
      className="h-auto md:h-[67rem] w-full 
        rounded-md flex flex-col items-center
        justify-center relative overflow-hidden
        mx-auto py-10 md:py-0 bg-grid-white/[0.02] bg-black/[0.96]"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="p-4 relative z-10 w-full text-center top-14">
        <h1 className="mt-20 md:mt-0 text-8xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Master The Art Of Music
        </h1>
        <p className="flex space-x-8 mt-10 font-normal text-2xl md:text-lg text-neutral-300 max-w-lg mx-auto top-80 para">
          Dive into our comprehensive music courses and transform your musical
          journey today. Whether you&apos;re a beginner or looking to refine
          your skills, join us to unlock your true potential.
        </p>
        <div className="mt-4">
          <Link href="/courses">
            <Button>Explore Courses</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
