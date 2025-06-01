import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();
updateCartCount();

document.querySelector("#breadcrumbs").style.display = "none";
