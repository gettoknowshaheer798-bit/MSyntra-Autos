"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="relative w-full h-screen min-h-[700px] bg-[#080A0D] flex items-center justify-center overflow-hidden">
      {/* Background cinematic image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/vehicles/Rolls-Royce-Ghost(Hero).png"
          alt="Find your next automobile"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A0D] via-transparent to-[#080A0D]/80" />
      </motion.div>

      {/* Subtle blue atmospheric lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(77,163,255,0.15),transparent_60%)] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-accent block mb-6">
            READY FOR WHAT'S NEXT?
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-[0.1em] uppercase text-foreground leading-[1.1]">
            FIND YOUR NEXT
            <br />
            <span className="text-foreground-secondary">AUTOMOBILE.</span>
          </h2>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-3.5 border border-foreground/20 bg-[#0D1117]/60 backdrop-blur-md text-[10px] tracking-[0.25em] uppercase text-foreground transition-all duration-300 hover:border-accent hover:bg-accent/10"
            >
              EXPLORE THE COLLECTION
            </Link>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 border border-transparent bg-foreground text-[#080A0D] text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-foreground/90"
            >
              CONTACT MSYNTRA
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none z-20" />
    </section>
  );
}
