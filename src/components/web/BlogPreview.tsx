"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function BlogPreview() {
  const t = useTranslations("web.blog");
  const posts = t.raw("posts") as Array<{
    slug: string;
    title: string;
    excerpt: string;
  }>;

  return (
    <section id="blog" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <article className="group rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-milos-blue/30 hover:shadow-[0_4px_30px_rgba(59,130,246,0.08)] hover:-translate-y-1">
                {/* Placeholder thumbnail */}
                <div className="aspect-[16/9] bg-[var(--bg-tertiary)] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-milos-blue/10 to-milos-purple/10 flex items-center justify-center">
                    <span className="text-[var(--text-tertiary)] text-xs">
                      Article image
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold mb-2 group-hover:text-milos-blue transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-sm text-milos-blue font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("readMore")}
                    <svg
                      className="w-3.5 h-3.5"
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
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
