"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll over the exact 500vh sequence container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for ultra-buttery transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.15,
  });

  // ==========================================
  // Section 1: Hero Name (0% - 15%)
  // Fades out completely BEFORE Section 2 starts
  // ==========================================
  const opacity1 = useTransform(smoothProgress, [0, 0.06, 0.14], [1, 1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.14], [0, -50]);
  const scale1 = useTransform(smoothProgress, [0, 0.14], [1, 0.94]);

  // ==========================================
  // Section 2: Experience (20% - 48%)
  // Zero overlap with Section 1 or Section 3
  // ==========================================
  const opacity2 = useTransform(smoothProgress, [0.18, 0.25, 0.40, 0.48], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.18, 0.25, 0.40, 0.48], [40, 0, 0, -40]);
  const scale2 = useTransform(smoothProgress, [0.18, 0.25, 0.40, 0.48], [0.96, 1, 1, 0.96]);

  // ==========================================
  // Section 3: Engineering (54% - 82%)
  // Fully exits before projects section
  // ==========================================
  const opacity3 = useTransform(smoothProgress, [0.52, 0.60, 0.74, 0.82], [0, 1, 1, 0]);
  const y3 = useTransform(smoothProgress, [0.52, 0.60, 0.74, 0.82], [40, 0, 0, -40]);
  const scale3 = useTransform(smoothProgress, [0.52, 0.60, 0.74, 0.82], [0.96, 1, 1, 0.96]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 font-sans"
    >
      {/* Single full-screen sticky viewport containing all transitions */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Section 1: Intro Name */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-2xl text-white max-w-5xl">
            Adithya Shashikumaar Gurikar
          </h1>
        </motion.div>

        {/* Section 2: Vision */}
        <motion.div
          style={{ opacity: opacity2, y: y2, scale: scale2 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 sm:px-16 md:px-28 max-w-4xl mr-auto pointer-events-none"
        >
          <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-mono tracking-widest uppercase text-sky-400">
              Interactive 3D & Web
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] drop-shadow-2xl text-white">
            I build digital experiences<span className="text-sky-400">.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mt-6 max-w-xl leading-relaxed drop-shadow-md">
            Crafting performant, buttery-smooth and immersive interfaces using modern web technologies.
          </p>
        </motion.div>

        {/* Section 3: Engineering & Architecture */}
        <motion.div
          style={{ opacity: opacity3, y: y3, scale: scale3 }}
          className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 sm:px-16 md:px-28 max-w-4xl ml-auto pointer-events-none"
        >
          <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">
              Full Stack Motion
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] drop-shadow-2xl text-white">
            Bridging design and engineering<span className="text-emerald-400">.</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light mt-6 max-w-xl leading-relaxed drop-shadow-md">
            From motion graphics and procedural shaders to resilient, scalable front-end architectures.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
