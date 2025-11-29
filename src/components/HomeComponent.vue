<template>
  <div class="home">
    <!-- Hero Banner -->
    <header class="hero-section">
      <div class="banner">
        <img src="../assets/boutique3.jpg" alt="Eterna Collection" />
        <div class="overlay">
          <div class="hero-content">
            <img
                class="overlay-logo"
                src="../assets/eterna-high-resolution-logo-transparent (1).png"
                alt="Eterna Logo"
                @click="showVideo"
            />
            <h1 class="hero-title">Timeless Elegance</h1>
            <p class="hero-subtitle">Designs that transcend every season</p>
            <router-link to="/produit" class="cta-link">
              <button class="cta-button">
                <span>Explore Collection</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </router-link>
          </div>
          <div class="scroll-indicator">
            <span>Scroll to discover</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="section-header">
        <h2>Shop By Category</h2>
        <p class="section-subtitle">Discover our curated collections</p>
      </div>
      <div class="categories-grid">
        <div
            class="category-card"
            v-for="category in categories"
            :key="category.name"
        >
          <router-link :to="`/${category.name}`" class="category-link">
            <div class="category-image-wrapper">
              <img :src="category.image" :alt="category.name" />
              <div class="category-overlay">
                <span class="view-collection">View Collection</span>
              </div>
            </div>
            <div class="category-info">
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h4>Premium Quality</h4>
          <p>Handcrafted with attention to detail</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <h4>Free Shipping</h4>
          <p>On orders over $50</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h4>Easy Returns</h4>
          <p>30-day return policy</p>
        </div>
        <div class="feature-item">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h4>Secure Payment</h4>
          <p>100% secure transactions</p>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="about-section">
      <div class="about-container">
        <div class="about-image-wrapper">
          <img
              src="../assets/boutique3.jpg"
              alt="Eterna Display"
              class="about-image"
          />
          <div class="about-decoration"></div>
        </div>
        <div class="about-content">
          <span class="about-label">Our Story</span>
          <h2>Welcome to Eterna</h2>
          <p class="about-description">
            Our designs transcend trends, offering versatile, enduring pieces
            that celebrate every season and every moment. With a commitment to
            quality and sophistication, Eterna is your go-to for fashion that
            feels as eternal as it looks.
          </p>
          <div class="about-stats">
            <div class="stat-item">
              <h3>1000+</h3>
              <p>Happy Customers</p>
            </div>
            <div class="stat-item">
              <h3>500+</h3>
              <p>Products</p>
            </div>
            <div class="stat-item">
              <h3>5★</h3>
              <p>Average Rating</p>
            </div>
          </div>
          <router-link to="/feedback" class="learn-more-btn">
            Learn More About Us
          </router-link>
        </div>
      </div>
    </section>

    <!-- Video Modal -->
    <transition name="modal-fade">
      <div v-if="isVideoVisible" class="video-modal" @click="closeVideo">
        <div class="video-content" @click.stop>
          <button class="close-btn" @click="closeVideo">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <video controls autoplay>
            <source src="../assets/video/channel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          name: "Clothes",
          image: require("../assets/image vetements/mannequin8.jpg"),
          description: "Timeless fashion pieces"
        },
        {
          name: "Shoes",
          image: require("../assets/image pottery/shoes8.jpg"),
          description: "Step in style"
        },
        {
          name: "Accessories",
          image: require("../assets/image bijoux/accessoir4.jpg"),
          description: "Complete your look"
        },
      ],
      isVideoVisible: false,
    };
  },
  methods: {
    showVideo() {
      this.isVideoVisible = true;
    },
    closeVideo() {
      this.isVideoVisible = false;
    },
  },
};
</script>

<style scoped>
/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1f2937;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 90vh;
  min-height: 600px;
}

.banner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
  transition: transform 8s ease;
}

.banner:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));  /* ✅ MODIFIÉ - Overlay plus sombre */
}

.hero-content {
  text-align: center;
  color: white;
  z-index: 2;
  animation: fadeInUp 1s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.overlay-logo {
  width: 180px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
  position: relative;
  z-index: 10;  /* ✅ AJOUTÉ - Met le logo au-dessus */
}

.overlay-logo:hover {
  transform: scale(1.1);
}

.hero-content {
  text-align: center;
  color: white;
  z-index: 10;  /* ✅ MODIFIÉ - Était z-index: 2 */
  animation: fadeInUp 1s ease;
  position: relative;  /* ✅ AJOUTÉ */
}  

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -1px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  position: relative;
  z-index: 10;  /* ✅ AJOUTÉ */
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.95;
  position: relative;
  z-index: 10;  /* ✅ AJOUTÉ */
}

.cta-link {
  text-decoration: none;
}

.cta-button {
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  padding: 18px 40px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.4s ease;
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.4);
  position: relative;
  z-index: 10;  /* ✅ AJOUTÉ */
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(107, 66, 38, 0.6);
  background: linear-gradient(135deg, #6b4226, #5a3520);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: translateX(5px);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 0.875rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
  z-index: 10;  /* ✅ AJOUTÉ */
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

.scroll-indicator span {
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  font-weight: 400;
}

/* Categories Section */
.categories-section {
  padding: 6rem 2rem;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
}

.categories-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.category-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
}

.category-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.category-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.category-image-wrapper {
  position: relative;
  height: 350px;
  overflow: hidden;
}

.category-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.category-card:hover .category-image-wrapper img {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(107, 66, 38, 0.9), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.category-card:hover .category-overlay {
  opacity: 1;
}

.view-collection {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.category-info {
  padding: 1.5rem;
  text-align: center;
}

.category-info h3 {
  font-size: 1.5rem;
  color: #6b4226;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.category-info p {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: white;
}

.features-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #f9fafb, #e5e7eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b4226;
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon {
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  transform: scale(1.1);
}

.feature-item h4 {
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.feature-item p {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* About Section */
.about-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f9fafb, #ffffff);
}

.about-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.about-image-wrapper {
  position: relative;
}

.about-image {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  position: relative;
  z-index: 2;
}

.about-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  border-radius: 20px;
  top: 30px;
  left: 30px;
  z-index: 1;
}

.about-content {
  padding: 2rem;
}

.about-label {
  display: inline-block;
  color: #8b6f47;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.about-content h2 {
  font-size: 2.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: left;
  font-weight: 700;
}

.about-description {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 2rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2rem;
  color: #6b4226;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.stat-item p {
  color: #6b7280;
  font-size: 0.9rem;
}

.learn-more-btn {
  display: inline-block;
  padding: 14px 32px;
  background: white;
  color: #6b4226;
  text-decoration: none;
  border: 2px solid #6b4226;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  background: #6b4226;
  color: white;
  transform: translateX(5px);
}

/* Video Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 20px;
}

.video-content {
  position: relative;
  width: 100%;
  max-width: 900px;
  background: #1f2937;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.video-content video {
  width: 100%;
  border-radius: 12px;
}

.close-btn {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.close-btn:hover {
  transform: scale(1.1) rotate(90deg);
  background: linear-gradient(135deg, #6b4226, #5a3520);
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .about-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-decoration {
    top: 20px;
    left: 20px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .categories-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .about-content {
    padding: 0;
  }

  .categories-section,
  .about-section {
    padding: 4rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .overlay-logo {
    width:140px;
   
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}
</style>