"use client"
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealProps {
    children: React.ReactNode;
    initialX?: number;
    initialY?: number;
    duration?: number;
    delay?: number;
}

function Reveal({ 
    children, 
    initialX = 0, 
    initialY = 0, 
    delay = 0, 
    duration = 1
}: RevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.span 
            ref={ref}
            initial="hidden" 
            animate={controls}
            variants={{
                hidden: { 
                    x: initialX, 
                    y: initialY, 
                    opacity: 0 
                }, 
                visible: { 
                    opacity: 1, 
                    x: 0, 
                    y: 0 
                }
            }} 
            transition={{
                duration, 
                delay
            }}

        >
            {children}
        </motion.span>
    );
}

export default Reveal;