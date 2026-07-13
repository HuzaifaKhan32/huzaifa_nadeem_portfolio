"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  client: string;
  title: string;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    quote: "Huzaifa delivered exactly what we needed for our digital expansion. He took full ownership of the modern design, built a seamless responsive booking architecture, and launched our entire web presence ahead of schedule.",
    client: "Usama Khan",
    title: "Founder, Dubai-Based Travel Agency",
    tags: ["Next.js", "Framer Motion"],
  },
  {
    quote: "Excellent technical execution. He constructed our product catalog and shopping cart system with highly responsive, fluid micro-interactions that heavily upgraded our overall brand perception and customer checkout flow.",
    client: "Mohsin Noor Muhammad",
    title: "Founder, Chamra Clothing",
    tags: ["Full-Stack E-Commerce Architecture", "Tailwind CSS"],
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card h-full p-6 border border-purple-500/20 dark:border-purple-400/20 backdrop-blur-sm relative overflow-hidden group"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-lg md:text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Client Testimonials
        </h3>

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col h-full justify-between"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-purple-400/40 mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.5 10c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5S7.9 10 6.5 10zM17.5 10c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" />
                </svg>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80 italic">
                  {testimonials[current].quote}
                </p>
              </div>

              {/* Client Info */}
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonials[current].client}
                  </p>
                  <p className="text-xs md:text-sm text-foreground/60">
                    {testimonials[current].title}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {testimonials[current].tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-4 justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-purple-500 w-6"
                  : "bg-purple-500/30 hover:bg-purple-500/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCarousel;
