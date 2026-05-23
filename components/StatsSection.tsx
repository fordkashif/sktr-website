"use client";
import { ease } from "@/lib/motion";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Update these with real numbers ───────────────────────────────────────────
const stats = [
  {
    value: 4,
    suffix: "",
    label: "Operating verticals",
    sublabel: "Athletics · Labs · Media · Ventures",
    isNumeric: true,
  },
  {
    value: 3,
    suffix: "+",
    label: "Active platforms",
    sublabel: "Across ecosystems and categories",
    isNumeric: true,
  },
  {
    value: 50,
    suffix: "+",
    label: "Athletes & operators",
    sublabel: "In the SKTR network",
    isNumeric: true,
  },
  {
    value: 5,
    suffix: "yr",
    label: "Building",
    sublabel: "Long-term conviction since day one",
    isNumeric: true,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function CountUp({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [inView, target]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: ease },
    },
  };

  return (
    <div ref={ref} className="w-full mt-16">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 border border-[rgba(131,145,190,0.2)]"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={[
              "relative flex flex-col justify-between p-6 sm:p-8",
              // Right border on all but last column
              i < stats.length - 1
                ? "border-r border-[rgba(131,145,190,0.2)]"
                : "",
              // Bottom border on top row of 2-col mobile layout
              i < 2 ? "border-b border-b-[rgba(131,145,190,0.2)] md:border-b-0" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {/* Active blue top accent on first stat */}
            {i === 0 && (
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-blue"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: ease }}
                style={{ originX: 0 }}
              />
            )}

            {/* Number */}
            <div
              className="font-extrabold tracking-[-0.06em] leading-[0.88] text-ink mb-4"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)" }}
            >
              {stat.isNumeric ? (
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              ) : (
                <span>
                  {stat.value}
                  {stat.suffix}
                </span>
              )}
            </div>

            {/* Label + sublabel */}
            <div>
              <p className="mono text-ink m-0 mb-1">{stat.label}</p>
              <p
                className="m-0 leading-snug"
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(232,235,240,0.42)",
                }}
              >
                {stat.sublabel}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
