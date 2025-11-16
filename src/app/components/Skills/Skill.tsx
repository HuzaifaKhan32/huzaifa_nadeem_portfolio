"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

type Props = {
  icon: string;
  name: string;
};

function Skill({ icon, name }: Props) {
  const xDistance = useMotionValue(0);
  const yDistance = useMotionValue(0);
  const mask = useMotionTemplate`radial-gradient(100px 100px at ${xDistance}px ${yDistance}px, #000, transparent)`;
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;

    const client = ref.current.getBoundingClientRect();
    xDistance.set(e.x - client.x);
    yDistance.set(e.y - client.y);
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
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
      <img src={icon} alt={`${name} icon`} />
      <p className="text-lg">{name}</p>
    </div>
  );
}

export default Skill;
