"use client";
import { ease } from "@/lib/motion";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import MagneticWrapper from "@/components/MagneticWrapper";

export default function LabsHero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-linked transforms
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax — normalized -1 to 1
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);

  // Each layer gets different stiffness = different apparent depth
  const glowX  = useSpring(useTransform(rawMX, [-1, 1], [-22, 22]), { stiffness: 42, damping: 20 });
  const glowY  = useSpring(useTransform(rawMY, [-1, 1], [-14, 14]), { stiffness: 42, damping: 20 });
  const h1X    = useSpring(useTransform(rawMX, [-1, 1], [-10, 10]), { stiffness: 55, damping: 22 });
  const h1Y    = useSpring(useTransform(rawMY, [-1, 1], [-6,  6 ]), { stiffness: 55, damping: 22 });
  const subX   = useSpring(useTransform(rawMX, [-1, 1], [-5,  5 ]), { stiffness: 65, damping: 24 });
  const subY   = useSpring(useTransform(rawMY, [-1, 1], [-3,  3 ]), { stiffness: 65, damping: 24 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    rawMX.set(((e.clientX - left) / width) * 2 - 1);
    rawMY.set(((e.clientY - top) / height) * 2 - 1);
  };

  const onMouseLeave = () => {
    rawMX.set(0);
    rawMY.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      id="top"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Background ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=60"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/92 via-[#050608]/60 to-[#050608]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/20 to-[#050608]/88" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050608] to-transparent" />

        {/* Parallax glows — move most (deepest layer) */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ x: glowX, y: glowY }}>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 55% 55% at 14% 38%, rgba(62,105,255,0.22) 0%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 40% 40% at 88% 12%, rgba(62,105,255,0.09) 0%, transparent 70%)" }}
          />
        </motion.div>
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col justify-end min-h-[100svh] w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] sm:pt-[8.2rem] pb-16 sm:pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="mono text-blue mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: ease }}
        >
          SKTR Labs
        </motion.p>

        {/* Headline — parallax layer */}
        <motion.h1
          className="m-0 font-extrabold tracking-[-0.06em] leading-none"
          style={{ x: h1X, y: h1Y }}
        >
          {/* Line 1 */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="inline-block text-[rgba(232,235,240,0.55)] font-semibold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.4rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.3, ease: ease }}
            >
              We build
            </motion.span>
          </div>

          {/* Line 2 — massive with glitch */}
          <div style={{ overflow: "hidden", lineHeight: 0.88 }}>
            <motion.span
              className="inline-block"
              style={{ fontSize: "clamp(5rem, 13vw, 11rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: ease }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  x: [0, 0, 0, 0, -5, 5, -2, 0, 0, 0, 0, 0],
                  textShadow: [
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "-5px 0 rgba(62,105,255,0.75), 5px 0 rgba(255,60,60,0.5)",
                    "5px 0 rgba(62,105,255,0.75), -5px 0 rgba(255,60,60,0.5)",
                    "-2px 0 rgba(62,105,255,0.4)",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                    "0 0 0 transparent",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut" as const,
                  times: [0, 0.2, 0.4, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.88, 0.94, 1],
                }}
              >
                SOFTWARE.
              </motion.span>
            </motion.span>
          </div>

          {/* Line 3 */}
          <div style={{ overflow: "hidden" }}>
            <motion.span
              className="inline-block text-blue font-extrabold tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, delay: 0.62, ease: ease }}
            >
              Done properly.
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle — parallax layer */}
        <motion.p
          className="mt-7 text-[rgba(232,235,240,0.72)] leading-relaxed font-normal max-w-[34rem]"
          style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.28rem)", x: subX, y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82, ease: ease }}
        >
          A software studio. We design and build mobile apps, web platforms,
          SaaS products, and APIs.
        </motion.p>

        {/* CTAs — magnetic */}
        <motion.div
          className="mt-10 flex gap-4 flex-wrap items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.02, ease: ease }}
        >
          <MagneticWrapper>
            <div className="relative">
              <span
                className="absolute inset-0 pointer-events-none"
                style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
              />
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 min-h-[3rem] px-7 bg-blue text-white font-semibold border border-blue"
                style={{
                  fontSize: "0.88rem",
                  letterSpacing: "0.04em",
                  boxShadow: "0 8px 32px rgba(62,105,255,0.35)",
                }}
              >
                Start a project
              </Link>
            </div>
          </MagneticWrapper>

          <MagneticWrapper>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 min-h-[3rem] px-7 border border-[rgba(232,235,240,0.22)] text-[rgba(232,235,240,0.72)] mono hover:border-[rgba(232,235,240,0.48)] hover:text-[#e8ebf0] transition-colors duration-180"
            >
              See our work
            </Link>
          </MagneticWrapper>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-4 sm:left-8 hidden sm:flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.div
            className="w-[1px] bg-[rgba(232,235,240,0.22)]"
            initial={{ height: 0 }}
            animate={{ height: 40 }}
            transition={{ delay: 1.8, duration: 0.7, ease: ease }}
          />
          <span className="mono text-[rgba(232,235,240,0.28)]">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
