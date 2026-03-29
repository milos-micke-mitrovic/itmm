"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Image from "next/image";

const toolIcons: Record<string, string> = {
  "Next.js": "N",
  React: "R",
  TypeScript: "TS",
  "Tailwind CSS": "TW",
  Figma: "F",
  Vercel: "V",
  Git: "G",
};

export function About() {
  const t = useTranslations("web.about");
  const tools = t.raw("tools") as string[];

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          <ScrollReveal>
            <div>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                {t("text")}
              </p>

              {/* LinkedIn placeholder */}
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-6 text-sm text-milos-blue hover:text-milos-blue-bright transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div>
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] overflow-hidden relative">
                <Image
                  src="/images/workspace.jpg"
                  alt="Developer workspace"
                  fill
                  className="object-cover"
                  sizes="224px"
                  loading="lazy"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Tools */}
        <ScrollReveal>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {tools.map((tool) => (
              <div
                key={tool}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-sm"
              >
                <span className="w-6 h-6 rounded bg-milos-blue/10 text-milos-blue text-xs font-bold flex items-center justify-center">
                  {toolIcons[tool] || tool[0]}
                </span>
                {tool}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
