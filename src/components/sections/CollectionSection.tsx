"use client";

import { vehicles } from "@/data/vehicles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function CollectionSection() {
  const featuredIds = ["laferrari", "bmw-m8-gran-coupe", "bentley-continental-gt", "rolls-royce-ghost"];
  const featuredVehicles = vehicles.filter(v => featuredIds.includes(v.id));

  const containerRef = useRef<HTMLDivElement>(null);
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      bgRefs.current.forEach((el, idx) => {
        if (idx === 0) gsap.to(el, { opacity: 1, duration: 1 });
      });
      contentRefs.current.forEach((el, idx) => {
        if (idx === 0) gsap.to(el, { opacity: 1, duration: 1 });
      });
      return;
    }

    const totalVehicles = featuredVehicles.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalVehicles * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    // Make the first vehicle visible immediately
    gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });
    gsap.set(contentRefs.current[0], { opacity: 1, y: 0 });

    // Transition through vehicles
    for (let i = 0; i < totalVehicles - 1; i++) {
      const currentBg = bgRefs.current[i];
      const nextBg = bgRefs.current[i + 1];
      const currentContent = contentRefs.current[i];
      const nextContent = contentRefs.current[i + 1];

      // Fade out current content & background while fading in the next
      tl.to(currentContent, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.inOut"
      }, `step${i}`);

      tl.to(currentBg, {
        opacity: 0,
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut"
      }, `step${i}`);

      tl.fromTo(nextBg, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" },
        `step${i}`
      );

      tl.fromTo(nextContent,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
        `step${i}+=0.5`
      );
    }

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#080A0D] overflow-hidden"
    >
      {/* Background active images stack */}
      {featuredVehicles.map((car, idx) => (
        <div
          key={`bg-${car.id}`}
          ref={el => { bgRefs.current[idx] = el; }}
          className="absolute inset-0 z-0 opacity-0 will-change-transform transform-gpu"
        >
          <Image
            src={car.heroImage}
            alt={car.model}
            fill
            className="object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-[#080A0D]/40 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-24 pb-12 px-6 md:px-14">
        {/* Fixed Header */}
        <div className="max-w-7xl mx-auto w-full">
          <span className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-6">
            THE COLLECTION
          </span>
        </div>

        {/* Vehicle Contents Stack */}
        <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-end mb-16">
          {featuredVehicles.map((car, idx) => (
            <div
              key={`content-${car.id}`}
              ref={el => { contentRefs.current[idx] = el; }}
              className="absolute bottom-0 left-0 w-full flex flex-col md:flex-row md:items-end justify-between opacity-0 will-change-transform"
            >
              <div className="max-w-xl">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-foreground-secondary/70 block mb-4">
                  0{idx + 1} — {car.make}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide uppercase text-foreground leading-[1.1] mb-6">
                  {car.model}
                </h2>
                <div className="flex flex-wrap gap-4 text-[10px] font-mono tracking-[0.1em] text-foreground-muted uppercase">
                  <span>{car.engineSpec}</span>
                  <span>•</span>
                  <span>{car.powerSpec}</span>
                  <span>•</span>
                  <span>{car.price}</span>
                </div>
              </div>

              <div className="mt-8 md:mt-0">
                <Link
                  href={`/catalog/${car.id}`}
                  className="group inline-flex items-center gap-3 border border-foreground/20 px-8 py-4 text-[10px] tracking-[0.25em] uppercase text-foreground transition-all duration-500 hover:border-accent hover:bg-accent/5 backdrop-blur-md"
                >
                  EXPLORE VEHICLE
                  <ArrowRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Full Collection Fixed CTA */}
        <div className="flex justify-center max-w-7xl mx-auto w-full">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-foreground-secondary transition-all duration-300 hover:text-foreground"
          >
            EXPLORE FULL COLLECTION
            <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
