"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiNodedotjs, SiExpress, SiPostgresql, SiSanity } from "react-icons/si";

interface Tech {
  name: string;
  icon?: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}

interface TechCategory {
  category: string;
  techs: Tech[];
  gradient: string;
}

const techStack: TechCategory[] = [
  {
    category: "Architecture & Frontend UI",
    gradient: "from-purple-400 to-indigo-400",
    techs: [
      { name: "Next.js", icon: "/nextjs-icon.png" },
      { name: "React", icon: "/react_icon.png" },
      { name: "TypeScript", icon: "/ts_icon.png" },
      { name: "Tailwind CSS", icon: "/tailwind-icon.svg" },
      { name: "HTML5", icon: "/html_icon.png" },
      { name: "CSS3", icon: "/css_icon.png" },
    ],
  },
  {
    category: "Animations & Micro-Interactions",
    gradient: "from-indigo-400 to-blue-400",
    techs: [
      { name: "Framer Motion", icon: "/framer-motion-icon.svg" },
    ],
  },
  {
    category: "Backend & Systems Layer",
    gradient: "from-blue-400 to-cyan-400",
    techs: [
      { name: "Node.js", IconComponent: SiNodedotjs },
      { name: "Express", IconComponent: SiExpress },
      { name: "JavaScript", icon: "/js_icon.png" },
    ],
  },
  {
    category: "Databases & Content Management",
    gradient: "from-cyan-400 to-teal-400",
    techs: [
      { name: "PostgreSQL", IconComponent: SiPostgresql },
      { name: "Sanity CMS", IconComponent: SiSanity },
    ],
  },
  {
    category: "Data Applications & Scripting",
    gradient: "from-teal-400 to-green-400",
    techs: [
      { name: "Python", icon: "/python-icon.png" },
      { name: "Streamlit", icon: "/streamlit-icon.png" },
    ],
  },
];

const TechStackBento = () => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card p-6 md:p-8 border border-purple-500/20 dark:border-purple-400/20 backdrop-blur-sm relative overflow-hidden group h-full"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Tech Stack Architecture
        </h3>

        <div className="space-y-6">
          {techStack.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-3"
            >
              {/* Category Title */}
              <h4
                className={`text-xs md:text-sm font-semibold uppercase tracking-wider bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
              >
                {category.category}
              </h4>

              {/* Tech Items */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {category.techs.map((tech, techIndex) => (
                  <motion.div
                    key={techIndex}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-purple-500/20 dark:border-purple-400/10 hover:border-purple-500/40 dark:hover:border-purple-400/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    {tech.IconComponent ? (
                      <tech.IconComponent className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                    ) : tech.icon?.endsWith('.svg') ? (
                      <img
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        className={`w-5 h-5 md:w-6 md:h-6 object-contain ${
                          tech.icon.includes('framer') || tech.icon.includes('nextjs')
                            ? 'dark:invert'
                            : ''
                        }`}
                      />
                    ) : tech.icon ? (
                      <Image
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : null}
                    <span className="text-xs md:text-sm font-medium text-foreground/90">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
    </motion.div>
  );
};

export default TechStackBento;
