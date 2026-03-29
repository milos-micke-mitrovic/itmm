# ITMM Design System

## Color Tokens

### Shared / Neutral
| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--bg-primary` | `#0a0b14` | `#f5f5f7` | Page background |
| `--bg-secondary` | `#12131f` | `#eaeaef` | Card/section backgrounds |
| `--bg-tertiary` | `#1a1b2e` | `#e0e0e8` | Elevated surfaces |
| `--text-primary` | `#f0f0f5` | `#1a1a2e` | Main text |
| `--text-secondary` | `#a0a0b5` | `#5a5a72` | Secondary/muted text |
| `--text-tertiary` | `#6a6a80` | `#8a8a9e` | Disabled/hint text |
| `--border` | `#2a2b3d` | `#d0d0dc` | Borders, dividers |
| `--glass-bg` | `rgba(10,11,20,0.8)` | `rgba(245,245,247,0.8)` | Glassmorphism nav |
| `--glass-border` | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.08)` | Glassmorphism border |

### Milos's World (Web Development)
| Token | Value | Usage |
|-------|-------|-------|
| `--milos-blue` | `#3b82f6` | Primary electric blue |
| `--milos-blue-bright` | `#60a5fa` | Hover/active states |
| `--milos-purple` | `#8b5cf6` | Secondary purple |
| `--milos-gradient` | `linear-gradient(135deg, #3b82f6, #8b5cf6)` | Accent gradient |
| `--milos-glow` | `0 0 20px rgba(59,130,246,0.3)` | Glow effects |

### Marija's World (Digital Marketing)
| Token | Value | Usage |
|-------|-------|-------|
| `--marija-purple` | `#a855f7` | Primary vibrant purple |
| `--marija-purple-soft` | `#c084fc` | Hover/secondary |
| `--marija-lavender` | `#e9d5ff` | Soft accents |
| `--marija-gradient` | `linear-gradient(135deg, #a855f7, #c084fc)` | Accent gradient |
| `--marija-glow` | `0 0 20px rgba(168,85,247,0.3)` | Glow effects |

## Typography

### Fonts
- **Display**: Syne (Google Fonts, variable weight 400-800) — headlines, hero text, brand name
- **Body**: Inter (Google Fonts, variable weight 400-700) — body text, UI elements

### Scale
| Element | Size (mobile) | Size (desktop) | Weight | Font |
|---------|--------------|----------------|--------|------|
| Hero H1 | 2.5rem / 40px | 4.5rem / 72px | 800 | Syne |
| Section H2 | 2rem / 32px | 3rem / 48px | 700 | Syne |
| Card H3 | 1.25rem / 20px | 1.5rem / 24px | 600 | Syne |
| Body Large | 1.125rem / 18px | 1.25rem / 20px | 400 | Inter |
| Body | 1rem / 16px | 1rem / 16px | 400 | Inter |
| Body Small | 0.875rem / 14px | 0.875rem / 14px | 400 | Inter |
| Caption | 0.75rem / 12px | 0.75rem / 12px | 500 | Inter |

### Line Heights
- Headlines: 1.1
- Body: 1.6
- UI elements: 1.4

## Spacing
Base unit: 4px. Use Tailwind spacing scale.
- Section padding: `py-20 md:py-32` (80px / 128px)
- Container max-width: `max-w-7xl` (1280px) with `px-4 md:px-6`
- Card padding: `p-6 md:p-8`
- Element gap: `gap-4 md:gap-6`
- Section gap: `gap-16 md:gap-24`

## Breakpoints
| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |

Primary design targets: 375px (mobile), 768px (tablet), 1280px (desktop).

## Animations

### Rules
1. CSS animations first — GPU accelerated, no React re-renders
2. Framer Motion only where CSS can't achieve it cleanly
3. All animations respect `prefers-reduced-motion: reduce`
4. No animation should delay content readability
5. Max transition duration: 500ms for UI, 800ms for reveals

### Defined Animations
| Name | Type | Duration | Easing |
|------|------|----------|--------|
| `fade-in` | CSS | 500ms | ease-out |
| `slide-up` | CSS | 600ms | cubic-bezier(0.16, 1, 0.3, 1) |
| `scale-in` | CSS | 400ms | ease-out |
| `count-up` | JS | 2000ms | ease-out |
| `tilt-3d` | CSS hover | 300ms | ease-out |
| `pulse-subtle` | CSS | 2000ms | ease-in-out, infinite |
| `gradient-shift` | CSS | 8000ms | linear, infinite |
| `typewriter` | Framer Motion | per-word | spring |

### Glassmorphism (Navigation)
```css
backdrop-filter: blur(12px);
background: var(--glass-bg);
border-bottom: 1px solid var(--glass-border);
```

### 3D Card Tilt
- Max rotation: 5deg
- Perspective: 1000px
- Transition: 300ms ease-out
- Reset on mouse leave

## Border Radius
- Buttons: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Inputs: `rounded-lg` (8px)
- Tags/pills: `rounded-full`

## Shadows (Dark Mode)
- Card: `0 4px 24px rgba(0,0,0,0.3)`
- Card hover: `0 8px 32px rgba(0,0,0,0.4)`
- Button: none (use glow instead)
- Glass nav: `0 1px 0 rgba(255,255,255,0.05)`

## Theme Transition
- Property: `background-color, color, border-color, box-shadow`
- Duration: 300ms
- Easing: ease
- Applied via CSS `transition` on `html` element
