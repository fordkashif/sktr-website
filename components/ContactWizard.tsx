"use client";
import { ease } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Intent = "athlete" | "brand" | "investor" | "other";
type SubmitState = "idle" | "loading" | "error";

const intents: { id: Intent; label: string; sub: string }[] = [
  { id: "athlete", label: "Athlete or team", sub: "Development, coaching, performance systems" },
  { id: "brand", label: "Brand or collaborator", sub: "Editorial, film, production, partnerships" },
  { id: "investor", label: "Investor or capital partner", sub: "Co-investment, LP interest, strategic" },
  { id: "other", label: "Something else", sub: "General inquiry, press, or other" },
];

const contextMap: Record<Intent, { question: string; options: { label: string; value: string }[] }> = {
  athlete: {
    question: "What stage are you at?",
    options: [
      { label: "Early development", value: "Early development" },
      { label: "Amateur / competitive", value: "Amateur or competitive" },
      { label: "Semi-professional", value: "Semi-professional" },
      { label: "Professional", value: "Professional" },
    ],
  },
  brand: {
    question: "What kind of work?",
    options: [
      { label: "Editorial", value: "Editorial" },
      { label: "Film & production", value: "Film and production" },
      { label: "Brand & content", value: "Brand and content" },
      { label: "General partnership", value: "General partnership" },
    ],
  },
  investor: {
    question: "What's the nature of the conversation?",
    options: [
      { label: "Co-investment", value: "Co-investment" },
      { label: "LP interest", value: "LP interest" },
      { label: "Portfolio company", value: "Portfolio company" },
      { label: "Strategic partnership", value: "Strategic partnership" },
    ],
  },
  other: {
    question: "What's this about?",
    options: [
      { label: "General inquiry", value: "General inquiry" },
      { label: "Career", value: "Career" },
      { label: "Press", value: "Press" },
      { label: "Other", value: "Other" },
    ],
  },
};

const inputClass =
  "min-h-[3rem] px-4 bg-transparent text-ink outline-none border border-[rgba(131,145,190,0.2)] placeholder:text-[rgba(232,235,240,0.28)] focus:border-[rgba(62,105,255,0.7)] transition-colors duration-200 disabled:opacity-40 w-full";

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

const slideTrans = { duration: 0.32, ease: ease };

