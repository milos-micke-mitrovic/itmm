import type { Metadata } from "next";
import { Link } from "@/lib/navigation";
import { WebNav } from "@/components/layout/WebNav";
import { WebFooter } from "@/components/layout/WebFooter";
import { getBlogPost, blogPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";

const postImages: Record<string, string> = {
  "website-cost-2025": "/images/blog-website-cost.jpg",
  "instagram-vs-website": "/images/blog-instagram-vs-website.jpg",
  "choose-domain-name": "/images/blog-choose-domain.jpg",
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "web.blog" });
  const posts = t.raw("posts") as Array<{ slug: string; title: string; excerpt: string }>;
  const post = posts.find((p) => p.slug === slug);

  return {
    title: post ? `${post.title} — ITMM` : "Blog — ITMM",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "web.blog" });
  const posts = t.raw("posts") as Array<{ slug: string; title: string }>;
  const postMeta = posts.find((p) => p.slug === slug);
  const lang = locale === "sr" ? "sr" : "en";
  const paragraphs = post.content[lang];
  const backText = locale === "sr" ? "← Nazad" : "← Back";

  return (
    <>
      <WebNav />
      <main className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/web#blog"
            className="text-sm text-milos-blue hover:text-milos-blue-bright inline-flex items-center gap-1 transition-colors"
          >
            {backText}
          </Link>

          <article className="mt-8">
            {postImages[slug] && (
              <div className="aspect-[2/1] relative rounded-xl overflow-hidden mb-8">
                <Image
                  src={postImages[slug]}
                  alt={postMeta?.title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />
              </div>
            )}

            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold tracking-tight leading-[1.3] mb-8">
              {postMeta?.title || slug}
            </h1>

            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[var(--text-secondary)] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 p-6 rounded-xl border border-milos-blue/20 bg-gradient-to-br from-milos-blue/5 to-milos-purple/5 text-center">
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {locale === "sr"
                  ? "Treba vam sajt? Javite se — daću vam ponudu u roku od 24 sata."
                  : "Need a website? Get in touch — I'll send you a quote within 24 hours."}
              </p>
              <Link
                href="/web#contact"
                className="inline-flex px-6 py-3 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {locale === "sr" ? "Kontaktiraj me" : "Contact me"}
              </Link>
            </div>
          </article>
        </div>
      </main>
      <WebFooter />
    </>
  );
}
