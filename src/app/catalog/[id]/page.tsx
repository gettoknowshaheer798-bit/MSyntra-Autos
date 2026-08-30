"use client";

import TestDriveDrawer from "@/components/hero/TestDriveDrawer";
import { vehicles } from "@/data/vehicles";
import { ArrowLeft, Calendar, Check, Compass, Gauge, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";

export default function VehicleDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const vehicle = vehicles.find((v) => v.id === id);

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);

  if (!vehicle) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-16">
        {/* Back Link */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-zinc-400 transition-colors hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>BACK TO CATALOG</span>
        </Link>

        {/* Main Details Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Vehicle Media Showcase */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80">
              <Image
                src={vehicle.heroImage}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute left-6 top-6 rounded-full bg-black/60 px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-[#d4af37] backdrop-blur-md border border-white/10">
                {vehicle.year} • {vehicle.make}
              </span>
            </div>

            {/* Color Selector */}
            {vehicle.colors && vehicle.colors.length > 0 && (
              <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block mb-3">
                  EXTERIOR FINISH: {vehicle.colors[selectedColorIndex]?.name}
                </span>
                <div className="flex items-center gap-3">
                  {vehicle.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      style={{ backgroundColor: color.hex }}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        selectedColorIndex === idx
                          ? "border-[#d4af37] scale-110 shadow-lg shadow-amber-500/20"
                          : "border-white/20 hover:border-white/60"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Secondary Action Image */}
            {vehicle.actionImage && vehicle.actionImage !== vehicle.heroImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0e0f12]">
                <Image
                  src={vehicle.actionImage}
                  alt={`${vehicle.model} Action`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>

          {/* Vehicle Specs & Action Sidebar */}
          <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono tracking-[0.25em] text-zinc-400 uppercase">
                  {vehicle.year} • {vehicle.trim}
                </div>
                <h1 className="mt-2 text-4xl font-light tracking-[0.1em] text-white uppercase sm:text-5xl">
                  {vehicle.make} {vehicle.model}
                </h1>
                <div className="mt-4 text-3xl font-mono font-light tracking-wide text-white">
                  {vehicle.price}
                </div>
              </div>

              <p className="text-xs font-light leading-relaxed text-zinc-400">
                {vehicle.description}
              </p>

              {/* Performance Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-zinc-800/80 bg-[#141519]/70 p-3.5">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Gauge className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span className="text-[10px] tracking-wider uppercase">POWERTRAIN</span>
                  </div>
                  <div className="text-xs font-mono text-white font-medium truncate">
                    {vehicle.engineSpec}
                  </div>
                </div>

                <div className="rounded-xl border border-zinc-800/80 bg-[#141519]/70 p-3.5">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono mb-1">
                    <Zap className="h-3.5 w-3.5 text-[#d4af37]" />
                    <span className="text-[10px] tracking-wider uppercase">OUTPUT</span>
                  </div>
                  <div className="text-xs font-mono text-white font-medium truncate">
                    {vehicle.powerSpec}
                  </div>
                </div>
              </div>

              {/* Specs Feature List */}
              <div className="border-t border-zinc-800/80 pt-6">
                <div className="text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-3">
                  KEY SPECIFICATIONS & FEATURES
                </div>
                <ul className="space-y-2.5">
                  {vehicle.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs font-light text-zinc-300"
                    >
                      <Check className="h-3.5 w-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-zinc-800/80">
              <button
                onClick={() => setIsTestDriveOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#cbb291] py-3.5 text-xs font-mono tracking-[0.2em] uppercase text-black font-medium transition-colors hover:bg-[#b89e7c]"
              >
                <Calendar className="h-4 w-4" />
                <span>SCHEDULE TEST DRIVE / VIEWING</span>
              </button>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 py-3.5 text-xs font-mono tracking-[0.2em] text-white uppercase backdrop-blur-sm transition-all hover:border-white hover:bg-zinc-800"
              >
                <span>INQUIRE ABOUT VEHICLE</span>
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  href="/financing"
                  className="flex items-center justify-center gap-1 rounded-xl border border-zinc-800/80 bg-[#141519] py-2.5 text-[11px] font-mono tracking-wider text-zinc-300 uppercase hover:text-white hover:border-zinc-600 transition"
                >
                  <span>CALCULATE FINANCE</span>
                </Link>
                <Link
                  href="/trade-in"
                  className="flex items-center justify-center gap-1 rounded-xl border border-zinc-800/80 bg-[#141519] py-2.5 text-[11px] font-mono tracking-wider text-zinc-300 uppercase hover:text-white hover:border-zinc-600 transition"
                >
                  <span>TRADE-IN VALUE</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Drive Drawer */}
      <TestDriveDrawer
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicle={vehicle}
      />
    </main>
  );
}