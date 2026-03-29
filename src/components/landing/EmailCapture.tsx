"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export function EmailCapture() {
  const t = useTranslations("landing.email");
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
    <section id="email-capture" className="px-4 md:px-6 py-20">
      <div className="max-w-md mx-auto text-center">
        <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold mb-2">
          {t("heading")}
        </h3>
        <p className="text-[var(--text-secondary)] mb-6">{t("sub")}</p>

        {status === "success" ? (
          <p className="text-marija-purple font-medium animate-fade-in">
            {t("success")}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-marija-purple/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer"
            >
              {t("button")}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-400">{t("error")}</p>
        )}
      </div>
    </section>
  );
}
