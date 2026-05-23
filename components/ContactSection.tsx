"use client";
import { ease } from "@/lib/motion";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const channels = [
  { label: "General", email: "signal@sktr.live" },
  { label: "Partnerships", email: "partners@sktr.live" },
  { label: "Press", email: "press@sktr.live" },
];

type ContactState = "idle" | "loading" | "success" | "error";
type NewsletterState = "idle" | "loading" | "success" | "error";

const inputClass =
  "min-h-[3rem] px-4 bg-transparent text-ink outline-none border border-[rgba(131,145,190,0.2)] placeholder:text-[rgba(232,235,240,0.28)] focus:border-[rgba(62,105,255,0.7)] transition-colors duration-200 disabled:opacity-40 w-full";

export default function ContactSection() {
  // Contact form state
  const [contactState, setContactState] = useState<ContactState>("idle");
  const [contactError, setContactError] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  // Newsletter state
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

      if (!res.ok) {
        setContactError(data.error ?? "Something went wrong.");
        setContactState("error");
        return;
      }

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

      if (!res.ok) {
        setNewsletterError(data.error ?? "Something went wrong.");
        setNewsletterState("error");
        return;
      }

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
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <div>
          <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.25rem]">
            Contact
          </p>
          <h2
            className="m-0 leading-[0.96] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}
          >
            Let&apos;s build something together.
          </h2>
        </div>
        <p className="w-full md:max-w-[30rem] text-[rgba(232,235,240,0.66)] leading-[1.75] md:shrink-0">
          Reach out for partnerships, strategic conversations, investment
          inquiries, or press. We respond to every message that fits the SKTR
          direction.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact form */}
        <motion.div
          className="p-[1.35rem_1.35rem_1.2rem] border border-[rgba(131,145,190,0.2)] bg-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <h3
            className="m-0 mb-1 leading-[0.98]"
            style={{ fontSize: "clamp(1.6rem, 2vw, 2.25rem)" }}
          >
            Send a message
          </h3>
          <p className="m-0 mb-4 text-[rgba(232,235,240,0.56)] leading-[1.7]">
            Tell us who you are and what you&apos;re working on.
          </p>

          <AnimatePresence mode="wait">
            {contactState === "success" ? (
              <motion.div
                key="success"
                className="flex flex-col items-start justify-center gap-3 py-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-blue mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em" }}>
                  Message received
                </span>
                <p className="m-0 text-ink text-[1.15rem] leading-snug font-semibold">
                  We&apos;ll be in touch if it fits the direction.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="flex flex-col gap-3"
                onSubmit={handleContact}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="mono text-[rgba(232,235,240,0.52)]" htmlFor="contact-name">
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
                  <div className="flex flex-col gap-1">
                    <label className="mono text-[rgba(232,235,240,0.52)]" htmlFor="contact-company">
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
                </div>

                <div className="flex flex-col gap-1">
                  <label className="mono text-[rgba(232,235,240,0.52)]" htmlFor="contact-email">
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

                <div className="flex flex-col gap-1">
                  <label className="mono text-[rgba(232,235,240,0.52)]" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="What are you working on?"
                    required
                    disabled={contactBusy}
                    value={form.message}
                    onChange={updateForm("message")}
                    rows={4}
                    className={`${inputClass} resize-none py-3`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={contactBusy}
                  className="min-h-[3rem] border border-[rgba(86,118,255,0.5)] text-ink bg-[rgba(62,105,255,0.08)] mono cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
              </motion.form>
            )}
          </AnimatePresence>

          {/* Direct email channels */}
          <div className="mt-5 pt-4 border-t border-[rgba(131,145,190,0.2)]">
            <p className="mono text-[rgba(232,235,240,0.38)] mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>
              Or reach us directly
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {channels.map(({ label, email }) => (
                <div key={email} className="flex items-center gap-2 mono" style={{ fontSize: "0.78rem" }}>
                  <span style={{ color: "rgba(232,235,240,0.38)" }}>{label}</span>
                  <motion.a
                    href={`mailto:${email}`}
                    className="text-[rgba(232,235,240,0.6)]"
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

        {/* Newsletter */}
        <motion.div
          className="p-[1.35rem_1.35rem_1.2rem] border border-[rgba(131,145,190,0.2)] bg-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
        >
          <h3
            className="m-0 mb-3 leading-[0.98]"
            style={{ fontSize: "clamp(1.6rem, 2vw, 2.25rem)" }}
          >
            Stay in the loop
          </h3>
          <p className="m-0 mb-4 text-[rgba(232,235,240,0.66)] leading-[1.72]">
            Get selective updates on SKTR platforms, launches, and ecosystem
            developments — no noise, no spam.
          </p>

          <form className="flex flex-col gap-[0.85rem]" onSubmit={handleNewsletter}>
            <label className="mono text-[rgba(232,235,240,0.52)]" htmlFor="newsletter-email">
              Your email address
            </label>
            <motion.input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="name@company.com"
              autoComplete="email"
              required
              disabled={newsletterState === "loading" || newsletterState === "success"}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="min-h-[3.2rem] px-4 bg-transparent text-ink outline-none border border-[rgba(131,145,190,0.2)] placeholder:text-[rgba(232,235,240,0.28)] disabled:opacity-40 w-full"
              whileFocus={{
                borderColor: "rgba(62,105,255,0.7)",
                boxShadow: "0 0 0 1px rgba(62,105,255,0.2)",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              type="submit"
              disabled={newsletterState === "loading" || newsletterState === "success"}
              className="min-h-[3rem] border border-[rgba(86,118,255,0.5)] text-ink bg-[rgba(62,105,255,0.08)] mono cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={
                newsletterState === "idle" || newsletterState === "error"
                  ? { backgroundColor: "rgba(62,105,255,0.18)", borderColor: "rgba(86,118,255,0.75)" }
                  : {}
              }
              whileTap={newsletterState === "idle" || newsletterState === "error" ? { scale: 0.98 } : {}}
              transition={{ duration: 0.18 }}
            >
              {newsletterState === "loading" ? "Sending…" : "Subscribe to updates →"}
            </motion.button>

            <AnimatePresence mode="wait">
              {newsletterState === "success" && (
                <motion.p
                  key="success"
                  className="text-blue mono"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  You&apos;re on the list.
                </motion.p>
              )}
              {newsletterState === "error" && (
                <motion.p
                  key="error"
                  className="mono"
                  style={{ color: "rgba(255,90,90,0.85)", fontSize: "0.8rem" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {newsletterError}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
