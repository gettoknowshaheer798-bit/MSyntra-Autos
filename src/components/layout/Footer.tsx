"use client";

import { ArrowUpRight, Compass, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080809] px-6 pt-20 pb-12 text-white md:px-16 font-sans">
      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 lg:grid-cols-12">
          {/* Brand Identity */}
          <div className="space-y-6 lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
              <span className="text-xl font-medium uppercase tracking-widest text-white">
                MSYNTRA{" "}
                <span className="font-light text-neutral-500">MOTORS</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm font-light leading-relaxed text-neutral-400">
              Redefining automotive acquisition through digital-first inventory
              curation, transparent trade appraisals, and white-glove concierge
              delivery.
            </p>

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-neutral-400">
              <Globe className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>BEVERLY HILLS • AUSTIN • MIAMI</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Catalog */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#d4af37]">
                // CATALOG & INVENTORY
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
                <li>
                  <Link href="/inventory" className="transition hover:text-white">
                    Full Inventory
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className="transition hover:text-white">
                    Curated Fleet
                  </Link>
                </li>
                <li>
                  <Link href="/trade-in" className="transition hover:text-white">
                    Trade Valuation
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className="transition hover:text-white">
                    Financing Plans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services & Company */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#d4af37]">
                // SERVICES & COMPANY
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
                <li>
                  <Link href="/service" className="transition hover:text-white">
                    Service Center
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="transition hover:text-white">
                    About MSyntra
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-white">
                    Private Concierge
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-white">
                    Book Test Drive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal / Social */}
            <div className="space-y-4">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#d4af37]">
                // CONNECT
              </p>
              <ul className="space-y-2.5 font-mono text-xs text-neutral-400">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-white"
                  >
                    Instagram <ArrowUpRight className="h-3 w-3 text-neutral-600" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-white"
                  >
                    YouTube <ArrowUpRight className="h-3 w-3 text-neutral-600" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-white"
                  >
                    LinkedIn <ArrowUpRight className="h-3 w-3 text-neutral-600" />
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-white">
                    Direct Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="flex flex-col items-center justify-between gap-6 font-mono text-[11px] text-neutral-500 sm:flex-row">
          <div className="flex flex-wrap items-center gap-6">
            <p>© {new Date().getFullYear()} MSYNTRA MOTORS INC. ALL RIGHTS RESERVED.</p>
            <span className="hidden sm:inline">•</span>
            <Link href="/about" className="transition hover:text-white">
              PRIVACY POLICY
            </Link>
            <Link href="/about" className="transition hover:text-white">
              TERMS OF SERVICE
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] tracking-wider uppercase text-neutral-400 transition hover:text-[#d4af37]"
          >
            <span>Back To Top</span>
            <Compass className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}