"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// Replace these placeholders with real projects (add `image` for a screenshot preview).
const projects = [
  { title: "Project Alpha", description: "High-performance e-commerce platform built with Next.js and Shopify.", tags: ["Next.js", "Tailwind", "Shopify"], year: "2025", color: "#ff4d00", link: "#" },
  { title: "Project Beta", description: "Interactive WebGL experience using Three.js and React Three Fiber.", tags: ["React", "Three.js", "WebGL"], year: "2025", color: "#111111", link: "#" },
  { title: "Project Gamma", description: "Real-time analytics dashboard with complex data visualizations.", tags: ["TypeScript", "Recharts", "Supabase"], year: "2024", color: "#2b59ff", link: "#" },
  { title: "Project Delta", description: "Sleek, animated marketing site for a FinTech startup.", tags: ["Framer Motion", "Next.js", "Tailwind"], year: "2024", color: "#00a86b", link: "#" },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);

  // Preview card follows the mouse with a spring
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24 });
  const sy = useSpring(y, { stiffness: 220, damping: 24 });

  return (
    <section
      id="projects"
      className="relative z-20 bg-paper text-ink px-6 md:px-12 pb-32 pt-8"
      onMouseMove={(e) => {
        x.set(e.clientX + 24);
        y.set(e.clientY - 120);
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between border-b-[3px] border-ink pb-3 mb-0">
          <h2 className="font-display uppercase text-[14vw] md:text-[9vw] leading-[0.85] tracking-tighter">
            Selected<br />Work<span className="text-accent">.</span>
          </h2>
          <span className="font-display text-[10px] md:text-[11px] uppercase tracking-[0.14em] mb-2">[ 08 ] {String(projects.length).padStart(2, "0")} projects</span>
        </div>

        <ul onMouseLeave={() => setActive(null)}>
          {projects.map((p, i) => (
            <li key={p.title}>
              <a
                href={p.link}
                onMouseEnter={() => setActive(i)}
                data-cursor="View"
                className={`group relative flex items-center gap-4 md:gap-8 border-b-[3px] border-ink py-6 md:py-8 px-2 transition-colors duration-300 ${
                  active === i ? "bg-ink text-paper" : active !== null ? "opacity-40" : ""
                }`}
              >
                <span className="font-mono text-xs w-8">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display uppercase text-4xl md:text-7xl tracking-tighter flex-1 transition-transform duration-300 group-hover:translate-x-4">
                  {p.title}
                </span>
                <span className="hidden md:flex gap-2 font-mono text-xs uppercase">
                  {p.tags.map((t) => (
                    <span key={t} className="border border-current px-2 py-1">{t}</span>
                  ))}
                </span>
                <span className="font-mono text-xs">{p.year}</span>
                <span className="text-2xl transition-transform duration-300 group-hover:rotate-45">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating preview */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="preview"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="hidden md:flex fixed top-0 left-0 z-30 w-72 h-52 p-5 flex-col justify-between pointer-events-none text-paper border-[3px] border-ink"
          >
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{ backgroundColor: projects[active].color }}
              transition={{ duration: 0.3 }}
            />
            <span className="font-mono text-xs uppercase tracking-widest">{projects[active].year}</span>
            <p className="font-bold text-lg leading-snug">{projects[active].description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
