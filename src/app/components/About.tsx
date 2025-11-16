import React from "react";
import SectionContainer from "./Section/SectionContainer";
import SectionHeader from "./Section/SectionHeader";
import Image from "next/image";
import Reveal from "./Reveal";

function About() {
  return (
    <SectionContainer id="About">
      <SectionHeader plainText="About" highlightText="Me" />
      <div className="w-full h-full flex justify-between items-center">
        <div className="md:w-1/2 w-full mx-auto max-w-[calc(100%-44px)] md:max-w-none flex flex-col gap-3 md:gap-5 md:text-lg md:justify-start justify center">
          <Reveal initialY={-40}>
            <p className="text-center md:text-left">
              I&apos;m a passionate Frontend Developer specializing in Next.js, with
              a strong foundation in modern web technologies like HTML, CSS,
              JavaScript, and TypeScript. I also have experience with Python and
              have worked with Streamlit for building interactive applications.
            </p>
          </Reveal>
          <Reveal initialY={-25} delay={0.2}>
            <p className="text-center md:text-left">
              When I&apos;m not coding, I enjoy exploring new tech trends,
              contributing to open-source projects, and continuously learning to
              stay ahead in this fast-evolving industry.
            </p>
          </Reveal>
          <Reveal initialY={-15} delay={0.4}>
            <p className="text-center md:text-left">
              Currently, I&apos;m expanding my skills into the exciting world of
              Artificial Intelligence through the Governor Initiative for AI &amp;
              Computing (GIAIC). My goal is to bridge the gap between frontend
              development and AI, creating intelligent, user-friendly web
              applications.
            </p>
          </Reveal>
        </div>
        <div className="w-1/2 md:block hidden">
          <Reveal delay={0.2}>
            <Image
              src={"/about.webp"}
              alt="About Image"
              width={1000}
              height={1000}
            />
          </Reveal>
        </div>
      </div>
      <Image
        src="/tech_stack_grid_dark.svg"
        alt="Dark Grid Background"
        width={569}
        height={373}
        className="hidden dark:md:block absolute -z-10 -left-[220px] top-[100px]"
      />
      <Image
        src="/tech_stack_grid.svg"
        alt="Light Grid Background"
        width={569}
        height={373}
        className="dark:hidden md:block absolute -z-10 -left-[210px] top-[100px]"
      />
    </SectionContainer>
  );
}

export default About;