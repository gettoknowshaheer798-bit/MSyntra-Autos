"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

export default function DesignSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLParagraphElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img1InnerRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img2InnerRef = useRef<HTMLDivElement>(null);
  const textBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.to([textLeftRef.current, textRightRef.current, img1Ref.current, img2Ref.current, textBottomRef.current], { opacity: 1, duration: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%", // Pin for 2.5x height
        pin: true,
        scrub: 1,
      }
    });

    // 1. Initial State
    gsap.set(img1Ref.current, { clipPath: "inset(40% 40% 40% 40%)", opacity: 0 });
    gsap.set(img2Ref.current, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 });

    // 2. Animate Texts in
    tl.fromTo(textLeftRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      0
    );
    tl.fromTo(textRightRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      0.2
    );

    // 3. Reveal first image expanding out from center
    tl.to(img1Ref.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 2,
      ease: "power3.inOut"
    }, 0.5);

    // 3b. Parallax image 1 scale down slightly as it reveals
    tl.fromTo(img1InnerRef.current, {
      scale: 1.2
    }, {
      scale: 1,
      duration: 2,
      ease: "power3.inOut"
    }, 0.5);

    // 4. Reveal second image sliding down
    tl.to(img2Ref.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    }, 1.5);

    // 4b. Parallax image 2
    tl.fromTo(img2InnerRef.current, {
      yPercent: 10
    }, {
      yPercent: -10,
      duration: 1.5,
      ease: "none"
    }, 1.5);

    // 5. Reveal bottom text
    tl.fromTo(textBottomRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      2.0
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#080A0D] overflow-hidden py-24 md:py-32 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div ref={textLeftRef} className="opacity-0 will-change-transform">
            <span className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-6 md:mb-10">
              DESIGN
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extralight tracking-[0.08em] uppercase text-foreground leading-[1.05]">
              FORM IN
              <br />
              <span className="text-foreground-secondary">MOTION.</span>
            </h2>
          </div>
          <p
            ref={textRightRef}
            className="opacity-0 will-change-transform text-sm font-light text-foreground-secondary leading-relaxed max-w-sm mt-8 md:mt-0"
          >
            A deliberate study in proportions. Aerodynamics shaping aesthetics, where 
            every surface serves a purpose and every curve commands attention.
          </p>
        </div>

        {/* Images Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left large image */}
          <div
            ref={img1Ref}
            className="md:col-span-7 relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden will-change-transform"
          >
            <div ref={img1InnerRef} className="absolute inset-0 w-full h-full transform-gpu">
              <Image
                src="/images/vehicles/S-ClassFICarousel.jpeg"
                alt="Exterior design"
                fill
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Right smaller image stack */}
          <div className="md:col-span-5 flex flex-col gap-12 mt-12 md:mt-32">
            <div
              ref={img2Ref}
              className="relative aspect-[4/3] w-full overflow-hidden ml-auto md:-ml-12 z-10 border border-[#1B222B] will-change-transform"
            >
              <div ref={img2InnerRef} className="absolute inset-0 w-full h-[120%] -top-[10%] transform-gpu">
                <Image
                  src="/images/vehicles/GhostFICarousel.jpeg"
                  alt="Interior design"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div
              ref={textBottomRef}
              className="opacity-0 will-change-transform pl-4 md:pl-12 border-l border-accent/30"
            >
              <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-foreground mb-3">
                POST-OPULENT AESTHETICS
              </h3>
              <p className="text-xs font-light text-foreground-secondary leading-relaxed">
                The interior is stripped of unnecessary distraction, focusing entirely
                on material quality, acoustics, and the purity of the driving environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
