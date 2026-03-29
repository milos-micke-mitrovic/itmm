"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const halfPage = document.documentElement.scrollHeight / 2;
      setVisible(window.scrollY > halfPage - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] flex items-center justify-center hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-all duration-200 animate-fade-in cursor-pointer"
      aria-label="Back to top"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
