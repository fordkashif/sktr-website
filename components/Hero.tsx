"use client";
import { ease } from "@/lib/motion";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: bg moves slower than scroll, content fades + drifts up
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex flex-col"
      id="top"
    >
      {/* Background with parallax */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#040507]/90 via-[#050608]/52 to-[#050608]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/22 to-[#050608]/86" />
        {/* Bleed into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050608] to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 16% 34%, rgba(62,105,255,0.14) 0%, transparent 28%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-end min-h-screen w-full max-w-[1700px] mx-auto px-4 sm:px-8 pt-[6rem] sm:pt-[8.2rem] pb-28 sm:pb-28"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="mono text-blue mb-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: ease }}
        >
          Company Building Group
        </motion.p>

        {/* Title — word-by-word reveal from below */}
        <h1
          className="m-0 font-extrabold tracking-[-0.08em] leading-[0.9]"
          style={{ fontSize: "clamp(4.8rem, 11vw, 9rem)" }}
        >
          {["BUILDING", "FORWARD."].map((word, i) => (
            <div
              key={word}
              style={{ overflowY: "hidden", overflowX: "visible", lineHeight: "0.95" }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.18,
                  ease: ease,
                }}
              >
                <motion.span
                  className="inline-block"
                  animate={{
                    x: [0, 0, 0, 0, -4, 4, -2, 0, 0, 0, 0, 0],
                    textShadow: [
                      "0 0 0 transparent",
                      "0 0 0 transparent",
                      "0 0 0 transparent",
                      "0 0 0 transparent",
                      "-4px 0 rgba(62,105,255,0.7), 4px 0 rgba(255,60,60,0.5)",
                      "4px 0 rgba(62,105,255,0.7), -4px 0 rgba(255,60,60,0.5)",
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
                    repeatDelay: 2,
                    ease: "easeInOut" as const,
                    times: [0, 0.2, 0.4, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.88, 0.94, 1],
                  }}
                >
                  {word}
                </motion.span>
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-7 text-[rgba(232,235,240,0.72)] leading-relaxed font-normal max-w-[36rem]"
          style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.82, ease: ease }}
        >
          SKTR is a company building group. We build, operate, and back
          companies with long-term conviction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex gap-4 flex-wrap items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.02, ease: ease }}
        >
          <motion.a
            href="#ecosystem"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 bg-blue text-white font-semibold border border-blue"
            style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#5577ff",
              boxShadow: "0 8px 28px rgba(62,105,255,0.32)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            Explore the ecosystem
          </motion.a>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 min-h-[3rem] px-6 border border-[rgba(232,235,240,0.22)] text-[rgba(232,235,240,0.72)] mono"
            whileHover={{
              borderColor: "rgba(232,235,240,0.5)",
              color: "#e8ebf0",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Get in touch
          </motion.a>
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
