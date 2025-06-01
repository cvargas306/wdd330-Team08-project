import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";

import { setBreadcrumbs } from "./breadcrumbs.mjs";

loadHeaderFooter();
updateCartCount();

const category = getParam("category");
const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, element);

productList.init().then(() => {
    const itemCount = document.querySelectorAll(".product-card").length;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
    setBreadcrumbs([
        { name: `${categoryName} → (${itemCount} items)` }
    ]);
});
