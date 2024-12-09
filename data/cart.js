export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
}

// adding products quantity to cart
export function addToCart(productId, selectQuantity) {
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
    matchProduct.quantity += Number(selectQuantity);
  } else {
    cart.push({productId, quantity: Number(selectQuantity), deliverOptionId: '1'});
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

export function deleteCart() {
  localStorage.removeItem('cart');
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


export function getCartItemQuantity() {
  let cartQuantity = 0;
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}