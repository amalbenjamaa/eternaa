<template>
  <div class="product-page">
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title">{{ categoryTitle || 'Our Collection' }}</h1>
      <p class="page-subtitle">Discover our curated selection of premium products</p>
    </div>

    <div class="products-container">
      <!-- Sidebar Filters -->
      <aside class="filters-sidebar" :class="{ 'mobile-open': filtersOpen }">
        <div class="filters-header">
          <h2>Filters</h2>
          <button class="close-filters mobile-only" @click="filtersOpen = false">
            <i class="fa fa-times"></i>
          </button>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="active-filters">
          <div class="filter-tags">
            <span v-if="selectedCategory" class="filter-tag">
              {{ selectedCategory }}
              <button @click="selectedCategory = null">×</button>
            </span>
            <span v-if="priceRange.min > 0 || priceRange.max < 1000" class="filter-tag">
              ${{ priceRange.min }} - ${{ priceRange.max }}
              <button @click="resetPriceRange">×</button>
            </span>
            <span v-if="minRating > 0" class="filter-tag">
              {{ minRating }}+ Stars
              <button @click="minRating = 0">×</button>
            </span>
          </div>
          <button class="clear-all-btn" @click="clearAllFilters">Clear All</button>
        </div>

        <!-- Category Filter -->
        <div class="filter-section">
          <h3>Category</h3>
          <div class="filter-options">
            <label class="filter-option">
              <input type="radio" v-model="selectedCategory" :value="null" />
              <span>All Products</span>
              <span class="count">({{ totalProducts }})</span>
            </label>
            <label
                class="filter-option"
                v-for="category in categories"
                :key="category"
            >
              <input type="radio" v-model="selectedCategory" :value="category" />
              <span class="category-name">{{ formatCategory(category) }}</span>
            </label>
          </div>
        </div>

        <!-- Price Filter -->
        <div class="filter-section">
          <h3>Price Range</h3>
          <div class="price-range-container">
            <div class="price-inputs">
              <input
                  type="number"
                  v-model.number="priceRange.min"
                  placeholder="Min"
                  class="price-input"
              />
              <span class="price-separator">-</span>
              <input
                  type="number"
                  v-model.number="priceRange.max"
                  placeholder="Max"
                  class="price-input"
              />
            </div>
            <div class="price-slider">
              <input
                  type="range"
                  v-model.number="priceRange.min"
                  min="0"
                  max="1000"
                  step="10"
                  class="slider"
              />
              <input
                  type="range"
                  v-model.number="priceRange.max"
                  min="0"
                  max="1000"
                  step="10"
                  class="slider"
              />
            </div>
          </div>
        </div>

        <!-- Rating Filter -->
        <div class="filter-section">
          <h3>Minimum Rating</h3>
          <div class="rating-options">
            <label
                class="rating-option"
                v-for="rating in [4, 3, 2, 1, 0]"
                :key="rating"
            >
              <input type="radio" v-model.number="minRating" :value="rating" />
              <span class="stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= rating }">★</span>
              </span>
              <span v-if="rating > 0">& Up</span>
              <span v-else>All Ratings</span>
            </label>
          </div>
        </div>

        <!-- Sort Filter -->
        <div class="filter-section">
          <h3>Sort By</h3>
          <select v-model="sortBy" class="sort-select">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Highest Rated</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </aside>

      <!-- Products Grid -->
      <main class="products-main">
        <!-- Toolbar -->
        <div class="products-toolbar">
          <button class="filter-toggle mobile-only" @click="filtersOpen = true">
            <i class="fa fa-filter"></i>
            Filters
            <span v-if="hasActiveFilters" class="filter-badge">{{ activeFiltersCount }}</span>
          </button>
          <p class="results-count">
            Showing {{ filteredProducts.length }} of {{ totalProducts }} products
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
          <p>Loading products...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <i class="fa fa-exclamation-circle"></i>
          <h3>Oops! Something went wrong</h3>
          <p>{{ error }}</p>
          <button @click="fetchProducts" class="retry-btn">Try Again</button>
        </div>

        <!-- Products Grid -->
        <div v-else-if="filteredProducts.length > 0" class="product-grid">
          <div
              class="product-card"
              v-for="product in filteredProducts"
              :key="product.id"
          >
            <!-- Favorite Icon -->
            <button
                class="favorite-btn"
                :class="{ active: product.isFavorite }"
                @click="toggleFavorite(product)"
            >
              <i :class="product.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>

            <!-- Product Image -->
            <div class="product-image-wrapper">
              <img :src="getImagePath(product.image)" :alt="product.title" class="product-image" />
              <div class="image-overlay">
                <router-link :to="{ name: 'TOP', params: { id: product.id } }" class="quick-view-btn">
                  Quick View
                </router-link>
              </div>
            </div>

            <!-- Product Info -->
            <div class="product-info">
              <span class="product-category">{{ formatCategory(product.category) }}</span>
              <h3 class="product-title">{{ truncateTitle(product.title) }}</h3>

              <!-- Rating -->
              <div class="product-rating">
                <div class="stars">
                  <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= Math.round(product.rating.rate) }">
                    ★
                  </span>
                </div>
                <span class="rating-count">({{ product.rating.count }})</span>
              </div>

              <!-- Price -->
              <div class="product-price-section">
                <p class="product-price">${{ product.price.toFixed(2) }}</p>
                <button class="add-to-cart-btn" @click="addToCart(product)">
                  <i class="fa fa-shopping-cart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="no-results">
          <i class="fa fa-search"></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters to see more results</p>
          <button @click="clearAllFilters" class="clear-filters-btn">Clear Filters</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/productService";
