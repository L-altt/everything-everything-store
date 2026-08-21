/* =========================================================
   EVERYTHING EVERYTHING
   STORE APP — PHASE 1
   WhatsApp Checkout
========================================================= */

const WHATSAPP_NUMBER = "233547026348";

const state = {
  products: [
    {
      id: "product-1",
      name: "Classic White Tee",
      category: "clothing",
      price: 120,
      image: "",
      description: "A clean everyday essential."
    },
    {
      id: "product-2",
      name: "Premium Black Tee",
      category: "clothing",
      price: 150,
      image: "",
      description: "Minimal, comfortable and easy to wear."
    },
    {
      id: "product-3",
      name: "Gold Bracelet",
      category: "jewelry",
      price: 250,
      image: "",
      description: "A simple statement piece."
    },
    {
      id: "product-4",
      name: "Gift Box",
      category: "gifts",
      price: 180,
      image: "",
      description: "A thoughtful gift for someone special."
    },
    {
      id: "product-5",
      name: "Fresh Fruit Basket",
      category: "groceries",
      price: 200,
      image: "",
      description: "A selection of fresh fruits."
    },
    {
      id: "product-6",
      name: "Snack Box",
      category: "groceries",
      price: 150,
      image: "",
      description: "A convenient selection of snacks."
    }
  ],

  categories: [
    {
      name: "All",
      slug: "all"
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
    },
    {
      name: "Groceries",
      slug: "groceries"
    }
  ],

  meals: [
    {
      id: "meal-1",
      name: "Breakfast Platter",
      ingredients: [
        {
          id: "egg",
          name: "Eggs",
          price: 20
        },
        {
          id: "bread",
          name: "Bread",
          price: 15
        },
        {
          id: "sausage",
          name: "Sausage",
          price: 30
        },
        {
          id: "fruit",
          name: "Fresh Fruit",
          price: 25
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
          price: 30
        },
        {
          id: "chicken",
          name: "Chicken",
          price: 45
        },
        {
          id: "salad",
          name: "Fresh Salad",
          price: 25
        },
        {
          id: "drink",
          name: "Soft Drink",
          price: 15
        }
      ]
    },

    {
      id: "meal-3",
      name: "Dinner Platter",
      ingredients: [
        {
          id: "rice-dinner",
          name: "Jollof Rice",
          price: 35
        },
        {
          id: "chicken-dinner",
          name: "Grilled Chicken",
          price: 50
        },
        {
          id: "plantain",
          name: "Fried Plantain",
          price: 25
        },
        {
          id: "salad-dinner",
          name: "Fresh Salad",
          price: 25
        }
      ]
    }
  ],

  cart: [],
  filter: "all",
  search: ""
};


/* =========================================================
   HELPERS
========================================================= */

