"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useEffect, useState } from "react";
import { useRouter } from "@/lib/navigation";

const sections = ["work", "process", "pricing", "faq", "testimonials", "about", "blog", "contact"] as const;

export function WebNav() {
  const t = useTranslations("nav");
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll progress
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      // Active section detection
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-[0_1px_0_var(--glass-border)]" : ""
      }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-milos-blue to-milos-purple transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo + world switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight cursor-pointer"
          >
            ITMM
          </button>
          <div className="flex items-center rounded-lg border border-[var(--border)] overflow-hidden text-xs font-medium">
            <span className="px-2 py-1 bg-milos-blue/15 text-milos-blue">
              Web
            </span>
            <button
              onClick={() => router.push("/marketing")}
              className="px-2 py-1 text-[var(--text-tertiary)] hover:text-marija-purple hover:bg-marija-purple/10 transition-colors cursor-pointer"
            >
              {t("switchToMarketing")}
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {sections.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                active === id
                  ? "text-milos-blue bg-milos-blue/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
              }`}
            >
              {t(id)}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white text-xs font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer"
          >
            {t("getQuote")}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-[var(--glass-border)] animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {sections.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  active === id
                    ? "text-milos-blue bg-milos-blue/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {t(id)}
              </button>
            ))}
            <div className="pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => { router.push("/marketing"); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-marija-purple cursor-pointer"
              >
                → {t("switchToMarketing")}
              </button>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
