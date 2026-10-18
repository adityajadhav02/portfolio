---
name: accessibility-seo
description: Accessibility (WCAG 2.2 AA) and SEO/social-sharing rules for this portfolio — semantics, headings, keyboard and screen-reader support, the mobile menu, contrast, meta/Open Graph tags, structured data. Use when editing HTML structure, navigation, links, metadata, or when auditing a11y/SEO/Lighthouse scores.
---

# Accessibility & SEO

## Semantics
- Landmarks: one `<header>` (contains `<nav aria-label="Primary">`), one `<main>`, one `<footer>`. Sections are `<section id aria-labelledby>`.
- Exactly one `h1`. Headings never skip levels (h2 → h3, not h2 → h4). Use headings for structure, not for size.
- Lists of things are `<ul>/<ol>`; dates in timelines can use `<time>`.
- Decorative icons: `aria-hidden="true"` and `focusable="false"` on SVG. Icon-only links need `aria-label`.

## Keyboard & focus
- Everything interactive is a real `<a href>` or `<button type="button">`. No `onclick` on divs, no inline `onclick` attributes.
- Visible `:focus-visible` style on all interactive elements (2px accent outline, offset).
- Optional "Skip to content" link as the first focusable element.

## Mobile menu pattern
- Toggle button: `aria-expanded="false|true"`, `aria-controls="site-menu"`, `aria-label="Open menu"`. The full-screen overlay (`role="dialog" aria-modal="true"`) has its own "Close menu" button.
- When closed the panel is **`inert`** (and/or `visibility:hidden`) so its links are not tabbable or read by screen readers.
- When open: move focus to the first link (or close button); `Esc` closes; clicking a link closes; on close return focus to the toggle; lock body scroll.

## Contrast & sizing
- Text ≥ 4.5:1 (≥ 3:1 for ≥ 24px or 18.66px bold). Check `muted` / `on-ink-3` greys and accent-on-dark specifically.
- Tap targets ≥ 44×44 px (WCAG 2.5.8 minimum 24px; aim 44).
- Respect user zoom: never `maximum-scale=1` / `user-scalable=no`.

## Links
- External links with `target="_blank"` get `rel="noopener noreferrer"`.
- Link text describes destination ("Resume (PDF)", "View code on GitHub") — via visible text or `aria-label`.

## SEO / sharing (in `<head>`)
- `<title>` ≤ 60 chars, `meta description` 120–160 chars, `<link rel="canonical">`.
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, **`og:image` (1200×630, absolute URL)**, `og:image:alt`.
- Twitter: use `name="twitter:*"` (not `property`); `twitter:card=summary_large_image` only if an image exists.
- `meta name="theme-color"`, favicon + `apple-touch-icon` (180×180).
- JSON-LD `Person` (`name`, `jobTitle`, `url`, `sameAs` [LinkedIn, GitHub], `email`, `alumniOf`).
- Skip `meta keywords` (ignored by search engines).

## Audit checklist
1. Lighthouse Accessibility = 100 and SEO = 100.
2. Tab through the whole page at desktop and 375px: focus always visible, order logical, no hidden-but-focusable elements.
3. Open/close mobile menu with keyboard only; Esc works; focus returns.
4. Screen reader (NVDA/VoiceOver) heading list reads as a sensible outline.
5. Share URL in a link-preview debugger (LinkedIn Post Inspector) → title, description, image correct.
