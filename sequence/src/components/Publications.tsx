"use client";

import { publications } from "@/data";
import { Reveal, SectionHead } from "./ui";

export default function Publications() {
  return (
    <section id="publications" className="relative z-20 bg-accent text-ink px-6 md:px-12 pt-20 md:pt-24 pb-20 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <SectionHead num="05" label="Publications" lines={["Words in", "print"]} note="Click to read" dot="text-paper" />

        <ul className="border-t-[3px] border-ink">
          {publications.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.08} y={24}>
                {/* Whole row is clickable via the stretched title link; the PDF link sits above it */}
                <div
                  data-cursor="Read"
                  className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[140px_1fr_auto] items-start gap-4 md:gap-10 border-b-[3px] border-ink py-8 px-2 transition-colors duration-500 ease-out hover:bg-ink hover:text-paper"
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
                    <h3 className="text-xl md:text-3xl font-bold leading-tight max-w-3xl">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {p.title}
                      </a>
                    </h3>
                    <p className="mt-3 text-base opacity-90">
                      {p.authors.map((a, ai) => (
                        <span key={a} className={a.includes("Gurikar") ? "font-bold underline underline-offset-4" : ""}>
                          {a}
                          {ai < p.authors.length - 1 && ", "}
                        </span>
                      ))}
                    </p>
                    <p className="font-mono text-xs uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-90">{p.venue}</p>
                    {p.pdf && (
                      <a
                        href={p.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="PDF"
                        className="relative z-10 inline-block mt-5 border-2 border-current px-4 py-2 font-display text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-paper hover:text-ink hover:border-paper"
                      >
                        Read PDF ↗
                      </a>
                    )}
                  </div>

                  <span className="text-3xl transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-125">↗</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
