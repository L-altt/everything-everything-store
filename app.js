/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
========================================================= */


/* =========================================================
   STORE DATA
========================================================= */

const products = [

  /* ----------------- GROCERIES ----------------- */

  {
    id: "product-1",
    name: "Featured Product",
    category: "Groceries",
    price: 25,
    image: "assets/images/products/product-1.jpg"
  },
  {
    id: "product-2",
    name: "Everyday Essentials",
    category: "Groceries",
    price: 40,
    image: "assets/images/products/product-2.jpg"
  },
  {
    id: "product-3",
    name: "Fresh Produce Box",
    category: "Groceries",
    price: 35,
    image: "assets/images/products/product-3.jpg"
  },
  {
    id: "product-4",
    name: "Pantry Staples Pack",
    category: "Groceries",
    price: 55,
    image: "assets/images/products/product-4.jpg"
  },
  {
    id: "product-5",
    name: "Breakfast Cereal",
    category: "Groceries",
    price: 28,
    image: "assets/images/products/product-5.jpg"
  },
  {
    id: "product-6",
    name: "Cooking Oil 5L",
    category: "Groceries",
    price: 65,
    image: "assets/images/products/product-6.jpg"
  },

  /* ----------------- CLOTHING ----------------- */

  {
    id: "product-7",
    name: "Signature Clothing",
    category: "Clothing",
    price: 180,
    image: "assets/images/products/product-7.jpg"
  },
  {
    id: "product-8",
    name: "Premium Collection",
    category: "Clothing",
    price: 250,
    image: "assets/images/products/product-8.jpg"
  },
  {
    id: "product-9",
    name: "Men's Casual Shirt",
    category: "Clothing",
    price: 95,
    image: "assets/images/products/product-9.jpg"
  },
  {
    id: "product-10",
    name: "Women's Summer Dress",
    category: "Clothing",
    price: 160,
    image: "assets/images/products/product-10.jpg"
  },
  {
    id: "product-11",
    name: "Denim Jacket",
    category: "Clothing",
    price: 220,
    image: "assets/images/products/product-11.jpg"
  },
  {
    id: "product-12",
    name: "Kids Playwear Set",
    category: "Clothing",
    price: 85,
    image: "assets/images/products/product-12.jpg"
  },

  /* ----------------- JEWELRY ----------------- */

  {
    id: "product-13",
    name: "Classic Jewelry",
    category: "Jewelry",
    price: 120,
    image: "assets/images/products/product-13.jpg"
  },
  {
    id: "product-14",
    name: "Everyday Jewelry",
    category: "Jewelry",
    price: 90,
    image: "assets/images/products/product-14.jpg"
  },
  {
    id: "product-15",
    name: "Gold Plated Necklace",
    category: "Jewelry",
    price: 200,
    image: "assets/images/products/product-15.jpg"
  },
  {
    id: "product-16",
    name: "Silver Hoop Earrings",
    category: "Jewelry",
    price: 75,
    image: "assets/images/products/product-16.jpg"
  },
  {
    id: "product-17",
    name: "Beaded Bracelet",
    category: "Jewelry",
    price: 45,
    image: "assets/images/products/product-17.jpg"
  },
  {
    id: "product-18",
    name: "Statement Ring",
    category: "Jewelry",
    price: 110,
    image: "assets/images/products/product-18.jpg"
  },

  /* ----------------- GIFTS ----------------- */

  {
    id: "product-19",
    name: "Special Gift",
    category: "Gifts",
    price: 100,
    image: "assets/images/products/product-19.jpg"
  },
  {
    id: "product-20",
    name: "Gift Box",
    category: "Gifts",
    price: 150,
    image: "assets/images/products/product-20.jpg"
  },
  {
    id: "product-21",
    name: "Personalized Mug",
    category: "Gifts",
    price: 40,
    image: "assets/images/products/product-21.jpg"
  },
  {
    id: "product-22",
    name: "Scented Candle Set",
    category: "Gifts",
    price: 60,
    image: "assets/images/products/product-22.jpg"
  },
  {
    id: "product-23",
    name: "Gift Hamper",
    category: "Gifts",
    price: 220,
    image: "assets/images/products/product-23.jpg"
  },
  {
    id: "product-24",
    name: "Anniversary Gift Bag",
    category: "Gifts",
    price: 130,
    image: "assets/images/products/product-24.jpg"
  }

];


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    name: "Groceries",
    slug: "groceries"
  },

  {
    name: "Clothing",
    slug: "clothing"
  },

  {
    name: "Jewelry",
    slug: "jewelry"
  },

  {
    name: "Gifts",
    slug: "gifts"
  }
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

  products,

  categories,

  bundles,

  cart: [],

  filter: "all",

  search: "",

  sort: "default"

};


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

    list.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

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

    return;

  }


  grid.innerHTML = list.map(product => `

    <article class="product">

      <div class="product-img">

        ${productImage(
          product.image,
          product.name
        )}

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

        <button
          class="btn primary"
          onclick="addProduct('${product.id}')"
        >
          Add to basket
        </button>

      </div>

    </article>

  `).join("");

}


