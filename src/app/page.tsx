"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import VehicleHero from "@/components/hero/VehicleHero";
import CategoryExplorer from "@/components/sections/CategoryExplorer";
import { FeaturedInventory } from "@/components/sections/FeaturedInventory";
import PlanYourDrive from "@/components/sections/PlanYourDrive";
import ReserveExperience from "@/components/sections/ReserveExperience";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  const stageRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  // 1. Single scroll target for the curtain reveal stage
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end start"],
  });

  // Hero lifts up (-100%) cleanly over the scroll range
  const heroY = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    ["0%", "-100%", "-100%"]
  );

  // Featured inventory background subtle scale & focus as hero lifts
  const featuredScale = useTransform(scrollYProgress, [0, 0.55], [0.95, 1]);
  const featuredOpacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0.4, 0.8, 1]);

  return (
    <main className="relative w-full bg-[#0B0B0C]">
      {/* 
        1. CURTAIN REVEAL STAGE (HERO -> FEATURED INVENTORY)
        250vh scroll area where the hero lifts upward
        and reveals Featured Inventory underneath.
      */}
      <div ref={stageRef} className="relative h-[250vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* FEATURED INVENTORY: Background Layer with subtle zoom */}
          <motion.div
            style={{ scale: featuredScale, opacity: featuredOpacity }}
            className="relative z-10 h-full w-full will-change-transform"
          >
            <FeaturedInventory />
          </motion.div>

          {/* VEHICLE HERO: Sliding curtain layer */}
          <motion.div
            style={{ y: heroY }}
            className="fixed inset-0 z-20 h-screen w-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <VehicleHero />
          </motion.div>
        </div>
      </div>

      {/* 
        2. NATURAL CINEMATIC SCROLL FLOW
        Each section has customized scroll parallax and in-view depth reveals
      */}
      <div className="relative z-30 w-full bg-background shadow-[0_-30px_60px_rgba(0,0,0,0.5)]">
        {/* Category Explorer */}
        <section id="category-explorer" className="relative w-full">
          <CategoryExplorer />
        </section>

        {/* Why Us with Parallax Layer */}
        <section id="why-us" ref={whyUsRef} className="relative w-full">
          <WhyUs />
        </section>

        {/* Plan Your Drive */}
        <section id="plan-drive" ref={planRef} className="relative w-full">
          <PlanYourDrive />
        </section>

        {/* Reserve Experience */}
        <section id="reserve" className="relative w-full">
          <ReserveExperience />
        </section>
      </div>
    </main>
  );
}