"use client";

import { vehicles } from "@/data/vehicles";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const heroVehicle =
  vehicles.find((v) => v.id === "bmw-m8-gran-coupe") || vehicles[0];

/* ── spec annotations ── */
const annotations = [
  { value: "617", unit: "HP", label: "OUTPUT", x: "72%", y: "48%" },
  { value: "4.4L", unit: "V8", label: "ENGINE", x: "55%", y: "52%" },
  { value: "AWD", unit: "", label: "DRIVETRAIN", x: "38%", y: "68%" },
  { value: "3.0s", unit: "0–60", label: "ACCELERATION", x: "28%", y: "56%" },
];

export default function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const headlineL1Ref = useRef<HTMLDivElement>(null);
  const headlineL2Ref = useRef<HTMLDivElement>(null);
  const headlineL3Ref = useRef<HTMLDivElement>(null);
  const vehicleNameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const exitOverlayRef = useRef<HTMLDivElement>(null);
  const rimLightRef = useRef<HTMLDivElement>(null);
  const environmentRef = useRef<HTMLDivElement>(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  /* ── reduced motion check ── */
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  /* ── GSAP cinematic timeline ── */
  useGSAP(
    () => {
      if (!wrapperRef.current || !pinnedRef.current) return;

      /* reduced motion: show everything statically */
      if (reducedMotion) {
        gsap.set(vehicleRef.current, { opacity: 1, filter: "brightness(1)" });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(headlineL1Ref.current, { clipPath: "inset(0 0 0 0)" });
        gsap.set(headlineL2Ref.current, { clipPath: "inset(0 0 0 0)" });
        gsap.set(headlineL3Ref.current, { clipPath: "inset(0 0 0 0)" });
        gsap.set(vehicleNameRef.current, { opacity: 1 });
        gsap.set(ctaRef.current, { opacity: 1 });
        annotationsRef.current.forEach((el) =>
          gsap.set(el, { opacity: 1 })
        );
        return;
      }

      /* initial states */
      gsap.set(vehicleRef.current, {
        opacity: 0,
        scale: 1.08,
        filter: "brightness(0)",
      });
      gsap.set(overlayRef.current, { opacity: 1 });
      gsap.set(headlineL1Ref.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });
      gsap.set(headlineL2Ref.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });
      gsap.set(headlineL3Ref.current, {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });
      gsap.set(vehicleNameRef.current, { opacity: 0, y: 20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 15 });
      gsap.set(rimLightRef.current, { opacity: 0 });
      gsap.set(environmentRef.current, { opacity: 0 });
      gsap.set(exitOverlayRef.current, { opacity: 0 });
      annotationsRef.current.forEach((el) =>
        gsap.set(el, { opacity: 0, y: 15 })
      );

      const isMobile = window.innerWidth < 768;
      const pinDuration = isMobile ? "350%" : "500%";

      /* master timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${pinDuration}`,
          pin: pinnedRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleY(${self.progress})`;
            }
          },
        },
      });

      /* ─── PHASE 1: THE VAULT (0% → 5%) ─── */
      /* near-black, only brand badge visible */
      tl.to(
        brandRef.current,
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        0
      );

      /* ─── PHASE 2: SILHOUETTE (5% → 20%) ─── */
      /* Vehicle begins emerging from darkness */
      tl.to(
        vehicleRef.current,
        {
          opacity: 0.3,
          filter: "brightness(0.15)",
          duration: 1.5,
          ease: "power2.inOut",
        },
        0.5
      );
      /* rim light appears */
      tl.to(
        rimLightRef.current,
        { opacity: 0.4, duration: 1.2, ease: "power2.inOut" },
        0.8
      );

      /* ─── PHASE 3: REVEAL (20% → 35%) ─── */
      /* Vehicle brightness increases, scale settles */
      tl.to(
        vehicleRef.current,
        {
          opacity: 0.7,
          scale: 1.02,
          filter: "brightness(0.5)",
          duration: 1.5,
          ease: "power3.inOut",
        },
        2
      );
      /* Darkness overlay recedes */
      tl.to(
        overlayRef.current,
        { opacity: 0.4, duration: 1.5, ease: "power2.inOut" },
        2
      );
      /* environment subtly appears */
      tl.to(
        environmentRef.current,
        { opacity: 0.15, duration: 1.5, ease: "power2.inOut" },
        2.2
      );

      /* ─── PHASE 4: HEADLINE (35% → 50%) ─── */
      /* scroll hint fades out */
      tl.to(
        scrollHintRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        3.2
      );
      /* masked headline line-by-line reveal */
      tl.to(
        headlineL1Ref.current,
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        3.5
      );
      tl.to(
        headlineL2Ref.current,
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        4
      );
      tl.to(
        headlineL3Ref.current,
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1,
          ease: "power3.inOut",
        },
        4.5
      );

      /* ─── PHASE 5: SPECS (50% → 65%) ─── */
      /* floating annotations stagger in */
      annotationsRef.current.forEach((el, i) => {
        tl.to(
          el,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          5.5 + i * 0.4
        );
      });
      /* vehicle reaches near-full brightness */
      tl.to(
        vehicleRef.current,
        {
          filter: "brightness(0.8)",
          duration: 2,
          ease: "power2.inOut",
        },
        5.5
      );
      /* rim light intensifies */
      tl.to(
        rimLightRef.current,
        { opacity: 0.7, duration: 1.5, ease: "power2.inOut" },
        5.5
      );

      /* ─── PHASE 6: FULL REVEAL (65% → 80%) ─── */
      /* full brightness, vehicle name, CTA */
      tl.to(
        vehicleRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(1)",
          duration: 1.5,
          ease: "power3.inOut",
        },
        7.5
      );
      tl.to(
        overlayRef.current,
        { opacity: 0.15, duration: 1.5, ease: "power2.inOut" },
        7.5
      );
      tl.to(
        environmentRef.current,
        { opacity: 0.3, duration: 1.5, ease: "power2.inOut" },
        7.5
      );
      tl.to(
        vehicleNameRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        8
      );
      tl.to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        8.3
      );

      /* ─── PHASE 7: EXIT (80% → 100%) ─── */
      /* everything fades, collection bleeds through */
      tl.to(
        headlineRef.current,
        { opacity: 0, y: -40, duration: 1, ease: "power2.in" },
        9.5
      );
      annotationsRef.current.forEach((el) => {
        tl.to(
          el,
          { opacity: 0, duration: 0.6, ease: "power2.in" },
          9.5
        );
      });
      tl.to(
        vehicleNameRef.current,
        { opacity: 0, y: -20, duration: 0.8, ease: "power2.in" },
        9.8
      );
      tl.to(
        ctaRef.current,
        { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" },
        9.8
      );
      tl.to(
        vehicleRef.current,
        {
          opacity: 0,
          scale: 0.95,
          yPercent: -5,
          duration: 1.5,
          ease: "power2.inOut",
        },
        10
      );
      tl.to(
        rimLightRef.current,
        { opacity: 0, duration: 1, ease: "power2.in" },
        10
      );
      tl.to(
        brandRef.current,
        { opacity: 0, duration: 0.8, ease: "power2.in" },
        10.5
      );
      /* exit overlay fades to black for seamless transition to collection */
      tl.to(
        exitOverlayRef.current,
        { opacity: 0.9, duration: 1.5, ease: "power2.inOut" },
        10.5
      );
    },
    { scope: wrapperRef, dependencies: [reducedMotion, imageLoaded] }
  );

  return (
    <div ref={wrapperRef}>
      <div
        ref={pinnedRef}
        className="relative h-screen w-full overflow-hidden bg-[#050607] select-none"
      >
        {/* ── VEHICLE IMAGE ── */}
        <div
          ref={vehicleRef}
          className="absolute inset-0 z-[2] will-change-transform transform-gpu"
        >
          <Image
            src={heroVehicle.heroImage}
            alt={`${heroVehicle.make} ${heroVehicle.model}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* ── RIM LIGHT EFFECT ── */}
        <div
          ref={rimLightRef}
          className="absolute inset-0 z-[3] pointer-events-none opacity-0"
        >
          {/* Top edge highlight */}
          <div className="absolute top-[25%] left-[15%] right-[15%] h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(201,185,154,0.06),transparent_70%)]" />
          {/* Left rim */}
          <div className="absolute top-[20%] left-[10%] w-[2px] h-[60%] bg-gradient-to-b from-transparent via-[#C9B99A]/10 to-transparent" />
          {/* Right rim */}
          <div className="absolute top-[20%] right-[10%] w-[2px] h-[60%] bg-gradient-to-b from-transparent via-[#C9B99A]/10 to-transparent" />
        </div>

        {/* ── ENVIRONMENT ── */}
        <div
          ref={environmentRef}
          className="absolute inset-0 z-[1] pointer-events-none opacity-0"
        >
          {/* Floor reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0D0E10] via-[#0A0B0D]/60 to-transparent" />
          {/* Subtle overhead lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[30%] bg-[radial-gradient(ellipse_at_top,rgba(245,243,239,0.02),transparent_70%)]" />
        </div>

        {/* ── DARKNESS OVERLAY ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[4] bg-[#050607] pointer-events-none"
        />

        {/* ── EXIT OVERLAY (for seamless transition to Collection) ── */}
        <div
          ref={exitOverlayRef}
          className="absolute inset-0 z-[5] bg-[#080A0D] pointer-events-none opacity-0"
        />

        {/* ── CONTENT LAYER ── */}
        <div className="relative z-[10] flex h-full w-full flex-col justify-between px-6 md:px-14 py-10">
          {/* Top — Brand */}
          <div className="flex justify-center pt-14">
            <span
              ref={brandRef}
              className="text-[10px] tracking-[0.6em] uppercase text-foreground/40 opacity-0"
            >
              MSYNTRA AUTOMOTIVE
            </span>
          </div>

          {/* Center — Headline */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div ref={headlineRef} className="max-w-5xl">
              <div
                ref={headlineL1Ref}
                className="overflow-hidden will-change-transform"
              >
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extralight tracking-[0.12em] uppercase text-foreground leading-[1.05]">
                  ENGINEERED
                </h1>
              </div>
              <div
                ref={headlineL2Ref}
                className="overflow-hidden will-change-transform"
              >
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-extralight tracking-[0.12em] uppercase text-foreground leading-[1.05]">
                  TO BE
                </h1>
              </div>
              <div
                ref={headlineL3Ref}
                className="overflow-hidden will-change-transform"
              >
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[7rem] font-light tracking-[0.12em] uppercase text-foreground-secondary leading-[1.05]">
                  REMEMBERED.
                </h1>
              </div>
            </div>

            {/* Vehicle name */}
            <div
              ref={vehicleNameRef}
              className="mt-12 opacity-0 will-change-transform"
            >
              <span className="text-[10px] tracking-[0.5em] uppercase text-foreground-secondary/80">
                {heroVehicle.make} {heroVehicle.model}
              </span>
            </div>

            {/* CTA */}
            <div
              ref={ctaRef}
              className="mt-8 opacity-0 will-change-transform"
            >
              <Link
                href="/catalog"
                className="group inline-flex items-center gap-3 border border-foreground/15 px-10 py-3.5 text-[10px] tracking-[0.3em] uppercase text-foreground transition-all duration-500 hover:border-accent hover:bg-accent/5"
              >
                Explore Collection
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom — Scroll hint */}
          <div
            ref={scrollHintRef}
            className="flex flex-col items-center gap-2 pb-4"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-foreground/20 animate-pulse" />
            <span className="text-[8px] tracking-[0.4em] uppercase text-foreground-muted/60">
              SCROLL TO ENTER
            </span>
          </div>
        </div>

        {/* ── FLOATING SPEC ANNOTATIONS ── */}
        <div className="absolute inset-0 z-[8] pointer-events-none hidden md:block">
          {annotations.map((ann, i) => (
            <div
              key={ann.label}
              ref={(el) => {
                annotationsRef.current[i] = el;
              }}
              className="absolute opacity-0 will-change-transform"
              style={{ left: ann.x, top: ann.y }}
            >
              <div className="flex items-center gap-3">
                {/* connecting line */}
                <div className="w-12 h-[1px] bg-gradient-to-r from-accent/40 to-transparent" />
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-light text-foreground tracking-wide">
                      {ann.value}
                    </span>
                    {ann.unit && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-accent">
                        {ann.unit}
                      </span>
                    )}
                  </div>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-foreground-muted block mt-1">
                    {ann.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SCROLL PROGRESS INDICATOR ── */}
        <div className="absolute top-[20%] right-6 md:right-10 z-[11] h-[60%] w-[1px] bg-foreground/5">
          <div
            ref={progressRef}
            className="w-full bg-accent/40 origin-top"
            style={{ transform: "scaleY(0)", height: "100%" }}
          />
        </div>

        {/* ── GRAIN ── */}
        <div className="grain absolute inset-0 pointer-events-none z-[12]" />
      </div>
    </div>
  );
}
