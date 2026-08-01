/* ==========================================================================
   LEORE — Main interactivity
   Cart (localStorage-backed, persists across index.html + shop.html),
   quick-view modal, mobile nav drawer, live search, newsletter form,
   scroll reveal / progress bar, and shop grid rendering + filtering.
   No build step — plain DOM APIs so this stays a fully static site.
   ========================================================================== */

(() => {
  "use strict";

  const CART_KEY = "leore_cart";
  const fmt = (n) => `$${n.toLocaleString("en-US")}`;

  /* ---------------------------------------------------------------------
     Cart state
     --------------------------------------------------------------------- */
  const readCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };
  const writeCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
    updateCartBadge();
  };

  function addToCart(productId, size, qty = 1) {
    const product = getProduct(productId);
    if (!product) return;
    const cart = readCart();
    const existing = cart.find((l) => l.id === productId && l.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, size, qty });
    }
    writeCart(cart);
    showToast(`Added to bag — ${product.name} (${size})`);
    openCart();
  }

  function removeLine(index) {
    const cart = readCart();
    cart.splice(index, 1);
    writeCart(cart);
  }

  function changeQty(index, delta) {
    const cart = readCart();
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    writeCart(cart);
  }

  function cartCount() {
    return readCart().reduce((sum, l) => sum + l.qty, 0);
  }

  function updateCartBadge() {
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach((el) => {
      el.textContent = String(count);
      el.classList.toggle("opacity-0", count === 0);
    });
  }

  function renderCart() {
    const list = document.getElementById("cart-lines");
    const emptyState = document.getElementById("cart-empty");
    const subtotalEl = document.getElementById("cart-subtotal");
    if (!list) return; // cart markup not on this page

    const cart = readCart();
    list.innerHTML = "";

    if (cart.length === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
    }

    let subtotal = 0;
    cart.forEach((line, index) => {
      const product = getProduct(line.id);
      if (!product) return;
      subtotal += product.price * line.qty;

      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <img src="${product.img}" alt="${product.imgAlt}" loading="lazy" />
        <div class="flex flex-col justify-between">
          <div>
            <p class="font-headline-md text-[15px] leading-tight text-on-background">${product.name}</p>
            <p class="text-label-caps font-label-caps text-on-surface-variant uppercase mt-1">Size ${line.size}</p>
          </div>
          <div class="qty-stepper" role="group" aria-label="Quantity for ${product.name}">
            <button type="button" data-qty-decrease aria-label="Decrease quantity">–</button>
            <span>${line.qty}</span>
            <button type="button" data-qty-increase aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="flex flex-col items-end justify-between">
          <button type="button" data-remove-line aria-label="Remove ${product.name} from bag" class="text-on-surface-variant hover:text-tertiary transition-colors">
            <span class="material-symbols-outlined" style="font-size:18px">close</span>
          </button>
          <span class="text-label-caps font-label-caps">${fmt(product.price * line.qty)}</span>
        </div>
      `;
      row.querySelector("[data-qty-decrease]").addEventListener("click", () => changeQty(index, -1));
      row.querySelector("[data-qty-increase]").addEventListener("click", () => changeQty(index, 1));
      row.querySelector("[data-remove-line]").addEventListener("click", () => removeLine(index));
      list.appendChild(row);
    });

    if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
  }

  /* ---------------------------------------------------------------------
     Toasts
     --------------------------------------------------------------------- */
  function showToast(message) {
    const stack = document.getElementById("toast-stack");
    if (!stack) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    stack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  }

  /* ---------------------------------------------------------------------
     Overlay helpers (drawer / modal / search / mobile nav share a scrim)
     --------------------------------------------------------------------- */
  const scrim = document.getElementById("scrim");
  const openPanels = new Set();

  function lockScroll(lock) {
    document.documentElement.style.overflow = lock ? "hidden" : "";
  }

  function openPanel(panel) {
    panel.classList.add("open");
    openPanels.add(panel);
    scrim.classList.add("open");
    lockScroll(true);
  }

  function closePanel(panel) {
    panel.classList.remove("open");
    openPanels.delete(panel);
    if (openPanels.size === 0) {
      scrim.classList.remove("open");
      lockScroll(false);
    }
  }

  function closeAllPanels() {
    [...openPanels].forEach(closePanel);
  }

  scrim?.addEventListener("click", closeAllPanels);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllPanels();
  });

  /* ---------------------------------------------------------------------
     Cart drawer open/close
     --------------------------------------------------------------------- */
  const cartDrawer = document.getElementById("cart-drawer");
  function openCart() {
    if (!cartDrawer) return;
    renderCart();
    openPanel(cartDrawer);
  }
  document.querySelectorAll("[data-open-cart]").forEach((btn) =>
    btn.addEventListener("click", openCart)
  );
  document.querySelectorAll("[data-close-cart]").forEach((btn) =>
    btn.addEventListener("click", () => closePanel(cartDrawer))
  );

  /* ---------------------------------------------------------------------
     Mobile nav drawer
     --------------------------------------------------------------------- */
  const mobileNav = document.getElementById("mobile-nav");
  document.querySelectorAll("[data-open-mobile-nav]").forEach((btn) =>
    btn.addEventListener("click", () => openPanel(mobileNav))
  );
  document.querySelectorAll("[data-close-mobile-nav]").forEach((btn) =>
    btn.addEventListener("click", () => closePanel(mobileNav))
  );

  /* ---------------------------------------------------------------------
     Search overlay
     --------------------------------------------------------------------- */
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  function renderSearchResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!q) return;

    const matches = PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      searchResults.innerHTML = `<p class="text-on-surface-variant font-body-md py-8">No results for "${query}". Try “hoodie”, “outerwear”, or “accessories”.</p>`;
      return;
    }

    matches.forEach((product) => {
      const row = document.createElement("div");
      row.className = "search-result-row";
      row.innerHTML = `
        <img src="${product.img}" alt="${product.imgAlt}" loading="lazy" />
        <div class="flex-grow">
          <p class="font-headline-md text-[16px] text-on-background">${product.name}</p>
          <p class="text-label-caps font-label-caps text-on-surface-variant uppercase mt-1">${product.category}</p>
        </div>
        <span class="text-label-caps font-label-caps">${fmt(product.price)}</span>
      `;
      row.addEventListener("click", () => {
        closePanel(searchOverlay);
        openQuickView(product.id);
      });
      searchResults.appendChild(row);
    });
  }

  document.querySelectorAll("[data-open-search]").forEach((btn) =>
    btn.addEventListener("click", () => {
      openPanel(searchOverlay);
      setTimeout(() => searchInput?.focus(), 100);
    })
  );
  document.querySelectorAll("[data-close-search]").forEach((btn) =>
    btn.addEventListener("click", () => closePanel(searchOverlay))
  );
  searchInput?.addEventListener("input", (e) => renderSearchResults(e.target.value));

  /* ---------------------------------------------------------------------
     Quick-view modal
     --------------------------------------------------------------------- */
  const quickviewModal = document.getElementById("quickview-modal");
  const qvPanel = document.getElementById("quickview-panel");
  let qvSelectedSize = null;

  function openQuickView(productId) {
    const product = getProduct(productId);
    if (!product || !qvPanel) return;
    qvSelectedSize = null;

    qvPanel.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="aspect-[4/5] md:aspect-auto bg-surface-container-low overflow-hidden">
          <img src="${product.img}" alt="${product.imgAlt}" class="w-full h-full object-cover" />
        </div>
        <div class="p-8 md:p-10 flex flex-col">
          <div class="flex justify-between items-start mb-6">
            <span class="text-label-caps font-label-caps text-tertiary uppercase">${product.tag}</span>
            <button type="button" data-close-quickview aria-label="Close quick view" class="text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <h3 class="font-headline-lg text-headline-md md:text-headline-lg uppercase mb-3 text-on-background">${product.name}</h3>
          <p class="text-label-caps font-label-caps mb-6">${fmt(product.price)}</p>
          <p class="text-on-surface-variant font-body-md mb-8 leading-relaxed">${product.detail}</p>

          ${
            product.inStock
              ? `
          <div class="mb-8">
            <span class="text-label-caps font-label-caps uppercase text-on-surface-variant block mb-3">Size</span>
            <div class="grid grid-cols-5 gap-2" id="qv-sizes">
              ${product.sizes
                .map(
                  (s) =>
                    `<button type="button" class="size-swatch" data-size="${s}">${s}</button>`
                )
                .join("")}
            </div>
            <p class="text-label-caps font-label-caps text-tertiary mt-2 hidden" id="qv-size-warning">Select a size to continue</p>
          </div>
          <button type="button" id="qv-add-to-cart" class="w-full py-5 bg-on-background text-background font-button text-button uppercase tracking-widest shadow-block hover:translate-x-1 hover:translate-y-1 transition-transform mt-auto">
            Add to Bag
          </button>`
              : `
          <div class="mt-auto">
            <p class="text-label-caps font-label-caps text-outline uppercase border border-outline-variant px-4 py-3 inline-block mb-4">Sold Out</p>
            <p class="text-on-surface-variant font-body-md">This piece has sold through. Join the waitlist for restock notice on future drops.</p>
          </div>`
          }
        </div>
      </div>
    `;

    qvPanel.querySelector("[data-close-quickview]").addEventListener("click", () => closePanel(quickviewModal));

    if (product.inStock) {
      const sizeButtons = qvPanel.querySelectorAll(".size-swatch");
      sizeButtons.forEach((btn) =>
        btn.addEventListener("click", () => {
          sizeButtons.forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          qvSelectedSize = btn.dataset.size;
          qvPanel.querySelector("#qv-size-warning")?.classList.add("hidden");
        })
      );
      qvPanel.querySelector("#qv-add-to-cart").addEventListener("click", () => {
        if (!qvSelectedSize) {
          qvPanel.querySelector("#qv-size-warning")?.classList.remove("hidden");
          return;
        }
        addToCart(product.id, qvSelectedSize, 1);
        closePanel(quickviewModal);
      });
    }

    openPanel(quickviewModal);
  }

  document.querySelectorAll("[data-close-quickview-scrim]").forEach((el) =>
    el.addEventListener("click", () => closePanel(quickviewModal))
  );

  // Expose for inline card triggers rendered dynamically
  window.LEORE = window.LEORE || {};
  window.LEORE.openQuickView = openQuickView;
  window.LEORE.addToCart = addToCart;

  /* ---------------------------------------------------------------------
     Newsletter form (client-side only — no backend wired up)
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        input.classList.add("border-tertiary");
        input.setAttribute("aria-invalid", "true");
        showToast("Enter a valid email address");
        return;
      }

      form.innerHTML = `<p class="font-body-lg text-on-background fade-in">You're on the list. Watch your inbox for early access.</p>`;
    });
  });

  /* ---------------------------------------------------------------------
     Scroll reveal
     --------------------------------------------------------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));

  /* ---------------------------------------------------------------------
     Scroll progress bar
     --------------------------------------------------------------------- */
  const progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------------------
     Smooth in-page nav links
     --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
        closeAllPanels();
      }
    });
  });

  /* ---------------------------------------------------------------------
     Hero title parallax (index page only — guarded)
     --------------------------------------------------------------------- */
  const heroTitle = document.querySelector("[data-hero-parallax]");
  if (heroTitle && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroTitle.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* ---------------------------------------------------------------------
     Shop grid: render, filter (category), sort
     --------------------------------------------------------------------- */
  const grid = document.getElementById("product-grid");
  if (grid) {
    const params = new URLSearchParams(window.location.search);
    let activeCategory = params.get("category") || "All";
    let activeSort = "featured";

    function cardHTML(product) {
      return `
        <div class="product-card reveal-on-scroll visible">
          <div class="media">
            <img src="${product.img}" alt="${product.imgAlt}" loading="lazy" />
            ${
              !product.inStock
                ? `<span class="absolute top-3 left-3 z-10 text-label-caps font-label-caps uppercase bg-surface-container-lowest border border-outline-variant px-2 py-1">Sold Out</span>`
                : ""
            }
            <div class="quick-add p-3">
              <button type="button" class="w-full py-3 bg-on-background text-background font-button text-button uppercase tracking-widest hover:bg-tertiary transition-colors" data-quickview="${product.id}">
                ${product.inStock ? "Quick View" : "Notify Me"}
              </button>
            </div>
          </div>
          <button type="button" class="text-left mt-4" data-quickview="${product.id}">
            <h3 class="font-headline-md text-[17px] text-on-background uppercase">${product.name}</h3>
            <div class="flex justify-between items-center mt-2">
              <span class="text-label-caps font-label-caps text-on-surface-variant uppercase">${product.category}</span>
              <span class="text-label-caps font-label-caps text-on-background">${fmt(product.price)}</span>
            </div>
          </button>
        </div>
      `;
    }

    function renderGrid() {
      let items = [...PRODUCTS];
      if (activeCategory !== "All") {
        items = items.filter((p) => p.category === activeCategory);
      }
      if (activeSort === "price-asc") items.sort((a, b) => a.price - b.price);
      if (activeSort === "price-desc") items.sort((a, b) => b.price - a.price);

      grid.innerHTML = items.map(cardHTML).join("");
      document.getElementById("results-count").textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

      grid.querySelectorAll("[data-quickview]").forEach((btn) =>
        btn.addEventListener("click", () => openQuickView(btn.dataset.quickview))
      );
    }

    document.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        activeCategory = tab.dataset.category;
        renderGrid();
      });
      if (tab.dataset.category === activeCategory) tab.classList.add("active");
    });

    document.getElementById("sort-select")?.addEventListener("change", (e) => {
      activeSort = e.target.value;
      renderGrid();
    });

    renderGrid();
  }

  /* ---------------------------------------------------------------------
     Init
     --------------------------------------------------------------------- */
  updateCartBadge();
  renderCart();
})();
