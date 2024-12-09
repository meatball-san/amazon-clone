import { orders } from '../data/orders.js';
import { loadProductsFetch } from '../data/products.js';
import { renderAmazonHeader } from './amazonHeader.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from './utils/money.js';
import { getProduct } from '../data/products.js';
import { addToCart } from '../data/cart.js';

renderAmazonHeader();

async function renderOrders() {
    await loadProductsFetch();
    let orderContainerHTML = '';
    
    orders.forEach(orderObject => {
        const today = dayjs();
        const dateString = today.format('MMMM D');

        orderContainerHTML += `
        <div class="order-container">

            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${dateString}</div>
                    </div>
                    
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(orderObject.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderObject.id}</div>
                </div>
            </div>

            <div class="order-details-grid">${productList(orderObject)}</div>
        </div>
        `;

        function productList(orderObject){
            let ordersHTML = '';
            orderObject.products.forEach(product => {
                const matchingProduct = getProduct(product.productId);
                const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime);
                const formatEstimatedDeliveryTime = estimatedDeliveryTime.format('MMMM D');
                ordersHTML += `
                    <div class="product-image-container">
                        <img src=${matchingProduct.image}>
                    </div>
    
                    <div class="product-details">
    
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
    
                        <div class="product-delivery-date">
                            Arriving on: ${formatEstimatedDeliveryTime}
                        </div>
    
                        <div class="product-quantity">
                            Quantity: ${product.quantity}
                        </div>
    
                        <button class="buy-again-button button-primary js-buy-again-button" data-product-id=${matchingProduct.id}>
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
    
                    </div>
    
                    <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
                `;
            });

            return ordersHTML;
        }
    });

    document.querySelector('.js-order-grid').innerHTML = orderContainerHTML;

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId, 1);
            renderAmazonHeader();
        })
    })
}

renderOrders();