"use client";

import { motion, useReducedMotion } from "framer-motion";

// One easing curve everywhere keeps all motion feeling consistent and smooth.
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Section header: mono label bar + giant title whose lines slide up from a mask. */
export function SectionHead({
  num,
  label,
  lines,
  note,
  border = "border-current",
}: {
  num: string;
  label: string;
  lines: string[];
  note?: string;
  border?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-10 md:mb-12">
      <div className={`flex items-center justify-between font-display text-[10px] md:text-[11px] uppercase tracking-[0.14em] border-b-[3px] ${border} pb-3 mb-8`}>
        <span>
          [ {num} ] {label}
        </span>
        {note && <span className="hidden sm:inline opacity-70">{note}</span>}
      </div>
      <h2 className="font-display uppercase text-[13vw] md:text-[8vw] leading-[0.88] tracking-tighter">
        {lines.map((l, i) => (
          // The observed element is the unclipped mask; the child animates via variants.
          // (Observing the clipped child itself never fires, because IntersectionObserver
          // treats a fully clipped element as off-screen.)
          <motion.span
            key={l}
            className="block overflow-hidden"
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.1, ease: EASE }}
          >
            <motion.span
              variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
              className="block transform-gpu"
            >
              {l}
              {i === lines.length - 1 && <span className="text-accent">.</span>}
            </motion.span>
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
