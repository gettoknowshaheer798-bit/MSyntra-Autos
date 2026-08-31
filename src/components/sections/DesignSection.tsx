"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const img1Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#080A0D] overflow-hidden py-24 md:py-40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-6 md:mb-10"
            >
              DESIGN
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[0.08em] uppercase text-foreground leading-[1.05]"
            >
              FORM IN
              <br />
              <span className="text-foreground-secondary">MOTION.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm font-light text-foreground-secondary leading-relaxed max-w-sm mt-8 md:mt-0"
          >
            A deliberate study in proportions. Aerodynamics shaping aesthetics, where 
            every surface serves a purpose and every curve commands attention.
          </motion.p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left large image */}
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(20% 0% 0% 0%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative aspect-[4/5] w-full overflow-hidden"
          >
            <motion.div style={{ y: img1Y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
              <Image
                src="/images/vehicles/S-ClassFICarousel.jpeg"
                alt="Exterior design"
                fill
                className="object-cover object-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              />
            </motion.div>
          </motion.div>

          {/* Right smaller image stack */}
          <div className="md:col-span-5 flex flex-col gap-12 md:mt-32">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0% 0% 20% 0%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden ml-auto md:-ml-12 z-10 border border-[#1B222B]"
            >
              <motion.div style={{ y: img2Y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/images/vehicles/GhostFICarousel.jpeg"
                  alt="Interior design"
                  fill
                  className="object-cover object-center"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pl-4 md:pl-12 border-l border-accent/30"
            >
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-foreground mb-3">
                POST-OPULENT AESTHETICS
              </h3>
              <p className="text-xs font-light text-foreground-secondary leading-relaxed">
                The interior is stripped of unnecessary distraction, focusing entirely
                on material quality, acoustics, and the purity of the driving environment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
