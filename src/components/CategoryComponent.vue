<template>
  <div class="category-page">
    <!-- Header -->
    <div class="page-header">
      <h1 class="page-title">{{ categoryTitle }}</h1>
      <p class="page-subtitle">Handcrafted with love • Timeless elegance</p>
    </div>

    <!-- Products Grid -->
    <div class="products-container">
      <div class="product-grid">
        <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
            @click="$router.push({ name: 'TOP', params: { id: product.id } })"
        >
          <!-- Favorite Button -->
          <button
              class="favorite-btn"
              :class="{ active: product.isFavorite }"
              @click.stop="toggleFavorite(product)"
          >
            <i :class="product.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
          </button>

          <!-- Image Wrapper -->
          <div class="product-image-wrapper">
            <img
                :src="product.image"
                :alt="product.name"
                class="product-image"
            />
            <div class="image-overlay">
              <span class="quick-view-text">Quick View</span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <h3 class="product-title">{{ truncateTitle(product.name) }}</h3>
            <div class="product-price-section">
              <p class="product-price">{{ product.price }} DT</p>
              <button
                  class="add-to-cart-btn-mini"
                  @click.stop="addToCart(product)"
              >
                <i class="fa fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CategoryPage',
  props: {
    categoryTitle: {
      type: String,
      required: true
    },
    products: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  created() {
    console.log(this.products);
    this.syncFavoritesFromStore();
  },
  methods: {
    ...mapMutations(['toggleFavorite', 'addToCart']),

    syncFavoritesFromStore() {
      const favorites = this.$store.getters.favorites || [];
      this.products.forEach(product => {
        const found = favorites.find(f => f.id === product.id);
        if (found) product.isFavorite = true;
      });
    },

    truncateTitle(title, length = 45) {
      return title.length > length ? title.substring(0, length) + '...' : title;
    }
  },
  watch: {
    '$store.state.favorites': {
      handler() {
        this.syncFavoritesFromStore();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  padding: 3rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  font-weight: 500;
}

.products-container {
  max-width: 1600px;
  margin: 0 auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
}

.product-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid #eee;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  position: relative;
  height: 380px;
  background: #f8f5f2;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(107, 66, 38, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.quick-view-text {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.favorite-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: white;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  font-size: 1.3rem;
  color: #9ca3af;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn:hover,
.favorite-btn.active {
  color: #ef4444;
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
}

.product-info {
  padding: 1.5rem;
  text-align: center;
}

.product-title {
  font-size: 1.1rem;
  color: #374151;
  margin: 0 0 1rem 0;
  font-weight: 600;
  line-height: 1.4;
}

.product-price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.product-price {
  font-size: 1.7rem;
  font-weight: 700;
  color: #6b4226;
  margin: 0;
}

.add-to-cart-btn-mini {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.3);
}

.add-to-cart-btn-mini:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 20px rgba(107, 66, 38, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .page-title { font-size: 2.3rem; }
  .product-grid { gap: 2rem; }
  .product-image-wrapper { height: 340px; }
}

@media (max-width: 480px) {
  .product-grid { grid-template-columns: 1fr 1fr; }
}
</style>