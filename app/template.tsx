"use client";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
      exit={{    opacity: 0, y: -12, filter: "blur(2px)" }}
      transition={{ duration: 0.48, ease: ease }}
    >
      {children}
    </motion.div>
  );
}
