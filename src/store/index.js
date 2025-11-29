import { createStore } from "vuex";

const store = createStore({
  state: {
    cart: [], // Array to store cart items 
    favorites: [], // Array to store favorite items
  },
  mutations: {
    // Cart
    addToCart(state, product) {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    updateCartQuantity(state, { id, quantity }) {
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

    // Favorites
    toggleFavorite(state, product) {
      const existingIndex = state.favorites.findIndex((item) => item.id === product.id);
      if (existingIndex !== -1) {
        state.favorites.splice(existingIndex, 1); // Remove from favorites
      } else {
        state.favorites.push(product);
      }
    },
  },
  getters: {
    // Cart
    cartItemCount(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    cartItems(state) {
      return state.cart;
    },

    // Favorites
    favoriteItems(state) {
      return state.favorites;
    },
    favoriteCount(state) {
      return state.favorites.length; // Number of favorite items
    },
  },

  
});

export default store;
