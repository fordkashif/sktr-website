"use client";
import { ease } from "@/lib/motion";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ready || mobileOpen) return;
    const prev = scrollY.getPrevious() ?? 0;
    if (latest <= 8) {
      setHidden(false);
      setSolid(false);
    } else if (latest > prev && latest > 60) {
      setHidden(true);
    } else if (latest < prev && latest > 8) {
      setHidden(false);
      setSolid(true);
    }
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-4 right-4 sm:left-8 sm:right-8 z-20 flex justify-between items-center pt-[1.4rem] pb-[1.2rem] border-b text-[rgba(232,235,240,0.52)]"
        initial={{ opacity: 0, y: -24 }}
        animate={{
          opacity: hidden ? 0 : 1,
          y: hidden ? "-110%" : 0,
          backgroundColor:
            solid || mobileOpen ? "var(--surface-header)" : "rgba(0,0,0,0)",
          borderColor:
            solid || mobileOpen
              ? "var(--border-header)"
              : "rgba(131,145,190,0)",
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
          <Link href="/" aria-label="SKTR Labs home" className="flex items-center">
            <Image
              src="/sktr-logo.png"
              alt="SKTR"
              width={168}
              height={40}
              className="h-auto w-[clamp(7.5rem,12vw,10.5rem)]"
              priority
            />
          </Link>
        </div>

        {/* Nav — desktop */}
        <nav className="hidden md:flex flex-1 justify-center" aria-label="Primary">
          <div className="flex items-center gap-9">
            {navLinks.map(({ label, href }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative mono transition-colors duration-150 hover:text-ink"
                  style={{
                    color: isActive ? "#e8ebf0" : "rgba(232,235,240,0.68)",
                  }}
                >
                  {label}
                  <motion.span
                    className="absolute -bottom-[1.1rem] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-blue"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.22, ease: ease }}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Theme toggle — desktop */}
        <div className="hidden md:flex flex-none items-center">
          <ThemeToggle />
        </div>

        {/* CTA — desktop */}
        <div className="hidden md:flex flex-none justify-end">
          <motion.div
            className="border border-[rgba(86,118,255,0.46)] bg-[rgba(5,6,8,0.34)]"
            whileHover={{
              backgroundColor: "rgba(62,105,255,0.12)",
              borderColor: "rgba(86,118,255,0.7)",
              y: -1,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[2.8rem] px-4 text-ink mono"
            >
              Start a project
            </Link>
          </motion.div>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer bg-transparent border-0 p-0"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <motion.span
            className="block w-6 bg-ink origin-center"
            style={{ height: "1.5px" }}
            animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.26, ease: ease }}
          />
          <motion.span
            className="block w-6 bg-ink origin-center"
            style={{ height: "1.5px" }}
            animate={
              mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
            }
            transition={{ duration: 0.18 }}
          />
          <motion.span
            className="block w-6 bg-ink origin-center"
            style={{ height: "1.5px" }}
            animate={
              mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }
            }
            transition={{ duration: 0.26, ease: ease }}
          />
        </button>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[15] flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-24"
            style={{ backgroundColor: "var(--surface-mobile-nav)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {navLinks.map(({ label, href }, i) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(href));
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38, ease: ease }}
                >
                  <Link
                    href={href}
                    className="text-[2.2rem] font-extrabold tracking-[-0.05em]"
                    style={{ color: isActive ? "#3e69ff" : "#e8ebf0" }}
                  >
                    {label}
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: navLinks.length * 0.07,
                duration: 0.38,
                ease: ease,
              }}
              className="flex flex-col items-center gap-5"
            >
              <Link
                href="/contact"
                className="mt-4 mono text-blue border border-blue px-8 py-3 block"
                style={{ fontSize: "0.88rem", letterSpacing: "0.04em" }}
              >
                Start a project
              </Link>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
