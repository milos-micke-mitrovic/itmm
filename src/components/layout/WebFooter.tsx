"use client";

import { useTranslations } from "next-intl";
import { LangToggle } from "@/components/ui/LangToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function WebFooter() {
  const t = useTranslations("landing.footer");
  const nav = useTranslations("nav");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left — brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent">
              ITMM
            </span>
            <p className="text-xs text-[var(--text-tertiary)]">
              Your Business. Online. Finally.
            </p>
          </div>

          {/* Center — quick links */}
          <div className="flex flex-wrap justify-center gap-4">
            {(["work", "process", "pricing", "faq", "contact"] as const).map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                {nav(id)}
              </button>
            ))}
          </div>

          {/* Right — toggles */}
          <div className="flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-tertiary)]">
            {t("copyright")} · itmm.pro
          </p>
        </div>
      </div>
    </footer>
  );
}
