import { loadHeaderFooter } from "./utils.mjs";
import {CheckoutProcess} from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Recalculate totals after zip code is entered
document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
});

// Validate and submit checkout form
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.checkValidity()) {
        // Everything is filled out — proceed with submission (e.g., save order, show thank you)
        alert("Order submitted successfully!");
        // You could also clear the cart here if needed
        localStorage.removeItem("so-cart");
        form.reset();
        // Optionally redirect
        // window.location.href = "/thankyou.html";
    } else {
        // Show built-in validation messages
        form.reportValidity();
    }
});
