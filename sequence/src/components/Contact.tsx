"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Wrapper that pulls its child toward the cursor. */
function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

const links = [
  { label: "US", value: "+1 (217) 621-0538", href: "tel:+12176210538" },
  { label: "IN", value: "+91 63661 20580", href: "tel:+916366120580" },
  { label: "LinkedIn", value: "adithya-shashikumaar-gurikar ↗", href: "https://www.linkedin.com/in/adithya-shashikumaar-gurikar", external: true },
  { label: "GitHub", value: "adithya-gurikar ↗", href: "https://github.com/adithya-gurikar", external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 bg-ink text-paper px-6 md:px-12 pt-24 pb-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between font-display text-[10px] md:text-[11px] uppercase tracking-[0.14em] border-b border-paper/30 pb-3 mb-12">
          <span>[ 07 ] Contact</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Available for new opportunities
          </span>
        </div>

        <h2 className="font-display uppercase leading-[0.85] tracking-tighter text-[16vw] md:text-[12vw]">
          Let&apos;s<br />talk<span className="text-accent">.</span>
        </h2>

        <div className="mt-12 mb-16">
          <Magnetic>
            <a
              href="mailto:adithyagurikar10@gmail.com"
              data-cursor="Email"
              className="inline-block bg-accent text-paper font-bold text-lg md:text-2xl px-8 py-5 rounded-full break-all"
            >
              adithyagurikar10@gmail.com →
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-paper/30">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="group p-6 md:border-r border-paper/30 last:border-r-0 border-b md:border-b-0 hover:bg-paper hover:text-ink transition-colors duration-300"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-2">{l.label}</div>
              <div className="text-lg md:text-xl font-medium break-all">{l.value}</div>
            </a>
          ))}
        </div>

        <div className="mt-16 flex justify-between font-mono text-xs uppercase tracking-widest text-paper/50">
          <span>© {new Date().getFullYear()} Adithya Shashikumaar Gurikar</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </section>
  );
}
