"use client";
import { ease } from "@/lib/motion";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { useState } from "react";

const dotGrid = {
  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

const serviceOptions = ["Mobile App", "Web Platform / SaaS", "API / Integration", "Something else"];
const stageOptions = ["Starting from scratch", "Have a spec / wireframes", "Rebuilding something", "Adding to a live product"];
const budgetOptions = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $40,000", "$40,000+"];
const stepQuestions = ["What are you building?", "Where in the process?", "What's your budget range?", "Tell us about the project."];

type State = {
  step: number; direction: number; service: string; stage: string; budget: string;
  name: string; email: string; description: string; loading: boolean; error: string;
};

const initial: State = { step: 0, direction: 1, service: "", stage: "", budget: "", name: "", email: "", description: "", loading: false, error: "" };

const cx = "max-w-[1200px] mx-auto w-full px-8 sm:px-14 lg:px-20";

function SelectGrid({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((opt) => (
        <button key={opt} onClick={() => onSelect(opt)} className="text-left p-5 border cursor-pointer transition-all duration-150" style={{ borderColor: selected === opt ? "rgba(62,105,255,0.7)" : "var(--border-mid)", backgroundColor: selected === opt ? "rgba(62,105,255,0.08)" : "transparent" }}>
          <span className="font-semibold tracking-[-0.02em] text-ink leading-tight block" style={{ fontSize: "0.92rem" }}>{opt}</span>
        </button>
      ))}
    </div>
  );
}

