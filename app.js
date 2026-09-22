/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
========================================================= */


/* =========================================================
   SUPABASE CONNECTION
========================================================= */

const SUPABASE_URL = "https://spplkkeeisaozamrsfwg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwcGxra2VlaXNhb3phbXJzZndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3NDUwNjcsImV4cCI6MjEwMjMyMTA2N30.FcDkhkXE5SezAH8NoQE04hODDsToC2fNpDFU4m0RHkg";

const supabaseClient =
  window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


/* =========================================================
   FALLBACK PRODUCTS
   Used only if the live database can't be reached, so the
   site still shows something instead of an empty page.
========================================================= */

const FALLBACK_PRODUCTS = [
  {
    id: "product-1",
    name: "Featured Product",
    category: "Groceries",
    price: 25,
    stock: 0,
    image: "assets/images/products/product-1.jpg"
  }
];


/* =========================================================
   FETCH PRODUCTS FROM SUPABASE
========================================================= */

async function fetchProducts() {

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("category", { ascending: true });

  if (error || !data) {
    console.error("Could not load products:", error);
    return FALLBACK_PRODUCTS;
  }

  return data;

}


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  { name: "Groceries", slug: "groceries" },
  { name: "Clothing", slug: "clothing" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Gifts", slug: "gifts" }
];


/* =========================================================
   PLATTER / BUNDLE BUILDER DATA
   Each bundle belongs to a category (Groceries, Clothing,
   Jewelry, Gifts) so the "Build a Platter" tool works for
   more than just food.
========================================================= */

const bundles = [

  /* ----------------- GROCERIES (meals) ----------------- */

  {
    id: "meal-1",
    name: "Breakfast Platter",
    category: "Groceries",
    ingredients: [
      { id: "bread", name: "Bread", price: 10 },
      { id: "egg", name: "Eggs", price: 15 },
      { id: "sausage", name: "Sausage", price: 20 },
      { id: "tea", name: "Tea", price: 8 }
    ]
  },
  {
    id: "meal-2",
    name: "Lunch Platter",
    category: "Groceries",
    ingredients: [
      { id: "rice", name: "Rice", price: 20 },
      { id: "chicken", name: "Chicken", price: 35 },
      { id: "salad", name: "Salad", price: 15 },
      { id: "drink", name: "Soft Drink", price: 10 }
    ]
  },
  {
    id: "meal-3",
    name: "Special Platter",
    category: "Groceries",
    ingredients: [
      { id: "jollof", name: "Jollof Rice", price: 25 },
      { id: "chicken-special", name: "Grilled Chicken", price: 40 },
      { id: "plantain", name: "Fried Plantain", price: 15 },
      { id: "salad-special", name: "Fresh Salad", price: 15 },
      { id: "drink-special", name: "Soft Drink", price: 10 }
    ]
  },

  /* ----------------- CLOTHING (outfit sets) ----------------- */

  {
    id: "outfit-1",
    name: "Casual Outfit Set",
    category: "Clothing",
    ingredients: [
      { id: "tshirt", name: "T-Shirt", price: 45 },
      { id: "jeans", name: "Jeans", price: 80 },
      { id: "sneakers", name: "Sneakers", price: 150 },
      { id: "cap", name: "Cap", price: 25 }
    ]
  },
  {
    id: "outfit-2",
    name: "Formal Outfit Set",
    category: "Clothing",
    ingredients: [
      { id: "dress-shirt", name: "Dress Shirt", price: 90 },
      { id: "trousers", name: "Trousers", price: 110 },
      { id: "blazer", name: "Blazer", price: 220 },
      { id: "tie", name: "Tie", price: 35 }
    ]
  },

  /* ----------------- JEWELRY (jewelry sets) ----------------- */

  {
    id: "jewelry-set-1",
    name: "Everyday Jewelry Set",
    category: "Jewelry",
    ingredients: [
      { id: "necklace", name: "Necklace", price: 120 },
      { id: "earrings", name: "Earrings", price: 80 },
      { id: "bracelet", name: "Bracelet", price: 70 }
    ]
  },
  {
    id: "jewelry-set-2",
    name: "Bridal Jewelry Set",
    category: "Jewelry",
    ingredients: [
      { id: "statement-necklace", name: "Statement Necklace", price: 280 },
      { id: "drop-earrings", name: "Drop Earrings", price: 150 },
      { id: "tennis-bracelet", name: "Tennis Bracelet", price: 200 },
      { id: "cocktail-ring", name: "Cocktail Ring", price: 130 }
    ]
  },

  /* ----------------- GIFTS (gift sets) ----------------- */

  {
    id: "gift-set-1",
    name: "Birthday Gift Set",
    category: "Gifts",
    ingredients: [
      { id: "card", name: "Greeting Card", price: 15 },
      { id: "chocolate", name: "Chocolate Box", price: 60 },
      { id: "flowers", name: "Flower Bouquet", price: 90 },
      { id: "balloon", name: "Balloon Bundle", price: 35 }
    ]
  },
  {
    id: "gift-set-2",
    name: "Anniversary Gift Set",
    category: "Gifts",
    ingredients: [
      { id: "wine", name: "Sparkling Wine", price: 100 },
      { id: "luxury-chocolate", name: "Luxury Chocolate Box", price: 85 },
      { id: "rose-bouquet", name: "Rose Bouquet", price: 110 },
      { id: "anniversary-card", name: "Anniversary Card", price: 15 }
    ]
  }

];


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {
  products: [],
  categories,
  bundles,
  cart: [],
  filter: "all",
  subFilter: "all",
  search: "",
  sort: "default",
  page: 1
};

