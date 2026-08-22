/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
   Frontend Only
   Cart + LocalStorage + WhatsApp
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
   CONSTANTS
========================================================= */

const STORAGE_KEYS = {

  cart: "ee_cart",

  customer: "ee_customer",

  newsletter: "ee_newsletter_email"

};


/*
   WhatsApp number must be in international format
   WITHOUT +, spaces or leading zero.
*/

const WHATSAPP_NUMBER = "233547026348";


/* =========================================================
   HELPERS
========================================================= */

function money(value) {

  return Number(value || 0).toFixed(2);

}


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


function getElement(selector) {

  return document.querySelector(selector);

}


/* =========================================================
   PRODUCT IMAGE
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
      src="${escapeHtml(image)}"
      alt="${escapeHtml(name)}"
      loading="lazy"
      onerror="
        this.style.display='none';
        this.parentElement.classList.add('image-error');
      "
    >
  `;

}


/* =========================================================
   FILTERS
========================================================= */

function renderFilters() {

  const element =
    getElement("#categoryFilters");

  if (!element) return;


  element.innerHTML = `

    <button
      class="filter ${state.filter === "all" ? "active" : ""}"
      data-filter="all"
      type="button"
    >
      All
    </button>

    ${state.categories.map(category => `

      <button
        class="filter ${
          state.filter === category.slug
            ? "active"
            : ""
        }"
        data-filter="${escapeHtml(category.slug)}"
        type="button"
      >
        ${escapeHtml(category.name)}
      </button>

    `).join("")}

  `;


  element
    .querySelectorAll(".filter")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          state.filter =
            button.dataset.filter;

          renderFilters();

          renderProducts();

        }
      );

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

  let list = [...state.products];


  /* CATEGORY */

  if (state.filter !== "all") {

    list = list.filter(product => {

      return (
        product.category.toLowerCase() ===
        state.filter.toLowerCase()
      );

    });

  }


  /* SEARCH */

  if (state.search.trim()) {

    const query =
      state.search
        .trim()
        .toLowerCase();


    list = list.filter(product => {

      return (

        product.name
          .toLowerCase()
          .includes(query)

        ||

        product.category
          .toLowerCase()
          .includes(query)

      );

    });

  }


  /* SORT */

  switch (state.sort) {

    case "price-low":

      list.sort(
        (a, b) => a.price - b.price
      );

      break;


    case "price-high":

      list.sort(
        (a, b) => b.price - a.price
      );

      break;


    case "name":

      list.sort(
        (a, b) =>
          a.name.localeCompare(b.name)
      );

      break;

  }


  return list;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const grid =
    getElement("#productGrid");

  const count =
    getElement("#productCount");


  if (!grid) return;


  const list =
    getFilteredProducts();


  if (count) {

    count.textContent =
      `${list.length} product${
        list.length === 1 ? "" : "s"
      }`;

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


  grid.innerHTML =
    list.map(product => `

      <article
        class="product"
        data-product-id="${escapeHtml(product.id)}"
      >

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
            class="btn primary add-product-btn"
            type="button"
            data-product-id="${escapeHtml(product.id)}"
          >
            Add to basket
          </button>

        </div>

      </article>

    `).join("");


  /*
     Event listeners instead of inline onclick.
  */

  grid
    .querySelectorAll(".add-product-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          addProduct(
            button.dataset.productId
          );

        }
      );

    });

}


/* =========================================================
   SORTING
========================================================= */

function initializeSorting() {

  const sort =
    getElement("#sortProducts");

  if (!sort) return;


  sort.addEventListener(
    "change",
    event => {

      state.sort =
        event.target.value;

      renderProducts();

    }
  );

}


/* =========================================================
   CATEGORY CARDS
========================================================= */

function initializeCategoryCards() {

  document
    .querySelectorAll(".category-card")
    .forEach(card => {

      card.addEventListener(
        "click",
        event => {

          event.preventDefault();


          const category =
            card.dataset.category
              ?.trim()
              .toLowerCase();


          if (!category) return;


          state.filter =
            category;

          state.search =
            "";


          renderFilters();

          renderProducts();


          getElement("#shop")
            ?.scrollIntoView({
              behavior: "smooth"
            });

        }
      );

    });

}


/* =========================================================
   SEARCH
========================================================= */

const searchBtn =
  getElement("#searchBtn");

const searchOverlay =
  getElement("#searchOverlay");

const searchClose =
  getElement("#searchClose");

const searchInput =
  getElement("#searchInput");

const searchSubmit =
  getElement("#searchSubmit");


function openSearch() {

  if (!searchOverlay) return;


  searchOverlay.classList.add("open");


  setTimeout(() => {

    searchInput?.focus();

  }, 100);

}


