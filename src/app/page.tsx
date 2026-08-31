"use client";

import CinematicHero from "@/components/hero/CinematicHero";
import CollectionSection from "@/components/sections/CollectionSection";
import EngineeringSection from "@/components/sections/EngineeringSection";
import DesignSection from "@/components/sections/DesignSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PlanYourDrive from "@/components/sections/PlanYourDrive";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <CollectionSection />
      <EngineeringSection />
      <DesignSection />
      <ExperienceSection />
      <PlanYourDrive />
      <FinalCTASection />
    </>
  );
}