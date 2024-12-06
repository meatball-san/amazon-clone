import { renderOrderSummury } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummury();
    renderPaymentSummary();
});

/*
loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummury();
    renderPaymentSummary();
});
*/