import { getImagePath } from "@/utils/imageHelper";

export default {
  name: "ProductView",
  props: {
    products: {
      type: Array,
      default: () => []
    },
    categoryTitle: {
      type: String,
      default: 'Our Collection'
    }
  },
  data() {
    return {
      localProducts: [], // Local products when loaded from API
      categories: [],
      loading: false,
      error: null,
      filtersOpen: false,

      // Filters
      selectedCategory: null,
      priceRange: {
        min: 0,
        max: 1000
      },
      minRating: 0,
      sortBy: 'default',
      searchQuery: ""
    };
  },
  computed: {
    displayProducts() {
      // Use props.products if provided, otherwise use local products
      return this.products.length > 0 ? this.products : this.localProducts;
    },
    filteredProducts() {
      let filtered = [...this.displayProducts];

      // Category filter
      if (this.selectedCategory) {
        filtered = filtered.filter(p => p.category === this.selectedCategory);
      }

      // Price filter
      filtered = filtered.filter(p =>
          p.price >= this.priceRange.min && p.price <= this.priceRange.max
      );

      // Rating filter
      if (this.minRating > 0) {
        filtered = filtered.filter(p => p.rating && p.rating.rate >= this.minRating);
      }

      // Search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
            (p.title && p.title.toLowerCase().includes(query)) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
      }

      // Sort
      filtered = this.sortProducts(filtered);

      return filtered;
    },
    totalProducts() {
      return this.displayProducts.length;
    },
    hasActiveFilters() {
      return this.selectedCategory !== null ||
          this.priceRange.min > 0 ||
          this.priceRange.max < 1000 ||
          this.minRating > 0;
    },
    activeFiltersCount() {
      let count = 0;
      if (this.selectedCategory) count++;
      if (this.priceRange.min > 0 || this.priceRange.max < 1000) count++;
      if (this.minRating > 0) count++;
      return count;
    }
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      handler(newSearch) {
        this.searchQuery = newSearch || "";
      },
    },
    displayProducts: {
      handler() {
        // Update categories when products change
        this.fetchCategories();
      },
      immediate: true
    }
  },
  methods: {
    getImagePath,
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await ProductService.getAllProducts();
        this.localProducts = response.map(product => ({
          ...product,
          isFavorite: false
        }));
      } catch (err) {
        this.error = 'Failed to load products. Please try again later.';
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        // Extract unique categories from products
        const uniqueCategories = [...new Set(this.displayProducts.map(p => p.category).filter(Boolean))];
        this.categories = uniqueCategories.sort();
      } catch (err) {
        // Error handled silently
      }
    },

    sortProducts(products) {
      const sorted = [...products];

      switch(this.sortBy) {
        case 'price-asc':
          return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return sorted.sort((a, b) => b.price - a.price);
        case 'rating-desc':
          return sorted.sort((a, b) => {
            const ratingA = a.rating && a.rating.rate ? a.rating.rate : 0;
            const ratingB = b.rating && b.rating.rate ? b.rating.rate : 0;
            return ratingB - ratingA;
          });
        case 'name-asc':
          return sorted.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        default:
          return sorted;
      }
    },

    toggleFavorite(product) {
      product.isFavorite = !product.isFavorite;
      this.$store.commit("toggleFavorite", product);
    },

    addToCart(product) {
      this.$store.commit("addToCart", product);
      // Show notification (you can use a toast library)
      alert(`${product.title} added to cart!`);
    },

    formatCategory(category) {
      if (!category) return '';
      return category
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    },

    truncateTitle(title, maxLength = 50) {
      if (title.length <= maxLength) return title;
      return title.substring(0, maxLength) + '...';
    },

    clearAllFilters() {
      this.selectedCategory = null;
      const maxPrice = this.displayProducts.length > 0 
        ? Math.ceil(Math.max(...this.displayProducts.map(p => p.price || 0)) * 1.1)
        : 1000;
      this.priceRange = { min: 0, max: maxPrice };
      this.minRating = 0;
      this.sortBy = 'default';
      this.searchQuery = "";
    },

    resetPriceRange() {
      const maxPrice = this.displayProducts.length > 0 
        ? Math.ceil(Math.max(...this.displayProducts.map(p => p.price || 0)) * 1.1)
        : 1000;
      this.priceRange = { min: 0, max: maxPrice };
    }
  },

  created() {
    // Only fetch all products if no products are passed via props
    if (this.products.length === 0) {
      this.fetchProducts();
    }
    this.fetchCategories();
  },
};
</script>

