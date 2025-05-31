import { loadHeaderFooter, updateCartCount} from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.querySelector("#checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    await checkout.checkout();
    
    // Clear cart and reset form
    localStorage.removeItem("so-cart");
    form.reset();
    document.getElementById("card-number").value = '';
    document.getElementById("expiration").value = '';
    document.getElementById("code").value = '';
    

    document.querySelector("#num-items").textContent = "0";
    document.querySelector("#subtotal").textContent = "0.00";
    document.querySelector("#tax").textContent = "0.00";
    document.querySelector("#shipping").textContent = "0.00";
    document.querySelector("#total").textContent = "0.00";
    
    alert("Order completed successfully!");
    updateCartCount(0);
    
  } catch (error) {
    alert("Payment error: " + (error.message || "Please try again"));
  }
});