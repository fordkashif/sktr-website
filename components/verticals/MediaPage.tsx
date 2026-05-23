"use client";
import { ease } from "@/lib/motion";
import type { Vertical } from "@/lib/verticals";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const formats = [
  {
    id: "01",
    label: "Editorial",
    description:
      "Longform writing, perspective, and analysis. Published when we have something worth saying — not on a content calendar.",
  },
  {
    id: "02",
    label: "Film & Video",
    description:
      "Documentaries, athlete profiles, and production work. Stories told with intent, not algorithm.",
  },
  {
    id: "03",
    label: "Brand & Production",
    description:
      "Content and production work for brands operating in the SKTR space. If the work is interesting, we're interested.",
  },
];

type SignupState = "idle" | "loading" | "success" | "error";

export default function MediaPage({ vertical: v }: { vertical: Vertical }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SignupState>("idle");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); setState("error"); return; }
      setState("success");
      setEmail("");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <>
      <Header />

      {/* Hero — full typography, no competing photo */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Dark background with subtle texture */}
        <div className="absolute inset-0 bg-[#040507]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 60%, rgba(62,105,255,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(62,105,255,0.05) 0%, transparent 40%)",
          }}
        />
        {/* Fine grain grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,235,240,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,235,240,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-28">
          <motion.p
            className="mono text-blue mb-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: ease }}
          >
            {v.kicker}
          </motion.p>

          {/* Oversized editorial headline */}
          <div style={{ overflow: "hidden" }}>
            <motion.h1
              className="m-0 font-extrabold tracking-[-0.07em] leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 11vw, 9.5rem)" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: ease }}
            >
              {v.title}
            </motion.h1>
          </div>

          {/* Tagline — editorial voice */}
          <motion.p
            className="mt-8 text-[rgba(232,235,240,0.6)] leading-relaxed max-w-[40rem]"
            style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: ease }}
          >
            {v.storyCopy}
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.88, ease: ease }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.2)] text-[rgba(232,235,240,0.6)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            >
              ← Back to SKTR
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-4 sm:left-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              className="w-[1px] bg-[rgba(232,235,240,0.2)]"
              initial={{ height: 0 }}
              animate={{ height: 36 }}
              transition={{ delay: 1.6, duration: 0.6, ease: ease }}
            />
            <span className="mono text-[rgba(232,235,240,0.25)]">Scroll</span>
          </motion.div>
        </div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* Pre-launch announcement */}
        <motion.div
          className="mt-10 py-5 border-y border-[rgba(131,145,190,0.15)] flex items-center justify-between gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, ease: ease }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="mono text-[rgba(232,235,240,0.45)]" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
              LAUNCHING SOON
            </span>
          </div>
          <span className="mono text-[rgba(232,235,240,0.28)]" style={{ fontSize: "0.65rem", letterSpacing: "0.16em" }}>
            Editorial · Film · Production
          </span>
        </motion.div>

        {/* What we make */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.38)] mb-4">What we make</p>
          <h2
            className="m-0 font-extrabold leading-[0.93] tracking-[-0.06em] max-w-[20ch]"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
          >
            {v.story}
          </h2>
        </motion.div>

        <div className="mt-12 flex flex-col border-t border-[rgba(131,145,190,0.15)]">
          {formats.map((f, i) => (
            <motion.div
              key={f.id}
              className="grid grid-cols-1 md:grid-cols-[5rem_1fr_1.8fr] gap-4 md:gap-12 py-10 border-b border-[rgba(131,145,190,0.12)]"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: ease }}
            >
              <span className="mono text-[rgba(232,235,240,0.22)]" style={{ fontSize: "0.68rem" }}>
                {f.id}
              </span>
              <h3
                className="m-0 font-extrabold leading-[1.05] tracking-[-0.04em] self-start"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
              >
                {f.label}
              </h3>
              <p
                className="m-0 text-[rgba(232,235,240,0.52)] leading-[1.8] self-start"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial point of view */}
        <motion.div
          className="mt-20 py-20 border-t border-b border-[rgba(131,145,190,0.15)] text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: ease }}
        >
          <p className="mono text-[rgba(232,235,240,0.28)] mb-8" style={{ fontSize: "0.66rem", letterSpacing: "0.28em" }}>
            EDITORIAL POSITION
          </p>
          <h2
            className="m-0 font-extrabold leading-[0.95] tracking-[-0.06em] mx-auto"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", maxWidth: "22ch" }}
          >
            Most content fills time. We make things worth keeping.
          </h2>
          <p
            className="mt-8 mx-auto text-[rgba(232,235,240,0.48)] leading-[1.75]"
            style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)", maxWidth: "42rem" }}
          >
            SKTR Media isn't a content machine. We publish selectively, produce with intention, and work with people who care about the quality of what they put out — not the volume.
          </p>
        </motion.div>

        {/* Notify me — pre-launch email capture */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: ease }}
        >
          <div>
            <p className="mono text-blue mb-4" style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}>
              Be first
            </p>
            <h3
              className="m-0 font-extrabold leading-[0.97] tracking-[-0.05em]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Get notified when we launch.
            </h3>
          </div>

          <div>
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mono text-blue mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.14em" }}>
                    You&apos;re on the list
                  </p>
                  <p className="text-[rgba(232,235,240,0.55)]" style={{ fontSize: "0.95rem" }}>
                    We&apos;ll reach out when SKTR Media goes live.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="flex flex-col gap-3"
                  onSubmit={handleSignup}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                      required
                      disabled={state === "loading"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 min-w-0 min-h-[3rem] px-4 bg-transparent text-ink text-[0.9rem] outline-none border border-[rgba(131,145,190,0.22)] placeholder:text-[rgba(232,235,240,0.25)] focus:border-[rgba(62,105,255,0.6)] transition-colors duration-200 disabled:opacity-40"
                    />
                    <motion.button
                      type="submit"
                      disabled={state === "loading"}
                      className="shrink-0 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.5)] bg-[rgba(62,105,255,0.08)] mono text-blue cursor-pointer disabled:opacity-40"
                      style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
                      whileHover={{ backgroundColor: "rgba(62,105,255,0.18)" }}
                      transition={{ duration: 0.15 }}
                    >
                      {state === "loading" ? "…" : "Notify me"}
                    </motion.button>
                  </div>
                  {state === "error" && (
                    <motion.p
                      className="mono m-0"
                      style={{ fontSize: "0.78rem", color: "rgba(255,90,90,0.85)" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <p className="mt-4 text-[rgba(232,235,240,0.32)] leading-snug" style={{ fontSize: "0.8rem" }}>
              Or reach us at{" "}
              <motion.a
                href="mailto:signal@thesktr.com"
                className="text-[rgba(232,235,240,0.45)]"
                whileHover={{ color: "#3e69ff" }}
                transition={{ duration: 0.15 }}
              >
                signal@thesktr.com
              </motion.a>
            </p>
          </div>
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
