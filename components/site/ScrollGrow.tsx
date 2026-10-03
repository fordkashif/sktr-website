"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps the hero screen. As the block scrolls up the page it publishes --p (0 to 1) so the
 * screen inside can grow to full size. Visitors who ask for reduced motion get full size at once.
 */
export default function ScrollGrow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // 0 while the block's top is at 70% of the screen, 1 once it reaches 12%
      const p = Math.min(1, Math.max(0, (vh * 0.7 - top) / (vh * 0.58)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
