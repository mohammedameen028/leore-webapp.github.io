import { useEffect, useMemo, useState } from "react";
import catalog from "./data/products.json";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
const PRODUCTS = catalog.products.map(({ image, imageAlt, details, ...product }) => ({ ...product, img: image, imgAlt: imageAlt, detail: details }));
const getProduct = (id) => PRODUCTS.find((product) => product.id === id);
const imageFor = (id) => `/${getProduct(id).img}`;
const categories = ["All", "Hoodies"];
const featuredProduct = PRODUCTS.find((product) => product.id === "signature-hoodie");

function Header({ cartCount, openPanel }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 bg-background/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center">
        <div className="flex items-center gap-12">
          <a className="text-headline-md font-headline font-bold tracking-tighter text-on-background" href="/">LEORÉ</a>
          <div className="hidden md:flex gap-8">
            <a className="text-label-caps font-label text-on-surface-variant hover:text-primary transition-colors" href="/shop">Collections</a>
            <a className="text-label-caps font-label text-on-surface-variant hover:text-primary transition-colors" href="/#lookbook">Lookbook</a>
            <a className="text-label-caps font-label text-on-surface-variant hover:text-primary transition-colors" href="/#journal">Journal</a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => openPanel("search")} className="flex items-center text-on-background hover:text-tertiary transition-colors" aria-label="Search products"><span className="material-symbols-outlined">search</span></button>
          <button type="button" onClick={() => openPanel("cart")} className="flex items-center text-on-background hover:text-tertiary transition-colors relative" aria-label="Open bag">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className={`absolute -top-1 -right-1 text-[10px] bg-tertiary text-background rounded-full w-4 h-4 flex items-center justify-center font-bold ${cartCount ? "" : "opacity-0"}`}>{cartCount}</span>
          </button>
          <button type="button" onClick={() => openPanel("mobile")} className="md:hidden flex items-center text-on-background" aria-label="Open menu"><span className="material-symbols-outlined">menu</span></button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div><span className="text-headline-lg font-headline font-black tracking-tighter text-on-surface block mb-6">LEORÉ</span><p className="text-on-surface-variant max-w-sm">Premium streetwear with architectural precision, composed for modern city life.</p></div>
          <FooterColumn title="Support" links={["Shipping", "Returns", "Contact", "FAQ"]} />
          <FooterColumn title="Connect" links={["Instagram", "TikTok", "Privacy", "Terms"]} />
        </div>
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4"><span className="text-label-caps font-label text-on-surface-variant">© 2026 LEORÉ. ALL RIGHTS RESERVED.</span><div className="flex gap-8"><span className="text-label-caps font-label text-on-surface-variant">EST. 2026</span><span className="text-label-caps font-label text-on-surface-variant">INDIA</span></div></div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return <div><h4 className="text-label-caps font-label mb-6 uppercase tracking-widest text-on-surface">{title}</h4><ul className="space-y-4 text-on-surface-variant">{links.map((link) => <li key={link}><a className="hover:text-tertiary transition-colors" href="#">{link}</a></li>)}</ul></div>;
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const submit = (event) => { event.preventDefault(); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) setSubmitted(true); };
  return <section className="py-20 md:py-28 border-t border-outline-variant/30 bg-surface-container-lowest"><div className="max-w-3xl mx-auto text-center px-margin-mobile"><p className="text-label-caps font-label uppercase text-tertiary mb-3">Private Access</p><h2 className="font-headline text-headline-lg uppercase mb-6 tracking-tighter">Join the LEORÉ Collective</h2><p className="font-body-md text-on-surface-variant mb-10">Get early access to limited drops, sizing restocks, and editorial releases.</p>{submitted ? <p className="font-body-lg text-on-background fade-in">You're on the list. Watch your inbox for early access.</p> : <form onSubmit={submit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="you@example.com" className="flex-1 bg-background border border-outline-variant text-on-background px-6 py-4 focus:border-tertiary" /><button type="submit" className="px-8 py-4 bg-on-background text-background font-button text-button uppercase tracking-widest hover:bg-tertiary transition-colors">Subscribe</button></form>}</div></section>;
}

