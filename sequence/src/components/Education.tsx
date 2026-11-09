"use client";

import { education } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Education() {
  return (
    <section id="education" className="relative z-20 bg-paper text-ink px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <SectionHead num="04" label="Education" lines={["Where I", "learned"]} />

        <ul className="border-t-[3px] border-ink">
          {education.map((e, i) => (
            <li key={e.school}>
              <Reveal delay={i * 0.08} y={24}>
                <div
                  data-cursor=""
                  className="group border-b-[3px] border-ink py-8 px-2 transition-colors duration-500 ease-out hover:bg-ink hover:text-paper"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                    <span className="font-mono text-xs w-8">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display uppercase text-3xl md:text-6xl tracking-tighter flex-1 transition-transform duration-500 ease-out group-hover:translate-x-4">
                      {e.school}
                    </h3>
                    <span className="font-mono text-xs uppercase tracking-widest md:text-right md:w-44">{e.years}</span>
                  </div>
                  <div className="md:pl-16">
                    <p className="text-lg md:text-xl font-medium mt-2 text-accent">{e.degree}</p>
                    {/* grid-rows trick animates height smoothly with no layout jank */}
                    <div className="grid max-md:grid-rows-[1fr] grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                      <div className="overflow-hidden">
                        <p className="pt-3 max-w-xl opacity-70">{e.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
