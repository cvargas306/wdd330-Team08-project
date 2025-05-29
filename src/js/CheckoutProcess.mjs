import { getLocalStorage } from "./utils.mjs";

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
        this.calculateItemSummary();
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
}