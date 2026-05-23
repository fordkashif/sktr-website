"use client";
import { ease } from "@/lib/motion";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,8,0.06)] via-[rgba(5,6,8,0.14)] to-[rgba(5,6,8,0.72)]" />
    </div>
  );
}

const platforms = [
  {
    num: "01",
    tag: "Performance",
    label: "SKTR Athletics",
    heading: "Performance as an entry point into systems.",
    description:
      "Training, analysis, development, and media connect into a larger operating model — not fragmented across separate tools and teams.",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    alt: "Athletes competing on a running track",
  },
  {
    num: "02",
    tag: "Platform",
    label: "SKTR Coach",
    heading: "Coaching, insight, execution.",
    description:
      "Integrated tools for coaches and performance staff — built around the athlete, not the admin workflow.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    alt: "Coach reviewing performance data on a tablet",
  },
  {
    num: "03",
    tag: "Research",
    label: "SKTR Labs",
    heading: "Disciplined invention with long-term intent.",
    description:
      "The tools and systems built in Labs become the foundation for every other vertical — infrastructure created once, used everywhere.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    alt: "Researcher working with technology and data",
  },
];

export default function PlatformsSection() {
  return (
    <section className="mt-28" id="platforms">
      {/* Section intro — full-width statement */}
      <motion.div
        className="mb-10 border-b border-[rgba(131,145,190,0.15)] pb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <p className="mono text-[rgba(232,235,240,0.38)] mb-5">Products &amp; Platforms</p>
        <h2
          className="m-0 font-extrabold leading-[0.94] tracking-[-0.06em] max-w-[22ch]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
        >
          Not one-off tools. Operating layers built to scale.
        </h2>
      </motion.div>

      {/* Photo cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platforms.map((p, i) => (
          <motion.figure
            key={p.label}
            className="m-0 border border-[rgba(131,145,190,0.2)] bg-panel overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: ease }}
          >
            <ParallaxImage
              src={p.image}
              alt={p.alt}
              className="h-[15rem] flex-none"
            />
            <figcaption className="flex flex-col flex-1 p-[1.3rem_1.35rem_1.4rem]">
              <div className="flex justify-between items-center mono text-[rgba(232,235,240,0.42)] mb-4">
                <span>{p.num} / {p.tag}</span>
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.12em" }}>
                  {p.label}
                </span>
              </div>
              <h3
                className="m-0 mb-3 font-extrabold text-ink leading-tight tracking-[-0.03em]"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.55rem)" }}
              >
                {p.heading}
              </h3>
              <p
                className="m-0 text-[rgba(232,235,240,0.62)] leading-[1.7] flex-1"
                style={{ fontSize: "clamp(0.9rem, 1.1vw, 1rem)" }}
              >
                {p.description}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
