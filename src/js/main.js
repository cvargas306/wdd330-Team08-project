import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, element);

productList.init();

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    const count = cart.length;
    const countElement = document.getElementById("cart-count");

    if (count > 0) {
        countElement.textContent = count;
        countElement.style.display = "inline-block";
    } else {
        countElement.style.display = "none";
    }
}

// Call on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
