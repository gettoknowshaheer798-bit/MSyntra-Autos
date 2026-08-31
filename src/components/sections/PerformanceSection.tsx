"use client";

import { vehicles } from "@/data/vehicles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

const m8 = vehicles.find(v => v.id === "bmw-m8-gran-coupe");
const powerSpecValue = m8?.powerSpec.replace(/\D/g, '') || "617";
const engineSpecValue = m8?.engineSpec.split(' ')[0] || "4.4L";

const specs = [
  { value: powerSpecValue, unit: "HP", label: "HORSEPOWER" },
  { value: "3.2", unit: "SEC", label: "0—100 KM/H" },
  { value: "305", unit: "KM/H", label: "TOP SPEED" },
  { value: engineSpecValue, unit: "V8", label: "TWIN-TURBO" },
];

export default function PerformanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const specsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Basic fade in for reduced motion
      gsap.to(contentRef.current, { opacity: 1, duration: 1, ease: "power2.out" });
      specsRefs.current.forEach(el => gsap.to(el, { opacity: 1, duration: 1 }));
      return;
    }

    // Pin the container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Pin for 3x viewport height
        pin: true,
        scrub: 1,
      }
    });

    // Parallax background independent of text
    tl.to(bgRef.current, {
      scale: 1.1,
      yPercent: 10,
      ease: "none",
    }, 0);

    // Fade in the performance title
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    , 0);

    // Sequence the specs
    const specDuration = 1;
    const overlap = 0.3;
    
    specsRefs.current.forEach((el, index) => {
      if (!el) return;
      
      const isFirst = index === 0;
      const isLast = index === specsRefs.current.length - 1;
      
      // Entrance
      tl.fromTo(el,
        { opacity: 0, y: 50, scale: 0.9, clipPath: "inset(100% 0 0 0)" },
        { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", duration: specDuration, ease: "power3.out" },
        isFirst ? 0.2 : `-=${overlap}`
      );
      
      // Exit (except for the last one which stays)
      if (!isLast) {
        tl.to(el, {
          opacity: 0,
          y: -50,
          scale: 1.1,
          duration: specDuration,
          ease: "power2.in"
        }, `+=${0.5}`); // Hold for a bit before transitioning out
      }
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0D1117] select-none"
    >
      {/* Background vehicle image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform transform-gpu"
      >
        <Image
          src="/images/vehicles/BMW-M8-Gran-Coupe.png"
          alt="BMW M8 Gran Coupe Performance"
          fill
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-transparent to-[#080A0D]" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        
        {/* Section marker */}
        <div ref={contentRef} className="absolute top-32 left-14 opacity-0">
          <span className="text-[10px] tracking-[0.5em] uppercase text-accent mb-4 block">
            PERFORMANCE
          </span>
          <h3 className="text-xl sm:text-2xl font-extralight tracking-[0.1em] uppercase text-foreground leading-tight">
            PERFORMANCE,
            <br />
            <span className="text-foreground-secondary">REFINED.</span>
          </h3>
        </div>

        {/* Big numbers sequence (stacked centrally) */}
        <div className="relative w-full max-w-4xl flex items-center justify-center">
          {specs.map((spec, idx) => (
            <div
              key={spec.label}
              ref={(el) => {
                specsRefs.current[idx] = el;
              }}
              className="absolute flex flex-col items-center justify-center opacity-0 will-change-transform"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-7xl sm:text-8xl md:text-9xl font-extralight tracking-tight text-foreground drop-shadow-xl">
                  {spec.value}
                </span>
                <span className="text-2xl md:text-4xl font-light text-accent tracking-wider drop-shadow-md">
                  {spec.unit}
                </span>
              </div>
              <div className="mt-8 h-[1px] w-24 bg-[#1B222B]" />
              <span className="mt-6 text-sm tracking-[0.4em] uppercase text-foreground-muted drop-shadow-sm">
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
