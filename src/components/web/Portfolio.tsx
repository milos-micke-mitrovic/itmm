"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const projectImages: Record<string, string> = {
  "algreen-konfigurator": "/images/algreen-konfigurator.jpg",
  "vrebaj-popust": "/images/vrebaj-popust.jpg",
  "smart-homio": "/images/smart-homio.jpg",
  "try-or-bye": "/images/try-or-bye.jpg",
  "jamogu": "/images/jamogu.jpg",
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-out flex-1 flex"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Portfolio() {
  const t = useTranslations("web.portfolio");
  const projects = t.raw("projects") as Array<{
    slug: string;
    name: string;
    description: string;
    tags: string[];
    url: string;
  }>;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.clientWidth || 380;
    el.scrollBy({ left: dir === "left" ? -cardWidth - 24 : cardWidth + 24, behavior: "smooth" });
  };

  return (
    <section id="work" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3]">
              {t("title")}
            </h2>
            {/* Desktop arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              data-card
              className="snap-start shrink-0 w-[85%] sm:w-[360px] md:w-[380px] flex"
            >
              <TiltCard>
                <a
                  href={project.url !== "#" ? project.url : undefined}
                  target={project.url !== "#" ? "_blank" : undefined}
                  rel={project.url !== "#" ? "noopener noreferrer" : undefined}
                  className={`group relative rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden flex flex-col flex-1 ${project.url === "#" ? "pointer-events-none" : ""}`}
                >
                  <div className="aspect-video bg-[var(--bg-tertiary)] relative overflow-hidden">
                    {projectImages[project.slug] ? (
                      <Image
                        src={projectImages[project.slug]}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="380px"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-milos-blue/10 to-milos-purple/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white text-sm font-medium">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-milos-blue/10 text-milos-blue border border-milos-blue/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
