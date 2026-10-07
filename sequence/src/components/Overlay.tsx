"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
  const { scrollYProgress } = useScroll();

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: 25% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.45], [100, -100]);

  // Section 3: 55% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.8], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.55, 0.75], [100, -100]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 font-sans">
      
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg text-white">
          Adithya S Gurikar
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light drop-shadow-md">
          Creative Developer.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="sticky top-0 w-full h-screen flex flex-col items-start justify-center text-left px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-xl leading-tight drop-shadow-lg text-white">
          I build digital experiences.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-light mt-4 max-w-md drop-shadow-md">
          Crafting performant and beautiful interfaces using modern web technologies.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="sticky top-0 w-full h-screen flex flex-col items-end justify-center text-right px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-xl leading-tight drop-shadow-lg text-white">
          Bridging design and engineering.
        </h2>
        <p className="text-lg md:text-xl text-gray-300 font-light mt-4 max-w-md drop-shadow-md">
          From motion graphics to scalable front-end architectures.
        </p>
      </motion.div>
    </div>
  );
}
