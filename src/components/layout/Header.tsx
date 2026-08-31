"use client";

import { Navbar } from "@/components/navigation/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out ${
        isHome && !isScrolled
          ? "bg-transparent border-b border-transparent"
          : "border-b border-[#1B222B]/60 bg-[#080A0D]/80 backdrop-blur-xl"
      }`}
    >
      <Navbar />
    </header>
  );
}