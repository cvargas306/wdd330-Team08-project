import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();
updateCartCount();

const category = getParam("category");
const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init();

