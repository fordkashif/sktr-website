"use client";
import { ease } from "@/lib/motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const lines = [
  "We don't build in isolation.",
  "We build the conditions",
  "for things to compound.",
];

export default function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="mt-32 py-28 border-t border-b border-[rgba(131,145,190,0.15)] text-center"
    >
      <p
        className="mono text-[rgba(232,235,240,0.28)] mb-8 tracking-[0.3em]"
        style={{ fontSize: "0.66rem" }}
      >
        SKTR — The principle
      </p>

      <h2
        className="m-0 font-extrabold leading-[0.95] tracking-[-0.06em]"
        style={{ fontSize: "clamp(2.6rem, 6.5vw, 6rem)" }}
      >
        {lines.map((line, li) => (
          <div key={li} style={{ overflow: "hidden", lineHeight: "1.05" }}>
            {line.split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                className="inline-block mr-[0.22em]"
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: li * 0.18 + wi * 0.07,
                  ease: ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        ))}
      </h2>

      <motion.p
        className="mt-8 mx-auto text-[rgba(232,235,240,0.45)] leading-[1.7]"
        style={{
          fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
          maxWidth: "38rem",
        }}
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.65, ease: ease }}
      >
        Four verticals. Shared infrastructure. A single long-term conviction.
        This is what makes SKTR different from a holding company.
      </motion.p>
    </div>
  );
}
