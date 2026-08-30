// src/components/sections/ReserveExperience.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

interface ExperienceOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const experienceOptions: ExperienceOption[] = [
  {
    id: 'test-drive',
    title: 'TEST DRIVE',
    description: 'Get behind the wheel and feel the difference.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={1.2} />
        <circle cx="12" cy="12" r="3" strokeWidth={1.2} />
        <path strokeLinecap="round" strokeWidth={1.2} d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      </svg>
    ),
  },
  {
    id: 'showroom-visit',
    title: 'SHOWROOM VISIT',
    description: 'Visit our showroom and explore in person.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'private-consultation',
    title: 'PRIVATE CONSULTATION',
    description: 'One-on-one with our specialists, just for you.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'vehicle-reservation',
    title: 'VEHICLE RESERVATION',
    description: 'Reserve your dream vehicle with priority access.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth={1.2} />
        <path strokeLinecap="round" strokeWidth={1.2} d="M16 2v4M8 2v4M3 10h18" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="12" cy="14" r="1" fill="currentColor" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
        <circle cx="8" cy="17" r="1" fill="currentColor" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ReserveExperience() {
  const [selectedOption, setSelectedOption] = useState<string>('test-drive');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.15, 0.35, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#070708] text-white flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden font-sans"
    >
      {/* Background Dark Luxury Atmosphere Image with Scroll Scaling */}
      <motion.div 
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none will-change-transform"
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('/images/vehicles/Rolls-Royce-Ghost.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/80 to-[#070708]/95" />
      </motion.div>

      {/* Top Section / Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-3xl mx-auto pt-8"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-mono block mb-4">
          06 / RESERVE YOUR EXPERIENCE
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase text-white leading-tight">
          RESERVE YOUR<br />EXPERIENCE.
        </h2>
        <p className="text-zinc-400 text-sm md:text-base font-light mt-4 leading-relaxed max-w-xl mx-auto">
          From private test drives to personalized consultations, we tailor every experience around you.
        </p>
      </motion.div>

      {/* Center Grid Options with Staggered Scroll-In */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-12 max-w-7xl mx-auto w-full">
        {experienceOptions.map((option, idx) => {
          const isSelected = selectedOption === option.id;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelectedOption(option.id)}
              className={`cursor-pointer rounded-2xl p-6 md:p-8 flex flex-col items-center text-center justify-between border transition-all duration-300 backdrop-blur-md min-h-[220px] ${
                isSelected
                  ? 'bg-zinc-900/80 border-[#d4af37] shadow-xl shadow-amber-500/10 scale-[1.02]'
                  : 'bg-[#0e0f12]/50 border-zinc-800/60 hover:border-zinc-600 hover:bg-[#0e0f12]/70'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-full border flex items-center justify-center mb-6 transition-colors ${
                  isSelected
                    ? 'border-[#d4af37] text-[#d4af37] bg-amber-500/10'
                    : 'border-zinc-800 text-zinc-400 bg-black/40'
                }`}
              >
                {option.icon}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium mb-2">
                  {option.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {option.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA Button & Footer Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center pb-6"
      >
        <Link
          href={`/contact?experience=${selectedOption}`}
          className="w-full sm:w-auto px-10 py-4 bg-[#cbb291] hover:bg-[#b89e7c] text-black text-xs font-mono tracking-[0.25em] uppercase rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-4 shadow-lg shadow-amber-900/10 hover:scale-105"
        >
          <span>BOOK APPOINTMENT</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>

        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mt-8">
          FAST. PERSONAL. EXCEPTIONAL.
        </span>
      </motion.div>
    </section>
  );
}