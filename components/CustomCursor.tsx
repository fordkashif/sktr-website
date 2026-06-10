"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "view";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Ring lags behind with spring
  const rx = useSpring(mx, { stiffness: 280, damping: 24, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 280, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    setMounted(true);
    document.documentElement.setAttribute("data-custom-cursor", "true");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const dataCursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (dataCursorEl?.dataset.cursor) {
        setState(dataCursorEl.dataset.cursor as CursorState);
      } else if (target.closest("a, button, [role='button']")) {
        setState("hover");
      } else {
        setState("default");
      }
    };

    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Dot — instant */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-blue"
        style={{ x: mx, y: my }}
        animate={{
          width: state === "view" ? 7 : 5,
          height: state === "view" ? 7 : 5,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — spring lag */}
      <motion.div
        className="absolute top-0 left-0 rounded-full border"
        style={{ x: rx, y: ry }}
        animate={{
          width: state === "view" ? 64 : state === "hover" ? 38 : 28,
          height: state === "view" ? 64 : state === "hover" ? 38 : 28,
          translateX: "-50%",
          translateY: "-50%",
          borderColor:
            state === "view"
              ? "rgba(62,105,255,0.85)"
              : state === "hover"
              ? "rgba(62,105,255,0.65)"
              : "rgba(62,105,255,0.35)",
          backgroundColor:
            state === "hover" ? "rgba(62,105,255,0.06)" : "transparent",
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 28 }}
      >
        <AnimatePresence>
          {state === "view" && (
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-blue font-semibold"
              style={{ fontSize: "0.48rem", letterSpacing: "0.12em" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
