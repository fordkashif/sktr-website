"use client";
import { ease } from "@/lib/motion";
import { verticals } from "@/lib/verticals";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import WaveMini from "./WaveMini";

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(
      Math.floor(latest * verticals.length),
      verticals.length - 1
    );
    setActiveIndex(next);
  });

  const current = verticals[activeIndex];

  return (
    <section id="ecosystem">
      {/* Orientation intro — scrolls past before pin engages */}
      <motion.div
        className="pt-16 pb-10 border-b border-[rgba(131,145,190,0.15)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: ease }}
      >
        <p className="mono text-[rgba(232,235,240,0.42)] m-0">Ecosystem</p>
        <p
          className="text-[rgba(232,235,240,0.5)] leading-[1.6] max-w-[40rem] m-0"
          style={{ fontSize: "clamp(0.92rem, 1.15vw, 1rem)" }}
        >
          Four companies operating under the SKTR group. Each built
          independently — all connected by shared infrastructure and long-term conviction.{" "}
          <span className="text-[rgba(232,235,240,0.28)]">Scroll to explore.</span>
        </p>
      </motion.div>

      {/* Scroll-distance container — 100vh per vertical */}
      <div
        ref={sectionRef}
        style={{ height: `${verticals.length * 100}vh` }}
        className="relative"
      >
        {/* Pinned panel */}
        <div className="sticky top-0 h-screen flex flex-col justify-between py-[5.5rem] overflow-hidden">

          {/* Top bar */}
          <div className="flex justify-between items-center">
            <p className="mono text-[rgba(232,235,240,0.42)]">Ecosystem</p>
            <p className="mono text-[rgba(232,235,240,0.28)]" style={{ fontSize: "0.72rem" }}>
              <span className="text-[rgba(232,235,240,0.7)]">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(verticals.length).padStart(2, "0")}
            </p>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_0.38fr] gap-8 md:gap-20 items-center flex-1 my-auto py-8">

            {/* Left: changing story */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.38, ease: ease }}
                className="flex flex-col"
              >
                <p className="mono text-blue mb-5">{current.kicker}</p>
                <h2
                  className="m-0 font-extrabold leading-[0.9] tracking-[-0.07em]"
                  style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)" }}
                >
                  {current.story}
                </h2>
                <p
                  className="mt-7 text-[rgba(232,235,240,0.68)] leading-[1.65] max-w-[36rem]"
                  style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)" }}
                >
                  {current.storyCopy}
                </p>
                <Link
                  href={`/${current.slug}`}
                  className="inline-flex items-center gap-2 mt-7 mono text-blue self-start hover:gap-3 transition-all duration-150"
                  style={{ fontSize: "0.78rem", letterSpacing: "0.1em" }}
                >
                  Explore {current.axisLabel} →
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Right: vertical navigator (desktop only) */}
            <div className="hidden md:flex flex-col self-center">
              {verticals.map((v, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={v.id}
                    className={`relative py-[1.1rem] border-b border-[rgba(131,145,190,0.1)] ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="eco-active-bar"
                        className="absolute top-0 left-0 right-0 h-[1.5px] bg-blue"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="mono"
                          style={{ fontSize: "0.58rem", color: "rgba(232,235,240,0.28)" }}
                        >
                          {v.num}
                        </span>
                        <span
                          className="font-bold tracking-[-0.02em] transition-colors duration-400"
                          style={{
                            fontSize: "clamp(1rem, 1.2vw, 1.15rem)",
                            color: isActive ? "#3e69ff" : "rgba(232,235,240,0.38)",
                          }}
                        >
                          {v.axisLabel}
                        </span>
                      </div>
                      <span
                        className="mono"
                        style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(232,235,240,0.22)" }}
                      >
                        {v.tag}
                      </span>
                    </div>
                  </div>
                );
              })}

              <p
                className="mono mt-5"
                style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(232,235,240,0.2)" }}
              >
                ↓ Scroll to explore
              </p>
            </div>
          </div>

          {/* Bottom: mobile dots + wave */}
          <div className="flex flex-col gap-4">
            {/* Mobile vertical indicator (dots) — hidden on md+ */}
            <div className="flex items-center gap-3 md:hidden">
              {verticals.map((v, i) => {
                const isActive = i === activeIndex;
                return (
                  <div key={v.id} className="flex items-center gap-2">
                    <motion.div
                      className="rounded-full bg-blue"
                      animate={{
                        width: isActive ? 20 : 5,
                        height: 5,
                        opacity: isActive ? 1 : 0.28,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </div>
                );
              })}
              <span
                className="mono ml-1 text-[rgba(232,235,240,0.35)]"
                style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}
              >
                {current.axisLabel.toUpperCase()}
              </span>
            </div>
            <WaveMini waveSettings={current.waveSettings} />
          </div>
        </div>
      </div>
      {/* Bridge — signals end of scroll section, eases transition to next */}
      <motion.div
        className="flex items-center justify-between py-5 border-t border-[rgba(131,145,190,0.12)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          {verticals.map((v, i) => (
            <span
              key={v.id}
              className="mono text-[rgba(232,235,240,0.28)]"
              style={{ fontSize: "0.62rem", letterSpacing: "0.14em" }}
            >
              {v.axisLabel.toUpperCase()}
              {i < verticals.length - 1 && (
                <span className="ml-4 text-[rgba(131,145,190,0.2)]">/</span>
              )}
            </span>
          ))}
        </div>
        <span
          className="mono text-[rgba(232,235,240,0.2)]"
          style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
        >
          ↓ Continue
        </span>
      </motion.div>
    </section>
  );
}
