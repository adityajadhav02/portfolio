---
name: web-performance
description: Performance budget and rules for this static portfolio site (Core Web Vitals, CSS/JS/font/icon loading, third-party scripts). Use when adding dependencies, scripts, fonts, icons, images or analytics; when the user says the site is slow; or when reviewing/auditing load speed, Lighthouse or PageSpeed scores.
---

# Web performance — static portfolio

The site is a single static `index.html` + one CSS + one small JS file served from Vercel. Keep it that way.

## Budgets (mobile, slow 4G, mid-range phone)
| Metric | Target |
|---|---|
| LCP | < 1.8 s |
| CLS | < 0.05 |
| INP / TBT | < 100 ms / < 50 ms |
| Render-blocking requests | CSS file + preloaded font only |
| Total transferred (first load) | < 150 KB |
| Lighthouse Performance (mobile) | ≥ 95 |

## Rules
**CSS**
- Never ship a runtime CSS framework (e.g. `cdn.tailwindcss.com`). Tailwind is compiled with the CLI: `npm run build` → `css/main.css` (minified, only used classes). Run it after any class change in `index.html`.
- One stylesheet, no `@import` chains.

**Fonts**
- Self-host a single variable `woff2` (latin subset) in `fonts/`, `<link rel="preload" as="font" type="font/woff2" crossorigin>`, `font-display: swap`.
- No Google Fonts `<link>` (extra DNS + CSS hop on the critical path).
- Provide a system-font fallback stack so swap causes minimal shift.

**Icons & images**
- Inline SVG icons (`aria-hidden="true"`, `fill/stroke="currentColor"`, explicit `width`/`height`). No icon-font CDNs or icon scripts.
- Images: modern format (AVIF/WebP), explicit `width`/`height`, `loading="lazy"` + `decoding="async"` below the fold, never lazy-load the LCP image.

**JavaScript**
- Site must be fully readable with JS disabled. JS is progressive enhancement only.
- Scripts at the end of `<body>` or with `defer`. No `async` blocking work at startup.
- Never hide the LCP element (hero heading) behind a JS-triggered class. Hero entrance animations are CSS-only.
- Scroll work goes through `IntersectionObserver`, not `scroll` listeners. If a scroll listener is unavoidable: `{ passive: true }` and rAF-throttle.
- No dependencies for things the platform does: smooth scroll (`scroll-behavior` + `scroll-padding-top`), lazy loading, etc.

**Third parties**
- Each third-party script must justify itself. Prefer first-party Vercel Analytics + Speed Insights (deferred, same origin) over adding GA/GTM/Hotjar.
- Never load a third-party script in `<head>` without `defer`/`async`.

## Audit procedure
1. `npm run build` then `npx serve -l 5173 .`
2. Chrome DevTools → Lighthouse → Mobile → Performance, Accessibility, Best Practices, SEO.
3. Network panel (disable cache, Slow 4G): confirm no requests to `cdn.tailwindcss.com`, `unpkg.com`, `fonts.googleapis.com`; count render-blocking requests.
4. Performance panel: check LCP element is the hero `h1` and is painted on first frame (no opacity:0 waiting for JS).
5. After deploy, verify with PageSpeed Insights on the real URL and Vercel Speed Insights field data.
