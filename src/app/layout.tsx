import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { dealership } from "@/data/dealership";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${dealership.name} — Automotive`,
  description:
    "A curated automotive experience built around exceptional machines, considered design, and the people who appreciate them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}