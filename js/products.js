/* ==========================================================================
   LEORE — Product Catalog
   Central data source so the hero feature, bento collections, shop grid,
   quick-view modal and search all stay in sync from one place.
   Swap the `img` URLs for your own product photography when ready —
   everything else (cart, filtering, quick-view) will keep working.
   ========================================================================== */

const PRODUCTS = [
  {
    id: "signature-hoodie",
    name: "The Signature Hoodie",
    category: "Hoodies",
    price: 245,
    tag: "Essentials 01",
    img: "assets/products/normalized/signature-hoodie.jpg",
    imgAlt: "Model wearing the oversized charcoal signature hoodie and matching sweatpants",
    detail: "Engineered from 500GSM heavy-weight organic cotton fleece. Structural double-layered hood, dropped shoulders, cropped boxy fit. Tonal embroidery on the chest.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "concrete-jacket",
    name: "Editorial Concrete Jacket",
    category: "Outerwear",
    price: 520,
    tag: "Series 02",
    img: "assets/products/normalized/concrete-jacket.jpg",
    imgAlt: "Model in a minimalist oversized coat against brutalist concrete architecture",
    detail: "A structural silhouette built for the urban landscape. Weatherproof shell, articulated seams, hidden interior pocket system.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "trench-coat",
    name: "Structural Trench",
    category: "Outerwear",
    price: 580,
    tag: "Limited",
    img: "assets/products/normalized/trench-coat.jpg",
    imgAlt: "Model walking away from camera wearing a long tech-fabric trench coat",
    detail: "Tech-fabric trench with a cold, architectural drape. Cyberpunk-minimalist silhouette for low-light city wear.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "cargo-pants",
    name: "Tonal Cargo Pants",
    category: "Pants",
    price: 210,
    tag: "Restocked",
    img: "assets/products/normalized/cargo-pants.jpg",
    imgAlt: "Detail shot of structured heavy-duty cargo pants in matte technical nylon",
    detail: "Structured heavy-duty cargo silhouette in matte technical nylon. Oversized pockets, articulated knee, drawcord hem.",
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true
  },
  {
    id: "mockneck-knit",
    name: "Heavyweight Mock-Neck Knit",
    category: "Knitwear",
    price: 195,
    tag: "New",
    img: "assets/products/normalized/mockneck-knit.jpg",
    imgAlt: "Model wearing a heavy-knit beanie and mock-neck sweater in cream tones",
    detail: "Heavy-gauge wool blend mock-neck. Soft-hand finish, ribbed cuffs and hem, calm and sophisticated palette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true
  },
  {
    id: "crossbody-set",
    name: "Leather Crossbody Set",
    category: "Accessories",
    price: 340,
    tag: "Limited Release",
    img: "assets/products/normalized/crossbody-set.jpg",
    imgAlt: "Curated selection of premium leather accessories including a wallet and crossbody bag",
    detail: "Minimalist wallet and crossbody bag, presented like museum artifacts. Full-grain leather, brushed hardware.",
    sizes: ["One Size"],
    inStock: true
  },
  {
    id: "crest-hoodie",
    name: "Embroidered Crest Hoodie",
    category: "Hoodies",
    price: 260,
    tag: "Archive",
    img: "assets/products/normalized/crest-hoodie.jpg",
    imgAlt: "Extreme close-up of a tonal embroidered brand crest on the chest of a black hoodie",
    detail: "Subtle tonal embroidery for textural contrast over color. Heavy-knit base fabric, boxy cropped fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: false
  },
  {
    id: "boxy-pullover",
    name: "Boxy Fleece Pullover",
    category: "Hoodies",
    price: 230,
    tag: "Essentials",
    img: "assets/products/normalized/boxy-pullover.jpg",
    imgAlt: "Close-up studio shot of a charcoal grey heavy-weight hoodie's ribbed cuff detail",
    detail: "500GSM fleece cuff and hem detail. Same signature construction, undecorated for a cleaner drop.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
];

// Quick lookup by id
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
