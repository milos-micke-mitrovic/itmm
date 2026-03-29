"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { contacts } from "@/lib/contacts";

export function BothCTA() {
  const t = useTranslations("landing.both");
  const whatsappUrl = `https://wa.me/${contacts.milos.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent("Hi, I'm interested in both web development and digital marketing services.")}`;

  return (
    <section className="px-4 md:px-6 pb-20">
      <ScrollReveal>
        <div className="max-w-2xl mx-auto text-center rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 md:p-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-milos-blue" />
            <span className="text-xs text-[var(--text-tertiary)]">+</span>
            <span className="w-2 h-2 rounded-full bg-marija-purple" />
          </div>
          <p className="text-[var(--text-secondary)] mb-6">
            {t("text")}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-milos-blue via-milos-purple to-marija-purple text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            {t("cta")}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
