import {cart, addToCart, getCartItemQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import { renderAmazonHeader } from './amazonHeader.js';

// render amazon header before page
renderAmazonHeader();
// loading products data
loadProducts(renderProductsGrid);

export function renderProductsGrid() {
  let productHTML = '';

  // loop through every product obect inside product array
  // generate HTML for each product
  // save generated HTML for each product in a variable
  products.forEach((item) => {
    productHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src=${item.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${item.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${item.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${item.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${item.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${item.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${item.id}">
              Add to Cart
            </button>
          </div>`;
  });

  // show HTML in the variable onto the page
  document.querySelector('.js-product-grid').innerHTML = productHTML;

  // update cart quantity
  function updateCartQuantity() {
    // show cartQuantity on the page
    // loop through each item in the cart
    // save their quantity in cartQuantity
    // display it on page
    const cartQuantity = getCartItemQuantity();
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  // select all "Add to Cart" buttons
  // add eventListener to update cart items
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      // get the productId of the button clicked
      // save it in a variable
      const productId = button.dataset.productId;

      // add product to cart
      addToCart(productId);

      // update quantity within cart
      updateCartQuantity();
    });
  });
}