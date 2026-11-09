"use client";

import { awards } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Awards() {
  return (
    <section id="awards" className="relative z-20 bg-accent text-ink px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <SectionHead num="07" label="Awards" lines={["Recognition", "& honours"]} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[3px] border-ink">
          {awards.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} y={30} className="border-ink [&:not(:last-child)]:border-b-[3px] sm:[&:nth-child(odd)]:border-r-[3px] lg:border-b-0 lg:border-r-[3px] lg:last:border-r-0">
              <div
                data-cursor=""
                className="group h-full min-h-64 p-6 flex flex-col justify-between transition-colors duration-500 ease-out hover:bg-ink hover:text-paper"
              >
                <span
                  className="font-display text-7xl tracking-tighter text-transparent transition-transform duration-500 ease-out group-hover:-translate-y-1"
                  style={{ WebkitTextStroke: "2px currentColor" }}
                >
                  {a.year}
                </span>
                <div>
                  <h3 className="text-2xl font-bold leading-tight">{a.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest mt-2 opacity-70">{a.org}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
