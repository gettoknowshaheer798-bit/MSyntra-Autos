"use client";

import { vehicles } from "@/data/vehicles";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, "")) || 0;

const PLANS = [
  {
    name: "STANDARD",
    rate: "5.49%",
    term: "Up to 60 months",
    downPayment: "10% minimum",
    features: [
      "No application fee",
      "Fixed monthly payments",
      "Early payoff available",
      "Online account management",
    ],
  },
  {
    name: "PREMIUM",
    rate: "3.99%",
    term: "Up to 72 months",
    downPayment: "15% minimum",
    highlight: true,
    features: [
      "Preferred interest rate",
      "Flexible payment dates",
      "Gap insurance included",
      "Dedicated finance advisor",
    ],
  },
  {
    name: "ELITE",
    rate: "2.49%",
    term: "Up to 84 months",
    downPayment: "20% minimum",
    features: [
      "Lowest available APR",
      "Payment deferral option",
      "Extended warranty bundled",
      "Priority approval processing",
    ],
  },
];

const FAQS = [
  {
    q: "What credit score do I need to qualify?",
    a: "We work with a range of credit profiles. Our Standard plan is available to most approved buyers, while Premium and Elite tiers are available to well-qualified borrowers with scores of 700+.",
  },
  {
    q: "Does applying affect my credit score?",
    a: "Our pre-qualification uses a soft credit pull, which does not impact your score. A full application for final approval will involve a hard inquiry.",
  },
  {
    q: "Can I combine financing with a trade-in?",
    a: "Absolutely. Your trade-in value is applied directly to reduce the principal, lowering both your monthly payment and total interest paid.",
  },
  {
    q: "How quickly can I get approved?",
    a: "Most pre-qualification decisions are instant. Full approval typically takes 1-2 business days, with Elite-tier applications receiving priority processing.",
  },
];

