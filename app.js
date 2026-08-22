/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
========================================================= */


/* =========================================================
   STORE PRODUCTS
========================================================= */

const products = [

  /* -------------------------
     GROCERIES
  ------------------------- */

  {
    id: "grocery-rice",
    name: "Premium Rice",
    category: "Groceries",
    price: 45,
    image: "assets/images/products/rice.jpg"
  },

  {
    id: "grocery-oil",
    name: "Cooking Oil",
    category: "Groceries",
    price: 35,
    image: "assets/images/products/oil.jpg"
  },

  {
    id: "grocery-tomatoes",
    name: "Fresh Tomatoes",
    category: "Groceries",
    price: 20,
    image: "assets/images/products/tomatoes.jpg"
  },

  {
    id: "grocery-onions",
    name: "Fresh Onions",
    category: "Groceries",
    price: 15,
    image: "assets/images/products/onions.jpg"
  },

  {
    id: "grocery-seasoning",
    name: "Seasoning",
    category: "Groceries",
    price: 12,
    image: "assets/images/products/seasoning.jpg"
  },

  {
    id: "grocery-drink",
    name: "Soft Drink",
    category: "Groceries",
    price: 10,
    image: "assets/images/products/drink.jpg"
  },


  /* -------------------------
     CLOTHING
  ------------------------- */

  {
    id: "clothing-tshirt",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 120,
    image: "assets/images/products/tshirt.jpg"
  },

  {
    id: "clothing-trousers",
    name: "Classic Trousers",
    category: "Clothing",
    price: 180,
    image: "assets/images/products/trousers.jpg"
  },

  {
    id: "clothing-cap",
    name: "Everyday Cap",
    category: "Clothing",
    price: 70,
    image: "assets/images/products/cap.jpg"
  },

  {
    id: "clothing-hoodie",
    name: "Signature Hoodie",
    category: "Clothing",
    price: 250,
    image: "assets/images/products/hoodie.jpg"
  },


  /* -------------------------
     JEWELRY
  ------------------------- */

  {
    id: "jewelry-necklace",
    name: "Classic Necklace",
    category: "Jewelry",
    price: 150,
    image: "assets/images/products/necklace.jpg"
  },

  {
    id: "jewelry-bracelet",
    name: "Everyday Bracelet",
    category: "Jewelry",
    price: 90,
    image: "assets/images/products/bracelet.jpg"
  },

  {
    id: "jewelry-earrings",
    name: "Classic Earrings",
    category: "Jewelry",
    price: 110,
    image: "assets/images/products/earrings.jpg"
  },

  {
    id: "jewelry-ring",
    name: "Signature Ring",
    category: "Jewelry",
    price: 130,
    image: "assets/images/products/ring.jpg"
  },


  /* -------------------------
     GIFTS
  ------------------------- */

  {
    id: "gift-perfume",
    name: "Signature Perfume",
    category: "Gifts",
    price: 220,
    image: "assets/images/products/perfume.jpg"
  },

  {
    id: "gift-chocolate",
    name: "Chocolate Box",
    category: "Gifts",
    price: 80,
    image: "assets/images/products/chocolate.jpg"
  },

  {
    id: "gift-card",
    name: "Greeting Card",
    category: "Gifts",
    price: 25,
    image: "assets/images/products/card.jpg"
  },

  {
    id: "gift-bag",
    name: "Premium Gift Bag",
    category: "Gifts",
    price: 40,
    image: "assets/images/products/gift-bag.jpg"
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
   BUILD YOUR OWN COLLECTIONS
=========================================================

   IMPORTANT:

   These are NOT products.

   They are combinations made from existing products.

   Each item can be individually selected/deselected.

========================================================= */

const meals = [

  /* =======================================================
     JOLLOF MEAL
  ======================================================== */

  {
    id: "jollof-meal",

    name: "Jollof Meal",

    ingredients: [

      {
        productId: "grocery-rice",
        name: "Bag of Rice",
        price: 45,
        defaultSelected: true
      },

      {
        productId: "grocery-oil",
        name: "Cooking Oil",
        price: 35,
        defaultSelected: true
      },

      {
        productId: "grocery-tomatoes",
        name: "Fresh Tomatoes",
        price: 20,
        defaultSelected: true
      },

      {
        productId: "grocery-onions",
        name: "Fresh Onions",
        price: 15,
        defaultSelected: true
      },

      {
        productId: "grocery-seasoning",
        name: "Seasoning",
        price: 12,
        defaultSelected: true
      },

      {
        productId: "grocery-drink",
        name: "Soft Drink",
        price: 10,
        defaultSelected: true
      }

    ]

  },


  /* =======================================================
     EVERYDAY OUTFIT
  ======================================================== */

  {
    id: "everyday-outfit",

    name: "Everyday Outfit",

    ingredients: [

      {
        productId: "clothing-tshirt",
        name: "Classic T-Shirt",
        price: 120,
        defaultSelected: true
      },

      {
        productId: "clothing-trousers",
        name: "Classic Trousers",
        price: 180,
        defaultSelected: true
      },

      {
        productId: "clothing-cap",
        name: "Everyday Cap",
        price: 70,
        defaultSelected: true
      }

    ]

  },


  /* =======================================================
     SIGNATURE OUTFIT
  ======================================================== */

  {
    id: "signature-outfit",

    name: "Signature Outfit",

    ingredients: [

      {
        productId: "clothing-tshirt",
        name: "Classic T-Shirt",
        price: 120,
        defaultSelected: true
      },

      {
        productId: "clothing-trousers",
        name: "Classic Trousers",
        price: 180,
        defaultSelected: true
      },

      {
        productId: "clothing-hoodie",
        name: "Signature Hoodie",
        price: 250,
        defaultSelected: true
      },

      {
        productId: "clothing-cap",
        name: "Everyday Cap",
        price: 70,
        defaultSelected: false
      }

    ]

  },


  /* =======================================================
     JEWELRY SET
  ======================================================== */

  {
    id: "jewelry-set",

    name: "Jewelry Set",

    ingredients: [

      {
        productId: "jewelry-necklace",
        name: "Classic Necklace",
        price: 150,
        defaultSelected: true
      },

      {
        productId: "jewelry-bracelet",
        name: "Everyday Bracelet",
        price: 90,
        defaultSelected: true
      },

      {
        productId: "jewelry-earrings",
        name: "Classic Earrings",
        price: 110,
        defaultSelected: true
      },

      {
        productId: "jewelry-ring",
        name: "Signature Ring",
        price: 130,
        defaultSelected: false
      }

    ]

  },


  /* =======================================================
     BIRTHDAY GIFT
  ======================================================== */

  {
    id: "birthday-gift",

    name: "Birthday Gift",

    ingredients: [

      {
        productId: "gift-perfume",
        name: "Signature Perfume",
        price: 220,
        defaultSelected: true
      },

      {
        productId: "gift-chocolate",
        name: "Chocolate Box",
        price: 80,
        defaultSelected: true
      },

      {
        productId: "gift-card",
        name: "Greeting Card",
        price: 25,
        defaultSelected: true
      },

      {
        productId: "gift-bag",
        name: "Premium Gift Bag",
        price: 40,
        defaultSelected: true
      }

    ]

  },


  /* =======================================================
     EVERYTHING BOX

     This demonstrates that the builder can combine
     completely different categories.
  ======================================================== */

  {
    id: "everything-box",

    name: "Everything Box",

    ingredients: [

      {
        productId: "grocery-drink",
        name: "Soft Drink",
        price: 10,
        defaultSelected: true
      },

      {
        productId: "clothing-cap",
        name: "Everyday Cap",
        price: 70,
        defaultSelected: true
      },

      {
        productId: "jewelry-bracelet",
        name: "Everyday Bracelet",
        price: 90,
        defaultSelected: true
      },

      {
        productId: "gift-chocolate",
        name: "Chocolate Box",
        price: 80,
        defaultSelected: true
      },

      {
        productId: "gift-card",
        name: "Greeting Card",
        price: 25,
        defaultSelected: true
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
      src="${image}"
      alt="${escapeHtml(name)}"
      loading="lazy"
      onerror="
        this.style.display='none';
        this.parentElement.classList.add('image-error')
      "
    >

  `;

}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

function renderFilters() {

  const element =
    document.querySelector("#categoryFilters");

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
        data-filter="${category.slug}"
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

  let list = [
    ...state.products
  ];


  /* CATEGORY */

  if (state.filter !== "all") {

    list = list.filter(product => {

      return (
        product.category
          .toLowerCase() ===
        state.filter
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

  if (state.sort === "price-low") {

    list.sort(
      (a, b) =>
        a.price - b.price
    );

  }


  if (state.sort === "price-high") {

    list.sort(
      (a, b) =>
        b.price - a.price
    );

  }


  if (state.sort === "name") {

    list.sort(
      (a, b) =>
        a.name.localeCompare(b.name)
    );

  }


  return list;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

  const grid =
    document.querySelector("#productGrid");

  const count =
    document.querySelector("#productCount");


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

        <strong>
          No products found.
        </strong>

        <p>
          Try another category or search.
        </p>

      </div>

    `;

    return;

  }


  grid.innerHTML =
    list.map(product => `

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
            type="button"
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

document
  .querySelector("#sortProducts")
  ?.addEventListener(
    "change",
    event => {

      state.sort =
        event.target.value;

      renderProducts();

    }
  );


/* =========================================================
   CATEGORY CARDS
========================================================= */

document
  .querySelectorAll(".category-card")
  .forEach(card => {

    card.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const category =
          card.dataset.category
            ?.toLowerCase();


        if (!category) return;


        state.filter =
          category;


        renderFilters();

        renderProducts();


        document
          .querySelector("#shop")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

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

  searchOverlay.setAttribute(
    "aria-hidden",
    "false"
  );


  setTimeout(
    () => searchInput?.focus(),
    100
  );

}


function closeSearch() {

  searchOverlay?.classList.remove("open");

  searchOverlay?.setAttribute(
    "aria-hidden",
    "true"
  );

}


searchBtn?.addEventListener(
  "click",
  openSearch
);


searchClose?.addEventListener(
  "click",
  closeSearch
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


function performSearch() {

  state.search =
    searchInput?.value.trim() || "";


  state.filter =
    "all";


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


menuBtn?.addEventListener(
  "click",
  () => {

    const open =
      mainNav?.classList.toggle("open");


    menuBtn.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

  }
);


mainNav
  ?.querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mainNav.classList.remove(
          "open"
        );


        menuBtn?.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* =========================================================
   BUILD YOUR OWN
========================================================= */

function renderMeals() {

  const select =
    document.querySelector("#mealSelect");

  if (!select) return;


  select.innerHTML = `

    <option value="">
      Select a collection
    </option>

    ${state.meals.map(meal => `

      <option value="${meal.id}">
        ${escapeHtml(meal.name)}
      </option>

    `).join("")}

  `;

}


/* =========================================================
   RENDER BUILDER ITEMS
========================================================= */

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
      (ingredient, index) => `

        <div class="ingredient">

          <label>

            <input
              type="checkbox"
              class="ingredient-check"
              value="${escapeHtml(
                ingredient.productId
              )}"
              data-price="${ingredient.price}"
              data-name="${escapeHtml(
                ingredient.name
              )}"
              data-index="${index}"
              ${
                ingredient.defaultSelected
                  ? "checked"
                  : ""
              }
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
   UPDATE BUILDER TOTAL
========================================================= */

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
    document.querySelector(
      "#platterTotal"
    );

  const addButton =
    document.querySelector(
      "#addPlatter"
    );


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
   BUILDER SELECT CHANGE
========================================================= */

document
  .querySelector("#mealSelect")
  ?.addEventListener(
    "change",
    renderIngredients
  );


/* =========================================================
   ADD CUSTOM COLLECTION TO CART
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener(
    "click",
    () => {

      const mealId =
        document.querySelector(
          "#mealSelect"
        )?.value;


      const meal =
        state.meals.find(
          item =>
            item.id === mealId
        );


      if (!meal) return;


      const selected =
        [
          ...document.querySelectorAll(
            ".ingredient-check:checked"
          )
        ].map(item => ({

          productId:
            item.value,

          name:
            item.dataset.name,

          price:
            Number(
              item.dataset.price
            )

        }));


      if (!selected.length) {

        alert(
          "Please select at least one item."
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
          `custom-${Date.now()}`,

        name:
          `Custom ${meal.name}`,

        price,

        qty: 1,

        meta:
          selected
            .map(item =>
              item.name
            )
            .join(", ")

      });


      saveCart();

      renderCart();

      openCart();

    }
  );


/* =========================================================
   CART STORAGE
========================================================= */

function loadCart() {

  try {

    state.cart =
      JSON.parse(
        localStorage.getItem(
          "ee_cart"
        ) || "[]"
      );


    if (!Array.isArray(state.cart)) {

      state.cart = [];

    }

  } catch {

    state.cart = [];

  }

}


function saveCart() {

  localStorage.setItem(
    "ee_cart",
    JSON.stringify(
      state.cart
    )
  );

}


/* =========================================================
   ADD NORMAL PRODUCT
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
        item.id === id
    );


  if (existing) {

    existing.qty++;

  } else {

    state.cart.push({

      id:
        product.id,

      name:
        product.name,

      price:
        Number(
          product.price
        ),

      qty: 1

    });

  }


  saveCart();

  renderCart();

  openCart();

}


window.addProduct =
  addProduct;


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

  const count =
    document.querySelector(
      "#cartCount"
    );

  const items =
    document.querySelector(
      "#cartItems"
    );

  const total =
    document.querySelector(
      "#cartTotal"
    );


  const quantity =
    state.cart.reduce(
      (sum, item) =>
        sum + Number(item.qty || 0),
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

        <strong>
          Your basket is empty.
        </strong>

        <p>
          Add something you love to get started.
        </p>

      </div>

    `;

  } else {

    items.innerHTML =
      state.cart
        .map(
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
                    Number(item.price) *
                    Number(item.qty)
                  )}

                </div>


                <!-- REMOVE ITEM -->

                <button
                  class="remove-item"
                  type="button"
                  onclick="removeItem(${index})"
                >
                  Remove
                </button>

              </div>


              <div class="qty">

                <button
                  type="button"
                  onclick="changeQty(${index}, -1)"
                  aria-label="Decrease quantity"
                >
                  −
                </button>


                <span>
                  ${item.qty}
                </span>


                <button
                  type="button"
                  onclick="changeQty(${index}, 1)"
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

            </div>

          `
        )
        .join("");

  }


  const cartTotal =
    state.cart.reduce(
      (sum, item) =>
        sum +
        (
          Number(item.price) *
          Number(item.qty)
        ),
      0
    );


  if (total) {

    total.textContent =
      money(cartTotal);

  }

}


/* =========================================================
   REMOVE CART ITEM
========================================================= */

function removeItem(index) {

  if (!state.cart[index]) return;


  state.cart.splice(
    index,
    1
  );


  saveCart();

  renderCart();

}


window.removeItem =
  removeItem;


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQty(
  index,
  amount
) {

  if (!state.cart[index]) return;


  state.cart[index].qty =
    Number(
      state.cart[index].qty
    ) + amount;


  if (
    state.cart[index].qty <= 0
  ) {

    state.cart.splice(
      index,
      1
    );

  }


  saveCart();

  renderCart();

}


window.changeQty =
  changeQty;


/* =========================================================
   CART DRAWER
========================================================= */

const cartDrawer =
  document.querySelector(
    "#cartDrawer"
  );

const drawerOverlay =
  document.querySelector(
    "#drawerOverlay"
  );


function openCart() {

  cartDrawer?.classList.add(
    "open"
  );

  drawerOverlay?.classList.add(
    "open"
  );


  cartDrawer?.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCart() {

  cartDrawer?.classList.remove(
    "open"
  );

  drawerOverlay?.classList.remove(
    "open"
  );


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
  document.querySelector(
    "#modal"
  );


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


  modal?.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeCheckout() {

  modal?.classList.add(
    "hidden"
  );


  modal?.setAttribute(
    "aria-hidden",
    "true"
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
      event.target ===
      modal
    ) {

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

        alert(
          "Your basket is empty."
        );

        return;

      }


      const form =
        new FormData(
          event.target
        );


      const customer = {

        name:
          form.get("name") || "",

        phone:
          form.get("phone") || "",

        email:
          form.get("email") || "",

        address:
          form.get("address") || ""

      };


      localStorage.setItem(
        "ee_customer",
        JSON.stringify(
          customer
        )
      );


      /* =====================================================
         ORDER TOTAL
      ====================================================== */

      const total =
        state.cart.reduce(
          (sum, item) =>
            sum +
            (
              Number(item.price) *
              Number(item.qty)
            ),
          0
        );


      /* =====================================================
         WHATSAPP MESSAGE
      ====================================================== */

      let message =
        "Hello Everything Everything! 👋\n\n";


      message +=
        "I would like to place an order.\n\n";


      message +=
        "CUSTOMER DETAILS\n";


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


      message +=
        "ORDER DETAILS\n\n";


      state.cart.forEach(
        (item, index) => {

          message +=
            `${index + 1}. ${item.name}\n`;


          message +=
            `Quantity: ${item.qty}\n`;


          message +=
            `Price: GH₵${money(
              item.price
            )} each\n`;


          if (item.meta) {

            message +=
              `Selected items: ${item.meta}\n`;

          }


          message +=
            `Subtotal: GH₵${money(
              Number(item.price) *
              Number(item.qty)
            )}\n\n`;

        }
      );


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
        encodeURIComponent(
          message
        );


      closeCheckout();


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
   ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !==
      "Escape"
    ) {

      return;

    }


    closeSearch();

    closeCart();

    closeCheckout();

  }
);


/* =========================================================
   INITIALIZE STORE
========================================================= */

function initializeStore() {

  loadCart();

  renderFilters();

  renderProducts();

  renderMeals();

  renderCart();

}


initializeStore();
