import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './shoppingCart.mjs';

loadHeaderFooter();

// Load cart
const cart = new ShoppingCart();
cart.init();
