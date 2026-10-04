# TRIPLE A STUDIO — Design • Print • Digital

Vanilla HTML/CSS/JS (no build step). Open `index.html` or drop the folder on Netlify.

## Edit without touching code — `data.js`
- Phone / WhatsApp / email: `phone`, `whatsapp` (digits only, intl. format), `email`  (currently placeholders)
- Prices: set `from: "300"` on any product or package (shows "From / Starting from 300 MAD"). Empty = "Custom quote"
- Portfolio: set `image: "assets/work/x.webp"` and `sample: false`; delete sample items you don't need
- Testimonials: add real ones to `testimonials: []` — the section stays hidden until then
- Default language: `language.default` ("ar" | "fr" | "en"). All texts live in `t`, `pillars`, `products`, `packages`…

## Files
index.html · style.css · script.js · data.js · 404.html
logo.webp / logo-sm.webp (optimized from logo.png) · favicon.png · apple-touch-icon.png · og-image.jpg
Original logo.svg / avatar-*.svg kept.

## Notes
- Contact form opens WhatsApp with the request pre-filled; "Or send by email" opens a pre-filled mailto. No backend needed.
- Fonts: Unbounded + IBM Plex Sans Arabic via Google Fonts (system fallbacks included).
