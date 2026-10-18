# Aditya Jadhav — Portfolio

Personal portfolio of Aditya Jadhav, Data Scientist (fraud & risk modelling). A single static page deployed on Vercel at <https://adityajadhav02.vercel.app/>.

## Stack
- `index.html`: all content and markup (one page, one `h1`, semantic sections). Content stays in the DOM on mobile (collapsed with CSS only), so it is fully indexable.
- `css/input.css`: Tailwind CSS v4 source with the design tokens (`@theme`) and component styles, compiled to `css/main.css` (minified, committed).
- `js/script.js`: progressive enhancement only (full-screen mobile menu, mobile collapsibles, scroll reveals). The site is readable with JS off.
- `fonts/`: self-hosted variable fonts, latin subset, `woff2`, `font-display: swap`:
  - Newsreader (serif, roman + italic) for display and headings
  - Instrument Sans (sans) for body and UI
- Vercel Web Analytics + Speed Insights (first-party `/_vercel/...` scripts, deferred). Enable both in the Vercel project dashboard.

## SEO files
| File | Purpose |
|---|---|
| `<head>` of `index.html` | title, meta description, canonical, robots, Open Graph, Twitter card, icons, JSON-LD (`Person`, `WebSite`, `ProfilePage`) |
| `robots.txt` | allows all crawlers and points to the sitemap |
| `sitemap.xml` | the single canonical URL; update `<lastmod>` when content changes |
| `og.png` | 1200×630 social share image |
| `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` (180×180) | browser and home-screen icons |
| `vercel.json` | cache headers: fonts are immutable for a year, icons/share image for a day; basic security headers |

Fonts are cached as `immutable`, so if you replace a font file, give it a new filename and update the references.

## Develop
```bash
npm install
npm run dev          # watch: rebuild css/main.css on change
npx serve -l 5173 .  # in a second terminal, then open http://localhost:5173
```

## Build
```bash
npm run build        # minified css/main.css
```
Run it after changing any Tailwind classes in `index.html` or `js/`, and commit `css/main.css` so the deployed site never depends on a build running on Vercel.

## Deploy
Push to the branch Vercel deploys from (production = `main`). Other branches get preview URLs. Preview deployments are served with `X-Robots-Tag: noindex` by Vercel, so only the production URL is indexed.

## After deploy (one-time SEO checklist)
1. **Google Search Console**: add a URL-prefix property for `https://adityajadhav02.vercel.app/` and verify it with the *HTML tag* method (add the `<meta name="google-site-verification" ...>` tag to the `<head>`, deploy, then click Verify) or by uploading the HTML verification file to the project root. Domain-property (DNS) verification is not possible on a `vercel.app` subdomain; it works only with a custom domain.
2. In Search Console, open **Sitemaps** and submit `sitemap.xml`.
3. Use **URL Inspection** on the home page and click **Request indexing**.
4. Check structured data with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
5. Check the share preview with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
6. Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL and watch Vercel Speed Insights field data.

## Principles
Project skills in `.claude/skills/` (`frontend-design`, `web-performance`, `subtle-motion`, `accessibility-seo`) document the standards the site is held to: fast (Lighthouse mobile ≥ 95), minimal, subtle motion with reduced-motion support, WCAG 2.2 AA, and Lighthouse SEO 100.