const PRODUCTS_PER_PAGE = 12;


/* =========================================================
   HELPERS
========================================================= */

const money = value => {
  return Number(value || 0).toFixed(2);
};


function escapeHtml(value) {

  return String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]
  );

}


/* =========================================================
   PRODUCT IMAGE FALLBACK
========================================================= */

function productImage(image, name) {

  if (!image) {
    return `
      <div class="product-placeholder">
        ${escapeHtml(name)}
      </div>
    `;
  }

  return `
    <img
      src="${image}"
      alt="${escapeHtml(name)}"
      loading="lazy"
      onerror="this.style.display='none';this.parentElement.classList.add('image-error')"
    >
  `;

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

function renderFilters() {

  const element = document.querySelector("#categoryFilters");

  if (!element) return;

  element.innerHTML = `

    <button
      class="filter active"
      data-filter="all"
    >
      All
    </button>

    ${state.categories.map(category => `

      <button
        class="filter"
        data-filter="${category.slug}"
      >
        ${escapeHtml(category.name)}
      </button>

    `).join("")}

  `;

  element.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

      element
        .querySelectorAll(".filter")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      state.filter = button.dataset.filter;
      state.subFilter = "all";
      state.page = 1;

      renderSubFilters();
      renderProducts();

    });

  });

}


/* =========================================================
   SUBCATEGORY FILTERS
   Appears only when the active category has products with
   a subcategory set (e.g. Jewelry -> Necklaces, Rings...).
========================================================= */

function renderSubFilters() {

  const element = document.querySelector("#subcategoryFilters");

  if (!element) return;

  let pool = [...state.products];

  if (state.filter !== "all") {
    pool = pool.filter(
      product => product.category.toLowerCase() === state.filter
    );
  }

  const subcategories = [
    ...new Set(
      pool
        .map(product => product.subcategory)
        .filter(Boolean)
    )
  ];

  if (!subcategories.length) {
    element.innerHTML = "";
    element.style.display = "none";
    return;
  }

  element.style.display = "flex";

  element.innerHTML = `

    <button
      class="filter sub-filter active"
      data-subfilter="all"
    >
      All
    </button>

    ${subcategories.map(sub => `

      <button
        class="filter sub-filter"
        data-subfilter="${escapeHtml(sub)}"
      >
        ${escapeHtml(sub)}
      </button>

    `).join("")}

  `;

  element.querySelectorAll(".sub-filter").forEach(button => {

    button.addEventListener("click", () => {

      element
        .querySelectorAll(".sub-filter")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      state.subFilter = button.dataset.subfilter;
      state.page = 1;

      renderProducts();

    });

  });

}


