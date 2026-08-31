"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const specs = [
  { value: "617", unit: "HP", label: "HORSEPOWER" },
  { value: "3.2", unit: "SEC", label: "0—100 KM/H" },
  { value: "305", unit: "KM/H", label: "TOP SPEED" },
  { value: "4.4L", unit: "V8", label: "TWIN-TURBO" },
];

export default function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(scrollYProgress, [0, 0.6], ["-5%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1]);
  const sectionBg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["#080A0D", "#0D1117", "#0D1117", "#080A0D"]
  );

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor: sectionBg }}
      className="relative w-full min-h-screen overflow-hidden py-24 md:py-32"
    >
      {/* Background vehicle image with parallax */}
      <motion.div
        style={{ x: imageX, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/vehicles/BMW-M8-Gran-Coupe.png"
          alt="BMW M8 Gran Coupe Performance"
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]" />
      </motion.div>

      {/* Thin horizontal blue accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-center min-h-[80vh]">
        {/* Section marker */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.5em] uppercase text-accent mb-10"
        >
          PERFORMANCE
        </motion.span>

        {/* Big numbers grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {specs.map((spec, idx) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-foreground">
                  {spec.value}
                </span>
                <span className="text-sm md:text-base font-light text-accent tracking-wider">
                  {spec.unit}
                </span>
              </div>
              <div className="mt-3 h-[1px] w-12 bg-[#1B222B]" />
              <span className="mt-3 text-[10px] tracking-[0.3em] uppercase text-foreground-muted">
                {spec.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Supporting statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 max-w-xl"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-[0.1em] uppercase text-foreground leading-tight">
            PERFORMANCE,
            <br />
            <span className="text-foreground-secondary">REFINED.</span>
          </h3>
          <p className="mt-6 text-sm font-light text-foreground-secondary leading-relaxed max-w-md">
            Every specification is the result of relentless engineering. Power
            that is felt, not just measured.
          </p>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </motion.section>
  );
}
