"use client";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const differentiators = [
  {
    label: "End-to-End",
    desc: "Design and engineering under one roof — no handoff, no translation loss between files and production",
  },
  {
    label: "Full-Stack",
    desc: "Mobile apps, web platforms, SaaS products, and APIs built from the same studio",
  },
  {
    label: "Direct Access",
    desc: "You work with the people building your product — not account managers relaying messages",
  },
  {
    label: "≤ 48 Hours",
    desc: "We respond to every project inquiry within 48 hours, every time",
  },
];

export default function LabsTechStrip() {
  return (
    <motion.section
      className="mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: ease }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgba(131,145,190,0.12)]">
        {differentiators.map((d) => (
          <div
            key={d.label}
            className="flex flex-col gap-3 px-7 py-8 border-b border-r border-[rgba(131,145,190,0.1)]"
          >
            <span
              className="font-extrabold tracking-[-0.03em] text-ink"
              style={{ fontSize: "1.1rem" }}
            >
              {d.label}
            </span>
            <p
              className="m-0 text-[rgba(232,235,240,0.44)] leading-[1.75]"
              style={{ fontSize: "0.84rem" }}
            >
              {d.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
