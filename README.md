# LEORE — Interactive Website

Built from your Stitch design (`DESIGN.md` tokens + `code.html` mockup). No
build step, no dependencies to install — it's plain HTML/CSS/JS, so you can
open it locally or drop it straight onto any static host.

## What's inside

```
leore/
├── index.html      Home landing page (hero, signature product, collections, newsletter)
├── shop.html        Full collections page — filterable, sortable product grid
├── css/style.css     Custom styles layered on top of Tailwind (drawer, modal, toasts…)
├── js/products.js    Product catalog — one place to edit names, prices, images, sizes
└── js/main.js        All interactivity (cart, quick view, search, nav, filters)
```

## Running it

No server required — just open `index.html` in a browser. If your browser
blocks local scripts from loading, run a tiny local server instead:

```
cd leore
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## What's interactive

- **Shopping bag** — add to bag from the hero product or any product card,
  adjust quantity, remove items. Persists across `index.html` ↔ `shop.html`
  via `localStorage`, with a live count badge in the nav.
- **Quick View modal** — opens for any product, size selection required
  before adding to bag.
- **Shop page filtering & sorting** — category tabs (Hoodies, Outerwear,
  Pants, Knitwear, Accessories) and a price sort, both live-rendered from
  `products.js`. Bento tiles on the home page deep-link into pre-filtered
  views (e.g. `shop.html?category=Outerwear`).
- **Live search** — full-screen overlay, filters the catalog as you type,
  click a result to jump straight into its quick view.
- **Mobile nav drawer**, **scroll-triggered reveals**, a **scroll progress
  bar** in the brand's muted gold (per `DESIGN.md`'s "Interactive Progress"
  spec), and a **newsletter form** with inline validation.
- **Checkout** is a labeled demo action — no payment is processed, since
  there's no backend. Wire it up to Stripe/Shopify/etc. when you're ready.

## Editing products

Everything in the shop — home page bento links, the shop grid, quick view,
and search — reads from a single array in `js/products.js`. Add, remove, or
edit a product there and it updates everywhere automatically.

## One thing worth knowing

The product photography currently hotlinks the placeholder images Stitch
generated (`lh3.googleusercontent.com` URLs). They're working now, but
they're not guaranteed to stay available long-term since they're not files
you own. Swap them for your own photography by changing the `img` field in
`js/products.js` and the equivalent `<img>` tags in `index.html` — no other
code needs to change.

## Design system reference

Full tokens (colors, type scale, spacing, elevation, shape) are documented
in the original `DESIGN.md` you exported from Stitch — kept in this repo's
history for reference. In short: near-black surfaces, off-white type, muted
gold reserved for CTAs and status, zero border-radius throughout, Sora for
display type, Hanken Grotesk for body, JetBrains Mono for labels/prices.
