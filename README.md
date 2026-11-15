# UNILEATHER — Next.js 14

This is the Next.js App Router conversion of the supplied React/Vite landing page.

## Requirements
- Node.js 18.17+ (Node.js 20 LTS recommended)
- npm

## Run locally (Windows)
1. Extract this ZIP.
2. Open the extracted `unileather-nextjs` folder in VS Code.
3. Open Terminal in that folder and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Production build

```bash
npm run build
npm start
```

## Project structure
- `app/page.jsx` — interactive landing page
- `app/globals.css` — responsive styles
- `app/layout.jsx` — root layout and SEO metadata
- `public/images/` — local product and lifestyle images

## Store settings
In `app/page.jsx`, update:
- `WA_NUMBER` to your WhatsApp number (international format, no `+`)
- Instagram and YouTube URLs in `SOCIAL_LINKS`
- Product names and prices in the `products` array
- Delivery fee in the `delivery` calculation

The page includes product color filtering, favorites, image lightbox, cart quantity controls, order totals, WhatsApp checkout, responsive navigation, style guide, review carousel, and modal interactions.

## Important
This is a frontend demo. WhatsApp checkout opens a pre-filled message; it does not store orders in a database or process online payments. Replace sample customer reviews with verified reviews before publishing.
