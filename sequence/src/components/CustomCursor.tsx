"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);

  // Direct DOM references for 120 FPS hardware-accelerated transforms
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position coordinates & particle state
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const initialized = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!initialized.current) {
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        initialized.current = true;
      }

      setVisible(true);

      // Spawn celestial stardust particles while moving
      if (Math.random() > 0.35) {
        const colors = ["#ff9e42", "#60a5fa", "#ffffff", "#f59e0b"];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7 - 0.2,
          size: Math.random() * 2.2 + 1,
          alpha: 0.75,
          color: colors[Math.floor(Math.random() * colors.length)],
        });

        if (particlesRef.current.length > 30) {
          particlesRef.current.shift();
        }
      }

      // Check for interactive elements under cursor
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest("a, button, input, textarea, [role='button'], .group, [data-cursor='pointer']")
        );
        setHovered(isInteractive);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Continuous RAF loop for buttery smooth inertia tracking
    const tick = () => {
      // Damped smooth spring tracking for the ring
      const dx = mousePos.current.x - ringPos.current.x;
      const dy = mousePos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.22;
      ringPos.current.y += dy * 0.22;

      // Direct DOM hardware-accelerated transforms (bypasses React render overhead)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Render cosmic stardust particles
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.024;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("resize", resizeCanvas);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Particle trail canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Trailing Inertial Ring */}
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full pointer-events-none transition-[width,height,border-color,background-color,box-shadow] duration-200 ease-out flex items-center justify-center will-change-transform ${
          hovered
            ? "w-14 h-14 border border-amber-400/80 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-[1px]"
            : clicked
            ? "w-7 h-7 border border-white/60 bg-transparent shadow-none"
            : "w-9 h-9 border border-white/40 bg-transparent shadow-[0_0_10px_rgba(255,255,255,0.08)]"
        }`}
      />

      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 rounded-full pointer-events-none transition-[width,height,background-color,box-shadow] duration-150 ease-out will-change-transform ${
          hovered
            ? "w-2.5 h-2.5 bg-amber-400 shadow-[0_0_12px_#fbbf24]"
            : clicked
            ? "w-1 h-1 bg-white shadow-none"
            : "w-1.5 h-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
        }`}
      />
    </div>
  );
}
