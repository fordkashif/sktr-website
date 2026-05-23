"use client";
import { ease } from "@/lib/motion";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function ParallaxFigure({
  src,
  alt,
  capTop,
  capRight,
  title,
  body,
  delay = 0,
}: {
  src: string;
  alt: string;
  capTop: string;
  capRight: string;
  title: string;
  body: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.figure
      ref={ref}
      className="relative m-0 border border-[rgba(131,145,190,0.2)] bg-panel overflow-hidden"
      style={{ minHeight: "28rem" }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: ease }}
    >
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(5,6,8,0.08)] via-[rgba(5,6,8,0.18)] to-[rgba(5,6,8,0.82)]" />
      <figcaption className="absolute inset-auto bottom-5 left-5 right-5 z-10">
        <div className="flex justify-between items-end mono text-[rgba(232,235,240,0.52)] mb-2">
          <span>{capTop}</span>
          <span>{capRight}</span>
        </div>
        <h3
          className="m-0 mb-2 leading-tight"
          style={{ fontSize: "clamp(1.35rem, 2vw, 2rem)" }}
        >
          {title}
        </h3>
        <p className="m-0 max-w-[26rem] text-[rgba(232,235,240,0.72)] leading-[1.7]">
          {body}
        </p>
      </figcaption>
    </motion.figure>
  );
}

export default function InnovationSection() {
  return (
    <section className="mt-24" id="future">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <div>
          <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.25rem]">
            Innovation
          </p>
          <h2
            className="m-0 leading-[0.96] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}
          >
            Research, experiments, and systems built for what comes next.
          </h2>
        </div>
        <p className="w-full md:max-w-[30rem] text-[rgba(232,235,240,0.66)] leading-[1.75] md:shrink-0">
          Athletics is the first vertical. The larger ambition is to build
          platforms and ecosystems that can extend across industries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ParallaxFigure
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Team reviewing future-focused product work"
          capTop="SKTR Labs"
          capRight="Applied research"
          title="Disciplined invention with long-term intent."
          body="Prototyping, experimentation, and infrastructure thinking create the conditions for future ventures and products."
          delay={0}
        />
        <ParallaxFigure
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="Creative team working across media and strategy"
          capTop="SKTR Media"
          capRight="Culture + distribution"
          title="Narrative systems that carry ideas into culture."
          body="Editorial, film, and launch surfaces make the ecosystem legible to broader audiences without diluting the strategy behind it."
          delay={0.12}
        />
      </div>
    </section>
  );
}