/* =========================================================
   GET FILTERED PRODUCTS
========================================================= */

function getFilteredProducts() {

  let list = [...state.products];

  /* CATEGORY */

  if (state.filter !== "all") {
    list = list.filter(product => {
      return product.category.toLowerCase() === state.filter;
    });
  }

  /* SUBCATEGORY */

  if (state.subFilter !== "all") {
    list = list.filter(product => {
      return product.subcategory === state.subFilter;
    });
  }

  /* SEARCH */

  if (state.search.trim()) {

    const query = state.search.toLowerCase();

    list = list.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });

  }

  /* SORT */

  if (state.sort === "price-low") {
    list.sort((a, b) => a.price - b.price);
  }

  if (state.sort === "price-high") {
    list.sort((a, b) => b.price - a.price);
  }

  if (state.sort === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const grid = document.querySelector("#productGrid");
  const count = document.querySelector("#productCount");

  if (!grid) return;

  const list = getFilteredProducts();

  if (count) {
    count.textContent =
      `${list.length} product${list.length === 1 ? "" : "s"}`;
  }

  if (!list.length) {

    grid.innerHTML = `

      <div class="loading">

        <strong>No products found.</strong>

        <p>
          Try another category or search.
        </p>

      </div>

    `;

    renderPagination(0);

    return;

  }

  const totalPages =
    Math.max(1, Math.ceil(list.length / PRODUCTS_PER_PAGE));

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const start = (state.page - 1) * PRODUCTS_PER_PAGE;
  const pageItems = list.slice(start, start + PRODUCTS_PER_PAGE);

  grid.innerHTML = pageItems.map(product => {

    const stock = Number(product.stock ?? 0);
    const outOfStock = stock <= 0;
    const lowStock = !outOfStock && stock <= 5;

    let stockLabel = "";

    if (outOfStock) {
      stockLabel = `<span class="stock-note out">Out of stock</span>`;
    } else if (lowStock) {
      stockLabel = `<span class="stock-note low">Only ${stock} left</span>`;
    }

    return `

      <article class="product ${outOfStock ? "out-of-stock" : ""}" data-id="${escapeHtml(product.id)}" tabindex="0">

        <div class="product-img">

          ${productImage(product.image, product.name)}

        </div>

        <div class="product-body">

          <small>
            ${escapeHtml(product.category)}
          </small>

          <h3>
            ${escapeHtml(product.name)}
          </h3>

          <p class="price">
            GH₵${money(product.price)}
          </p>

          ${stockLabel}

          <button
            class="btn primary"
            onclick="addProduct('${product.id}')"
            ${outOfStock ? "disabled" : ""}
          >
            ${outOfStock ? "Out of stock" : "Add to basket"}
          </button>

        </div>

      </article>

    `;

  }).join("");

  renderPagination(list.length);

}


/* =========================================================
   PAGINATION
========================================================= */

function renderPagination(totalItems) {

  const container = document.querySelector("#pagination");

  if (!container) return;

  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let buttons = "";

  buttons += `
    <button
      class="page-btn"
      data-page="${state.page - 1}"
      ${state.page === 1 ? "disabled" : ""}
    >
      Prev
    </button>
  `;

  for (let page = 1; page <= totalPages; page++) {
    buttons += `
      <button
        class="page-btn ${page === state.page ? "active" : ""}"
        data-page="${page}"
      >
        ${page}
      </button>
    `;
  }

  buttons += `
    <button
      class="page-btn"
      data-page="${state.page + 1}"
      ${state.page === totalPages ? "disabled" : ""}
    >
      Next
    </button>
  `;

  container.innerHTML = buttons;

  container.querySelectorAll(".page-btn").forEach(button => {

    button.addEventListener("click", () => {

      const page = Number(button.dataset.page);

      if (!page || page < 1 || page > totalPages) return;

      state.page = page;

      renderProducts();

      document
        .querySelector("#shop")
        ?.scrollIntoView({ behavior: "smooth" });

    });

  });

}


/* =========================================================
   PRODUCT POPUP
   Click a product to see it enlarged with its details
   before adding it to the basket.
========================================================= */

