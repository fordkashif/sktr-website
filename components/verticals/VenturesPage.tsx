"use client";
import { ease } from "@/lib/motion";
import type { Vertical } from "@/lib/verticals";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const thesis = [
  {
    num: "01",
    heading: "Ecosystems outlast products.",
    body: "A platform that connects multiple categories creates value that isolated companies cannot. We invest in things that become more valuable as the ecosystem around them grows.",
  },
  {
    num: "02",
    heading: "Operators matter more than ideas.",
    body: "The best investment isn't the best pitch — it's the right person in the right environment. We back operators with the conviction and discipline to build over a decade.",
  },
  {
    num: "03",
    heading: "Patience is structural, not stylistic.",
    body: "We're not patient because it sounds good. We're built for it — no fund timeline forcing exits, no LP pressure pushing premature decisions.",
  },
];

const lookingFor = [
  { label: "Operators, not just founders", body: "People who've built before or who understand the unsexy work of building infrastructure." },
  { label: "Ecosystem fit", body: "Products and platforms that gain something real from being inside the SKTR network — not just capital." },
  { label: "Long-horizon problems", body: "Companies solving things that take time. We're not the right partner for a 12-month sprint to exit." },
];

const ecosystemValue = [
  { label: "SKTR Labs", body: "Access to infrastructure, tooling, and R&D built specifically for the performance and technology verticals." },
  { label: "SKTR Athletics", body: "Distribution into a real coaching and athlete network — tested at the operator level, not theoretically." },
  { label: "SKTR Media", body: "Narrative and editorial reach to shape how your company is perceived within the ecosystem and beyond." },
];

export default function VenturesPage({ vertical: v }: { vertical: Vertical }) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <>
      <Header />

      {/* Hero — quieter, more text-forward */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <Image
            src={v.heroImage}
            alt={v.heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          {/* Heavy dark overlay — photo is ambient, words are primary */}
          <div className="absolute inset-0 bg-[#050608]/78" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/10 to-[#050608]/94" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050608] to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-28"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <motion.p
            className="mono text-blue mb-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: ease }}
          >
            {v.kicker}
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="m-0 font-extrabold tracking-[-0.07em] leading-[0.9]"
              style={{ fontSize: "clamp(3.2rem, 8.5vw, 7rem)" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: ease }}
            >
              {v.title}
            </motion.h1>
          </div>

          {/* Ventures gets more copy in the hero — the thesis begins here */}
          <motion.p
            className="mt-7 text-[rgba(232,235,240,0.62)] leading-relaxed max-w-[42rem]"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: ease }}
          >
            {v.storyCopy}
          </motion.p>

          <motion.div
            className="mt-9 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9, ease: ease }}
          >
            <a
              href="mailto:signal@thesktr.com"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.48)] bg-[rgba(62,105,255,0.08)] text-blue mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              {v.cta.label}
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.18)] text-[rgba(232,235,240,0.55)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              ← Back to SKTR
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Status strip */}
        <motion.div
          className="mt-10 py-5 border-y border-[rgba(131,145,190,0.15)] flex items-center justify-between gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: ease }}
        >
          <span className="mono text-[rgba(232,235,240,0.38)]" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            SKTR VENTURES — BUILDING TOWARD FUND
          </span>
          <span className="mono text-[rgba(232,235,240,0.22)]" style={{ fontSize: "0.65rem", letterSpacing: "0.16em" }}>
            Selective · Ecosystem-aligned · Long-term
          </span>
        </motion.div>

        {/* Investment thesis */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-4">{v.tag}</p>
          <h2
            className="m-0 font-extrabold leading-[0.93] tracking-[-0.06em] max-w-[18ch]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
          >
            {v.story}
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col border-t border-[rgba(131,145,190,0.15)]">
          {thesis.map((t, i) => (
            <motion.div
              key={t.num}
              className="grid grid-cols-1 md:grid-cols-[5rem_1fr_1.6fr] gap-4 md:gap-12 py-10 border-b border-[rgba(131,145,190,0.12)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: ease }}
            >
              <span className="mono text-[rgba(232,235,240,0.22)]" style={{ fontSize: "0.68rem" }}>
                {t.num}
              </span>
              <h3
                className="m-0 font-extrabold leading-[1.05] tracking-[-0.04em] self-start"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)" }}
              >
                {t.heading}
              </h3>
              <p
                className="m-0 text-[rgba(232,235,240,0.52)] leading-[1.8]"
                style={{ fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)" }}
              >
                {t.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* What we look for */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-10" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            What we look for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(131,145,190,0.12)]">
            {lookingFor.map((item, i) => (
              <motion.div
                key={item.label}
                className="bg-[#050608] p-[1.8rem_1.6rem]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: ease }}
              >
                <h3
                  className="m-0 mb-4 font-extrabold text-ink leading-[1.08] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
                >
                  {item.label}
                </h3>
                <p className="m-0 text-[rgba(232,235,240,0.52)] leading-[1.75]" style={{ fontSize: "0.9rem" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What the ecosystem offers */}
        <motion.div
          className="mt-20 pt-10 border-t border-[rgba(131,145,190,0.15)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-3" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            Beyond capital
          </p>
          <h2
            className="m-0 mb-10 font-extrabold leading-[0.94] tracking-[-0.06em] max-w-[24ch]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            What being inside the SKTR ecosystem actually means.
          </h2>

          <div className="flex flex-col border-t border-[rgba(131,145,190,0.15)]">
            {ecosystemValue.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 py-7 border-b border-[rgba(131,145,190,0.1)]"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: ease }}
              >
                <span
                  className="mono text-blue shrink-0"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.14em", minWidth: "9rem" }}
                >
                  {item.label}
                </span>
                <p className="m-0 text-[rgba(232,235,240,0.55)] leading-[1.75]" style={{ fontSize: "0.95rem" }}>
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-20 p-[2.5rem_2rem] border border-[rgba(131,145,190,0.18)] bg-[rgba(11,13,18,0.5)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-blue mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
            Get in touch
          </p>
          <h3
            className="m-0 mb-4 font-extrabold leading-[0.97] tracking-[-0.05em]"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)" }}
          >
            Building something worth a decade of conviction?
          </h3>
          <p
            className="m-0 mb-8 text-[rgba(232,235,240,0.52)] leading-[1.75] max-w-[44rem]"
            style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
          >
            We don't need a deck. Tell us what you're building, how you think, and why it takes time to get right. If there's a fit with the SKTR ecosystem, we'll respond.
          </p>
          <motion.a
            href="mailto:signal@thesktr.com"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.5)] bg-[rgba(62,105,255,0.08)] text-blue mono"
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
              { slug: "athletics", axisLabel: "Athletics", tag: "Performance", num: "01", description: "A performance ecosystem built around athletes — connecting development, coaching, analytics, and media." },
              { slug: "labs", axisLabel: "Labs", tag: "Research", num: "02", description: "Research, prototyping, and applied invention — the engine that builds shared tools and infrastructure." },
              { slug: "media", axisLabel: "Media", tag: "Editorial", num: "03", description: "Editorial, film, and distribution — how the SKTR ecosystem earns an audience and shapes culture." },
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
