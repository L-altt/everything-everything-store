/* =========================================================
   EVERYTHING EVERYTHING — STORE ENGINE
   Phase 1
   No Supabase required
========================================================= */

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
  filter: "all"
};


/* =========================================================
   HELPERS
========================================================= */

const money = value => {
  return Number(value || 0).toFixed(2);
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[character];
  });
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts() {

  const productGrid = document.querySelector("#productGrid");

  if (!productGrid) return;

  let products = state.products;

  if (state.filter !== "all") {
    products = products.filter(
      product => product.category === state.filter
    );
  }

  if (!products.length) {

    productGrid.innerHTML = `
      <div class="loading">
        No products available in this category yet.
      </div>
    `;

    return;
  }

  productGrid.innerHTML = products.map(product => {

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
            ${escapeHtml(getCategoryName(product.category))}
          </small>

          <h3>
            ${escapeHtml(product.name)}
          </h3>

          <p class="product-description">
            ${escapeHtml(product.description || "")}
          </p>

          <div class="product-bottom">

            <span class="price">
              GH₵${money(product.price)}
            </span>

          </div>

          <button
            class="btn primary"
            onclick="addProduct('${product.id}')"
          >
            Add to basket
          </button>

        </div>

      </article>
    `;

  }).join("");
}


function getCategoryName(slug) {

  const category = state.categories.find(
    category => category.slug === slug
  );

  return category ? category.name : "SHOP";
}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

function renderFilters() {

  const container = document.querySelector("#categoryFilters");

  if (!container) return;

  container.innerHTML = state.categories.map(category => {

    return `
      <button
        class="filter ${state.filter === category.slug ? "active" : ""}"
        data-filter="${category.slug}"
      >
        ${escapeHtml(category.name)}
      </button>
    `;

  }).join("");

  container.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

      state.filter = button.dataset.filter;

      container
        .querySelectorAll(".filter")
        .forEach(item => item.classList.remove("active"));

      button.classList.add("active");

      renderProducts();

    });

  });
}


/* =========================================================
   PLATTER BUILDER
========================================================= */

function renderMeals() {

  const mealSelect = document.querySelector("#mealSelect");

  if (!mealSelect) return;

  mealSelect.innerHTML = `
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

  const mealSelect = document.querySelector("#mealSelect");

  const ingredientList = document.querySelector("#ingredientList");

  const totalElement = document.querySelector("#platterTotal");

  const addButton = document.querySelector("#addPlatter");

  if (!mealSelect || !ingredientList) return;

  const meal = state.meals.find(
    meal => meal.id === mealSelect.value
  );

  if (!meal) {

    ingredientList.innerHTML = "";

    if (totalElement) {
      totalElement.textContent = "0.00";
    }

    if (addButton) {
      addButton.disabled = true;
    }

    return;
  }

  ingredientList.innerHTML = meal.ingredients.map(ingredient => {

    return `
      <div class="ingredient">

        <label>

          <input
            type="checkbox"
            class="ingredient-check"
            value="${ingredient.id}"
            data-name="${escapeHtml(ingredient.name)}"
            data-price="${ingredient.price}"
          >

          ${escapeHtml(ingredient.name)}

        </label>

        <span>
          GH₵${money(ingredient.price)}
        </span>

      </div>
    `;

  }).join("");

  ingredientList
    .querySelectorAll(".ingredient-check")
    .forEach(checkbox => {

      checkbox.addEventListener(
        "change",
        updatePlatterTotal
      );

    });

  updatePlatterTotal();
}


function updatePlatterTotal() {

  const totalElement =
    document.querySelector("#platterTotal");

  const addButton =
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
    totalElement.textContent = money(total);
  }

  if (addButton) {
    addButton.disabled = total <= 0;
  }
}


function addPlatterToCart() {

  const mealSelect =
    document.querySelector("#mealSelect");

  if (!mealSelect) return;

  const meal = state.meals.find(
    meal => meal.id === mealSelect.value
  );

  if (!meal) return;

  const selected =
    [...document.querySelectorAll(
      ".ingredient-check:checked"
    )];

  if (!selected.length) return;

  const ingredients = selected.map(item => ({
    id: item.value,
    name: item.dataset.name,
    price: Number(item.dataset.price)
  }));

  const total = ingredients.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const platter = {

    id: `platter-${Date.now()}`,

    name: `Custom ${meal.name}`,

    price: total,

    qty: 1,

    meta: ingredients
      .map(item => item.name)
      .join(", ")

  };

  state.cart.push(platter);

  saveCart();

  renderCart();

  openCart();
}


/* =========================================================
   CART
========================================================= */

function addProduct(id) {

  const product = state.products.find(
    product => product.id === id
  );

  if (!product) return;

  const existing = state.cart.find(
    item => item.id === id
  );

  if (existing) {

    existing.qty += 1;

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


function changeQty(index, amount) {

  const item = state.cart[index];

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {

    state.cart.splice(index, 1);

  }

  saveCart();

  renderCart();
}


window.changeQty = changeQty;


function removeCartItem(index) {

  state.cart.splice(index, 1);

  saveCart();

  renderCart();
}


window.removeCartItem = removeCartItem;


function renderCart() {

  const cartCount =
    document.querySelector("#cartCount");

  const cartItems =
    document.querySelector("#cartItems");

  const cartTotal =
    document.querySelector("#cartTotal");

  const itemCount = state.cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const total = state.cart.reduce(
    (total, item) =>
      total + item.price * item.qty,
    0
  );

  if (cartCount) {
    cartCount.textContent = itemCount;
  }

  if (cartTotal) {
    cartTotal.textContent = money(total);
  }

  if (!cartItems) return;

  if (!state.cart.length) {

    cartItems.innerHTML = `
      <div class="loading">
        Your basket is empty.
      </div>
    `;

    return;
  }

  cartItems.innerHTML = state.cart.map(
    (item, index) => {

      return `
        <div class="cart-row">

          <div>

            <b>
              ${escapeHtml(item.name)}
            </b>

            ${
              item.meta
                ? `<small>${escapeHtml(item.meta)}</small>`
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

          <button
            class="remove-item"
            onclick="removeCartItem(${index})"
          >
            Remove
          </button>

        </div>
      `;

    }
  ).join("");
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

    state.cart = saved
      ? JSON.parse(saved)
      : [];

  } catch (error) {

    console.error(
      "Could not load basket:",
      error
    );

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

    alert("Your basket is empty.");

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
   CHECKOUT
========================================================= */

function handleCheckout(event) {

  event.preventDefault();

  const form =
    new FormData(event.target);

  const customer = {

    name: form.get("name"),

    phone: form.get("phone"),

    email: form.get("email"),

    address: form.get("address")

  };

  const order = {

    orderNumber:
      `EE-${Date.now()}`,

    customer,

    items: state.cart,

    total: state.cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    ),

    createdAt:
      new Date().toISOString()

  };

  console.log(
    "ORDER CREATED:",
    order
  );

  const status =
    document.querySelector("#checkoutStatus");

  if (status) {

    status.textContent =
      `Order ${order.orderNumber} prepared successfully.`;

  }

  /*
    PAYMENT WILL BE CONNECTED LATER.

    For now, we don't send anything to
    Supabase or Paystack.
  */

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
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
   KEYBOARD SUPPORT
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
   INITIALIZATION
========================================================= */

function initStore() {

  loadCart();

  renderFilters();

  renderProducts();

  renderMeals();

  renderCart();

  setupNavigation();

  setupModal();

  setupKeyboard();


  const mealSelect =
    document.querySelector("#mealSelect");

  if (mealSelect) {

    mealSelect.addEventListener(
      "change",
      renderIngredients
    );

  }


  const addPlatter =
    document.querySelector("#addPlatter");

  if (addPlatter) {

    addPlatter.addEventListener(
      "click",
      addPlatterToCart
    );

  }


  const cartButton =
    document.querySelector("#cartBtn");

  if (cartButton) {

    cartButton.addEventListener(
      "click",
      openCart
    );

  }


  const closeCartButton =
    document.querySelector("#closeCart");

  if (closeCartButton) {

    closeCartButton.addEventListener(
      "click",
      closeCart
    );

  }


  const checkoutButton =
    document.querySelector("#checkoutBtn");

  if (checkoutButton) {

    checkoutButton.addEventListener(
      "click",
      openCheckout
    );

  }


  const closeModal =
    document.querySelector("#closeModal");

  if (closeModal) {

    closeModal.addEventListener(
      "click",
      closeCheckout
    );

  }


  const checkoutForm =
    document.querySelector("#checkoutForm");

  if (checkoutForm) {

    checkoutForm.addEventListener(
      "submit",
      handleCheckout
    );

  }

}


/* =========================================================
   START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initStore
);
