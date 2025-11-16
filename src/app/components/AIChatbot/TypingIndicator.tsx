import React from 'react'
import {motion} from "framer-motion"
function TypingIndicator() {
  return (
    <div className='rounded-tr-lg rounded-tl-lg rounded-br-lg bg-black border border-[#3b4dc2] text-left px-4 py-3 flex gap-2 items-center w-1/4'>
        <motion.div
        initial={{y: 3, opacity: 0.5}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.4, ease: "easeIn", repeatType: "mirror", repeat: Infinity, delay: 0.2}} 
        className='w-2 h-2 bg-white rounded-full'>
        </motion.div>
        <motion.div
        initial={{y: 3, opacity: 0.5}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.4, ease: "easeIn", repeatType: "mirror", repeat: Infinity, delay: 0.4}} 
         className='w-2 h-2 bg-white rounded-full'>
        </motion.div>
        <motion.div
        initial={{y: 3, opacity: 0.5}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.4, ease: "easeIn", repeatType: "mirror", repeat: Infinity, delay: 0.6}} 
         className='w-2 h-2 bg-white rounded-full'>
        </motion.div>
    </div>
  )
}

export default TypingIndicator