function closeSearch() {

  searchOverlay
    ?.classList.remove("open");

}


function performSearch() {

  state.search =
    searchInput?.value.trim() || "";

  state.filter =
    "all";


  renderFilters();

  renderProducts();

  closeSearch();


  getElement("#shop")
    ?.scrollIntoView({
      behavior: "smooth"
    });

}


searchBtn?.addEventListener(
  "click",
  openSearch
);


searchClose?.addEventListener(
  "click",
  closeSearch
);


searchSubmit?.addEventListener(
  "click",
  performSearch
);


searchOverlay?.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      searchOverlay
    ) {

      closeSearch();

    }

  }
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

function initializeMobileMenu() {

  const menuBtn =
    getElement("#menuBtn");

  const mainNav =
    getElement("#mainNav");


  if (!menuBtn || !mainNav) return;


  menuBtn.addEventListener(
    "click",
    () => {

      const isOpen =
        mainNav.classList.toggle("open");


      menuBtn.setAttribute(
        "aria-expanded",
        isOpen
          ? "true"
          : "false"
      );

    }
  );


  mainNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove(
            "open"
          );

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =========================================================
   PLATTER — MEALS
========================================================= */

function renderMeals() {

  const select =
    getElement("#mealSelect");

  if (!select) return;


  select.innerHTML = `

    <option value="">
      Select a meal
    </option>

    ${state.meals.map(meal => `

      <option value="${escapeHtml(meal.id)}">
        ${escapeHtml(meal.name)}
      </option>

    `).join("")}

  `;

}


/* =========================================================
   PLATTER — INGREDIENTS
========================================================= */

function renderIngredients() {

  const select =
    getElement("#mealSelect");

  const list =
    getElement("#ingredientList");

  const total =
    getElement("#platterTotal");

  const addButton =
    getElement("#addPlatter");


  if (!select || !list) return;


  const meal =
    state.meals.find(
      item =>
        item.id === select.value
    );


  if (!meal) {

    list.innerHTML = "";

    if (total) {

      total.textContent =
        "0.00";

    }

    if (addButton) {

      addButton.disabled =
        true;

    }

    return;

  }


  list.innerHTML =
    meal.ingredients.map(
      ingredient => `

        <div class="ingredient">

          <label>

            <input
              type="checkbox"
              class="ingredient-check"
              value="${escapeHtml(ingredient.id)}"
              data-price="${ingredient.price}"
              data-name="${escapeHtml(ingredient.name)}"
            >

            ${escapeHtml(
              ingredient.name
            )}

          </label>

          <span>
            GH₵${money(
              ingredient.price
            )}
          </span>

        </div>

      `
    ).join("");


  list
    .querySelectorAll(
      ".ingredient-check"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        updatePlatter
      );

    });


  updatePlatter();

}


/* =========================================================
   PLATTER — CALCULATE TOTAL
========================================================= */

function updatePlatter() {

  const selected =
    document.querySelectorAll(
      ".ingredient-check:checked"
    );


  let total = 0;


  selected.forEach(
    ingredient => {

      total += Number(
        ingredient.dataset.price
      );

    }
  );


  const totalElement =
    getElement("#platterTotal");

  const addButton =
    getElement("#addPlatter");


  if (totalElement) {

    totalElement.textContent =
      money(total);

  }


  if (addButton) {

    addButton.disabled =
      total <= 0;

  }

}


/* =========================================================
   ADD PLATTER
========================================================= */

function addPlatterToCart() {

  const select =
    getElement("#mealSelect");


  const meal =
    state.meals.find(
      item =>
        item.id === select?.value
    );


  if (!meal) {

    alert("Please select a meal.");

    return;

  }


  const selected =
    [
      ...document.querySelectorAll(
        ".ingredient-check:checked"
      )
    ].map(input => ({

      id: input.value,

      name: input.dataset.name,

      price: Number(
        input.dataset.price
      )

    }));


  if (!selected.length) {

    alert(
      "Please select at least one ingredient."
    );

    return;

  }


  const price =
    selected.reduce(
      (total, item) =>
        total + item.price,
      0
    );


  state.cart.push({

    id:
      `platter-${Date.now()}`,

    name:
      `Custom ${meal.name}`,

    price,

    qty: 1,

    meta:
      selected
        .map(item => item.name)
        .join(", ")

  });


  saveCart();

  renderCart();

  openCart();

}


/* =========================================================
   CART STORAGE
========================================================= */

