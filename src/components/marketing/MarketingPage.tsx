"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { contacts } from "@/lib/contacts";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ─── Nav ─── */
const navSections = ["services", "process", "faq", "testimonials", "about", "credentials", "contact"] as const;

function MarketingNav() {
  const t = useTranslations("marketing.nav");
  const nt = useTranslations("nav");
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      for (const id of [...navSections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) { setActive(id); return; }
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
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-marija-purple to-marija-purple-soft transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push("/")} className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight cursor-pointer">ITMM</button>
          <div className="flex items-center rounded-lg border border-[var(--border)] overflow-hidden text-xs font-medium">
            <button onClick={() => router.push("/web")} className="px-2 py-1 text-[var(--text-tertiary)] hover:text-milos-blue hover:bg-milos-blue/10 transition-colors cursor-pointer">{nt("switchToWeb")}</button>
            <span className="px-2 py-1 bg-marija-purple/15 text-marija-purple">{nt("switchToMarketing")}</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-0.5">
          {navSections.map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 cursor-pointer ${active === id ? "text-marija-purple bg-marija-purple/10" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"}`}>
              {t(id)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-1"><LangToggle /><ThemeToggle /></div>
          <button onClick={() => scrollTo("contact")} className="hidden md:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white text-xs font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer">{t("getInTouch")}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer" aria-label="Toggle menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass border-t border-[var(--glass-border)] animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navSections.map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer ${active === id ? "text-marija-purple bg-marija-purple/10" : "text-[var(--text-secondary)]"}`}>{t(id)}</button>
            ))}
            <div className="pt-2 border-t border-[var(--border)]">
              <button onClick={() => { router.push("/web"); setMenuOpen(false); }} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-milos-blue cursor-pointer">→ {nt("switchToWeb")}</button>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]"><LangToggle /><ThemeToggle /></div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function MarketingHero() {
  const t = useTranslations("marketing.hero");
  const words = t.raw("rotatingWords") as string[];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setWordIndex((prev) => (prev + 1) % words.length); }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="min-h-dvh flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(168,85,247,0.12),transparent)]" />
      <motion.div className="relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <p className="text-sm md:text-base text-marija-purple font-medium tracking-wider uppercase mb-4">{t("name")}</p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,8vw,4.5rem)] font-extrabold tracking-tight leading-[1.2] max-w-5xl">
          {t("headline")}{" "}
          <span className="inline-block relative">
            <AnimatePresence mode="wait">
              <motion.span key={wordIndex} className="block sm:inline-block bg-gradient-to-r from-marija-purple to-marija-purple-soft bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(4px)" }} transition={{ duration: 0.35, ease: "easeOut" }}>
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>
        <motion.p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>{t("subline")}</motion.p>
        <motion.div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <a href="#services" className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium transition-all duration-200 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:brightness-110">{t("ctaPrimary")}</a>
          <a href="#contact" className="px-8 py-3.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--text-tertiary)]">{t("ctaSecondary")}</a>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Social Proof ─── */
function MarketingSocialProof() {
  const t = useTranslations("marketing.social");
  const stats = t.raw("stats") as Array<{ number: number; suffix: string; label: string }>;
  const prefersReduced = useReducedMotion();

  function CountUp({ end, suffix }: { end: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);
    useEffect(() => {
      if (prefersReduced) { setCount(end); return; }
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000; const start = performance.now();
          const animate = (now: number) => { const p = Math.min((now - start) / duration, 1); setCount(Math.round((1 - Math.pow(1 - p, 3)) * end)); if (p < 1) requestAnimationFrame(animate); };
          requestAnimationFrame(animate); observer.unobserve(el);
        }
      }, { threshold: 0.5 });
      observer.observe(el);
      return () => observer.disconnect();
    }, [end]);
    return <span ref={ref} className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold bg-gradient-to-r from-marija-purple to-marija-purple-soft bg-clip-text text-transparent">{count}{suffix}</span>;
  }

  return (
    <section className="py-16 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <CountUp end={stat.number} suffix={stat.suffix} />
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </div>
        ))}
      </div>
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
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">{t("title")}</h2></ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:p-8 h-full transition-all duration-300 hover:border-marija-purple/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)] hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-marija-purple/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple mb-4">{serviceIcons[i]}</div>
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

/* ─── Process ─── */
const processIcons = [
  <svg key="d" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
  <svg key="s" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>,
  <svg key="e" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
  <svg key="g" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>,
];

function MarketingProcess() {
  const t = useTranslations("marketing.process");
  const steps = t.raw("steps") as Array<{ title: string; text: string }>;
  return (
    <section id="process" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">{t("title")}</h2></ScrollReveal>
        <div className="hidden md:grid md:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="group text-center relative px-4">
                <div className="flex items-center justify-center mb-4 relative">
                  {i > 0 && <div className="absolute right-1/2 mr-8 top-1/2 h-px w-full bg-gradient-to-r from-marija-purple/20 to-marija-purple/30 -translate-y-1/2" />}
                  {i < steps.length - 1 && <div className="absolute left-1/2 ml-8 top-1/2 h-px w-full bg-gradient-to-r from-marija-purple/30 to-marija-purple/20 -translate-y-1/2" />}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-marija-purple/10 to-marija-lavender/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple relative z-10 bg-[var(--bg-secondary)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group-hover:border-marija-purple/40">{processIcons[i]}</div>
                </div>
                <span className="inline-block text-xs font-bold text-marija-purple bg-marija-purple/10 px-2 py-0.5 rounded-full mb-3">0{i + 1}</span>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-marija-purple/10 to-marija-lavender/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple shrink-0">{processIcons[i]}</div>
                  {i < steps.length - 1 && <div className="w-px flex-1 mt-3 bg-gradient-to-b from-marija-purple/30 to-transparent" />}
                </div>
                <div className="pb-4">
                  <span className="text-xs font-bold text-marija-purple">0{i + 1}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function MarketingFAQ() {
  const t = useTranslations("marketing.faq");
  const items = t.raw("items") as Array<{ question: string; answer: string }>;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section id="faq" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">{t("title")}</h2></ScrollReveal>
        <ScrollReveal>
          <div>
            {items.map((item, i) => (
              <div key={i} className="border-b border-[var(--border)]">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left cursor-pointer group">
                  <span className="font-medium text-sm md:text-base pr-4 group-hover:text-marija-purple transition-colors">{item.question}</span>
                  <motion.svg className="w-5 h-5 shrink-0 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="pb-5 text-sm text-[var(--text-secondary)] leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function MarketingTestimonials() {
  const t = useTranslations("marketing.testimonials");
  const items = t.raw("items") as Array<{ quote: string; name: string; type: string }>;
  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">{t("title")}</h2></ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="group rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 md:p-8 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:border-marija-purple/30 hover:shadow-[0_4px_30px_rgba(168,85,247,0.08)] hover:-translate-y-1">
                <span className="absolute -top-2 -right-2 text-[120px] leading-none font-serif text-marija-purple/[0.04] select-none pointer-events-none">&ldquo;</span>
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-6">&ldquo;{item.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-marija-purple to-marija-purple-soft flex items-center justify-center text-white text-xs font-bold">{item.name.charAt(0)}</div>
                  <div><p className="font-semibold text-sm">{item.name}</p><p className="text-xs text-[var(--text-tertiary)]">{item.type}</p></div>
                </div>
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
    <section id="about" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-12">{t("title")}</h2></ScrollReveal>
        <ScrollReveal>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg text-center">{t("text")}</p>
          <div className="mt-8 flex justify-center">
            <a href={t("linkedin")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-marija-purple hover:text-marija-purple-soft transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
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
    <section id="credentials" className="py-20 md:py-32 px-4 md:px-6 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal><h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-16">{t("title")}</h2></ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-marija-purple/10 border border-marija-purple/20 flex items-center justify-center text-marija-purple shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                </div>
                <div><h3 className="font-semibold text-sm mb-1">{item.title}</h3><p className="text-xs text-[var(--text-secondary)]">{item.issuer} · {item.year}</p></div>
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
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, description: form.message, budget: "Marketing inquiry", source: "marketing", _honey: honey }) });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", message: "" }); } else setStatus("error");
    } catch { setStatus("error"); }
  };
  const inputClasses = "w-full px-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-marija-purple/50 transition-colors text-sm";
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[3rem] font-bold tracking-tight leading-[1.3] text-center mb-4">{t("title")}</h2>
          <p className="text-center text-[var(--text-secondary)] mb-12">{t("text")}</p>
        </ScrollReveal>
        <ScrollReveal>
          {status === "success" ? (
            <div className="text-center py-12 animate-fade-in">
              <svg className="w-12 h-12 mx-auto text-marija-purple mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-[var(--text-secondary)]">{t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="website" value={honey} onChange={(e) => setHoney(e.target.value)} className="absolute opacity-0 -z-10 h-0 w-0" tabIndex={-1} autoComplete="off" />
              <input type="text" required placeholder={t("namePlaceholder")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} />
              <input type="email" required placeholder={t("emailPlaceholder")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} />
              <textarea required rows={4} placeholder={t("messagePlaceholder")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClasses} resize-none`} />
              <button type="submit" disabled={status === "loading"} className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-marija-purple to-marija-purple-soft text-white font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] disabled:opacity-50 cursor-pointer">{t("submit")}</button>
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
  const nt = useTranslations("marketing.nav");
  const ft = useTranslations("landing.footer");
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="py-12 px-4 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight bg-gradient-to-r from-marija-purple to-marija-purple-soft bg-clip-text text-transparent">ITMM</span>
            <p className="text-xs text-[var(--text-tertiary)]">{ft("tagline")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {(["services", "process", "faq", "about", "contact"] as const).map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">{nt(id)}</button>
            ))}
          </div>
          <div className="flex items-center gap-1"><LangToggle /><ThemeToggle /></div>
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center"><p className="text-xs text-[var(--text-tertiary)]">© ITMM 2026 · itmm.pro</p></div>
      </div>
    </footer>
  );
}

/* ─── Full Page ─── */
export function MarketingFullPage() {
  return (
    <>
      <MarketingNav />
      <main>
        <MarketingHero />
        <MarketingSocialProof />
        <Services />
        <MarketingProcess />
        <MarketingFAQ />
        <MarketingTestimonials />
        <AboutMarija />
        <Credentials />
        <MarketingContact />
      </main>
      <MarketingFooter />
    </>
  );
}
