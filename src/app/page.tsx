"use client";

import VehicleHero from "@/components/hero/VehicleHero";
import CollectionSection from "@/components/sections/CollectionSection";
import DesignSection from "@/components/sections/DesignSection";
import EngineeringSection from "@/components/sections/EngineeringSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import PerformanceSection from "@/components/sections/PerformanceSection";

export default function Home() {
  return (
    <>
      <VehicleHero />
      <PerformanceSection />
      <EngineeringSection />
      <DesignSection />
      <CollectionSection />
      <ExperienceSection />
      <FinalCTASection />
    </>
  );
}