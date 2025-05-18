import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}
renderCartContents();


/*import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];  // 
  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Listeners para eliminar
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const idToRemove = event.target.dataset.id;
      removeItemFromCart(idToRemove);
    });
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  
  <span class="remove-item" data-id="${item.Id}" style="cursor: pointer; float: right; font-weight: bold; color: red;">❌</span>

  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

////

function removeItemFromCart(id) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter(item => item.Id !== id);
  setLocalStorage("so-cart", cart);
  renderCartContents();
}
////

/*renderCartContents();*/