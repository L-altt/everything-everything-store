/* =========================================================
   EVERYTHING EVERYTHING
   Store Application
   Universal Product + Platter System
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
   BUILD A PLATTER / COLLECTIONS
========================================================= */

/*
   Each collection contains product IDs.

   Every item starts SELECTED.

   The customer can remove individual items
   before adding the customized collection
   to the basket.
*/

const platters = [

  {
    id: "grocery-platter",
    name: "Grocery Platter",
    description: "Build your own grocery combination.",
    items: [
      "product-1",
      "product-2"
    ]
  },


  {
    id: "fashion-platter",
    name: "Fashion Set",
    description: "Create your own clothing combination.",
    items: [
      "product-3",
      "product-6"
    ]
  },


  {
    id: "jewelry-platter",
    name: "Jewelry Set",
    description: "Choose the jewelry pieces you want together.",
    items: [
      "product-4",
      "product-7"
    ]
  },


  {
    id: "gift-platter",
    name: "Gift Set",
    description: "Build a personalized gift combination.",
    items: [
      "product-5",
      "product-8"
    ]
  },


  /*
     This collection demonstrates that products
     from completely different categories can
     be combined together.
  */

  {
    id: "everything-platter",
    name: "Everything Collection",
    description: "Combine products from across the store.",
    items: [
      "product-1",
      "product-2",
      "product-3",
      "product-4",
      "product-5",
      "product-6",
      "product-7",
      "product-8"
    ]
  }

];


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {

  products,

  categories,

  platters,

  cart: [],

  filter: "all",

  search: "",

  sort: "default",

  selectedPlatter: null,

  selectedPlatterItems: []

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
   GET FILTERED PRODUCTS
========================================================= */

function getFilteredProducts() {

  let list = [...state.products];


  /* CATEGORY */

  if (state.filter !== "all") {

    list = list.filter(product => {

      return (
        product.category.toLowerCase() ===
        state.filter
      );

    });

  }


  /* SEARCH */

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


  /* SORT */

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

const sortProducts =
  document.querySelector("#sortProducts");


sortProducts?.addEventListener(
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

    card.addEventListener("click", () => {

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


searchOverlay?.addEventListener(
  "click",
  event => {

    if (event.target === searchOverlay) {

      closeSearch();

    }

  }
);


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


menuBtn?.addEventListener(
  "click",
  () => {

    const open =
      mainNav?.classList.toggle("open");


    menuBtn?.setAttribute(
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

        mainNav.classList.remove("open");

        menuBtn?.setAttribute(
          "aria-expanded",
          "false"
        );

      }
    );

  });


/* =========================================================
   BUILD A PLATTER
========================================================= */

function renderPlatterOptions() {

  const select =
    document.querySelector("#mealSelect");

  if (!select) return;


  select.innerHTML = `

    <option value="">
      Select a collection
    </option>

    ${state.platters.map(platter => `

      <option value="${platter.id}">
        ${escapeHtml(platter.name)}
      </option>

    `).join("")}

  `;

}


/* =========================================================
   FIND PRODUCTS FOR PLATTER
========================================================= */

function getPlatterProducts(platter) {

  if (!platter) return [];


  return platter.items

    .map(productId =>
      state.products.find(
        product => product.id === productId
      )
    )

    .filter(Boolean);

}


/* =========================================================
   RENDER PLATTER ITEMS
========================================================= */

function renderPlatterItems() {

  const select =
    document.querySelector("#mealSelect");

  const list =
    document.querySelector("#ingredientList");

  const total =
    document.querySelector("#platterTotal");

  const addButton =
    document.querySelector("#addPlatter");


  if (!select || !list) return;


  const platter =
    state.platters.find(
      item => item.id === select.value
    );


  state.selectedPlatter =
    platter || null;


  state.selectedPlatterItems = [];


  if (!platter) {

    list.innerHTML = "";

    if (total) {
      total.textContent = "0.00";
    }

    if (addButton) {
      addButton.disabled = true;
    }

    return;

  }


  const platterProducts =
    getPlatterProducts(platter);


  /*
     Every product starts selected.
  */

  state.selectedPlatterItems =
    platterProducts.map(
      product => product.id
    );


  list.innerHTML = platterProducts
    .map(product => `

      <div
        class="ingredient platter-item"
        data-product-id="${product.id}"
      >

        <label>

          <input
            type="checkbox"
            class="ingredient-check"
            value="${product.id}"
            data-price="${product.price}"
            data-name="${escapeHtml(product.name)}"
            data-category="${escapeHtml(product.category)}"
            checked
          >

          <span>

            ${escapeHtml(product.name)}

            <small>
              ${escapeHtml(product.category)}
            </small>

          </span>

        </label>


        <span>
          GH₵${money(product.price)}
        </span>

      </div>

    `)
    .join("");


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


/* =========================================================
   UPDATE PLATTER
========================================================= */

function updatePlatter() {

  const selected =
    [
      ...document.querySelectorAll(
        ".ingredient-check:checked"
      )
    ];


  state.selectedPlatterItems =
    selected.map(
      item => item.value
    );


  const total =
    selected.reduce(
      (sum, item) => {

        return (
          sum +
          Number(item.dataset.price || 0)
        );

      },
      0
    );


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
      selected.length === 0;

  }

}


/* =========================================================
   PLATTER SELECT CHANGE
========================================================= */

document
  .querySelector("#mealSelect")
  ?.addEventListener(
    "change",
    renderPlatterItems
  );


/* =========================================================
   ADD CUSTOM PLATTER
========================================================= */

document
  .querySelector("#addPlatter")
  ?.addEventListener(
    "click",
    () => {

      const platter =
        state.selectedPlatter;


      if (!platter) return;


      const selected =
        [
          ...document.querySelectorAll(
            ".ingredient-check:checked"
          )
        ];


      if (!selected.length) {

        alert(
          "Please select at least one item."
        );

        return;

      }


      const items =
        selected.map(item => ({

          id: item.value,

          name: item.dataset.name,

          category:
            item.dataset.category,

          price:
            Number(item.dataset.price)

        }));


      const price =
        items.reduce(
          (sum, item) =>
            sum + item.price,
          0
        );


      /*
         Create a unique ID so two customized
         platters can exist separately.
      */

      state.cart.push({

        id:
          `platter-${Date.now()}`,

        type:
          "platter",

        name:
          `Custom ${platter.name}`,

        price,

        qty: 1,

        items

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
    JSON.stringify(state.cart)
  );

}


/* =========================================================
   ADD NORMAL PRODUCT
========================================================= */

function addProduct(id) {

  const product =
    state.products.find(
      item => item.id === id
    );


  if (!product) return;


  const existing =
    state.cart.find(
      item =>
        item.id === id &&
        item.type !== "platter"
    );


  if (existing) {

    existing.qty++;

  } else {

    state.cart.push({

      id:
        product.id,

      type:
        "product",

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
   REMOVE CART ITEM
========================================================= */

function removeCartItem(index) {

  if (!state.cart[index]) return;


  state.cart.splice(index, 1);


  saveCart();

  renderCart();

}


window.removeCartItem =
  removeCartItem;


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
      state.cart.map(
        (item, index) => `

          <div class="cart-row">

            <div>

              <b>
                ${escapeHtml(item.name)}
              </b>


              ${
                item.type === "platter" &&
                item.items?.length
                  ? `
                    <small>
                      ${item.items
                        .map(
                          product =>
                            escapeHtml(
                              product.name
                            )
                        )
                        .join(", ")
                      }
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
      (sum, item) => {

        return (
          sum +
          Number(item.price) *
          Number(item.qty)
        );

      },
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


window.changeQty =
  changeQty;


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

    if (event.target === modal) {

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


      if (!state.cart.length) {

        alert(
          "Your basket is empty."
        );

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


      localStorage.setItem(
        "ee_customer",
        JSON.stringify(customer)
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
        "Hello Everything Everything! 👋\n\n" +
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
        "ORDER DETAILS\n";


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


          /*
             If this is a custom platter,
             list every selected product.
          */

          if (
            item.type === "platter" &&
            item.items?.length
          ) {

            message +=
              "Selected items:\n";


            item.items.forEach(
              product => {

                message +=
                  `- ${product.name} ` +
                  `(${product.category})\n`;

              }
            );

          }


          message +=
            `Subtotal: GH₵${money(
              item.price *
              item.qty
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
        document
          .querySelector(
            "#newsletterEmail"
          )
          ?.value
          .trim();


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

  renderPlatterOptions();

  renderCart();

}


initializeStore();
