"use client";

import { ArrowUpRight, Compass, Globe } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#1B222B] bg-[#080A0D] px-6 pt-20 pb-12 text-foreground md:px-14">
      <div className="relative z-10 mx-auto max-w-7xl space-y-16">
        {/* Top Brand Grid */}
        <div className="grid grid-cols-1 gap-12 border-b border-[#1B222B]/60 pb-16 lg:grid-cols-12">
          {/* Brand Identity */}
          <div className="space-y-6 lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-foreground">
                MSYNTRA
              </span>
            </Link>

            <p className="max-w-xs text-xs font-light leading-relaxed text-foreground-secondary">
              A curated automotive experience built around exceptional machines, considered design, and the people who appreciate them.
            </p>

            {/* Micro Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-[#0D1117] px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-foreground-muted">
              <Globe className="h-3 w-3 text-accent" />
              <span>GLOBAL AUTOMOTIVE CONCIERGE</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {/* Catalog */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent">
                // VEHICLES
              </p>
              <ul className="space-y-3 font-mono text-[10px] tracking-wider text-foreground-secondary">
                <li>
                  <Link href="/catalog" className="transition hover:text-foreground">
                    FULL CATALOG
                  </Link>
                </li>
                <li>
                  <Link href="/inventory" className="transition hover:text-foreground">
                    THE COLLECTION
                  </Link>
                </li>
                <li>
                  <Link href="/trade-in" className="transition hover:text-foreground">
                    TRADE VALUATION
                  </Link>
                </li>
                <li>
                  <Link href="/financing" className="transition hover:text-foreground">
                    FINANCING
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services & Company */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent">
                // EXPERIENCE
              </p>
              <ul className="space-y-3 font-mono text-[10px] tracking-wider text-foreground-secondary">
                <li>
                  <Link href="/about" className="transition hover:text-foreground">
                    ABOUT MSYNTRA
                  </Link>
                </li>
                <li>
                  <Link href="/service" className="transition hover:text-foreground">
                    SERVICE CENTER
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-foreground">
                    PRIVATE CONCIERGE
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-foreground">
                    BOOK TEST DRIVE
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal / Social */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent">
                // CONNECT
              </p>
              <ul className="space-y-3 font-mono text-[10px] tracking-wider text-foreground-secondary">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-foreground"
                  >
                    INSTAGRAM <ArrowUpRight className="h-3 w-3 text-foreground-muted" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition hover:text-foreground"
                  >
                    YOUTUBE <ArrowUpRight className="h-3 w-3 text-foreground-muted" />
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-foreground">
                    DIRECT INQUIRIES
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="flex flex-col items-center justify-between gap-6 font-mono text-[9px] tracking-[0.2em] uppercase text-foreground-muted sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            <p>© {new Date().getFullYear()} MSYNTRA AUTOMOTIVE.</p>
            <span className="hidden sm:inline text-[#1B222B]">|</span>
            <Link href="/about" className="transition hover:text-foreground-secondary">
              PRIVACY POLICY
            </Link>
            <Link href="/about" className="transition hover:text-foreground-secondary">
              TERMS OF SERVICE
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 transition hover:text-accent"
          >
            <span>BACK TO TOP</span>
            <Compass className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}