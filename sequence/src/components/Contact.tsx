"use client";

import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-mono tracking-widest uppercase text-amber-400">
            Get In Touch
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
          Let's Connect
        </h2>
        <p className="text-lg text-gray-400 mb-16 max-w-2xl">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 w-full justify-center items-stretch max-w-3xl">
          
          {/* Phone Numbers */}
          <div className="flex flex-col items-center justify-between p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Animated Phone Icon */}
            <div className="relative mb-5">
              <span className="absolute inset-0 rounded-full bg-amber-400/20 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
              <motion.div
                whileHover={{
                  rotate: [0, -18, 18, -14, 14, -8, 8, 0],
                  scale: 1.15,
                  transition: { duration: 0.55, ease: "easeInOut" },
                }}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-400/50 group-hover:bg-amber-500/10 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.35)] transition-colors duration-300 text-gray-300 group-hover:text-amber-400 cursor-pointer"
              >
                <Phone size={24} />
              </motion.div>
            </div>

            {/* Numbers with proper formatting */}
            <div className="flex flex-col gap-3 items-center w-full z-10">
              <a
                href="tel:+12176210538"
                className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 group/us hover:scale-105"
              >
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 group-hover/us:bg-amber-400 group-hover/us:text-black transition-all">
                  US
                </span>
                +1 (217) 621-0538
              </a>
              <a
                href="tel:+916366120580"
                className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 group/in hover:scale-105"
              >
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 group-hover/in:bg-emerald-400 group-hover/in:text-black transition-all">
                  IN
                </span>
                +91 63661 20580
              </a>
            </div>
          </div>
          
          {/* Email */}
          <a
            href="mailto:adithyagurikar10@gmail.com"
            className="flex flex-col items-center justify-between p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Animated Email Icon */}
            <div className="relative mb-5">
              <span className="absolute inset-0 rounded-full bg-sky-400/20 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
              <motion.div
                whileHover={{
                  y: -5,
                  rotate: [0, -10, 10, -5, 0],
                  scale: 1.15,
                  transition: { type: "spring", stiffness: 350, damping: 12 },
                }}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-sky-400/50 group-hover:bg-sky-500/10 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-colors duration-300 text-gray-300 group-hover:text-sky-400"
              >
                <Mail size={24} />
              </motion.div>
            </div>

            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors break-all z-10 group-hover:scale-105 duration-200">
              adithyagurikar10@gmail.com
            </span>
          </a>
          
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/adithya-shashikumaar-gurikar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-between p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#0A66C2]/60 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(10,102,194,0.25)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A66C2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Animated LinkedIn Icon */}
            <div className="relative mb-5">
              <span className="absolute inset-0 rounded-full bg-[#0A66C2]/20 scale-100 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700 pointer-events-none" />
              <motion.div
                whileHover={{
                  rotate: [0, -12, 12, 0],
                  scale: 1.18,
                  transition: { duration: 0.45, ease: "easeOut" },
                }}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#0A66C2]/80 group-hover:bg-[#0A66C2]/15 group-hover:shadow-[0_0_26px_rgba(10,102,194,0.5)] transition-colors duration-300 text-gray-300 group-hover:text-[#0A66C2]"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </motion.div>
            </div>

            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors underline underline-offset-4 decoration-white/20 group-hover:decoration-[#0A66C2] z-10 group-hover:scale-105 duration-200">
              LinkedIn Profile
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}
