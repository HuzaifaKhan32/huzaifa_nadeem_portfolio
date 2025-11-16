"use client"
import React, {useState} from 'react'
import {FaAngleLeft, FaAngleRight} from "react-icons/fa"
import Project from './Project'
import {motion} from "framer-motion" 

type ProjectSliderProps = {
  projects: Array<{
    title: string;
    description: string;
    languageIcon: string[];
    links: { label: string; url: string };
    thumbnail: string;
  }>;
};


function ProjectSlider({projects}: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const goToPrevious = () => {
    const isFirstSlide: boolean = currentIndex == 0
    const newIndex: number = isFirstSlide ? projects.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setDirection("left")
  }

  const goToNext = () => {
    const isLastSlide : boolean = currentIndex == projects.length - 1;
    const newIndex: number = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex) 
    setDirection("right")
  }


  return (
    <div className="w-full max-w-[calc(100%-44px)] mx-auto">
      <div className="flex justify-center items-center">
        <button
          onClick={goToPrevious}
          className="absolute left-0 z-10 p-2 dark:bg-white bg-zinc-800 text-white rounded-full dark:text-zinc-800  active:opacity-50 transition-all ease-in-out"
        >
          <FaAngleLeft />
        </button>
        
        <div className="overflow-hidden relative">
          <div className="w-full transition-transform duration-300 ease-out">
            <motion.div 
            className='flex transition-transform ease-out duration-300'
            key={currentIndex}
            initial={{x: direction === "right" ? "100%" : "-100%"}}
            animate={{x: 0}}
            exit={{x: direction === "right" ? "-100%" : "100%"}}
            transition={{duration: 0.5}}>
              <Project {...projects[currentIndex]} />
            </motion.div>
          </div>
        </div>

        <button
          onClick={goToNext}
          className="absolute right-0 z-10 p-2 dark:bg-white bg-zinc-800 text-white rounded-full dark:text-zinc-800  active:opacity-50 transition-all ease-in-out"

        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default ProjectSlider