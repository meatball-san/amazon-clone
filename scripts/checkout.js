import { renderOrderSummury } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

Promise.all([
    loadProductsFetch()
]).then(() => {
    renderCheckoutHeader();
    renderOrderSummury();
    renderPaymentSummary();
});

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummury();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummury();
    renderPaymentSummary();
});
*/