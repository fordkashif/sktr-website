"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const verticalLinks = [
  { label: "Athletics", href: "/athletics" },
  { label: "Labs", href: "/labs" },
  { label: "Media", href: "/media" },
  { label: "Ventures", href: "/ventures" },
];

export default function Footer() {
  return (
    <motion.footer
      className="mt-24 pt-8 border-t border-[rgba(131,145,190,0.2)] pb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Left: brand + verticals */}
        <div>
          <p className="mono text-[rgba(232,235,240,0.28)] mb-5" style={{ fontSize: "0.72rem", letterSpacing: "0.22em" }}>
            SKTR — Innovation Group
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {verticalLinks.map(({ label, href }) => (
              <motion.div key={href}>
                <Link
                  href={href}
                  className="mono text-[rgba(232,235,240,0.38)] hover:text-[rgba(232,235,240,0.72)] transition-colors duration-150"
                  style={{ fontSize: "0.72rem" }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: email + copyright */}
        <div className="flex flex-col items-start sm:items-end gap-2 mono" style={{ fontSize: "0.72rem" }}>
          <motion.a
            href="mailto:signal@thesktr.com"
            className="text-[rgba(232,235,240,0.38)]"
            whileHover={{ color: "#3e69ff" }}
            transition={{ duration: 0.15 }}
          >
            signal@thesktr.com
          </motion.a>
          <span className="text-[rgba(232,235,240,0.22)]">© 2026 SKTR</span>
        </div>
      </div>
    </motion.footer>
  );
}