const money = value => Number(value || 0).toFixed(2);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function getCategoryName(slug) {
  const category = state.categories.find(
    category => category.slug === slug
  );

  return category ? category.name : "SHOP";
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {

  const grid = document.querySelector("#productGrid");

  if (!grid) return;

  let products = [...state.products];

  if (state.filter !== "all") {
    products = products.filter(
      product => product.category === state.filter
    );
  }

  if (state.search.trim()) {

    const query = state.search.toLowerCase();

    products = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  if (!products.length) {

    grid.innerHTML = `
      <div class="loading">
        No products found.
      </div>
    `;

    return;
  }

  grid.innerHTML = products.map(product => {

    const image = product.image
      ? `
        <img
          src="${escapeHtml(product.image)}"
          alt="${escapeHtml(product.name)}"
        >
      `
      : `
        <div class="product-placeholder">
          EVERYTHING EVERYTHING
        </div>
      `;

    return `
      <article class="product">

        <div class="product-img">
          ${image}
        </div>

        <div class="product-body">

          <small>
            ${escapeHtml(
              getCategoryName(product.category)
            )}
          </small>

          <h3>
            ${escapeHtml(product.name)}
          </h3>

          <p class="product-description">
            ${escapeHtml(product.description)}
          </p>

          <p class="price">
            GH₵${money(product.price)}
          </p>

          <button
            class="btn primary"
            type="button"
            data-add-product="${product.id}"
          >
            Add to basket
          </button>

        </div>

      </article>
    `;

  }).join("");

  grid.querySelectorAll("[data-add-product]").forEach(button => {

    button.addEventListener("click", () => {
      addProduct(button.dataset.addProduct);
    });

  });
}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

function renderFilters() {

  const container =
    document.querySelector("#categoryFilters");

  if (!container) return;

  container.innerHTML =
    state.categories.map(category => {

      return `
        <button
          class="filter ${
            state.filter === category.slug
              ? "active"
              : ""
          }"
          type="button"
          data-filter="${category.slug}"
        >
          ${escapeHtml(category.name)}
        </button>
      `;

    }).join("");

  container
    .querySelectorAll("[data-filter]")
    .forEach(button => {

      button.addEventListener("click", () => {

        state.filter =
          button.dataset.filter;

        container
          .querySelectorAll(".filter")
          .forEach(item =>
            item.classList.remove("active")
          );

        button.classList.add("active");

        renderProducts();

      });

    });
}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

  const searchInput =
    document.querySelector(
      "#searchInput, #search-input, .search-input"
    );

  if (!searchInput) return;

  searchInput.addEventListener("input", event => {

    state.search = event.target.value;

    renderProducts();

  });

}


/* =========================================================
   PLATTERS
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

  const meal = state.meals.find(
    meal => meal.id === select.value
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

  list.innerHTML =
    meal.ingredients.map(ingredient => `

      <div class="ingredient">

        <label>

          <input
            type="checkbox"
            class="ingredient-check"
            value="${ingredient.id}"
            data-name="${escapeHtml(
              ingredient.name
            )}"
            data-price="${ingredient.price}"
          >

          ${escapeHtml(ingredient.name)}

        </label>

        <span>
          GH₵${money(ingredient.price)}
        </span>

      </div>

    `).join("");

  list
    .querySelectorAll(".ingredient-check")
    .forEach(input => {

      input.addEventListener(
        "change",
        updatePlatterTotal
      );

    });

  updatePlatterTotal();
}


function updatePlatterTotal() {

  const totalElement =
    document.querySelector("#platterTotal");

  const button =
    document.querySelector("#addPlatter");

  const selected =
    document.querySelectorAll(
      ".ingredient-check:checked"
    );

  let total = 0;

  selected.forEach(item => {
    total += Number(item.dataset.price);
  });

  if (totalElement) {
    totalElement.textContent =
      money(total);
  }

  if (button) {
    button.disabled = total <= 0;
  }
}


function addPlatterToCart() {

  const select =
    document.querySelector("#mealSelect");

  if (!select) return;

  const meal =
    state.meals.find(
      meal => meal.id === select.value
    );

  if (!meal) return;

  const selected =
    [...document.querySelectorAll(
      ".ingredient-check:checked"
    )];

  if (!selected.length) return;

  const ingredients =
    selected.map(item => ({
      id: item.value,
      name: item.dataset.name,
      price: Number(item.dataset.price)
    }));

  const total =
    ingredients.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  state.cart.push({

    id: `platter-${Date.now()}`,

    name: `Custom ${meal.name}`,

    price: total,

    qty: 1,

    meta: ingredients
      .map(item => item.name)
      .join(", ")

  });

  saveCart();

  renderCart();

  openCart();
}


/* =========================================================
   CART
========================================================= */

function addProduct(id) {

  const product =
    state.products.find(
      product => product.id === id
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

      price: Number(product.price),

      qty: 1

    });

  }

  saveCart();

  renderCart();

  openCart();
}


function changeQty(index, amount) {

  if (!state.cart[index]) return;

  state.cart[index].qty += amount;

  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }

  saveCart();

  renderCart();
}


function removeCartItem(index) {

  state.cart.splice(index, 1);

  saveCart();

  renderCart();
}

