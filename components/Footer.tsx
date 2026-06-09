"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <motion.footer
      className="mt-24 border-t border-[rgba(131,145,190,0.14)] pt-12 pb-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 pb-12">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div>
            <p
              className="font-extrabold tracking-[-0.04em] text-ink m-0"
              style={{ fontSize: "1.05rem" }}
            >
              SKTR Labs
            </p>
            <p
              className="mono text-[rgba(232,235,240,0.28)] m-0 mt-1"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
            >
              Software Studio
            </p>
          </div>
          <p
            className="m-0 text-[rgba(232,235,240,0.42)] leading-relaxed"
            style={{ fontSize: "0.86rem" }}
          >
            We design and build mobile apps, web platforms, SaaS products, and
            APIs. Jamaica-based, globally deployed.
          </p>
          <motion.a
            href="mailto:signal@thesktr.com"
            className="mono text-[rgba(232,235,240,0.36)] w-fit"
            style={{ fontSize: "0.64rem", letterSpacing: "0.12em" }}
            whileHover={{ color: "#3e69ff" }}
            transition={{ duration: 0.15 }}
          >
            signal@thesktr.com
          </motion.a>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <p
            className="mono text-[rgba(232,235,240,0.26)] mb-1"
            style={{ fontSize: "0.56rem", letterSpacing: "0.18em" }}
          >
            Navigate
          </p>
          <nav className="flex flex-col gap-3">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[rgba(232,235,240,0.5)] hover:text-ink transition-colors duration-150 font-medium w-fit"
                style={{ fontSize: "0.9rem" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-4">
          <p
            className="mono text-[rgba(232,235,240,0.26)] mb-1"
            style={{ fontSize: "0.56rem", letterSpacing: "0.18em" }}
          >
            Start a project
          </p>
          <p
            className="m-0 text-[rgba(232,235,240,0.46)] leading-relaxed"
            style={{ fontSize: "0.86rem" }}
          >
            We respond to every inquiry within 48 hours. Tell us what you&apos;re
            building.
          </p>
          <motion.div
            className="self-start"
            whileHover={{ scale: 1.02, boxShadow: "0 6px 22px rgba(62,105,255,0.3)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 min-h-[2.6rem] px-6 bg-blue text-white font-semibold border border-blue mono"
              style={{ fontSize: "0.72rem", letterSpacing: "0.04em" }}
            >
              Start a project →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(131,145,190,0.08)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span
          className="mono text-[rgba(232,235,240,0.2)]"
          style={{ fontSize: "0.64rem" }}
        >
          © SKTR Labs 2026
        </span>
        <span
          className="mono text-[rgba(232,235,240,0.14)]"
          style={{ fontSize: "0.64rem" }}
        >
          Part of the SKTR Group
        </span>
      </div>
    </motion.footer>
  );
}