<style scoped>
.product-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  padding: 2rem 1.5rem;
  padding-bottom: 120px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1.05rem;
}

/* Container */
.products-container {
  max-width: 1600px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;
}

/* Sidebar Filters */
.filters-sidebar {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  position: sticky;
  top: 120px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filters-header h2 {
  font-size: 1.5rem;
  color: #1f2937;
  font-weight: 700;
  margin: 0;
}

.close-filters {
  display: none;
}

/* Active Filters */
.active-filters {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.filter-tag button {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.filter-tag button:hover {
  color: #1f2937;
}

.clear-all-btn {
  width: 100%;
  padding: 0.5rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-all-btn:hover {
  background: #fecaca;
}

/* Filter Sections */
.filter-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.filter-section:last-child {
  border-bottom: none;
}

.filter-section h3 {
  font-size: 1rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 600;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.filter-option:hover {
  background: #f9fafb;
}

.filter-option input[type="radio"] {
  cursor: pointer;
  accent-color: #6b4226;
}

.filter-option .category-name {
  flex: 1;
  color: #374151;
  font-size: 0.95rem;
  text-transform: capitalize;
}

.filter-option .count {
  color: #9ca3af;
  font-size: 0.85rem;
}

/* Price Range */
.price-range-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.price-input {
  flex: 1;
  min-width: 0;
  padding: 0.6rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.price-input:focus {
  outline: none;
  border-color: #8b6f47;
}

.price-separator {
  color: #9ca3af;
  font-weight: 600;
}

.price-slider {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #e5e7eb;
  outline: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #6b4226;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #6b4226;
  cursor: pointer;
  border: none;
}

/* Rating Options */
.rating-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.rating-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background 0.2s;
}

.rating-option:hover {
  background: #f9fafb;
}

.rating-option input[type="radio"] {
  cursor: pointer;
  accent-color: #6b4226;
}

.rating-option .stars {
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

/* Sort Select */
.sort-select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s;
}

.sort-select:focus {
  outline: none;
  border-color: #8b6f47;
}

/* Products Main */
.products-main {
  min-height: 500px;
}

/* Toolbar */
.products-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.filter-toggle {
  display: none;
}

.results-count {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top-color: #6b4226;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.error-container i {
  font-size: 3rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

.error-container h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.error-container p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.retry-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.3);
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid #e5e7eb;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

/* Favorite Button */
.favorite-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  background: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: #9ca3af;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.favorite-btn:hover,
.favorite-btn.active {
  color: #ef4444;
  transform: scale(1.1);
}

/* Product Image */
.product-image-wrapper {
  position: relative;
  height: 320px;
  background: #f9fafb;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

/* Product Info */
.product-info {
  padding: 1.5rem;
}

.product-category {
  display: inline-block;
  padding: 4px 12px;
  background: #f3f4f6;
  color: #6b4226;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.product-title {
  font-size: 1rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  min-height: 2.8rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.product-rating .stars {
  display: flex;
  gap: 2px;
}

.rating-count {
  font-size: 0.85rem;
  color: #6b7280;
}

.product-price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.5rem;
  color: #6b4226;
  font-weight: 700;
  margin: 0;
}

.add-to-cart-btn {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.3);
}

.add-to-cart-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.4);
}

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.no-results i {
  font-size: 3rem;
  color: #d1d5db;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 66, 38, 0.3);
}
/* Responsive Styles */
@media (max-width: 1024px) {
  .products-container {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80%;
    max-width: 300px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    box-shadow: 2px 0 12px rgba(0,0,0,0.1);
  }

  .filters-sidebar.mobile-open {
    transform: translateX(0);
  }

  .close-filters {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #6b7280;
  }

  .filter-toggle {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f3f4f6;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
  }

  .filter-badge {
    background: #ef4444;
    color: white;
    font-size: 0.75rem;
    padding: 2px 6px;
    border-radius: 12px;
    margin-left: 0.5rem;
  }
}

</style>