window.addProduct = addProduct;
window.changeQty = changeQty;
window.removeCartItem = removeCartItem;


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const count =
    document.querySelector("#cartCount");

  const items =
    document.querySelector("#cartItems");

  const totalElement =
    document.querySelector("#cartTotal");

  const quantity =
    state.cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );

  const total =
    state.cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );

  if (count) {
    count.textContent = quantity;
  }

  if (totalElement) {
    totalElement.textContent =
      money(total);
  }

  if (!items) return;

  if (!state.cart.length) {

    items.innerHTML = `
      <div class="loading">
        Your basket is empty.
      </div>
    `;

    return;
  }

  items.innerHTML =
    state.cart.map((item, index) => `

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
              item.price * item.qty
            )}
          </div>

        </div>

        <div class="qty">

          <button
            type="button"
            onclick="changeQty(${index}, -1)"
          >
            −
          </button>

          <span>
            ${item.qty}
          </span>

          <button
            type="button"
            onclick="changeQty(${index}, 1)"
          >
            +
          </button>

        </div>

        <button
          type="button"
          class="remove-item"
          onclick="removeCartItem(${index})"
        >
          Remove
        </button>

      </div>

    `).join("");
}


/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveCart() {

  localStorage.setItem(
    "everything_everything_cart",
    JSON.stringify(state.cart)
  );

}


function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        "everything_everything_cart"
      );

    state.cart =
      saved
        ? JSON.parse(saved)
        : [];

  } catch {

    state.cart = [];

  }
}


/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {

  const drawer =
    document.querySelector("#cartDrawer");

  if (!drawer) return;

  drawer.classList.add("open");

  drawer.setAttribute(
    "aria-hidden",
    "false"
  );
}


function closeCart() {

  const drawer =
    document.querySelector("#cartDrawer");

  if (!drawer) return;

  drawer.classList.remove("open");

  drawer.setAttribute(
    "aria-hidden",
    "true"
  );
}


/* =========================================================
   CHECKOUT MODAL
========================================================= */

function openCheckout() {

  if (!state.cart.length) {

    alert(
      "Your basket is empty. Add something before checking out."
    );

    return;
  }

  const modal =
    document.querySelector("#modal");

  if (!modal) return;

  modal.classList.remove("hidden");
}


function closeCheckout() {

  const modal =
    document.querySelector("#modal");

  if (!modal) return;

  modal.classList.add("hidden");
}


/* =========================================================
   WHATSAPP CHECKOUT
========================================================= */

function sendOrderToWhatsApp(customer) {

  if (!state.cart.length) {
    return;
  }

  const total =
    state.cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );

  const orderNumber =
    `EE-${Date.now()}`;

  let message = "";

  message +=
    `*EVERYTHING EVERYTHING*\n`;

  message +=
    `*NEW ORDER*\n\n`;

  message +=
    `Order No: ${orderNumber}\n\n`;

  message +=
    `*CUSTOMER DETAILS*\n`;

  message +=
    `Name: ${customer.name}\n`;

  message +=
    `Phone: ${customer.phone}\n`;

  message +=
    `Email: ${customer.email}\n`;

  message +=
    `Delivery Location: ${customer.address}\n\n`;

  message +=
    `*ORDER ITEMS*\n`;

  state.cart.forEach((item, index) => {

    message +=
      `${index + 1}. ${item.name}\n`;

    message +=
      `   Quantity: ${item.qty}\n`;

    message +=
      `   Price: GH₵${money(
        item.price
      )}\n`;

    message +=
      `   Subtotal: GH₵${money(
        item.price * item.qty
      )}\n`;

    if (item.meta) {

      message +=
        `   Selection: ${item.meta}\n`;

    }

    message += "\n";

  });

  message +=
    `*TOTAL: GH₵${money(total)}*\n\n`;

  message +=
    `Please confirm my order.`;

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================================================
   CHECKOUT FORM
========================================================= */

