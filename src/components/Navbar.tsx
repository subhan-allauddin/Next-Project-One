"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import UnderlineText from "./ui/UnderlineText";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/">
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>

        <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">
              <UnderlineText>Our Courses</UnderlineText>
            </HoveredLink>
            <HoveredLink href="#">
              {" "}
              <UnderlineText>Basic Music Theory </UnderlineText>
            </HoveredLink>
            <HoveredLink href="#">
              {" "}
              <UnderlineText>Advance Composition</UnderlineText>
            </HoveredLink>
            <HoveredLink href="#">
              {" "}
              <UnderlineText>Songwriting</UnderlineText>
            </HoveredLink>
            <HoveredLink href="#">
              {" "}
              <UnderlineText>Music Production </UnderlineText>
            </HoveredLink>
          </div>
        </MenuItem>

        <Link href="/contact">
          <MenuItem setActive={setActive} active={active} item="Contact Us" />
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
