"use client";

import { vehicles } from "@/data/vehicles";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function CatalogPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-16">
        {/* Header with entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start"
        >
          <span className="text-xs font-mono tracking-[0.3em] text-[#d4af37] uppercase">
            01 / CURATED FLEET
          </span>
          <h1 className="mt-2 text-4xl font-light tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
            FULL CATALOG
          </h1>
          <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-zinc-400">
            Explore our complete collection of high-performance supercars, luxury sedans, and bespoke vehicles.
          </p>
        </motion.div>

        {/* Grid Display with Staggered Scroll Reveals */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (idx % 3) * 0.1,
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
                  <span className="absolute left-4 top-4 rounded-full bg-black/60 px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase text-[#d4af37] backdrop-blur-md border border-white/10">
                    {vehicle.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
                      {vehicle.make} • {vehicle.trim}
                    </div>
                    <h2 className="mt-1 text-xl font-light tracking-[0.1em] text-white uppercase group-hover:text-white transition-colors">
                      {vehicle.model}
                    </h2>
                    <p className="mt-2 text-xs font-light text-zinc-400 line-clamp-2">
                      {vehicle.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                    <span className="text-base font-mono font-light text-white">
                      {vehicle.price}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-400 group-hover:text-[#d4af37] transition-colors">
                      DETAILS →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}