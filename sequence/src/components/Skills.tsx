"use client";

import { skills, ticker } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 bg-ink text-paper">
      <div className="px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24 max-w-[1400px] mx-auto">
        <SectionHead num="02" label="Skills" lines={["Tools of", "the trade"]} note="Hover to light up" border="border-paper" />

        <div className="border-t border-paper/30">
          {skills.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06} y={24}>
              <div className="grid md:grid-cols-[260px_1fr] gap-4 md:gap-10 border-b border-paper/30 py-7">
                <div className="font-display text-[11px] uppercase tracking-[0.14em] text-accent pt-2">
                  {String(gi + 1).padStart(2, "0")} — {g.group}
                </div>
                <ul className="flex flex-wrap gap-2.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      data-cursor=""
                      className="border border-paper/40 px-4 py-2 text-lg font-medium transition-[background-color,color,transform,border-color] duration-300 ease-out hover:bg-accent hover:border-accent hover:text-paper hover:-translate-y-1 transform-gpu"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="marquee overflow-hidden bg-accent text-ink py-4 whitespace-nowrap">
        <div className="marquee-track inline-block font-display uppercase text-2xl">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="mx-6">
              {t} <span className="text-paper">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
