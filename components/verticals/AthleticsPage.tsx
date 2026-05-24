"use client";
import { ease } from "@/lib/motion";
import type { Vertical } from "@/lib/verticals";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WaveMini from "@/components/WaveMini";

/* ─── Page-specific data ─── */

const stats = [
  { value: "40+", label: "Athletes coached" },
  { value: "12", label: "Countries represented" },
  { value: "200+", label: "Competitions tracked" },
  { value: "6", label: "Years of development infrastructure" },
];

const processSteps = [
  {
    num: "01",
    title: "Apply",
    body: "Tell us where you are and where you're trying to get. A short application — not a lengthy intake form. Just enough to start the right conversation.",
  },
  {
    num: "02",
    title: "Assessment",
    body: "A detailed performance review with your SKTR coach — training history, movement quality, competition data, and real goals. Not a fitness test. A full read.",
  },
  {
    num: "03",
    title: "Programme",
    body: "Your coach builds a regime specifically for you. Periodisation structure, loading targets, development milestones — a real plan, not an adapted template.",
  },
  {
    num: "04",
    title: "Train & track",
    body: "You're in the system. Sessions logged in SKTR Coach, data shared with your coach in real time. The programme adapts as you progress.",
  },
];

const coaches = [
  {
    role: "Director of Performance",
    credentials: "IAAF Level 5 — 18 years international",
    specialization: "Sprint mechanics · Championship periodisation · National programme development",
    bio: "Career spanning Caribbean, European, and North American athletics programmes. Has designed development systems for national team athletes across four federations, from youth to senior elite.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: "Head of Strength & Conditioning",
    credentials: "NSCA-CSCS · BSc Sport Science",
    specialization: "Force development · Plyometrics · Injury prevention",
    bio: "Former professional sprinter turned coach. Brings first-hand elite experience to every programme — training athletes from development stage through to international competition across three continents.",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=800&q=80",
  },
  {
    role: "Performance Scientist",
    credentials: "MSc Applied Sport Science",
    specialization: "Load monitoring · Recovery modelling · Competition readiness",
    bio: "Specialist in translating performance data into actionable coaching decisions. Oversees all SKTR Coach analytics — ensuring data drives the coaching, not decorates a dashboard.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
  {
    quote: "Working with SKTR Athletics changed how I understand my training. Not just working harder — working inside a system that shows you exactly where to focus and why.",
    name: "A.C.",
    event: "100m / 200m Sprinter",
  },
  {
    quote: "The coaching and the app together means my coach and I are always looking at the same picture. Every decision is informed. Nothing gets guessed.",
    name: "M.T.",
    event: "400m Specialist",
  },
  {
    quote: "I had good results for years, but no real structure behind them. Eight months into SKTR and I finally understand what development actually looks like.",
    name: "D.R.",
    event: "Multi-event athlete",
  },
];

const coachCapabilities = [
  { id: "01", label: "Training regime builder", body: "Design, assign, and adjust programmes for individual athletes or full squads from one workspace." },
  { id: "02", label: "Performance assessment", body: "Evaluate athlete output against set targets — load, output, and trend data in a single view." },
  { id: "03", label: "Growth tracking", body: "Session-by-session and career-arc progress. See what's compounding and what needs attention." },
  { id: "04", label: "Roster management", body: "Every athlete, every log, every metric accessible from one dashboard — not spread across tools." },
];

const athleteCapabilities = [
  { id: "01", label: "Complete training history", body: "Every session logged and accessible across your entire career, not just this season." },
  { id: "02", label: "Performance metrics", body: "Visualise your growth over time. See exactly where you've improved and where the next gains are." },
  { id: "03", label: "Load & recovery data", body: "Stay ahead of overtraining. You and your coach see the same picture — decisions made on real data." },
  { id: "04", label: "Long-arc development", body: "A career is a compound system. SKTR Coach shows you the trajectory, not just the snapshot." },
];

const credentialItems = ["International coaching network", "Performance analytics", "Athlete development", "Media & narrative"];

/* ─── Component ─── */

export default function AthleticsPage({ vertical: v }: { vertical: Vertical }) {
  const heroRef = useRef<HTMLElement>(null);
  const midImageRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(heroScroll, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(heroScroll, [0, 0.55], [1, 0]);
  const contentY = useTransform(heroScroll, [0, 1], ["0%", "12%"]);

  const { scrollYProgress: midScroll } = useScroll({ target: midImageRef, offset: ["start end", "end start"] });
  const midBgY = useTransform(midScroll, [0, 1], ["-18%", "18%"]);
  const midTextY = useTransform(midScroll, [0, 1], ["10%", "-10%"]);

  const { scrollYProgress: pillarsScroll } = useScroll({ target: pillarsRef, offset: ["start center", "end center"] });
  const pillarsLineH = useTransform(pillarsScroll, [0, 1], ["0%", "100%"]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const [role, setRole] = useState<"athlete" | "coach">("athlete");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/coach-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setFormStatus("error");
      } else {
        setFormStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.");
      setFormStatus("error");
    }
  }

  return (
    <>
      <Header />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
          <Image src={v.heroImage} alt={v.heroImageAlt} fill sizes="100vw" className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/96 via-[#050608]/65 to-[#050608]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/10 to-[#050608]/92" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] to-transparent" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] pb-16 sm:pb-24"
          style={{ y: contentY, opacity: contentOpacity }}>
          <motion.p
            className="mono text-blue mb-4"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}>
            {v.kicker}
          </motion.p>
          <motion.h1
            className="m-0 font-extrabold tracking-[-0.07em] leading-[0.9]"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}>
            {v.title}
          </motion.h1>
          <motion.p
            className="mt-6 text-[rgba(232,235,240,0.72)] leading-relaxed max-w-[38rem]"
            style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}>
            An athlete development company. We build the coaching infrastructure, performance systems, and analytical layer behind elite athletes — connecting every part of development into one operating model.
          </motion.p>
          <motion.div
            className="mt-8 flex gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.82, ease }}>
            <motion.a href="#apply"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 32px rgba(62,105,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              Apply to SKTR Athletics
            </motion.a>
            <motion.a href="#coach"
              className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.2)] text-[rgba(232,235,240,0.6)] mono"
              style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
              whileHover={{ borderColor: "rgba(86,118,255,0.5)", color: "rgba(232,235,240,0.9)" }}
              transition={{ duration: 0.15 }}>
              SKTR Coach app →
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <main className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 pb-24">

        {/* ── Credential strip ── */}
        <motion.div
          className="mt-10 py-5 border-y border-[rgba(131,145,190,0.15)] flex flex-wrap items-center gap-x-8 gap-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}>
          {credentialItems.map((item, i) => (
            <motion.div key={item} className="flex items-center gap-3"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}>
              {i > 0 && (
                <motion.span className="text-[rgba(131,145,190,0.2)] hidden sm:block"
                  variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } } }}>
                  ·
                </motion.span>
              )}
              <span className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.66rem", letterSpacing: "0.2em" }}>
                {item.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Wave ── */}
        <motion.div className="mt-10"
          initial={{ opacity: 0, scaleX: 0.92 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease }}>
          <WaveMini waveSettings={v.waveSettings} />
        </motion.div>

        {/* ── What SKTR Athletics is ── */}
        <div className="mt-20 pb-20 border-b border-[rgba(131,145,190,0.15)]">
          <motion.p className="mono text-[rgba(232,235,240,0.35)] mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease }}>
            {v.tag}
          </motion.p>
          <motion.div
            className="mb-6 h-[1px] bg-blue origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            style={{ width: "clamp(3rem, 5vw, 4.5rem)" }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.h2
              className="m-0 font-extrabold leading-[0.92] tracking-[-0.07em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.1, ease }}>
              We build the infrastructure behind athletes who are serious about the long game.
            </motion.h2>

            {/* Video — drop your Envato file at /public/videos/athletics.mp4 */}
            <motion.div
              className="relative overflow-hidden w-full"
              style={{ aspectRatio: "16 / 9" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.85, delay: 0.2, ease }}>
              <video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                controls
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/20 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/30 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Pillars */}
          <div ref={pillarsRef} className="relative flex flex-col mt-14">
            <div className="absolute left-[4.5rem] top-0 bottom-0 w-[2px] bg-[rgba(62,105,255,0.06)] hidden md:block" />
            <motion.div
              className="absolute left-[4.5rem] top-0 w-[2px] bg-blue hidden md:block origin-top"
              style={{ height: pillarsLineH }}
            />
            {v.pillars.map((pillar, i) => (
              <motion.div
                key={pillar.heading}
                className="group grid grid-cols-1 md:grid-cols-[4.5rem_2px_1.2fr_1.8fr] items-start gap-0 py-8 border-b border-[rgba(131,145,190,0.12)] cursor-default last:border-0"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}>
                <motion.span
                  className="mono text-blue pt-1 pb-4 md:pb-0"
                  style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}>
                  0{i + 1}
                </motion.span>
                <div className="hidden md:block w-[2px] self-stretch mx-8 bg-transparent" />
                <motion.div className="pr-8 pb-4 md:pb-0"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.15, ease }}>
                  <h3 className="m-0 font-extrabold text-ink leading-[1.05] tracking-[-0.03em]"
                    style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)" }}>
                    {pillar.heading}
                  </h3>
                </motion.div>
                <motion.p
                  className="m-0 text-[rgba(232,235,240,0.5)] leading-[1.75] group-hover:text-[rgba(232,235,240,0.72)] transition-colors duration-300"
                  style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.25, ease }}>
                  {pillar.body}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Impact numbers ── */}
        <div className="py-16 border-b border-[rgba(131,145,190,0.12)]">
          <motion.p
            className="mono text-[rgba(232,235,240,0.28)] mb-10"
            style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease }}>
            SCALE & REACH
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="border-r border-[rgba(131,145,190,0.12)] last:border-0 pr-8 lg:pr-0 lg:pl-8 first:pl-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease }}>
                <p className="m-0 font-extrabold tracking-[-0.06em] text-ink leading-none mb-3"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
                  {stat.value}
                </p>
                <p className="m-0 mono text-[rgba(232,235,240,0.32)]"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}>
                  {stat.label.toUpperCase()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="py-20 border-b border-[rgba(131,145,190,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <motion.p
                className="mono text-[rgba(232,235,240,0.28)] mb-4"
                style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease }}>
                THE PROCESS
              </motion.p>
              <motion.h2
                className="m-0 font-extrabold tracking-[-0.06em] leading-[0.92]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.8, ease }}>
                How it works.
              </motion.h2>
            </div>
            <motion.p
              className="text-[rgba(232,235,240,0.42)] leading-[1.75] sm:max-w-[28rem]"
              style={{ fontSize: "0.9rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}>
              From first contact to active development, the SKTR Athletics process is structured to move quickly and get an athlete into a working system without wasted time.
            </motion.p>
          </div>
          {/* Connector line (desktop) */}
          <div className="hidden lg:flex items-center mt-14 mb-0 px-0">
            {processSteps.map((step, i) => (
              <div key={step.num} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  className="w-2 h-2 rounded-full bg-blue shrink-0"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.15, ease }}
                />
                {i < processSteps.length - 1 && (
                  <motion.div
                    className="flex-1 h-[1px] bg-[rgba(62,105,255,0.2)] origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.15, ease }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t-0 lg:border-t-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                className="pt-8 pb-8 lg:pr-10 border-b sm:border-b-0 border-[rgba(131,145,190,0.1)] last:border-0 flex flex-col gap-5"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease }}>
                <span className="mono text-[rgba(62,105,255,0.5)]" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>
                  {step.num}
                </span>
                <p className="m-0 font-extrabold text-ink tracking-[-0.04em] leading-[1.05]"
                  style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)" }}>
                  {step.title}
                </p>
                <p className="m-0 text-[rgba(232,235,240,0.48)] leading-[1.8]"
                  style={{ fontSize: "0.88rem" }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Expert coaches ── */}
        <div className="py-20 border-b border-[rgba(131,145,190,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <motion.p
                className="mono text-[rgba(232,235,240,0.28)] mb-4"
                style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease }}>
                THE COACHING STAFF
              </motion.p>
              <motion.h2
                className="m-0 font-extrabold tracking-[-0.06em] leading-[0.92]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.8, ease }}>
                International experience. Individual focus.
              </motion.h2>
            </div>
            <motion.p
              className="text-[rgba(232,235,240,0.42)] leading-[1.75] sm:max-w-[28rem]"
              style={{ fontSize: "0.9rem" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.6, delay: 0.2, ease }}>
              Every SKTR Athletics coach brings international-level credentials and real competition experience. No generic programming. No rotational staff.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {coaches.map((coach, i) => (
              <motion.div
                key={coach.role}
                className="relative overflow-hidden border-r border-[rgba(131,145,190,0.1)] last:border-0"
                style={{ aspectRatio: "1 / 1" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}>
                {/* Portrait */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}>
                  <Image
                    src={coach.image}
                    alt={coach.role}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                </motion.div>
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-[#050608]/10" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/30 to-transparent" />
                {/* Text */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-7"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.6, delay: i * 0.15 + 0.3, ease }}>
                  <p className="m-0 mono text-[rgba(62,105,255,0.7)] mb-3" style={{ fontSize: "0.58rem", letterSpacing: "0.2em" }}>
                    0{i + 1}
                  </p>
                  <p className="m-0 font-extrabold text-ink tracking-[-0.04em] leading-[1.1] mb-1"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
                    {coach.role}
                  </p>
                  <p className="m-0 mono text-blue mb-4" style={{ fontSize: "0.58rem", letterSpacing: "0.14em" }}>
                    {coach.credentials}
                  </p>
                  <p className="m-0 text-[rgba(232,235,240,0.5)] leading-[1.75]" style={{ fontSize: "0.83rem" }}>
                    {coach.bio}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mid-page visual break (parallax) ── */}
        <motion.div
          ref={midImageRef}
          className="mt-20 relative overflow-hidden"
          style={{ height: 460 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease }}>
          <motion.div className="absolute inset-0" style={{ y: midBgY }}>
            <Image
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=80"
              alt="Athletes training together"
              fill sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#050608]/68" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 to-transparent" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8"
            style={{ y: midTextY }}>
            <motion.p
              className="mono text-[rgba(232,235,240,0.35)] mb-4"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease }}>
              THE OPERATING LAYER
            </motion.p>
            <motion.p
              className="m-0 font-extrabold tracking-[-0.06em] leading-[0.92] text-ink max-w-[22rem]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}>
              Every athlete. Every session. Every metric.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ── Testimonials carousel ── */}
        <motion.div
          className="py-20 border-b border-[rgba(131,145,190,0.12)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease }}>
          <div className="flex items-center justify-between mb-10">
            <p className="mono text-[rgba(232,235,240,0.28)] m-0" style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}>
              FROM THE ATHLETES
            </p>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="w-6 h-[2px] transition-all duration-300 cursor-pointer"
                  style={{ background: i === activeTestimonial ? "rgba(62,105,255,1)" : "rgba(131,145,190,0.2)" }}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -48 }}
                transition={{ duration: 0.55, ease }}>
                <p className="m-0 font-extrabold text-[rgba(62,105,255,0.2)] leading-none mb-6" style={{ fontSize: "5rem" }}>&ldquo;</p>
                <p className="m-0 font-extrabold text-ink tracking-[-0.04em] leading-[1.15] mb-8 max-w-[52rem]"
                  style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)" }}>
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-[rgba(62,105,255,0.5)]" />
                  <div>
                    <p className="m-0 font-semibold text-ink" style={{ fontSize: "0.9rem" }}>
                      {testimonials[activeTestimonial].name}
                    </p>
                    <p className="m-0 mono text-[rgba(232,235,240,0.35)]" style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}>
                      {testimonials[activeTestimonial].event.toUpperCase()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── SKTR Coach ── */}
        <section id="coach" className="mt-24">

          {/* Coach header */}
          <div className="pb-12 border-b border-[rgba(86,118,255,0.2)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease }}>
              <motion.span
                className="mono text-blue border border-[rgba(86,118,255,0.4)] px-3 py-1 inline-block mb-7"
                style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
                animate={{ borderColor: ["rgba(86,118,255,0.4)", "rgba(86,118,255,0.85)", "rgba(86,118,255,0.4)"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                BUILT BY SKTR LABS
              </motion.span>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <motion.h2
                className="m-0 font-extrabold tracking-[-0.07em] leading-[0.92]"
                style={{ fontSize: "clamp(3.2rem, 7vw, 6.5rem)" }}
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.9, ease }}>
                SKTR Coach.
              </motion.h2>
              <motion.p
                className="text-[rgba(232,235,240,0.55)] leading-[1.75] lg:max-w-[30rem]"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.7, delay: 0.25, ease }}>
                The operating platform built specifically for SKTR Athletics — connecting coaches and their teams with individual athletes through one intelligent system.
              </motion.p>
            </div>
          </div>

          {/* Platform image panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <motion.div
              className="relative overflow-hidden min-h-[420px] sm:min-h-[520px] border-b sm:border-b-0 sm:border-r border-[rgba(131,145,190,0.12)]"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease }}>
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}>
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                  alt="Coach web dashboard on laptop"
                  fill sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-[#050608]/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/20 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-7 sm:p-8"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: 0.25, ease }}>
                <p className="mono text-blue mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>COACHES — WEB INTERFACE</p>
                <p className="m-0 font-extrabold text-ink tracking-[-0.04em] leading-snug mb-2" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                  Manage your squad from any browser.
                </p>
                <p className="m-0 text-[rgba(232,235,240,0.48)] leading-relaxed" style={{ fontSize: "0.84rem" }}>
                  Set regimes, assess performance, track every athlete. Your team signs into your squad on the app — coach stays on web.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative overflow-hidden min-h-[420px] sm:min-h-[520px]"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.9, ease }}>
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}>
                <Image
                  src="https://images.unsplash.com/photo-1695973056909-67189edc1c9e?auto=format&fit=crop&w=1200&q=80"
                  alt="Athlete mobile app on smartphone"
                  fill sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-[#050608]/10" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-7 sm:p-8"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.65, delay: 0.3, ease }}>
                <p className="mono text-blue mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>ATHLETES — MOBILE APP</p>
                <p className="m-0 font-extrabold text-ink tracking-[-0.04em] leading-snug mb-2" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                  Your training, always in your pocket.
                </p>
                <p className="m-0 text-[rgba(232,235,240,0.48)] leading-relaxed mb-5" style={{ fontSize: "0.84rem" }}>
                  Whether on a coached squad or working directly with SKTR Athletics — complete training history, metrics, and growth on iOS and Android.
                </p>
                <div className="flex gap-3 flex-wrap items-center">
                  <img src="/badge-app-store.svg" alt="Download on the App Store" height={34} style={{ height: 34, width: "auto", opacity: 0.55 }} />
                  <img src="/badge-google-play.svg" alt="Get it on Google Play" height={34} style={{ height: 34, width: "auto", opacity: 0.55 }} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[rgba(131,145,190,0.12)]">
            <div className="py-10 lg:pr-14 border-b lg:border-b-0 lg:border-r border-[rgba(131,145,190,0.12)]">
              <motion.p
                className="mono text-[rgba(232,235,240,0.28)] mb-8"
                style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease }}>
                COACH CAPABILITIES
              </motion.p>
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
                {coachCapabilities.map((item) => (
                  <motion.div
                    key={item.id}
                    className="grid grid-cols-[2.5rem_1fr] py-5 border-b border-[rgba(131,145,190,0.08)] last:border-0"
                    variants={{ hidden: { opacity: 0, x: -40, y: 10 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease } } }}>
                    <span className="mono text-[rgba(62,105,255,0.38)] pt-[3px]" style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}>{item.id}</span>
                    <div>
                      <p className="m-0 mb-1 font-semibold text-ink" style={{ fontSize: "0.93rem" }}>{item.label}</p>
                      <p className="m-0 text-[rgba(232,235,240,0.42)] leading-[1.7]" style={{ fontSize: "0.84rem" }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <div className="py-10 lg:pl-14">
              <motion.p
                className="mono text-[rgba(232,235,240,0.28)] mb-8"
                style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease }}>
                ATHLETE CAPABILITIES
              </motion.p>
              <motion.div
                className="flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
                {athleteCapabilities.map((item) => (
                  <motion.div
                    key={item.id}
                    className="grid grid-cols-[2.5rem_1fr] py-5 border-b border-[rgba(131,145,190,0.08)] last:border-0"
                    variants={{ hidden: { opacity: 0, x: 40, y: 10 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease } } }}>
                    <span className="mono text-[rgba(62,105,255,0.38)] pt-[3px]" style={{ fontSize: "0.6rem", letterSpacing: "0.14em" }}>{item.id}</span>
                    <div>
                      <p className="m-0 mb-1 font-semibold text-ink" style={{ fontSize: "0.93rem" }}>{item.label}</p>
                      <p className="m-0 text-[rgba(232,235,240,0.42)] leading-[1.7]" style={{ fontSize: "0.84rem" }}>{item.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Early access */}
          <motion.div
            id="apply"
            className="border-x border-b border-[rgba(86,118,255,0.2)] bg-[rgba(62,105,255,0.03)]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease }}>
            {formStatus === "success" ? (
              <motion.div
                className="p-8 sm:p-12 flex flex-col items-start gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <span className="mono text-blue border border-[rgba(86,118,255,0.4)] px-3 py-1" style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}>
                  YOU&apos;RE ON THE LIST
                </span>
                <p className="m-0 font-extrabold tracking-[-0.05em] text-ink" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                  We&apos;ll be in touch.
                </p>
                <p className="m-0 text-[rgba(232,235,240,0.52)] max-w-[38rem]" style={{ fontSize: "0.95rem", lineHeight: "1.75" }}>
                  {role === "coach"
                    ? "You're on the early access list for the SKTR Coach web platform. We'll reach out directly when we're ready to onboard your team."
                    : "Your application is received. An SKTR Athletics coach will be in touch to schedule your assessment."}
                </p>
              </motion.div>
            ) : (
              <div className="p-8 sm:p-12">
                <p className="mono text-blue mb-2" style={{ fontSize: "0.62rem", letterSpacing: "0.2em" }}>GET STARTED</p>
                <p className="text-[rgba(232,235,240,0.35)] mb-8" style={{ fontSize: "0.85rem" }}>
                  Choose your path below. Coaches get the web platform. Athletes start the assessment process.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {([
                    {
                      value: "coach" as const,
                      label: "I coach a team",
                      sub: "Web platform — manage athletes, assign regimes, track squad performance from a single dashboard.",
                      platform: "Web Interface",
                    },
                    {
                      value: "athlete" as const,
                      label: "I'm an individual athlete",
                      sub: "Apply to work directly with SKTR Athletics. An assessment call with your coach follows.",
                      platform: null,
                    },
                  ]).map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`text-left p-5 border transition-all duration-150 ${
                        role === opt.value
                          ? "border-[rgba(86,118,255,0.55)] bg-[rgba(62,105,255,0.09)]"
                          : "border-[rgba(131,145,190,0.15)] hover:border-[rgba(131,145,190,0.28)]"
                      }`}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className="m-0 font-semibold text-ink leading-snug" style={{ fontSize: "0.95rem" }}>{opt.label}</p>
                        <div className={`shrink-0 w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center transition-colors duration-150 ${
                          role === opt.value ? "border-blue" : "border-[rgba(131,145,190,0.3)]"
                        }`}>
                          {role === opt.value && (
                            <motion.div
                              className="w-2 h-2 rounded-full bg-blue"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            />
                          )}
                        </div>
                      </div>
                      <p className="m-0 mb-3 text-[rgba(232,235,240,0.4)] leading-snug" style={{ fontSize: "0.82rem" }}>{opt.sub}</p>
                      {opt.platform ? (
                        <span className="mono text-[rgba(62,105,255,0.6)] border border-[rgba(62,105,255,0.2)] px-2 py-0.5" style={{ fontSize: "0.58rem", letterSpacing: "0.16em" }}>
                          {opt.platform}
                        </span>
                      ) : (
                        <div className="flex gap-2 flex-wrap items-center">
                          <img src="/badge-app-store.svg" alt="App Store" height={26} style={{ height: 26, width: "auto", opacity: 0.5 }} />
                          <img src="/badge-google-play.svg" alt="Google Play" height={26} style={{ height: 26, width: "auto", opacity: 0.5 }} />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.h3
                  className="m-0 mb-6 font-extrabold tracking-[-0.05em] leading-[1]"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
                  key={role}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}>
                  {role === "coach" ? "Get your team on SKTR Coach." : "Apply to SKTR Athletics."}
                </motion.h3>

                <form onSubmit={handleWaitlist} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-transparent border border-[rgba(131,145,190,0.2)] px-4 py-3 text-ink placeholder-[rgba(232,235,240,0.22)] focus:outline-none focus:border-[rgba(86,118,255,0.5)] transition-colors"
                      style={{ fontSize: "0.9rem" }}
                      whileFocus={{ borderColor: "rgba(86,118,255,0.5)" }}
                    />
                    <motion.input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-transparent border border-[rgba(131,145,190,0.2)] px-4 py-3 text-ink placeholder-[rgba(232,235,240,0.22)] focus:outline-none focus:border-[rgba(86,118,255,0.5)] transition-colors"
                      style={{ fontSize: "0.9rem" }}
                      whileFocus={{ borderColor: "rgba(86,118,255,0.5)" }}
                    />
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <motion.button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue mono disabled:opacity-50 cursor-pointer"
                      style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(62,105,255,0.4)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                      {formStatus === "loading" ? "Sending…" : role === "coach" ? "Request platform access" : "Submit application"}
                    </motion.button>
                    {formStatus === "error" && (
                      <motion.p
                        className="text-[rgba(255,100,100,0.8)] m-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ fontSize: "0.85rem" }}>
                        {errorMsg}
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </section>

        {/* ── Partner CTA ── */}
        <motion.div
          className="mt-20 pt-10 border-t border-[rgba(131,145,190,0.2)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease }}>
          <div>
            <motion.p
              className="mono text-[rgba(232,235,240,0.35)] mb-2"
              style={{ fontSize: "0.68rem" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}>
              Work with Athletics
            </motion.p>
            <motion.h3
              className="m-0 font-extrabold tracking-[-0.04em] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.2, ease }}>
              {v.cta.label}
            </motion.h3>
          </div>
          <motion.a
            href="mailto:signal@thesktr.com"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(86,118,255,0.46)] bg-[rgba(62,105,255,0.08)] text-blue mono shrink-0"
            style={{ fontSize: "0.85rem", letterSpacing: "0.04em" }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            whileHover={{ backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.7)", x: 4 }}
            whileTap={{ scale: 0.97 }}>
            signal@thesktr.com →
          </motion.a>
        </motion.div>

        {/* ── Other verticals ── */}
        <motion.div
          className="mt-16 pt-8 border-t border-[rgba(131,145,190,0.15)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}>
          <motion.p
            className="mono text-[rgba(232,235,240,0.28)] mb-6"
            style={{ fontSize: "0.68rem", letterSpacing: "0.2em" }}
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
            Explore the ecosystem
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: "labs", axisLabel: "Labs", tag: "Research", num: "02", description: "Research, prototyping, and applied invention — the engine that builds shared tools and infrastructure." },
              { slug: "media", axisLabel: "Media", tag: "Editorial", num: "03", description: "Editorial, film, and distribution — how the SKTR ecosystem earns an audience and shapes culture." },
              { slug: "ventures", axisLabel: "Ventures", tag: "Capital", num: "04", description: "Patient, selective capital deployed behind operators and platforms that strengthen the ecosystem." },
            ].map((vert) => (
              <motion.div
                key={vert.slug}
                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}>
                <Link
                  href={`/${vert.slug}`}
                  className="group flex flex-col gap-3 p-5 border border-[rgba(131,145,190,0.15)] hover:border-[rgba(86,118,255,0.4)] hover:bg-[#0f1219] transition-all duration-200 h-full">
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        <Footer />
      </main>
    </>
  );
}
