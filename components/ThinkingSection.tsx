"use client";
import { ease } from "@/lib/motion";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const items = [
  {
    num: "01",
    tag: "Strategy",
    title: "Why ecosystems create durable advantage.",
    body: "The strongest groups don't just operate companies — they build the connective tissue between them. We're writing through what that actually means to execute.",
  },
  {
    num: "02",
    tag: "Platform thinking",
    title: "Building platforms instead of isolated tools.",
    body: "Platform leverage is real, but most groups mistake distribution for infrastructure. We're working through where the line is and how to build on the right side of it.",
  },
  {
    num: "03",
    tag: "Conviction",
    title: "Operating with a longer horizon.",
    body: "Short-cycle capital has shaped how most innovation groups make decisions. We're examining what changes when you remove that constraint entirely.",
  },
];

const listContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const listItem = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: ease },
  },
};

export default function ThinkingSection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="mt-24" id="thinking">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <div>
          <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.25rem]">
            Thinking
          </p>
          <h2
            className="m-0 leading-[0.96] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}
          >
            Ideas, vision, and long-term perspective.
          </h2>
        </div>
        <p className="w-full md:max-w-[30rem] text-[rgba(232,235,240,0.66)] leading-[1.75] md:shrink-0">
          We publish selectively — only when there&apos;s something worth saying.
          These are the topics we&apos;re currently working through.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6">
        {/* List panel */}
        <motion.div
          className="border border-[rgba(131,145,190,0.2)] bg-card p-[1.4rem_1.4rem_1.2rem] flex flex-col"
          variants={listContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3
            className="m-0 mb-4 leading-[0.98]"
            style={{ fontSize: "clamp(1.5rem, 2vw, 2.2rem)" }}
          >
            In development
          </h3>

          <div className="flex-1">
            {items.map((item, i) => (
              <motion.div
                key={item.num}
                variants={listItem}
                className={`grid gap-4 py-4 ${
                  i > 0 ? "border-t border-[rgba(131,145,190,0.2)]" : ""
                }`}
                style={{ gridTemplateColumns: "5.5rem 1fr" }}
              >
                <span className="mono text-[rgba(232,235,240,0.36)]">
                  {item.num}
                </span>
                <div>
                  <span className="mono text-blue mb-[0.35rem] block" style={{ fontSize: "0.68rem", letterSpacing: "0.14em" }}>
                    {item.tag}
                  </span>
                  <h4 className="m-0 mb-[0.35rem] text-[1.05rem]">
                    {item.title}
                  </h4>
                  <p className="m-0 text-[rgba(232,235,240,0.56)] leading-[1.65]" style={{ fontSize: "0.9rem" }}>
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe nudge */}
          <motion.div
            variants={listItem}
            className="mt-4 pt-4 border-t border-[rgba(131,145,190,0.2)] flex items-center justify-between gap-4"
          >
            <p className="m-0 mono text-[rgba(232,235,240,0.42)]" style={{ fontSize: "0.72rem" }}>
              Get updates when we publish
            </p>
            <motion.a
              href="#contact"
              className="mono text-blue flex items-center gap-1 shrink-0"
              style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              Subscribe →
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image with parallax */}
        <motion.figure
          ref={imgRef}
          className="relative m-0 border border-[rgba(131,145,190,0.2)] bg-panel overflow-hidden"
          style={{ minHeight: "28rem" }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.1, ease: ease }}
        >
          <motion.div className="absolute inset-[-10%]" style={{ y }}>
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
              alt="Leadership discussion in a modern workspace"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,8,0.08)] via-[rgba(5,6,8,0.18)] to-[rgba(5,6,8,0.82)]" />
          <figcaption className="absolute inset-auto bottom-5 left-5 right-5 z-10">
            <div className="flex justify-between items-end mono text-[rgba(232,235,240,0.52)] mb-2">
              <span>SKTR Ventures</span>
              <span>Long-term conviction</span>
            </div>
            <h3
              className="m-0 mb-2 leading-tight"
              style={{ fontSize: "clamp(1.35rem, 2vw, 2rem)" }}
            >
              Selective by design.
            </h3>
            <p className="m-0 max-w-[26rem] text-[rgba(232,235,240,0.72)] leading-[1.7]">
              Capital, operators, and future platforms are brought together
              through disciplined expansion rather than short-cycle hype.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
