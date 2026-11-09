"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const words = ["Adithya", "Shashikumaar", "Gurikar"];

// How much the letter directly under the cursor grows (0.25 = +25%). Keep it subtle.
const MAX_ZOOM = 0.25;

function Letter({
  char,
  accent,
  delay,
  mx,
  my,
  radius,
}: {
  char: string;
  accent?: boolean;
  delay: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  radius: MotionValue<number>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // Distance from the cursor to this letter's centre. offsetLeft/Top are layout values,
  // so they aren't affected by the scale transform (no feedback wobble).
  const distance = useTransform([mx, my], ([x, y]: number[]) => {
    const el = ref.current;
    if (!el) return 99999;
    return Math.hypot(x - (el.offsetLeft + el.offsetWidth / 2), y - (el.offsetTop + el.offsetHeight / 2));
  });

  // Smooth bell curve (like the macOS dock): biggest at the cursor, easing to 1 at the radius.
  const target = useTransform([distance, radius], ([d, r]: number[]) => {
    const t = Math.min(1, d / r);
    return 1 + MAX_ZOOM * 0.5 * (1 + Math.cos(Math.PI * t));
  });
  const scale = useSpring(target, { stiffness: 260, damping: 24, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ scale, originY: 1 }}
      className={`inline-block transform-gpu will-change-transform ${accent ? "text-accent" : "text-paper"}`}
    >
      {char}
    </motion.span>
  );
}

function Word({
  text,
  accent,
  base,
  settled,
  ...rest
}: {
  text: string;
  accent?: boolean;
  base: number;
  settled: boolean;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  radius: MotionValue<number>;
}) {
  return (
    // overflow is hidden only during the entrance reveal; after that letters may grow past the box
    <span className={`flex ${settled ? "overflow-visible" : "overflow-hidden"}`}>
      {text.split("").map((c, i) => (
        <Letter key={i} char={c} accent={accent} delay={0.1 + base + i * 0.04} {...rest} />
      ))}
    </span>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  // Soft orange glow that follows the mouse
  const gx = useSpring(useMotionValue(50), { stiffness: 80, damping: 20 });
  const gy = useSpring(useMotionValue(40), { stiffness: 80, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(600px circle at ${gx}% ${gy}%, rgba(255,77,0,0.22), transparent 60%)`;

  // Cursor position relative to the name block, plus the dock-effect radius
  const mx = useMotionValue(-99999);
  const my = useMotionValue(-99999);
  const radius = useMotionValue(200);

  // Scale the name so the longest word spans the full container width (3 lines, as big as fits).
  const wrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [size, setSize] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const name = nameRef.current;
      if (!wrap || !name) return;
      const prev = name.style.fontSize; // restore afterwards so React's inline size isn't wiped
      name.style.fontSize = "100px";
      const natural = name.getBoundingClientRect().width;
      name.style.fontSize = prev;
      if (natural > 0) {
        const px = Math.floor((wrap.clientWidth / natural) * 100 * 0.995);
        setSize(px);
        radius.set(reduce ? 0 : px * 1.15);
      }
      setReady(true);
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    const t = setTimeout(() => setSettled(true), 2200);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [radius, reduce]);

  return (
    <section
      className="relative z-10 min-h-screen bg-ink text-paper flex flex-col justify-end px-6 md:px-12 pb-10 pt-28 overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        gx.set(((e.clientX - r.left) / r.width) * 100);
        gy.set(((e.clientY - r.top) / r.height) * 100);
        const n = nameRef.current?.getBoundingClientRect();
        if (n) {
          mx.set(e.clientX - n.left);
          my.set(e.clientY - n.top);
        }
      }}
      onMouseLeave={() => {
        mx.set(-99999);
        my.set(-99999);
      }}
    >
      <motion.div style={{ background: bg }} className="absolute inset-0 pointer-events-none" />

      <div ref={wrapRef} className="relative max-w-[1400px] w-full mx-auto">
        <h1
          ref={nameRef}
          aria-label="Adithya Shashikumaar Gurikar"
          style={{ fontSize: size ?? "12vw", visibility: ready ? "visible" : "hidden" }}
          className="relative font-display uppercase leading-[0.9] tracking-tight w-max flex flex-col"
        >
          <Word text={words[0]} base={0} settled={settled} mx={mx} my={my} radius={radius} />
          <Word text={words[1]} base={0.2} settled={settled} mx={mx} my={my} radius={radius} />
          <Word text={words[2]} accent base={0.45} settled={settled} mx={mx} my={my} radius={radius} />
        </h1>

        <div className="mt-10 pt-4 border-t border-paper/30 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs uppercase tracking-widest">
          <p className="text-paper/70 normal-case tracking-normal text-base font-sans max-w-sm">
            Master of Computer Science student at UIUC. Data engineer building GenAI products and ETL pipelines.
          </p>
          <p className="text-paper/70 normal-case tracking-normal text-base font-sans max-w-sm">
            From LLM chatbots to fault-tolerant distributed file systems. Python, cloud and applied ML.
          </p>
          <span className="md:text-right self-end flex md:justify-end items-center gap-2">
            Scroll <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>↓</motion.span>
          </span>
        </div>
      </div>
    </section>
  );
}
