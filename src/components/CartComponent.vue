<template>
  <div class="cart-page">
    <!-- Header -->
    <div class="cart-header">
      <h1 class="cart-title">Shopping Cart</h1>
      <p class="cart-subtitle" v-if="cartItems.length > 0">
        {{ cartItems.length }} {{ cartItems.length === 1 ? 'item' : 'items' }} in your cart
      </p>
    </div>

    <div class="cart-container">
      <!-- Cart Items Section -->
      <div class="cart-items-section">
        <div v-if="cartItems.length > 0">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <!-- Item Image -->
            <div class="cart-item-image-container">
              <img :src="item.image" :alt="item.name" class="cart-item-image" />
            </div>

            <!-- Item Details -->
            <div class="cart-item-details">
              <h3 class="cart-item-name">{{ item.name }}</h3>
              <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>

              <!-- Mobile Quantity Control -->
              <div class="cart-item-quantity mobile-quantity">
                <button
                    class="quantity-btn decrease"
                    :class="{ 'trash-btn': item.quantity === 1 }"
                    @click="item.quantity === 1 ? removeFromCart(item.id) : decreaseQuantity(item)"
                >
                  <i :class="item.quantity === 1 ? 'fa fa-trash' : 'fa fa-minus'"></i>
                </button>
                <span class="quantity-display">{{ item.quantity }}</span>
                <button class="quantity-btn increase" @click="increaseQuantity(item)">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Desktop Quantity Control -->
            <div class="cart-item-quantity desktop-quantity">
              <button
                  class="quantity-btn decrease"
                  :class="{ 'trash-btn': item.quantity === 1 }"
                  @click="item.quantity === 1 ? removeFromCart(item.id) : decreaseQuantity(item)"
                  :title="item.quantity === 1 ? 'Remove from cart' : 'Decrease quantity'"
              >
                <i :class="item.quantity === 1 ? 'fa fa-trash' : 'fa fa-minus'"></i>
              </button>
              <span class="quantity-display">{{ item.quantity }}</span>
              <button class="quantity-btn increase" @click="increaseQuantity(item)" title="Increase quantity">
                <i class="fa fa-plus"></i>
              </button>
            </div>

            <!-- Item Total -->
            <div class="cart-item-total">
              <p class="total-label">Total</p>
              <p class="total-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
            </div>

            <!-- Remove Button (Desktop) -->
            <button class="remove-btn desktop-remove" @click="removeFromCart(item.id)" title="Remove from cart">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else class="empty-cart">
          <div class="empty-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet</p>
          <router-link to="/produit" class="shop-now-btn">
            <span>Start Shopping</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="order-summary" v-if="cartItems.length > 0">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>

        <div class="summary-row">
          <span>Shipping</span>
          <span class="shipping-free">{{ shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}` }}</span>
        </div>

        <div class="summary-row">
          <span>Tax (estimated)</span>
          <span>${{ tax.toFixed(2) }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total-row">
          <span>Total</span>
          <span class="total-amount">${{ total.toFixed(2) }}</span>
        </div>

        <!-- Promo Code -->
        <div class="promo-section">
          <input
              type="text"
              placeholder="Enter promo code"
              class="promo-input"
              v-model="promoCode"
          />
          <button class="apply-btn" @click="applyPromo">Apply</button>
        </div>

        <button class="checkout-btn">
          <span>Proceed to Checkout</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </button>

        <!-- Trust Badges -->
        <div class="trust-badges">
          <div class="badge-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Secure Payment</span>
          </div>
          <div class="badge-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span>Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartView",
  data() {
    return {
      promoCode: "",
    };
  },
  computed: {
    ...mapGetters(["cartItems"]),
    subtotal() {
      return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    shipping() {
      return this.subtotal >= 50 ? 0 : 5.99;
    },
    tax() {
      return this.subtotal * 0.08; // 8% tax
    },
    total() {
      return this.subtotal + this.shipping + this.tax;
    }
  },
  methods: {
    ...mapMutations(["removeFromCart", "updateCartQuantity"]),

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateCartQuantity({ id: item.id, quantity: item.quantity - 1 });
      }
    },

    increaseQuantity(item) {
      if (item.quantity < 15) {
        this.updateCartQuantity({ id: item.id, quantity: item.quantity + 1 });
      } else {
        alert("Maximum quantity is 15 items per product.");
      }
    },

    removeFromCart(productId) {
      if (confirm("Remove this item from your cart?")) {
        this.$store.commit("removeFromCart", productId);
      }
    },

    applyPromo() {
      if (this.promoCode) {
        alert("Promo code functionality coming soon!");
      }
    }
  },
};
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  padding: 2rem 1.5rem;
  padding-bottom: 100px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Header */
.cart-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cart-title {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.cart-subtitle {
  color: #6b7280;
  font-size: 1.05rem;
}

/* Container */
.cart-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
  align-items: start;
}

/* Cart Items Section */
.cart-items-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.cart-item {
  display: grid;
  grid-template-columns: 120px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.cart-item:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  border-color: #d1d5db;
}

.cart-item-image-container {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.cart-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cart-item:hover .cart-item-image {
  transform: scale(1.05);
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item-name {
  font-size: 1.15rem;
  color: #1f2937;
  font-weight: 600;
  margin: 0;
}

.cart-item-price {
  font-size: 1.1rem;
  color: #6b4226;
  font-weight: 600;
  margin: 0;
}

/* Quantity Controls */
.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  padding: 0.5rem 1rem;
}

.mobile-quantity {
  display: none;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  background: #f3f4f6;
  border: none;
  color: #6b4226;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background: #8b6f47;
  color: white;
  transform: scale(1.1);
}

.quantity-btn.trash-btn {
  background: #fee2e2;
  color: #dc2626;
}

.quantity-btn.trash-btn:hover {
  background: #dc2626;
  color: white;
}

.quantity-display {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  min-width: 24px;
  text-align: center;
}

/* Item Total */
.cart-item-total {
  text-align: right;
}

.total-label {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 0.25rem 0;
}

.total-price {
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 700;
  margin: 0;
}

/* Remove Button */
.remove-btn {
  width: 40px;
  height: 40px;
  background: #fee2e2;
  border: none;
  color: #dc2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #dc2626;
  color: white;
  transform: scale(1.1);
}

.desktop-remove {
  display: flex;
}

/* Empty Cart */
.empty-cart {
  margin: auto;
  text-align: center;
  padding: 4rem 2rem;
}

.empty-cart-icon {
  margin-bottom: 2rem;
  color: #d1d5db;
}

.empty-cart h2 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.empty-cart p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.shop-now-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  padding: 14px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.3);
}

.shop-now-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.4);
}

.shop-now-btn svg {
  transition: transform 0.3s ease;
}

.shop-now-btn:hover svg {
  transform: translateX(5px);
}

/* Order Summary */
.order-summary {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  position: sticky;
  top: 100px;
}

.order-summary h2 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #4b5563;
  font-size: 0.95rem;
}

.shipping-free {
  color: #16a34a;
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 1.5rem 0;
}

.total-row {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.total-amount {
  font-size: 1.5rem;
  color: #6b4226;
}

/* Promo Code */
.promo-section {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.promo-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.promo-input:focus {
  outline: none;
  border-color: #8b6f47;
}

.apply-btn {
  padding: 12px 24px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  color: #6b4226;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.apply-btn:hover {
  background: #e5e7eb;
}

/* Checkout Button */
.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.3);
  margin-bottom: 1.5rem;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.4);
}

/* Trust Badges */
.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.badge-item svg {
  color: #16a34a;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
  }

  .cart-item-total {
    grid-column: 2;
  }

  .desktop-remove {
    grid-column: 3;
    grid-row: 1;
  }

  .desktop-quantity {
    grid-column: 2 / 4;
    justify-self: start;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 1.5rem 1rem;
  }

  .cart-title {
    font-size: 2rem;
  }

  .cart-items-section {
    padding: 1rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .cart-item-image-container {
    width: 80px;
    height: 80px;
  }

  .desktop-quantity {
    display: none;
  }

  .mobile-quantity {
    display: flex;
    margin-top: 0.5rem;
  }

  .cart-item-total,
  .desktop-remove {
    display: none;
  }

  .order-summary {
    padding: 1.5rem;
  }
}
</style>