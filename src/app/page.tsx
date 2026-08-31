"use client";

import VehicleHero from "@/components/hero/VehicleHero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import PerformanceSection from "@/components/sections/PerformanceSection";
import EngineeringSection from "@/components/sections/EngineeringSection";
import DesignSection from "@/components/sections/DesignSection";
import CollectionSection from "@/components/sections/CollectionSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PlanYourDrive from "@/components/sections/PlanYourDrive";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <VehicleHero />
      <PhilosophySection />
      <PerformanceSection />
      <EngineeringSection />
      <DesignSection />
      <CollectionSection />
      <ExperienceSection />
      <PlanYourDrive />
      <FinalCTASection />
    </>
  );
}