const productModalStyles = document.createElement("style");

productModalStyles.textContent = `
  .product { cursor: pointer; transition: transform .2s ease, box-shadow .2s ease; }
  .product:hover { transform: translateY(-4px); box-shadow: 0 10px 24px rgba(0,0,0,.12); }
  .product button { cursor: pointer; }

  .pm-overlay {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    padding: 16px; background: rgba(0,0,0,.6);
    opacity: 0; pointer-events: none; transition: opacity .2s ease;
  }
  .pm-overlay.open { opacity: 1; pointer-events: auto; }

  .pm-card {
    position: relative; background: #fff; color: #222;
    width: 100%; max-width: 820px; max-height: 90vh; overflow: auto;
    display: grid; grid-template-columns: 1fr 1fr;
    border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,.35);
    transform: scale(.9); transition: transform .2s ease;
  }
  .pm-overlay.open .pm-card { transform: scale(1); }

  .pm-img {
    background: #f3f3f3; min-height: 340px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .pm-img img { width: 100%; height: 100%; object-fit: cover; }

  .pm-body { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
  .pm-body h2 { margin: 0; font-size: 1.6rem; line-height: 1.2; }
  .pm-price { margin: 0; font-size: 1.4rem; font-weight: 800; }
  .pm-desc { margin: 0; color: #555; line-height: 1.5; }
  .pm-body .btn { margin-top: auto; }

  .pm-close {
    position: absolute; top: 10px; right: 12px; z-index: 2;
    width: 38px; height: 38px; border: 0; border-radius: 50%;
    background: #fff; font-size: 24px; line-height: 1; cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,.25);
  }

  @media (max-width: 640px) {
    .pm-card { grid-template-columns: 1fr; }
    .pm-img { min-height: 240px; max-height: 320px; }
    .pm-body { padding: 20px; }
  }
`;

document.head.appendChild(productModalStyles);


function openProductModal(id) {

  const product =
    state.products.find(item => item.id === id);

  if (!product) return;

  let overlay = document.querySelector("#productModal");

  if (!overlay) {

    overlay = document.createElement("div");

    overlay.id = "productModal";
    overlay.className = "pm-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    overlay.addEventListener("click", event => {
      if (event.target === overlay) {
        closeProductModal();
      }
    });

    document.body.appendChild(overlay);

  }

  const stock = Number(product.stock ?? 0);
  const outOfStock = stock <= 0;

  let stockLabel = "";

  if (outOfStock) {
    stockLabel = `<span class="stock-note out">Out of stock</span>`;
  } else if (stock <= 5) {
    stockLabel = `<span class="stock-note low">Only ${stock} left</span>`;
  }

  const category =
    escapeHtml(product.category) +
    (product.subcategory
      ? " · " + escapeHtml(product.subcategory)
      : "");

  overlay.innerHTML = `

    <div class="pm-card">

      <button
        class="pm-close"
        aria-label="Close"
        onclick="closeProductModal()"
      >
        &times;
      </button>

      <div class="pm-img">
        ${productImage(product.image, product.name)}
      </div>

      <div class="pm-body">

        <small>${category}</small>

        <h2>${escapeHtml(product.name)}</h2>

        <p class="pm-price">GH₵${money(product.price)}</p>

        ${
          product.description
            ? `<p class="pm-desc">${escapeHtml(product.description)}</p>`
            : ""
        }

        ${stockLabel}

        <button
          class="btn primary"
          onclick="addFromModal('${escapeHtml(product.id)}')"
          ${outOfStock ? "disabled" : ""}
        >
          ${outOfStock ? "Out of stock" : "Add to basket"}
        </button>

      </div>

    </div>

  `;

  setTimeout(() => overlay.classList.add("open"), 10);

  document.body.style.overflow = "hidden";

}


function closeProductModal() {

  const overlay = document.querySelector("#productModal");

  if (!overlay || !overlay.classList.contains("open")) return;

  overlay.classList.remove("open");

  document.body.style.overflow = "";

}


function addFromModal(id) {

  closeProductModal();

  addProduct(id);

}

window.closeProductModal = closeProductModal;
window.addFromModal = addFromModal;


