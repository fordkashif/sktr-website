"use client";
import { ease } from "@/lib/motion";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { projects } from "@/lib/projects";

const visuals: Record<string, { gradient: string; label: string; labelColor: string }> = {
  "abc-fast-or-slow": {
    gradient: "linear-gradient(135deg, #0d1a5c 0%, #1e3ea8 45%, #0a154a 100%)",
    label: "ABC",
    labelColor: "rgba(62,105,255,0.22)",
  },
  "bhbooking": {
    gradient: "linear-gradient(135deg, #071a10 0%, #0d3d22 50%, #050f09 100%)",
    label: "bh/",
    labelColor: "rgba(20,160,80,0.2)",
  },
  "client-work": {
    gradient: "linear-gradient(135deg, #0c0c1a 0%, #181828 50%, #080812 100%)",
    label: "{ }",
    labelColor: "rgba(131,145,190,0.18)",
  },
};

const gridPattern = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
  backgroundSize: "36px 36px",
};

const cx = "max-w-[1200px] mx-auto w-full px-8 sm:px-14 lg:px-20";

export default function WorkClientPage() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main className="w-full">

        {/* ── Hero ── */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          {/* Project gradients as background bands */}
          <div className="absolute inset-0 flex">
            {projects.map((p, i) => {
              const v = visuals[p.slug] ?? visuals["client-work"];
              return (
                <div
                  key={p.slug}
                  className="flex-1 h-full"
                  style={{ background: v.gradient, opacity: 0.55 + i * 0.05 }}
                />
              );
            })}
          </div>
          {/* Unified dark overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,6,8,0.85) 0%, rgba(5,6,8,0.6) 100%)" }} />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-40" style={gridPattern} />
          {/* Blue glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 55% 65% at -5% 15%, rgba(62,105,255,0.22) 0%, transparent 55%)" }} />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 25%, rgba(5,6,8,0.65) 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #050608, transparent)" }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className={`${cx} pb-14 sm:pb-16`}>
              <motion.p className="mono text-blue mb-4" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease }}>
                Work
              </motion.p>
              <motion.h1 className="m-0 font-extrabold tracking-[-0.06em] leading-[0.91]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: ease }}>
                Selected projects.
              </motion.h1>
              <motion.p className="mt-5 text-[rgba(232,235,240,0.52)] max-w-[38rem]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", lineHeight: 1.7 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: ease }}>
                Products we&apos;ve designed and built — from mobile games to SaaS platforms. Every one shipped to production.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Project grid */}
        <div className={cx}>
          <section className="mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {projects.map((project, i) => {
                const visual = visuals[project.slug] ?? visuals["client-work"];
                return (
                  <motion.div key={project.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.6, delay: i * 0.08, ease: ease }}>
                    <Link href={`/work/${project.slug}`} className="group flex flex-col border border-[var(--border-card)] bg-card hover:border-[var(--border-blue-active)] transition-all duration-300 h-full overflow-hidden block">
                      <div className="relative h-[160px] flex items-center justify-center overflow-hidden shrink-0" style={{ background: visual.gradient }}>
                        <span className="font-extrabold tracking-[-0.08em] select-none pointer-events-none" style={{ fontSize: "5.5rem", color: visual.labelColor, lineHeight: 1 }}>
                          {visual.label}
                        </span>
                        <div className="absolute inset-0 opacity-30 pointer-events-none" style={gridPattern} />
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent" />
                      </div>
                      <div className="flex flex-col gap-4 p-7 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="mono text-blue" style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}>{project.category}</span>
                          <span className="mono" style={{ color: "var(--ink-28)", fontSize: "0.62rem" }}>{project.year}</span>
                        </div>
                        <h2 className="m-0 font-extrabold tracking-[-0.04em] leading-tight" style={{ fontSize: "1.55rem" }}>{project.name}</h2>
                        <p className="m-0 leading-relaxed flex-1" style={{ color: "var(--ink-62)", fontSize: "0.9rem" }}>{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((t) => (
                            <span key={t} className="mono border border-[var(--border-card)] px-2 py-[0.2rem]" style={{ fontSize: "0.62rem", letterSpacing: "0.08em", color: "var(--ink-36)" }}>{t}</span>
                          ))}
                        </div>
                        <span className="mono group-hover:text-blue transition-colors duration-150" style={{ fontSize: "0.72rem", color: "var(--ink-30)" }}>View project →</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <motion.section className="mt-20 mb-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: ease }}>
            <div className="border border-[var(--border-blue-active)] px-8 sm:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Want to work with us?</h2>
                <p className="mt-3 m-0" style={{ fontSize: "0.95rem", color: "var(--ink-56)" }}>Tell us what you&apos;re building. We&apos;ll take it from there.</p>
              </div>
              <motion.div className="shrink-0" whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(62,105,255,0.32)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 min-h-[3rem] px-8 bg-blue text-white font-semibold border border-blue" style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}>
                  Start a project →
                </Link>
              </motion.div>
            </div>
          </motion.section>

          <Footer />
        </div>
      </main>
      <ScrollToTop />
    </MotionConfig>
  );
}
