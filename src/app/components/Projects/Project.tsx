"use client"
import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import {motion} from "framer-motion"

type Props = {
  thumbnail: string;
  title: string;
  description: string;
  languageIcon: string[];
  links: {
    label: string;
    url: string;
  };
};

function Project({
  thumbnail,
  title,
  languageIcon,
  links,
  description,
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const xRotation = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"])
  const yRotation = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"])

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!e.currentTarget) return;

    const target = e.currentTarget as HTMLElement;
    const clientRect = target.getBoundingClientRect();

    const xPos = (e.clientX - clientRect.left) / clientRect.width - 0.5;
    const yPos = (e.clientY - clientRect.top) / clientRect.height - 0.5;

    x.set(xPos)
    y.set(yPos)

  };

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  return (
      <motion.div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="card flex flex-col items-stretch max-w-[438.4px] w-full p-5 md:p-[18px] gap-[30px]"
      style={{
        transformStyle: "preserve-3d",
        rotateX: xRotation,
        rotateY: yRotation
      }}>
        <Image
          src={thumbnail}
          alt={`${thumbnail} icon`}
          width={392}
          height={230}
          className="object-cover h-[230px] w-full"
          style={{
            transform: "translateZ(100px)"
          }}
          loading="lazy"
        />
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-nowrap truncate">{title}</h2>
          <Link
            href={links.url}
            target="_blank"
            className="bg-[#b9b9b9] flex gap-2 rounded px-[5px] py-[3px] bg-opacity-[24%] text-[14px]"
          >
            <span className="hidden md:block text-nowrap truncate">{links.label}</span>
            <img
              src="/link_arrow_dark.svg"
              alt="Link arrow icon"
              className="hidden dark:block"
            />
            <img
              src="/link_arrow.svg"
              alt="Link arrow icon"
              className="dark:hidden"
            />
          </Link>
        </div>
        <p className="line-clamp-2 text-sm md:text-base">{description}</p>
        <div className="flex relative gap-4">
          {languageIcon.map((icon, id) => (
            <img src={icon} key={id} alt={`${icon} icon`}/>
          ))}
        </div>
      </motion.div>
  );
}

export default Project;
