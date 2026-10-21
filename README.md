# Titan Maritime Ventures (Hellas) — website

A fully static rebuild of [tmvhellas.com](https://tmvhellas.com/) in plain HTML, CSS and a few lines of dependency-free JavaScript. No WordPress, no PHP, no database: the whole site can be served from any static host (GitHub Pages, Netlify, Cloudflare Pages, S3, nginx).

## Pages

| File | Content |
| --- | --- |
| `index.html` | Home: hero, who we are, services, segments, why Titan, stats, partners |
| `about.html` | Company: about, mission, vision, values, history timeline (1902 → 2021) |
| `services.html` | Six services with scope lists; each has an anchor (`#project-development`, `#sale-purchase`, `#technical-crew`, `#bunkering`, `#commercial`, `#consultancy`) |
| `partners.html` | Columbia Ship Management and Baseblue partnerships |
| `leadership.html` | Executive team |
| `contact.html` | Contact details, map and enquiry form |

## Structure

```
assets/      logo.svg, logo-mark.svg, favicon.svg
css/style.css   design system: colour tokens, type scale, components
js/main.js      header state, mobile nav, scroll reveal, counters, contact form
*.html          the pages (header and footer are repeated in each file)
```

## Brand

- **Logo**: a geometric tanker profile above two wave strokes, a modern reshape of the original ship-and-waves mark. The mark uses `currentColor` for the hull so it works on dark and light backgrounds.
- **Colours**: navy `#0B1F3A` / `#07162B`, ocean `#1557A8`, teal `#21B6C7`, brass `#C9A961`, sand `#F5F2EC`.
- **Type**: [Fraunces](https://fonts.google.com/specimen/Fraunces) for display headings, [Manrope](https://fonts.google.com/specimen/Manrope) for text (loaded from Google Fonts).

## Running locally

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8787
```

then visit <http://127.0.0.1:8787/>.

## Contact form

The form has no backend. On submit it opens the visitor's mail client with a pre-filled message to `info@tmvhellas.com`. To collect submissions instead, add an `action` attribute pointing at a form endpoint (for example Formspree or Netlify Forms); `js/main.js` skips the mailto fallback when `action` is set.

## Editing the shared header/footer

The header and footer markup is identical in every page. When you change it, apply the same change to all six HTML files (search for `<header class="header">` and `<footer class="footer">`).

## Deploying to GitHub Pages

Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`. No build step is required.
