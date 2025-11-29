<template>
    <div class="product-view">
      <h1 class="title">Our Shoes</h1>
      <div class="product-grid">
        <div
          class="product-card"
          v-for="product in products"
          :key="product.id"
        >
          <div class="image-container">
            <img :src="product.image" :alt="product.name" class="product-image" />
<span class="favorite" @click="toggleFavorite(product)">
            <i
              :class="product.isFavorite ? 'fas fa-heart' : 'far fa-heart'"
            ></i>
          </span>
          </div>
          <div class="product-details">
            <p class="product-title">{{ product.name }}</p>
            <p class="product-price">{{ product.price }} DT</p>
            <router-link :to="{ name: 'TOP', params: { id: product.id } }">
            <button class="quick-view-btn">Quick view</button>
          </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProduitView",
    data() {
      return {
        products: [
          {
            id: 9,
            name: "shoes",
            price: 98,
            image: require("../assets/image pottery/shoes6.jpg"),
            isFavorite: false,
          },
          {
            id: 10,
            name: "shoes ",
            price: 98,
            image: require("../assets/image pottery/shoes7.jpg"),
            isFavorite: true,
          },
          {
            id: 11,
            name: "shoes",
            price: 98,
            image: require("../assets/image pottery/shoes8.jpg"),
            isFavorite: false,
          },
          {
            id: 12,
            name: "shoes ",
            price: 98,
            image: require("../assets/image pottery/shoes9.jpg"),
            isFavorite: false,
          },
        ],
      };
    },
    methods: {
      toggleFavorite(product) {
      const productFound = this.products.find((p) => p.id === product.id);
      if (productFound) {
        product.isFavorite = !product.isFavorite; // Toggle favorite status
      }
      this.$store.commit("toggleFavorite", product);
    },
    },
  };
  </script>
  
  <style scoped>
  /* Général */
  .product-view {
    padding: 2rem;
    background-color: #f9f9f9;
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    color: #6b4226;
    margin-bottom: 2rem;
  }
  
  /* Grille des produits */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  /* Carte produit */
  .product-card {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  
  /* Conteneur image */
  .image-container {
    position: relative;
  }
  
  .product-image {
    width: 100%;
    height: 350px;
    display: block;
  }
  
  .favorite {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
    color: #6b4226;
    cursor: pointer;
  }
  
  .favorite:hover {
    color: red;
  }
  
  /* Détails produit */
  .product-details {
    padding: 1rem;
    text-align: center;
  }
  
  .product-title {
    font-size: 0.9rem;
    color: #555;
  }
  
  .product-price {
    font-size: 1.2rem;
    color: #e63946;
    font-weight: bold;
  }
  
  .quick-view-btn {
    background-color: #6b4226;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background-color 0.3s ease;
  }
  
  .quick-view-btn:hover {
    background-color: #9a6541;
  }
  </style>
  