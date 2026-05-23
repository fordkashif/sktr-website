"use client";
import { ease } from "@/lib/motion";
import type { Vertical } from "@/lib/verticals";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Header from "@/components/Header";
import WaveMini from "@/components/WaveMini";

export default function VerticalPage({ vertical: v }: { vertical: Vertical }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex flex-col"
      >
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src={v.heroImage}
            alt={v.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/95 via-[#050608]/60 to-[#050608]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/20 to-[#050608]/88" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 16% 34%, rgba(62,105,255,0.12) 0%, transparent 28%)",
            }}
          />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] sm:pt-[8rem] pb-16 sm:pb-24"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            className="mono text-blue mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: ease }}
          >
            {v.kicker}
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="m-0 font-extrabold tracking-[-0.07em] leading-[0.92]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: ease }}
            >
              {v.title}
            </motion.h1>
          </div>

          <motion.p
            className="mt-6 text-[rgba(232,235,240,0.72)] leading-relaxed max-w-[38rem]"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: ease }}
          >
            {v.storyCopy}
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.88, ease: ease }}
          >
            <Link
              href={v.cta.href}
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue mono"
              style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}
            >
              {v.cta.label}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.22)] text-[rgba(232,235,240,0.72)] mono"
              style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}
            >
              ← Back to SKTR
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Main content */}
      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Wave */}
        <div className="mt-12">
          <WaveMini label={v.waveLabel} waveSettings={v.waveSettings} />
        </div>

        {/* Story section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 items-start"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: ease }}
        >
          <div>
            <p className="mono text-[rgba(232,235,240,0.52)] mb-3">{v.tag}</p>
            <h2
              className="m-0 font-extrabold leading-[0.94] tracking-[-0.06em]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
            >
              {v.story}
            </h2>
          </div>
          <p
            className="text-[rgba(232,235,240,0.68)] leading-[1.8] mt-2"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)" }}
          >
            {v.description} {v.storyCopy}
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {v.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.heading}
              className="p-[1.4rem_1.4rem_1.3rem] border border-[rgba(131,145,190,0.2)] bg-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: ease }}
            >
              <div className="mono text-[rgba(232,235,240,0.36)] mb-4" style={{ fontSize: "0.72rem" }}>
                0{i + 1}
              </div>
              <h3 className="m-0 mb-3 text-ink" style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
                {pillar.heading}
              </h3>
              <p className="m-0 text-[rgba(232,235,240,0.6)] leading-[1.72]">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Other verticals */}
        <motion.div
          className="mt-24 pt-8 border-t border-[rgba(131,145,190,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-6" style={{ fontSize: "0.72rem", letterSpacing: "0.16em" }}>
            Explore the ecosystem
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["athletics", "labs", "media", "ventures"]
              .filter((s) => s !== v.slug)
              .map((slug) => {
                const labels: Record<string, string> = {
                  athletics: "SKTR Athletics",
                  labs: "SKTR Labs",
                  media: "SKTR Media",
                  ventures: "SKTR Ventures",
                };
                const tags: Record<string, string> = {
                  athletics: "Performance",
                  labs: "Research",
                  media: "Editorial",
                  ventures: "Capital",
                };
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="group flex flex-col gap-2 p-4 border border-[rgba(131,145,190,0.2)] hover:border-[rgba(86,118,255,0.45)] hover:bg-[#171b24] transition-all duration-200"
                  >
                    <span className="mono text-[rgba(232,235,240,0.38)]" style={{ fontSize: "0.68rem" }}>
                      {tags[slug]}
                    </span>
                    <span className="text-ink font-semibold tracking-[-0.03em] group-hover:text-blue transition-colors duration-150">
                      {labels[slug]}
                    </span>
                  </Link>
                );
              })}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-5 border-t border-[rgba(131,145,190,0.2)] mono text-[rgba(232,235,240,0.38)]" style={{ fontSize: "0.78rem" }}>
          <span>SKTR — Innovation Group</span>
          <span>© 2026 SKTR</span>
        </div>
      </main>
    </>
  );
}
