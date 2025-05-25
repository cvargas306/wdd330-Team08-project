/*import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage('so-cart') || [];

    this.renderCartContents = this.renderCartContents.bind(this);
    this.cartItemTemplate = this.cartItemTemplate.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    const cartListElement = document.querySelector('.product-list');
    if (cartListElement) {
      renderListWithTemplate(
        (item) => this.cartItemTemplate(item), 
        cartListElement,
        this.cartItems,
        'afterbegin',
        true
      );
      this.addRemoveListeners();
    }
  }

  addRemoveListeners() {
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (e) => {e.preventDefault();this.removeItem(e.target.dataset.id);});
    });
  }

  removeItem(id) {
    // Filter item to delete
    this.cartItems = this.cartItems.filter(item => item.Id !== id);
    
    // Update localStorage
    setLocalStorage('so-cart', this.cartItems);
    
    this.renderCartContents();
    updateCartCount();
    
  }
}*/

import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage('so-cart') || [];
  }

  init() {
    this.showCart();
  }

  showCart() {
    const cartElement = document.querySelector('.product-list');
    if (!cartElement) return;

    cartElement.innerHTML = '';

    if (this.cartItems.length === 0) {
      cartElement.innerHTML = '<li class="empty">Your cart is empty</li>';
      return;
    }

    this.cartItems.forEach(item => {
      cartElement.innerHTML += `
        <li class="cart-item">
          <span class="remove-x" data-id="${item.Id}">✖</span>
          <img src="${item.Image || '/images/placeholder.jpg'}" alt="${item.Name}">
          <div>
            <h3>${item.Name}</h3>
            <p>$${item.FinalPrice}</p>
          </div>
        </li>
      `;
    });

    this.addRemoveEvents();
  }

  addRemoveEvents() {
    document.querySelectorAll('.remove-x').forEach(x => {
      x.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        this.removeItem(id);
      });
    });
  }

  removeItem(id) {
    this.cartItems = this.cartItems.filter(item => item.Id !== id);
    setLocalStorage('so-cart', this.cartItems);
    this.showCart();
  }
}