export default function ContactClientPage() {
  const [state, setState] = useState<State>(initial);

  function set(updates: Partial<State>) { setState((prev) => ({ ...prev, ...updates })); }
  function advance() { setState((prev) => ({ ...prev, step: prev.step + 1, direction: 1 })); }
  function back() { setState((prev) => ({ ...prev, step: prev.step - 1, direction: -1 })); }
  function selectAndAdvance(key: "service" | "stage" | "budget", value: string) {
    setState((prev) => ({ ...prev, [key]: value }));
    setTimeout(advance, 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    set({ loading: true, error: "" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: state.name, email: state.email, service: state.service, stage: state.stage, budget: state.budget, description: state.description }) });
      const data = await res.json();
      if (!res.ok) { set({ loading: false, error: data.error ?? "Something went wrong." }); return; }
      setState((prev) => ({ ...prev, loading: false, step: 4, direction: 1 }));
    } catch { set({ loading: false, error: "Network error. Please try again." }); }
  }

  const inputClass = "w-full min-h-[2.8rem] px-4 bg-transparent text-ink border border-[var(--border-mid)] outline-none placeholder:text-[var(--ink-22)] focus:border-[rgba(62,105,255,0.55)] transition-colors duration-200 disabled:opacity-40";
  const labelClass = "mono text-[var(--ink-46)] block mb-2";

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main className="w-full">

        {/* ── Hero ── */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          {/* Base */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #040614 0%, #050608 55%, #060a1c 100%)" }} />
          {/* Dot texture */}
          <div className="absolute inset-0 opacity-[0.45]" style={dotGrid} />
          {/* Strong blue glow — bottom left */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 80% at -10% 100%, rgba(62,105,255,0.28) 0%, transparent 55%)" }} />
          {/* Soft blue glow — top right */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 110% 0%, rgba(62,105,255,0.1) 0%, transparent 60%)" }} />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(5,6,8,0.68) 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #050608, transparent)" }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className={`${cx} pb-14 sm:pb-16`}>
              <motion.p className="mono text-blue mb-4" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease }}>
                Contact
              </motion.p>
              <motion.h1 className="m-0 font-extrabold tracking-[-0.06em] leading-[0.91]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: ease }}>
                Start a project.
              </motion.h1>
              <motion.p className="mt-5 text-[rgba(232,235,240,0.52)] max-w-[38rem]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", lineHeight: 1.7 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: ease }}>
                Tell us what you&apos;re building. We respond to every inquiry within 48 hours.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: ease }} className="mt-5">
                <a href="mailto:signal@thesktr.com" className="mono text-blue hover:text-blue/80 transition-colors duration-150" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>signal@thesktr.com</a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Wizard + Info */}
        <div className={cx}>
          <section className="mt-14 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20">
            {/* Wizard */}
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease }}>
              <AnimatePresence mode="wait" custom={state.direction}>
                {state.step === 4 ? (
                  <motion.div key="success" className="flex flex-col items-center gap-6 py-16 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: ease }}>
                    <motion.div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(62,105,255,0.12)", border: "1px solid rgba(62,105,255,0.35)" }} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}>
                      <div className="w-3 h-3 rounded-full bg-blue" />
                    </motion.div>
                    <div>
                      <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "2rem" }}>We got it.</h2>
                      <p className="mt-3 m-0 text-[rgba(232,235,240,0.58)] leading-relaxed" style={{ fontSize: "0.95rem" }}>We&apos;ll be in touch within 48 hours. If it&apos;s urgent, email us at <a href="mailto:signal@thesktr.com" className="text-blue hover:underline">signal@thesktr.com</a>.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="wizard" className="flex flex-col gap-8" initial={{ opacity: 1 }}>
                    <div className="flex items-center gap-[0.45rem]">
                      {[0, 1, 2, 3].map((i) => (
                        <motion.div key={i} className="h-[5px] rounded-full" animate={{ width: state.step === i ? 20 : 6, backgroundColor: state.step >= i ? "#3e69ff" : "var(--ink-18)" }} transition={{ duration: 0.25 }} />
                      ))}
                      <span className="mono ml-2" style={{ color: "var(--ink-26)", fontSize: "0.58rem" }}>{state.step + 1} / 4</span>
                    </div>
                    <div className="overflow-hidden">
                      <AnimatePresence mode="wait" custom={state.direction}>
                        <motion.div key={state.step} custom={state.direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: ease }} className="flex flex-col gap-6">
                          <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>{stepQuestions[state.step]}</h2>
                          {state.step === 0 && <SelectGrid options={serviceOptions} selected={state.service} onSelect={(v) => selectAndAdvance("service", v)} />}
                          {state.step === 1 && <SelectGrid options={stageOptions} selected={state.stage} onSelect={(v) => selectAndAdvance("stage", v)} />}
                          {state.step === 2 && <SelectGrid options={budgetOptions} selected={state.budget} onSelect={(v) => selectAndAdvance("budget", v)} />}
                          {state.step === 3 && (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={labelClass} style={{ fontSize: "0.64rem" }}>Name</label>
                                  <input type="text" placeholder="Your name" autoComplete="name" required disabled={state.loading} value={state.name} onChange={(e) => set({ name: e.target.value })} className={inputClass} style={{ fontSize: "0.9rem" }} />
                                </div>
                                <div>
                                  <label className={labelClass} style={{ fontSize: "0.64rem" }}>Email</label>
                                  <input type="email" placeholder="your@email.com" autoComplete="email" required disabled={state.loading} value={state.email} onChange={(e) => set({ email: e.target.value })} className={inputClass} style={{ fontSize: "0.9rem" }} />
                                </div>
                              </div>
                              <div>
                                <label className={labelClass} style={{ fontSize: "0.64rem" }}>Project description</label>
                                <textarea placeholder="Tell us about what you're building — what it does, who it's for, and any other details." required disabled={state.loading} rows={5} value={state.description} onChange={(e) => set({ description: e.target.value })} className={`${inputClass} resize-none py-3 leading-relaxed`} style={{ fontSize: "0.9rem", minHeight: "unset" }} />
                              </div>
                              <AnimatePresence>
                                {state.error && (
                                  <motion.p className="mono m-0" style={{ fontSize: "0.7rem", color: "rgba(255,90,90,0.85)" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{state.error}</motion.p>
                                )}
                              </AnimatePresence>
                              <motion.button type="submit" disabled={state.loading} className="self-start min-h-[3rem] px-8 bg-blue text-white font-semibold border border-blue mono disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" style={{ fontSize: "0.82rem", letterSpacing: "0.04em" }} whileHover={!state.loading ? { scale: 1.02, boxShadow: "0 8px 24px rgba(62,105,255,0.32)" } : {}} whileTap={!state.loading ? { scale: 0.97 } : {}} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                                {state.loading ? "Sending…" : "Send message →"}
                              </motion.button>
                            </form>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    {state.step > 0 && state.step < 4 && (
                      <button onClick={back} className="mono hover:text-ink transition-colors duration-150 cursor-pointer self-start" style={{ fontSize: "0.68rem", color: "var(--ink-30)" }}>← Back</button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact info */}
            <motion.div className="flex flex-col gap-6" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: ease }}>
              <div className="border border-[var(--border-card)] bg-card p-8 flex flex-col gap-4">
                <p className="mono m-0" style={{ color: "var(--ink-36)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>Direct contact</p>
                <motion.a href="mailto:signal@thesktr.com" className="text-ink hover:text-blue transition-colors duration-150 font-semibold" style={{ fontSize: "1.05rem" }} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>signal@thesktr.com</motion.a>
                <p className="m-0 text-[rgba(232,235,240,0.46)] leading-[1.72]" style={{ fontSize: "0.88rem" }}>For general enquiries, partnership conversations, or anything that doesn&apos;t fit the form.</p>
              </div>
              <div className="border border-[var(--border-card)] bg-card p-8 flex flex-col gap-3">
                <p className="mono m-0" style={{ color: "var(--ink-36)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>What happens next</p>
                <ul className="m-0 p-0 list-none flex flex-col gap-3 text-[rgba(232,235,240,0.6)]" style={{ fontSize: "0.88rem" }}>
                  {["We read your submission", "We reply with questions or a scope outline", "We agree on approach and timeline", "We build"].map((item, i) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-blue shrink-0 mono" style={{ fontSize: "0.58rem", marginTop: "3px" }}>{String(i + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-[var(--border-card)] bg-card p-8 flex flex-col gap-2">
                <p className="mono m-0" style={{ color: "var(--ink-36)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>Response time</p>
                <p className="m-0 text-[rgba(232,235,240,0.68)] leading-[1.72]" style={{ fontSize: "0.9rem" }}>We respond to every message within <span className="text-ink font-semibold">48 hours</span>. If your timeline is tighter, say so in the description.</p>
              </div>
            </motion.div>
          </section>

          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </MotionConfig>
  );
}
