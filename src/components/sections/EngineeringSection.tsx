"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

const details = [
  { label: "ENGINE", value: "4.4L Twin-Power Turbo V8" },
  { label: "DRIVETRAIN", value: "M xDrive All-Wheel Drive" },
  { label: "CHASSIS", value: "Carbon Fiber Reinforced (CFRP)" },
  { label: "BRAKES", value: "M Compound Carbon Ceramic" },
  { label: "SUSPENSION", value: "Adaptive M Professional" },
];

export default function EngineeringSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.to(textRef.current, { opacity: 1, duration: 1 });
      listRefs.current.forEach(el => gsap.to(el, { opacity: 1, duration: 1 }));
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin for 2x height
        pin: true,
        scrub: 1,
      }
    });

    // Initial scale down of the image to make room for text
    tl.to(imageRef.current, {
      scale: 1, // scales down from 1.1 (set in CSS)
      opacity: 0.3,
      duration: 1,
      ease: "power2.out",
    }, 0);

    // Fade in text block
    tl.fromTo(textRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      0.2
    );

    // Stagger in the technical details
    listRefs.current.forEach((el, idx) => {
      if (!el) return;
      tl.fromTo(el,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
        `-=${0.3}`
      );
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#080A0D] overflow-hidden"
    >
      {/* Pinned background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0 scale-110 will-change-transform transform-gpu"
      >
        <Image
          src="/images/vehicles/BMW-M8-FICarousel.jpeg"
          alt="BMW M8 engineering detail"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-[#080A0D]/60 to-[#080A0D]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0D] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left — Headline */}
          <div ref={textRef} className="opacity-0 will-change-transform">
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-10">
              ENGINEERING
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.08em] uppercase text-foreground leading-[1.05]">
              PRECISION
              <br />
              HAS NO
              <br />
              <span className="text-foreground-secondary">SHORTCUT.</span>
            </h2>

            <p className="mt-8 text-sm font-light text-foreground-secondary leading-relaxed max-w-md">
              Every component is the result of thousands of engineering hours.
              From the carbon-fiber roof to the adaptive suspension geometry,
              nothing is left to chance.
            </p>
          </div>

          {/* Right — Technical Specs List */}
          <div className="space-y-0 mt-12 lg:mt-0">
            <div className="w-full h-[1px] bg-accent/20 mb-4" /> {/* Technical line */}
            {details.map((detail, idx) => (
              <div
                key={detail.label}
                ref={el => { listRefs.current[idx] = el; }}
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#1B222B]/60 opacity-0 will-change-transform"
              >
                <div className="flex items-center gap-4 mb-2 sm:mb-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors duration-300" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-foreground-muted group-hover:text-foreground-secondary transition-colors duration-300">
                    {detail.label}
                  </span>
                </div>
                <span className="text-xs tracking-[0.1em] text-foreground-secondary group-hover:text-foreground transition-colors duration-300 sm:text-right">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
