"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

const lines = ["Adithya", "Gurikar"];

function Letters({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <span className="flex overflow-hidden">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ y: -12, color: accent ? "#f1efe8" : "#ff4d00", transition: { duration: 0.15 } }}
          className={`inline-block ${accent ? "text-accent" : "text-paper"}`}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  // Soft orange glow that follows the mouse
  const mx = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(255,77,0,0.22), transparent 60%)`;

  return (
    <section
      className="relative z-10 min-h-screen bg-ink text-paper flex flex-col justify-end px-6 md:px-12 pb-10 pt-28 overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div style={{ background: bg }} className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-[1400px] w-full mx-auto">
        <div className="flex justify-between font-display text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-accent mb-6">
          <span>[ 01 ] Portfolio</span>
          <span>2026</span>
        </div>

        <h1 className="font-display uppercase leading-[0.85] tracking-tighter text-[18vw] md:text-[14vw]">
          <Letters text={lines[0]} />
          <Letters text={lines[1]} accent />
        </h1>

        <div className="mt-10 pt-4 border-t border-paper/30 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest">
          <p className="text-paper/70 normal-case tracking-normal text-base font-sans max-w-sm">
            I build digital experiences. Performant, buttery-smooth and immersive interfaces using modern web technologies.
          </p>
          <p className="text-paper/70 normal-case tracking-normal text-base font-sans max-w-sm">
            Bridging design and engineering, from motion graphics to scalable front-end architecture.
          </p>
          <span className="md:text-right self-end flex md:justify-end items-center gap-2">
            Scroll <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>↓</motion.span>
          </span>
        </div>
      </div>
    </section>
  );
}
