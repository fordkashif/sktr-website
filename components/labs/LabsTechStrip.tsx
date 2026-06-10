"use client";
import { ease } from "@/lib/motion";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 12,
    suffix: "+",
    label: "Projects shipped",
    desc: "Design and engineering under one roof — no handoff, no translation loss",
  },
  {
    value: 4,
    suffix: "+",
    label: "Years building",
    desc: "Mobile apps, web platforms, SaaS products, and APIs from a single studio",
  },
  {
    value: 48,
    suffix: "hr",
    label: "Response time",
    desc: "We respond to every project inquiry within 48 hours, every time",
  },
  {
    value: 0,
    suffix: "",
    label: "Account managers",
    desc: "You work with the people building your product — not middlemen",
  },
];

function CountUp({
  to,
  suffix,
  duration = 1.6,
}: {
  to: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function LabsTechStrip() {
  return (
    <motion.section
      className="mt-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: ease }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[rgba(131,145,190,0.12)]">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex flex-col gap-3 px-7 py-8 border-b border-r border-[rgba(131,145,190,0.1)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: ease }}
          >
            <span
              className="font-extrabold tracking-[-0.04em] text-ink tabular-nums"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", lineHeight: 1 }}
            >
              <CountUp to={s.value} suffix={s.suffix} />
            </span>
            <span
              className="mono text-blue"
              style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}
            >
              {s.label.toUpperCase()}
            </span>
            <p
              className="m-0 text-[rgba(232,235,240,0.44)] leading-[1.75]"
              style={{ fontSize: "0.84rem" }}
            >
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
