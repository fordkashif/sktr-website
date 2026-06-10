"use client";
import { ease } from "@/lib/motion";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { services, type Service } from "@/lib/services-data";

const gridLines = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
};

const cx = "max-w-[1200px] mx-auto w-full px-8 sm:px-14 lg:px-20";

function ServiceSection({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      id={service.id}
      className="py-14 border-b border-[var(--border-section)]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: ease }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div className="flex items-start gap-4">
          <span className="mono shrink-0 mt-1" style={{ fontSize: "0.58rem", color: "var(--ink-22)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <span className="mono text-blue block mb-2" style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}>
              {service.tag}
            </span>
            <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}>
              {service.title}
            </h2>
          </div>
        </div>
        <Link href="/contact" className="mono hover:text-blue transition-colors duration-150 shrink-0 sm:mt-1" style={{ fontSize: "0.66rem", color: "var(--ink-34)" }}>
          Start this project →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-16 mb-8">
        <p className="m-0 leading-[1.85]" style={{ fontSize: "clamp(0.92rem, 1.2vw, 1rem)", color: "var(--ink-68)" }}>
          {service.description}
        </p>
        <ul className="m-0 p-0 list-none flex flex-col gap-3">
          {service.included.map((item) => (
            <li key={item} className="flex items-start gap-3" style={{ fontSize: "0.88rem", color: "var(--ink-62)" }}>
              <span className="text-blue shrink-0 mt-[2px]">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-start gap-8 pt-6 border-t border-[var(--border-faint)]">
        <div className="flex flex-col gap-[0.3rem]">
          <span className="mono" style={{ fontSize: "0.54rem", letterSpacing: "0.14em", color: "var(--ink-26)" }}>Typical timeline</span>
          <span className="font-semibold" style={{ fontSize: "0.9rem", color: "var(--ink-80)" }}>{service.timeline}</span>
        </div>
        <div className="w-[1px] h-8 shrink-0 self-center" style={{ background: "var(--border-section)" }} />
        <div className="flex flex-col gap-[0.3rem]">
          <span className="mono" style={{ fontSize: "0.54rem", letterSpacing: "0.14em", color: "var(--ink-26)" }}>Best for</span>
          <span style={{ fontSize: "0.9rem", color: "var(--ink-60)" }}>{service.bestFor}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesClientPage() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main className="w-full">

        {/* ── Hero — always dark bg, keep hardcoded text colours ── */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(155deg, #060c28 0%, #050608 45%, #080d22 100%)" }} />
          <div className="absolute inset-0 opacity-[0.55]" style={gridLines} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at -5% 10%, rgba(62,105,255,0.28) 0%, transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 110% 110%, rgba(62,105,255,0.1) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(5,6,8,0.7) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #050608, transparent)" }} />
          <div className="absolute right-[6%] top-1/2 -translate-y-1/2 font-extrabold pointer-events-none select-none leading-none" style={{ fontSize: "clamp(14rem, 28vw, 26rem)", color: "rgba(62,105,255,0.055)", letterSpacing: "-0.1em" }}>
            07
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className={`${cx} pb-14 sm:pb-16`}>
              <motion.p className="mono text-blue mb-4" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease }}>
                Services
              </motion.p>
              <motion.h1 className="m-0 font-extrabold tracking-[-0.06em] leading-[0.91]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: ease }}>
                What we build.
              </motion.h1>
              <motion.p className="mt-5 max-w-[38rem]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", lineHeight: 1.7, color: "rgba(232,235,240,0.52)" }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: ease }}>
                Seven disciplines. One studio. From the first wireframe to production.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className={cx}>
          {services.map((service, i) => (
            <ServiceSection key={service.id} service={service} index={i} />
          ))}

          <motion.section className="mt-20 mb-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: ease }}>
            <div className="border border-[var(--border-blue-active)] px-8 sm:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Not sure which fits?</h2>
                <p className="mt-3 m-0" style={{ fontSize: "0.95rem", color: "var(--ink-56)" }}>Tell us about your project. We&apos;ll figure out the right approach together.</p>
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