function ProductCard({ product, openQuickView }) {
  return <article className="product-card"><div className="media"><img src={`/${product.img}`} alt={product.imgAlt} loading="lazy" />{!product.inStock && <span className="absolute top-3 left-3 z-10 text-label-caps font-label uppercase bg-surface-container-lowest border border-outline-variant px-2 py-1">Sold Out</span>}<div className="quick-add p-3"><button type="button" onClick={() => openQuickView(product.id)} className="w-full py-3 bg-on-background text-background font-button text-button uppercase tracking-widest hover:bg-tertiary transition-colors">{product.inStock ? "Quick View" : "Notify Me"}</button></div></div><button type="button" onClick={() => openQuickView(product.id)} className="text-left mt-4"><h3 className="font-headline text-[17px] text-on-background uppercase">{product.name}</h3><div className="flex justify-between items-center mt-2"><span className="text-label-caps font-label text-on-surface-variant uppercase">{product.category}</span><span className="text-label-caps font-label text-on-background">{money.format(product.price)}</span></div></button></article>;
}

function Home({ openQuickView }) {
  return <>
    <main>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"><div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch"><div className="md:col-span-7 relative min-h-[520px] md:min-h-[680px] border border-outline-variant/30 overflow-hidden"><img className="absolute inset-0 w-full h-full object-cover" src={`/${catalog.heroImage}`} alt="Model in minimalist outerwear shot against concrete architecture" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-2xl"><p className="text-label-caps font-label uppercase text-tertiary mb-4">Autumn / Winter 2026</p><h1 className="font-headline text-display-lg-mobile md:text-display-lg uppercase tracking-tighter leading-[0.9] mb-6">Engineered<br />Elegance</h1><p className="text-body-lg text-on-surface-variant mb-8">LEORÉ designs structural silhouettes with tactile fabrics and deliberate restraint for the modern city uniform.</p><div className="flex flex-col sm:flex-row gap-4"><a href="/shop" className="px-8 py-4 bg-on-background text-background font-button text-button uppercase tracking-widest hover:bg-tertiary transition-colors text-center">Shop Collection</a><a href="#lookbook" className="px-8 py-4 border border-on-background/60 text-on-background font-button text-button uppercase tracking-widest hover:bg-on-background/10 transition-colors text-center">View Lookbook</a></div></div></div><div className="md:col-span-5 grid grid-rows-2 gap-6 md:gap-8"><div className="relative border border-outline-variant/30 overflow-hidden min-h-[220px] group"><img className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" src={imageFor(featuredProduct.id)} alt={featuredProduct.imgAlt} /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><div className="absolute bottom-0 left-0 p-5 md:p-6"><p className="text-label-caps font-label uppercase text-tertiary mb-2">{featuredProduct.tag}</p><p className="text-on-background font-headline text-[20px] uppercase tracking-tight">{featuredProduct.name}</p></div></div><article className="border border-outline-variant/30 bg-gradient-to-br from-surface-container-low to-surface-container-lowest p-6 md:p-8 flex flex-col justify-between"><div><p className="text-label-caps font-label uppercase text-on-surface-variant mb-4">Featured Piece</p><h2 className="font-headline text-headline-lg uppercase tracking-tight mb-4">{featuredProduct.name}</h2><p className="text-on-surface-variant leading-relaxed mb-7">{featuredProduct.detail}</p><div className="grid grid-cols-2 gap-3 mb-8"><div className="border border-outline-variant/40 px-4 py-3"><p className="text-label-caps font-label uppercase text-on-surface-variant mb-1">Fabric</p><p className="text-sm text-on-surface">Organic Fleece</p></div><div className="border border-outline-variant/40 px-4 py-3"><p className="text-label-caps font-label uppercase text-on-surface-variant mb-1">Weight</p><p className="text-sm text-on-surface">500 GSM</p></div></div></div><div className="flex items-center justify-between gap-4"><span className="text-label-caps font-label uppercase text-tertiary">{money.format(featuredProduct.price)}</span><button type="button" onClick={() => openQuickView(featuredProduct.id)} className="px-5 py-3 border border-outline text-label-caps font-label uppercase hover:border-tertiary hover:text-tertiary transition-colors">Quick View</button></div></article></div></div><div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-8">{[["Drop", "08"], ["Crafted", "In India"], ["Batch Size", "Limited"], ["Materials", "Premium"]].map(([label, value]) => <div key={label} className="border border-outline-variant/30 bg-surface-container-low p-5"><p className="text-label-caps font-label text-on-surface-variant mb-2 uppercase">{label}</p><p className="font-headline text-headline-md">{value}</p></div>)}</div></section>
      <section id="lookbook" className="py-20 md:py-28 border-y border-outline-variant/30 bg-surface-container-lowest"><div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"><div className="flex items-end justify-between mb-10 md:mb-14"><div><p className="text-label-caps font-label uppercase text-tertiary mb-2">Lookbook</p><h2 className="font-headline text-headline-lg uppercase tracking-tight">Built for movement</h2></div><a href="/shop" className="hidden md:inline-block text-label-caps font-label uppercase border-b border-on-surface hover:text-tertiary hover:border-tertiary transition-colors">Shop All</a></div><div className="grid grid-cols-1 md:grid-cols-12 gap-6"><a href="/shop?category=Outerwear" className="md:col-span-5 border border-outline-variant/30 overflow-hidden group block min-h-[380px] md:min-h-[520px]"><img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imageFor("trench-coat")} alt="Outerwear editorial shot" /></a><div className="md:col-span-7 grid grid-cols-2 gap-6"><a href="/shop?category=Knitwear" className="border border-outline-variant/30 overflow-hidden group block min-h-[250px]"><img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imageFor("mockneck-knit")} alt="Knitwear portrait" /></a><a href="/shop?category=Accessories" className="border border-outline-variant/30 overflow-hidden group block min-h-[250px]"><img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imageFor("crossbody-set")} alt="Accessories flat lay" /></a><a href="/shop?category=Pants" className="col-span-2 border border-outline-variant/30 bg-surface-container-low p-8 md:p-10 flex flex-col justify-between min-h-[250px]"><div><p className="text-label-caps font-label uppercase text-on-surface-variant mb-3">Editorial Note</p><h3 className="font-headline text-headline-md uppercase mb-4">Tailored utility, softened edges</h3><p className="text-on-surface-variant">Every LEORÉ silhouette balances proportion, function, and texture so the garment stays expressive from day to night.</p></div><span className="text-label-caps font-label uppercase text-tertiary">Explore category →</span></a></div></div></div></section>
      <section id="journal" className="py-20 md:py-28"><div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center"><div className="md:col-span-5"><p className="text-label-caps font-label uppercase text-tertiary mb-3">Brand Ethos</p><h2 className="font-headline text-headline-lg uppercase tracking-tight mb-6">Quiet confidence over loud trends</h2><p className="text-on-surface-variant mb-8 leading-relaxed">LEORÉ is designed as a modular wardrobe. Neutral palettes, dense fabrics, and architectural pattern cutting let each piece transition across settings.</p><a href="/shop" className="inline-block px-8 py-4 border border-outline font-button text-button uppercase tracking-widest hover:border-tertiary hover:text-tertiary transition-colors">Enter The Archive</a></div><div className="md:col-span-7 grid grid-cols-2 gap-6"><div className="border border-outline-variant/30 overflow-hidden min-h-[240px]"><img className="w-full h-full object-cover" src={imageFor("boxy-pullover")} alt="Boxy pullover detail" /></div><div className="border border-outline-variant/30 overflow-hidden min-h-[240px]"><img className="w-full h-full object-cover" src={imageFor("cargo-pants")} alt="Cargo pants detail" /></div></div></div></section>
    </main><Newsletter />
  </>;
}

