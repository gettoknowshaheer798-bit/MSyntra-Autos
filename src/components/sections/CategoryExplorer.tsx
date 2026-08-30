// src/components/sections/CategoryExplorer.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

interface Category {
  id: string;
  number: string;
  name: string;
  count: number;
  description: string;
  heroImage: string;
  thumbnail: string;
}

const CATEGORIES: Category[] = [
  {
    id: 'luxury',
    number: '01',
    name: 'LUXURY',
    count: 8,
    description:
      'Experience the finest in craftsmanship, comfort, and sophistication. Our luxury selection redefines prestige.',
    heroImage: '/images/vehicles/Rolls-Royce-Ghost.png',
    thumbnail: '/images/vehicles/Rolls-Royce-Ghost-Thumbnail.png',
  },
  {
    id: 'performance',
    number: '02',
    name: 'PERFORMANCE',
    count: 12,
    description:
      'Unleash raw power and race-inspired engineering designed for ultimate speed and precision handling.',
    heroImage: '/images/vehicles/LaFerrari.jpeg',
    thumbnail: '/images/vehicles/LaFerrari-Thumbnail.png',
  },
  {
    id: 'suv',
    number: '03',
    name: 'SUV',
    count: 10,
    description:
      'Command any terrain without compromising on elegance, interior space, or modern luxury features.',
    heroImage: '/images/vehicles/Continental-GT.jpeg',
    thumbnail: '/images/vehicles/Continental-GT-Thumbnail.png',
  },
  {
    id: 'truck',
    number: '04',
    name: 'TRUCK',
    count: 6,
    description:
      'Rugged capability meets modern refinement. Heavy-duty utility crafted for modern adventurers.',
    heroImage: '/images/vehicles/Tacoma.png',
    thumbnail: '/images/vehicles/TacomaThumbnail.png',
  },
  {
    id: 'electric',
    number: '05',
    name: 'ELECTRIC',
    count: 7,
    description:
      'The future of driving. Next-generation electric performance combined with zero emissions.',
    heroImage: '/images/vehicles/Nevera.png',
    thumbnail: '/images/vehicles/BMW-M8-Thumbnail.png',
  },
  {
    id: 'sedan',
    number: '06',
    name: 'SEDAN',
    count: 9,
    description:
      'The perfect balance of everyday practicality, executive comfort, and sharp design.',
    heroImage: '/images/vehicles/S-Class.jpeg',
    thumbnail: '/images/vehicles/Mercedes-SClass-Thumbnail.png',
  },
  {
    id: 'coupe',
    number: '07',
    name: 'COUPE',
    count: 5,
    description:
      'Sleek rooflines and dynamic proportions engineered for pure driving pleasure.',
    heroImage: '/images/vehicles/BMW-M8-Gran-Coupe.png',
    thumbnail: '/images/vehicles/BMW-M8-Thumbnail.png',
  },
  {
    id: 'convertible',
    number: '08',
    name: 'CONVERTIBLE',
    count: 4,
    description:
      'Open-air freedom with uncompromising performance and timeless design.',
    heroImage: '/images/vehicles/BMW-M8-FICarousel.jpeg',
    thumbnail: '/images/vehicles/BMW-M8-Thumbnail.png',
  },
];

export default function CategoryExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sidebarX = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 0.35], [0.94, 1]);
  const stageOpacity = useTransform(scrollYProgress, [0, 0.25], [0.6, 1]);

  const activeCategory = CATEGORIES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CATEGORIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CATEGORIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      <motion.section
        style={{ scale: stageScale, opacity: stageOpacity }}
        className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col lg:flex-row font-sans will-change-transform"
      >
        {/* Left Sidebar Control Panel */}
        <motion.div
          style={{ x: sidebarX }}
          className="w-full lg:w-[420px] bg-[#070708] z-20 flex flex-col justify-between p-8 lg:p-10 border-r border-zinc-900/80 shrink-0"
        >
          {/* Top Header Section */}
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono">
              03 / FIND YOUR DRIVE
            </span>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight mt-5 leading-[1.15] uppercase text-white">
              EXPLORE.
              <br />
              CHOOSE. DRIVE.
            </h2>
            <p className="text-zinc-400 text-sm mt-5 leading-relaxed font-light max-w-xs">
              Browse our collection by category and find the perfect match for your lifestyle.
            </p>
          </div>

          {/* Category List */}
          <div className="my-auto pt-8 pb-4 space-y-0.5">
            {CATEGORIES.map((cat, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full flex items-center justify-between py-3 px-1 text-left border-b border-zinc-900/60 transition-all duration-300 group ${
                    isActive ? 'text-white pl-2' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-6">
                    <span
                      className={`text-[11px] font-mono transition-colors duration-300 ${
                        isActive ? 'text-[#d4af37] border-b border-[#d4af37] pb-0.5' : 'text-zinc-600'
                      }`}
                    >
                      {cat.number}
                    </span>
                    <span
                      className={`text-xl font-light tracking-[0.15em] uppercase transition-transform ${
                        isActive ? 'text-white font-normal translate-x-1' : ''
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>

                  {isActive && (
                    <svg
                      className="w-4 h-4 text-[#d4af37]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Display Stage */}
        <div className="relative flex-1 min-h-[600px] lg:min-h-full bg-black flex flex-col justify-between p-8 md:p-12 overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={activeCategory.heroImage}
              alt={activeCategory.name}
              fill
              priority
              className="object-cover object-center transition-all duration-700 ease-in-out scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </div>

          {/* Top Header Overlay Controls */}
          <div className="relative z-10 flex justify-between items-center w-full">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-mono">
                CATEGORY // {activeCategory.name}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-zinc-700/60 bg-black/40 backdrop-blur-md flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Previous category"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full border border-zinc-700/60 bg-black/40 backdrop-blur-md flex items-center justify-center hover:border-white transition-colors"
                  aria-label="Next category"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {activeCategory.number} / {String(CATEGORIES.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Big Background Title - Positioned at Top */}
          <h1 className="absolute top-20 left-8 md:left-12 z-10 text-7xl sm:text-8xl lg:text-9xl font-light tracking-tighter text-white/15 select-none uppercase pointer-events-none leading-none -ml-1">
            {activeCategory.name}
          </h1>

          {/* Text Copy & CTA Link */}
          <div className="relative z-10 my-auto max-w-xl pt-28 space-y-4">
            <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-md">
              {activeCategory.description}
            </p>

            <Link
              href={`/inventory?category=${activeCategory.id}`}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-white border-b border-zinc-500 hover:border-white pb-1 transition-all pt-2 group"
            >
              <span>VIEW {activeCategory.name} COLLECTION</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Bottom Card Thumbnails */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-6 border-t border-white/10">
            {CATEGORIES.slice(0, 5).map((cat, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative h-20 rounded-md overflow-hidden text-left p-2.5 transition-all duration-300 group border ${
                    isSelected
                      ? 'border-[#d4af37] ring-1 ring-[#d4af37]/50 scale-[1.03]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <Image
                    src={cat.thumbnail}
                    alt={cat.name}
                    fill
                    className="object-cover z-0 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  <div className="relative z-20 h-full flex flex-col justify-end">
                    <span className="text-[11px] font-medium tracking-wider text-white uppercase block">
                      {cat.name}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-mono block">
                      {cat.count} MODELS
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
}