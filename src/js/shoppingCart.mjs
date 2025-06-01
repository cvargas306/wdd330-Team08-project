import { getLocalStorage, setLocalStorage, animateCartIcon, updateCartCount } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage("so-cart") || [];
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    const cartListElement = document.querySelector(".product-list");
    const cartFooter = document.querySelector(".cart-footer");

    if (cartListElement) {
      renderListWithTemplate(this.cartItemTemplate.bind(this), cartListElement, this.cartItems, "afterbegin", true);
      this.addRemoveListeners();
    }

    if (this.cartItems.length > 0) {
      const total = this.cartItems.reduce((sum, item) => {
        const quantity = item.quantity || 1;
        return sum + item.FinalPrice * quantity;
      }, 0).toFixed(2);

      if (cartFooter) {
        cartFooter.classList.remove("hide");
        cartFooter.querySelector(".cart-total").textContent = `Total: $${total}`;
      }
    } else {
      if (cartFooter) {
        cartFooter.classList.add("hide");
      }
    }
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <span class="remove-item" data-id="${item.Id}" style="float:right;cursor:pointer;color:red;font-weight:bold;">✖</span>
        <a href="#" class="cart-card__image">
          <img src="${item.Images.PrimaryMedium || item.Image}" alt="${item.Name}">
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
        <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
      </li>
    `;
  }

  addRemoveListeners() {
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", (e) => { e.preventDefault(); this.removeItem(e.target.dataset.id); });
    });
  }

  removeItem(id) {
    // Filter item to delete
    const itemIndex = this.cartItems.findIndex(item => item.Id === id);

    if (itemIndex !== -1) {

      if (this.cartItems[itemIndex].quantity > 1) {
        this.cartItems[itemIndex].quantity -= 1;
      } else {

        this.cartItems.splice(itemIndex, 1);
      }

      // Update localStorage
      setLocalStorage("so-cart", this.cartItems);
      animateCartIcon();
      updateCartCount();

      this.renderCartContents();
    }
  }
}