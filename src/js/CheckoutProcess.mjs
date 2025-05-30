import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
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
        this.list = getLocalStorage(this.key);
        this.calculateItemSubTotal();

    }

    calculateItemSubTotal() {
        this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice * (item.quantity || 1), 0);
        this.displayItemTotal();

    }

    displayItemTotal() {
        const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);
        const numItems = document.querySelector(`${this.outputSelector} #num-items`);
        subtotal.innerText = `$${this.itemTotal.toFixed(2)}`;
        numItems.innerText = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }

    calculateOrderTotal() {
        const numItems = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.tax = this.itemTotal * 0.06;
        this.shipping = 10 + (numItems > 1 ? (numItems - 1) * 2 : 0);
        this.orderTotal = this.itemTotal + this.tax + this.shipping;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.querySelector(`${this.outputSelector} #tax`).innerText = `$${this.tax.toFixed(2)}`;
        document.querySelector(`${this.outputSelector} #shipping`).innerText = `$${this.shipping.toFixed(2)}`;
        document.querySelector(`${this.outputSelector} #total`).innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout-form"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        //console.log(order);

        try {
            const response = await services.checkout(order);
            console.log("Order Success",response);
            alert("Order placed successfully");
        } catch (err) {
            console.error("Order Error", err);
            alert("Something went wrong placing your order.");
        }
    }
}