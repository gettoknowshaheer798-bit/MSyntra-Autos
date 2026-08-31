"use client";

import { motion } from "framer-motion";

const statements = [
  {
    headline: "CURATED. NOT CROWDED.",
    description: "Every vehicle in our collection is hand-selected. We value provenance, engineering excellence, and condition over volume."
  },
  {
    headline: "PRECISION IN EVERY DETAIL.",
    description: "From our digital showroom to our physical locations, the MSyntra experience is designed to be frictionless, transparent, and exact."
  },
  {
    headline: "AN EXPERIENCE BUILT AROUND YOU.",
    description: "Private viewings, white-glove delivery, and a dedicated concierge. We manage the complexity so you can focus on the drive."
  }
];

export default function ExperienceSection() {
  return (
    <section className="relative w-full bg-[#080A0D] py-16 md:py-24 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(77,163,255,0.03),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(22,58,92,0.05),transparent_70%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] tracking-[0.5em] uppercase text-accent block mb-20 md:mb-32 text-center"
        >
          MORE THAN A VEHICLE
        </motion.span>

        <div className="space-y-32 md:space-y-48">
          {statements.map((statement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${
                idx % 2 === 0 ? "items-start text-left" : "items-end text-right"
              }`}
            >
              <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-[0.05em] uppercase text-foreground leading-tight max-w-3xl">
                {statement.headline.split('. ').map((part, i, arr) => (
                  <span key={i} className={i === arr.length - 1 ? "text-foreground-secondary" : ""}>
                    {part}{i < arr.length - 1 ? '. ' : ''}
                  </span>
                ))}
              </h3>
              
              <div className="mt-8 md:mt-12 max-w-md">
                <div className={`w-12 h-[1px] bg-accent/50 mb-6 ${idx % 2 === 0 ? "ml-0" : "ml-auto"}`} />
                <p className="text-sm font-light text-foreground-muted leading-relaxed">
                  {statement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
