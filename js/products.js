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
    img: "assets/products/7AF39B55-8E20-4F27-BCC8-F6EC50A4FACB.png",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEs0DGfnGNSwjopa799_sNQ9K5XBb6oOkjEHMhZ1goIdup5LDd0rjPy9lkSNWr2B7thBRDd8LoK9L1_mla-jllOS7ivsh2w4B4oj53VGmyTI_-nZwTmdrcSptsvPQ3fIp06Wg4vyEcp7XkRvN4MS215MnmiN8v1a2oIGgS7SNsCGpdr0s91sqejyEZkiBjf009K6NA9pvKsWFOS0c8kWQ_Fy5SZQpCdztM54cKYRjtjPigUz572bwh",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKqM-xVl99iOSXdUESBspfPCX7zG4Wii-IaSEooYfbPh66RbWYRBTfL34zr79hIT-vUbyfbgAFNSHZp10qt7ylQnqm8oNZMFHaH9KKpqEwNX45xtqL-L4j_ka1jkW_ZYWBceDbbnf-l5c0n4lCf0D3Qvmcf_X24OpCGJ7lHdYyxx61le3i7ctCxFsV3H69pZTjczQYrkuUKX0QIGfZ2io5Jhjk4YuulhMdrmBso67UX_2MBR5H_405",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAa4jLPzIWhRGI_Uj4CqFRl72_HAK4CnbXsPg1JUcD_XQNLWfyl1Tk9XU6Ztl6X2e6f5GZpu6gtgeFQSwRT0Drh9fCh73lOKf9_KkzL_EkF2KPXLAtNrgmybHAJWLgOY4ee6eiSXDhGkIB-P6Fj4mNXdxeMUxVFMPwzVxcwWMfNDkgGrqB8aeWYXeHauh8-bukkBBRXzvSDlSeUIfoGab2oy6k9GGWUw4H7YkhNpp6JY2RQDoGcJ8-l",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQZ2yDRGuJUZW6nhQgrObDr8hqIAjaDl7aOhOdWCxBoEhkqoCEbmOBm2QRhDulY0BNzgum3wKiyrjPPGXmoPlZ5tHHDk7etPNhoN8-p83ul_QjE2vm4sSTzWS1_qE41Oj_zq26o65aYNVA_LY69IqpDmp_coEvm6pRBPDj-GcroykkBJyZj3tVLzOczhsD_AgpU31H9JLSOlozQfr_h3csJzGLdab3gWqr8-R60aK-BiBPDvq6ueZp",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5wAfta_ZGCe5NG2i2S8Sk8KhR_uEoAp9pF2hzyyT6yNubHYZC58ICETDUm_FOAC78aCaet43nePTVQxjGe45rYPOuJH39kQxxs_6Jo43oSWkUKUIEk74MCxWrzjFavFRK02fRJ1JukIn_Dmn0efvgIUcbpcm67gUKbmOYbAN3g_5Lh5L6egrIaJfiJY0MOs510r5yj1q298g7LluGGLdEvQVdvyRlUmIXZFEa-gUnINQnTmNbTMj8",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYJ5teJmTeFpH9SWjJfo3TNinZI5a9CXQBkRqH3rBETiY7RkvBnDolzRlBoBtV-SD0yTENqlRCHGVz8jWOGAhSOTishLQH0qXE1LUFARhr3Myw_fSxF5ODFrBPgQQNj6FWvs2oiiLIAOYFfwzXy5wrjyc6npngc-Wv8d91SmTQ7nYtsmjFf3BrELPqf07cIkTKFjjq2zhEq8jJm2vxp8bxgDD9VeurG1MphSZR-Yq_Qh6N2CCGOtwo",
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
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYdNi_QrZiD4dEnsNMO9yz-Oil4YV-rpXZLUPaMc5dKWiPScj-mOIFpT5LTYwrWpuvayWn8uRvExfHRjHV4c7m4U6tNmalfYRb1t3zIQZY5ZoZrFGX3rp5CjGmxzwLi9UEMm6WsOuQt8o2wdu4rhnq-gPtjji3G6IPWw-SBYcc47LRh0I9FUaonNP8vD8rg_U9Fl1vOQJT44nbzpRqbfBv9Q0x41AIFEpkMMJghVSMmBglbZUWArnu",
    imgAlt: "Close-up studio shot of a charcoal grey heavy-weight hoodie's ribbed cuff detail",
    detail: "500GSM fleece cuff and hem detail. Same signature construction, undecorated for a cleaner drop.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
];

// Quick lookup by id
const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
