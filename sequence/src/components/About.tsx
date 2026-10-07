"use client";

import { motion } from "framer-motion";
import { User, Code2, Sparkles, Terminal } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-mono tracking-widest uppercase text-amber-400">
              Biography
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mt-4 max-w-2xl font-light">
            A creative developer driven by motion, performance, and craftsmanship.
          </p>
        </div>

        {/* Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story / Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl bg-white/[0.03] border border-white/10 p-8 sm:p-10 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 mb-6 text-amber-400">
                <User size={22} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
                Hi, I'm Adithya.
              </h3>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6 font-light">
                This section is ready for your story, background, and journey. Tell me what details, bio, or highlights you'd like to showcase here!
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                Passionate about merging design aesthetics with engineering rigor to build products that feel fluid, intentional, and alive.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap gap-4 items-center text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Sparkles size={14} className="text-amber-400" /> Creative Technologist
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Code2 size={14} className="text-sky-400" /> Front-end Architecture
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                <Terminal size={14} className="text-emerald-400" /> Interactive Media
              </span>
            </div>
          </motion.div>

          {/* Highlights / Quick Stats or Overview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl flex-1 flex flex-col justify-center group hover:border-white/20 transition-all">
              <span className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">
                Core Philosophy
              </span>
              <p className="text-xl sm:text-2xl font-medium text-white leading-snug">
                "Speed, smoothness, and visual distinction in every interaction."
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-xl flex-1 flex flex-col justify-center group hover:border-white/20 transition-all">
              <span className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-2">
                Status
              </span>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-lg font-medium text-white">
                  Available for new opportunities
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
