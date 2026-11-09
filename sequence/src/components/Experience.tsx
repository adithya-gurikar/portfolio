"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <section id="experience" className="relative z-20 bg-ink text-paper px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <SectionHead num="05" label="Experience" lines={["Work I've", "done"]} border="border-paper" />

        <div ref={ref} className="relative pl-8 md:pl-16">
          {/* timeline track + scroll-filled line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-paper/25" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute left-0 top-2 bottom-2 w-[3px] -ml-px bg-accent origin-top transform-gpu"
          />

          <ul className="space-y-16 md:space-y-24">
            {experience.map((x, i) => (
              <li key={x.company + x.role} className="relative">
                <span className="absolute -left-8 md:-left-16 top-3 h-3 w-3 -translate-x-[5px] rounded-full bg-accent ring-4 ring-ink" />
                <Reveal delay={i * 0.05}>
                  <div
                    data-cursor=""
                    className="group grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 transition-transform duration-500 ease-out hover:translate-x-2"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-accent pt-2">{x.years}</span>
                    <div>
                      <h3 className="font-display uppercase text-3xl md:text-5xl tracking-tighter leading-none">{x.role}</h3>
                      <p className="text-xl font-medium mt-2 mb-5 text-paper/70">@ {x.company}</p>
                      <ul className="space-y-2 max-w-2xl">
                        {x.points.map((p) => (
                          <li key={p} className="flex gap-3 text-paper/80">
                            <span className="text-accent">→</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
