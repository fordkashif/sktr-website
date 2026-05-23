"use client";
import { ease } from "@/lib/motion";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContactWizard from "./ContactWizard";

const channels = [
  { label: "General", email: "signal@thesktr.com" },
  { label: "Partnerships", email: "partners@thesktr.com" },
  { label: "Press", email: "press@thesktr.com" },
];

type NewsletterState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [newsletterState, setNewsletterState] = useState<NewsletterState>("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterState("loading");
    setNewsletterError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setNewsletterError(data.error ?? "Something went wrong."); setNewsletterState("error"); return; }
      setNewsletterState("success");
      setNewsletterEmail("");
      setTimeout(() => setNewsletterState("idle"), 5000);
    } catch {
      setNewsletterError("Network error. Please try again.");
      setNewsletterState("error");
    }
  }

  return (
    <section className="mt-24" id="contact">
      {/* Section header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <div>
          <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.25rem]">Contact</p>
          <h2
            className="m-0 font-extrabold leading-[0.96] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}
          >
            Let&apos;s build something together.
          </h2>
        </div>
        <p
          className="w-full md:max-w-[30rem] text-[rgba(232,235,240,0.66)] leading-[1.75] md:shrink-0"
          style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}
        >
          Reach out for partnerships, strategic conversations, investment
          inquiries, or press. We respond to every message that fits the SKTR
          direction.
        </p>
      </motion.div>

      {/* Wizard */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <ContactWizard />
      </motion.div>

      {/* Bottom strip: newsletter + direct channels */}
      <motion.div
        className="mt-4 border border-[rgba(131,145,190,0.2)] bg-[rgba(11,13,18,0.6)] divide-y divide-[rgba(131,145,190,0.12)] md:divide-y-0 md:divide-x md:grid md:grid-cols-2"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.12, ease: ease }}
      >
        {/* Newsletter inline */}
        <div className="p-5 flex flex-col gap-3">
          <p className="mono text-[rgba(232,235,240,0.38)] m-0" style={{ fontSize: "0.66rem" }}>
            Stay in the loop
          </p>
          <form className="flex gap-2" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              disabled={newsletterState === "loading" || newsletterState === "success"}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 min-w-0 min-h-[2.6rem] px-3 bg-transparent text-ink text-[0.88rem] outline-none border border-[rgba(131,145,190,0.2)] placeholder:text-[rgba(232,235,240,0.24)] focus:border-[rgba(62,105,255,0.6)] transition-colors duration-200 disabled:opacity-40"
            />
            <motion.button
              type="submit"
              disabled={newsletterState === "loading" || newsletterState === "success"}
              className="shrink-0 min-h-[2.6rem] px-4 border border-[rgba(86,118,255,0.4)] bg-[rgba(62,105,255,0.06)] mono text-blue cursor-pointer disabled:opacity-40"
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}
              whileHover={{ backgroundColor: "rgba(62,105,255,0.14)" }}
              transition={{ duration: 0.15 }}
            >
              {newsletterState === "success" ? "Subscribed ✓" : newsletterState === "loading" ? "…" : "Subscribe"}
            </motion.button>
          </form>
          <AnimatePresence>
            {newsletterState === "error" && (
              <motion.p className="mono m-0" style={{ fontSize: "0.72rem", color: "rgba(255,90,90,0.85)" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {newsletterError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Direct channels — stack vertically, no wrapping issues */}
        <div className="p-5 flex flex-col justify-center gap-3">
          <p className="mono text-[rgba(232,235,240,0.38)] m-0" style={{ fontSize: "0.66rem" }}>
            Or reach us directly
          </p>
          <div className="flex flex-col gap-2">
            {channels.map(({ label, email }) => (
              <div key={email} className="flex items-center justify-between gap-4 mono" style={{ fontSize: "0.72rem" }}>
                <span style={{ color: "rgba(232,235,240,0.3)" }}>{label}</span>
                <motion.a
                  href={`mailto:${email}`}
                  className="text-[rgba(232,235,240,0.5)]"
                  whileHover={{ color: "#3e69ff" }}
                  transition={{ duration: 0.15 }}
                >
                  {email}
                </motion.a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
