"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isHome && !isScrolled
          ? "bg-transparent border-b border-transparent"
          : "border-b border-white/10 bg-[#070708]/90 backdrop-blur-md shadow-2xl"
      }`}
    >
      <Navbar />
    </header>
  );
}