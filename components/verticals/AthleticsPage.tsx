"use client";
import { ease } from "@/lib/motion";
import type { Vertical } from "@/lib/verticals";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WaveMini from "@/components/WaveMini";

const athleteValue = [
  {
    heading: "Your data, in one place.",
    body: "Training load, recovery, analytics, and performance history — connected across your career, not siloed per session.",
  },
  {
    heading: "Built around development, not just performance.",
    body: "Elite performance is the outcome of a system. SKTR Athletics builds the infrastructure behind the athlete, from early development through to the top level.",
  },
  {
    heading: "Your story is part of the platform.",
    body: "Media and narrative are built into the ecosystem. Your journey gets the same infrastructure as your training.",
  },
];

const coachValue = [
  {
    heading: "One view across your entire roster.",
    body: "Athlete data, session logs, and development tracking in a single workflow — not across five different tools and spreadsheets.",
  },
  {
    heading: "International network. Local application.",
    body: "Connect with coaches across disciplines and regions. Shared methodology, shared standards, built for how elite coaching actually works.",
  },
  {
    heading: "Infrastructure that compounds.",
    body: "Every athlete you develop, every session you log, every insight you act on feeds a system that gets better over time.",
  },
];

export default function AthleticsPage({ vertical: v }: { vertical: Vertical }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src={v.heroImage}
            alt={v.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/96 via-[#050608]/65 to-[#050608]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/15 to-[#050608]/90" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-24"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            className="mono text-blue mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: ease }}
          >
            {v.kicker}
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="m-0 font-extrabold tracking-[-0.07em] leading-[0.9]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: ease }}
            >
              {v.title}
            </motion.h1>
          </div>

          <motion.p
            className="mt-6 text-[rgba(232,235,240,0.72)] leading-relaxed max-w-[34rem]"
            style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: ease }}
          >
            {v.storyCopy}
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.82, ease: ease }}
          >
            <a
              href="mailto:signal@thesktr.com"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              {v.cta.label}
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.2)] text-[rgba(232,235,240,0.6)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              ← Back to SKTR
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Credential strip */}
        <motion.div
          className="mt-10 py-5 border-y border-[rgba(131,145,190,0.15)] flex flex-wrap items-center gap-x-10 gap-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          {[
            "International coaching network",
            "Performance analytics",
            "Athlete development",
            "Media & narrative",
          ].map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-[rgba(131,145,190,0.25)] hidden sm:block">·</span>}
              <span className="mono text-[rgba(232,235,240,0.45)]" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
                {item.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Wave */}
        <div className="mt-10">
          <WaveMini waveSettings={v.waveSettings} />
        </div>

        {/* Section header */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-4">{v.tag}</p>
          <h2
            className="m-0 font-extrabold leading-[0.93] tracking-[-0.06em] max-w-[18ch]"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            {v.story}
          </h2>
        </motion.div>

        {/* For Athletes */}
        <motion.div
          className="mt-16 pt-10 border-t border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-blue mb-8" style={{ fontSize: "0.68rem", letterSpacing: "0.22em" }}>
            FOR ATHLETES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(131,145,190,0.12)]">
            {athleteValue.map((item, i) => (
              <motion.div
                key={item.heading}
                className="bg-[#050608] p-[1.6rem_1.5rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: ease }}
              >
                <div className="mono text-[rgba(232,235,240,0.22)] mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}>
                  0{i + 1}
                </div>
                <h3
                  className="m-0 mb-3 font-extrabold text-ink leading-[1.08] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
                >
                  {item.heading}
                </h3>
                <p className="m-0 text-[rgba(232,235,240,0.55)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* For Coaches */}
        <motion.div
          className="mt-12 pt-10 border-t border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-blue mb-8" style={{ fontSize: "0.68rem", letterSpacing: "0.22em" }}>
            FOR COACHES
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(131,145,190,0.12)]">
            {coachValue.map((item, i) => (
              <motion.div
                key={item.heading}
                className="bg-[#050608] p-[1.6rem_1.5rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: ease }}
              >
                <div className="mono text-[rgba(232,235,240,0.22)] mb-4" style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}>
                  0{i + 1}
                </div>
                <h3
                  className="m-0 mb-3 font-extrabold text-ink leading-[1.08] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
                >
                  {item.heading}
                </h3>
                <p className="m-0 text-[rgba(232,235,240,0.55)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 pt-10 border-t border-[rgba(131,145,190,0.2)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <div>
            <p className="mono text-[rgba(232,235,240,0.35)] mb-2" style={{ fontSize: "0.68rem" }}>
              Work with Athletics
            </p>
            <h3
              className="m-0 font-extrabold tracking-[-0.04em] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {v.cta.label}
            </h3>
          </div>
          <motion.a
            href="mailto:signal@thesktr.com"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.46)] bg-[rgba(62,105,255,0.08)] text-blue mono shrink-0"
            style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            whileHover={{ backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.7)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            signal@thesktr.com →
          </motion.a>
        </motion.div>

        {/* Other verticals */}
        <motion.div
          className="mt-16 pt-8 border-t border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.28)] mb-6" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            Explore the ecosystem
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: "labs", axisLabel: "Labs", tag: "Research", num: "02", description: "Research, prototyping, and applied invention — the engine that builds shared tools and infrastructure." },
              { slug: "media", axisLabel: "Media", tag: "Editorial", num: "03", description: "Editorial, film, and distribution — how the SKTR ecosystem earns an audience and shapes culture." },
              { slug: "ventures", axisLabel: "Ventures", tag: "Capital", num: "04", description: "Patient, selective capital deployed behind operators and platforms that strengthen the ecosystem." },
            ].map((vert) => (
              <Link
                key={vert.slug}
                href={`/${vert.slug}`}
                className="group flex flex-col gap-3 p-5 border border-[rgba(131,145,190,0.15)] hover:border-[rgba(86,118,255,0.4)] hover:bg-[#0f1219] transition-all duration-200"
              >
                <span className="mono text-[rgba(232,235,240,0.3)] group-hover:text-blue transition-colors duration-150" style={{ fontSize: "0.62rem", letterSpacing: "0.14em" }}>
                  {vert.num} / {vert.tag}
                </span>
                <span className="font-extrabold text-ink tracking-[-0.03em] group-hover:text-blue transition-colors duration-150" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)" }}>
                  {vert.axisLabel}
                </span>
                <span className="text-[rgba(232,235,240,0.42)] leading-snug" style={{ fontSize: "0.85rem" }}>
                  {vert.description}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
