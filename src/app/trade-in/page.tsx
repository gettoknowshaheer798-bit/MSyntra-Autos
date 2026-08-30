"use client";

import { vehicles } from "@/data/vehicles";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, "")) || 0;

const STEPS = [
  {
    number: "01",
    title: "ONLINE VALUATION",
    description:
      "Enter your vehicle details in our instant valuation tool to receive a real-time, market-indexed estimate in seconds.",
  },
  {
    number: "02",
    title: "CONCIERGE APPRAISAL",
    description:
      "Schedule an on-site or in-showroom 150-point physical verification conducted by certified luxury appraisers.",
  },
  {
    number: "03",
    title: "INSTANT EQUITY OR CASH",
    description:
      "Apply the maximum appraisal value directly toward your new vehicle or receive direct wire payment within 24 hours.",
  },
];

const BENEFITS = [
  {
    title: "GUARANTEED 7-DAY VALUE",
    desc: "Lock in your valuation for 7 full days with zero obligation or price deductions.",
  },
  {
    title: "TAX SAVINGS ADVANTAGE",
    desc: "Trading in reduces your sales tax liability on your next acquisition in eligible states.",
  },
  {
    title: "LOAN & LEASE PAYOFFS",
    desc: "We handle all lender communications, title transfers, and outstanding loan payoffs directly.",
  },
  {
    title: "DOORSTEP APPRAISAL & PICKUP",
    desc: "Our concierge team travels to your home or office with complimentary vehicle transport.",
  },
];

