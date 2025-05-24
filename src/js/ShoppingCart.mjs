import { getLocalStorage, setLocalStorage, renderListWithTemplate, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <span class="remove-item" data-id="${item.Id}" style="float:right;cursor:pointer;color:red;font-weight:bold;">✖</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderList();
  }

  renderList() {
    renderListWithTemplate(cartItemTemplate, this.listElement, this.cartItems);
    this.addRemoveListeners();
  }

  addRemoveListeners() {
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const idToRemove = button.dataset.id;
        this.cartItems = this.cartItems.filter((item) => item.Id !== idToRemove);
        setLocalStorage("so-cart", this.cartItems);
        updateCartCount(); 
        this.renderList(); 
      });
    });
  }
}