function Shop({ openQuickView }) {
  const params = new URLSearchParams(window.location.search);
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("featured");
  const products = useMemo(() => { const result = category === "All" ? [...PRODUCTS] : PRODUCTS.filter((product) => product.category === category); if (sort === "price-asc") result.sort((a, b) => a.price - b.price); if (sort === "price-desc") result.sort((a, b) => b.price - a.price); return result; }, [category, sort]);
  return <main className="pt-20"><section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-16 pb-10 border-b border-outline-variant/30"><span className="text-label-caps font-label text-tertiary mb-3 block uppercase">Full Range</span><h1 className="font-headline text-headline-lg md:text-display-lg-mobile text-on-background uppercase tracking-tight">Collections</h1></section><section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8 border-b border-outline-variant/30 flex flex-col md:flex-row gap-6 md:items-center md:justify-between"><div className="flex gap-8 overflow-x-auto" role="tablist" aria-label="Filter by category">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`filter-tab ${category === item ? "active" : ""}`} aria-selected={category === item}>{item}</button>)}</div><div className="flex items-center gap-4"><span className="text-label-caps font-label text-on-surface-variant uppercase">{products.length} {products.length === 1 ? "item" : "items"}</span><label className="sr-only" htmlFor="sort-select">Sort products</label><select id="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} className="bg-transparent border border-outline-variant text-label-caps font-label uppercase py-2 px-3 text-on-background focus:ring-0 focus:border-primary"><option value="featured">Featured</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select></div></section><section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-section-gap"><div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">{products.map((product) => <ProductCard key={product.id} product={product} openQuickView={openQuickView} />)}</div></section><Newsletter /></main>;
}

