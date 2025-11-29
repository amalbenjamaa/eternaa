<template>
  <div class="product-detail-page">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <i class="fa fa-exclamation-circle"></i>
      <h2>Product Not Found</h2>
      <p>{{ error }}</p>
      <button @click="$router.push('/')" class="back-btn">Back to Shop</button>
    </div>

    <!-- Product Details -->
    <div v-else-if="product" class="product-detail-container">
      <div class="product-images">
        <div class="main-image-wrapper">
          <img :src="product.image" :alt="product.title" class="main-image" />
        </div>
      </div>

      <div class="product-info">
        <div class="breadcrumbs">
          <router-link to="/">Home</router-link> /
          <router-link to="/products">Shop</router-link> /
          <span>{{ formatCategory(product.category) }}</span>
        </div>

        <h1 class="product-title">{{ product.title }}</h1>

        <!-- Rating -->
        <div v-if="product.rating" class="rating-section">
          <div class="stars">
            <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ filled: n <= Math.round(product.rating.rate || 0) }"
            >★</span>
          </div>
          <span class="rating-text">
            {{ product.rating.rate || 0 }} out of 5 ({{ product.rating.count || 0 }} reviews)
          </span>
        </div>

        <div class="price-section">
          <span class="price">${{ (product.price || 0).toFixed(2) }}</span>
        </div>

        <p class="product-description">{{ product.description || 'No description available.' }}</p>

        <div class="category-tag">
          {{ formatCategory(product.category) }}
        </div>

        <div class="actions">
          <button class="add-to-cart-btn" @click="addToCart">
            <i class="fa fa-shopping-cart"></i>
            Add to Cart
          </button>
          <button
              class="favorite-btn"
              :class="{ active: isFavorite }"
              @click="toggleFavorite"
          >
            <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
          </button>
        </div>

        <div class="info-blocks">
          <div class="info-item">
            <i class="fa fa-shipping-fast"></i>
            <div>
              <strong>Free Shipping</strong>
              <p>On orders over $50</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fa fa-undo"></i>
            <div>
              <strong>30-Day Returns</strong>
              <p>Hassle-free returns</p>
            </div>
          </div>
          <div class="info-item">
            <i class="fa fa-shield-alt"></i>
            <div>
              <strong>Secure Payment</strong>
              <p>100% secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ProductService from '@/services/productService';

export default {
  name: 'ProductDetail',
  props: {
    productId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      isFavorite: false,
    };
  },
  methods: {
    ...mapMutations(['addToCart', 'toggleFavorite']),

    async fetchProduct() {
      this.loading = true;
      this.error = null;

      try {
        // Use prop if provided, otherwise use route param
        const productId = this.productId || this.$route.params.id;
        if (!productId) {
          throw new Error('Product ID is missing');
        }
        const response = await ProductService.getProductById(productId);
        if (!response || !response.id) {
          throw new Error('Product not found');
        }
        this.product = { ...response, isFavorite: false };
        this.checkIfFavorite();
      } catch (err) {
        this.error = "Sorry, we couldn't find this product.";
        console.error('Error fetching product:', err);
        console.error('Product ID:', this.productId || this.$route.params.id);
      } finally {
        this.loading = false;
      }
    },

    checkIfFavorite() {
      const favorites = this.$store.getters.favorites || [];
      this.isFavorite = favorites.some(f => f.id === this.product.id);
    },

    addToCart() {
      this.$store.commit('addToCart', this.product);
      this.$notify?.success?.(`${this.product.title} added to cart!`) ||
      alert(`${this.product.title} added to cart!`);
    },

    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$store.commit('toggleFavorite', this.product);
    },

    formatCategory(category) {
      if (!category) return '';
      return category
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },
  },

  created() {
    this.fetchProduct();
  },

  watch: {
    '$route.params.id'() {
      this.fetchProduct();
    },
    productId() {
      this.fetchProduct();
    }
  }
};
</script>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
}

.loading-container,
.error-container {
  text-align: center;
  padding: 6rem 2rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f4f6;
  border-top-color: #6b4226;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-container h2 {
  font-size: 2rem;
  color: #1f2937;
  margin: 1rem 0;
}

.back-btn {
  padding: 0.8rem 2rem;
  background: #6b4226;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.product-detail-container {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  padding: 2rem;
}

.product-images {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image-wrapper {
  max-width: 100%;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 16px;
}

.main-image {
  width: 100%;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.breadcrumbs {
  font-size: 0.95rem;
  color: #6b7280;
}

.breadcrumbs a {
  color: #6b4226;
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
  margin: 0;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stars {
  display: flex;
  gap: 4px;
}

.star {
  font-size: 1.4rem;
  color: #d1d5db;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  color: #6b7280;
  font-size: 1rem;
}

.price-section {
  margin: 1rem 0;
}

.price {
  font-size: 3rem;
  font-weight: 700;
  color: #6b4226;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4b5563;
  margin: 1.5rem 0;
}

.category-tag {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: #6b4226;
  color: white;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.add-to-cart-btn {
  flex: 1;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(107, 66, 38, 0.3);
}

.favorite-btn {
  width: 60px;
  height: 60px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.favorite-btn:hover,
.favorite-btn.active {
  background: #fef2f2;
  color: #ef4444;
  border-color: #fca5a5;
  transform: scale(1.1);
}

.info-blocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.95rem;
}

.info-item i {
  font-size: 2rem;
  color: #6b4226;
}

.info-item strong {
  display: block;
  color: #1f2937;
  font-weight: 600;
}

.info-item p {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 992px) {
  .product-detail-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-title {
    font-size: 2rem;
  }

  .price {
    font-size: 2.5rem;
  }

  .info-blocks {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .actions {
    flex-direction: column;
  }

  .add-to-cart-btn {
    width: 100%;
  }

  .favorite-btn {
    width: 55px;
    height: 55px;
  }
}
</style>