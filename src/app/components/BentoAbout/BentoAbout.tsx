"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionContainer from "../Section/SectionContainer";
import SectionHeader from "../Section/SectionHeader";
import TestimonialCarousel from "./TestimonialCarousel";
import TechStackBento from "./TechStackBento";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.48, 0.15, 0.25, 0.96],
    },
  }),
};

function BentoAbout() {
  return (
    <SectionContainer id="About">
      <SectionHeader plainText="About" highlightText="Me" />

      {/* Bento Grid Container */}
      <div className="w-full max-w-[calc(100%-44px)] md:max-w-none grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">

        {/* Main About Card - Spans 2 columns on desktop */}
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="md:col-span-2 card p-6 md:p-8 border border-purple-500/20 dark:border-purple-400/20 backdrop-blur-sm relative overflow-hidden group"
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              The Full-Stack Mindset with Design-First Execution
            </h3>
            <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground/90">
              <p>
                I build high-performance web applications that connect seamless frontend experiences with stable architectures. Specializing in Next.js, TypeScript, and Tailwind CSS, I build scalable interfaces that leverage motion mechanics (Framer Motion) without sacrificing core performance metrics.
              </p>
              <p>
                My capabilities extend through the complete data layer. I design content models using Sanity CMS, architect relational databases via PostgreSQL, and construct custom server endpoints with Node.js. Whether optimizing international client platforms or engineering custom AI-integrated tools, my focus is delivering clean code that drives actual business value.
              </p>
            </div>
          </div>

          {/* Decorative grid pattern */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10">
            <div className="w-full h-full bg-[url('/tech_stack_grid_dark.svg')] bg-contain bg-no-repeat" />
          </div>
        </motion.div>

        {/* Profile Image Card - 1 column */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="card p-6 border border-purple-500/20 dark:border-purple-400/20 backdrop-blur-sm relative overflow-hidden group hidden md:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src="/about.webp"
              alt="Huzaifa Nadeem"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Tech Stack Card - Spans 2 columns */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="md:col-span-2"
        >
          <TechStackBento />
        </motion.div>

        {/* Testimonials Card - 1 column */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
          className="md:row-span-1"
        >
          <TestimonialCarousel />
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <Image
        src="/tech_stack_grid_dark.svg"
        alt="Dark Grid Background"
        width={569}
        height={373}
        className="hidden dark:md:block absolute -z-10 -left-[220px] top-[100px] opacity-30"
      />
      <Image
        src="/tech_stack_grid.svg"
        alt="Light Grid Background"
        width={569}
        height={373}
        className="dark:hidden md:block absolute -z-10 -left-[210px] top-[100px] opacity-30"
      />
    </SectionContainer>
  );
}

export default BentoAbout;