function SearchOverlay({ openQuickView, close }) {
  const [query, setQuery] = useState("");
  const matches = query.trim() ? PRODUCTS.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())) : [];
  return <div id="search-overlay" className="open" role="dialog" aria-modal="true" aria-label="Search"><div className="max-w-3xl mx-auto px-margin-mobile pt-24 md:pt-32"><div className="flex justify-between items-center mb-10"><span className="text-label-caps font-label text-on-surface-variant uppercase">Search</span><button type="button" onClick={close} aria-label="Close search" className="text-on-background"><span className="material-symbols-outlined">close</span></button></div><div className="flex items-center border-b border-outline-variant pb-4 mb-8"><span className="material-symbols-outlined text-on-surface-variant mr-4">search</span><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="SEARCH PRODUCTS, CATEGORIES..." className="text-headline-md font-headline uppercase" /></div>{query && !matches.length ? <p className="text-on-surface-variant py-8">No results for “{query}”.</p> : matches.map((product) => <button type="button" key={product.id} onClick={() => { close(); openQuickView(product.id); }} className="search-result-row w-full text-left"><img src={`/${product.img}`} alt={product.imgAlt} /><span className="flex-grow"><span className="block font-headline text-[16px] text-on-background">{product.name}</span><span className="block text-label-caps font-label text-on-surface-variant uppercase mt-1">{product.category}</span></span><span className="text-label-caps font-label">{money.format(product.price)}</span></button>)}</div></div>;
}

