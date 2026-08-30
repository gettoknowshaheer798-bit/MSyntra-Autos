// src/components/sections/WhyUs.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

interface Stat {
  value: string;
  label: string;
}

const FEATURES: Feature[] = [
  {
    id: 'inspection',
    title: 'MULTI-POINT INSPECTION',
    description:
      'Every vehicle undergoes a rigorous 150+ point inspection to meet our exacting standards.',
    icon: (props) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    id: 'history',
    title: 'VERIFIED HISTORY',
    description:
      'We provide a full vehicle history report so you can buy with complete confidence and peace of mind.',
    icon: (props) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: 'pricing',
    title: 'TRANSPARENT PRICING',
    description:
      'No hidden fees. No surprises. Just honest pricing and clear value.',
    icon: (props) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
  {
    id: 'financing',
    title: 'FINANCING SOLUTIONS',
    description:
      'Flexible financing options tailored to your needs with competitive rates and fast approvals.',
    icon: (props) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 'support',
    title: 'CUSTOMER SUPPORT',
    description:
      'Our dedicated team is here for you before, during, and long after your purchase.',
    icon: (props) => (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
];

const STATS: Stat[] = [
  { value: '500+', label: 'VEHICLES SOLD' },
  { value: '98%', label: 'CUSTOMER SATISFACTION' },
  { value: '150+', label: 'POINT INSPECTION' },
  { value: '0', label: 'HIDDEN FEES' },
  { value: '24/7', label: 'SUPPORT' },
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between p-8 md:p-14 font-sans"
    >
      {/* Background Image Layer with Parallax Y & Scale */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 h-[130%] -top-[15%] will-change-transform"
      >
        <Image
          src="/images/vehicles/Continental-GT.jpeg"
          alt="Luxury sports car"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/95" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-center">
        {/* Left Column Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-8"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono block mb-6">
              04 / WHY MSYNTRA
            </span>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight uppercase leading-[0.9] text-white">
              WHY
              <br />
              MSYNTRA?
            </h2>
            <div className="w-12 h-[2px] bg-[#d4af37]/80 mt-6" />
          </div>

          <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-md">
            At MSyntra, we go beyond selling vehicles. We deliver confidence,
            transparency, and an exceptional ownership experience.
          </p>

          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-zinc-300 hover:text-white border-b border-zinc-600 hover:border-white pb-1.5 transition-all group"
            >
              <span>DISCOVER THE MSYNTRA STANDARD</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Right Column Features Cards with Staggered Scroll-In */}
        <div className="lg:col-span-7 space-y-3.5 max-w-xl lg:ml-auto w-full">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group flex items-center p-4 lg:p-5 rounded-2xl bg-[#0a0b0c]/85 border border-zinc-800/90 backdrop-blur-md hover:border-zinc-600 hover:bg-[#0f1012]/95 transition-all duration-300 shadow-xl"
            >
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 mr-5 bg-zinc-950/60 group-hover:border-[#d4af37] transition-colors">
                <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 text-zinc-300 group-hover:text-[#d4af37] transition-colors" />
              </div>

              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium mb-1 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Counter Bar with InView Stagger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pt-10 border-t border-zinc-800/80 mt-12"
      >
        {STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center text-center ${
              idx !== STATS.length - 1 ? 'md:border-r md:border-zinc-800/80' : ''
            }`}
          >
            <span className="text-4xl lg:text-5xl font-light tracking-tight text-white font-mono">
              {stat.value}
            </span>
            <span className="text-[10px] tracking-[0.25em] text-zinc-400 font-mono uppercase mt-2">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}