export default function TradeInPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "25%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);

  const availableYears = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.year.toString()))).sort().reverse(),
    []
  );
  const availableMakes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))).sort(),
    []
  );

  const [year, setYear] = useState<string>(availableYears[0] || "2024");
  const [make, setMake] = useState<string>(availableMakes[0] || "Ferrari");
  const [model, setModel] = useState<string>("LaFerrari");
  const [trim, setTrim] = useState<string>("HY-KERS SUPERCAR");
  const [mileage, setMileage] = useState<string>("15,000 miles");
  const [condition, setCondition] = useState<string>("Excellent");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableModels = useMemo(() => {
    return Array.from(
      new Set(vehicles.filter((v) => v.make === make).map((v) => v.model))
    );
  }, [make]);

  const availableTrims = useMemo(() => {
    return Array.from(
      new Set(
        vehicles
          .filter((v) => v.make === make && v.model === model)
          .map((v) => v.trim)
      )
    );
  }, [make, model]);

  const estimatedTradeValue = useMemo(() => {
    const matchedVehicle = vehicles.find(
      (v) => v.make === make && v.model === model
    );
    const catalogPrice = matchedVehicle ? parsePrice(matchedVehicle.price) : 75000;

    let base = catalogPrice * 0.72;
    const age = 2026 - (parseInt(year, 10) || 2024);
    base -= age * 3500;

    const numericMileage = parseInt(mileage.replace(/[^0-9]/g, ""), 10) || 0;
    if (numericMileage > 40000) base *= 0.85;
    if (numericMileage < 15000) base *= 1.08;

    if (condition === "Excellent") base *= 1.1;
    if (condition === "Good") base *= 1.0;
    if (condition === "Fair") base *= 0.88;

    return Math.max(8000, Math.round(base));
  }, [year, make, model, mileage, condition]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero Header with Parallax */}
      <section ref={heroRef} className="relative overflow-hidden px-6 pt-32 pb-16 md:px-16 min-h-[50vh] flex flex-col justify-center">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 h-[125%] -top-[10%] will-change-transform">
          <Image
            src="/images/vehicles/LaFerrari.jpeg"
            alt="Trade-in background"
            fill
            priority
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#070708]/80 to-[#070708]" />
        </motion.div>

        <motion.div style={{ y: heroTextY }} className="relative z-10 mx-auto max-w-7xl w-full">
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
            01 / TRADE-IN & APPRAISAL
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl">
            UPGRADE YOUR
            <br />
            HORIZON.
          </h1>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-zinc-400">
            Unlock the maximum market equity in your current vehicle. Simple, transparent,
            and seamlessly applied toward your next curated acquisition.
          </p>
        </motion.div>
      </section>

      {/* Interactive Valuation Tool */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Valuation Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 backdrop-blur-xl md:p-8 shadow-2xl">
              <div className="mb-8 flex items-center space-x-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-[#d4af37]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                    INSTANT TRADE-IN CALCULATOR
                  </h2>
                  <p className="text-xs font-light text-zinc-400 mt-0.5">
                    Select your vehicle configuration for dynamic market appraisal.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Year Select */}
                <div>
                  <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                    YEAR
                  </label>
                  <div className="relative">
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                    >
                      {availableYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                      <option value="2022">2022</option>
                      <option value="2020">2020</option>
                      <option value="2018">2018</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

                {/* Make Select */}
                <div>
                  <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                    MAKE
                  </label>
                  <div className="relative">
                    <select
                      value={make}
                      onChange={(e) => {
                        const newMake = e.target.value;
                        setMake(newMake);
                        const matching = vehicles.filter((v) => v.make === newMake);
                        if (matching.length > 0) {
                          setModel(matching[0].model);
                          setTrim(matching[0].trim);
                        }
                      }}
                      className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                    >
                      {availableMakes.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

                {/* Model Select */}
                <div>
                  <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                    MODEL
                  </label>
                  <div className="relative">
                    <select
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                    >
                      {availableModels.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

                {/* Trim Select */}
                <div>
                  <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                    TRIM / PACKAGE
                  </label>
                  <div className="relative">
                    <select
                      value={trim}
                      onChange={(e) => setTrim(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                    >
                      {availableTrims.length > 0 ? (
                        availableTrims.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))
                      ) : (
                        <option value="BASE">STANDARD TRIM</option>
                      )}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

                {/* Mileage & Condition */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                      CURRENT MILEAGE
                    </label>
                    <div className="relative">
                      <select
                        value={mileage}
                        onChange={(e) => setMileage(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                      >
                        <option value="5,000 miles">&lt; 5,000 miles</option>
                        <option value="15,000 miles">5,000 – 15,000 miles</option>
                        <option value="30,000 miles">15,000 – 35,000 miles</option>
                        <option value="50,000 miles">35,000+ miles</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-wider uppercase text-zinc-400">
                      OVERALL CONDITION
                    </label>
                    <div className="relative">
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600 cursor-pointer"
                      >
                        <option value="Excellent">Excellent (Flawless)</option>
                        <option value="Good">Good (Minor wear)</option>
                        <option value="Fair">Fair (Noticeable wear)</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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
              </div>

              {/* Dynamic Estimated Output */}
              <div className="mt-8 border-t border-zinc-800/80 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="block mb-1 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      ESTIMATED TRADE-IN VALUATION
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl md:text-5xl font-light font-mono text-white">
                        ${estimatedTradeValue.toLocaleString()}
                      </span>
                      <span className="text-xs font-mono text-[#d4af37] uppercase">
                        EST. VALUE*
                      </span>
                    </div>
                  </div>

                  <a
                    href="#claim-offer"
                    className="flex shrink-0 items-center space-x-2 rounded-xl bg-[#cbb291] px-6 py-3.5 text-xs font-mono tracking-widest uppercase text-black font-medium transition-all hover:bg-[#b89e7c] hover:scale-105"
                  >
                    <span>CLAIM THIS OFFER</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-3 text-[10px] font-mono text-zinc-500">
                  *Valuation indexed against current national luxury market transactions. Guaranteed for 7 days upon verification.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Appraisal Booking Form */}
          <motion.div
            id="claim-offer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 backdrop-blur-xl md:p-8 shadow-2xl">
              <div className="mb-6 flex items-center space-x-3">
                <ShieldCheck className="h-5 w-5 text-[#d4af37]" />
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  LOCK IN YOUR OFFER
                </h3>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      FULL NAME
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Alexander Vance"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      EMAIL ADDRESS
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="alex@msyntra.com"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      PHONE NUMBER
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      VIN OR LICENSE PLATE (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="1FA6P8CF5H5XXXXXX"
                      className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-2.5 text-xs font-mono text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      PREFERRED INSPECTION METHOD
                    </label>
                    <select className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-2.5 text-xs font-mono text-zinc-200 outline-none focus:border-zinc-600 cursor-pointer">
                      <option value="showroom">In-Showroom VIP Appointment</option>
                      <option value="home">Home / Office Concierge Visit</option>
                      <option value="digital">Virtual Video Walkthrough</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-3 text-xs font-mono tracking-[0.2em] uppercase text-white transition-all hover:border-[#d4af37] hover:bg-zinc-800 font-medium"
                  >
                    REQUEST APPRAISAL CERTIFICATE
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37]/20 text-2xl text-[#d4af37]">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl font-normal text-white">
                    Appraisal Initiated
                  </h4>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-xs">
                    Your valuation voucher for{" "}
                    <strong className="text-white">${estimatedTradeValue.toLocaleString()}</strong> has been reserved. A senior appraiser will contact you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 rounded-full border border-white/20 px-5 py-2 text-xs font-mono tracking-widest text-white hover:bg-white hover:text-black transition"
                  >
                    RECALCULATE
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Flow */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            02 / THE PROCESS
          </span>
          <h2 className="mb-12 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            HOW IT WORKS.
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-8 backdrop-blur-md"
              >
                <span className="mb-4 block text-2xl font-mono text-[#d4af37] font-light">
                  {step.number}
                </span>
                <h3 className="mb-2 text-sm font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  {step.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade-In Benefits Grid */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            03 / ADVANTAGES
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            WHY TRADE WITH MSYNTRA.
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, idx) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md"
              >
                <CheckCircle2 className="h-5 w-5 text-[#d4af37] mb-3" />
                <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium mb-1">
                  {b.title}
                </h4>
                <p className="text-xs font-light text-zinc-400 leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2 className="text-3xl font-light tracking-tight uppercase sm:text-4xl">
            READY TO EXPLORE REPLACEMENT MODELS?
          </h2>
          <p className="mt-4 max-w-lg text-sm font-light text-zinc-400">
            Browse our hand-curated inventory and apply your trade equity directly.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalog"
              className="rounded-lg bg-[#cbb291] px-8 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-black font-medium transition-all hover:bg-[#b89e7c] hover:scale-105"
            >
              VIEW INVENTORY
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-zinc-700 px-8 py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-white transition-colors hover:border-white hover:bg-white/5"
            >
              SPEAK WITH SPECIALIST
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
