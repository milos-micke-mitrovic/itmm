"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  const t = useTranslations("web.testimonials");
  const items = t.raw("items") as Array<{
    quote: string;
    name: string;
    type: string;
  }>;

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:border-milos-blue/30 hover:shadow-[0_4px_30px_rgba(59,130,246,0.08)] hover:-translate-y-1">
                {/* Large background quote mark */}
                <span className="absolute -top-2 -right-2 text-[120px] leading-none font-serif text-milos-blue/[0.04] select-none pointer-events-none">
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-6 relative">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-milos-blue to-milos-purple flex items-center justify-center text-white text-xs font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">{item.type}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
