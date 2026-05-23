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

const athleteFeatures = [
  {
    label: "Performance data",
    heading: "Your training history, in one place.",
    body: "Load, recovery, and analytics connected across your career — not siloed per session or per coach.",
  },
  {
    label: "Development",
    heading: "Built around the long game.",
    body: "Elite performance is the outcome of a system. SKTR Athletics builds the infrastructure behind the athlete, from early development through to the top level.",
  },
  {
    label: "Narrative",
    heading: "Your story is part of the platform.",
    body: "Media and narrative infrastructure are built in. Your journey gets the same operating stack as your training.",
  },
];

const coachFeatures = [
  {
    label: "Roster view",
    heading: "One view across your entire squad.",
    body: "Athlete data, session logs, and development tracking in a single workflow — not spread across five tools.",
  },
  {
    label: "Network",
    heading: "International network. Real methodology.",
    body: "Connect with coaches across disciplines and regions. Shared standards, shared systems, built for how elite coaching actually works.",
  },
  {
    label: "Compounding",
    heading: "Infrastructure that improves over time.",
    body: "Every athlete developed, every session logged feeds a system that gets more intelligent the longer you use it.",
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
            fill sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/96 via-[#050608]/65 to-[#050608]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/10 to-[#050608]/92" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-24"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.p className="mono text-blue mb-4"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: ease }}>
            {v.kicker}
          </motion.p>
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="m-0 font-extrabold tracking-[-0.07em] leading-[0.9]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              initial={{ y: "105%" }} animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: ease }}>
              {v.title}
            </motion.h1>
          </div>
          <motion.p
            className="mt-6 text-[rgba(232,235,240,0.72)] leading-relaxed max-w-[34rem]"
            style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: ease }}>
            {v.storyCopy}
          </motion.p>
          <motion.div className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.82, ease: ease }}>
            <a href="mailto:signal@thesktr.com"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              {v.cta.label}
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.2)] text-[rgba(232,235,240,0.6)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              ← Back to SKTR
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Credential strip */}
        <motion.div
          className="mt-10 py-5 border-y border-[rgba(131,145,190,0.15)] flex flex-wrap items-center gap-x-8 gap-y-3"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6 }}>
          {["International coaching network", "Performance analytics", "Athlete development", "Media & narrative"].map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-[rgba(131,145,190,0.2)] hidden sm:block">·</span>}
              <span className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.66rem", letterSpacing: "0.2em" }}>
                {item.toUpperCase()}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Wave */}
        <div className="mt-10">
          <WaveMini waveSettings={v.waveSettings} />
        </div>

        {/* Large statement */}
        <motion.div
          className="mt-20 pb-16 border-b border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: ease }}>
          <p className="mono text-[rgba(232,235,240,0.35)] mb-5">{v.tag}</p>
          <h2
            className="m-0 font-extrabold leading-[0.92] tracking-[-0.07em]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
            {v.story}
          </h2>
        </motion.div>

        {/* For Athletes — image left, features right */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: ease }}>
          <p className="mono text-blue mb-6" style={{ fontSize: "0.66rem", letterSpacing: "0.22em" }}>
            FOR ATHLETES
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-[rgba(131,145,190,0.15)]">
            {/* Image */}
            <div className="relative overflow-hidden min-h-[360px] lg:min-h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80"
                alt="Athletes competing on a track"
                fill sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050608]/30 lg:to-[#050608]/50" />
            </div>
            {/* Features */}
            <div className="flex flex-col justify-center divide-y divide-[rgba(131,145,190,0.12)] bg-[rgba(8,10,16,0.6)]">
              {athleteFeatures.map((f, i) => (
                <motion.div
                  key={f.heading}
                  className="p-7 lg:p-8"
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: ease }}>
                  <p className="mono text-blue mb-3" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                    {f.label.toUpperCase()}
                  </p>
                  <h3 className="m-0 mb-3 font-extrabold text-ink leading-[1.05] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}>
                    {f.heading}
                  </h3>
                  <p className="m-0 text-[rgba(232,235,240,0.52)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* For Coaches — features left, image right */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: ease }}>
          <p className="mono text-blue mb-6" style={{ fontSize: "0.66rem", letterSpacing: "0.22em" }}>
            FOR COACHES
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-[rgba(131,145,190,0.15)]">
            {/* Features — first in DOM so mobile stacks correctly */}
            <div className="flex flex-col justify-center divide-y divide-[rgba(131,145,190,0.12)] bg-[rgba(8,10,16,0.6)] order-2 lg:order-1">
              {coachFeatures.map((f, i) => (
                <motion.div
                  key={f.heading}
                  className="p-7 lg:p-8"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: ease }}>
                  <p className="mono text-blue mb-3" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                    {f.label.toUpperCase()}
                  </p>
                  <h3 className="m-0 mb-3 font-extrabold text-ink leading-[1.05] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}>
                    {f.heading}
                  </h3>
                  <p className="m-0 text-[rgba(232,235,240,0.52)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>
                    {f.body}
                  </p>
                </motion.div>
              ))}
            </div>
            {/* Image */}
            <div className="relative overflow-hidden min-h-[360px] lg:min-h-[520px] order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                alt="Coach reviewing athlete performance data"
                fill sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050608]/30 lg:to-[#050608]/50" />
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 pt-10 border-t border-[rgba(131,145,190,0.2)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: ease }}>
          <div>
            <p className="mono text-[rgba(232,235,240,0.35)] mb-2" style={{ fontSize: "0.68rem" }}>
              Work with Athletics
            </p>
            <h3 className="m-0 font-extrabold tracking-[-0.04em] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
              {v.cta.label}
            </h3>
          </div>
          <motion.a href="mailto:signal@thesktr.com"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.46)] bg-[rgba(62,105,255,0.08)] text-blue mono shrink-0"
            style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            whileHover={{ backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.7)" }}
            whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
            signal@thesktr.com →
          </motion.a>
        </motion.div>

        {/* Other verticals */}
        <motion.div className="mt-16 pt-8 border-t border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: ease }}>
          <p className="mono text-[rgba(232,235,240,0.28)] mb-6" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            Explore the ecosystem
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: "labs", axisLabel: "Labs", tag: "Research", num: "02", description: "Research, prototyping, and applied invention — the engine that builds shared tools and infrastructure." },
              { slug: "media", axisLabel: "Media", tag: "Editorial", num: "03", description: "Editorial, film, and distribution — how the SKTR ecosystem earns an audience and shapes culture." },
              { slug: "ventures", axisLabel: "Ventures", tag: "Capital", num: "04", description: "Patient, selective capital deployed behind operators and platforms that strengthen the ecosystem." },
            ].map((vert) => (
              <Link key={vert.slug} href={`/${vert.slug}`}
                className="group flex flex-col gap-3 p-5 border border-[rgba(131,145,190,0.15)] hover:border-[rgba(86,118,255,0.4)] hover:bg-[#0f1219] transition-all duration-200">
                <span className="mono text-[rgba(232,235,240,0.3)] group-hover:text-blue transition-colors duration-150"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.14em" }}>
                  {vert.num} / {vert.tag}
                </span>
                <span className="font-extrabold text-ink tracking-[-0.03em] group-hover:text-blue transition-colors duration-150"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)" }}>
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
