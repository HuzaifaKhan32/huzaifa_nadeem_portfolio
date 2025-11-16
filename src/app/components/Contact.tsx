"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import Reveal from "./Reveal";
import { motion, useMotionValue } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;

      const { top, left } = ref.current.getBoundingClientRect();
      posX.set(e.x - left);
      posY.set(e.y - top);
    },
    [posX, posY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  return (
    <Reveal initialY={50} delay={0.5}>
      <section
        ref={ref}
        id="Contact"
        className="group w-full max-w-[calc(100%-44px)] flex mx-auto items-center flex-col px-[33px] py-[27px] relative card z-30 gap-[54px] md:gap-[34px] mb-[67px] md:mb-[42px] overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:justify-center md:w-full gap-5">
          <h2 className="font-semibold text-[22px] md:text-[38px] md:min-w-[462px] ">
            {"Want me on your team? Let's make it happen ✨"}
          </h2>
        </div>
        <div className="flex flex-col gap-5 justify-center md:items-end">
          <Link
            href={"/contact"}
            className="bg-primary flex gap-2.5 p-2.5 self-center md:self-start font-normal rounded text-lg md:text-xl/l items-center text-white"
          >
            {"Let's get in touch"}
            <Image src="/mail_icon.svg" alt="Mail Icon" width={24} height={24} />
          </Link>
        </div>
        <div className="flex gap-2 justify-center">
          <Link href={"https://github.com/HuzaifaKhan32"}>
            <FaGithub className="w-8 h-8"/>
          </Link>
          <Link href={"https://www.instagram.com/hzaifa_nadeem/"}>
            <FaInstagram className="w-8 h-8"/>
          </Link>
          <Link href={"https://www.linkedin.com/in/huzaifa-khan-916b31353/"}>
            <FaLinkedin className="w-8 h-8"/>
          </Link>
        </div>
        <small>Copyright &copy; Huzaifa Nadeem 2025</small>
        <motion.div
          className="absolute w-64 h-64 bg-gradient-radial from-purple-700/100 to-transparent blur-3xl opacity-0 group-hover:opacity-100 rounded-full -z-10 transition duration-300"
          style={{ left: posX, top: posY, transform: "translate(-50%, -50%)" }}
        ></motion.div>
      </section>
    </Reveal>
  );
}

export default Contact;