function CartDrawer({ cart, updateQuantity, removeLine, close, checkout }) {
  const subtotal = cart.reduce((total, line) => { const product = getProduct(line.id); return total + (product ? product.price * line.qty : 0); }, 0);
  return <div id="cart-drawer" className="open" role="dialog" aria-modal="true" aria-label="Shopping bag"><div className="flex justify-between items-center h-20 px-8 border-b border-outline-variant/30 flex-shrink-0"><span className="text-label-caps font-label uppercase text-on-background">Your Bag</span><button type="button" onClick={close} aria-label="Close bag" className="text-on-background"><span className="material-symbols-outlined">close</span></button></div><div className="flex-grow overflow-y-auto px-8">{!cart.length ? <p className="text-on-surface-variant font-body-md py-12">Your bag is empty. <a href="/shop" className="underline hover:text-tertiary">Browse collections →</a></p> : cart.map((line, index) => { const product = getProduct(line.id); return product && <div className="cart-line" key={`${line.id}-${line.size}`}><img src={`/${product.img}`} alt={product.imgAlt} /><div className="flex flex-col justify-between"><div><p className="font-headline text-[15px] leading-tight text-on-background">{product.name}</p><p className="text-label-caps font-label text-on-surface-variant uppercase mt-1">Size {line.size}</p></div><div className="qty-stepper" role="group" aria-label={`Quantity for ${product.name}`}><button type="button" onClick={() => updateQuantity(index, -1)} aria-label="Decrease quantity">-</button><span>{line.qty}</span><button type="button" onClick={() => updateQuantity(index, 1)} aria-label="Increase quantity">+</button></div></div><div className="flex flex-col items-end justify-between"><button type="button" onClick={() => removeLine(index)} aria-label={`Remove ${product.name}`} className="text-on-surface-variant hover:text-tertiary"><span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span></button><span className="text-label-caps font-label">{money.format(product.price * line.qty)}</span></div></div>; })}</div><div className="px-8 py-8 border-t border-outline-variant/30 flex-shrink-0"><div className="flex justify-between items-center mb-6"><span className="text-label-caps font-label uppercase text-on-surface-variant">Subtotal</span><span className="text-headline-md font-headline text-on-background">{money.format(subtotal)}</span></div><button type="button" onClick={checkout} className="w-full py-5 bg-on-background text-background font-button text-button uppercase tracking-widest shadow-block hover:translate-x-1 hover:translate-y-1 transition-transform">Checkout</button><p className="text-label-caps font-label text-on-surface-variant/60 mt-4 text-center">Demo store - no payment is processed</p></div></div>;
}

function QuickView({ product, close, addToCart }) {
  const [size, setSize] = useState("");
  const [warning, setWarning] = useState(false);
  if (!product) return null;
  const add = () => { if (!size) { setWarning(true); return; } addToCart(product.id, size); close(); };
  return <div id="quickview-modal" className="open" role="dialog" aria-modal="true" aria-label="Product quick view"><div onClick={close} className="absolute inset-0" /><div id="quickview-panel" className="relative"><div className="grid grid-cols-1 md:grid-cols-2"><div className="aspect-[4/5] md:aspect-auto bg-surface-container-low overflow-hidden"><img src={`/${product.img}`} alt={product.imgAlt} className="w-full h-full object-cover" /></div><div className="p-8 md:p-10 flex flex-col"><div className="flex justify-between items-start mb-6"><span className="text-label-caps font-label text-tertiary uppercase">{product.tag}</span><button type="button" onClick={close} aria-label="Close quick view" className="text-on-surface-variant"><span className="material-symbols-outlined">close</span></button></div><h3 className="font-headline text-headline-md md:text-headline-lg uppercase mb-3 text-on-background">{product.name}</h3><p className="text-label-caps font-label mb-6">{money.format(product.price)}</p><p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">{product.detail}</p>{product.inStock ? <><div className="mb-8"><span className="text-label-caps font-label uppercase text-on-surface-variant block mb-3">Size</span><div className="grid grid-cols-5 gap-2">{product.sizes.map((item) => <button type="button" key={item} onClick={() => { setSize(item); setWarning(false); }} className={`size-swatch ${size === item ? "selected" : ""}`}>{item}</button>)}</div>{warning && <p className="text-label-caps font-label text-tertiary mt-2">Select a size to continue</p>}</div><button type="button" onClick={add} className="w-full py-5 bg-on-background text-background font-button text-button uppercase tracking-widest shadow-block hover:translate-x-1 hover:translate-y-1 transition-transform mt-auto">Add to Bag</button></> : <div className="mt-auto"><p className="text-label-caps font-label text-outline uppercase border border-outline-variant px-4 py-3 inline-block mb-4">Sold Out</p><p className="text-on-surface-variant font-body-md">This piece has sold through. Join the waitlist for restock notice on future drops.</p></div>}</div></div></div></div>;
}

