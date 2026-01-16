"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import Reveal from "./Reveal";
import { motion } from "framer-motion"; // Import motion

// Simple useMediaQuery hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

// Animation variants for list items
const container = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const item = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

// Animation variants for the nav box itself
const navVariants = {
  open: { opacity: 1, display: "flex", transition: { duration: 0.3 } },
  closed: { opacity: 0, transition: { duration: 0.3 }, transitionEnd: { display: "none" } },
};

function Navbar() {
  const [activeState, setActiveState] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const section = ["Home", "About", "Skills", "Projects", "Contact"];
  const isMobile = useMediaQuery("(max-width: 767px)"); // Check for mobile

  useEffect(() => {
    setActiveState("Home");
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  const menuItems = section.map((items, index) => {
    const content = (
      <div
        className={cn(
          "rounded p-1 cursor-pointer duration-300 ease-in-out",
          {
            "bg-primary text-white": activeState === items,
          }
        )}
        onClick={() => {
          setActiveState(items);
          scrollToSection(items);
          setIsOpen(false);
        }}
      >
        {items}
      </div>
    );

    return isMobile ? ( // Conditionally render motion.li for mobile
      <motion.li key={index} variants={item}>
        {content}
      </motion.li>
    ) : ( // Render regular li for desktop
      <li key={index}>{content}</li>
    );
  });

  return (
    <div className="fixed top-12 right-6 flex mx-auto flex-col gap-2.5 items-end z-50 md:left-1/2 md:right-auto md:-translate-x-1/2">
      <button
        className="bg-background md:hidden p-3 card-shadow rounded-lg"
        onClick={() => setIsOpen((preval) => !preval)}
      >
        <Image
          className="hidden dark:block"
          src={"/menu_icon_dark.svg"}
          alt="menu_icon_dark"
          width={24}
          height={24}
        />
        <Image
          className="block dark:hidden"
          src={"/menu_icon_light.svg"}
          alt="menu_icon_light"
          width={24}
          height={24}
        />
      </button>
      <Reveal initialY={-20} duration={0.5}>
        {isMobile ? (
          <motion.nav
            className="bg-background rounded p-1 card-shadow" // Removed md:flex as it's not needed with framer-motion managing display
            variants={navVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.ul
              className="flex flex-col md:flex-row gap-4 font-normal text-lg items-center"
              variants={container}
              initial="closed" // Set initial to closed for proper animation start
              animate={isOpen ? "open" : "closed"}
            >
              {menuItems}
            </motion.ul>
          </motion.nav>
        ) : (
          <nav
            className="bg-background rounded p-1 card-shadow md:flex" // Regular nav for desktop, always flex
          >
            <ul className="flex flex-col md:flex-row gap-4 font-normal text-lg items-center">
              {menuItems}
            </ul>
          </nav>
        )}
      </Reveal>
    </div>
  );
}

export default Navbar;
