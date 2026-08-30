import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";

import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Main } from "@/components/layout/Main";
import { dealership } from "@/data/dealership";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: dealership.name,
  description: dealership.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <style>{`
          .goog-te-banner-frame,
          iframe[class*="goog-te-banner-frame"],
          .VIpgJd-Z3-9-b-L9-s-b,
          .goog-te-gadget {
            display: none !important;
            visibility: hidden !important;
          }

          body {
            top: 0px !important;
            position: static !important;
          }

          #goog-gt-tt,
          .goog-te-balloon-text,
          div[id*="goog-gt-"] {
            display: none !important;
          }

          .goog-text-highlight {
            background-color: transparent !important;
            box-shadow: none !important;
          }
        `}</style>
      </head>
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />

        <div id="google_translate_element" className="hidden" />

        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}