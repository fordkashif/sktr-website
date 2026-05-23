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

const workAreas = [
  {
    id: "01",
    label: "Performance Analytics",
    tag: "Active",
    description: "Data systems, tracking models, and intelligence layers built around athletes and coaches. Turning session data into decisions that compound.",
  },
  {
    id: "02",
    label: "Platform Infrastructure",
    tag: "Active",
    description: "Shared backend, APIs, and core tooling that powers every SKTR vertical. Infrastructure built once, deployed across the group.",
  },
  {
    id: "03",
    label: "AI Systems",
    tag: "Active",
    description: "Applied machine learning and data pipelines — pattern recognition, predictive modelling, and intelligence that improves over time.",
  },
  {
    id: "04",
    label: "Product Prototyping",
    tag: "Active",
    description: "Early-stage R&D where the next generation of SKTR tools gets tested, broken, and rebuilt before they become products.",
  },
];

const methodology = [
  {
    step: "01",
    label: "Research",
    body: "Start with the real problem. Labs works directly with Athletics, Media, and Ventures before building anything.",
  },
  {
    step: "02",
    label: "Prototype",
    body: "Build fast, test with real users, discard what doesn't work. The goal is to find out what's true, not to ship.",
  },
  {
    step: "03",
    label: "Infrastructure",
    body: "What survives becomes shared infrastructure — an operating layer used across the group, not a one-off tool.",
  },
];

export default function LabsPage({ vertical: v }: { vertical: Vertical }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <>
      <Header />

      {/* Hero — heavy overlay + grid texture to signal technical environment */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image src={v.heroImage} alt={v.heroImageAlt} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-[#050608]/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050608]/96" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.045]" style={{
            backgroundImage: "linear-gradient(rgba(131,145,190,1) 1px, transparent 1px), linear-gradient(90deg, rgba(131,145,190,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-24"
          style={{ y: contentY, opacity: contentOpacity }}>
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
            className="mt-6 text-[rgba(232,235,240,0.65)] leading-relaxed max-w-[36rem]"
            style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: ease }}>
            {v.storyCopy}
          </motion.p>
          <motion.div className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.82, ease: ease }}>
            <a href="mailto:signal@thesktr.com"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.5)] bg-[rgba(62,105,255,0.1)] text-blue mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              {v.cta.label}
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.18)] text-[rgba(232,235,240,0.55)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}>
              ← Back to SKTR
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Wave */}
        <div className="mt-10">
          <WaveMini waveSettings={v.waveSettings} />
        </div>

        {/* Section header */}
        <motion.div className="mt-20 pb-12 border-b border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, ease: ease }}>
          <p className="mono text-[rgba(232,235,240,0.38)] mb-4">{v.tag}</p>
          <h2 className="m-0 font-extrabold leading-[0.93] tracking-[-0.06em]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}>
            {v.story}
          </h2>
        </motion.div>

        {/* Work areas — full-width horizontal rows */}
        <div className="flex flex-col">
          {workAreas.map((area, i) => (
            <motion.div
              key={area.id}
              className="group grid grid-cols-1 md:grid-cols-[4.5rem_2px_1.2fr_1.8fr] items-start gap-0 py-8 border-b border-[rgba(131,145,190,0.12)] cursor-default"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: ease }}>
              {/* Number */}
              <span className="mono text-blue pt-1 pb-4 md:pb-0" style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}>
                {area.id}
              </span>
              {/* Vertical rule */}
              <div className="hidden md:block w-[2px] self-stretch mx-8 bg-[rgba(62,105,255,0.2)] group-hover:bg-[rgba(62,105,255,0.6)] transition-colors duration-300" />
              {/* Label + tag */}
              <div className="pr-8 pb-4 md:pb-0">
                <h3 className="m-0 mb-1 font-extrabold text-ink leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                  {area.label}
                </h3>
                <span className="mono text-[rgba(131,145,190,0.45)]" style={{ fontSize: "0.58rem", letterSpacing: "0.18em" }}>
                  {area.tag.toUpperCase()}
                </span>
              </div>
              {/* Description */}
              <p className="m-0 text-[rgba(232,235,240,0.5)] leading-[1.75] group-hover:text-[rgba(232,235,240,0.72)] transition-colors duration-300"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}>
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Methodology — three connected steps */}
        <motion.div className="mt-24"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: ease }}>
          <p className="mono text-[rgba(232,235,240,0.38)] mb-16" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            How we work
          </p>

          {/* Desktop: horizontal with connecting line */}
          <div className="hidden md:block relative">
            {/* Connecting line through all three circles */}
            <div className="absolute top-[1.75rem] left-[1.75rem] right-[1.75rem] h-[1px] bg-[rgba(62,105,255,0.25)]" />
            <div className="grid grid-cols-3 gap-8">
              {methodology.map((m, i) => (
                <motion.div key={m.step} className="flex flex-col gap-5"
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: ease }}>
                  {/* Circle */}
                  <div className="relative z-10 w-14 h-14 rounded-full border border-[rgba(62,105,255,0.5)] bg-[#050608] flex items-center justify-center">
                    <span className="mono text-blue" style={{ fontSize: "0.68rem", letterSpacing: "0.12em" }}>{m.step}</span>
                  </div>
                  <h3 className="m-0 font-extrabold text-ink tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)" }}>
                    {m.label}
                  </h3>
                  <p className="m-0 text-[rgba(232,235,240,0.5)] leading-[1.75]" style={{ fontSize: "0.92rem" }}>
                    {m.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stack */}
          <div className="md:hidden flex flex-col gap-0 border-l-2 border-[rgba(62,105,255,0.2)] pl-6">
            {methodology.map((m, i) => (
              <div key={m.step} className="relative pb-10 last:pb-0">
                <div className="absolute -left-[1.85rem] top-0 w-5 h-5 rounded-full border border-[rgba(62,105,255,0.5)] bg-[#050608] flex items-center justify-center">
                  <div className="w-[5px] h-[5px] rounded-full bg-blue" />
                </div>
                <p className="mono text-blue mb-2" style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}>{m.step}</p>
                <h3 className="m-0 mb-2 font-extrabold tracking-[-0.03em]" style={{ fontSize: "1.3rem" }}>{m.label}</h3>
                <p className="m-0 text-[rgba(232,235,240,0.5)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>{m.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Collaboration CTA */}
        <motion.div
          className="mt-20 p-[2.5rem_2rem] border border-[rgba(131,145,190,0.18)] bg-[rgba(11,13,18,0.5)]"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: ease }}>
          <p className="mono text-blue mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>Work with Labs</p>
          <h3 className="m-0 mb-4 font-extrabold leading-[0.98] tracking-[-0.05em]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}>
            Building something that belongs in this stack?
          </h3>
          <p className="m-0 mb-8 text-[rgba(232,235,240,0.52)] leading-[1.75] max-w-[44rem]"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}>
            Labs collaborates with researchers, engineers, and operators working on problems that intersect with the SKTR ecosystem. If you're building in performance, AI, or infrastructure — reach out.
          </p>
          <motion.a href="mailto:signal@thesktr.com"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.5)] bg-[rgba(62,105,255,0.08)] text-blue mono"
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
              { slug: "athletics", axisLabel: "Athletics", tag: "Performance", num: "01", description: "A performance ecosystem built around athletes — connecting development, coaching, analytics, and media." },
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
