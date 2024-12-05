function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
            
        },
    
        // adding products quantity to cart
        addToCart(productId) {
            // check if item already exists in cart
            // if it does, increase quantity of the product
            // if not, push the object
            let matchProduct;
            this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchProduct = cartItem;
            }
            });
            
            if (matchProduct) {
            matchProduct.quantity += 1;
            } else {
            this.cartItems.push({productId, quantity: 1, deliverOptionId: '1'});
            }
    
            this.saveToStorage();
        },
    
        // delete product from cart
        removeFromCart(productId) {
            // loop through each item in cart
            // if cartItem productId matches delete productId
            // remove the index aka product from the cart
            this.cartItems.forEach((cartItem, index) => {
            if (cartItem.productId === productId) {
                this.cartItems.splice(index, 1);
            }
            });
        
            this.saveToStorage();
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(cart));
        },
    
        // updaing delieveryOption Id
        updateDeliveryOption(productId, deliveryOptionId) {
            // looping through the cart to find the matching
            // product whose id needs to be updated
            let matchProduct;
            this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchProduct = cartItem;
            }
            });
        
            // update the id to the new delivery option
            matchProduct.deliverOptionId = deliveryOptionId;
        
            // update storage
            this.saveToStorage();
        },
    
        getCartItemQuantity() {
            let cartQuantity = 0;
            
            this.cartItems.forEach((cartItem) => {
              cartQuantity += cartItem.quantity;
            });
          
            return cartQuantity;
        }
    };
    
    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);