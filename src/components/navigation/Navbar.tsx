"use client";

import { dealership } from "@/data/dealership";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface NavbarProps {
  currentModelName?: string;
}

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "INVENTORY", href: "/inventory" },
  { name: "CATALOG", href: "/catalog" },
  { name: "TRADE-IN", href: "/trade-in" },
  { name: "FINANCING", href: "/financing" },
  { name: "SERVICE", href: "/service" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar({ currentModelName }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scrolling when menu drawer is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menu automatically on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <nav className="relative z-[110] flex w-full items-center justify-between px-6 py-5 sm:px-10 md:px-14">
        {/* 1. Brand Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="z-[110] flex items-center gap-3 group cursor-pointer"
          aria-label="MSyntra Home"
        >
          <svg
            viewBox="0 0 100 115"
            className="h-7 w-7 fill-white transition-opacity group-hover:opacity-80 sm:h-8 sm:w-8"
            aria-label="Brand Logo"
          >
            <path d="M50 0 L100 20 V65 C100 90 70 108 50 115 C30 108 0 90 0 65 V20 Z M50 12 L15 28 V63 C15 82 38 97 50 102 C62 97 85 82 85 63 V28 Z M35 40 L65 40 L35 75 L65 75" />
          </svg>
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-white font-semibold hidden sm:inline-block">
            MSYNTRA
          </span>
        </Link>

        {/* 2. Fixed Center Title / Model Name */}
        <div className="absolute left-1/2 top-1/2 z-[110] max-w-[50%] -translate-x-1/2 -translate-y-1/2 truncate text-center pointer-events-none">
          <span className="font-mono text-[10px] sm:text-xs font-light tracking-[0.35em] uppercase text-white/80">
            {currentModelName || "MOTORS"}
          </span>
        </div>

        {/* 3. Quick Action & Hamburger Button */}
        <div className="flex items-center gap-4 z-[110]">
          <Link
            href="/inventory"
            onClick={() => setIsMenuOpen(false)}
            className="hidden md:inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-mono tracking-widest uppercase text-zinc-300 transition hover:border-[#d4af37] hover:text-white"
          >
            INVENTORY
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="p-2 text-white transition-opacity hover:opacity-70 focus:outline-none flex items-center gap-2 cursor-pointer rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
          >
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-300 hidden sm:inline">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            {isMenuOpen ? (
              <X className="h-5 w-5 stroke-[1.5] text-[#d4af37]" />
            ) : (
              <svg
                viewBox="0 0 36 18"
                className="h-3.5 w-7 fill-none stroke-current stroke-[1.5]"
              >
                <line x1="0" y1="2" x2="36" y2="2" />
                <line x1="0" y1="9" x2="36" y2="9" />
                <line x1="0" y1="16" x2="36" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 4. Fullscreen Animated Navigation Drawer Portaled Directly to document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-[99999] flex flex-col justify-between overflow-y-auto bg-[#070708]/98 px-8 py-10 text-white backdrop-blur-3xl md:px-16 md:py-14"
              >
                {/* Cinematic Radial Atmosphere */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="pointer-events-none absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-zinc-900/10 to-transparent blur-3xl"
                />

                {/* Top Close Bar */}
                <div className="relative z-10 flex items-center justify-between w-full pb-4">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                    <span className="font-mono text-xs tracking-[0.25em] uppercase text-white font-semibold">
                      MSYNTRA MOTORS
                    </span>
                  </Link>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close Menu"
                    className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-xs font-mono tracking-widest text-zinc-300 transition hover:border-white hover:text-white cursor-pointer bg-black/40"
                  >
                    <span>CLOSE</span>
                    <X className="h-4 w-4 text-[#d4af37]" />
                  </button>
                </div>

                {/* Navigation Grid */}
                <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
                  {/* Left: Staggered Navigation Links */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="lg:col-span-8 flex flex-col items-start space-y-2 sm:space-y-3"
                  >
                    {navLinks.map((link, idx) => {
                      const isHovered = hoveredIndex === idx;
                      const isAnyHovered = hoveredIndex !== null;
                      const isCurrent = pathname === link.href;

                      return (
                        <div key={link.name} className="overflow-hidden">
                          <motion.div variants={itemVariants}>
                            <Link
                              href={link.href}
                              onClick={() => setIsMenuOpen(false)}
                              onMouseEnter={() => setHoveredIndex(idx)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              className={`group relative block text-2xl font-light tracking-[0.2em] text-white transition-all duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${
                                isAnyHovered && !isHovered
                                  ? "opacity-30 blur-[0.5px]"
                                  : isCurrent
                                  ? "text-[#d4af37] opacity-100 font-normal"
                                  : "opacity-90 hover:opacity-100"
                              }`}
                            >
                              <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-3">
                                <span className="text-xs font-mono text-zinc-600 font-normal">
                                  0{idx + 1}
                                </span>
                                <span>{link.name}</span>
                                {isCurrent && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                                )}
                              </span>

                              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-white via-[#d4af37] to-transparent opacity-80 transition-all duration-500 group-hover:w-full" />
                            </Link>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* Right: Quick Info Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="lg:col-span-4 rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#d4af37] block mb-2">
                        // VIP CONCIERGE
                      </span>
                      <p className="text-xs font-light text-zinc-400 leading-relaxed">
                        Direct access to our client advisors for private acquisitions,
                        vehicle allocations, and bespoke requests.
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-zinc-800/80 pt-4">
                      <a
                        href={`tel:${dealership.contact.phone}`}
                        className="flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition"
                      >
                        <span className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-[#d4af37]" />
                          {dealership.contact.phone}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
                      </a>
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between text-xs font-mono text-zinc-300 hover:text-white transition"
                      >
                        <span>{dealership.contact.email}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
                      </Link>
                    </div>

                    <div className="border-t border-zinc-800/80 pt-4">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                        GALLERY LOCATIONS
                      </span>
                      <p className="text-xs font-mono text-zinc-400">
                        Beverly Hills • Austin • Miami
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Row */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] tracking-[0.25em] text-zinc-500 uppercase pt-4 border-t border-white/5"
                >
                  <div>© 2026 MSYNTRA MOTORS INC.</div>
                  <div>GLOBAL CONCIERGE AUTOMOTIVE</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}