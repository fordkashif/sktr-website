"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={pathname}
          className="fixed top-0 left-0 right-0 z-[9998] pointer-events-none"
          style={{ height: "2px" }}
          initial={{ scaleX: 0, transformOrigin: "0% 50%", opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: ease }}
        >
          <div className="h-full w-full bg-blue" style={{ boxShadow: "0 0 12px rgba(62,105,255,0.7)" }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
