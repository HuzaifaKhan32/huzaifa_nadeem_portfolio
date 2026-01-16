"use client"
import React, {useState, useEffect, useCallback} from 'react'
import {FaAngleLeft, FaAngleRight} from "react-icons/fa"
import Project from './Project'
import {motion, AnimatePresence, PanInfo} from "framer-motion" 

type ProjectSliderProps = {
  projects: Array<{
    title: string;
    description: string;
    languageIcon: string[];
    links: { label: string; url: string };
    thumbnail: string;
  }>;
};

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

function ProjectSlider({projects}: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const goToPrevious = useCallback(() => {
    const isFirstSlide: boolean = currentIndex === 0
    const newIndex: number = isFirstSlide ? projects.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setDirection("left")
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_INTERVAL * 2)
  }, [currentIndex, projects.length])

  const goToNext = useCallback(() => {
    const isLastSlide : boolean = currentIndex === projects.length - 1;
    const newIndex: number = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex) 
    setDirection("right")
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_INTERVAL * 2)
  }, [currentIndex, projects.length])

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return
    setDirection(index > currentIndex ? "right" : "left")
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), AUTO_PLAY_INTERVAL * 2)
  }, [currentIndex])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return
    
    const interval = setInterval(() => {
      goToNext()
    }, AUTO_PLAY_INTERVAL)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isDragging, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [goToPrevious, goToNext])

  // Handle drag end for swipe gestures
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const swipeThreshold = 50
    
    if (info.offset.x > swipeThreshold) {
      goToPrevious()
    } else if (info.offset.x < -swipeThreshold) {
      goToNext()
    }
  }

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      scale: 0.9
    })
  }

  const progress = ((currentIndex + 1) / projects.length) * 100

  return (
    <div className="w-full max-w-[calc(100%-44px)] mx-auto relative">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <div className="relative flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="flex-shrink-0 z-20 p-2 w-8 h-8 flex items-center justify-center dark:bg-white bg-zinc-800 text-white rounded-full dark:text-zinc-800 hover:scale-110 active:scale-95 transition-all ease-in-out shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous project"
        >
          <FaAngleLeft className="text-sm" />
        </button>
        
        {/* Carousel Container */}
        <div className="overflow-hidden relative flex-1 flex justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              className="w-full flex justify-center cursor-grab active:cursor-grabbing"
            >
              <Project {...projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="flex-shrink-0 z-20 p-2 w-8 h-8 flex items-center justify-center dark:bg-white bg-zinc-800 text-white rounded-full dark:text-zinc-800 hover:scale-110 active:scale-95 transition-all ease-in-out shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next project"
        >
          <FaAngleRight className="text-sm" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500'
                : 'w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
        {currentIndex + 1} / {projects.length}
      </div>
    </div>
  )
}

export default ProjectSlider