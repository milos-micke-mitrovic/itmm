"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TwoDoors() {
  const t = useTranslations("landing");
  const router = useRouter();

  const door1Bullets = t.raw("door1.bullets") as string[];
  const door2Bullets = t.raw("door2.bullets") as string[];

  return (
    <section className="px-4 md:px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-widest mb-8">
            {t("choose")}
          </p>
        </ScrollReveal>
      </div>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Door 1 — Web Development */}
        <ScrollReveal>
          <div
            onClick={() =>
              router.push("/web")
            }
            className="group relative cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 md:p-10 transition-all duration-300 hover:border-milos-blue/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-milos-blue/5 to-milos-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <p className="text-sm font-medium text-milos-blue tracking-wider uppercase mb-1">
                {t("door1.title")}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-6">
                {t("door1.name")}
              </h3>
              <ul className="space-y-3 mb-8">
                {door1Bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-secondary)]"
                  >
                    <svg
                      className="w-5 h-5 text-milos-blue mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white font-medium text-sm transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                {t("door1.cta")}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Door 2 — Digital Marketing */}
        <ScrollReveal delay={150}>
          <div
            onClick={() => router.push("/marketing")}
            className="group relative cursor-pointer rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 md:p-10 transition-all duration-300 hover:border-marija-purple/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-marija-purple/5 to-marija-lavender/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <p className="text-sm font-medium text-marija-purple tracking-wider uppercase mb-1">
                {t("door2.title")}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold mb-6">
                {t("door2.name")}
              </h3>
              <ul className="space-y-3 mb-8">
                {door2Bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--text-secondary)]"
                  >
                    <svg
                      className="w-5 h-5 text-marija-purple mt-0.5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium text-sm transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                {t("door2.cta")}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
