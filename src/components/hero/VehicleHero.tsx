"use client";

import { vehicles } from "@/data/vehicles";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const customImage = "";
const customTitle = "";
const customDescription = "";

export default function VehicleHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const vehicle = vehicles[activeIndex];
  const hasVideo = Boolean(vehicle?.videoUrl && vehicle.videoUrl.trim() !== "");

  const activeImage = customImage || vehicle?.heroImage;
  const activeTitle = customTitle || (vehicle ? `THE ${vehicle.model}` : "");
  const activeDescription = customDescription || vehicle?.description;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % vehicles.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  // 6-second automatic slideshow timer
  useEffect(() => {
    if (isVideoOpen) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex, isVideoOpen]);

  if (!vehicle) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B0B0C] text-white select-none">
      {/* 1. Dynamic Responsive Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Mobile Image */}
          {!customImage && vehicle.mobileHeroImage ? (
            <div className="relative h-full w-full md:hidden">
              <Image
                src={vehicle.mobileHeroImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          ) : null}

          {/* Main Hero Image */}
          <div
            className={`relative h-full w-full ${
              !customImage && vehicle.mobileHeroImage ? "hidden md:block" : "block"
            }`}
          >
            <Image
              src={activeImage}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Subtle Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* 2. Desktop Arrow Controls */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 p-3 text-white/50 transition-all hover:text-white hover:scale-110 md:block rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 p-3 text-white/50 transition-all hover:text-white hover:scale-110 md:block rounded-full bg-black/30 backdrop-blur-sm border border-white/10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* 3. Dynamic Typography & Action Button */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center max-w-3xl pt-12"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#d4af37] mb-2">
              {vehicle.year} • {vehicle.make}
            </span>

            <h1 className="mb-3 text-3xl font-light tracking-[0.2em] uppercase text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              {activeTitle}
            </h1>

            <p className="mb-6 max-w-lg text-xs font-light tracking-wide text-zinc-300 sm:text-sm">
              {activeDescription}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`/catalog/${vehicle.id}`}
                className="rounded-full bg-white px-6 py-2.5 text-[11px] font-mono tracking-[0.2em] uppercase text-black font-medium transition-all hover:bg-[#d4af37] hover:scale-105 shadow-xl"
              >
                EXPLORE MODEL
              </Link>

              <Link
                href="/inventory"
                className="rounded-full border border-white/30 bg-black/40 px-6 py-2.5 text-[11px] font-mono tracking-[0.2em] uppercase text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
              >
                VIEW FLEET
              </Link>

              {hasVideo && (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-300 backdrop-blur-sm transition hover:border-white hover:text-white"
                >
                  <Play className="h-3 w-3 fill-current text-[#d4af37]" />
                  <span>PLAY VIDEO</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Dynamic Clickable Pagination Bar */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
        {vehicles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? "w-8 bg-[#d4af37]"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* 5. Video Lightbox Modal */}
      <AnimatePresence>
        {isVideoOpen && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-12"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-md border border-white/10 bg-black">
              <iframe
                src={vehicle.videoUrl}
                title={`${vehicle.make} ${vehicle.model}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}