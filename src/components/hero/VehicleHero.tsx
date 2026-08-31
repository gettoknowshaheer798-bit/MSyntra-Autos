"use client";

import { vehicles } from "@/data/vehicles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// Use the BMW M8 Gran Coupe as the primary hero vehicle
const heroVehicle = vehicles.find((v) => v.id === "bmw-m8-gran-coupe") || vehicles[0];

export default function VehicleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load animation
  useGSAP(() => {
    if (!isLoaded) return;
    
    const tl = gsap.timeline();
    
    tl.to(bgRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.8,
      ease: "power3.out"
    })
    .to(contentRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=1.2")
    .fromTo(titleRef.current, 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    , "-=0.8");
    
  }, [isLoaded]);

  // Scroll animation
  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Parallax background down, fade out slightly
    tl.to(bgRef.current, {
      yPercent: 30,
      opacity: 0.3,
      ease: "none"
    }, 0);

    // Content moves up faster and fades out
    tl.to(contentRef.current, {
      yPercent: -40,
      opacity: 0,
      ease: "none"
    }, 0);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#080A0D] text-white select-none">
      {/* Background Vehicle Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-0 scale-105 origin-center"
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
      </div>

      {/* Subtle blue atmospheric glow behind vehicle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.03),transparent_70%)] pointer-events-none z-[1]" />

      {/* Content Layer */}
      <div ref={contentRef} className="relative z-10 flex h-full flex-col justify-between px-6 md:px-14 py-8 opacity-0">
        {/* Top Brand Badge */}
        <div className="flex items-center justify-center pt-16">
          <span className="text-[10px] tracking-[0.5em] uppercase text-foreground-secondary/60">
            MSYNTRA AUTOMOTIVE
          </span>
        </div>

        {/* Center — Main Title */}
        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-8">
          <div className="flex flex-col items-center max-w-4xl">
            {/* Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.15em] uppercase text-foreground leading-[0.95]"
            >
              THE ART
              <br />
              <span className="font-light">OF MOTION.</span>
            </h1>

            {/* Vehicle Info */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[10px] tracking-[0.3em] uppercase text-foreground-secondary/70">
              <span>{heroVehicle.make} {heroVehicle.model}</span>
              <span className="hidden sm:inline text-accent/50">—</span>
              <span className="text-accent">{heroVehicle.powerSpec}</span>
              <span className="hidden sm:inline text-accent/50">—</span>
              <span>{heroVehicle.engineSpec}</span>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
            </div>
          </div>
        </div>

        {/* Bottom — Scroll Indicator & Technical Spec */}
        <div className="flex items-end justify-between pb-2">
          {/* Scroll indicator */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-foreground-secondary/40 to-foreground-secondary/40" />
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
        </div>
      </div>

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none z-20" />
    </section>
  );
}