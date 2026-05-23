"use client";

import { useEffect, useRef } from "react";

interface WaveSettings {
  intensity: number;
  speed: number;
}

interface WaveMiniProps {
  label?: string;
  waveSettings: WaveSettings;
}

export default function WaveMini({ label, waveSettings }: WaveMiniProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const pointerXRef = useRef(0.35);
  const settingsRef = useRef(waveSettings);
  const visibleRef = useRef(false);

  useEffect(() => {
    settingsRef.current = waveSettings;
  }, [waveSettings]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let waveWidth = 0;
    let waveHeight = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      waveWidth = rect.width;
      waveHeight = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx || !visibleRef.current) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      timeRef.current += 0.018;
      ctx.clearRect(0, 0, waveWidth, waveHeight);

      const s = settingsRef.current;
      const baseY = waveHeight * 0.62;
      const glow = ctx.createLinearGradient(0, 0, waveWidth, 0);
      glow.addColorStop(0, "rgba(62,105,255,0.95)");
      glow.addColorStop(1, "rgba(115,145,255,0.68)");

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = glow;

      for (let x = 0; x <= waveWidth; x += 2) {
        const soft = Math.sin(x * 0.026 + timeRef.current * 2.3) * 1.4;
        const detail = Math.sin(x * 0.12 + timeRef.current * 1.5) * 0.65;
        const grain = Math.sin(x * 0.33 + timeRef.current * 4.6) * 0.35;
        const zone =
          Math.exp(
            -Math.pow((x / waveWidth - pointerXRef.current) * 7, 2)
          ) * s.intensity;
        const spike =
          zone * Math.sin(x * 0.24 - timeRef.current * s.speed) * 0.18;
        const y = baseY + soft + detail + grain - spike;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      animRef.current = requestAnimationFrame(draw);
    }

    const handlePointer = (e: PointerEvent) => {
      pointerXRef.current = e.clientX / window.innerWidth;
    };

    // Pause drawing when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative z-10">
      <div className="max-w-[44rem]">
        <canvas
          ref={canvasRef}
          className="w-full block"
          style={{ height: "54px" }}
          aria-label="Animated overview waveform"
        />
      </div>
    </div>
  );
}
