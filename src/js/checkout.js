import { loadHeaderFooter } from "./utils.mjs";
import  CheckoutProcess  from "../js/CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();
checkout.calculateOrderTotal();

// Recalculate totals after zip code is entered
document.querySelector("#zip").addEventListener("blur", () => {
    checkout.calculateOrderTotal();
});

// Validate and submit checkout form
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.checkValidity()) {
        checkout.calculateOrderTotal(); // ensure totals are calculated
        checkout.checkout(); // <-- actually send the POST request
    } else {
        form.reportValidity();
    }
});
