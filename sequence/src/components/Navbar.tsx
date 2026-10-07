"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (target: string | number) => {
    if (window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.4 });
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#121212]/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between">
        <button
          onClick={() => scrollToSection(0)}
          className="text-white font-bold text-base sm:text-lg md:text-xl tracking-tight text-left cursor-pointer hover:opacity-80 transition-opacity"
        >
          Adithya Shashikumaar Gurikar<span className="text-amber-400">.</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("#about")}
            className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            About Me
          </button>
          <button
            onClick={() => scrollToSection("#projects")}
            className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Resume
          </a>
          <button
            onClick={() => scrollToSection("#contact")}
            className="text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
          >
            Contact
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