/* =========================================================
   SORTING
========================================================= */

const sortProducts =
  document.querySelector("#sortProducts");

if (sortProducts) {

  sortProducts.addEventListener("change", event => {

    state.sort = event.target.value;

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

      const category =
        card.dataset.category?.toLowerCase();

      if (!category) return;


      state.filter = category;


      document
        .querySelector("#shop")
        ?.scrollIntoView({
          behavior: "smooth"
        });


      setTimeout(() => {

        renderFilters();

        const filterButton =
          document.querySelector(
            `.filter[data-filter="${category}"]`
          );

        if (filterButton) {

          document
            .querySelectorAll(".filter")
            .forEach(button =>
              button.classList.remove("active")
            );

          filterButton.classList.add("active");

        }

        renderProducts();

      }, 300);

    });

  });


/* =========================================================
   SEARCH
========================================================= */

const searchBtn =
  document.querySelector("#searchBtn");

const searchOverlay =
  document.querySelector("#searchOverlay");

const searchClose =
  document.querySelector("#searchClose");

const searchInput =
  document.querySelector("#searchInput");

const searchSubmit =
  document.querySelector("#searchSubmit");


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


searchBtn?.addEventListener(
  "click",
  openSearch
);

searchClose?.addEventListener(
  "click",
  closeSearch
);


searchOverlay?.addEventListener("click", event => {

  if (event.target === searchOverlay) {

    closeSearch();

  }

});


function performSearch() {

  state.search =
    searchInput?.value.trim() || "";

  state.filter = "all";

  renderFilters();

  renderProducts();

  closeSearch();


  document
    .querySelector("#shop")
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


searchSubmit?.addEventListener(
  "click",
  performSearch
);


searchInput?.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {

      performSearch();

    }

    if (event.key === "Escape") {

      closeSearch();

    }

  }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
  document.querySelector("#menuBtn");

const mainNav =
  document.querySelector("#mainNav");


menuBtn?.addEventListener("click", () => {

  const open =
    mainNav.classList.toggle("open");

  menuBtn.setAttribute(
    "aria-expanded",
    open ? "true" : "false"
  );

});


mainNav?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuBtn?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================================================
   PLATTER / BUNDLE BUILDER
   Now works across Groceries, Clothing, Jewelry and Gifts.
   Flow: choose a category -> choose a bundle -> pick items.
========================================================= */

function renderPlatterCategories() {

  const select =
    document.querySelector("#platterCategorySelect");

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

  const select =
    document.querySelector("#mealSelect");

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

  const select =
    document.querySelector("#mealSelect");

  const list =
    document.querySelector("#ingredientList");

  const total =
    document.querySelector("#platterTotal");

  const addButton =
    document.querySelector("#addPlatter");


  if (!select || !list) return;


  const bundle =
    state.bundles.find(
      item => item.id === select.value
    );


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

      input.addEventListener(
        "change",
        updatePlatter
      );

    });


  updatePlatter();

}


function updatePlatter() {

  const selected =
    document.querySelectorAll(
      ".ingredient-check:checked"
    );


  let total = 0;


  selected.forEach(item => {

    total += Number(
      item.dataset.price
    );

  });


  const totalElement =
    document.querySelector("#platterTotal");

  const addButton =
    document.querySelector("#addPlatter");


  if (totalElement) {

    totalElement.textContent =
      money(total);

  }


  if (addButton) {

    addButton.disabled =
      total <= 0;

  }

}


document
  .querySelector("#platterCategorySelect")
  ?.addEventListener("change", event => {

    renderMeals(event.target.value);

  });


document
  .querySelector("#mealSelect")
  ?.addEventListener(
    "change",
    renderIngredients
  );


/* =========================================================
   ADD PLATTER / BUNDLE TO BASKET
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener("click", () => {

    const bundleId =
      document.querySelector("#mealSelect")?.value;

    const bundle =
      state.bundles.find(
        item => item.id === bundleId
      );


    if (!bundle) return;


    const selected =
      [...document.querySelectorAll(
        ".ingredient-check:checked"
      )].map(item => ({

        id: item.value,

        name: item.dataset.name,

        price: Number(
          item.dataset.price
        )

      }));


    if (!selected.length) return;


    const price =
      selected.reduce(
        (total, item) =>
          total + item.price,
        0
      );


    state.cart.push({

      id: `bundle-${Date.now()}`,

      name: `Custom ${bundle.name}`,

      price,

      qty: 1,

      meta: selected
        .map(item => item.name)
        .join(", ")

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
      JSON.parse(
        localStorage.getItem(
          "ee_cart"
        ) || "[]"
      );

  } catch {

    state.cart = [];

  }

}


function saveCart() {

  localStorage.setItem(
    "ee_cart",
    JSON.stringify(state.cart)
  );

}


function addProduct(id) {

  const product =
    state.products.find(
      item => item.id === id
    );


  if (!product) return;


  const existing =
    state.cart.find(
      item => item.id === id
    );


  if (existing) {

    existing.qty++;

  } else {

    state.cart.push({

      id: product.id,

      name: product.name,

      price: Number(
        product.price
      ),

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

  const count =
    document.querySelector("#cartCount");

  const items =
    document.querySelector("#cartItems");

  const total =
    document.querySelector("#cartTotal");


  const quantity =
    state.cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  if (count) {

    count.textContent =
      quantity;

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
                GH₵${money(
                  item.price *
                  item.qty
                )}
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
      (sum, item) =>
        sum +
        item.price *
        item.qty,
      0
    );


  if (total) {

    total.textContent =
      money(cartTotal);

  }

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQty(index, amount) {

  if (!state.cart[index]) return;


  state.cart[index].qty += amount;


  if (state.cart[index].qty <= 0) {

    state.cart.splice(index, 1);

  }


  saveCart();

  renderCart();

}


window.changeQty = changeQty;


/* =========================================================
   CART DRAWER
========================================================= */