function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEYS.cart
      );


    if (!saved) {

      state.cart = [];

      return;

    }


    const parsed =
      JSON.parse(saved);


    if (!Array.isArray(parsed)) {

      state.cart = [];

      return;

    }


    state.cart =
      parsed.filter(item => {

        return (
          item &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          Number(item.price) >= 0 &&
          Number(item.qty) > 0
        );

      }).map(item => ({

        ...item,

        price:
          Number(item.price),

        qty:
          Number(item.qty)

      }));

  } catch (error) {

    console.warn(
      "Could not load cart:",
      error
    );

    state.cart = [];

  }

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

  try {

    localStorage.setItem(
      STORAGE_KEYS.cart,
      JSON.stringify(state.cart)
    );

  } catch (error) {

    console.warn(
      "Could not save cart:",
      error
    );

  }

}


/* =========================================================
   ADD PRODUCT
========================================================= */

function addProduct(id) {

  const product =
    state.products.find(
      item =>
        item.id === id
    );


  if (!product) return;


  const existing =
    state.cart.find(
      item =>
        item.id === product.id
    );


  if (existing) {

    existing.qty += 1;

  } else {

    state.cart.push({

      id:
        product.id,

      name:
        product.name,

      price:
        Number(product.price),

      qty: 1

    });

  }


  saveCart();

  renderCart();

  openCart();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQty(index, amount) {

  const item =
    state.cart[index];


  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    state.cart.splice(
      index,
      1
    );

  }


  saveCart();

  renderCart();

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeCartItem(index) {

  if (
    index < 0 ||
    index >= state.cart.length
  ) {

    return;

  }


  state.cart.splice(
    index,
    1
  );


  saveCart();

  renderCart();

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

  return state.cart.reduce(
    (total, item) => {

      return (
        total +
        Number(item.price) *
        Number(item.qty)
      );

    },
    0
  );

}


/* =========================================================
   CART QUANTITY
========================================================= */

function getCartQuantity() {

  return state.cart.reduce(
    (total, item) => {

      return (
        total +
        Number(item.qty)
      );

    },
    0
  );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const count =
    getElement("#cartCount");

  const items =
    getElement("#cartItems");

  const total =
    getElement("#cartTotal");


  if (count) {

    count.textContent =
      getCartQuantity();

  }


  if (!items) return;


  if (!state.cart.length) {

    items.innerHTML = `

      <div class="loading">

        <strong>
          Your basket is empty.
        </strong>

        <p>
          Add something you love
          to get started.
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
                ${escapeHtml(
                  item.name
                )}
              </b>

              ${
                item.meta
                  ? `
                    <small>
                      ${escapeHtml(
                        item.meta
                      )}
                    </small>
                  `
                  : ""
              }

              <div>
                GH₵${money(
                  item.price *
                  item.qty
                )}
              </div>

              <button
                class="remove-item"
                type="button"
                data-index="${index}"
              >
                Remove
              </button>

            </div>


            <div class="qty">

              <button
                class="qty-decrease"
                type="button"
                data-index="${index}"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                ${item.qty}
              </span>

              <button
                class="qty-increase"
                type="button"
                data-index="${index}"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

        `
      ).join("");


    /*
       Quantity controls.
    */

    items
      .querySelectorAll(
        ".qty-decrease"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            changeQty(
              Number(button.dataset.index),
              -1
            );

          }
        );

      });


    items
      .querySelectorAll(
        ".qty-increase"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            changeQty(
              Number(button.dataset.index),
              1
            );

          }
        );

      });


    /*
       Remove buttons.
    */

    items
      .querySelectorAll(
        ".remove-item"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            removeCartItem(
              Number(button.dataset.index)
            );

          }
        );

      });

  }


  if (total) {

    total.textContent =
      money(getCartTotal());

  }

}


/* =========================================================
   CART DRAWER
========================================================= */

const cartDrawer =
  getElement("#cartDrawer");

const drawerOverlay =
  getElement("#drawerOverlay");


function openCart() {

  cartDrawer
    ?.classList.add("open");

  drawerOverlay
    ?.classList.add("open");


  cartDrawer?.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  cartDrawer
    ?.classList.remove("open");

  drawerOverlay
    ?.classList.remove("open");


  cartDrawer?.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}


/* =========================================================
   CART EVENTS
========================================================= */

function initializeCart() {

  getElement("#cartBtn")
    ?.addEventListener(
      "click",
      openCart
    );


  getElement("#closeCart")
    ?.addEventListener(
      "click",
      closeCart
    );


  drawerOverlay
    ?.addEventListener(
      "click",
      closeCart
    );

}


/* =========================================================
   CHECKOUT MODAL
========================================================= */

const modal =
  getElement("#modal");


function openCheckout() {

  if (!state.cart.length) {

    alert(
      "Your basket is empty."
    );

    return;

  }


  modal
    ?.classList.remove("hidden");

}