export default function ContactWizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [context, setContext] = useState<string | null>(null);
  const [pendingIntent, setPendingIntent] = useState<Intent | null>(null);
  const [pendingContext, setPendingContext] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  function advance() { setDirection(1); setStep((s) => s + 1); }
  function back() { setDirection(-1); setStep((s) => s - 1); }

  function selectIntent(id: Intent) {
    setPendingIntent(id);
    setTimeout(() => {
      setIntent(id);
      setContext(null);
      setPendingIntent(null);
      advance();
    }, 180);
  }

  function selectContext(value: string) {
    setPendingContext(value);
    setTimeout(() => {
      setContext(value);
      setPendingContext(null);
      advance();
    }, 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("loading");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, intent, context }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong.");
        setSubmitState("error");
        return;
      }
      setDirection(1);
      setStep(3);
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitState("error");
    }
  }

  const busy = submitState === "loading";

  return (
    <div className="border border-[rgba(131,145,190,0.2)] bg-card overflow-hidden">
      {/* Header bar: back + progress */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-[rgba(131,145,190,0.1)]">
        <div style={{ minWidth: "3.5rem" }}>
          <AnimatePresence>
            {step > 0 && step < 3 && (
              <motion.button
                key="back"
                onClick={back}
                className="mono text-[rgba(232,235,240,0.35)] hover:text-[rgba(232,235,240,0.65)] transition-colors duration-150 cursor-pointer"
                style={{ fontSize: "0.68rem", letterSpacing: "0.1em" }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
              >
                ← Back
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {step < 3 && (
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                animate={{
                  width: i === step ? 20 : 6,
                  backgroundColor:
                    i < step
                      ? "rgba(62,105,255,0.45)"
                      : i === step
                      ? "#3e69ff"
                      : "rgba(131,145,190,0.22)",
                }}
                style={{ height: 6 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
              />
            ))}
          </div>
        )}

        <div style={{ minWidth: "3.5rem" }} />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>

        {/* Step 0 — Intent */}
        {step === 0 && (
          <motion.div
            key="step-intent"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            className="p-6 sm:p-8"
          >
            <p className="mono text-blue mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>
              01 / INTENT
            </p>
            <h3
              className="m-0 mb-8 font-extrabold leading-[0.97] tracking-[-0.05em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
            >
              What are you coming to us with?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {intents.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.04 + i * 0.07 }}
                >
                  <motion.button
                    onClick={() => selectIntent(item.id)}
                    className="w-full flex flex-col gap-2 p-5 text-left border cursor-pointer"
                    animate={{
                      borderColor:
                        pendingIntent === item.id
                          ? "rgba(86,118,255,0.75)"
                          : "rgba(131,145,190,0.18)",
                      backgroundColor:
                        pendingIntent === item.id
                          ? "rgba(62,105,255,0.1)"
                          : "rgba(8,10,16,0.25)",
                    }}
                    whileHover={{
                      borderColor: "rgba(86,118,255,0.42)",
                      backgroundColor: "rgba(62,105,255,0.05)",
                    }}
                    transition={{ duration: 0.14 }}
                  >
                    <span
                      className="font-bold tracking-[-0.03em] text-ink"
                      style={{ fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mono text-[rgba(232,235,240,0.38)]"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {item.sub}
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1 — Context */}
        {step === 1 && intent && (
          <motion.div
            key="step-context"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            className="p-6 sm:p-8"
          >
            <p className="mono text-blue mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>
              02 / CONTEXT
            </p>
            <h3
              className="m-0 mb-8 font-extrabold leading-[0.97] tracking-[-0.05em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
            >
              {contextMap[intent].question}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {contextMap[intent].options.map((opt, i) => (
                <motion.div
                  key={opt.value}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.32, delay: 0.04 + i * 0.07 }}
                >
                  <motion.button
                    onClick={() => selectContext(opt.value)}
                    className="w-full flex items-center justify-center p-4 text-center border cursor-pointer min-h-[4rem]"
                    animate={{
                      borderColor:
                        pendingContext === opt.value
                          ? "rgba(86,118,255,0.75)"
                          : "rgba(131,145,190,0.18)",
                      backgroundColor:
                        pendingContext === opt.value
                          ? "rgba(62,105,255,0.1)"
                          : "rgba(8,10,16,0.25)",
                      color:
                        pendingContext === opt.value
                          ? "#3e69ff"
                          : "rgba(232,235,240,0.65)",
                    }}
                    whileHover={{
                      borderColor: "rgba(86,118,255,0.42)",
                      backgroundColor: "rgba(62,105,255,0.05)",
                      color: "#e8ebf0",
                    }}
                    transition={{ duration: 0.14 }}
                    style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)" }}
                  >
                    <span className="font-semibold tracking-[-0.02em]">{opt.label}</span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <motion.div
            key="step-details"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            className="p-6 sm:p-8"
          >
            <p className="mono text-blue mb-2" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>
              03 / DETAILS
            </p>
            <h3
              className="m-0 mb-8 font-extrabold leading-[0.97] tracking-[-0.05em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
            >
              A few details.
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  className="mono text-[rgba(232,235,240,0.42)]"
                  style={{ fontSize: "0.67rem", letterSpacing: "0.08em" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  disabled={busy}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className="mono text-[rgba(232,235,240,0.42)]"
                  style={{ fontSize: "0.67rem", letterSpacing: "0.08em" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                  disabled={busy}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  className="mono text-[rgba(232,235,240,0.42)]"
                  style={{ fontSize: "0.67rem", letterSpacing: "0.08em" }}
                >
                  Anything else we should know?
                </label>
                <textarea
                  placeholder="Tell us a bit more…"
                  required
                  disabled={busy}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={4}
                  className={`${inputClass} resize-none py-3`}
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-3">
                <motion.button
                  type="submit"
                  disabled={busy}
                  className="min-h-[3.2rem] border border-[rgba(86,118,255,0.5)] bg-[rgba(62,105,255,0.08)] mono text-ink cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-fit sm:px-10"
                  style={{ fontSize: "0.82rem", letterSpacing: "0.06em" }}
                  whileHover={!busy ? { backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.75)" } : {}}
                  whileTap={!busy ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.15 }}
                >
                  {busy ? "Sending…" : "Send →"}
                </motion.button>
                <AnimatePresence>
                  {submitState === "error" && (
                    <motion.p
                      className="mono m-0"
                      style={{ fontSize: "0.78rem", color: "rgba(255,90,90,0.85)" }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 3 — Success */}
        {step === 3 && (
          <motion.div
            key="step-success"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            className="p-6 sm:p-8 py-14 flex flex-col items-start gap-5"
          >
            <motion.div
              className="w-9 h-9 rounded-full border border-blue flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 380, damping: 20 }}
            >
              <motion.div
                className="w-[0.6rem] h-[0.6rem] rounded-full bg-blue"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.28, type: "spring", stiffness: 500, damping: 24 }}
              />
            </motion.div>
            <div>
              <motion.p
                className="mono text-blue m-0 mb-3"
                style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                MESSAGE RECEIVED
              </motion.p>
              <motion.h3
                className="m-0 font-extrabold leading-[0.97] tracking-[-0.05em]"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5, ease: ease }}
              >
                We&apos;ll be in touch<br />within 48 hours.
              </motion.h3>
            </div>
            <motion.p
              className="m-0 text-[rgba(232,235,240,0.48)] leading-[1.75] max-w-[36rem]"
              style={{ fontSize: "clamp(0.88rem, 1.2vw, 1rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Check your inbox — we&apos;ve sent a confirmation. For anything urgent, reach us directly at{" "}
              <motion.a
                href="mailto:signal@thesktr.com"
                className="text-[rgba(232,235,240,0.62)]"
                whileHover={{ color: "#3e69ff" }}
                transition={{ duration: 0.15 }}
              >
                signal@thesktr.com
              </motion.a>
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
