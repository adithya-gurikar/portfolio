"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About", id: "about", mobile: false },
  { label: "Skills", id: "skills", mobile: false },
  { label: "Experience", id: "experience", mobile: false },
  { label: "Work", id: "projects", mobile: true },
  { label: "Contact", id: "contact", mobile: true },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    const ids = ["about", "skills", "education", "experience", "publications", "awards", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (target: string | number) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  // mix-blend-difference keeps the nav legible over dark, cream and orange sections
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white"
      style={{ fontFamily: "var(--font-nav)" }}
    >
      <div className="flex items-center justify-between px-6 md:px-12 py-5 text-[13px] font-bold uppercase tracking-[0.12em]">
        <button onClick={() => scrollTo(0)} className="text-lg font-extrabold tracking-tight" data-cursor="Top">
          A.G<span className="text-[#ff4d00]">●</span>
        </button>
        <nav className="flex items-center gap-5 md:gap-9">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(`#${l.id}`)}
              className={`group relative ${l.mobile ? "" : "hidden md:block"}`}
            >
              {l.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-current transition-transform duration-500 ease-out ${
                  active === l.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </button>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            className="border-2 border-current px-3 py-1.5 transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Resume ↗
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
