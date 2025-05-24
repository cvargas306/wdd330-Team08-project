import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "../js/utils.mjs";

loadHeaderFooter();


import { updateCartCount } from "../js/utils.mjs";

document.addEventListener("DOMContentLoaded", updateCartCount);


const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

productList.init();


