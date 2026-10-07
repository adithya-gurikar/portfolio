"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="text-white font-bold text-xl tracking-tight">
          Adithya<span className="text-gray-400">.</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors">
            About Me
          </a>
          <a href="#projects" className="text-sm text-gray-300 hover:text-white transition-colors">
            Projects
          </a>
          <a href="/resume.pdf" target="_blank" className="text-sm text-gray-300 hover:text-white transition-colors">
            Resume
          </a>
          <a href="#contact" className="text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all backdrop-blur-sm border border-white/10">
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
