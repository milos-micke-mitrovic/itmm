"use client";

import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";

export function LandingFooter() {
  const t = useTranslations("landing.footer");

  return (
    <footer className="py-10 px-4 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight bg-gradient-to-r from-milos-blue to-marija-purple bg-clip-text text-transparent">
          ITMM
        </span>
        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
        <p className="text-xs text-[var(--text-tertiary)]">
          {t("copyright")} · itmm.pro
        </p>
      </div>
    </footer>
  );
}
