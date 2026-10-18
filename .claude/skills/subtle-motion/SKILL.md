---
name: subtle-motion
description: Rules for subtle, performant animation on this portfolio — scroll reveals, hero entrance, hover/press feedback, menu transitions, count-ups — that feel smooth on laptops and phones and respect reduced-motion. Use when adding, tuning or reviewing any animation, transition, or micro-interaction.
---

# Subtle motion

Motion should confirm and guide, never perform. If someone notices the animation before the content, it's too much.

## Tokens (defined once in `css/input.css`)
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` — entrances, reveals.
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)` — panels moving in and out (mobile menu).
- Durations: **150–200 ms** hover/press/colour · **250–350 ms** menus/panels · **450–600 ms** reveals/entrances. Nothing over 700 ms.
- Distance: reveals travel **8–16 px**. No large slides, no scale > 1.03, no rotation.
- Stagger: **50–80 ms** per item, max ~4 steps (≤ 300 ms total). Large lists reveal as one block.

## Hard rules
1. Animate **only `opacity` and `transform`** (plus `color`/`background-color`/`border-color` for hovers). Never `width`, `height`, `top`, `margin`, `box-shadow` on scroll paths, and **never `transition: all`**.
2. **Content is visible without JS.** Hide-before-reveal styles are scoped to `.js .reveal` (the `js` class is added by a tiny inline head script).
3. **Hero entrance is CSS-only** (`@keyframes` with `animation-fill-mode: both`), short, and doesn't delay LCP meaningfully. The hero heading should be painted within the first ~200 ms.
4. **Every animation has a reduced-motion path**: inside `@media (prefers-reduced-motion: reduce)` disable reveals/keyframes, set `scroll-behavior: auto`, and JS checks `matchMedia('(prefers-reduced-motion: reduce)')` before running count-ups etc.
5. Hover effects only on hover-capable devices (`@media (hover: hover)`; Tailwind v4 `hover:` already does this). Touch gets `:active` feedback instead if needed.
6. Reveal once (`unobserve` after triggering); never re-animate on scroll back up.
7. Use `IntersectionObserver` with a small negative bottom `rootMargin` (~-10%) so items animate as they enter, not when they're half-way up.
8. No `will-change` sprinkled globally; only add it to an element right before a heavy animation, if profiling shows a need.
9. Number count-ups: the real final value lives in the HTML; JS animates from 0 only when motion is allowed. ≤ 1.2 s, ease-out.

## Good motion vocabulary for this site
- Section content: fade + 12px rise, 500 ms, `--ease-out`.
- Links/arrows: arrow nudges 2–4px on hover; underline grows from left via `transform: scaleX`.
- Buttons: colour change 150 ms; optional `active:scale-[0.98]`.
- Cards: border-colour shift; at most a 2px lift.
- Nav: shadow/border fades in once scrolled (toggle via IntersectionObserver sentinel).
- Mobile menu: panel fades/slides 300 ms; links stagger in 40–60 ms.

## Review checklist
- Any property animated outside the allowed list? Any `transition: all`?
- Disable JS → is everything visible?
- Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering) → is the page static and complete?
- DevTools Performance on 4× CPU throttle while scrolling: no long tasks, no layout thrash, 60 fps?
- Does anything feel slow on second visit? Shorten it.