export default function FinancingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "-15%"]);

  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);
  const selectedVehicle = vehicles[selectedVehicleIndex];
  const vehiclePrice = useMemo(
    () => parsePrice(selectedVehicle.price),
    [selectedVehicle]
  );

  const [downPayment, setDownPayment] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.49);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyPayment = useMemo(() => {
    const principal = Math.max(0, vehiclePrice - downPayment);
    if (principal === 0) return 0;
    const r = interestRate / 100 / 12;
    if (r === 0) return Math.round(principal / loanTerm);
    return Math.round(
      (principal * (r * Math.pow(1 + r, loanTerm))) /
        (Math.pow(1 + r, loanTerm) - 1)
    );
  }, [vehiclePrice, downPayment, loanTerm, interestRate]);

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden px-6 pt-32 pb-16 md:px-16 min-h-[50vh] flex flex-col justify-center">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 z-0 h-[125%] -top-[10%] will-change-transform">
          <Image
            src="/images/vehicles/Mercedes-SClass-Thumbnail.png"
            alt="Financing background"
            fill
            priority
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-[#070708]/80 to-[#070708]" />
        </motion.div>

        <motion.div style={{ y: heroTextY }} className="relative z-10 mx-auto max-w-7xl w-full">
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
            01 / FINANCING
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl">
            FINANCE YOUR
            <br />
            DREAM.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-400">
            Transparent rates, flexible terms, and instant pre-qualification.
            Tailored financing solutions for every MSyntra vehicle.
          </p>
        </motion.div>
      </section>

      {/* Calculator */}
      <section className="px-6 pb-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 backdrop-blur-xl md:p-8 shadow-2xl"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 text-[#d4af37]">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.2}
                    d="M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  PAYMENT CALCULATOR
                </h2>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Adjust sliders to estimate your monthly payment in real time.
                </p>
              </div>
            </div>

            {/* Vehicle Selector */}
            <div className="mb-8 rounded-xl border border-zinc-800/60 bg-[#141519]/70 p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg bg-black/40">
                  <Image
                    src={selectedVehicle.thumbnail || selectedVehicle.heroImage}
                    alt={selectedVehicle.model}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-mono tracking-wider uppercase text-zinc-100">
                    {selectedVehicle.year} {selectedVehicle.make}{" "}
                    {selectedVehicle.model}
                  </h4>
                  <span className="block mt-1 text-xs font-mono font-medium text-white">
                    {selectedVehicle.price}
                  </span>
                </div>
              </div>
              <div className="mt-3 border-t border-zinc-800/60 pt-3 flex items-center justify-between gap-2">
                <label className="shrink-0 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  SELECT VEHICLE:
                </label>
                <div className="relative flex-1 max-w-[250px]">
                  <select
                    value={selectedVehicleIndex}
                    onChange={(e) =>
                      setSelectedVehicleIndex(Number(e.target.value))
                    }
                    className="w-full appearance-none rounded-lg border border-zinc-700/70 bg-[#1b1c22] px-3 py-1.5 pr-8 text-xs font-mono text-zinc-100 outline-none focus:border-zinc-500 cursor-pointer"
                  >
                    {vehicles.map((v, idx) => (
                      <option key={v.id} value={idx}>
                        {v.year} {v.make} {v.model} ({v.price})
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
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

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Down Payment */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="tracking-wider uppercase text-[11px]">
                    DOWN PAYMENT
                  </span>
                  <span className="text-white">
                    ${downPayment.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max={Math.max(10000, Math.floor(vehiclePrice * 0.8))}
                  step="5000"
                  value={Math.min(downPayment, vehiclePrice)}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>$5,000</span>
                  <span>
                    ${Math.floor(vehiclePrice * 0.8).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="tracking-wider uppercase text-[11px]">
                    LOAN TERM
                  </span>
                  <span className="text-white">{loanTerm} MONTHS</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>12 MO</span>
                  <span>84 MO</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="tracking-wider uppercase text-[11px]">
                    INTEREST RATE
                  </span>
                  <span className="text-white">{interestRate}% APR</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="mt-1 flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-zinc-800/80 pt-6 sm:flex-row sm:items-center">
              <div>
                <span className="block mb-1 text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  ESTIMATED MONTHLY PAYMENT
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-light font-mono text-white md:text-5xl">
                    ${monthlyPayment.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    /MO*
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex shrink-0 items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3.5 text-xs font-mono tracking-widest uppercase text-white transition-all hover:border-[#d4af37] hover:bg-zinc-800 hover:scale-105"
              >
                <span>APPLY NOW</span>
                <span>→</span>
              </Link>
            </div>
            <p className="mt-3 text-[10px] font-mono text-zinc-500">
              *Estimated payment based on MSRP of {selectedVehicle.price}.
              Actual terms may vary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Financing Plans with In-View Stagger */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            02 / FINANCING PLANS
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            CHOOSE YOUR PLAN.
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLANS.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 md:p-8 ${
                  plan.highlight
                    ? "border-[#d4af37]/60 bg-zinc-900/80 shadow-xl shadow-amber-900/10"
                    : "border-zinc-800/80 bg-[#0e0f12]/60 hover:border-zinc-700"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#d4af37] px-3 py-0.5 text-[10px] font-mono tracking-widest uppercase text-black font-medium">
                    MOST POPULAR
                  </span>
                )}
                <div>
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                    {plan.name}
                  </h3>
                  <div className="mt-3 text-3xl font-light font-mono text-white">
                    {plan.rate}{" "}
                    <span className="text-sm text-zinc-400">APR</span>
                  </div>
                  <div className="mt-1 text-xs font-mono text-zinc-400">
                    {plan.term}
                  </div>
                  <div className="mt-1 text-xs font-mono text-zinc-500">
                    {plan.downPayment}
                  </div>

                  <ul className="mt-6 space-y-2 border-t border-zinc-800/60 pt-4">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs font-light text-zinc-300"
                      >
                        <span className="text-[#d4af37]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className={`mt-6 flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-mono tracking-widest uppercase transition-all ${
                    plan.highlight
                      ? "bg-[#cbb291] text-black font-medium hover:bg-[#b89e7c]"
                      : "border border-zinc-700 text-white hover:border-white hover:bg-white/5"
                  }`}
                >
                  <span>GET STARTED</span>
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800/80 px-6 py-20 md:px-16">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.25em] uppercase text-zinc-500">
            03 / FAQ
          </span>
          <h2 className="mb-10 text-4xl font-light tracking-tight uppercase sm:text-5xl">
            QUESTIONS?
          </h2>

          <div className="space-y-2">
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-xl border border-zinc-800/80 bg-[#0e0f12]/60 backdrop-blur-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-zinc-900/40"
                >
                  <span className="text-sm font-light text-zinc-200 pr-4">
                    {faq.q}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180 text-[#d4af37]" : ""
                    }`}
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
                </button>
                {openFaq === idx && (
                  <div className="border-t border-zinc-800/60 px-6 py-4">
                    <p className="text-xs font-light leading-relaxed text-zinc-400">
                      {faq.a}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