function closeCheckout() {

  modal
    ?.classList.add("hidden");

}


/* =========================================================
   CHECKOUT EVENTS
========================================================= */

function initializeCheckout() {

  getElement("#checkoutBtn")
    ?.addEventListener(
      "click",
      openCheckout
    );


  getElement("#closeModal")
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

}


/* =========================================================
   CUSTOMER DETAILS
========================================================= */

function getCustomerDetails(form) {

  const formData =
    new FormData(form);


  return {

    name:
      String(
        formData.get("name") || ""
      ).trim(),

    phone:
      String(
        formData.get("phone") || ""
      ).trim(),

    email:
      String(
        formData.get("email") || ""
      ).trim(),

    address:
      String(
        formData.get("address") || ""
      ).trim()

  };

}


/* =========================================================
   SAVE CUSTOMER
========================================================= */

function saveCustomer(customer) {

  try {

    localStorage.setItem(
      STORAGE_KEYS.customer,
      JSON.stringify(customer)
    );

  } catch (error) {

    console.warn(
      "Could not save customer:",
      error
    );

  }

}


/* =========================================================
   BUILD WHATSAPP MESSAGE
========================================================= */

function buildWhatsAppMessage(
  customer
) {

  const total =
    getCartTotal();


  let message =
    "EVERYTHING EVERYTHING\n" +
    "NEW ORDER\n" +
    "━━━━━━━━━━━━━━━━━━\n\n";


  message +=
    "CUSTOMER DETAILS\n";


  message +=
    `Name: ${customer.name}\n`;

  message +=
    `Phone: ${customer.phone}\n`;

  message +=
    `Email: ${customer.email || "Not provided"}\n`;

  message +=
    `Delivery location: ${customer.address}\n\n`;


  message +=
    "ORDER DETAILS\n" +
    "━━━━━━━━━━━━━━━━━━\n\n";


  state.cart.forEach(
    (item, index) => {

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
          item.price *
          item.qty
        )}\n\n`;

    }
  );


  message +=
    "━━━━━━━━━━━━━━━━━━\n";

  message +=
    `TOTAL: GH₵${money(total)}\n\n`;

  message +=
    "Please confirm my order " +
    "and let me know the next steps.\n\n";

  message +=
    "Thank you!";


  return message;

}


/* =========================================================
   CHECKOUT FORM
========================================================= */

function initializeCheckoutForm() {

  const form =
    getElement("#checkoutForm");


  if (!form) return;


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!state.cart.length) {

        alert(
          "Your basket is empty."
        );

        return;

      }


      if (
        !form.checkValidity()
      ) {

        form.reportValidity();

        return;

      }


      const customer =
        getCustomerDetails(form);


      if (
        !customer.name ||
        !customer.phone ||
        !customer.address
      ) {

        alert(
          "Please complete your name, phone number and delivery location."
        );

        return;

      }


      saveCustomer(
        customer
      );


      const message =
        buildWhatsAppMessage(
          customer
        );


      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(message)}`;


      closeCheckout();


      /*
         Open WhatsApp in the same tab.
      */

      window.location.href =
        whatsappUrl;

    }
  );

}


/* =========================================================
   NEWSLETTER
========================================================= */

function initializeNewsletter() {

  const form =
    getElement("#newsletterForm");

  if (!form) return;


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const input =
        getElement(
          "#newsletterEmail"
        );


      const email =
        input?.value.trim() || "";


      if (!email) return;


      if (
        !input.checkValidity()
      ) {

        input.reportValidity();

        return;

      }


      try {

        localStorage.setItem(
          STORAGE_KEYS.newsletter,
          email
        );

      } catch (error) {

        console.warn(
          "Could not save newsletter email:",
          error
        );

      }


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

    }
  );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

function initializeKeyboardControls() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      ) {

        return;

      }


      closeSearch();

      closeCart();

      closeCheckout();

    }
  );

}


/* =========================================================
   INITIALIZE
========================================================= */

function initializeStore() {

  loadCart();

  renderFilters();

  renderProducts();

  renderMeals();

  renderCart();


  initializeSorting();

  initializeCategoryCards();

  initializeMobileMenu();

  initializeCart();

  initializeCheckout();

  initializeCheckoutForm();

  initializeNewsletter();

  initializeKeyboardControls();


  getElement("#mealSelect")
    ?.addEventListener(
      "change",
      renderIngredients
    );


  getElement("#addPlatter")
    ?.addEventListener(
      "click",
      addPlatterToCart
    );

}


/* =========================================================
   START STORE
========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initializeStore
  );

} else {

  initializeStore();

}
