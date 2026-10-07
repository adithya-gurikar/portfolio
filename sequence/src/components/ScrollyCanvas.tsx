"use client";

import { useEffect, useRef, useCallback } from "react";

const FRAME_COUNT = 240;

function pad(num: number, size: number) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for continuous bi-directional lerp loop
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const rafIdRef = useRef<number | null>(null);
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Draw frame helper - returns true if an image was actually drawn, false otherwise
  const renderFrame = useCallback((index: number): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return false;

    // 1. Try to find the requested image or the nearest available loaded frame
    let img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prevIdx = index - offset;
        if (prevIdx >= 0) {
          const prev = imagesRef.current[prevIdx];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
        }
        const nextIdx = index + offset;
        if (nextIdx < FRAME_COUNT) {
          const next = imagesRef.current[nextIdx];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }
    }

    // If still no valid image is loaded yet, keep existing canvas buffer (never wipe black!)
    if (!img || !img.complete || img.naturalWidth === 0) {
      return false;
    }

    let { width, height } = dimensionsRef.current;
    if (width === 0 || height === 0) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    // Crop bottom 85 pixels from source to eliminate "Veo" watermark entirely
    const cropBottom = 85;
    const srcW = img.naturalWidth || 1920;
    const srcH = Math.max(100, (img.naturalHeight || 1080) - cropBottom);

    // Aspect ratio "cover" calculations
    const scale = Math.max(width / srcW, height / srcH);
    const drawW = srcW * scale;
    const drawH = srcH * scale;
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    ctx.drawImage(img, 0, 0, srcW, srcH, drawX, drawY, drawW, drawH);
    return true;
  }, []);

  // Update canvas sizing strictly when window resizes
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    dimensionsRef.current = { width, height, dpr };

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Request immediate repaint on next tick
    lastDrawnFrameRef.current = -1;
    const frameToDraw = Math.round(currentFrameRef.current);
    const drawn = renderFrame(frameToDraw);
    if (drawn) {
      lastDrawnFrameRef.current = frameToDraw;
    }
  }, [renderFrame]);

  // Robust Batched Image Preloader
  useEffect(() => {
    const images = imagesRef.current;
    let cancelled = false;

    // Helper to load a single frame
    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (cancelled) return resolve();
        if (images[index] && images[index]?.complete) return resolve();

        const frameNum = index + 1;
        const img = new Image();

        const done = () => {
          images[index] = img;
          if (index === 0 && lastDrawnFrameRef.current === -1) {
            const drawn = renderFrame(0);
            if (drawn) lastDrawnFrameRef.current = 0;
          }
          resolve();
        };

        img.onload = done;
        img.onerror = () => {
          // Fallback to png
          const fallback = new Image();
          fallback.onload = () => {
            images[index] = fallback;
            if (index === 0 && lastDrawnFrameRef.current === -1) {
              const drawn = renderFrame(0);
              if (drawn) lastDrawnFrameRef.current = 0;
            }
            resolve();
          };
          fallback.onerror = () => resolve();
          fallback.src = `/sequence/ezgif-frame-${pad(frameNum, 3)}.png`;
        };

        img.src = `/sequence/ezgif-frame-${pad(frameNum, 3)}.webp`;

        // If browser already cached, resolve immediately
        if (img.complete && img.naturalWidth > 0) {
          done();
        }
      });
    };

    // 1. Immediately load frame 0 with highest priority
    loadFrame(0).then(() => {
      if (cancelled) return;

      // 2. Load immediate initial window (frames 1 to 20) for instant responsive scroll
      const initialBatch = [];
      for (let i = 1; i < Math.min(20, FRAME_COUNT); i++) {
        initialBatch.push(loadFrame(i));
      }

      Promise.all(initialBatch).then(() => {
        if (cancelled) return;

        // 3. Load remaining frames with concurrency pool to prevent network throttling
        let nextIndex = 20;
        const CONCURRENCY = 6;

        const worker = async () => {
          while (nextIndex < FRAME_COUNT && !cancelled) {
            const current = nextIndex++;
            await loadFrame(current);
          }
        };

        for (let c = 0; c < CONCURRENCY; c++) {
          worker();
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [renderFrame]);

  // Window resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Bi-directional scroll tracking: works seamlessly scrolling DOWN and UP
  useEffect(() => {
    const updateTargetFrame = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));
      
      targetFrameRef.current = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, progress * (FRAME_COUNT - 1))
      );
    };

    window.addEventListener("scroll", updateTargetFrame, { passive: true });

    if (window.__lenis) {
      window.__lenis.on("scroll", updateTargetFrame);
    }

    updateTargetFrame();

    return () => {
      window.removeEventListener("scroll", updateTargetFrame);
      if (window.__lenis) {
        window.__lenis.off("scroll", updateTargetFrame);
      }
    };
  }, []);

  // Continuous 120 FPS inertial lerp loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const diff = targetFrameRef.current - currentFrameRef.current;

      // Symmetrical smooth inertia damping
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const frameToDraw = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      // Attempt to render if target changed OR if the canvas hasn't successfully drawn a frame yet
      if (frameToDraw !== lastDrawnFrameRef.current || lastDrawnFrameRef.current === -1) {
        const drawn = renderFrame(frameToDraw);
        // CRUCIAL: Only update lastDrawnFrameRef if an image was ACTUALLY drawn to the canvas!
        // If images were still downloading, keep trying on next tick so the screen NEVER stays black.
        if (drawn) {
          lastDrawnFrameRef.current = frameToDraw;
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#121212]">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>
    </div>
  );
}
