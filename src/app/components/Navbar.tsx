"use client";
import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import Reveal from "./Reveal"

function Navbar() {
  const [activeState, setActiveState] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const section = ["Home", "About", "Skills", "Projects", "Contact"];

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

  
  
  return (
    <div className="fixed top-12 right-6 flex mx-auto flex-col gap-2.5 items-end z-50 md:left-1/2 md:right-auto md:-translate-x-1/2">
      <button
        className="bg-background md:hidden p-3 card-shadow"
        onClick={() => setIsOpen((preval) => !preval)}
      >
        <img
          className="hidden dark:block"
          src={"/menu_icon_dark.svg"}
          alt="menu_icon_dark"
        />
        <img
          className="block dark:hidden"
          src={"/menu_icon_light.svg"}
          alt="menu_icon_light"
        />
      </button>
      <Reveal initialY={-20} duration={0.5}>
        <nav
          className={cn(
            "bg-background rounded p-1 duration-300 ease-in-out md:block card-shadow",
            {
              "opacity-100": isOpen,
              "opacity-0 md:opacity-100": !isOpen,
            }
          )}
        >
          <ul className="flex flex-col md:flex-row gap-4 font-normal text-lg items-center">
            {section.map((items, index) => {
              return (
                <li key={index}>
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
                </li>
              );
            })}
          </ul>
        </nav>
      </Reveal>
    </div>
  );
}

export default Navbar;
