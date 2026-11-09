"use client";

import { publications } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Publications() {
  return (
    <section id="publications" className="relative z-20 bg-paper text-ink px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <SectionHead num="06" label="Publications" lines={["Words in", "print"]} note="Click to read" />

        <ul className="border-t-[3px] border-ink">
          {publications.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} y={24}>
                <a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor="Read"
                  className="group grid grid-cols-[auto_1fr_auto] md:grid-cols-[140px_1fr_auto] items-start gap-4 md:gap-10 border-b-[3px] border-ink py-8 px-2 transition-colors duration-500 ease-out hover:bg-accent hover:text-paper"
                >
                  <span
                    className="font-display text-4xl md:text-6xl tracking-tighter text-transparent leading-none"
                    style={{ WebkitTextStroke: "2px currentColor" }}
                  >
                    {p.year}
                  </span>

                  <div className="transition-transform duration-500 ease-out group-hover:translate-x-3">
                    <span className="inline-block font-mono text-[11px] uppercase tracking-widest border border-current px-2 py-0.5 mb-3">
                      {p.type}
                    </span>
                    <h3 className="text-xl md:text-3xl font-bold leading-tight max-w-3xl">{p.title}</h3>
                    <p className="mt-3 text-base opacity-80">{p.authors}</p>
                    <p className="font-mono text-xs uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-90">{p.venue}</p>
                  </div>

                  <span className="text-3xl transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125">↗</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
