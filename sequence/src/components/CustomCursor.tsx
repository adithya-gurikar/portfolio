"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Editorial cursor: a blend-difference dot that grows on interactive elements.
 * Any element can set data-cursor="Label" to show a label inside the cursor.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const labelEl = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelEl?.dataset.cursor ?? "");
      setHovered(Boolean(t?.closest("a, button, input, textarea, [role='button'], [data-cursor]")));
    };
    const down = () => setClicked(true);
    const up = () => setClicked(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    let raf: number;
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.2;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const size = label ? 88 : hovered ? 56 : clicked ? 10 : 18;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center will-change-transform transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      } ${label ? "bg-accent" : "bg-white mix-blend-difference"}`}
      style={{
        width: size,
        height: size,
        transition: "width .25s cubic-bezier(.2,.8,.2,1), height .25s cubic-bezier(.2,.8,.2,1), opacity .2s",
      }}
    >
      {label && (
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-paper">
          {label}
        </span>
      )}
    </div>
  );
}
