"use client";
import { ease } from "@/lib/motion";
import { motion } from "framer-motion";

const principles = [
  {
    num: "01",
    heading: "Infrastructure creates leverage.",
    body: "Most companies build features. SKTR builds the systems those features run on. Infrastructure created once compounds across every vertical.",
  },
  {
    num: "02",
    heading: "Ecosystems outlast products.",
    body: "Platforms that connect multiple categories create value that isolated products cannot. The whole is worth more than the sum of its parts.",
  },
  {
    num: "03",
    heading: "Patience is the strategy.",
    body: "Short-cycle capital optimises for exits. We're structured around a different constraint — what compounds over a decade, not a quarter.",
  },
];

export default function ManifestoSection() {
  return (
    <section id="principles" className="mt-32 pt-16">
      {/* Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <p className="mono text-[rgba(232,235,240,0.38)] mb-4">How we think</p>
        <h2
          className="m-0 font-extrabold leading-[0.94] tracking-[-0.06em]"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
        >
          Three things we believe.
        </h2>
      </motion.div>

      {/* Principle rows — full width */}
      <div className="flex flex-col border-t border-[rgba(131,145,190,0.15)]">
        {principles.map((p, i) => (
          <motion.div
            key={p.num}
            className="grid grid-cols-1 md:grid-cols-[6rem_1fr_1.4fr] gap-4 md:gap-12 py-10 border-b border-[rgba(131,145,190,0.15)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: ease }}
          >
            <span
              className="mono text-[rgba(232,235,240,0.25)] self-start pt-1"
              style={{ fontSize: "0.68rem" }}
            >
              {p.num}
            </span>
            <h3
              className="m-0 font-extrabold leading-[1.05] tracking-[-0.04em] self-start"
              style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}
            >
              {p.heading}
            </h3>
            <p
              className="m-0 text-[rgba(232,235,240,0.55)] leading-[1.75] self-start"
              style={{ fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)" }}
            >
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
