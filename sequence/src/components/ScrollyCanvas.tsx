"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";

const FRAME_COUNT = 240;

function pad(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Load images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${pad(i, 3)}.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Update canvas
  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial render
    renderFrame(0);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(latest * FRAME_COUNT))
      );
      renderFrame(frameIndex);
    });

    return () => unsubscribe();

    function renderFrame(index: number) {
      if (!images[index] || !canvas || !ctx) return;
      
      const img = images[index];
      
      // Update canvas dimensions to match display
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Object fit cover logic
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  }, [images, scrollYProgress]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0 && canvasRef.current) {
         const ctx = canvasRef.current.getContext("2d");
         if (!ctx) return;
         
         const frameIndex = Math.min(
           FRAME_COUNT - 1,
           Math.max(0, Math.floor(scrollYProgress.get() * FRAME_COUNT))
         );
         const img = images[frameIndex];
         if (!img) return;
         
         const canvas = canvasRef.current;
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
         
         const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
         const x = (canvas.width / 2) - (img.width / 2) * scale;
         const y = (canvas.height / 2) - (img.height / 2) * scale;
         
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
