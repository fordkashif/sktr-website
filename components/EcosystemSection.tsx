"use client";
import { ease } from "@/lib/motion";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import WaveMini from "./WaveMini";
import { verticals } from "@/lib/verticals";


export default function EcosystemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = verticals[activeIndex];

  return (
    <section className="mt-[4.2rem]" id="ecosystem">
      {/* Intro */}
      <motion.div
        className="pb-8 border-b border-[rgba(131,145,190,0.2)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.6rem]">
          Four verticals. One ecosystem.
        </p>
        <p
          className="text-[rgba(232,235,240,0.65)] leading-[1.7] max-w-[52rem]"
          style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
        >
          SKTR operates across Athletics, Labs, Media, and Ventures — four
          interconnected verticals that share infrastructure, insight, and
          long-term conviction. Select a vertical below to explore its role in
          the ecosystem.
        </p>
      </motion.div>

      {/* Dynamic lead */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.65fr)] gap-6 md:gap-8 items-end mb-8 mt-11">
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id + "-lead"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: ease }}
            >
              <p className="mono text-blue mb-[0.9rem]">{current.kicker}</p>
              <h2
                className="m-0 leading-[0.96] tracking-[-0.07em] max-w-[14ch] font-extrabold"
                style={{ fontSize: "clamp(2.4rem, 4.6vw, 4.2rem)" }}
              >
                {current.story}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-copy"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="flex flex-col gap-4"
          >
            <p
              className="text-[rgba(232,235,240,0.72)] leading-[1.55]"
              style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)" }}
            >
              {current.storyCopy}
            </p>
            <Link
              href={`/${current.slug}`}
              className="mono text-blue flex items-center gap-1 self-start hover:gap-2 transition-all duration-150"
              style={{ fontSize: "0.78rem", letterSpacing: "0.1em" }}
            >
              Explore {current.axisLabel} →
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Wave */}
      <WaveMini
        label={current.waveLabel}
        waveSettings={current.waveSettings}
      />

      {/* Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8"
        role="tablist"
        aria-label="SKTR sectors"
      >
        {verticals.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={s.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              className="relative min-h-[13.8rem] p-[1.2rem_1.3rem_1.15rem] border text-left overflow-hidden cursor-pointer bg-[#0b0d12] text-ink"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: isActive ? -6 : 0 }}
              viewport={{ once: true, amount: 0 }}
              animate={{
                backgroundColor: isActive ? "#171b24" : "#0b0d12",
                borderColor: isActive
                  ? "rgba(86,118,255,0.45)"
                  : "rgba(131,145,190,0.2)",
                y: isActive ? -6 : 0,
              }}
              whileHover={{
                backgroundColor: "#171b24",
                borderColor: "rgba(86,118,255,0.45)",
                y: -6,
              }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: ease }}
              onClick={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveIndex(i);
                if (e.key === "ArrowRight")
                  setActiveIndex((activeIndex + 1) % verticals.length);
                if (e.key === "ArrowLeft")
                  setActiveIndex(
                    (activeIndex - 1 + verticals.length) % verticals.length
                  );
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="card-active-bar"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-blue"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}

              <div className="flex justify-between items-center mono text-[rgba(232,235,240,0.52)] mb-0">
                <span>{s.num} / {s.tag}</span>
              </div>

              <h3
                className="mt-4 mb-3 uppercase tracking-[-0.04em] leading-[0.98] transition-colors duration-200"
                style={{
                  fontSize: "clamp(1.45rem, 1.9vw, 2.1rem)",
                  color: isActive ? "#3e69ff" : "#e8ebf0",
                }}
              >
                {s.title}
              </h3>

              <p className="m-0 text-base leading-snug" style={{ color: "rgba(232,235,240,0.56)" }}>
                {s.description}
              </p>

              {/* Active indicator */}
              <motion.div
                className="mt-3 mono"
                style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-blue">● Selected</span>
              </motion.div>

              <hr className="border-0 h-px bg-white/10 mt-3 mb-3" />

              <Link
                href={`/${s.slug}`}
                className="mt-2 mono text-blue flex items-center gap-1 hover:gap-2 transition-all duration-150 w-fit"
                style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
              >
                Explore {s.axisLabel} →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
