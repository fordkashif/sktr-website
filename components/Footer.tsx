"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Platforms", href: "#platforms" },
  { label: "Innovation", href: "#future" },
  { label: "Thinking", href: "#thinking" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <motion.footer
      className="flex flex-col sm:flex-row justify-between items-center gap-4 flex-wrap mt-24 pt-[1.2rem] border-t border-[rgba(131,145,190,0.2)] mono text-[rgba(232,235,240,0.42)] pb-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-[1.35rem] flex-wrap">
        <span className="text-[rgba(232,235,240,0.3)] text-[0.78rem] tracking-[0.08em]">
          SKTR — Innovation Group
        </span>
        {links.map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            whileHover={{ color: "rgba(232,235,240,0.72)" }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span>© 2026 SKTR</span>
        <span>/</span>
        <motion.a
          href="mailto:signal@sktr.live"
          whileHover={{ color: "rgba(232,235,240,0.72)" }}
          transition={{ duration: 0.15 }}
        >
          signal@sktr.live
        </motion.a>
      </div>
    </motion.footer>
  );
}
