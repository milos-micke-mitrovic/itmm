"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WebHero() {
  const t = useTranslations("web.hero");
  const words = t.raw("rotatingWords") as string[];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.12),transparent)]" />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-sm md:text-base text-milos-blue font-medium tracking-wider uppercase mb-4">
          {t("name")}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,4.5rem)] font-extrabold tracking-tight leading-[1.2] max-w-5xl">
          {t("headline")}{" "}
          <span className="inline-block relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="block sm:inline-block bg-gradient-to-r from-milos-blue to-milos-purple bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("subline")}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#work"
            className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-milos-blue to-milos-purple text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:brightness-110"
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-tertiary)]"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
