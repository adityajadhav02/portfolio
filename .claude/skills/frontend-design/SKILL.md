---
name: frontend-design
description: Visual design rules for this minimal, sleek personal portfolio — typography, color tokens, spacing, layout rhythm, content hierarchy, mobile-first behaviour. Use when designing, restyling, reviewing or adding any section, component, or copy on the site (e.g. "redesign the hero", "add a section", "does this look good", "review the design").
---

# Frontend design — minimal portfolio

Goal: a page that reads like a well-set document. Restraint over decoration; every element earns its place.

## Typography ("Editorial": serif display + sans body)
- Two self-hosted variable families (latin woff2 in `fonts/`, `font-display: swap`, metric-matched fallback faces in `css/input.css`):
  - **Newsreader** (`font-serif`): display and headings only — logo, h1 statement, h2/h3, big menu links, contact email. Weights **400** (default) and **500** (logo only). Italic only for the hero's accent phrase. Optical sizing is automatic (`opsz` axis).
  - **Instrument Sans** (`font-sans`, body default): body, UI, labels. Weights **400** body, **500** buttons/links/meta emphasis, **600** uppercase eyebrows only.
- Scale (mobile → desktop), not ad-hoc sizes: eyebrow 13px · meta 13–15px · body 16 → 17px (lead paragraphs up to 19px) · h3 24 → 30px serif · h2 32 → 48px serif (`.h2-serif`) · hero statement 40 → 76px serif · contact "Let's talk." 40 → 88px.
- Body line-length ≤ ~65ch (`max-w-[640px]`). Line-height 1.6–1.65 for body, 1.04–1.15 for serif display.
- Negative tracking (-0.01 to -0.03em) on serif display only; 0.08em tracking only on 13px uppercase eyebrows.
- Use `tabular-nums` for numbers that sit in rows/columns. Arrows/pins come from the inline icon sprite, not ↗/→ glyphs (not in the font subsets).
- Keyword hints in long text: `<strong class="hl">` (soft teal marker stroke) on one key phrase per paragraph or role at most — the user found more than that overdone. No coloured/bold metrics; numbers stay plain body text. Never in headings or on the dark contact block.
- Reuse the shared component classes listed at the top of the components layer in `css/input.css` (`.wrap`, `.eyebrow`, `.h2-serif`, `.btn*`, `.pin`, `.reveal`, collapsible toggles) before inventing new ones.

## Color
- Tokens only, defined once in `css/input.css` `@theme` (use as `bg-*`, `text-*`, `border-*`):
  - Surfaces: `paper` #F7F5F0 (page) · `paper-2` #FBFAF7 (alternate section) · `card` #EFEBE2 (featured card)
  - Text: `ink` #1C1B19 (headings, dark block bg) · `body` #46433E (body copy) · `muted` #5E5A53 (meta; ≥ 4.5:1 on paper and card)
  - `accent` #1F5F5B deep teal: eyebrows, location lines, hero italic, hovers
  - Rules: `line` #E2DED5 (hairlines) · `line-strong` #CFCAC0 (button borders, aside rule)
  - On the ink block: `on-ink` #F7F5F0 · `on-ink-2` #BDB8AE · `on-ink-3` #9A958B · `ink-line` #3A3833 (rules) · `ink-underline` #6E6A62
- **Contrast**: ≥ 4.5:1 for text < 24px, ≥ 3:1 for large text and icons that convey meaning. Check every text/bg pair, including on the ink block (accent is too dark for text or focus rings there; use `on-ink*`, and `.surface-ink` gives a paper focus ring).
- Accent is for emphasis and interaction, not decoration. If more than ~5% of the viewport is accent, it's too much.
- Exactly one dark block: Contact + footer. Don't add more.

## Spacing & layout
- 4px base grid (Tailwind default). Container `.wrap`: max 1200px, 24px gutters → 48px at `lg`. Section padding ≈ `py-12 md:py-20 lg:py-28`; prose ≤ 640px wide inside the container.
- Vary section layout — don't repeat "eyebrow + h2 + content" identically. Alternate two-column splits (label left, content right), date-column lists, grids and the single featured card.
- Separate with whitespace and hairlines (`border-line`, or a `border-ink` top rule to start a list/grid) before reaching for cards/backgrounds. No shadows.
- Border-radius: only `rounded-full` (buttons, pills, round toggles, dots) and 16–20px (`rounded-2xl` / `rounded-[20px]`) for the featured card. Nothing else.

## Content hierarchy (portfolio specific)
- Hero answers in < 5 seconds: **who**, **what you do**, **proof / why care**, **one primary CTA**. No filler ("Hello, I'm", "Designed with care").
- No KPI/metric cards. Numbers live inside prose and bullets. The hero has no status line and no name label (the user removed both): just the statement h1, the lede (with "Data scientist" highlighted) and CTAs. Never job-seeking language anywhere.
- **State each number once**, in the place where it has the most context. Repeated stats dilute credibility; inconsistent stats (300K vs 500K) raise questions — label what each measures.
- Lead with outcomes (impact, scale) over task lists. Bullets ≤ 2 lines each, max 3–4 per role.
- Projects: one featured case study > many thin cards. Each card: what it is, stack, link.

## Mobile-first
- Design at 360–390px first, then enhance. No horizontal scroll at 320px.
- Touch targets ≥ 44×44px (icon links need padding, not just a 24px glyph).
- Full-height sections use `min-h-svh` / `100dvh`, never `100vh` (iOS address bar jump).
- Hover-only affordances must also be understandable without hover. Wrap hover styles so they only apply on `(hover: hover)` devices (Tailwind v4 does this by default for `hover:`).

## Review checklist
1. Weights/sizes used are from the scale above?
2. Every text colour pair passes contrast?
3. Any stat, link or sentence duplicated?
4. Do adjacent sections look structurally different?
5. Works and looks intentional at 375px and 1440px?
6. Any element that could be removed without loss? Remove it.
