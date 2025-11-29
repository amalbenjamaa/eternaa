<template>
  <div class="favorites-page">
    <!-- Header -->
    <div class="favorites-header">
      <h1 class="favorites-title">My Wishlist</h1>
      <p class="favorites-subtitle" v-if="favoriteItems.length > 0">
        {{ favoriteItems.length }} {{ favoriteItems.length === 1 ? 'item' : 'items' }} saved
      </p>
    </div>

    <div class="favorites-container">
      <!-- Favorites Grid -->
      <div v-if="favoriteItems.length > 0" class="favorites-grid">
        <div v-for="item in favoriteItems" :key="item.id" class="favorite-card">
          <!-- Favorite Heart Icon -->
          <button class="favorite-heart" @click="toggleFavorite(item)" title="Remove from favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <!-- Product Image -->
          <div class="favorite-image-wrapper">
            <img :src="item.image" :alt="item.name" class="favorite-image" />
            <div class="image-overlay">
              <button class="quick-view-btn">Quick View</button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="favorite-details">
            <h3 class="favorite-name">{{ item.name }}</h3>
            <div class="favorite-price-section">
              <span class="favorite-price">${{ item.price.toFixed(2) }}</span>
              <span class="stock-badge" :class="item.inStock ? 'in-stock' : 'out-of-stock'">
                {{ item.inStock !== false ? 'In Stock' : 'Out of Stock' }}
              </span>
            </div>

            <!-- Rating (Optional) -->
            <div class="favorite-rating">
              <div class="stars">
                <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= (item.rating || 5) }">
                  ★
                </span>
              </div>
              <span class="rating-count">({{ item.reviews || 0 }} reviews)</span>
            </div>

            <!-- Actions -->
            <div class="favorite-actions">
              <button class="add-to-cart-btn" @click="addToCart(item)">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Add to Cart
              </button>
              <button class="remove-btn" @click="toggleFavorite(item)" title="Remove from favorites">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-favorites">
        <div class="empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h2>Your Wishlist is Empty</h2>
        <p>Start adding items you love to keep track of them</p>
        <router-link to="/produit" class="browse-btn">
          <span>Browse Products</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Recommendations Section -->
    <div v-if="favoriteItems.length > 0" class="recommendations-section">
      <h2 class="section-title">You Might Also Like</h2>
      <p class="section-subtitle">Based on your favorites</p>
      <div class="recommendations-grid">
        <!-- Placeholder for recommended products -->
        <div class="recommendation-card">
          <div class="recommendation-placeholder">
            <p>Recommended products will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["favoriteItems"]),
  },
  methods: {
    toggleFavorite(product) {
      if (confirm("Remove this item from your favorites?")) {
        this.$store.commit("toggleFavorite", product);
      }
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
      alert(`${product.name} has been added to your cart!`);
    },
  },
};
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  padding: 2rem 1.5rem;
  padding-bottom: 100px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Header */
.favorites-header {
  text-align: center;
  margin-bottom: 3rem;
}

.favorites-title {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.favorites-subtitle {
  color: #6b7280;
  font-size: 1.05rem;
}

/* Container */
.favorites-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Favorites Grid */
.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.favorite-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e5e7eb;
}

.favorite-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

/* Favorite Heart */
.favorite-heart {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: #ef4444;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.favorite-heart:hover {
  transform: scale(1.1);
  background: #fee2e2;
}

/* Product Image */
.favorite-image-wrapper {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #f9fafb;
}

.favorite-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.favorite-card:hover .favorite-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.favorite-card:hover .image-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Product Details */
.favorite-details {
  padding: 1.5rem;
}

.favorite-name {
  font-size: 1.15rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.favorite-price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.favorite-price {
  font-size: 1.5rem;
  color: #6b4226;
  font-weight: 700;
}

.stock-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.stock-badge.in-stock {
  background: #d1fae5;
  color: #065f46;
}

.stock-badge.out-of-stock {
  background: #fee2e2;
  color: #991b1b;
}

/* Rating */
.favorite-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #d1d5db;
  font-size: 1rem;
}

.star.filled {
  color: #fbbf24;
}

.rating-count {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Actions */
.favorite-actions {
  display: flex;
  gap: 0.75rem;
}

.add-to-cart-btn {
  flex: 1;
  padding: 12px 20px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.3);
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.4);
}

.remove-btn {
  width: 44px;
  height: 44px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #dc2626;
  color: white;
  transform: scale(1.05);
}

/* Empty State */
.empty-favorites {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  margin-bottom: 2rem;
  color: #d1d5db;
}

.empty-favorites h2 {
  font-size: 1.75rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.empty-favorites p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.browse-btn {
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

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.4);
}

.browse-btn svg {
  transition: transform 0.3s ease;
}

.browse-btn:hover svg {
  transform: translateX(5px);
}

/* Recommendations Section */
.recommendations-section {
  max-width: 1400px;
  margin: 4rem auto 0;
  padding-top: 3rem;
  border-top: 1px solid #e5e7eb;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.05rem;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.recommendation-card {
  background: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  border: 2px dashed #e5e7eb;
}

.recommendation-placeholder p {
  color: #9ca3af;
  font-style: italic;
}

/* Responsive Design */
@media (max-width: 768px) {
  .favorites-page {
    padding: 1.5rem 1rem;
  }

  .favorites-title {
    font-size: 2rem;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .favorite-image-wrapper {
    height: 250px;
  }

  .favorite-actions {
    flex-direction: column;
  }

  .remove-btn {
    width: 100%;
  }

  .recommendations-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .favorites-title {
    font-size: 1.75rem;
  }

  .favorite-card {
    border-radius: 12px;
  }
}
</style>