"use client";
import { ease } from "@/lib/motion";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

const gridLines = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
  backgroundSize: "80px 80px",
};

const studioFacts = [
  { label: "Type", value: "Software Studio" },
  { label: "Founded", value: "2024" },
  { label: "Based", value: "Jamaica" },
  { label: "Services", value: "7 disciplines" },
  { label: "Group", value: "SKTR Group" },
];

const values = [
  { num: "01", title: "Scope before code", desc: "We define the problem clearly before we write a line of code. No guessing, no over-engineering for requirements that don't exist." },
  { num: "02", title: "Design and build together", desc: "We design the interfaces we build. What ships matches what was designed — no translation loss between Figma and production." },
  { num: "03", title: "Ship working software", desc: "We build iteratively and ship working increments. A finished product built wrong is worse than a smaller product built right." },
  { num: "04", title: "One point of contact", desc: "You work directly with the people building your product — not account managers. That keeps decisions fast and context intact." },
];

const cx = "max-w-[1200px] mx-auto w-full px-8 sm:px-14 lg:px-20";

export default function AboutClientPage() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main className="w-full">

        {/* ── Hero — always dark bg ── */}
        <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #050710 0%, #050608 50%, #060810 100%)" }} />
          <div className="absolute inset-0 opacity-[0.5]" style={gridLines} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 75% at -8% 20%, rgba(62,105,255,0.2) 0%, transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 110% 80%, rgba(62,105,255,0.08) 0%, transparent 60%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 20%, rgba(5,6,8,0.72) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, #050608, transparent)" }} />
          <div className="absolute -bottom-8 -left-4 font-extrabold pointer-events-none select-none leading-none" style={{ fontSize: "clamp(14rem, 26vw, 24rem)", color: "rgba(62,105,255,0.04)", letterSpacing: "-0.08em" }}>
            LABS
          </div>
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className={`${cx} pb-14 sm:pb-16`}>
              <motion.p className="mono text-blue mb-4" style={{ fontSize: "0.62rem", letterSpacing: "0.18em" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease }}>
                About
              </motion.p>
              <motion.h1 className="m-0 font-extrabold tracking-[-0.06em] leading-[0.91]" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: ease }}>
                SKTR Labs.
              </motion.h1>
              <motion.div className="mt-6 border-l-2 border-[rgba(62,105,255,0.45)] pl-5 max-w-[42rem]" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: ease }}>
                <p className="m-0 leading-[1.65] italic" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", color: "rgba(232,235,240,0.55)" }}>
                  &ldquo;We don&apos;t optimise for output volume. We optimise for software that works.&rdquo;
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className={cx}>

          {/* Who we are */}
          <motion.section className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-24" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: ease }}>
            <div>
              <p className="mono mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.14em", color: "var(--ink-38)" }}>Who we are</p>
              <h2 className="m-0 font-extrabold tracking-[-0.04em] leading-[1.05]" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>
                A software studio that builds things that work.
              </h2>
            </div>
            <div className="flex flex-col gap-5 leading-[1.85]" style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)", color: "var(--ink-68)" }}>
              <p className="m-0">SKTR Labs is a software studio. We design and build mobile apps, web platforms, SaaS products, and APIs. We work with startups, independent founders, and businesses that need software done properly.</p>
              <p className="m-0">The work spans the full stack: from interface design in Figma to production deployment on cloud infrastructure. We&apos;ve built mobile games with real-time leaderboards, SaaS booking platforms, and custom software for clients across industries.</p>
              <p className="m-0">We don&apos;t separate design from engineering. The same people who design the interface build it — which means fewer surprises and faster decisions.</p>
            </div>
          </motion.section>

          {/* Studio profile */}
          <motion.section className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-24 items-start" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: ease }}>
            <div>
              <p className="mono mb-5" style={{ fontSize: "0.64rem", letterSpacing: "0.14em", color: "var(--ink-38)" }}>Studio profile</p>
            </div>
            <div className="border border-[var(--border-card)]">
              {studioFacts.map(({ label, value }, i) => (
                <motion.div key={label} className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-faint)] last:border-b-0" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}>
                  <span className="mono" style={{ fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--ink-36)" }}>{label}</span>
                  <span className="font-semibold" style={{ fontSize: "0.9rem", color: "var(--ink-80)" }}>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Values */}
          <motion.section className="mt-20" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: ease }}>
            <div className="mb-10">
              <p className="mono mb-[0.3rem]" style={{ fontSize: "0.64rem", letterSpacing: "0.14em", color: "var(--ink-38)" }}>How we work</p>
              <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)" }}>Principles we don&apos;t compromise on.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[var(--border-card)] bg-[var(--border-section)]">
              {values.map((v, i) => (
                <motion.div key={v.title} className="p-8 sm:p-10 bg-card flex flex-col gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: i * 0.07, ease: ease }}>
                  <span className="mono text-blue" style={{ fontSize: "0.58rem", letterSpacing: "0.1em" }}>{v.num}</span>
                  <h3 className="m-0 font-extrabold tracking-[-0.03em]" style={{ fontSize: "1.1rem" }}>{v.title}</h3>
                  <p className="m-0 leading-[1.78]" style={{ fontSize: "0.9rem", color: "var(--ink-60)" }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* SKTR Group */}
          <motion.section className="mt-16 border border-[var(--border-card)] bg-card p-8 sm:p-10" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: ease }}>
            <p className="mono mb-5" style={{ fontSize: "0.62rem", letterSpacing: "0.14em", color: "var(--ink-36)" }}>Part of SKTR Group</p>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20">
              <h3 className="m-0 font-extrabold tracking-[-0.04em] leading-[1.1]" style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}>Labs is the operational engine of the SKTR group.</h3>
              <p className="m-0 leading-[1.8]" style={{ fontSize: "0.95rem", color: "var(--ink-60)" }}>Labs sits within the broader SKTR group, alongside Athletics, Media, and Ventures. These verticals are in different stages of development — Labs is the working product. The group is built for the long term, not for a quick exit.</p>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section className="mt-20 mb-4" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, ease: ease }}>
            <div className="border border-[var(--border-blue-active)] px-8 sm:px-14 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="m-0 font-extrabold tracking-[-0.04em]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>Let&apos;s build something.</h2>
                <p className="mt-3 m-0" style={{ fontSize: "0.95rem", color: "var(--ink-56)" }}>Reach us at <a href="mailto:signal@thesktr.com" className="text-blue hover:underline">signal@thesktr.com</a> or fill out the project form.</p>
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
