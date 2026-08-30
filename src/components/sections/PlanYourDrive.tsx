// src/components/sections/PlanYourDrive.tsx
'use client';

import { vehicles } from '@/data/vehicles';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';

const parsePrice = (priceStr: string): number => {
  return Number(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
};

export default function PlanYourDrive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // --- Selected Inventory Vehicle State ---
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState<number>(0);
  const selectedVehicle = vehicles[selectedVehicleIndex] || vehicles[0];
  const vehiclePriceNumeric = useMemo(() => parsePrice(selectedVehicle.price), [selectedVehicle]);

  // --- Dynamic Trade-In Dropdown Options ---
  const availableYears = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.year.toString()))).sort().reverse(),
    []
  );
  const availableMakes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))).sort(),
    []
  );

  // --- Finance Calculator States ---
  const [downPayment, setDownPayment] = useState<number>(50000);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.49);

  // --- Trade-In Form States ---
  const [year, setYear] = useState<string>(availableYears[0] || '2024');
  const [make, setMake] = useState<string>(availableMakes[0] || 'Ferrari');
  const [model, setModel] = useState<string>('LaFerrari');
  const [trim, setTrim] = useState<string>('HY-KERS SUPERCAR');
  const [mileage, setMileage] = useState<string>('15,000 miles');
  const [condition, setCondition] = useState<string>('Good');

  const availableModels = useMemo(() => {
    return Array.from(
      new Set(vehicles.filter((v) => v.make === make).map((v) => v.model))
    );
  }, [make]);

  const availableTrims = useMemo(() => {
    return Array.from(
      new Set(vehicles.filter((v) => v.make === make && v.model === model).map((v) => v.trim))
    );
  }, [make, model]);

  const handleNextVehicle = () => {
    setSelectedVehicleIndex((prev) => (prev + 1) % vehicles.length);
  };

  const handlePrevVehicle = () => {
    setSelectedVehicleIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const estimatedMonthlyPayment = useMemo(() => {
    const principal = Math.max(0, vehiclePriceNumeric - downPayment);
    if (principal === 0) return 0;

    const monthlyInterest = interestRate / 100 / 12;
    if (monthlyInterest === 0) return Math.round(principal / loanTerm);

    const monthlyPayment =
      (principal *
        (monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm))) /
      (Math.pow(1 + monthlyInterest, loanTerm) - 1);

    return Math.round(monthlyPayment);
  }, [vehiclePriceNumeric, downPayment, loanTerm, interestRate]);

  const estimatedTradeValue = useMemo(() => {
    const matchedVehicle = vehicles.find((v) => v.make === make && v.model === model);
    const catalogPrice = matchedVehicle ? parsePrice(matchedVehicle.price) : 60000;

    let base = catalogPrice * 0.65;
    const age = 2026 - (parseInt(year, 10) || 2024);
    base -= age * 4000;

    const numericMileage = parseInt(mileage.replace(/[^0-9]/g, ''), 10) || 0;
    if (numericMileage > 40000) base *= 0.85;
    if (numericMileage < 20000) base *= 1.05;

    if (condition === 'Excellent') base *= 1.1;
    if (condition === 'Fair') base *= 0.85;

    return Math.max(5000, Math.round(base));
  }, [year, make, model, mileage, condition]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#070708] text-white p-6 md:p-12 lg:p-16 flex flex-col justify-between font-sans overflow-hidden"
    >
      {/* Background Hero Image with Parallax Drift */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-0 right-0 w-full lg:w-2/3 h-[600px] z-0 opacity-35 pointer-events-none will-change-transform"
      >
        <Image
          src={selectedVehicle.actionImage || selectedVehicle.heroImage}
          alt={selectedVehicle.model}
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#070708]/80 to-[#070708]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070708]/60 to-[#070708]" />
      </motion.div>

      {/* Top Header & Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-10"
      >
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono block mb-4">
            05 / TRADE & FINANCE
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight uppercase text-white">
            PLAN YOUR DRIVE.
          </h2>
          <p className="text-zinc-400 text-sm font-light mt-4 max-w-md leading-relaxed">
            Use our tools to estimate financing options for our inventory and calculate an instant trade-in value.
          </p>
        </div>

        {/* Carousel Vehicle Navigation Controls */}
        <div className="flex items-center space-x-6 mt-6 md:mt-0">
          <button
            onClick={handlePrevVehicle}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            aria-label="Previous Vehicle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span className="text-xs font-mono tracking-widest text-zinc-400">
            {String(selectedVehicleIndex + 1).padStart(2, '0')} / {String(vehicles.length).padStart(2, '0')}
          </span>

          <button
            onClick={handleNextVehicle}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
            aria-label="Next Vehicle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Main Dual Card Grid with In-View Stagger */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto">
        {/* LEFT CARD: FINANCE CALCULATOR */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0e0f12]/85 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950/60 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  FINANCE CALCULATOR
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Customize your financing and see real-time monthly payment estimates.
                </p>
              </div>
            </div>

            {/* Selected Vehicle Card with Dropdown Selection */}
            <div className="p-3.5 rounded-xl bg-[#141519]/70 border border-zinc-800/60 mb-8">
              <div className="flex items-center space-x-4">
                <div className="relative w-28 h-16 rounded-lg overflow-hidden bg-black/40 shrink-0">
                  <Image
                    src={selectedVehicle.thumbnail || selectedVehicle.heroImage}
                    alt={selectedVehicle.model}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-mono tracking-wider uppercase text-zinc-100 truncate">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.trim}
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                    {selectedVehicle.features[0] || 'High Performance Engine'}
                  </p>
                  <span className="text-xs font-mono font-medium text-white block mt-1">
                    PRICE: {selectedVehicle.price}
                  </span>
                </div>
              </div>

              {/* VEHICLE SELECTION DROPDOWN */}
              <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                <label className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase shrink-0">
                  SELECT VEHICLE:
                </label>
                <div className="relative flex-1 max-w-[220px]">
                  <select
                    value={selectedVehicleIndex}
                    onChange={(e) => setSelectedVehicleIndex(Number(e.target.value))}
                    className="w-full bg-[#1b1c22] border border-zinc-700/70 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-100 appearance-none focus:outline-none focus:border-zinc-500 cursor-pointer pr-8"
                  >
                    {vehicles.map((v, idx) => (
                      <option key={v.id} value={idx}>
                        {v.year} {v.make} {v.model} ({v.price})
                      </option>
                    ))}
                  </select>
                  <svg className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                  <span className="uppercase tracking-wider text-[11px]">DOWN PAYMENT</span>
                  <span className="text-white font-normal">${downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max={Math.max(10000, Math.floor(vehiclePriceNumeric * 0.8))}
                  step="5000"
                  value={Math.min(downPayment, vehiclePriceNumeric)}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>$5,000</span>
                  <span>${Math.floor(vehiclePriceNumeric * 0.8).toLocaleString()}</span>
                </div>
              </div>

              {/* Loan Term Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                  <span className="uppercase tracking-wider text-[11px]">LOAN TERM</span>
                  <span className="text-white font-normal">{loanTerm} MONTHS</span>
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
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>12 MONTHS</span>
                  <span>84 MONTHS</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-zinc-400 mb-2">
                  <span className="uppercase tracking-wider text-[11px]">INTEREST RATE</span>
                  <span className="text-white font-normal">{interestRate}% APR</span>
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
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>1%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Payment Output */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                ESTIMATED MONTHLY PAYMENT
              </span>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl md:text-5xl font-light font-mono text-white">
                  ${estimatedMonthlyPayment.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-zinc-400 uppercase">/MO*</span>
              </div>
            </div>

            <Link
              href="/financing"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 hover:border-[#d4af37] transition-all text-xs font-mono tracking-widest uppercase text-white flex items-center justify-center space-x-3 shrink-0"
            >
              <span>VIEW FINANCE OPTIONS</span>
              <span>→</span>
            </Link>
          </div>
          
          <p className="text-[10px] text-zinc-500 font-mono mt-3">
            *Based on vehicle MSRP of {selectedVehicle.price}. Actual payments may vary.
          </p>
        </motion.div>

        {/* RIGHT CARD: TRADE-IN VALUE */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0e0f12]/85 border border-zinc-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between shadow-2xl"
        >
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950/60 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  TRADE-IN VALUE
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Select your vehicle options to compute a real-time trade valuation.
                </p>
              </div>
            </div>

            {/* Dynamic Inventory Dropdowns */}
            <div className="space-y-3">
              {/* Year Select */}
              <div className="relative">
                <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">YEAR</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                >
                  {availableYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                  <option value="2018">2018</option>
                  <option value="2015">2015</option>
                </select>
                <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Make Select */}
              <div className="relative">
                <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">MAKE</label>
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
                  className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                >
                  {availableMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Model Select */}
              <div className="relative">
                <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">MODEL</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                >
                  {availableModels.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Trim Select */}
              <div className="relative">
                <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">TRIM</label>
                <select
                  value={trim}
                  onChange={(e) => setTrim(e.target.value)}
                  className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                >
                  {availableTrims.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">MILEAGE</label>
                  <select
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                  >
                    <option value="5,000 miles">5,000 miles</option>
                    <option value="15,000 miles">15,000 miles</option>
                    <option value="32,500 miles">32,500 miles</option>
                    <option value="50,000 miles">50,000 miles</option>
                  </select>
                  <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="relative">
                  <label className="text-[9px] font-mono tracking-wider text-zinc-400 uppercase block mb-1 pl-3">CONDITION</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-[#141519] border border-zinc-800/80 rounded-xl px-4 py-3 text-sm font-mono text-zinc-200 appearance-none focus:outline-none focus:border-zinc-600 cursor-pointer"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                  <svg className="w-4 h-4 text-zinc-400 absolute right-4 bottom-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Trade-In Estimate Output */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                ESTIMATED TRADE-IN VALUE
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-4xl md:text-5xl font-light font-mono text-white">
                  ${estimatedTradeValue.toLocaleString()}
                </span>
                <button
                  className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-xs font-mono"
                  title="Value info"
                >
                  i
                </button>
              </div>
            </div>

            <Link
              href="/trade-in"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 hover:border-[#d4af37] transition-all text-xs font-mono tracking-widest uppercase text-white flex items-center justify-center space-x-3 shrink-0"
            >
              <span>GET YOUR OFFER</span>
              <span>→</span>
            </Link>
          </div>

          <p className="text-[10px] text-zinc-500 font-mono mt-3">
            This is an estimated value. Final offer may vary after vehicle inspection.
          </p>
        </motion.div>
      </div>

      {/* Bottom Banner with Scroll Lift */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-8 p-4 md:p-5 rounded-2xl bg-[#0e0f12]/80 border border-zinc-800/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950/60 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M9 7h6m-6 4h6m-6 4h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
              GET PRE-QUALIFIED IN MINUTES
            </h4>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              Soft credit pull. No impact to your score.
            </p>
          </div>
        </div>

        <Link
          href="/financing"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-transparent border border-zinc-700/80 hover:border-white transition-colors text-xs font-mono tracking-widest uppercase text-white flex items-center justify-center space-x-3 shrink-0"
        >
          <span>GET STARTED</span>
          <span>→</span>
        </Link>
      </motion.div>
    </section>
  );
}