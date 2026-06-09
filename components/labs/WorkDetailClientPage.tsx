"use client";
import { ease } from "@/lib/motion";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import type { Project } from "@/lib/projects";

const projectVisuals: Record<string, { gradient: string; gridColor: string }> = {
  "abc-fast-or-slow": {
    gradient: "linear-gradient(155deg, #060e38 0%, #0d1f6e 40%, #1830a0 70%, #091240 100%)",
    gridColor: "rgba(62,105,255,0.12)",
  },
  "bhbooking": {
    gradient: "linear-gradient(155deg, #030f07 0%, #061a0d 40%, #0d3520 70%, #041008 100%)",
    gridColor: "rgba(20,160,80,0.1)",
  },
  "client-work": {
    gradient: "linear-gradient(155deg, #080810 0%, #0e0e20 40%, #141428 70%, #060610 100%)",
    gridColor: "rgba(131,145,190,0.1)",
  },
};

const cx = "max-w-[1200px] mx-auto w-full px-8 sm:px-14 lg:px-20";

export default function WorkDetailClientPage({ project }: { project: Project }) {
  const visual = projectVisuals[project.slug] ?? projectVisuals["client-work"];

  const gridLines = {
    backgroundImage: `linear-gradient(${visual.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${visual.gridColor} 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
  };

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main className="w-full">

        {/* ── Hero ── */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          {/* Project gradient fills the hero */}
          <div className="absolute inset-0" style={{ background: visual.gradient }} />
          {/* Grid texture */}
          <div className="absolute inset-0 opacity-[0.6]" style={gridLines} />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(5,6,8,0.7) 0%, rgba(5,6,8,0.3) 100%)" }} />
          {/* Vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(5,6,8,0.6) 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, #050608 0%, transparent 100%)" }} />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className={`${cx} pb-14 sm:pb-16`}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: ease }}>
                <Link href="/work" className="mono text-[rgba(232,235,240,0.38)] hover:text-blue transition-colors duration-150 inline-flex items-center gap-2 mb-6" style={{ fontSize: "0.68rem" }}>
                  ← All work
                </Link>
              </motion.div>

              <motion.div className="flex flex-wrap items-center gap-3 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06, ease: ease }}>
                <span className="mono text-blue" style={{ fontSize: "0.62rem", letterSpacing: "0.16em" }}>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-[rgba(131,145,190,0.4)]" />
                <span className="mono text-[rgba(232,235,240,0.38)]" style={{ fontSize: "0.62rem" }}>{project.year}</span>
                <span className="w-1 h-1 rounded-full bg-[rgba(131,145,190,0.4)]" />
                <span className="mono text-[rgba(232,235,240,0.38)]" style={{ fontSize: "0.62rem", textTransform: "capitalize" }}>{project.status}</span>
              </motion.div>

              <motion.h1 className="m-0 font-extrabold tracking-[-0.06em] leading-[0.91]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: ease }}>
                {project.name}
              </motion.h1>

              <motion.p className="mt-4 text-[rgba(232,235,240,0.55)] max-w-[40rem]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", lineHeight: 1.7 }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: ease }}>
                {project.tagline}
              </motion.p>

              <motion.div className="flex flex-wrap gap-2 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: ease }}>
                {project.tech.map((t) => (
                  <span key={t} className="mono text-[rgba(232,235,240,0.45)] border border-[rgba(255,255,255,0.15)] px-3 py-[0.3rem]" style={{ fontSize: "0.68rem", letterSpacing: "0.06em" }}>{t}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className={cx}>
          {project.overview && (
            <motion.section className="mt-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: ease }}>
              <p className="mono text-[rgba(232,235,240,0.38)] mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.14em" }}>Overview</p>
              <p className="text-[rgba(232,235,240,0.8)] leading-[1.85] max-w-[56rem]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.08rem)" }}>{project.overview}</p>
            </motion.section>
          )}

          {(project.problem || project.solution) && (
            <motion.section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-px border border-[rgba(131,145,190,0.12)] bg-[rgba(131,145,190,0.1)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: ease }}>
              {project.problem && (
                <div className="p-8 sm:p-10 bg-card">
                  <p className="mono text-[rgba(232,235,240,0.38)] mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.14em" }}>Problem</p>
                  <p className="m-0 text-[rgba(232,235,240,0.72)] leading-[1.8]" style={{ fontSize: "0.95rem" }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-8 sm:p-10 bg-card">
                  <p className="mono text-[rgba(232,235,240,0.38)] mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.14em" }}>Solution</p>
                  <p className="m-0 text-[rgba(232,235,240,0.72)] leading-[1.8]" style={{ fontSize: "0.95rem" }}>{project.solution}</p>
                </div>
              )}
            </motion.section>
          )}

          {project.outcome && (
            <motion.section className="mt-12 p-8 sm:p-10 border border-[rgba(62,105,255,0.2)] bg-[rgba(62,105,255,0.04)]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: ease }}>
              <p className="mono text-blue mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.16em" }}>Outcome</p>
              <p className="m-0 text-[rgba(232,235,240,0.8)] leading-[1.85] max-w-[52rem]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)" }}>{project.outcome}</p>
            </motion.section>
          )}

          <motion.section className="mt-20 mb-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: ease }}>
            <div className="border border-[rgba(62,105,255,0.28)] px-8 sm:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Build something like this?</h2>
                <p className="mt-3 m-0 text-[rgba(232,235,240,0.56)]" style={{ fontSize: "0.95rem" }}>Tell us about your project and we&apos;ll take it from there.</p>
              </div>
              <motion.div className="shrink-0" whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(62,105,255,0.32)" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
                <Link href="/contact" className="inline-flex items-center gap-2 min-h-[3rem] px-8 bg-blue text-white font-semibold border border-blue" style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}>Start a project →</Link>
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
