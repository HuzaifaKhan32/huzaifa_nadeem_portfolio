"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";

type Props = {
  icon: string;
  name: string;
};

function Skill({ icon, name }: Props) {
  const xDistance = useMotionValue(0);
  const yDistance = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(100px 100px at ${xDistance}px ${yDistance}px, #000, transparent)`;
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const client = ref.current.getBoundingClientRect();
      xDistance.set(e.x - client.x);
      yDistance.set(e.y - client.y);
    },
    [xDistance, yDistance]
  );
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  return (
    <div className="flex relative gap-2 p-2 border-primary rounded-lg border h-[46px]">
      <motion.div
        ref={ref}
        className="absolute inset-0 border-2 border-purple-500 dark:border-purple-300 rounded-lg"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      ></motion.div>
      {icon.endsWith('.svg') ? (
        <img 
          src={icon.startsWith('/') ? icon : `/${icon}`} 
          alt={`${name} icon`} 
          className={`w-[30px] h-[30px] object-contain ${icon.includes('framer') ? 'dark:invert' : ''}`}
        />
      ) : (
        <Image 
          src={icon.startsWith('/') ? icon : `/${icon}`} 
          alt={`${name} icon`} 
          width={30} 
          height={30}
          className="object-contain"
        />
      )}
      <p className="text-lg">{name}</p>
    </div>
  );
}

export default Skill;
