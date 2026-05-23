"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="fixed bottom-8 right-8 z-[14] w-11 h-11 flex items-center justify-center bg-[rgba(5,6,8,0.88)] border border-[rgba(86,118,255,0.45)] text-blue cursor-pointer backdrop-blur-sm"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          whileHover={{
            borderColor: "rgba(86,118,255,0.85)",
            backgroundColor: "rgba(62,105,255,0.14)",
            scale: 1.06,
          }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7.5 12V3M2.5 8l5-5 5 5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
