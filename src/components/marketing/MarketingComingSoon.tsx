"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { useState } from "react";

export function MarketingComingSoon() {
  const t = useTranslations("marketing");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Purple background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.15),transparent)]" />

      <div className="relative text-center max-w-lg">
        <p className="text-sm font-medium text-marija-purple tracking-wider uppercase mb-2">
          {t("subheading")}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
          {t("heading")}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 leading-relaxed">
          {t("text")}
        </p>

        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4">
          {t("emailHeading")}
        </h3>

        {status === "success" ? (
          <p className="text-marija-purple font-medium animate-fade-in">
            {t("emailSuccess")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-marija-purple/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {t("emailButton")}
            </button>
          </form>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-10 inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {t("backToHome")}
        </button>
      </div>
    </div>
  );
}
