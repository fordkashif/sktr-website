"use client";
import { ease } from "@/lib/motion";
import { motion } from "framer-motion";
import Link from "next/link";
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
          <p className="mono text-[rgba(232,235,240,0.52)] mb-[0.25rem]">Work</p>
          <h2
            className="m-0 font-extrabold leading-[0.96] tracking-[-0.05em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.15rem)" }}
          >
            Selected projects.
          </h2>
        </div>
        <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.18 }}>
          <Link
            href="/work"
            className="mono text-[rgba(232,235,240,0.38)] hover:text-blue transition-colors duration-150 shrink-0"
            style={{ fontSize: "0.78rem" }}
          >
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
          <Link
            href={`/work/${hero.slug}`}
            className="group grid grid-cols-1 md:grid-cols-2 border border-[rgba(131,145,190,0.14)] bg-card hover:border-[rgba(62,105,255,0.28)] transition-all duration-300 overflow-hidden block"
          >
            {/* Text */}
            <div className="flex flex-col gap-5 p-8 sm:p-10 md:p-12">
              <div className="flex items-center justify-between">
                <span
                  className="mono text-blue"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}
                >
                  {hero.category}
                </span>
                <span
                  className="mono text-[rgba(232,235,240,0.28)]"
                  style={{ fontSize: "0.62rem" }}
                >
                  {hero.year}
                </span>
              </div>
              <h3
                className="m-0 font-extrabold tracking-[-0.05em] leading-[1.0]"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
              >
                {hero.name}
              </h3>
              <p
                className="m-0 text-[rgba(232,235,240,0.62)] leading-[1.82]"
                style={{ fontSize: "0.95rem" }}
              >
                {hero.description}
              </p>
              <div className="flex flex-wrap gap-[0.4rem]">
                {hero.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="mono text-[rgba(232,235,240,0.34)] border border-[rgba(131,145,190,0.14)] px-2 py-[0.18rem]"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className="mono text-[rgba(232,235,240,0.28)] group-hover:text-blue transition-colors duration-200 mt-auto"
                style={{ fontSize: "0.72rem" }}
              >
                View case study →
              </span>
            </div>

            {/* Visual */}
            <div
              className="relative min-h-[240px] md:min-h-0 flex items-center justify-center overflow-hidden"
              style={{ background: heroVisual.gradient }}
            >
              <span
                className="font-extrabold tracking-[-0.1em] select-none pointer-events-none"
                style={{
                  fontSize: "clamp(6rem, 15vw, 12rem)",
                  color: heroVisual.labelColor,
                  lineHeight: 1,
                }}
              >
                {heroVisual.label}
              </span>
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={gridPattern}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
                }}
              />
            </div>
          </Link>
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
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col border border-[rgba(131,145,190,0.14)] bg-card hover:border-[rgba(62,105,255,0.3)] transition-all duration-300 h-full overflow-hidden block"
              >
                {/* Gradient thumbnail */}
                <div
                  className="relative h-[120px] flex items-center justify-center overflow-hidden shrink-0"
                  style={{ background: visual.gradient }}
                >
                  <span
                    className="font-extrabold tracking-[-0.08em] select-none pointer-events-none"
                    style={{ fontSize: "4.5rem", color: visual.labelColor, lineHeight: 1 }}
                  >
                    {visual.label}
                  </span>
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={gridPattern}
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="flex flex-col gap-4 p-7 flex-1">
                  <div className="flex justify-between items-center">
                    <span
                      className="mono text-blue"
                      style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="mono text-[rgba(232,235,240,0.26)]"
                      style={{ fontSize: "0.62rem" }}
                    >
                      {project.year}
                    </span>
                  </div>
                  <h3
                    className="m-0 font-extrabold tracking-[-0.04em] leading-tight"
                    style={{ fontSize: "1.4rem" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="m-0 text-[rgba(232,235,240,0.56)] leading-relaxed flex-1"
                    style={{ fontSize: "0.88rem" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-[0.4rem]">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="mono text-[rgba(232,235,240,0.34)] border border-[rgba(131,145,190,0.14)] px-2 py-[0.18rem]"
                        style={{ fontSize: "0.6rem", letterSpacing: "0.08em" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span
                    className="mono text-[rgba(232,235,240,0.26)] group-hover:text-blue transition-colors duration-200"
                    style={{ fontSize: "0.7rem" }}
                  >
                    View project →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
