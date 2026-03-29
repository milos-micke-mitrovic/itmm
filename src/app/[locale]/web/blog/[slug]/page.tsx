import type { Metadata } from "next";
import Link from "next/link";
import { WebNav } from "@/components/layout/WebNav";
import { WebFooter } from "@/components/layout/WebFooter";

export const metadata: Metadata = {
  title: "Blog Post — ITMM",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <WebNav />
      <main className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/web/blog"
            className="text-sm text-milos-blue hover:text-milos-blue-bright mb-8 inline-flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to articles
          </Link>

          <article className="mt-8">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </h1>

            <div className="prose prose-invert max-w-none">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 text-center">
                <p className="text-[var(--text-secondary)]">
                  This article is coming soon. Check back later.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <WebFooter />
    </>
  );
}
