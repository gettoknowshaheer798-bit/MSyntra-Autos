"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#080A0D] flex items-center justify-center overflow-hidden"
    >
      {/* Subtle blue ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(77,163,255,0.02),transparent_70%)] pointer-events-none" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-14 text-center"
      >
        {/* Section marker */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-10"
        >
          PHILOSOPHY
        </motion.span>

        {/* Main statement */}
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[0.08em] uppercase text-foreground leading-[1.1]">
          BUILT AROUND
          <br />
          <span className="text-foreground-secondary">THE AUTOMOBILE.</span>
        </h2>

        {/* Animated divider */}
        <div className="flex justify-center my-10">
          <motion.div
            style={{ width: lineWidth }}
            className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent max-w-[200px]"
          />
        </div>

        {/* Supporting copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-foreground-secondary text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto"
        >
          MSyntra is a curated automotive experience built around exceptional machines,
          considered design, and the people who appreciate them.
        </motion.p>
      </motion.div>
    </section>
  );
}
