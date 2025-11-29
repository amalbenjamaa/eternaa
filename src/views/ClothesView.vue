<template>
  <!-- Loading -->
  <div v-if="loading" class="loading-wrapper">
    <div class="spinner"></div>
    <p>Loading our beautiful clothes...</p>
  </div>

  <!-- Error -->
  <div v-else-if="error" class="error-wrapper">
    <p>{{ error }}</p>
    <button @click="fetchWomensClothing" class="retry-btn">Try Again</button>
  </div>

  <!-- Success: Pass products correctly -->
  <CategoryPage
      v-else
      category-title="Our Clothes"
      :products=clothes
  />
</template>

<script>
import CategoryPage from '@/components/CategoryComponent.vue';
import ProductService from '@/services/productService';

export default {
  name: 'ClothesView',
  components: {
    CategoryPage
  },
  data() {
    return {
      clothes: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchWomensClothing();
  },
  methods: {
    async fetchWomensClothing() {
      this.loading = true;
      this.error = null;

      try {
        const response = await ProductService.getProductsByCategory("Clothes");

        this.clothes = response.map(item => ({
          ...item,
          isFavorite: false
        }));
      } catch (err) {
        console.error("API Error:", err);
        this.error = "Failed to load clothes. Please check your internet connection.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.loading-wrapper,
.error-wrapper {
  text-align: center;
  padding: 6rem 2rem;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #f3f4f6;
  border-top-color: #6b4226;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  padding: 0.8rem 2rem;
  background: #6b4226;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}
</style>