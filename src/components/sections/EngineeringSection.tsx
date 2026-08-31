"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const details = [
  { label: "ENGINE", value: "4.4L Twin-Power Turbo V8" },
  { label: "DRIVETRAIN", value: "M xDrive All-Wheel Drive" },
  { label: "CHASSIS", value: "Carbon Fiber Reinforced (CFRP)" },
  { label: "BRAKES", value: "M Compound Carbon Ceramic" },
  { label: "SUSPENSION", value: "Adaptive M Professional" },
];

export default function EngineeringSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 0.35]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#080A0D] overflow-hidden py-24 md:py-32"
    >
      {/* Background close-up image */}
      <motion.div
        style={{ scale: imageScale, opacity: imageOpacity }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <Image
          src="/images/vehicles/BMW-M8-FICarousel.jpeg"
          alt="BMW M8 engineering detail"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#080A0D]/40 to-[#080A0D]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        {/* Section marker */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-10"
        >
          ENGINEERING
        </motion.span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.08em] uppercase text-foreground leading-[1.05]">
              PRECISION
              <br />
              HAS NO
              <br />
              <span className="text-foreground-secondary">SHORTCUT.</span>
            </h2>

            <p className="mt-8 text-sm font-light text-foreground-secondary leading-relaxed max-w-md">
              Every component is the result of thousands of engineering hours.
              From the carbon-fiber roof to the adaptive suspension geometry,
              nothing is left to chance.
            </p>
          </motion.div>

          {/* Right — Technical Specs List */}
          <div className="space-y-0">
            {details.map((detail, idx) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center justify-between py-5 border-b border-[#1B222B]/60"
              >
                <div className="flex items-center gap-4">
                  {/* Technical indicator dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground-muted group-hover:text-foreground-secondary transition-colors duration-300">
                    {detail.label}
                  </span>
                </div>
                <span className="text-xs tracking-[0.1em] text-foreground-secondary group-hover:text-foreground transition-colors duration-300">
                  {detail.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 relative h-[300px] md:h-[400px] w-full overflow-hidden"
        >
          <Image
            src="/images/vehicles/Continental-GT.jpeg"
            alt="Engineering craftsmanship"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]/80" />

          {/* Technical overlay labels */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <span className="text-[9px] tracking-[0.3em] uppercase text-foreground-muted">
              MATERIAL: HANDCRAFTED LEATHER
            </span>
            <div className="w-8 h-[1px] bg-accent/30" />
            <span className="text-[9px] tracking-[0.3em] uppercase text-accent/60">
              BENTLEY CONTINENTAL GT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
