import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default class ShoppingCart {
  constructor() {
    this.cartItems = getLocalStorage('so-cart') || [];
  }

  init() {
    this.renderCartContents();
  }

  renderCartContents() {
    const cartListElement = document.querySelector('.product-list');
    if (cartListElement) {
      renderListWithTemplate(this.cartItemTemplate.bind(this),cartListElement,this.cartItems,'afterbegin',true );
      this.addRemoveListeners(); 
    }
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <span class="remove-item" data-id="${item.Id}" style="float:right;cursor:pointer;color:red;font-weight:bold;">✖</span>
        <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}">
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </li>
    `;
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
  }
}