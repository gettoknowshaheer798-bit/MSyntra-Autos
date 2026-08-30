"use client";

import { vehicles } from "@/data/vehicles";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "ALL",
  "SUPERCAR",
  "LUXURY",
  "PERFORMANCE",
  "TRUCK",
  "ELECTRIC",
  "SUV",
  "SEDAN",
  "COUPE",
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "A – Z", value: "alpha" },
];

const parsePrice = (priceStr: string): number =>
  Number(priceStr.replace(/[^0-9.-]+/g, "")) || 0;

function getCategory(vehicle: (typeof vehicles)[0]): string {
  const id = vehicle.id.toLowerCase();
  const make = vehicle.make.toLowerCase();
  if (id.includes("ferrari") || id.includes("rimac")) return "SUPERCAR";
  if (id.includes("ghost") || id.includes("s-class")) return "LUXURY";
  if (id.includes("bentley") || id.includes("continental")) return "SUV";
  if (id.includes("bmw") || id.includes("m8")) return "PERFORMANCE";
  if (id.includes("tacoma")) return "TRUCK";
  if (make.includes("rimac")) return "ELECTRIC";
  return "LUXURY";
}

function InventoryContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category")?.toUpperCase() || "ALL";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    CATEGORIES.includes(initialCat) ? initialCat : "ALL"
  );
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const paramCat = searchParams.get("category")?.toUpperCase();
    if (paramCat && CATEGORIES.includes(paramCat)) {
      setActiveCategory(paramCat);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...vehicles];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.trim.toLowerCase().includes(q) ||
          v.year.toString().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "ALL") {
      result = result.filter(
        (v) =>
          getCategory(v).toUpperCase() === activeCategory ||
          v.trim.toUpperCase().includes(activeCategory)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "alpha":
        result.sort((a, b) =>
          `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`)
        );
        break;
      case "newest":
      default:
        result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [search, activeCategory, sortBy]);

  return (
    <>
      {/* Filters Bar */}
      <section className="sticky top-16 z-30 border-y border-zinc-800/80 bg-[#070708]/95 px-6 py-4 backdrop-blur-xl md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-xs flex-1">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search make, model…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-800/80 bg-[#141519] py-2 pl-9 pr-4 text-xs font-mono text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-600"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-[#d4af37] text-black font-medium"
                    : "border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-zinc-800/80 bg-[#141519] py-2 pl-3 pr-8 text-xs font-mono text-zinc-200 outline-none focus:border-zinc-600 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
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
      </section>

      {/* Results Grid with Staggered Scroll Animation */}
      <section className="px-6 py-12 md:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Results Count */}
          <div className="mb-6 text-xs font-mono tracking-wider text-zinc-500">
            {filtered.length} VEHICLE{filtered.length !== 1 ? "S" : ""} FOUND
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <p className="text-lg font-light text-zinc-400">
                No vehicles match your search.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("ALL");
                }}
                className="mt-4 text-xs font-mono tracking-widest uppercase text-[#d4af37] hover:underline"
              >
                CLEAR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((vehicle, idx) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/catalog/${vehicle.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#d4af37] hover:bg-[#0f1012]/90 shadow-2xl h-full"
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={vehicle.heroImage}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase text-zinc-300 backdrop-blur-md border border-white/10">
                        {getCategory(vehicle)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500">
                          {vehicle.year} • {vehicle.trim}
                        </div>
                        <h2 className="mt-1 text-lg font-light tracking-[0.1em] uppercase text-white group-hover:text-white transition-colors">
                          {vehicle.make} {vehicle.model}
                        </h2>
                        <div className="mt-2 text-[11px] font-mono text-zinc-400">
                          {vehicle.engineSpec} • {vehicle.powerSpec}
                        </div>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                        <span className="text-base font-light font-mono text-white">
                          {vehicle.price}
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 transition-colors group-hover:text-[#d4af37]">
                          VIEW DETAILS →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function InventoryPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero */}
      <section className="px-6 pt-32 pb-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl"
        >
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-[#d4af37]">
            01 / FULL INVENTORY
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl">
            EXPLORE INVENTORY.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-400">
            Browse our complete collection. Filter by category, search by specifications,
            and explore full technical portfolios.
          </p>
        </motion.div>
      </section>

      <Suspense fallback={<div className="text-center py-12 text-zinc-500 font-mono text-xs">LOADING INVENTORY...</div>}>
        <InventoryContent />
      </Suspense>
    </main>
  );
}
