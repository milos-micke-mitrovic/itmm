# ITMM — Site Architecture & Structure

## Routing (next-intl + App Router)

```
/                         → Redirect to /en
/[locale]                 → Landing page
/[locale]/web             → Milos's world (single page, all sections)
/[locale]/marketing       → Marija's coming soon (Phase 1) / Full world (Phase 2)
/[locale]/web/blog        → Blog listing (Phase 2, route ready)
/[locale]/web/blog/[slug] → Blog post (Phase 2, route ready)
```

Locales: `en` (default), `sr`

## Page Structure

### Landing Page `/[locale]`
```
<LoadingScreen />        — First visit only, 1.5-2s
<LandingNav />           — Logo + lang toggle + theme toggle
<LandingHero />          — Brand headline + subline
<TwoDoors />             — Side-by-side specialist cards
<EmailCapture />         — Marija launch notification
<LandingFooter />        — Minimal footer
```

### Milos's World `/[locale]/web`
```
<WebNav />               — Full nav with section links + CTA
<WebHero />              — Typing headline + CTAs
<SocialProof />          — Stats bar with count-up
<Portfolio />            — Project grid with 3D tilt cards
<Process />              — 4-step flow
<Pricing />              — 3 tiers + extras + hosting + maintenance
<Calculator />           — Interactive price estimator
<FAQ />                  — Accordion
<Testimonials />         — Client quotes
<About />                — Bio + tech stack
<BlogPreview />          — 3 article cards
<Contact />              — Form + WhatsApp + email
<WhatsAppFloat />        — Fixed bottom-right button
<BackToTop />            — Appears after 50% scroll
<CustomCursor />         — Desktop only, motion-safe only
<WebFooter />            — Full footer
```

### Marija's Coming Soon `/[locale]/marketing`
```
<MarketingComingSoon />  — Full page: heading, teaser, email capture, back link
```

### 404 `/[locale]/not-found`
```
<NotFound />             — Branded 404 with personality
```

## Component Tree

```
src/components/
├── landing/
│   ├── LandingHero.tsx
│   ├── TwoDoors.tsx
│   ├── EmailCapture.tsx
│   └── LandingFooter.tsx
├── web/
│   ├── WebHero.tsx
│   ├── SocialProof.tsx
│   ├── Portfolio.tsx
│   ├── Process.tsx
│   ├── Pricing.tsx
│   ├── Calculator.tsx
│   ├── FAQ.tsx
│   ├── Testimonials.tsx
│   ├── About.tsx
│   ├── BlogPreview.tsx
│   └── Contact.tsx
├── marketing/
│   └── MarketingComingSoon.tsx
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── ThemeToggle.tsx
│   ├── LangToggle.tsx
│   ├── SectionHeading.tsx
│   ├── Card.tsx
│   └── AnimatedCounter.tsx
└── layout/
    ├── LoadingScreen.tsx
    ├── LandingNav.tsx
    ├── WebNav.tsx
    ├── WebFooter.tsx
    ├── WhatsAppFloat.tsx
    ├── BackToTop.tsx
    └── CustomCursor.tsx
```

## Section Order (Milos's World)
1. Hero (viewport height)
2. Social Proof Bar
3. Portfolio / Work
4. Process / How It Works
5. Pricing (tiers + extras + hosting + maintenance)
6. Calculator
7. FAQ
8. Testimonials
9. About
10. Blog Preview
11. Contact

## Phase 1 vs Phase 2

### Phase 1 (Ship)
- Full landing page
- Full Milos's world (all sections)
- Marija's coming soon page
- i18n infrastructure (EN complete, SR placeholders)
- Dark/light theme
- Loading screen
- 404 page
- Favicon + OG tags
- Plausible analytics
- Resend integration (contact + subscribe)
- All placeholder content in place

### Phase 2 (Later)
- Marija's full marketing world (sections TBD)
- Blog infrastructure with real content
- Real portfolio projects
- Real testimonials
- Real photos
- Finalized Serbian translations
- Portfolio case study modals/pages
- Advanced SEO (structured data, sitemap)
