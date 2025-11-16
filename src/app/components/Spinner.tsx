"use client"
import React from 'react'
import {motion} from "framer-motion"

const Spinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop"
      }}
    />
  );

export default Spinner