/* Open the popup when a product card (not its button) is clicked */

const productGridElement = document.querySelector("#productGrid");

productGridElement?.addEventListener("click", event => {

  if (event.target.closest("button")) return;

  const card = event.target.closest(".product");

  if (card?.dataset.id) {
    openProductModal(card.dataset.id);
  }

});

productGridElement?.addEventListener("keydown", event => {

  if (event.key !== "Enter" || event.target.tagName === "BUTTON") return;

  const card = event.target.closest(".product");

  if (card?.dataset.id) {
    openProductModal(card.dataset.id);
  }

});


/* =========================================================
   SORTING
========================================================= */

const sortProducts = document.querySelector("#sortProducts");

if (sortProducts) {

  sortProducts.addEventListener("change", event => {

    state.sort = event.target.value;
    state.page = 1;

    renderProducts();

  });

}


/* =========================================================
   CATEGORY CARDS
========================================================= */

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener("click", event => {

      const category = card.dataset.category?.toLowerCase();

      if (!category) return;

      state.filter = category;

      document
        .querySelector("#shop")
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {

        state.subFilter = "all";
        state.page = 1;

        renderFilters();
        renderSubFilters();

        const filterButton =
          document.querySelector(
            `.filter[data-filter="${category}"]`
          );

        if (filterButton) {

          document
            .querySelectorAll(".filter")
            .forEach(button => button.classList.remove("active"));

          filterButton.classList.add("active");

        }

        renderProducts();

      }, 300);

    });

  });


/* =========================================================
   SEARCH
========================================================= */

const searchBtn = document.querySelector("#searchBtn");
const searchOverlay = document.querySelector("#searchOverlay");
const searchClose = document.querySelector("#searchClose");
const searchInput = document.querySelector("#searchInput");
const searchSubmit = document.querySelector("#searchSubmit");


function openSearch() {

  if (!searchOverlay) return;

  searchOverlay.classList.add("open");

  setTimeout(() => {
    searchInput?.focus();
  }, 100);

}


function closeSearch() {
  searchOverlay?.classList.remove("open");
}


searchBtn?.addEventListener("click", openSearch);
searchClose?.addEventListener("click", closeSearch);

searchOverlay?.addEventListener("click", event => {
  if (event.target === searchOverlay) {
    closeSearch();
  }
});


function performSearch() {

  state.search = searchInput?.value.trim() || "";
  state.filter = "all";
  state.subFilter = "all";
  state.page = 1;

  renderFilters();
  renderSubFilters();
  renderProducts();

  closeSearch();

  document
    .querySelector("#shop")
    ?.scrollIntoView({ behavior: "smooth" });

}


searchSubmit?.addEventListener("click", performSearch);

searchInput?.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    performSearch();
  }

  if (event.key === "Escape") {
    closeSearch();
  }

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector("#menuBtn");
const mainNav = document.querySelector("#mainNav");

menuBtn?.addEventListener("click", () => {

  const open = mainNav.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");

});

mainNav?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuBtn?.setAttribute("aria-expanded", "false");

  });

});


/* =========================================================
   PLATTER / BUNDLE BUILDER
   Works across Groceries, Clothing, Jewelry and Gifts.
   Flow: choose a category -> choose a bundle -> pick items.
========================================================= */

function renderPlatterCategories() {

  const select = document.querySelector("#platterCategorySelect");

  if (!select) return;

  select.innerHTML = `

    <option value="">
      Select a category
    </option>

    ${state.categories.map(category => `

      <option value="${escapeHtml(category.name)}">
        ${escapeHtml(category.name)}
      </option>

    `).join("")}

  `;

}


function renderMeals(category) {

  const select = document.querySelector("#mealSelect");

  if (!select) return;

  const filtered =
    category
      ? state.bundles.filter(item => item.category === category)
      : [];

  if (!category) {

    select.innerHTML = `
      <option value="">Select a category first</option>
    `;

    select.disabled = true;

    renderIngredients();

    return;

  }

  select.disabled = false;

  select.innerHTML = `

    <option value="">
      Select a bundle
    </option>

    ${filtered.map(bundle => `

      <option value="${bundle.id}">
        ${escapeHtml(bundle.name)}
      </option>

    `).join("")}

  `;

  renderIngredients();

}


