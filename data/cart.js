export const cart = JSON.parse(localStorage.getItem('cart')) || [];

// adding products quantity to cart
export function addToCart(productId) {
  // check if item already exists in cart
  // if it does, increase quantity of the product
  // if not, push the object
  let matchProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchProduct = cartItem;
    }
  });
  
  if (matchProduct) {
    matchProduct.quantity += 1;
  } else {
    cart.push({productId, quantity: 1});
  }

  saveToStorage();
}

// delete product from cart
export function removeFromCart(productId) {
  // loop through each item in cart
  // if cartItem productId matches delete productId
  // remove the index aka product from the cart
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart.splice(index, 1);
    }
  });

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}