function MobileNav({ close }) {
  return <div id="mobile-nav" className="open" role="dialog" aria-modal="true" aria-label="Mobile navigation"><div className="flex justify-between items-center h-20 px-margin-mobile border-b border-outline-variant/30"><span className="text-headline-md font-headline font-bold tracking-tighter text-on-background">LEORÉ</span><button type="button" onClick={close} aria-label="Close menu" className="text-on-background"><span className="material-symbols-outlined">close</span></button></div><nav className="flex flex-col gap-2 px-margin-mobile py-10"><a href="/shop" className="py-4 border-b border-outline-variant/30 text-headline-md font-headline uppercase text-on-background">Collections</a><a href="/#lookbook" onClick={close} className="py-4 border-b border-outline-variant/30 text-headline-md font-headline uppercase text-on-background">Lookbook</a><a href="/#journal" onClick={close} className="py-4 border-b border-outline-variant/30 text-headline-md font-headline uppercase text-on-background">Journal</a></nav></div>;
}

export default function App() {
  const [panel, setPanel] = useState(null);
  const [quickProduct, setQuickProduct] = useState(null);
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem("leore_cart")) || []; } catch { return []; } });
  const [toast, setToast] = useState("");
  const [currentUrl, setCurrentUrl] = useState(() => window.location.href);
  const cartCount = cart.reduce((total, line) => total + line.qty, 0);
  const currentLocation = new URL(currentUrl);
  const isShop = currentLocation.pathname === "/shop" || currentLocation.pathname === "/shop.html" || currentLocation.searchParams.get("page") === "shop";
  const showToast = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  useEffect(() => { localStorage.setItem("leore_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    const handleRouteClick = (event) => {
      const link = event.target.closest('a[href^="/shop"]');
      if (!link) return;
      event.preventDefault();
      const nextUrl = new URL(link.href, window.location.origin);
      nextUrl.searchParams.set("page", "shop");
      window.history.pushState({}, "", nextUrl);
      setCurrentUrl(nextUrl.href);
    };
    const handlePopState = () => setCurrentUrl(window.location.href);
    document.addEventListener("click", handleRouteClick);
    window.addEventListener("popstate", handlePopState);
    return () => {
      document.removeEventListener("click", handleRouteClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);
  useEffect(() => {
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0;
      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) progressBar.style.width = `${progress}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [isShop]);
  useEffect(() => { document.documentElement.style.overflow = panel || quickProduct ? "hidden" : ""; return () => { document.documentElement.style.overflow = ""; }; }, [panel, quickProduct]);
  useEffect(() => { const closeOnEscape = (event) => { if (event.key === "Escape") { setPanel(null); setQuickProduct(null); } }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  const addToCart = (id, size) => { setCart((current) => { const existing = current.find((line) => line.id === id && line.size === size); return existing ? current.map((line) => line === existing ? { ...line, qty: line.qty + 1 } : line) : [...current, { id, size, qty: 1 }]; }); const product = getProduct(id); showToast(`Added to bag - ${product.name} (${size})`); setPanel("cart"); };
  const updateQuantity = (index, delta) => setCart((current) => current.map((line, lineIndex) => lineIndex === index ? { ...line, qty: line.qty + delta } : line).filter((line) => line.qty > 0));
  const removeLine = (index) => setCart((current) => current.filter((_, lineIndex) => lineIndex !== index));
  const openQuickView = (id) => { setQuickProduct(getProduct(id)); setPanel(null); };
  const closeAll = () => { setPanel(null); setQuickProduct(null); };
  return <><div id="scroll-progress" /><Header cartCount={cartCount} openPanel={setPanel} />{isShop ? <Shop openQuickView={openQuickView} /> : <Home openQuickView={openQuickView} />}<Footer /><div className={`scrim ${panel || quickProduct ? "open" : ""}`} onClick={closeAll} />{panel === "search" && <SearchOverlay openQuickView={openQuickView} close={() => setPanel(null)} />}{panel === "cart" && <CartDrawer cart={cart} updateQuantity={updateQuantity} removeLine={removeLine} close={() => setPanel(null)} checkout={() => cart.length && showToast("Demo checkout - no payment processed")} />}{panel === "mobile" && <MobileNav close={() => setPanel(null)} />}{quickProduct && <QuickView product={quickProduct} close={() => setQuickProduct(null)} addToCart={addToCart} />}<div id="toast-stack" aria-live="polite">{toast && <div className="toast show">{toast}</div>}</div></>;
}
