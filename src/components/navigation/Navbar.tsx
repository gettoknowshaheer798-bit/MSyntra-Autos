"use client";

import { dealership } from "@/data/dealership";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowUpRight, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const navLinks = [
  { name: "VEHICLES", href: "/catalog" },
  { name: "COLLECTION", href: "/inventory" },
  { name: "EXPERIENCE", href: "/about" },
  { name: "ABOUT", href: "/about" },
];

const drawerLinks = [
  { name: "HOME", href: "/" },
  { name: "VEHICLES", href: "/catalog" },
  { name: "COLLECTION", href: "/inventory" },
  { name: "FINANCING", href: "/financing" },
  { name: "TRADE-IN", href: "/trade-in" },
  { name: "SERVICE", href: "/service" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1, when: "afterChildren" },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
  };

  return (
    <>
      <nav className="relative z-[110] flex w-full items-center justify-between px-6 py-4 sm:px-10 md:px-14">
        {/* Brand */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="z-[110] flex items-center gap-2.5 group"
          aria-label="MSyntra Home"
        >
          <span className="text-[13px] font-medium tracking-[0.3em] uppercase text-foreground">
            MSYNTRA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isCurrent = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isCurrent
                    ? "text-foreground"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {link.name}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 z-[110]">
          <Link
            href="/catalog"
            onClick={() => setIsMenuOpen(false)}
            className="hidden md:inline-flex items-center gap-2 border border-foreground-muted/30 px-5 py-2 text-[10px] tracking-[0.2em] uppercase text-foreground-secondary transition-all duration-300 hover:border-accent hover:text-accent"
          >
            EXPLORE
            <span className="text-accent">→</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            className="p-2 text-foreground transition-opacity hover:opacity-70 focus:outline-none flex items-center gap-2 cursor-pointer"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-foreground-secondary hidden sm:inline">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            {isMenuOpen ? (
              <X className="h-5 w-5 stroke-[1.5] text-accent" />
            ) : (
              <svg viewBox="0 0 24 14" className="h-3 w-5 fill-none stroke-current stroke-[1.5]">
                <line x1="0" y1="1" x2="24" y2="1" />
                <line x1="6" y1="7" x2="24" y2="7" />
                <line x1="0" y1="13" x2="24" y2="13" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Fullscreen Navigation Drawer */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-[99999] flex flex-col justify-between overflow-y-auto bg-[#080A0D]/98 px-8 py-10 text-foreground backdrop-blur-3xl md:px-16 md:py-14"
              >
                {/* Subtle blue atmosphere */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.15 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="pointer-events-none absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(77,163,255,0.04),transparent_60%)] blur-3xl"
                />

                {/* Top Close Bar */}
                <div className="relative z-10 flex items-center justify-between w-full pb-4">
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-[13px] tracking-[0.3em] uppercase text-foreground font-medium">
                      MSYNTRA
                    </span>
                  </Link>

                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close Menu"
                    className="flex items-center gap-2 border border-foreground-muted/30 px-4 py-1.5 text-xs tracking-widest text-foreground-secondary transition hover:border-accent hover:text-foreground cursor-pointer"
                  >
                    <span>CLOSE</span>
                    <X className="h-4 w-4 text-accent" />
                  </button>
                </div>

                {/* Navigation Grid */}
                <div className="relative z-10 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-6">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="lg:col-span-8 flex flex-col items-start space-y-2 sm:space-y-3"
                  >
                    {drawerLinks.map((link, idx) => {
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
                              className={`group relative block text-2xl font-light tracking-[0.2em] text-foreground transition-all duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${
                                isAnyHovered && !isHovered
                                  ? "opacity-30 blur-[0.5px]"
                                  : isCurrent
                                  ? "text-accent opacity-100"
                                  : "opacity-90 hover:opacity-100"
                              }`}
                            >
                              <span className="relative z-10 inline-flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-3">
                                <span className="text-xs text-foreground-muted">
                                  0{idx + 1}
                                </span>
                                <span>{link.name}</span>
                                {isCurrent && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                )}
                              </span>
                              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-accent to-transparent opacity-80 transition-all duration-500 group-hover:w-full" />
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
                    className="lg:col-span-4 border border-[#1B222B] bg-[#0D1117]/80 p-6 sm:p-8 backdrop-blur-md space-y-6"
                  >
                    <div>
                      <span className="text-[10px] tracking-[0.25em] uppercase text-accent block mb-2">
                        CONCIERGE
                      </span>
                      <p className="text-xs font-light text-foreground-secondary leading-relaxed">
                        Direct access to our client advisors for private viewings, vehicle acquisitions, and bespoke requests.
                      </p>
                    </div>

                    <div className="space-y-3 border-t border-[#1B222B] pt-4">
                      <a
                        href={`tel:${dealership.contact.phone}`}
                        className="flex items-center justify-between text-xs text-foreground-secondary hover:text-foreground transition"
                      >
                        <span className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-accent" />
                          {dealership.contact.phone}
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-foreground-muted" />
                      </a>
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between text-xs text-foreground-secondary hover:text-foreground transition"
                      >
                        <span>{dealership.contact.email}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-foreground-muted" />
                      </Link>
                    </div>
                  </motion.div>
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                  className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.25em] text-foreground-muted uppercase pt-4 border-t border-[#1B222B]/50"
                >
                  <div>© 2026 MSYNTRA AUTOMOTIVE</div>
                  <div>CURATED AUTOMOTIVE EXPERIENCE</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}