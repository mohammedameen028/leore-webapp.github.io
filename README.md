# LEORE — Interactive Website

Built from your Stitch design (`DESIGN.md` tokens + `code.html` mockup). The
storefront now runs as a React app powered by Vite while keeping the existing
assets and visual system.

## What's inside

```
leore/
├── index.html        Vite entry point for the React app
├── src/App.jsx       React storefront, shared overlays, cart and page views
├── src/data/products.json Product catalog and image configuration
├── css/style.css     Custom styles layered on top of Tailwind (drawer, modal, toasts…)
└── package.json      Vite scripts and React dependencies
```

## Running it

Install dependencies and start the Vite development server:

```
npm install
npm run dev
```

Then visit the URL printed by Vite, usually `http://localhost:5173`.

Create a production build with `npm run build`. The generated `dist/` folder
can be deployed to GitHub Pages or another static host.

## What's interactive

- **Shopping bag** — add to bag from the hero product or any product card,
  adjust quantity, remove items. Persists across the home and collections views
  via `localStorage`, with a live count badge in the nav.
- **Quick View modal** — opens for any product, size selection required
  before adding to bag.
- **Collections filtering & sorting** — category tabs (All and Hoodies) and a
  price sort, both live-rendered from `products.json`. Bento tiles on the home page deep-link into pre-filtered
  views (e.g. `/?page=shop&category=Outerwear`).
- **Live search** — full-screen overlay, filters the catalog as you type,
  click a result to jump straight into its quick view.
- **Mobile nav drawer**, **scroll-triggered reveals**, a **scroll progress
  bar** in the brand's muted gold (per `DESIGN.md`'s "Interactive Progress"
  spec), and a **newsletter form** with inline validation.
- **Checkout** is a labeled demo action — no payment is processed, since
  there's no backend. Wire it up to Stripe/Shopify/etc. when you're ready.

## Editing products

Everything in the shop — home page imagery, the shop grid, quick view, and
search — reads from `src/data/products.json`. Add, remove, or
edit a product there and it updates everywhere automatically.

Product images live together in `assets/products/` and use the matching product
slug, such as `assets/products/signature-hoodie.jpg`. Change the `image` field
in the JSON when replacing product photography; homepage product images use the
same catalog automatically.

## Design system reference

Full tokens (colors, type scale, spacing, elevation, shape) are documented
in the original `DESIGN.md` you exported from Stitch — kept in this repo's
history for reference. In short: near-black surfaces, off-white type, muted
gold reserved for CTAs and status, zero border-radius throughout, Sora for
display type, Hanken Grotesk for body, JetBrains Mono for labels/prices.
