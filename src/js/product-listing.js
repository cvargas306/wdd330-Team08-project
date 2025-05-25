import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();
updateCartCount();

const category = getParam("category");
const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();

