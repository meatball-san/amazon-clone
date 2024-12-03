export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}];

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
}