"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRef } from "react";
import Image from "next/image";

const projectImages: Record<string, string> = {
  "vrebaj-popust": "/images/vrebaj-popust.jpg",
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
      className="transition-transform duration-300 ease-out"
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

  return (
    <section id="work" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">
            {t("title")}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 100}>
              <TiltCard>
                <a
                  href={project.url !== "#" ? project.url : undefined}
                  target={project.url !== "#" ? "_blank" : undefined}
                  rel={project.url !== "#" ? "noopener noreferrer" : undefined}
                  className={`group relative rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden block ${project.url === "#" ? "pointer-events-none" : ""}`}
                >
                  <div className="aspect-video bg-[var(--bg-tertiary)] relative overflow-hidden">
                    {projectImages[project.slug] ? (
                      <Image
                        src={projectImages[project.slug]}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-milos-blue/10 to-milos-purple/10 flex items-center justify-center">
                        <span className="text-[var(--text-tertiary)] text-sm">Coming Soon</span>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white text-sm font-medium">
                        {t("viewProject")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
