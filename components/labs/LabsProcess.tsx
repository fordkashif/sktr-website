"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We define the problem and scope before writing a line of code. No assumption goes unverified.",
    details: [
      "Kick-off call to align on goals, constraints, and timeline",
      "We challenge requirements — not just accept them at face value",
      "Technical feasibility check and risk identification",
      "Scope document and milestone plan delivered before any build starts",
    ],
  },
  {
    num: "02",
    title: "Design",
    desc: "Design and engineering work together from day one — what gets shipped matches what was designed.",
    details: [
      "User flows, wireframes, and high-fidelity UI in Figma",
      "Component system defined so implementation is predictable",
      "Interactive prototype reviewed with you before we build",
      "Design tokens and spacing system that translate directly into code",
    ],
  },
  {
    num: "03",
    title: "Build",
    desc: "We ship working software iteratively — tested, reviewed, and built to production standards.",
    details: [
      "Iterative sprints with a working build at each milestone",
      "Code reviewed before it merges — no shortcuts",
      "You see progress continuously, not just at the end",
      "Performance and security handled from the start, not bolted on",
    ],
  },
  {
    num: "04",
    title: "Launch",
    desc: "Production deployment, monitoring setup, and a handoff that leaves you in full control.",
    details: [
      "Deployment to production with error tracking and monitoring",
      "App Store submission and review process if applicable",
      "Documentation so your team can maintain and extend the product",
      "Optional ongoing support engagement after launch",
    ],
  },
];

export default function LabsProcess() {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-24" id="process">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <p className="mono mb-[0.25rem]" style={{ color: "var(--ink-52)" }}>Process</p>
        <h2 className="m-0 font-extrabold leading-[0.96] tracking-[-0.05em]" style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}>
          How we work.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        {/* Step tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-l border-[var(--border-section)]">
          {steps.map((step, i) => (
            <button
              key={step.num}
              onClick={() => setActive(i)}
              className="relative flex flex-col gap-[0.35rem] px-6 py-5 text-left cursor-pointer border-b border-r border-[var(--border-section)] transition-colors duration-150"
              style={{ backgroundColor: active === i ? "rgba(62,105,255,0.07)" : "transparent" }}
            >
              {active === i && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: "#3e69ff" }}
                  layoutId="processBar"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="mono text-blue" style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}>
                {step.num}
              </span>
              <span
                className="font-bold tracking-[-0.02em] transition-colors duration-150"
                style={{
                  fontSize: "0.92rem",
                  color: active === i ? "var(--ink)" : "var(--ink-50)",
                }}
              >
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="border-b border-l border-r border-[var(--border-section)] min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: ease }}
            >
              <div className="flex flex-col gap-3">
                <span className="mono text-blue" style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}>
                  {steps[active].num}
                </span>
                <h3 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
                  {steps[active].title}
                </h3>
                <p className="m-0 leading-[1.82]" style={{ fontSize: "0.93rem", color: "var(--ink-58)" }}>
                  {steps[active].desc}
                </p>
              </div>
              <ul className="m-0 p-0 list-none flex flex-col gap-4 justify-center">
                {steps[active].details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <span className="mono text-blue shrink-0 mt-[3px]" style={{ fontSize: "0.56rem" }}>
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-[1.72]" style={{ fontSize: "0.9rem", color: "var(--ink-68)" }}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-5">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="mono hover:text-blue transition-colors duration-150 disabled:opacity-20 cursor-pointer disabled:cursor-default"
            style={{ fontSize: "0.68rem", color: "var(--ink-30)" }}
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full cursor-pointer transition-all duration-200"
                style={{
                  width: active === i ? 20 : 6,
                  height: 6,
                  backgroundColor: active === i ? "#3e69ff" : "var(--ink-18)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
            disabled={active === steps.length - 1}
            className="mono hover:text-blue transition-colors duration-150 disabled:opacity-20 cursor-pointer disabled:cursor-default"
            style={{ fontSize: "0.68rem", color: "var(--ink-30)" }}
          >
            Next →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
