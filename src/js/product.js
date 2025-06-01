import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { setBreadcrumbs } from "./breadcrumbs.mjs";

loadHeaderFooter();
updateCartCount();

const dataSource = new ExternalServices("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);

product.init().then(() => {
  const prod = product.product;
  const categoryName = prod.Category.charAt(0).toUpperCase() + prod.Category.slice(1);
  setBreadcrumbs([
    { name: categoryName, url: `/product-listing.html?category=${prod.Category}` },
    { name: prod.NameWithoutBrand }
  ]);
});
