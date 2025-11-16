import React from "react";
import projects from "@/app/data/projects.json";
import SectionContainer from "../Section/SectionContainer";
import SectionHeader from "../Section/SectionHeader";
import Project from "./Project";
import Image from "next/image";
import Reveal from "../Reveal";
import ProjectSlider from "./ProjectSlider";

function Projects() {
  return (
    <SectionContainer id="Projects">
      <div className="section-contents mx-6 md:mx-[64px] ">
        <SectionHeader plainText="😎 Some of my" highlightText="Best Works" />
        <div className="md:hidden">
          <ProjectSlider projects={projects} />
        </div>
        <div className="w-full max-w-[calc(100%-44px)] mx-auto hidden md:grid grid-col-1 justify-items-center lg:grid-cols-2 gap-10">
          {projects.map((project, id) => (
            <Reveal initialX={id % 2 === 0 ? -60 : 60} delay={0.5} key={id}>
              <Project
                title={project.title}
                links={project.links}
                languageIcon={project.languageIcon}
                description={project.description}
                thumbnail={project.thumbnail}
              />
            </Reveal>
          ))}
        </div>
      </div>
      <Image
        src={"/projects_highlight.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 md:block hidden"
      />
      <Image
        src={"/projects_highlight_mobile.svg"}
        alt="project highlight background"
        width={558}
        height={558}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 md:hidden"
      />
    </SectionContainer>
  );
}

export default Projects;
