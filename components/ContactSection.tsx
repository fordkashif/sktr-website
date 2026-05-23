"use client";
import { ease } from "@/lib/motion";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const channels = [
  { label: "General", email: "signal@thesktr.com" },
  { label: "Partnerships", email: "partners@thesktr.com" },
  { label: "Press", email: "press@thesktr.com" },
];

type ContactState = "idle" | "loading" | "success" | "error";
type NewsletterState = "idle" | "loading" | "success" | "error";

const inputClass =
  "min-h-[3rem] px-4 bg-transparent text-ink outline-none border border-[rgba(131,145,190,0.2)] placeholder:text-[rgba(232,235,240,0.28)] focus:border-[rgba(62,105,255,0.7)] transition-colors duration-200 disabled:opacity-40 w-full";

export default function ContactSection() {
  const MESSAGE_MAX = 800;

  const [contactState, setContactState] = useState<ContactState>("idle");
  const [contactError, setContactError] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const [newsletterState, setNewsletterState] = useState<NewsletterState>("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  function updateForm(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactState("loading");
    setContactError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setContactError(data.error ?? "Something went wrong."); setContactState("error"); return; }
      setContactState("success");
      setForm({ name: "", company: "", email: "", message: "" });
      setTimeout(() => setContactState("idle"), 6000);
    } catch {
      setContactError("Network error. Please try again.");
      setContactState("error");
    }
  }

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

  const contactBusy = contactState === "loading" || contactState === "success";

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

      {/* Full-width contact form */}
      <motion.div
        className="border border-[rgba(131,145,190,0.2)] bg-card p-[2rem_2rem_2rem]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <AnimatePresence mode="wait">
          {contactState === "success" ? (
            <motion.div
              key="success"
              className="flex flex-col items-start gap-3 py-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-blue mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em" }}>
                Message received
              </span>
              <p className="m-0 text-ink font-extrabold leading-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                We&apos;ll be in touch if it fits the direction.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
              onSubmit={handleContact}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.68rem" }} htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  required
                  disabled={contactBusy}
                  value={form.name}
                  onChange={updateForm("name")}
                  className={inputClass}
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.68rem" }} htmlFor="contact-company">
                  Company / Role
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Optional"
                  autoComplete="organization"
                  disabled={contactBusy}
                  value={form.company}
                  onChange={updateForm("company")}
                  className={inputClass}
                />
              </div>

              {/* Email — full width */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.68rem" }} htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  required
                  disabled={contactBusy}
                  value={form.email}
                  onChange={updateForm("email")}
                  className={inputClass}
                />
              </div>

              {/* Message — full width */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.68rem" }} htmlFor="contact-message">
                    Message
                  </label>
                  <span
                    className="mono tabular-nums"
                    style={{
                      fontSize: "0.66rem",
                      color: form.message.length > MESSAGE_MAX * 0.9
                        ? "rgba(255,180,60,0.8)"
                        : "rgba(232,235,240,0.24)",
                    }}
                  >
                    {form.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  placeholder="What are you working on?"
                  required
                  maxLength={MESSAGE_MAX}
                  disabled={contactBusy}
                  value={form.message}
                  onChange={updateForm("message")}
                  rows={5}
                  className={`${inputClass} resize-none py-3`}
                />
              </div>

              {/* Submit + error */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <motion.button
                  type="submit"
                  disabled={contactBusy}
                  className="min-h-[3.2rem] border border-[rgba(86,118,255,0.5)] text-ink bg-[rgba(62,105,255,0.08)] mono cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-full md:w-fit md:px-10"
                  whileHover={!contactBusy ? { backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.75)" } : {}}
                  whileTap={!contactBusy ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.18 }}
                >
                  {contactState === "loading" ? "Sending…" : "Send message →"}
                </motion.button>
                <AnimatePresence>
                  {contactState === "error" && (
                    <motion.p
                      className="mono m-0"
                      style={{ fontSize: "0.8rem", color: "rgba(255,90,90,0.85)" }}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {contactError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
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
