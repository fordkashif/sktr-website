"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";
import { services } from "@/lib/services-data";

export default function LabsServicesGrid() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section className="mt-24" id="services">
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <p className="mono mb-[0.25rem]" style={{ color: "var(--ink-52)" }}>Services</p>
        <h2 className="m-0 font-extrabold leading-[0.96] tracking-[-0.05em]" style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}>
          What we build.
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] border-t border-l border-[var(--border-section)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        {/* Left: service list */}
        <div className="border-b lg:border-b-0 border-[var(--border-section)]">
          {services.map((svc, i) => (
            <button
              key={svc.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="w-full flex items-center justify-between px-6 sm:px-8 py-[1.15rem] border-b border-r border-[var(--border-faint)] text-left cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: active === i ? "rgba(62,105,255,0.06)" : "transparent",
                borderLeft: active === i ? "2px solid rgba(62,105,255,0.65)" : "2px solid transparent",
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="mono shrink-0 w-7"
                  style={{
                    fontSize: "0.58rem",
                    color: active === i ? "rgba(62,105,255,0.8)" : "var(--ink-22)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-bold tracking-[-0.02em] transition-colors duration-150"
                  style={{
                    fontSize: "0.94rem",
                    color: active === i ? "var(--ink)" : "var(--ink-52)",
                  }}
                >
                  {svc.title}
                </span>
              </div>
              <span
                className="mono shrink-0 hidden sm:block"
                style={{
                  fontSize: "0.56rem",
                  color: active === i ? "rgba(62,105,255,0.65)" : "var(--ink-16)",
                }}
              >
                {svc.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden border-b border-r border-[var(--border-section)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="p-8 sm:p-10 flex flex-col gap-6 h-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: ease }}
            >
              <div className="flex flex-col gap-2">
                <span className="mono text-blue" style={{ fontSize: "0.58rem", letterSpacing: "0.18em" }}>
                  {s.tag}
                </span>
                <h3 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}>
                  {s.title}
                </h3>
              </div>

              <p className="m-0 leading-[1.84]" style={{ fontSize: "0.92rem", color: "var(--ink-64)" }}>
                {s.description}
              </p>

              <div>
                <p className="mono mb-4" style={{ fontSize: "0.56rem", letterSpacing: "0.14em", color: "var(--ink-28)" }}>
                  Included
                </p>
                <ul className="m-0 p-0 list-none flex flex-col gap-[0.6rem]">
                  {s.included.map((item) => (
                    <li key={item} className="flex items-start gap-3" style={{ fontSize: "0.88rem", color: "var(--ink-62)" }}>
                      <span className="text-blue shrink-0 mt-[2px]">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-start gap-8 pt-5 border-t border-[var(--border-section)] mt-auto">
                <div className="flex flex-col gap-[0.3rem]">
                  <span className="mono" style={{ fontSize: "0.54rem", letterSpacing: "0.12em", color: "var(--ink-26)" }}>
                    Timeline
                  </span>
                  <span className="font-semibold" style={{ fontSize: "0.86rem", color: "var(--ink-80)" }}>
                    {s.timeline}
                  </span>
                </div>
                <div className="w-[1px] h-8 shrink-0 self-center" style={{ background: "var(--border-section)" }} />
                <div className="flex flex-col gap-[0.3rem] flex-1">
                  <span className="mono" style={{ fontSize: "0.54rem", letterSpacing: "0.12em", color: "var(--ink-26)" }}>
                    Best for
                  </span>
                  <span style={{ fontSize: "0.86rem", color: "var(--ink-60)" }}>
                    {s.bestFor}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
