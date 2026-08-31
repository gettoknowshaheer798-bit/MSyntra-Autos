"use client";

import { vehicles } from "@/data/vehicles";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Use the BMW M8 Gran Coupe as the primary hero vehicle
const heroVehicle = vehicles.find((v) => v.id === "bmw-m8-gran-coupe") || vehicles[0];

export default function VehicleHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#080A0D] text-white select-none">
      {/* Background Vehicle Image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={isLoaded ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroVehicle.heroImage}
          alt={`${heroVehicle.make} ${heroVehicle.model}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          onLoad={() => setIsLoaded(true)}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/30 to-[#080A0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D]/40 via-transparent to-[#080A0D]/40" />
      </motion.div>

      {/* Subtle blue atmospheric glow behind vehicle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.03),transparent_70%)] pointer-events-none z-[1]" />

      {/* Content Layer */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 md:px-14 py-8">
        {/* Top Brand Badge */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center pt-16"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-foreground-secondary/60">
                MSYNTRA AUTOMOTIVE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center — Main Title */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-8">
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center max-w-4xl"
              >
                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.15em] uppercase text-foreground leading-[0.95]"
                >
                  THE ART
                  <br />
                  <span className="font-light">OF MOTION.</span>
                </motion.h1>

                {/* Vehicle Info */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.3em] uppercase text-foreground-secondary/70"
                >
                  <span>{heroVehicle.make} {heroVehicle.model}</span>
                  <span className="hidden sm:inline text-accent/50">—</span>
                  <span className="text-accent">{heroVehicle.powerSpec}</span>
                  <span className="hidden sm:inline text-accent/50">—</span>
                  <span>{heroVehicle.engineSpec}</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                  <Link
                    href={`/catalog/${heroVehicle.id}`}
                    className="group inline-flex items-center gap-3 border border-foreground/20 px-8 py-3 text-[10px] tracking-[0.25em] uppercase text-foreground transition-all duration-500 hover:border-accent hover:bg-accent/5"
                  >
                    EXPLORE VEHICLE
                    <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href="/catalog"
                    className="inline-flex items-center gap-2 px-8 py-3 text-[10px] tracking-[0.25em] uppercase text-foreground-secondary transition-colors duration-300 hover:text-foreground"
                  >
                    VIEW COLLECTION
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom — Scroll Indicator & Technical Spec */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex items-end justify-between pb-2"
            >
              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[1px] h-8 bg-gradient-to-b from-transparent via-foreground-secondary/40 to-foreground-secondary/40"
                />
                <span className="text-[9px] tracking-[0.3em] uppercase text-foreground-muted">
                  SCROLL
                </span>
              </div>

              {/* Right specs */}
              <div className="hidden md:flex items-center gap-8 text-[10px] tracking-[0.2em] text-foreground-muted">
                <div className="text-right">
                  <div className="text-foreground-secondary/40 text-[9px]">0—100 KM/H</div>
                  <div className="text-foreground mt-0.5">3.2 SEC</div>
                </div>
                <div className="w-[1px] h-6 bg-[#1B222B]" />
                <div className="text-right">
                  <div className="text-foreground-secondary/40 text-[9px]">TOP SPEED</div>
                  <div className="text-foreground mt-0.5">305 KM/H</div>
                </div>
                <div className="w-[1px] h-6 bg-[#1B222B]" />
                <div className="text-right">
                  <div className="text-foreground-secondary/40 text-[9px]">OUTPUT</div>
                  <div className="text-accent mt-0.5">{heroVehicle.powerSpec}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none z-20" />
    </section>
  );
}