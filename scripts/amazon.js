import {cart} from '../data/cart.js';

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
              src="images/ratings/rating-${item.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(item.priceCents / 100).toFixed(2)}
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

// select all "Add to Cart" buttons
// add eventListener to update cart items
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    // get the productId of the button clicked
    // save it in a variable
    const productId = button.dataset.productId;
    
    // check if item already exists in cart
    // if it does, increase quantity of the product
    // if not, push the object
    let matchProduct;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchProduct = item;
      }
    });

    if (matchProduct) {
      matchProduct.quantity += 1;
    } else {
      cart.push({productId, quantity: 1});
    }

    // show cartQuantity on the page
    // loop through each item in the cart
    // save their quantity in cartQuantity
    // display it on page
    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});