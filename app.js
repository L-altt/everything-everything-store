/* =========================================================
   EVERYTHING EVERYTHING
   STORE APPLICATION
   CUSTOM BUILD SYSTEM
========================================================= */


/* =========================================================
   SAMPLE STORE DATA
   Replace these products with your real products later.
========================================================= */

const products = [

  /* =======================================================
     GROCERIES
  ======================================================= */

  {
    id: "grocery-rice",
    name: "Rice",
    category: "Groceries",
    price: 25,
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
    id: "grocery-tomato",
    name: "Tomatoes",
    category: "Groceries",
    price: 15,
    image: "assets/images/products/tomatoes.jpg"
  },

  {
    id: "grocery-onion",
    name: "Onions",
    category: "Groceries",
    price: 10,
    image: "assets/images/products/onions.jpg"
  },

  {
    id: "grocery-chicken",
    name: "Chicken",
    category: "Groceries",
    price: 40,
    image: "assets/images/products/chicken.jpg"
  },

  {
    id: "grocery-egg",
    name: "Eggs",
    category: "Groceries",
    price: 15,
    image: "assets/images/products/eggs.jpg"
  },

  {
    id: "grocery-bread",
    name: "Bread",
    category: "Groceries",
    price: 12,
    image: "assets/images/products/bread.jpg"
  },

  {
    id: "grocery-sausage",
    name: "Sausage",
    category: "Groceries",
    price: 20,
    image: "assets/images/products/sausage.jpg"
  },

  {
    id: "grocery-plantain",
    name: "Plantain",
    category: "Groceries",
    price: 18,
    image: "assets/images/products/plantain.jpg"
  },

  {
    id: "grocery-salad",
    name: "Fresh Salad",
    category: "Groceries",
    price: 15,
    image: "assets/images/products/salad.jpg"
  },


  /* =======================================================
     CLOTHING
  ======================================================= */

  {
    id: "clothing-shirt",
    name: "Classic T-Shirt",
    category: "Clothing",
    price: 120,
    image: "assets/images/products/shirt.jpg"
  },

  {
    id: "clothing-hoodie",
    name: "Signature Hoodie",
    category: "Clothing",
    price: 250,
    image: "assets/images/products/hoodie.jpg"
  },

  {
    id: "clothing-dress",
    name: "Everyday Dress",
    category: "Clothing",
    price: 220,
    image: "assets/images/products/dress.jpg"
  },

  {
    id: "clothing-trousers",
    name: "Classic Trousers",
    category: "Clothing",
    price: 180,
    image: "assets/images/products/trousers.jpg"
  },


  /* =======================================================
     JEWELRY
  ======================================================= */

  {
    id: "jewelry-necklace",
    name: "Signature Necklace",
    category: "Jewelry",
    price: 180,
    image: "assets/images/products/necklace.jpg"
  },

  {
    id: "jewelry-bracelet",
    name: "Classic Bracelet",
    category: "Jewelry",
    price: 100,
    image: "assets/images/products/bracelet.jpg"
  },

  {
    id: "jewelry-earrings",
    name: "Elegant Earrings",
    category: "Jewelry",
    price: 130,
    image: "assets/images/products/earrings.jpg"
  },

  {
    id: "jewelry-ring",
    name: "Signature Ring",
    category: "Jewelry",
    price: 150,
    image: "assets/images/products/ring.jpg"
  },


  /* =======================================================
     GIFTS
  ======================================================= */

  {
    id: "gift-box",
    name: "Everything Gift Box",
    category: "Gifts",
    price: 150,
    image: "assets/images/products/gift-box.jpg"
  },

  {
    id: "gift-basket",
    name: "Premium Gift Basket",
    category: "Gifts",
    price: 250,
    image: "assets/images/products/gift-basket.jpg"
  },

  {
    id: "gift-card",
    name: "Gift Card",
    category: "Gifts",
    price: 100,
    image: "assets/images/products/gift-card.jpg"
  },

  {
    id: "gift-special",
    name: "Special Gift Set",
    category: "Gifts",
    price: 300,
    image: "assets/images/products/gift-set.jpg"
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
   MEAL / RECIPE GROUPS
=========================================================

   These are NOT products.

   They simply group existing grocery products together.

   Customers can still deselect individual ingredients.
========================================================= */

const mealGroups = [

  {
    id: "jollof",
    name: "Jollof Rice",

    description:
      "A complete jollof combination.",

    ingredients: [

      {
        productId: "grocery-rice",
        quantity: 1
      },

      {
        productId: "grocery-oil",
        quantity: 1
      },

      {
        productId: "grocery-tomato",
        quantity: 1
      },

      {
        productId: "grocery-onion",
        quantity: 1
      },

      {
        productId: "grocery-chicken",
        quantity: 1
      }

    ]

  },


  {
    id: "breakfast",
    name: "Breakfast",

    description:
      "A simple breakfast combination.",

    ingredients: [

      {
        productId: "grocery-bread",
        quantity: 1
      },

      {
        productId: "grocery-egg",
        quantity: 1
      },

      {
        productId: "grocery-sausage",
        quantity: 1
      }

    ]

  },


  {
    id: "special-meal",
    name: "Special Meal",

    description:
      "A larger meal combination.",

    ingredients: [

      {
        productId: "grocery-rice",
        quantity: 1
      },

      {
        productId: "grocery-chicken",
        quantity: 1
      },

      {
        productId: "grocery-plantain",
        quantity: 1
      },

      {
        productId: "grocery-salad",
        quantity: 1
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

  mealGroups,

  cart: [],

  filter: "all",

  search: "",

  sort: "default",

  builderSelections: []

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


function getProduct(id) {

  return state.products.find(
    product => product.id === id
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
        this.parentElement.classList.add('image-error');
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
      >
        ${escapeHtml(category.name)}
      </button>

    `).join("")}

  `;


  element
    .querySelectorAll(".filter")
    .forEach(button => {

      button.addEventListener("click", () => {

        state.filter =
          button.dataset.filter;

        renderFilters();

        renderProducts();

      });

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getFilteredProducts() {

  let list = [
    ...state.products
  ];


  if (state.filter !== "all") {

    list = list.filter(product => {

      return (
        product.category.toLowerCase() ===
        state.filter
      );

    });

  }


  if (state.search.trim()) {

    const query =
      state.search.toLowerCase();

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


  if (state.sort === "price-low") {

    list.sort(
      (a, b) => a.price - b.price
    );

  }


  if (state.sort === "price-high") {

    list.sort(
      (a, b) => b.price - a.price
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

        const category =
          card.dataset.category
            ?.toLowerCase();

        if (!category) return;


        state.filter =
          category;


        document
          .querySelector("#shop")
          ?.scrollIntoView({
            behavior: "smooth"
          });


        renderFilters();

        renderProducts();

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

  setTimeout(
    () => searchInput?.focus(),
    100
  );

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


  document
    .querySelector("#shop")
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


searchOverlay?.addEventListener(
  "click",
  event => {

    if (
      event.target === searchOverlay
    ) {

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
      mainNav.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      open
        ? "true"
        : "false"
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
   BUILD A PLATTER
=========================================================

   The builder now works with ALL store categories.

   Customers can:

   1. Choose a meal/recipe.
   2. See its ingredients.
   3. Deselect individual ingredients.
   4. Add clothing.
   5. Add jewelry.
   6. Add gifts.
   7. Add individual groceries.
   8. See the combined total.
   9. Add the complete custom selection to basket.
========================================================= */


/* =========================================================
   BUILDER STATE
========================================================= */

function clearBuilder() {

  state.builderSelections = [];

  document
    .querySelectorAll(
      ".builder-product-check"
    )
    .forEach(input => {

      input.checked = false;

    });

  document
    .querySelectorAll(
      ".ingredient-check"
    )
    .forEach(input => {

      input.checked = false;

    });

  updateBuilderTotal();

}


/* =========================================================
   ADD BUILDER ITEM
========================================================= */

function addBuilderItem(
  productId,
  quantity = 1
) {

  const product =
    getProduct(productId);

  if (!product) return;


  const existing =
    state.builderSelections.find(
      item =>
        item.productId === productId
    );


  if (existing) {

    existing.quantity += quantity;

  } else {

    state.builderSelections.push({

      productId,

      quantity

    });

  }


  updateBuilderTotal();

}


/* =========================================================
   REMOVE BUILDER ITEM
========================================================= */

function removeBuilderItem(
  productId
) {

  state.builderSelections =
    state.builderSelections.filter(
      item =>
        item.productId !== productId
    );

  updateBuilderTotal();

}


/* =========================================================
   TOGGLE BUILDER ITEM
========================================================= */

function toggleBuilderItem(
  productId,
  checked
) {

  if (checked) {

    addBuilderItem(productId);

  } else {

    removeBuilderItem(productId);

  }

}


/* =========================================================
   BUILD MEAL
========================================================= */

function loadMealIntoBuilder(
  mealId
) {

  const meal =
    state.mealGroups.find(
      item => item.id === mealId
    );

  if (!meal) return;


  /* Remove previous grocery selections */

  meal.ingredients.forEach(
    ingredient => {

      removeBuilderItem(
        ingredient.productId
      );

    }
  );


  /* Add meal ingredients */

  meal.ingredients.forEach(
    ingredient => {

      addBuilderItem(
        ingredient.productId,
        ingredient.quantity || 1
      );

    }
  );


  syncBuilderCheckboxes();

  updateBuilderTotal();

}


/* =========================================================
   SYNC CHECKBOXES
========================================================= */

function syncBuilderCheckboxes() {

  const selectedIds =
    new Set(
      state.builderSelections.map(
        item => item.productId
      )
    );


  document
    .querySelectorAll(
      ".builder-product-check, .ingredient-check"
    )
    .forEach(input => {

      input.checked =
        selectedIds.has(
          input.value
        );

    });

}


/* =========================================================
   BUILDER TOTAL
========================================================= */

function getBuilderTotal() {

  return state.builderSelections
    .reduce(
      (total, selection) => {

        const product =
          getProduct(
            selection.productId
          );

        if (!product) {
          return total;
        }

        return (
          total +
          product.price *
          selection.quantity
        );

      },
      0
    );

}


function updateBuilderTotal() {

  const total =
    getBuilderTotal();


  const element =
    document.querySelector(
      "#platterTotal"
    );


  if (element) {

    element.textContent =
      money(total);

  }


  const addButton =
    document.querySelector(
      "#addPlatter"
    );


  if (addButton) {

    addButton.disabled =
      state.builderSelections.length === 0;

  }


  renderBuilderSummary();

}


/* =========================================================
   BUILDER SUMMARY
========================================================= */

function renderBuilderSummary() {

  const summary =
    document.querySelector(
      "#builderSummary"
    );


  if (!summary) return;


  if (
    !state.builderSelections.length
  ) {

    summary.innerHTML = `

      <p class="loading">
        Nothing selected yet.
      </p>

    `;

    return;

  }


  summary.innerHTML =
    state.builderSelections
      .map(selection => {

        const product =
          getProduct(
            selection.productId
          );

        if (!product) return "";


        return `

          <div class="ingredient">

            <label>

              <input
                type="checkbox"
                class="builder-summary-check"
                value="${product.id}"
                checked
              >

              ${escapeHtml(
                product.name
              )}

            </label>

            <span>
              GH₵${money(
                product.price *
                selection.quantity
              )}
            </span>

          </div>

        `;

      })
      .join("");


  summary
    .querySelectorAll(
      ".builder-summary-check"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        event => {

          toggleBuilderItem(
            event.target.value,
            event.target.checked
          );

          syncBuilderCheckboxes();

        }
      );

    });

}


/* =========================================================
   RENDER MEAL GROUPS
========================================================= */

function renderMealGroups() {

  const select =
    document.querySelector(
      "#mealSelect"
    );

  if (!select) return;


  select.innerHTML = `

    <option value="">
      Choose a prepared meal
    </option>

    ${state.mealGroups.map(
      meal => `

        <option value="${meal.id}">
          ${escapeHtml(meal.name)}
        </option>

      `
    ).join("")}

  `;

}


/* =========================================================
   RENDER MEAL INGREDIENTS
========================================================= */

function renderIngredients() {

  const select =
    document.querySelector(
      "#mealSelect"
    );

  const list =
    document.querySelector(
      "#ingredientList"
    );


  if (!select || !list) {
    return;
  }


  const meal =
    state.mealGroups.find(
      item =>
        item.id === select.value
    );


  if (!meal) {

    list.innerHTML = "";

    return;

  }


  list.innerHTML =
    meal.ingredients
      .map(ingredient => {

        const product =
          getProduct(
            ingredient.productId
          );

        if (!product) return "";


        const selected =
          state.builderSelections.some(
            item =>
              item.productId ===
              product.id
          );


        return `

          <div class="ingredient">

            <label>

              <input
                type="checkbox"
                class="ingredient-check"
                value="${product.id}"
                ${selected ? "checked" : ""}
              >

              ${escapeHtml(
                product.name
              )}

            </label>

            <span>
              GH₵${money(
                product.price *
                (ingredient.quantity || 1)
              )}
            </span>

          </div>

        `;

      })
      .join("");


  list
    .querySelectorAll(
      ".ingredient-check"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        event => {

          toggleBuilderItem(
            event.target.value,
            event.target.checked
          );

          updateBuilderTotal();

        }
      );

    });

}


/* =========================================================
   RENDER ALL BUILDER PRODUCTS
========================================================= */

function renderBuilderProducts() {

  const container =
    document.querySelector(
      "#builderProducts"
    );


  if (!container) return;


  const grouped = {};


  state.products.forEach(
    product => {

      if (!grouped[product.category]) {

        grouped[product.category] = [];

      }

      grouped[
        product.category
      ].push(product);

    }
  );


  container.innerHTML =
    Object.entries(grouped)
      .map(
        ([category, categoryProducts]) => `

          <div class="builder-category">

            <h3>
              ${escapeHtml(category)}
            </h3>

            <div class="ingredient-list">

              ${categoryProducts
                .map(product => {

                  const selected =
                    state.builderSelections.some(
                      item =>
                        item.productId ===
                        product.id
                    );


                  return `

                    <div class="ingredient">

                      <label>

                        <input
                          type="checkbox"
                          class="builder-product-check"
                          value="${product.id}"
                          ${
                            selected
                              ? "checked"
                              : ""
                          }
                        >

                        ${escapeHtml(
                          product.name
                        )}

                      </label>

                      <span>
                        GH₵${money(
                          product.price
                        )}
                      </span>

                    </div>

                  `;

                })
                .join("")}

            </div>

          </div>

        `
      )
      .join("");


  container
    .querySelectorAll(
      ".builder-product-check"
    )
    .forEach(input => {

      input.addEventListener(
        "change",
        event => {

          toggleBuilderItem(
            event.target.value,
            event.target.checked
          );

        }
      );

    });

}


/* =========================================================
   MEAL SELECT
========================================================= */

document
  .querySelector("#mealSelect")
  ?.addEventListener(
    "change",
    () => {

      const meal =
        state.mealGroups.find(
          item =>
            item.id ===
            document.querySelector(
              "#mealSelect"
            )?.value
        );


      if (!meal) {

        return;

      }


      loadMealIntoBuilder(
        meal.id
      );

      renderIngredients();

    }
  );


/* =========================================================
   ADD CUSTOM BUILD TO CART
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener(
    "click",
    () => {

      if (
        !state.builderSelections.length
      ) {

        return;

      }


      const items =
        state.builderSelections
          .map(selection => {

            const product =
              getProduct(
                selection.productId
              );

            if (!product) {
              return null;
            }


            return {

              productId:
                product.id,

              name:
                product.name,

              category:
                product.category,

              price:
                Number(product.price),

              quantity:
                selection.quantity

            };

          })
          .filter(Boolean);


      if (!items.length) {
        return;
      }


      const total =
        items.reduce(
          (sum, item) =>
            sum +
            item.price *
            item.quantity,
          0
        );


      state.cart.push({

        id:
          `custom-${Date.now()}`,

        name:
          "Custom Everything Build",

        price:
          total,

        qty:
          1,

        meta:
          items
            .map(
              item =>
                `${item.name} x${item.quantity}`
            )
            .join(", "),

        customItems:
          items

      });


      saveCart();

      renderCart();

      openCart();

    }
  );


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
    getProduct(id);

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
        Number(product.price),

      qty:
        1

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
        sum +
        Number(item.qty),
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
          Add something you love
          to get started.
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
                    item.price *
                    item.qty
                  )}
                </div>


                <button
                  class="remove-item"
                  onclick="removeCartItem(${index})"
                >
                  Remove
                </button>

              </div>


              <div class="qty">

                <button
                  onclick="changeQty(
                    ${index},
                    -1
                  )"
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  onclick="changeQty(
                    ${index},
                    1
                  )"
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
        Number(item.price) *
        Number(item.qty),
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

function removeCartItem(index) {

  if (!state.cart[index]) {
    return;
  }


  state.cart.splice(
    index,
    1
  );


  saveCart();

  renderCart();

}


window.removeCartItem =
  removeCartItem;


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeQty(
  index,
  amount
) {

  if (!state.cart[index]) {
    return;
  }


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


  modal
    ?.classList.remove(
      "hidden"
    );

}


function closeCheckout() {

  modal
    ?.classList.add(
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
   CHECKOUT → WHATSAPP
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
        JSON.stringify(
          customer
        )
      );


      const total =
        state.cart.reduce(
          (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.qty),
          0
        );


      let message =
        "Hello Everything Everything! 👋\n\n";

      message +=
        "I would like to place an order.\n\n";


      message +=
        "CUSTOMER DETAILS\n";

      message +=
        `Name: ${customer.name}\n`;

      message +=
        `Phone: ${customer.phone}\n`;

      message +=
        `Email: ${customer.email}\n`;

      message +=
        `Delivery location: ${customer.address}\n\n`;


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


          if (item.customItems) {

            message +=
              "Selected items:\n";


            item.customItems
              .forEach(
                customItem => {

                  message +=
                    `- ${customItem.name}` +
                    ` x${customItem.quantity}` +
                    ` (${customItem.category})\n`;

                }
              );

          }


          if (
            item.meta &&
            !item.customItems
          ) {

            message +=
              `Details: ${item.meta}\n`;

          }


          message +=
            `Subtotal: GH₵${money(
              item.price *
              item.qty
            )}\n\n`;

        }
      );


      message +=
        `TOTAL: GH₵${money(
          total
        )}\n\n`;


      message +=
        "Please confirm my order and let me know the next steps. Thank you!";


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


      if (!email) {
        return;
      }


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
      event.key !== "Escape"
    ) {

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

  renderMealGroups();

  renderIngredients();

  renderBuilderProducts();

  renderBuilderSummary();

  renderCart();

}


initializeStore();
