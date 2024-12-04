export const cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliverOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliverOptionId: '2'
  }
];

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
    cart.push({productId, quantity: 1, deliverOptionId: '1'});
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

// updaing delieveryOption Id
export function updateDeliveryOption(productId, deliveryOptionId) {
  // looping through the cart to find the matching
  // product whose id needs to be updated
  let matchProduct;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchProduct = cartItem;
    }
  });

  // update the id to the new delivery option
  matchProduct.deliverOptionId = deliveryOptionId;

  // update storage
  saveToStorage();
}