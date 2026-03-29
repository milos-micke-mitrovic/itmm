"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const icons = [
  <svg key="agreement" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712V4.575" /></svg>,
  <svg key="design" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  <svg key="build" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>,
  <svg key="launch" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
];

export function Process() {
  const t = useTranslations("web.process");
  const steps = t.raw("steps") as Array<{ title: string; text: string }>;

  return (
    <section id="process" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        {/* Desktop: horizontal steps */}
        <div className="hidden md:grid md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="group text-center relative px-4">
                {/* Icon row with connectors */}
                <div className="flex items-center justify-center mb-4 relative">
                  {/* Line before (except first) */}
                  {i > 0 && (
                    <div className="absolute right-1/2 mr-8 top-1/2 h-px w-full bg-gradient-to-r from-milos-blue/20 to-milos-purple/30 -translate-y-1/2" />
                  )}
                  {/* Line after (except last) */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-1/2 ml-8 top-1/2 h-px w-full bg-gradient-to-r from-milos-purple/30 to-milos-blue/20 -translate-y-1/2" />
                  )}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-milos-blue/10 to-milos-purple/10 border border-milos-blue/20 flex items-center justify-center text-milos-blue relative z-10 bg-[var(--bg-secondary)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:border-milos-blue/40">
                    {icons[i]}
                  </div>
                </div>
                <span className="inline-block text-xs font-bold text-milos-blue bg-milos-blue/10 px-2 py-0.5 rounded-full mb-3">
                  0{i + 1}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: vertical steps */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-milos-blue/10 to-milos-purple/10 border border-milos-blue/20 flex items-center justify-center text-milos-blue shrink-0">
                    {icons[i]}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-3 bg-gradient-to-b from-milos-blue/30 to-transparent" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-xs font-bold text-milos-blue">0{i + 1}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
