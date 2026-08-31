"use client";

import { vehicles } from "@/data/vehicles";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function CollectionSection() {
  const featuredIds = ["laferrari", "bmw-m8-gran-coupe", "bentley-continental-gt", "rolls-royce-ghost"];
  const featuredVehicles = vehicles.filter(v => featuredIds.includes(v.id));

  const [activeCarId, setActiveCarId] = useState(featuredVehicles[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const activeCar = featuredVehicles.find((v) => v.id === activeCarId) || featuredVehicles[0];
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#080A0D] overflow-hidden"
    >
      {/* Background active image */}
      <motion.div
        key={activeCar.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-0"
      >
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 w-full h-full origin-top">
          <Image
            src={activeCar.heroImage}
            alt={activeCar.model}
            fill
            className="object-cover object-center opacity-40"
          />
        </motion.div>
        {/* Gradients to blend into the background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-[#080A0D]/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 pb-16 px-6 md:px-14">
        {/* Header */}
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-6">
            THE COLLECTION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-[0.1em] uppercase text-foreground">
            A CURATED SELECTION OF
            <br />
            <span className="text-foreground-secondary">EXCEPTIONAL AUTOMOBILES.</span>
          </h2>
        </div>

        {/* Vehicle Panels */}
        <div className="flex-1 flex flex-col justify-end mt-16 max-w-7xl mx-auto w-full">
          <div className="flex flex-nowrap overflow-x-auto gap-4 md:gap-8 pb-8 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {featuredVehicles.map((car, idx) => {
              const isActive = car.id === activeCarId;
              
              return (
                <button
                  key={car.id}
                  onClick={() => setActiveCarId(car.id)}
                  className={`group relative flex-shrink-0 flex flex-col text-left transition-all duration-500 overflow-hidden ${
                    isActive ? "w-[85vw] md:w-[600px] lg:w-[800px]" : "w-[60vw] md:w-[300px] lg:w-[350px] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden border border-[#1B222B]">
                    <Image
                      src={car.actionImage || car.heroImage}
                      alt={car.model}
                      fill
                      className={`object-cover transition-transform duration-700 ${isActive ? "scale-100" : "scale-105 group-hover:scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-transparent opacity-80" />
                  </div>

                  <div className={`mt-4 transition-all duration-300 ${isActive ? "pl-2" : ""}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-[10px] font-mono tracking-[0.2em] text-foreground-secondary uppercase mb-1">
                          {car.make}
                        </div>
                        <h3 className="text-lg md:text-2xl font-light tracking-wide uppercase text-foreground transition-colors group-hover:text-accent">
                          {car.model}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-sm md:text-base font-mono font-light text-foreground block">
                          {car.price}
                        </span>
                      </div>
                    </div>

                    {/* Active vehicle expanded details */}
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-4 text-[10px] font-mono tracking-[0.1em] text-foreground-muted uppercase pt-3 border-t border-[#1B222B]">
                        <span>{car.engineSpec}</span>
                        <span>•</span>
                        <span>{car.powerSpec}</span>
                      </div>
                      
                      <Link
                        href={`/catalog/${car.id}`}
                        className="mt-6 inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-accent hover:text-accent-bright transition-colors"
                      >
                        EXPLORE VEHICLE <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Full Collection CTA */}
        <div className="flex justify-center mt-12 mb-8">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-3 border border-[#1B222B] px-8 py-3.5 text-[10px] tracking-[0.25em] uppercase text-foreground-secondary transition-all duration-300 hover:border-accent hover:text-foreground"
          >
            EXPLORE FULL COLLECTION
            <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
