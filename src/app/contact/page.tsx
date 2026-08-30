"use client";

import { dealership } from "@/data/dealership";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const BUSINESS_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 6:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Hero */}
      <section className="px-6 pt-32 pb-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 block text-xs font-mono tracking-[0.3em] uppercase text-zinc-400">
            01 / GET IN TOUCH
          </span>
          <h1 className="text-5xl font-light tracking-tight uppercase leading-[1.1] sm:text-6xl md:text-7xl">
            CONTACT US.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-400">
            Whether you&apos;re ready to purchase, need financing guidance, or
            want to schedule a private viewing — our concierge team is here.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/80 p-6 backdrop-blur-xl md:p-8">
              <div className="mb-8">
                <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                  SEND US A MESSAGE
                </h2>
                <p className="mt-1 text-xs font-light text-zinc-400">
                  Fill out the form below and a specialist will respond within 24
                  hours.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                        FIRST NAME
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John"
                        className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                        LAST NAME
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Doe"
                        className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                        EMAIL ADDRESS
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      REASON FOR INQUIRY
                    </label>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 pr-10 text-sm font-mono text-zinc-200 outline-none transition-colors focus:border-zinc-600">
                        <option value="general">General Inquiry</option>
                        <option value="purchase">Vehicle Purchase</option>
                        <option value="financing">Financing</option>
                        <option value="trade-in">Trade-In Valuation</option>
                        <option value="test-drive">Schedule Test Drive</option>
                        <option value="service">Service & Maintenance</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help…"
                      className="w-full resize-none rounded-xl border border-zinc-800/80 bg-[#141519] px-4 py-3 text-sm font-mono text-zinc-200 placeholder-zinc-600 outline-none transition-colors focus:border-zinc-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#cbb291] py-3.5 text-xs font-mono tracking-[0.25em] uppercase text-black font-medium transition-colors hover:bg-[#b89e7c] sm:w-auto sm:px-10"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              ) : (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37]/20 text-2xl font-bold text-[#d4af37]">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl font-normal">
                    Message Sent
                  </h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-zinc-400">
                    Thank you for reaching out. An MSyntra specialist will
                    contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-xs font-mono tracking-widest text-white transition hover:bg-white hover:text-black"
                  >
                    SEND ANOTHER
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Contact Cards */}
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md">
              <h3 className="mb-5 text-xs font-mono tracking-[0.2em] uppercase text-[#d4af37]">
                // DIRECT CONTACT
              </h3>

              <div className="space-y-5">
                <a
                  href={`tel:${dealership.contact.phone}`}
                  className="group flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 transition-colors group-hover:border-zinc-600">
                    <Phone className="h-4 w-4 text-zinc-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      PHONE
                    </span>
                    <span className="text-sm font-mono text-zinc-200 group-hover:text-white">
                      {dealership.contact.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${dealership.contact.email}`}
                  className="group flex items-center gap-4 transition-colors"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60 transition-colors group-hover:border-zinc-600">
                    <Mail className="h-4 w-4 text-zinc-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      EMAIL
                    </span>
                    <span className="text-sm font-mono text-zinc-200 group-hover:text-white">
                      {dealership.contact.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/60">
                    <MapPin className="h-4 w-4 text-zinc-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      PRIMARY LOCATION
                    </span>
                    <span className="text-sm font-mono text-zinc-200">
                      {dealership.address.street}, {dealership.address.city},{" "}
                      {dealership.address.state} {dealership.address.zip}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md">
              <h3 className="mb-5 text-xs font-mono tracking-[0.2em] uppercase text-[#d4af37]">
                // BUSINESS HOURS
              </h3>
              <div className="space-y-3">
                {BUSINESS_HOURS.map((entry) => (
                  <div
                    key={entry.day}
                    className="flex items-center justify-between border-b border-zinc-800/60 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-xs font-mono text-zinc-300">
                      {entry.day}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {entry.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div className="rounded-2xl border border-zinc-800/80 bg-[#0e0f12]/60 p-6 backdrop-blur-md">
              <h3 className="mb-2 text-xs font-mono tracking-[0.2em] uppercase text-zinc-200 font-medium">
                PREFER TO TALK NOW?
              </h3>
              <p className="mb-4 text-xs font-light text-zinc-400">
                Our concierge specialists are available to assist you with any
                questions.
              </p>
              <a
                href={`tel:${dealership.contact.phone}`}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-xs font-mono tracking-widest uppercase text-white transition-colors hover:border-white hover:bg-zinc-800"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>CALL NOW</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
