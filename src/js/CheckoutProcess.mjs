import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(form) {
  // convert the form data to a JSON object
  const formData = new FormData(form);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        if (this.list.length === 0) {
            console.warn("El carrito está vacío");
            return;
        }
        this.calculateItemSubTotal();
        this.calculateOrderTotal();
    }

    calculateItemSubTotal() {
        this.itemTotal = parseFloat(this.list.reduce((total, item) => 
            total + (item.FinalPrice * (item.quantity || 1)), 0).toFixed(2));
        this.displayItemTotal();
    }

    displayItemTotal() {
        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
        const numItems = document.querySelector(`${this.outputSelector} #num-items`);
        subtotal.textContent = this.itemTotal.toFixed(2);
        numItems.textContent = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    calculateOrderTotal() {
        const numItems = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.tax = parseFloat((this.itemTotal * 0.06).toFixed(2));
        this.shipping = 10 + (numItems > 1 ? (numItems - 1) * 2 : 0);
        this.orderTotal = parseFloat((this.itemTotal + this.tax + this.shipping).toFixed(2));
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.querySelector(`${this.outputSelector} #tax`).textContent = this.tax.toFixed(2);
        document.querySelector(`${this.outputSelector} #shipping`).textContent = this.shipping.toFixed(2);
        document.querySelector(`${this.outputSelector} #total`).textContent = this.orderTotal.toFixed(2);
    }

    async checkout() {
        const form = document.forms['checkout-form'];
        const order = formDataToJSON(form);

        order.orderDate = new Date();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = this.list.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.quantity || 1
        }));

        console.log(order); 

        try {
            const response = await services.checkout(order);
            console.log(response); 
            localStorage.removeItem("so-cart");
            window.location.assign("/checkout/success.html");
        } catch (err) {
            console.log(err);
            if (err.message) {
                alertMessage(err.message);
            }
        }
    }
}
