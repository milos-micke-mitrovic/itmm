"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show on touch devices or reduced motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    setVisible(true);
    document.documentElement.style.cursor = "none";

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [cursor]");
      setHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`*, *::before, *::after { cursor: none !important; }`}</style>
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${pos.x - (hovering ? 16 : 8)}px, ${pos.y - (hovering ? 16 : 8)}px)`,
          transition: "transform 80ms ease-out, width 200ms ease, height 200ms ease",
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: hovering ? 32 : 16,
            height: hovering ? 32 : 16,
            opacity: 0.8,
            transition: "width 200ms ease, height 200ms ease",
          }}
        />
      </div>
    </>
  );
}
