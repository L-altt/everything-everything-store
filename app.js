/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
========================================================= */


/* =========================================================
   STORE DATA
========================================================= */

const products = [
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
    name: "Signature Clothing",
    category: "Clothing",
    price: 180,
    image: "assets/images/products/product-3.jpg"
  },

  {
    id: "product-4",
    name: "Classic Jewelry",
    category: "Jewelry",
    price: 120,
    image: "assets/images/products/product-4.jpg"
  },

  {
    id: "product-5",
    name: "Special Gift",
    category: "Gifts",
    price: 100,
    image: "assets/images/products/product-5.jpg"
  },

  {
    id: "product-6",
    name: "Premium Collection",
    category: "Clothing",
    price: 250,
    image: "assets/images/products/product-6.jpg"
  },

  {
    id: "product-7",
    name: "Everyday Jewelry",
    category: "Jewelry",
    price: 90,
    image: "assets/images/products/product-7.jpg"
  },

  {
    id: "product-8",
    name: "Gift Box",
    category: "Gifts",
    price: 150,
    image: "assets/images/products/product-8.jpg"
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
   PLATTER MEALS
========================================================= */

const meals = [
  {
    id: "meal-1",

    name: "Breakfast Platter",

    ingredients: [
      {
        id: "bread",
        name: "Bread",
        price: 10
      },

      {
        id: "egg",
        name: "Eggs",
        price: 15
      },

      {
        id: "sausage",
        name: "Sausage",
        price: 20
      },

      {
        id: "tea",
        name: "Tea",
        price: 8
      }
    ]
  },


  {
    id: "meal-2",

    name: "Lunch Platter",

    ingredients: [
      {
        id: "rice",
        name: "Rice",
        price: 20
      },

      {
        id: "chicken",
        name: "Chicken",
        price: 35
      },

      {
        id: "salad",
        name: "Salad",
        price: 15
      },

      {
        id: "drink",
        name: "Soft Drink",
        price: 10
      }
    ]
  },


  {
    id: "meal-3",

    name: "Special Platter",

    ingredients: [
      {
        id: "jollof",
        name: "Jollof Rice",
        price: 25
      },

      {
        id: "chicken-special",
        name: "Grilled Chicken",
        price: 40
      },

      {
        id: "plantain",
        name: "Fried Plantain",
        price: 15
      },

      {
        id: "salad-special",
        name: "Fresh Salad",
        price: 15
      },

      {
        id: "drink-special",
        name: "Soft Drink",
        price: 10
      }
    ]
  }
];


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

  products,

  categories,

  meals,

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
   PLATTER
========================================================= */

function renderMeals() {

  const select =
    document.querySelector("#mealSelect");

  if (!select) return;


  select.innerHTML = `

    <option value="">
      Select a meal
    </option>

    ${state.meals.map(meal => `

      <option value="${meal.id}">
        ${escapeHtml(meal.name)}
      </option>

    `).join("")}

  `;

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


  const meal =
    state.meals.find(
      item => item.id === select.value
    );


  if (!meal) {

    list.innerHTML = "";

    if (total) {
      total.textContent = "0.00";
    }

    if (addButton) {
      addButton.disabled = true;
    }

    return;

  }


  list.innerHTML = meal.ingredients.map(
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
  .querySelector("#mealSelect")
  ?.addEventListener(
    "change",
    renderIngredients
  );


/* =========================================================
   ADD PLATTER
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener("click", () => {

    const mealId =
      document.querySelector("#mealSelect")?.value;

    const meal =
      state.meals.find(
        item => item.id === mealId
      );


    if (!meal) return;


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

      id: `platter-${Date.now()}`,

      name: `Custom ${meal.name}`,

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

    alert(
      "Your basket is empty."
    );

    return;

  }


  modal?.classList.remove(
    "hidden"
  );

}


function closeCheckout() {

  modal?.classList.add(
    "hidden"
  );

}


document
  .querySelector("#checkoutBtn")
  ?.addEventListener(
    "click",
    openCheckout
  );


document
  .querySelector("#closeModal")
  ?.addEventListener(
    "click",
    closeCheckout
  );


modal?.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      closeCheckout();

    }

  }
);


/* =========================================================
   CHECKOUT
========================================================= */

document
  .querySelector("#checkoutForm")
  ?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const form =
        new FormData(
          event.target
        );


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


      localStorage.setItem(
        "ee_customer",
        JSON.stringify(customer)
      );


      /*
        Payment integration will be connected
        here later.

        For now we display a message rather
        than pretending payment has happened.
      */

      const status =
        document.querySelector(
          "#checkoutStatus"
        );


      if (status) {

        status.textContent =
          "Your order details have been saved. Payment integration will be connected next.";

      }

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

  renderMeals();

  renderCart();

}


initializeStore();
