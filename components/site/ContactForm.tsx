"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";

const QUESTIONS = [
  { key: "service", title: "What are you building?", options: ["Mobile app", "Web platform or SaaS", "API or integration", "Something else"] },
  { key: "stage", title: "Where are you in the process?", options: ["Starting from scratch", "Have a spec or wireframes", "Rebuilding something", "Adding to a live product"] },
  { key: "budget", title: "What is your budget range?", options: ["Under US$5,000", "US$5,000 to US$15,000", "US$15,000 to US$40,000", "US$40,000 or more"] },
] as const;

type Choice = "service" | "stage" | "budget";

const field =
  "block w-full border border-[var(--sk-line-strong)] bg-transparent px-4 text-[1.0625rem] text-[var(--sk-ink)] placeholder:text-[var(--sk-muted)] focus:border-[var(--sk-cyan)] focus:outline-none disabled:opacity-50";

/** The four-step project enquiry: three quick choices, then name, email and a description */
export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<Record<Choice, string>>({ service: "", stage: "", budget: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function choose(key: Choice, value: string) {
    setPicks((p) => ({ ...p, [key]: value }));
    // Records when the visitor began, so the server can ignore forms sent impossibly fast
    setStartedAt((t) => t || Date.now());
    setStep((s) => s + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, description, website, startedAt, ...picks }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setStep(4);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    }
    setLoading(false);
  }

  if (step === 4) {
    return (
      <div className="border border-[var(--sk-line)] bg-[var(--sk-panel)] p-8 md:p-12" role="status">
        <Check size={40} weight="bold" className="text-[var(--sk-cyan)]" aria-hidden="true" />
        <h2 className="sk-h2 m-0 mt-5 text-[2.25rem]">Message sent.</h2>
        <p className="m-0 mt-3 max-w-md text-[1.125rem] leading-relaxed text-[var(--sk-muted)]">
          We&apos;ll reply within 48 hours. If it&apos;s urgent, email{" "}
          <a href="mailto:signal@thesktr.com" className="text-[var(--sk-blue)] underline underline-offset-4">
            signal@thesktr.com
          </a>
          .
        </p>
      </div>
    );
  }

  const q = step < 3 ? QUESTIONS[step] : null;

  return (
    <div className="border border-[var(--sk-line)] bg-[var(--sk-panel)] p-6 md:p-10">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-1 flex-1 ${i <= step ? "bg-[#3e69ff]" : "bg-[var(--sk-line-strong)]"}`} />
          ))}
        </div>
        <span className="text-[0.9375rem] text-[var(--sk-muted)]">Step {step + 1} of 4</span>
      </div>

      {q ? (
        <fieldset className="m-0 mt-8 border-0 p-0">
          <legend className="sk-h2 p-0 text-[clamp(1.625rem,3vw,2.25rem)]">{q.title}</legend>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt) => {
              const on = picks[q.key] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(q.key, opt)}
                  aria-pressed={on}
                  className={`flex min-h-16 cursor-pointer items-center justify-between gap-3 border px-5 py-4 text-left text-[1.125rem] font-semibold transition-colors ${on ? "border-[#3e69ff] bg-[rgb(62_105_255/0.12)]" : "border-[var(--sk-line-strong)] hover:bg-[var(--sk-panel-2)]"}`}
                >
                  {opt}
                  <ArrowRight size={18} aria-hidden="true" className="shrink-0 text-[var(--sk-muted)]" />
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <form onSubmit={submit} className="mt-8">
          <h2 className="sk-h2 m-0 text-[clamp(1.625rem,3vw,2.25rem)]">Tell us about the project.</h2>
          {/* Spam trap: hidden from people and screen readers; bots that fill every field give themselves away */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="block text-[1rem] font-semibold">
              Name
              <input type="text" autoComplete="name" required disabled={loading} value={name} onChange={(e) => setName(e.target.value)} className={`${field} mt-2 h-13 min-h-12`} />
            </label>
            <label className="block text-[1rem] font-semibold">
              Email
              <input type="email" autoComplete="email" required disabled={loading} value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-2 h-13 min-h-12`} />
            </label>
          </div>
          <label className="mt-5 block text-[1rem] font-semibold">
            Project description
            <textarea
              required
              disabled={loading}
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What it does, who it's for, and any deadline."
              className={`${field} mt-2 resize-y py-3 leading-relaxed`}
            />
          </label>
          {error && (
            <p role="alert" className="m-0 mt-4 border border-[#ff6b6b] px-4 py-3 text-[1rem] text-[#ff8a8a] [html.light_&]:text-[#b42318]">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-12 cursor-pointer items-center gap-2 bg-[var(--sk-btn)] px-7 text-[1.0625rem] font-semibold text-[var(--sk-btn-ink)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send message"}
            {!loading && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
          </button>
        </form>
      )}

      {step > 0 && (
        <button type="button" onClick={() => setStep((s) => s - 1)} disabled={loading} className="mt-8 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[1rem] text-[var(--sk-muted)] hover:text-[var(--sk-ink)]">
          <ArrowLeft size={16} aria-hidden="true" />
          Back
        </button>
      )}
    </div>
  );
}