function renderIngredients() {

  const select = document.querySelector("#mealSelect");
  const list = document.querySelector("#ingredientList");
  const total = document.querySelector("#platterTotal");
  const addButton = document.querySelector("#addPlatter");

  if (!select || !list) return;

  const bundle =
    state.bundles.find(item => item.id === select.value);

  if (!bundle) {

    list.innerHTML = "";

    if (total) {
      total.textContent = "0.00";
    }

    if (addButton) {
      addButton.disabled = true;
    }

    return;

  }

  list.innerHTML = bundle.ingredients.map(
    ingredient => `

      <div class="ingredient">

        <label>

          <input
            type="checkbox"
            class="ingredient-check"
            value="${ingredient.id}"
            data-price="${ingredient.price}"
            data-name="${escapeHtml(ingredient.name)}"
          >

          ${escapeHtml(ingredient.name)}

        </label>

        <span>
          GH₵${money(ingredient.price)}
        </span>

      </div>

    `
  ).join("");

  list
    .querySelectorAll(".ingredient-check")
    .forEach(input => {
      input.addEventListener("change", updatePlatter);
    });

  updatePlatter();

}


function updatePlatter() {

  const selected =
    document.querySelectorAll(".ingredient-check:checked");

  let total = 0;

  selected.forEach(item => {
    total += Number(item.dataset.price);
  });

  const totalElement = document.querySelector("#platterTotal");
  const addButton = document.querySelector("#addPlatter");

  if (totalElement) {
    totalElement.textContent = money(total);
  }

  if (addButton) {
    addButton.disabled = total <= 0;
  }

}


document
  .querySelector("#platterCategorySelect")
  ?.addEventListener("change", event => {
    renderMeals(event.target.value);
  });

document
  .querySelector("#mealSelect")
  ?.addEventListener("change", renderIngredients);


/* =========================================================
   ADD PLATTER / BUNDLE TO BASKET
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener("click", () => {

    const bundleId = document.querySelector("#mealSelect")?.value;

    const bundle =
      state.bundles.find(item => item.id === bundleId);

    if (!bundle) return;

    const selected =
      [...document.querySelectorAll(".ingredient-check:checked")]
        .map(item => ({
          id: item.value,
          name: item.dataset.name,
          price: Number(item.dataset.price)
        }));

    if (!selected.length) return;

    const price =
      selected.reduce((total, item) => total + item.price, 0);

    state.cart.push({
      id: `bundle-${Date.now()}`,
      name: `Custom ${bundle.name}`,
      price,
      qty: 1,
      meta: selected.map(item => item.name).join(", ")
    });

    saveCart();
    renderCart();
    openCart();

  });


/* =========================================================
   CART
========================================================= */

function loadCart() {

  try {
    state.cart =
      JSON.parse(localStorage.getItem("ee_cart") || "[]");
  } catch {
    state.cart = [];
  }

}


function saveCart() {
  localStorage.setItem("ee_cart", JSON.stringify(state.cart));
}


function addProduct(id) {

  const product =
    state.products.find(item => item.id === id);

  if (!product) return;

  const existing =
    state.cart.find(item => item.id === id);

  const currentQty = existing ? existing.qty : 0;

  if (currentQty + 1 > Number(product.stock ?? 0)) {
    alert("Sorry, no more of this item in stock.");
    return;
  }

  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      qty: 1
    });
  }

  saveCart();
  renderCart();
  openCart();

}

