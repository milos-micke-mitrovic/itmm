"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function LandingHero() {
  const t = useTranslations("landing");

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-8 relative overflow-hidden">
      {/* Dual gradient — blue left, purple right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_-10%,rgba(59,130,246,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_-10%,rgba(168,85,247,0.08),transparent)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-xs font-medium text-[var(--text-secondary)] tracking-wider uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Web Development · Digital Marketing
        </motion.div>

        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl">
          {t("headline")}
        </h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {t("subline")}
        </motion.p>
      </motion.div>
    </section>
  );
}
