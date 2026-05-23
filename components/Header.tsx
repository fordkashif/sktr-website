"use client";
import { ease } from "@/lib/motion";
import { verticals } from "@/lib/verticals";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Ecosystem", href: "#ecosystem", hasDropdown: true },
  { label: "Platforms", href: "#platforms", hasDropdown: false },
  { label: "Innovation", href: "#future", hasDropdown: false },
  { label: "Thinking", href: "#thinking", hasDropdown: false },
];

const ecosystemLinks = verticals.map((v) => ({
  label: v.title,
  tag: v.tag,
  href: `/${v.slug}`,
}));

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const linkBase = isHome ? "" : "/";

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [mobileEcosystemOpen, setMobileEcosystemOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) setActiveSection(`#${visible[0].target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEcosystemOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ready || mobileOpen) return;
    const prev = scrollY.getPrevious() ?? 0;
    if (latest <= 8) { setHidden(false); setSolid(false); }
    else if (latest > prev && latest > 60) setHidden(true);
    else if (latest < prev && latest > 8) { setHidden(false); setSolid(true); }
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-4 right-4 sm:left-8 sm:right-8 z-20 flex justify-between items-center pt-[1.4rem] pb-[1.2rem] border-b text-[rgba(232,235,240,0.52)]"
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: hidden ? 0 : 1,
          y: hidden ? "-110%" : 0,
          backgroundColor: solid || mobileOpen ? "rgba(5,6,8,0.96)" : "rgba(0,0,0,0)",
          borderColor: solid || mobileOpen ? "rgba(131,145,190,0.26)" : "rgba(131,145,190,0)",
        }}
        transition={{
          opacity: { duration: 0.3, delay: ready ? 0 : 0.5 },
          y: ready
            ? { type: "spring", stiffness: 280, damping: 28 }
            : { duration: 0.7, delay: 0.4, ease: ease },
          backgroundColor: { duration: 0.3 },
          borderColor: { duration: 0.3 },
        }}
      >
        {/* Logo */}
        <div className="flex-none">
          <a
            href={`${linkBase}#top`}
            aria-label="SKTR home"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/sktr-logo.png"
              alt="SKTR"
              width={168}
              height={40}
              className="h-auto w-[clamp(7.5rem,12vw,10.5rem)]"
              priority
            />
          </a>
        </div>

        {/* Nav — desktop only */}
        <nav className="hidden md:flex flex-1 justify-center" aria-label="Primary">
          <div className="flex items-center gap-9">
            {navLinks.map(({ label, href, hasDropdown }) => {
              const isActive = activeSection === href;

              if (hasDropdown) {
                return (
                  <div
                    key={label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setEcosystemOpen(true)}
                    onMouseLeave={() => setEcosystemOpen(false)}
                  >
                    {/* Ecosystem trigger */}
                    <a
                      href={`${linkBase}${href}`}
                      className="relative mono flex items-center gap-1 transition-colors duration-150"
                      style={{ color: isActive || ecosystemOpen ? "#e8ebf0" : "rgba(232,235,240,0.68)" }}
                    >
                      {label}
                      <motion.svg
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                        animate={{ rotate: ecosystemOpen ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: ease }}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                      <motion.span
                        className="absolute -bottom-[1.1rem] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-blue"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                        transition={{ duration: 0.22, ease: ease }}
                      />
                    </a>

                    {/* Desktop dropdown */}
                    <AnimatePresence>
                      {ecosystemOpen && (
                        <motion.div
                          className="absolute top-[calc(100%+1.1rem)] left-1/2 -translate-x-1/2 w-[220px] border border-[rgba(131,145,190,0.2)] overflow-hidden"
                          style={{ backgroundColor: "rgba(5,6,8,0.98)", backdropFilter: "blur(12px)" }}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18, ease: ease }}
                        >
                          {ecosystemLinks.map(({ label: vLabel, tag, href: vHref }, i) => (
                            <Link
                              key={vHref}
                              href={vHref}
                              className="flex justify-between items-center px-4 py-3 hover:bg-[rgba(62,105,255,0.08)] transition-colors duration-150 group"
                              style={{
                                borderTop: i > 0 ? "1px solid rgba(131,145,190,0.12)" : "none",
                              }}
                              onClick={() => setEcosystemOpen(false)}
                            >
                              <span className="mono text-ink group-hover:text-blue transition-colors duration-150" style={{ fontSize: "0.78rem", letterSpacing: "0.1em" }}>
                                {vLabel.replace("SKTR ", "")}
                              </span>
                              <span className="mono text-[rgba(232,235,240,0.36)]" style={{ fontSize: "0.66rem", letterSpacing: "0.12em" }}>
                                {tag}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={label}
                  href={`${linkBase}${href}`}
                  className="relative mono transition-colors duration-150 hover:text-ink"
                  style={{ color: isActive ? "#e8ebf0" : "rgba(232,235,240,0.68)" }}
                >
                  {label}
                  <motion.span
                    className="absolute -bottom-[1.1rem] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-blue"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.22, ease: ease }}
                  />
                </a>
              );
            })}
          </div>
        </nav>

        {/* CTA — desktop only */}
        <div className="hidden md:flex flex-none justify-end">
          <motion.a
            href={`${linkBase}#contact`}
            className="inline-flex items-center justify-center min-h-[2.8rem] px-4 border border-[rgba(86,118,255,0.46)] bg-[rgba(5,6,8,0.34)] text-ink mono"
            whileHover={{ backgroundColor: "rgba(62,105,255,0.12)", borderColor: "rgba(86,118,255,0.7)", y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            Connect
          </motion.a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer bg-transparent border-0 p-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <motion.span className="block w-6 bg-ink origin-center" style={{ height: "1.5px" }}
            animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.26, ease: ease }}
          />
          <motion.span className="block w-6 bg-ink origin-center" style={{ height: "1.5px" }}
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.18 }}
          />
          <motion.span className="block w-6 bg-ink origin-center" style={{ height: "1.5px" }}
            animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.26, ease: ease }}
          />
        </button>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[15] flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-24"
            style={{ backgroundColor: "rgba(5,6,8,0.98)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navLinks.map(({ label, href, hasDropdown }, i) => {
              const isActive = activeSection === href;

              if (hasDropdown) {
                return (
                  <motion.div
                    key={label}
                    className="flex flex-col items-center gap-3 w-full px-8"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.38, ease: ease }}
                  >
                    {/* Ecosystem toggle */}
                    <button
                      className="flex items-center gap-2 text-[2.2rem] font-extrabold tracking-[-0.05em] cursor-pointer bg-transparent border-0 p-0"
                      style={{ color: isActive ? "#3e69ff" : "#e8ebf0" }}
                      onClick={() => setMobileEcosystemOpen((o) => !o)}
                    >
                      {label}
                      <motion.svg
                        width="20" height="20" viewBox="0 0 10 10" fill="none"
                        animate={{ rotate: mobileEcosystemOpen ? 180 : 0 }}
                        transition={{ duration: 0.22, ease: ease }}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </button>

                    {/* Mobile ecosystem sub-links */}
                    <AnimatePresence>
                      {mobileEcosystemOpen && (
                        <motion.div
                          className="flex flex-col items-center gap-3 w-full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: ease }}
                        >
                          {ecosystemLinks.map(({ label: vLabel, href: vHref }, j) => (
                            <motion.div
                              key={vHref}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: j * 0.05, duration: 0.25, ease: ease }}
                            >
                              <Link
                                href={vHref}
                                className="mono text-blue flex items-center gap-1"
                                style={{ fontSize: "0.88rem", letterSpacing: "0.1em" }}
                                onClick={() => { setMobileOpen(false); setMobileEcosystemOpen(false); }}
                              >
                                {vLabel.replace("SKTR ", "")} →
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              }

              return (
                <motion.a
                  key={label}
                  href={`${linkBase}${href}`}
                  className="text-[2.2rem] font-extrabold tracking-[-0.05em]"
                  style={{ color: isActive ? "#3e69ff" : "#e8ebf0" }}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38, ease: ease }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </motion.a>
              );
            })}

            <motion.a
              href={`${linkBase}#contact`}
              className="mt-4 mono text-blue border border-blue px-8 py-3"
              style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07, duration: 0.38, ease: ease }}
              onClick={() => setMobileOpen(false)}
            >
              Connect
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
