import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { WebNav } from "@/components/layout/WebNav";
import { WebFooter } from "@/components/layout/WebFooter";

export const metadata: Metadata = {
  title: "Tips & Insights — ITMM",
  description:
    "Practical tips about websites, domains, and digital presence for small businesses.",
};

export default function BlogPage() {
  const t = useTranslations("web.blog");
  const posts = t.raw("posts") as Array<{
    slug: string;
    title: string;
    excerpt: string;
  }>;

  return (
    <>
      <WebNav />
      <main className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight mb-12">
            {t("title")}
          </h1>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8 transition-colors hover:border-milos-blue/30"
              >
                <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-semibold mb-3 group-hover:text-milos-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-sm text-milos-blue font-medium">
                  {t("readMore")} →
                </span>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-[var(--text-tertiary)] text-sm">
              More articles coming soon.
            </p>
          </div>
        </div>
      </main>
      <WebFooter />
    </>
  );
}