window.addProduct = addProduct;


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const count = document.querySelector("#cartCount");
  const items = document.querySelector("#cartItems");
  const total = document.querySelector("#cartTotal");

  const quantity =
    state.cart.reduce((sum, item) => sum + item.qty, 0);

  if (count) {
    count.textContent = quantity;
  }

  if (!items) return;

  if (!state.cart.length) {

    items.innerHTML = `

      <div class="loading">

        <strong>Your basket is empty.</strong>

        <p>
          Add something you love to get started.
        </p>

      </div>

    `;

  } else {

    items.innerHTML =
      state.cart.map(
        (item, index) => `

          <div class="cart-row">

            <div>

              <b>
                ${escapeHtml(item.name)}
              </b>

              ${
                item.meta
                  ? `<small>
                      ${escapeHtml(item.meta)}
                    </small>`
                  : ""
              }

              <div>
                GH₵${money(item.price * item.qty)}
              </div>

            </div>

            <div class="qty">

              <button
                onclick="changeQty(${index}, -1)"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                ${item.qty}
              </span>

              <button
                onclick="changeQty(${index}, 1)"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

        `
      ).join("");

  }

  const cartTotal =
    state.cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

  if (total) {
    total.textContent = money(cartTotal);
  }

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQty(index, amount) {

  if (!state.cart[index]) return;

  const item = state.cart[index];

  const product =
    state.products.find(p => p.id === item.id);

  if (amount > 0 && product) {

    if (item.qty + amount > Number(product.stock ?? 0)) {
      alert("Sorry, no more of this item in stock.");
      return;
    }

  }

  item.qty += amount;

  if (item.qty <= 0) {
    state.cart.splice(index, 1);
  }

  saveCart();
  renderCart();

}

window.changeQty = changeQty;


/* =========================================================
   CART DRAWER
========================================================= */

const cartDrawer = document.querySelector("#cartDrawer");
const drawerOverlay = document.querySelector("#drawerOverlay");


function openCart() {

  cartDrawer?.classList.add("open");
  drawerOverlay?.classList.add("open");
  cartDrawer?.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

}


function closeCart() {

  cartDrawer?.classList.remove("open");
  drawerOverlay?.classList.remove("open");
  cartDrawer?.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

}


document.querySelector("#cartBtn")?.addEventListener("click", openCart);
document.querySelector("#closeCart")?.addEventListener("click", closeCart);
drawerOverlay?.addEventListener("click", closeCart);


/* =========================================================
   CHECKOUT MODAL
========================================================= */

const modal = document.querySelector("#modal");


function openCheckout() {

  if (!state.cart.length) {
    alert("Your basket is empty.");
    return;
  }

  modal?.classList.remove("hidden");

}


function closeCheckout() {
  modal?.classList.add("hidden");
}


/* OPEN CHECKOUT */

document
  .querySelector("#checkoutBtn")
  ?.addEventListener("click", openCheckout);

/* CLOSE CHECKOUT */

document
  .querySelector("#closeModal")
  ?.addEventListener("click", closeCheckout);

/* CLOSE WHEN CLICKING OUTSIDE MODAL */

modal?.addEventListener("click", event => {
  if (event.target === modal) {
    closeCheckout();
  }
});


/* =========================================================
   CHECKOUT FORM
   1. Reserve live stock  2. Save the order to Supabase
   3. Clear basket        4. Open WhatsApp with the order
========================================================= */

