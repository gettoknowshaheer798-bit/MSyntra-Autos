"use client";

import { dealership } from "@/data/dealership";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const SERVICES = [
  {
    id: "maintenance",
    number: "01",
    title: "SCHEDULED MAINTENANCE",
    description:
      "Factory-trained technicians perform multi-point inspections, fluid changes, brake service, and tire rotations to keep your vehicle performing at its peak.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "detailing",
    number: "02",
    title: "PREMIUM DETAILING",
    description:
      "Hand wash, clay bar treatment, paint correction, ceramic coating, and interior deep cleaning performed by certified detailing specialists.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    id: "performance",
    number: "03",
    title: "PERFORMANCE UPGRADES",
    description:
      "ECU tuning, exhaust systems, suspension upgrades, and aerodynamic enhancements — all engineered and installed by performance specialists.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    id: "inspection",
    number: "04",
    title: "PRE-PURCHASE INSPECTION",
    description:
      "Comprehensive 150+ point inspection covering engine, transmission, electronics, chassis integrity, and cosmetic condition before you buy.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
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
    id: "concierge",
    number: "05",
    title: "CONCIERGE PICKUP & DELIVERY",
    description:
      "We pick up your vehicle, complete the service, and deliver it back to your door — anywhere within our service radius. No interruptions to your day.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    id: "warranty",
    number: "06",
    title: "EXTENDED WARRANTY",
    description:
      "Comprehensive coverage plans that protect your investment against unexpected mechanical and electrical failures — peace of mind, guaranteed.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const GUARANTEES = [
  {
    value: "100%",
    label: "OEM CERTIFIED PARTS",
  },
  {
    value: "30-DAY",
    label: "SERVICE WARRANTY",
  },
  {
    value: "FREE",
    label: "LOANER VEHICLE",
  },
  {
    value: "24H",
    label: "TURNAROUND TARGET",
  },
];

export default function ServicePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero */}
      <section ref={heroRef} className="relative flex min-h-[55vh] flex-col justify-center overflow-hidden px-6 md:px-16">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 h-[125%] -top-[10%] will-change-transform">
          <Image
            src="/images/vehicles/BMW-M8-Gran-Coupe.png"
            alt="Service center"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070708] via-[#070708]/80 to-[#070708]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-[#070708]/50" />
        </motion.div>

        <motion.div style={{ y: heroTextY }} className="relative z-10 mx-auto max-w-7xl w-full pt-28">
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
            01 / SERVICE CENTER
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl">
            ELITE SERVICE.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-400">
            Our factory-trained technicians deliver precision service and
            maintenance for every vehicle in the MSyntra collection.
          </p>
        </motion.div>
      </section>

      {/* Service Offerings */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            02 / OUR SERVICES
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            WHAT WE OFFER.
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#d4af37] hover:bg-[#0f1012]/90 shadow-xl"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-300 transition-colors group-hover:border-[#d4af37] group-hover:text-[#d4af37]">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-[#d4af37]">
                    {service.number}
                  </span>
                </div>

                <h3 className="mb-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="border-y border-zinc-800/80 px-6 py-14 md:px-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-4">
          {GUARANTEES.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                idx !== GUARANTEES.length - 1
                  ? "sm:border-r sm:border-zinc-800/80"
                  : ""
              }`}
            >
              <span className="text-3xl font-light tracking-tight text-white font-mono lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Booking Form with In-View Stagger */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            03 / BOOK SERVICE
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            SCHEDULE SERVICE.
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 backdrop-blur-xl md:p-8 shadow-2xl"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      YOUR NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      PHONE NUMBER
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      VEHICLE MAKE & MODEL
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. BMW M8 Gran Coupe"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      SERVICE TYPE
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 pr-10 text-sm font-mono text-zinc-200 outline-none focus:border-zinc-600 cursor-pointer">
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      PREFERRED DATE
                    </label>
                    <input
                      required
                      type="date"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none focus:border-zinc-600 [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      PREFERRED TIME
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 pr-10 text-sm font-mono text-zinc-200 outline-none focus:border-zinc-600 cursor-pointer">
                        <option value="morning">Morning (8 AM – 11 AM)</option>
                        <option value="afternoon">
                          Afternoon (12 PM – 3 PM)
                        </option>
                        <option value="evening">Evening (4 PM – 6 PM)</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                    ADDITIONAL NOTES
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the issue or service needed…"
                    className="w-full resize-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#cbb291] py-3.5 text-xs font-mono tracking-[0.25em] uppercase text-black font-medium transition-all hover:bg-[#b89e7c] hover:scale-105 sm:w-auto sm:px-10"
                >
                  BOOK APPOINTMENT
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20 text-2xl font-bold text-[#d4af37]">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-normal">
                  Service Booked
                </h3>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-zinc-400">
                  Your service appointment has been received. Our team will
                  confirm details within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-xs font-mono tracking-widest text-white transition hover:bg-white hover:text-black"
                >
                  BOOK ANOTHER
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-zinc-800/80 px-6 py-16 md:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-2xl font-light tracking-tight uppercase sm:text-3xl">
            NEED IMMEDIATE ASSISTANCE?
          </h2>
          <p className="mt-3 text-sm font-light text-zinc-400">
            Call our service line directly or visit our nearest location.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${dealership.contact.phone}`}
              className="rounded-lg border border-zinc-700 px-6 py-3 text-xs font-mono tracking-widest uppercase text-white transition-all hover:border-[#d4af37] hover:bg-white/5"
            >
              CALL SERVICE LINE
            </a>
            <Link
              href="/contact"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-xs font-mono tracking-widest uppercase text-white transition-all hover:border-[#d4af37] hover:bg-white/5"
            >
              CONTACT US
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
