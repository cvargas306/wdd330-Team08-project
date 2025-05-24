/*import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "../js/utils.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", updateCartCount);

const category = getParam("category");
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();*/

import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';


loadHeaderFooter();
updateCartCount();

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const productList = new ProductList('tents', dataSource, element);

productList.init();