document
  .querySelector("#checkoutForm")
  ?.addEventListener("submit", async event => {

    event.preventDefault();

    if (!state.cart.length) {
      alert("Your basket is empty.");
      return;
    }

    /* Stop double-taps from placing the order twice */

    const submitButton =
      event.target.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {

      const form = new FormData(event.target);

      const customer = {
        name: form.get("name"),
        phone: form.get("phone"),
        email: form.get("email"),
        address: form.get("address")
      };

      /* SAVE CUSTOMER DETAILS (for next time) */

      localStorage.setItem("ee_customer", JSON.stringify(customer));

      /* ORDER TOTAL */

      const total =
        state.cart.reduce(
          (sum, item) =>
            sum + (Number(item.price) * Number(item.qty)),
          0
        );

      /* -----------------------------------------------------
         1. RESERVE LIVE STOCK FOR EACH REAL PRODUCT
            (custom platters/bundles aren't stock-tracked yet)
            If any item can't be reserved, stop and refresh.
      ------------------------------------------------------ */

      for (const item of state.cart) {

        const isRealProduct =
          state.products.some(p => p.id === item.id);

        if (!isRealProduct) continue;

        const { data, error } =
          await supabaseClient.rpc("decrement_stock", {
            p_id: item.id,
            qty: item.qty
          });

        if (error || data === false) {

          console.error("Stock reservation failed:", error);

          alert(
            "Sorry, \"" + item.name + "\" just ran out of stock. " +
            "Please review your basket and try again."
          );

          state.products = await fetchProducts();

          renderProducts();

          return;

        }

      }

      /* -----------------------------------------------------
         2. SAVE THE ORDER TO SUPABASE
            A failure here never blocks the customer: the
            WhatsApp message below still reaches you.
      ------------------------------------------------------ */

      const { error: orderError } =
        await supabaseClient
          .from("orders")
          .insert({
            customer_name: customer.name,
            phone: customer.phone,
            email: customer.email,
            address: customer.address,
            items: state.cart.map(item => ({
              id: item.id,
              name: item.name,
              price: Number(item.price),
              qty: Number(item.qty),
              meta: item.meta || null
            })),
            total,
            status: "pending",
            payment_method: "whatsapp"
          });

      if (orderError) {
        console.error("Could not save order:", orderError);
      }

      /* -----------------------------------------------------
         3. BUILD THE WHATSAPP MESSAGE
      ------------------------------------------------------ */

      let message =
        "Hello Everything Everything! 👋\n\n" +
        "I would like to place an order.\n\n";

      message += "CUSTOMER DETAILS\n";
      message += "Name: " + customer.name + "\n";
      message += "Phone: " + customer.phone + "\n";
      message += "Email: " + customer.email + "\n";
      message += "Delivery location: " + customer.address + "\n\n";

      message += "ORDER DETAILS\n";

      state.cart.forEach((item, index) => {

        message += `${index + 1}. ${item.name}\n`;
        message += `Quantity: ${item.qty}\n`;
        message += `Price: GH₵${money(item.price)} each\n`;

        if (item.meta) {
          message += `Ingredients: ${item.meta}\n`;
        }

        message += `Subtotal: GH₵${money(item.price * item.qty)}\n\n`;

      });

      message += "TOTAL: GH₵" + money(total) + "\n\n";

      message +=
        "Please confirm my order and let me know the next steps. Thank you!";

      const whatsappNumber = "233547026348";

      const whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);

      /* -----------------------------------------------------
         4. CLEAR BASKET, REFRESH STOCK, OPEN WHATSAPP
      ------------------------------------------------------ */

      state.cart = [];

      saveCart();

      state.products = await fetchProducts();

      renderProducts();
      renderCart();

      closeCheckout();

      window.location.href = whatsappUrl;

    } finally {

      if (submitButton) {
        submitButton.disabled = false;
      }

    }

  });


/* =========================================================
   NEWSLETTER
   Saves subscribers to Supabase. A duplicate email
   (error code 23505) is treated as "already subscribed".
========================================================= */

document
  .querySelector("#newsletterForm")
  ?.addEventListener("submit", async event => {

    event.preventDefault();

    const form = event.target;

    const email =
      document.querySelector("#newsletterEmail")?.value.trim();

    if (!email) return;

    const button = form.querySelector("button");

    if (button) {
      button.disabled = true;
    }

    const { error } =
      await supabaseClient
        .from("newsletter_subscribers")
        .insert({ email });

    if (error && error.code !== "23505") {

      console.error("Newsletter signup failed:", error);

      alert("Sorry, we couldn't sign you up right now. Please try again.");

      if (button) {
        button.disabled = false;
      }

      return;

    }

    localStorage.setItem("ee_newsletter_email", email);

    form.innerHTML = `

      <p
        style="
          color:white;
          font-weight:800;
          padding:12px 0;
        "
      >
        Thanks for subscribing!
      </p>

    `;

  });


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener("keydown", event => {

  if (event.key !== "Escape") {
    return;
  }

  closeSearch();
  closeCart();
  closeCheckout();
  closeProductModal();

});


/* =========================================================
   INITIALIZE
========================================================= */

async function initializeStore() {

  loadCart();

  state.products = await fetchProducts();

  renderFilters();
  renderSubFilters();
  renderProducts();

  renderPlatterCategories();
  renderMeals("");

  renderCart();

}

initializeStore();
