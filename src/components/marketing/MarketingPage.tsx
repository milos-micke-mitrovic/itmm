"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ─── Nav ─── */
const sections = ["services", "about", "credentials", "contact"] as const;

function MarketingNav() {
  const t = useTranslations("marketing.nav");
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-[0_1px_0_var(--glass-border)]" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <button onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">ITMM</span>
          <span className="text-xs text-marija-purple font-medium px-1.5 py-0.5 rounded border border-marija-purple/30 bg-marija-purple/10">Marketing</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${active === id ? "text-marija-purple" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}`}>
              {t(id)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
          <button onClick={() => scrollTo("contact")}
            className="hidden md:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">
            {t("getInTouch")}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer" aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-[var(--glass-border)] animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {sections.map((id) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${active === id ? "text-marija-purple bg-marija-purple/10" : "text-[var(--text-secondary)]"}`}>
                {t(id)}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function MarketingHero() {
  const t = useTranslations("marketing.hero");

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />
      <motion.div className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <p className="text-sm md:text-base text-marija-purple font-medium tracking-wider uppercase mb-4">{t("name")}</p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] max-w-5xl">
          {t("headline")}
        </h1>
        <motion.p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          {t("subline")}
        </motion.p>
        <motion.div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <a href="#services" className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:brightness-110">
            {t("ctaPrimary")}
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-tertiary)]">
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Service icons ─── */
const serviceIcons = [
  <svg key="sm" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>,
  <svg key="cc" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  <svg key="vd" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" /></svg>,
  <svg key="ed" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  <svg key="ms" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>,
  <svg key="ad" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.494.494 0 01-.686-.172 17.085 17.085 0 01-1.634-3.865m2.455-5.837a17.1 17.1 0 011.634-3.865.494.494 0 01.686-.172l.657.38c.523.302.71.962.463 1.511a12.634 12.634 0 00-.985 2.783m-.455 5.363h5.102a4.032 4.032 0 003.237-1.62l.164-.247a.494.494 0 00-.07-.628 12.26 12.26 0 00-4.33-3.068.494.494 0 01-.181-.721 12.24 12.24 0 001.544-4.229.494.494 0 00-.38-.55l-.296-.065a4.032 4.032 0 00-3.69 1.14L12.795 9.66" /></svg>,
];

/* ─── Services ─── */
function Services() {
  const t = useTranslations("marketing.services");
  const items = t.raw("items") as Array<{ title: string; description: string }>;

  return (
    <section id="services" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">{t("title")}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8 h-full transition-all duration-300 hover:border-marija-purple/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]">
                <div className="w-12 h-12 rounded-lg bg-marija-purple/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple mb-4">
                  {serviceIcons[i]}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function AboutMarija() {
  const t = useTranslations("marketing.about");

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-center mb-12">{t("title")}</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg text-center">{t("text")}</p>
          <div className="mt-8 flex justify-center">
            <a href={t("linkedin")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-marija-purple hover:text-marija-purple-soft transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Credentials ─── */
function Credentials() {
  const t = useTranslations("marketing.credentials");
  const items = t.raw("items") as Array<{ title: string; issuer: string; year: string }>;

  return (
    <section id="credentials" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-center mb-16">{t("title")}</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-marija-purple/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{item.issuer} · {item.year}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function MarketingContact() {
  const t = useTranslations("marketing.contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, description: form.message, budget: "Marketing inquiry", source: "marketing" }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-marija-purple/50 transition-colors text-sm";

  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">{t("title")}</h2>
          <p className="text-center text-[var(--text-secondary)] mb-12">{t("text")}</p>
        </ScrollReveal>
        <ScrollReveal>
          {status === "success" ? (
            <div className="text-center py-12 animate-fade-in">
              <svg className="w-12 h-12 mx-auto text-marija-purple mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-[var(--text-secondary)]">{t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder={t("namePlaceholder")} value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} />
              <input type="email" required placeholder={t("emailPlaceholder")} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} />
              <textarea required rows={4} placeholder={t("messagePlaceholder")} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClasses} resize-none`} />
              <button type="submit" disabled={status === "loading"}
                className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer">
                {t("submit")}
              </button>
              {status === "error" && <p className="text-sm text-red-400 text-center">{t("error")}</p>}
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function MarketingFooter() {
  return (
    <footer className="py-8 px-4 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-tertiary)]">© ITMM 2025 · itmm.pro</p>
        <div className="flex items-center gap-1">
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

/* ─── Full Page ─── */
export function MarketingFullPage() {
  const t = useTranslations("marketing");

  return (
    <>
      <MarketingNav />
      <main>
        <MarketingHero />
        <Services />
        <AboutMarija />
        <Credentials />
        <MarketingContact />
      </main>
      <MarketingFooter />
    </>
  );
}
