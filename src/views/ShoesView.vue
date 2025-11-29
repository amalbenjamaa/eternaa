<template>
  <ShoesComponent
      category-title="Our Shoes"
      :products="shoes"
  />
</template>

<script>
import ShoesComponent from '@/components/ShoesComponent.vue';
import ProductService from '@/services/productService';

export default {
  components: { ShoesComponent },
  data() {
    return { 
      shoes: [],
      loading: true,
      error: null
    };
  },
  async created() {
    try {
      const products = await ProductService.getProductsByCategory('Shoes');
      this.shoes = products.map(product => ({
        ...product,
        id: parseInt(product.id, 10),
        isFavorite: false
      }));
    } catch (err) {
      this.error = 'Failed to load shoes products.';
      console.error('Error fetching shoes:', err);
    } finally {
      this.loading = false;
    }
  }
};
</script>


