"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Disable browser's automatic scroll restoration on refresh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // If page was reloaded with a hash (e.g. #about), remove it to prevent browser jump
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Force instant reset to top
      window.scrollTo(0, 0);
    }

    // lerp-based smoothing: continuous easing toward the target, no fixed-duration "steps"
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      prevent: (node) => node.classList?.contains("no-lenis"),
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Force Lenis to lock at top on initial load
    lenis.scrollTo(0, { immediate: true });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Also reset on beforeunload so browser snapshot is at 0
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