function handleCheckout(event) {

  event.preventDefault();

  const form =
    new FormData(event.target);

  const customer = {

    name:
      String(
        form.get("name") || ""
      ).trim(),

    phone:
      String(
        form.get("phone") || ""
      ).trim(),

    email:
      String(
        form.get("email") || ""
      ).trim(),

    address:
      String(
        form.get("address") || ""
      ).trim()

  };

  if (
    !customer.name ||
    !customer.phone ||
    !customer.email ||
    !customer.address
  ) {

    alert(
      "Please complete all your delivery details."
    );

    return;
  }

  sendOrderToWhatsApp(customer);
}


/* =========================================================
   HAMBURGER MENU
   Supports common IDs/classes so it can work with
   the redesigned header when we add the button.
========================================================= */

function setupHamburger() {

  const button =
    document.querySelector(
      "#hamburger, #menuBtn, .hamburger, .menu-btn"
    );

  const menu =
    document.querySelector(
      "#mobileMenu, #mobileNav, .mobile-menu, .mobile-nav"
    );

  if (!button || !menu) return;

  button.addEventListener(
    "click",
    () => {

      const open =
        menu.classList.toggle("open");

      button.classList.toggle(
        "active",
        open
      );

      button.setAttribute(
        "aria-expanded",
        String(open)
      );

      menu.setAttribute(
        "aria-hidden",
        String(!open)
      );

    }
  );

  menu.querySelectorAll("a").forEach(link => {

    link.addEventListener(
      "click",
      () => {

        menu.classList.remove("open");

        button.classList.remove(
          "active"
        );

        button.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });
}


/* =========================================================
   SEARCH BUTTON
========================================================= */

function setupSearchButton() {

  const button =
    document.querySelector(
      "#searchBtn, .search-btn"
    );

  const search =
    document.querySelector(
      "#searchBox, #searchInput, .search-box"
    );

  if (!button || !search) return;

  button.addEventListener(
    "click",
    () => {

      search.classList.toggle("open");

      if (
        search.matches("input") &&
        search.classList.contains("open")
      ) {
        search.focus();
      }

    }
  );
}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });
}


/* =========================================================
   MODAL
========================================================= */

function setupModal() {

  const modal =
    document.querySelector("#modal");

  if (!modal) return;

  modal.addEventListener(
    "click",
    event => {

      if (event.target === modal) {
        closeCheckout();
      }

    }
  );
}


/* =========================================================
   KEYBOARD
========================================================= */

function setupKeyboard() {

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeCart();

        closeCheckout();

      }

    }
  );
}


/* =========================================================
   BUTTONS
========================================================= */

function setupButtons() {

  const cartButton =
    document.querySelector("#cartBtn");

  const closeCartButton =
    document.querySelector("#closeCart");

  const checkoutButton =
    document.querySelector("#checkoutBtn");

  const closeModal =
    document.querySelector("#closeModal");

  const checkoutForm =
    document.querySelector("#checkoutForm");

  const mealSelect =
    document.querySelector("#mealSelect");

  const addPlatter =
    document.querySelector("#addPlatter");


  if (cartButton) {
    cartButton.addEventListener(
      "click",
      openCart
    );
  }

  if (closeCartButton) {
    closeCartButton.addEventListener(
      "click",
      closeCart
    );
  }

  if (checkoutButton) {
    checkoutButton.addEventListener(
      "click",
      openCheckout
    );
  }

  if (closeModal) {
    closeModal.addEventListener(
      "click",
      closeCheckout
    );
  }

  if (checkoutForm) {
    checkoutForm.addEventListener(
      "submit",
      handleCheckout
    );
  }

  if (mealSelect) {
    mealSelect.addEventListener(
      "change",
      renderIngredients
    );
  }

  if (addPlatter) {
    addPlatter.addEventListener(
      "click",
      addPlatterToCart
    );
  }
}


/* =========================================================
   INITIALIZE
========================================================= */

function initStore() {

  loadCart();

  renderFilters();

  renderProducts();

  renderMeals();

  renderCart();

  setupButtons();

  setupSearch();

  setupSearchButton();

  setupHamburger();

  setupNavigation();

  setupModal();

  setupKeyboard();

  console.log(
    "Everything Everything store loaded."
  );

}


document.addEventListener(
  "DOMContentLoaded",
  initStore
);
