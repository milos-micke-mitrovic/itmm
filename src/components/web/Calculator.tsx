"use client";

import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type Config = {
  pages: 0 | 1 | 2;
  gallery: boolean;
  contactForm: boolean;
  maps: boolean;
  whatsapp: boolean;
  blog: boolean;
  cms: boolean;
  logo: boolean;
  rush: boolean;
  hosting: 0 | 1 | 2 | 3;
  maintenance: 0 | 1 | 2 | 3;
};

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 py-3 cursor-pointer group">
      <div>
        <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
          {label}
        </span>
        {hint && <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 shrink-0 rounded-full transition-colors duration-200 cursor-pointer ${
          checked
            ? "bg-gradient-to-r from-milos-blue to-milos-purple"
            : "bg-[var(--bg-tertiary)]"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

function Select({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="py-3">
      <label className="text-sm text-[var(--text-secondary)] block mb-1">
        {label}
      </label>
      {hint && <p className="text-xs text-[var(--text-tertiary)] mb-2">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
              value === i
                ? "border-milos-blue/50 bg-milos-blue/10 text-milos-blue"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Calculator() {
  const t = useTranslations("web.calculator");
  const labels = t.raw("labels") as Record<string, string>;
  const options = t.raw("options") as Record<string, string[]>;

  const [config, setConfig] = useState<Config>({
    pages: 0,
    gallery: false,
    contactForm: true,
    maps: false,
    whatsapp: false,
    blog: false,
    cms: false,
    logo: false,
    rush: false,
    hosting: 0,
    maintenance: 0,
  });

  const estimate = useMemo(() => {
    let min = 0;
    let max = 0;

    // Base price by pages
    if (config.pages === 0) { min += 250; max += 350; }
    else if (config.pages === 1) { min += 400; max += 550; }
    else { min += 600; max += 800; }

    if (config.gallery) { min += 50; max += 80; }
    if (config.contactForm) { min += 0; max += 0; } // included
    if (config.maps) { min += 20; max += 40; }
    if (config.whatsapp) { min += 10; max += 20; }
    if (config.blog) { min += 100; max += 200; }
    if (config.cms) { min += 150; max += 250; }
    if (config.logo) { min += 80; max += 150; }
    if (config.rush) {
      min = Math.round(min * 1.3);
      max = Math.round(max * 1.3);
    }

    // Annual hosting
    const hostingPrices = [0, 70, 130, 220];
    const hostingCost = hostingPrices[config.hosting];

    // Monthly maintenance (show yearly)
    const maintenancePrices = [0, 30, 60, 120];
    const maintenanceCost = maintenancePrices[config.maintenance] * 12;

    return { min, max, hosting: hostingCost, maintenance: maintenanceCost };
  }, [config]);

  const set = <K extends keyof Config>(key: K, val: Config[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-4">
            {t("title")}
          </h2>
          <p className="text-center text-sm text-[var(--text-secondary)] mb-12">
            {t("note")}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8">
            <Select
              label={labels.pages}
              hint={labels.pagesHint}
              options={options.pages}
              value={config.pages}
              onChange={(v) => set("pages", v as 0 | 1 | 2)}
            />

            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.gallery} hint={labels.galleryHint} checked={config.gallery} onChange={(v) => set("gallery", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.contactForm} hint={labels.contactFormHint} checked={config.contactForm} onChange={(v) => set("contactForm", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.maps} hint={labels.mapsHint} checked={config.maps} onChange={(v) => set("maps", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.whatsapp} hint={labels.whatsappHint} checked={config.whatsapp} onChange={(v) => set("whatsapp", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.blog} hint={labels.blogHint} checked={config.blog} onChange={(v) => set("blog", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.cms} hint={labels.cmsHint} checked={config.cms} onChange={(v) => set("cms", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.logo} hint={labels.logoHint} checked={config.logo} onChange={(v) => set("logo", v)} />
            </div>
            <div className="border-t border-[var(--border)]">
              <Toggle label={labels.rush} hint={labels.rushHint} checked={config.rush} onChange={(v) => set("rush", v)} />
            </div>

            <div className="border-t border-[var(--border)] pt-2">
              <Select
                label={labels.hosting}
                hint={labels.hostingHint}
                options={options.hosting}
                value={config.hosting}
                onChange={(v) => set("hosting", v as 0 | 1 | 2 | 3)}
              />
            </div>

            <div className="border-t border-[var(--border)] pt-2">
              <Select
                label={labels.maintenance}
                hint={labels.maintenanceHint}
                options={options.maintenance}
                value={config.maintenance}
                onChange={(v) => set("maintenance", v as 0 | 1 | 2 | 3)}
              />
            </div>

            {/* Result */}
            <motion.div
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-milos-blue/5 to-milos-purple/5 border border-milos-blue/20 text-center"
              layout
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                {t("result")}
              </p>
              <motion.p
                key={`${estimate.min}-${estimate.max}`}
                className="font-[family-name:var(--font-display)] text-4xl font-bold bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent"
                initial={{ opacity: 0.5, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                €{estimate.min} – €{estimate.max}
              </motion.p>
              {(estimate.hosting > 0 || estimate.maintenance > 0) && (
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  {estimate.hosting > 0 && `+ €${estimate.hosting}/year hosting`}
                  {estimate.hosting > 0 && estimate.maintenance > 0 && " · "}
                  {estimate.maintenance > 0 &&
                    `+ €${estimate.maintenance / 12}/month maintenance`}
                </p>
              )}
              <a
                href="#contact"
                className="mt-6 inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {t("cta")}
              </a>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
