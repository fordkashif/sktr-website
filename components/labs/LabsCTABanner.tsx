"use client";
import { ease } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LabsCTABanner() {
  return (
    <motion.section
      className="mt-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: ease }}
    >
      <div
        className="relative overflow-hidden px-8 sm:px-16 py-16 sm:py-20 border border-[rgba(62,105,255,0.22)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(62,105,255,0.11) 0%, rgba(5,6,8,0.96) 38%, rgba(62,105,255,0.06) 100%)",
        }}
      >
        {/* Decorative top-left glow orb */}
        <div
          className="absolute top-0 left-0 w-[420px] h-[420px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(62,105,255,0.18) 0%, transparent 65%)",
            transform: "translate(-30%, -40%)",
          }}
        />
        {/* Bottom-right glow */}
        <div
          className="absolute bottom-0 right-0 w-[320px] h-[320px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(62,105,255,0.1) 0%, transparent 65%)",
            transform: "translate(30%, 40%)",
          }}
        />
        {/* Subtle horizontal grid line */}
        <div
          className="absolute left-0 right-0 top-1/2 h-[1px] pointer-events-none opacity-20"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(62,105,255,0.6), transparent)",
            transform: "translateY(-50%)",
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
          <div className="max-w-[36rem]">
            <p
              className="mono text-blue mb-4"
              style={{ fontSize: "0.66rem", letterSpacing: "0.2em" }}
            >
              Let&apos;s work together
            </p>
            <h2
              className="m-0 font-extrabold tracking-[-0.05em] leading-[1.0]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Ready to build something?
            </h2>
            <p
              className="mt-4 m-0 text-[rgba(232,235,240,0.56)] leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
            >
              Tell us what you&apos;re working on. We respond within 48 hours.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:items-end gap-3">
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 40px rgba(62,105,255,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 min-h-[3.1rem] px-9 bg-blue text-white font-semibold border border-blue"
                style={{
                  fontSize: "0.88rem",
                  letterSpacing: "0.04em",
                  boxShadow: "0 6px 24px rgba(62,105,255,0.28)",
                }}
              >
                Start a project →
              </Link>
            </motion.div>
            <span
              className="mono text-[rgba(232,235,240,0.28)] text-center sm:text-right"
              style={{ fontSize: "0.66rem", letterSpacing: "0.12em" }}
            >
              signal@thesktr.com
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
