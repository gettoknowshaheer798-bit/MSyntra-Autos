"use client";

import { dealership } from "@/data/dealership";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const VALUES = [
  {
    number: "01",
    title: "TRANSPARENCY",
    description:
      "No hidden fees, no bait-and-switch. Every transaction is built on honesty and straightforward pricing you can trust.",
  },
  {
    number: "02",
    title: "CURATION",
    description:
      "We don't stock — we curate. Each vehicle in our inventory is hand-selected and inspected to meet the MSyntra standard.",
  },
  {
    number: "03",
    title: "EXPERIENCE",
    description:
      "From first inquiry to delivery, every touchpoint is designed around you. Private viewings, concierge delivery, and beyond.",
  },
  {
    number: "04",
    title: "INNOVATION",
    description:
      "Digital-first tools like instant trade valuations and real-time financing empower you to make confident decisions.",
  },
];

const STATS = [
  { value: "500+", label: "VEHICLES DELIVERED" },
  { value: "98%", label: "CLIENT SATISFACTION" },
  { value: "3", label: "SHOWROOM LOCATIONS" },
  { value: "24/7", label: "CONCIERGE SUPPORT" },
];

const LOCATIONS = [
  {
    city: "BEVERLY HILLS",
    address: "9100 Wilshire Blvd, Beverly Hills, CA 90212",
    hours: "Mon – Sat: 9 AM – 7 PM",
  },
  {
    city: "AUSTIN",
    address: "123 Automotive Drive, Austin, TX 78701",
    hours: "Mon – Sat: 10 AM – 8 PM",
  },
  {
    city: "MIAMI",
    address: "2000 Collins Ave, Miami Beach, FL 33139",
    hours: "Mon – Sat: 10 AM – 7 PM",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero Section with Parallax Scroll */}
      <section
        ref={heroRef}
        className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      >
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0 h-[120%] -top-[10%] will-change-transform"
        >
          <Image
            src="/images/vehicles/Continental-GT.jpeg"
            alt="Luxury vehicle"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#070708]/60 to-[#070708]" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-3xl pt-20"
        >
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
            01 / ABOUT MSYNTRA
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl">
            REDEFINING
            <br />
            AUTOMOTIVE.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-zinc-400">
            MSyntra Motors was founded on a singular belief — acquiring a
            vehicle should feel as extraordinary as driving one. We blend
            digital innovation with white-glove service to deliver an
            experience that is transparent, curated, and unforgettable.
          </p>
        </motion.div>
      </section>

      {/* Mission Statement with InView Reveal */}
      <section className="border-y border-zinc-800/80 px-6 py-20 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2"
        >
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#d4af37]">
              // OUR MISSION
            </span>
            <h2 className="mt-4 text-3xl font-light tracking-tight uppercase sm:text-4xl md:text-5xl">
              BUILT ON TRUST.
              <br />
              DRIVEN BY EXCELLENCE.
            </h2>
            <div className="mt-4 h-[2px] w-12 bg-[#d4af37]/60" />
          </div>
          <p className="text-sm font-light leading-[1.8] text-zinc-400 max-w-lg">
            Every decision at MSyntra — from the vehicles we source to the
            technology we build — is guided by our commitment to
            transparency and client empowerment. We don&apos;t just sell
            cars. We architect journeys. Our multi-point inspection
            process, real-time pricing tools, and concierge delivery
            service exist so you never have to compromise.
          </p>
        </motion.div>
      </section>

      {/* Values Grid with Staggered Scroll In-View */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-8 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            02 / OUR VALUES
          </span>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#d4af37] hover:bg-[#0f1012]/90 shadow-xl"
              >
                <span className="mb-4 block text-[11px] font-mono tracking-widest text-[#d4af37]">
                  {value.number}
                </span>
                <h3 className="mb-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium group-hover:text-white">
                  {value.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-zinc-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="border-y border-zinc-800/80 px-6 py-14 md:px-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                idx !== STATS.length - 1
                  ? "sm:border-r sm:border-zinc-800/80"
                  : ""
              }`}
            >
              <span className="text-4xl font-light tracking-tight text-white font-mono lg:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Locations */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            03 / SHOWROOM LOCATIONS
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            VISIT US.
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((loc, idx) => (
              <motion.div
                key={loc.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-zinc-600"
              >
                <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-white font-medium">
                  {loc.city}
                </h3>
                <p className="mt-2 text-xs font-light text-zinc-400">
                  {loc.address}
                </p>
                <p className="mt-1 text-xs font-light text-zinc-500">
                  {loc.hours}
                </p>
                <div className="mt-4 h-[1px] w-full bg-zinc-800/60" />
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase text-[#d4af37] transition-colors hover:text-white"
                >
                  <span>GET DIRECTIONS</span>
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-3xl font-light tracking-tight uppercase sm:text-4xl">
            READY TO EXPERIENCE MSYNTRA?
          </h2>
          <p className="mt-4 max-w-lg text-sm font-light text-zinc-400">
            Schedule a private viewing, explore our inventory, or speak
            with a concierge specialist today.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="rounded-lg bg-[#cbb291] px-8 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-black font-medium transition-colors hover:bg-[#b89e7c] hover:scale-105"
            >
              VIEW INVENTORY
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-zinc-700 px-8 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-white transition-colors hover:border-white hover:bg-white/5"
            >
              CONTACT US
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
