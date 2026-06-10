"use client";
import { ease } from "@/lib/motion";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/lib/projects";

const visuals: Record<string, { gradient: string; label: string; labelColor: string }> = {
  "abc-fast-or-slow": {
    gradient: "linear-gradient(135deg, #0d1a5c 0%, #1e3ea8 45%, #0a154a 100%)",
    label: "ABC",
    labelColor: "rgba(62,105,255,0.2)",
  },
  "bhbooking": {
    gradient: "linear-gradient(135deg, #071a10 0%, #0d3d22 50%, #050f09 100%)",
    label: "bh/",
    labelColor: "rgba(20,160,80,0.18)",
  },
  "client-work": {
    gradient: "linear-gradient(135deg, #0c0c1a 0%, #181828 50%, #080812 100%)",
    label: "{ }",
    labelColor: "rgba(131,145,190,0.16)",
  },
};

const gridPattern = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawRX = useMotionValue(0);
  const rawRY = useMotionValue(0);
  const rotateX = useSpring(rawRX, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useSpring(rawRY, { stiffness: 200, damping: 22, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawRY.set(((e.clientX - r.left) / r.width * 2 - 1) * 6);
    rawRX.set(-((e.clientY - r.top) / r.height * 2 - 1) * 4);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={() => { rawRX.set(0); rawRY.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LabsFeaturedWork() {
  const featured = projects.filter((p) => p.featured);
  const [hero, ...rest] = featured;
  const heroVisual = visuals[hero?.slug] ?? visuals["client-work"];

  return (
    <section className="mt-24" id="work">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: ease }}
      >
        <div>
          <p className="mono mb-[0.25rem]" style={{ color: "var(--ink-52)" }}>Work</p>
          <h2 className="m-0 font-extrabold leading-[0.96] tracking-[-0.05em]" style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}>
            Selected projects.
          </h2>
        </div>
        <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.18 }}>
          <Link href="/work" className="mono hover:text-blue transition-colors duration-150 shrink-0" style={{ fontSize: "0.78rem", color: "var(--ink-38)" }}>
            All work →
          </Link>
        </motion.div>
      </motion.div>

      {/* Featured hero card */}
      {hero && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: ease }}
        >
          <TiltCard>
            <Link
              href={`/work/${hero.slug}`}
              data-cursor="view"
              className="group grid grid-cols-1 md:grid-cols-2 border border-[var(--border-card)] bg-card hover:border-[var(--border-blue-active)] transition-all duration-300 overflow-hidden block"
            >
              <div className="flex flex-col gap-5 p-8 sm:p-10 md:p-12">
                <div className="flex items-center justify-between">
                  <span className="mono text-blue" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}>{hero.category}</span>
                  <span className="mono" style={{ fontSize: "0.62rem", color: "var(--ink-28)" }}>{hero.year}</span>
                </div>
                <h3 className="m-0 font-extrabold tracking-[-0.05em] leading-[1.0]" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
                  {hero.name}
                </h3>
                <p className="m-0 leading-[1.82]" style={{ fontSize: "0.95rem", color: "var(--ink-62)" }}>
                  {hero.description}
                </p>
                <div className="flex flex-wrap gap-[0.4rem]">
                  {hero.tech.slice(0, 4).map((t) => (
                    <span key={t} className="mono border border-[var(--border-card)] px-2 py-[0.18rem]" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--ink-34)" }}>
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mono group-hover:text-blue transition-colors duration-200 mt-auto" style={{ fontSize: "0.72rem", color: "var(--ink-28)" }}>
                  View case study →
                </span>
              </div>

              {/* Visual — always dark, project-specific gradient */}
              <div className="relative min-h-[240px] md:min-h-0 flex items-center justify-center overflow-hidden" style={{ background: heroVisual.gradient }}>
                <span className="font-extrabold tracking-[-0.1em] select-none pointer-events-none" style={{ fontSize: "clamp(6rem, 15vw, 12rem)", color: heroVisual.labelColor, lineHeight: 1 }}>
                  {heroVisual.label}
                </span>
                <div className="absolute inset-0 opacity-40 pointer-events-none" style={gridPattern} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
              </div>
            </Link>
          </TiltCard>
        </motion.div>
      )}

      {/* Smaller cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {rest.map((project, i) => {
          const visual = visuals[project.slug] ?? visuals["client-work"];
          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.58, delay: i * 0.1, ease: ease }}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  className="group flex flex-col border border-[var(--border-card)] bg-card hover:border-[var(--border-blue-active)] transition-all duration-300 h-full overflow-hidden block"
                >
                  <div className="relative h-[120px] flex items-center justify-center overflow-hidden shrink-0" style={{ background: visual.gradient }}>
                    <span className="font-extrabold tracking-[-0.08em] select-none pointer-events-none" style={{ fontSize: "4.5rem", color: visual.labelColor, lineHeight: 1 }}>
                      {visual.label}
                    </span>
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={gridPattern} />
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  <div className="flex flex-col gap-4 p-7 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="mono text-blue" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}>{project.category}</span>
                      <span className="mono" style={{ fontSize: "0.62rem", color: "var(--ink-26)" }}>{project.year}</span>
                    </div>
                    <h3 className="m-0 font-extrabold tracking-[-0.04em] leading-tight" style={{ fontSize: "1.4rem" }}>
                      {project.name}
                    </h3>
                    <p className="m-0 leading-relaxed flex-1" style={{ fontSize: "0.88rem", color: "var(--ink-56)" }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-[0.4rem]">
                      {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="mono border border-[var(--border-card)] px-2 py-[0.18rem]" style={{ fontSize: "0.6rem", letterSpacing: "0.08em", color: "var(--ink-34)" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mono group-hover:text-blue transition-colors duration-200" style={{ fontSize: "0.7rem", color: "var(--ink-26)" }}>
                      View project →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
