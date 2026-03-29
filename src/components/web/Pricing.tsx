"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";

export function Pricing() {
  const t = useTranslations("web.pricing");
  const tiers = t.raw("tiers") as Array<{
    name: string;
    price: string;
    for: string;
    popular?: boolean;
    features: string[];
  }>;
  const extras = t.raw("extras") as { title: string; items: string[] };
  const hosting = t.raw("hosting") as {
    title: string;
    plans: Array<{ name: string; price: string; description: string }>;
  };
  const maintenance = t.raw("maintenance") as {
    title: string;
    plans: Array<{ name: string; price: string; description: string }>;
  };
  const existing = t.raw("existing") as {
    title: string;
    plans: Array<{ name: string; price: string; description: string; for: string }>;
  };

  const [showExtras, setShowExtras] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <ScrollReveal key={tier.name} delay={i * 100}>
              <div
                className={`relative rounded-xl border p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "border-milos-blue/50 bg-[var(--bg-secondary)] shadow-[0_0_40px_rgba(59,130,246,0.12)] hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] scale-[1.02]"
                    : "border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--text-tertiary)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-milos-blue to-milos-purple text-white">
                    {t("popular")}
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold">
                  {tier.name}
                </h3>
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold mt-2 bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent">
                  {tier.price}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-3 mb-6">
                  {tier.for}
                </p>
                <ul className="space-y-3 flex-1">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <svg
                        className="w-4 h-4 text-milos-blue mt-0.5 shrink-0"
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
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`mt-8 block text-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                    tier.popular
                      ? "bg-gradient-to-r from-milos-blue to-milos-purple text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  {t("getStarted")}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Extras toggle */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowExtras(!showExtras)}
              className="w-full flex items-center justify-between px-6 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
            >
              <span className="font-[family-name:var(--font-display)] font-semibold">
                {extras.title}
              </span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${showExtras ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {showExtras && (
              <div className="mt-2 px-6 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] animate-fade-in">
                <ul className="space-y-2">
                  {extras.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-milos-blue">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Scope policy */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto mt-8 px-6 py-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">
              {t("scope")}
            </p>
          </div>
        </ScrollReveal>

        {/* Hosting + Maintenance */}
        {/* Existing site services */}
        <ScrollReveal>
          <div className="mt-16">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold leading-snug text-center mb-8">
              {existing.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {existing.plans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8 transition-all duration-300 hover:border-milos-blue/30 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold">{plan.name}</h4>
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    {plan.description}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] italic">
                    {plan.for}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          <ScrollReveal>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">
                {hosting.title}
              </h3>
              <div className="space-y-3">
                {hosting.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="px-5 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{plan.name}</span>
                      <span className="text-sm font-semibold text-milos-blue">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-4">
                {maintenance.title}
              </h3>
              <div className="space-y-3">
                {maintenance.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="px-5 py-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{plan.name}</span>
                      <span className="text-sm font-semibold text-milos-blue">
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {plan.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
