"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") == "dark" ||
          window.matchMedia("prefer-color-scheme: dark").matches
      : true
  );
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
    if (typeof window != "undefined") {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    if (savedTheme){
        setIsDarkMode(savedTheme == "dark")
    }else{
        const preferDarkMode = window.matchMedia("prefer-color-scheme: dark").matches
        setIsDarkMode(preferDarkMode)
    }
  }, [])

  const toggle = (() => {
    setIsDarkMode((prevVal) => !prevVal)
  })
  return (
    <button onClick={toggle} className="fixed top-[56px] md:top-16 md:left-auto left-6 md:right-[42px] w-9 h-[18px] bg-[#1a1a1a] dark:bg-[#efefef] rounded-lg flex items-center justify-end dark:justify-start px-1 z-50">
      {isDarkMode ? (
        <Image src={"/sun_icon.svg"} alt="sun icon" height={14} width={14} />
      ) : (
        <Image src={"/moon_icon.svg"} alt="sun icon" height={14} width={14} />
      )}
    </button>
  );
}

export default ThemeToggle;