const cartDrawer =
  document.querySelector("#cartDrawer");

const drawerOverlay =
  document.querySelector("#drawerOverlay");


function openCart() {

  cartDrawer?.classList.add("open");

  drawerOverlay?.classList.add("open");

  cartDrawer?.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  cartDrawer?.classList.remove("open");

  drawerOverlay?.classList.remove("open");

  cartDrawer?.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


document
  .querySelector("#cartBtn")
  ?.addEventListener(
    "click",
    openCart
  );


document
  .querySelector("#closeCart")
  ?.addEventListener(
    "click",
    closeCart
  );


drawerOverlay?.addEventListener(
  "click",
  closeCart
);


/* =========================================================
   CHECKOUT MODAL
========================================================= */

const modal =
  document.querySelector("#modal");


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
  ?.addEventListener(
    "click",
    openCheckout
  );


/* CLOSE CHECKOUT */

document
  .querySelector("#closeModal")
  ?.addEventListener(
    "click",
    closeCheckout
  );


/* CLOSE WHEN CLICKING OUTSIDE MODAL */

modal?.addEventListener(
  "click",
  event => {

    if (event.target === modal) {

      closeCheckout();

    }

  }
);


/* =========================================================
   CHECKOUT FORM
========================================================= */

document
  .querySelector("#checkoutForm")
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!state.cart.length) {

        alert("Your basket is empty.");

        return;

      }


      const form =
        new FormData(event.target);


      const customer = {

        name:
          form.get("name"),

        phone:
          form.get("phone"),

        email:
          form.get("email"),

        address:
          form.get("address")

      };


      /* SAVE CUSTOMER DETAILS */

      localStorage.setItem(
        "ee_customer",
        JSON.stringify(customer)
      );


      /* =====================================================
         CALCULATE ORDER TOTAL
      ====================================================== */

      const total =
        state.cart.reduce(
          (sum, item) =>
            sum +
            (Number(item.price) * Number(item.qty)),
          0
        );


      /* =====================================================
         BUILD WHATSAPP MESSAGE
      ====================================================== */

      let message =
        "Hello Everything Everything! 👋\n\n" +
        "I would like to place an order.\n\n";


      message += "CUSTOMER DETAILS\n";

      message +=
        "Name: " +
        customer.name +
        "\n";

      message +=
        "Phone: " +
        customer.phone +
        "\n";

      message +=
        "Email: " +
        customer.email +
        "\n";

      message +=
        "Delivery location: " +
        customer.address +
        "\n\n";


      message += "ORDER DETAILS\n";


      state.cart.forEach((item, index) => {

        message +=
          `${index + 1}. ${item.name}\n`;

        message +=
          `Quantity: ${item.qty}\n`;

        message +=
          `Price: GH₵${money(item.price)} each\n`;


        if (item.meta) {

          message +=
            `Ingredients: ${item.meta}\n`;

        }


        message +=
          `Subtotal: GH₵${money(
            item.price * item.qty
          )}\n\n`;

      });


      message +=
        "TOTAL: GH₵" +
        money(total) +
        "\n\n";


      message +=
        "Please confirm my order and let me know the next steps. Thank you!";


      /* =====================================================
         WHATSAPP
      ====================================================== */

      const whatsappNumber =
        "233547026348";


      const whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      /* CLOSE MODAL */

      closeCheckout();


      /* OPEN WHATSAPP */

      window.location.href =
        whatsappUrl;

    }
  );


/* =========================================================
   NEWSLETTER
========================================================= */

document
  .querySelector("#newsletterForm")
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const email =
        document.querySelector(
          "#newsletterEmail"
        )?.value.trim();


      if (!email) return;


      localStorage.setItem(
        "ee_newsletter_email",
        email
      );


      event.target.innerHTML = `

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

    }
  );


/* =========================================================
   KEYBOARD ESCAPE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }

    closeSearch();

    closeCart();

    closeCheckout();

  }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initializeStore() {

  loadCart();

  renderFilters();

  renderProducts();

  renderPlatterCategories();

  renderMeals("");

  renderCart();

}


initializeStore();
