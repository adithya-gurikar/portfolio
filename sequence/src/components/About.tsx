"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const statement =
  "I build fast, fluid interfaces where design and engineering meet. Motion with purpose, performance without compromise, and details most people feel but never notice.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ["#11111100", "#111111"]);
  return (
    <span className="relative inline-block mr-[0.25em]">
      <span className="absolute opacity-15">{word}</span>
      <motion.span style={{ opacity, color }}>{word}</motion.span>
    </span>
  );
}

const facts = [
  { k: "Role", v: "Creative Developer" },
  { k: "Focus", v: "Front-end & Motion" },
  { k: "Stack", v: "Next.js · React · TS" },
  { k: "Status", v: "Open to work", live: true },
];

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = statement.split(" ");

  return (
    <section id="about" className="relative z-20 bg-paper text-ink">
      <div className="px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between font-display text-[10px] md:text-[11px] uppercase tracking-[0.14em] mb-10 border-b-[3px] border-ink pb-3">
          <span>[ 02 ] About</span>
          <span>Scroll to read</span>
        </div>

        <p ref={ref} className="font-display uppercase text-[7vw] md:text-[4.2vw] leading-[1.05] tracking-tight">
          {words.map((w, i) => {
            const start = i / words.length;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />;
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-y-[3px] border-ink">
        {facts.map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            data-cursor=""
            className="group p-6 md:p-8 border-ink [&:not(:last-child)]:border-r-[3px] hover:bg-accent hover:text-paper transition-colors duration-300"
          >
            <div className="font-mono text-xs uppercase tracking-widest opacity-60 mb-3">{f.k}</div>
            <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
              {f.live && <span className="h-2.5 w-2.5 rounded-full bg-accent group-hover:bg-paper animate-pulse" />}
              {f.v}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
