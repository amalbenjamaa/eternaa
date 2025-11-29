<template>
  <header class="header-section" :class="{ 'scrolled': isScrolled }">
    <!-- Top Banner (Optional - for promotions) -->
    <div class="top-banner">
      <p>Free Shipping on Orders Over $50 | Use Code: ETERNA2025</p>
    </div>

    <div class="container">
      <nav class="navbar">
        <!-- 1. Logo Section -->
        <router-link to="/" class="logo-link">
          <img :src="getImagePath('/assets/eterna-high-resolution-logo-transparent (1).png')" alt="Eterna Logo" class="logo-img" />
        </router-link>

        <!-- 2. Desktop Navigation Links (Hidden on Mobile) -->
        <ul class="nav-links desktop-only">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/produit">Products</router-link></li>
          <li><router-link to="/feedback">Feedback</router-link></li>
        </ul>

        <!-- 3. Icon Actions & Mobile Toggle -->
        <div class="actions-container">
          <!-- Search Icon -->
          <button class="icon-btn search-btn desktop-only" title="Search" @click="toggleSearch">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          <!-- Favorites -->
          <router-link to="/Favorites" class="icon-btn" title="Favorites">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span v-if="favoriteCount > 0" class="badge">{{ favoriteCount }}</span>
            </div>
          </router-link>

          <!-- Cart -->
          <router-link to="/Cart" class="icon-btn cart-btn" title="Cart">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span v-if="cartItemCount > 0" class="badge cart-badge">{{ cartItemCount }}</span>
            </div>
          </router-link>

          <!-- Mobile Hamburger -->
          <button class="menu-toggle mobile-only" @click="toggleMenu" aria-label="Toggle navigation">
            <span :class="['hamburger', { 'open': menuActive }]"></span>
          </button>
        </div>
      </nav>

      <!-- Search Bar (Expandable) -->
      <transition name="expand">
        <div v-if="searchActive" class="search-bar">
          <input
              type="text"
              placeholder="Search products..."
              class="search-input"
              @blur="searchActive = false"
              ref="searchInput"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
      </transition>
    </div>

    <!-- 4. Mobile Menu Dropdown -->
    <transition name="slide-fade">
      <div v-if="menuActive" class="mobile-menu">
        <router-link to="/" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          Home
        </router-link>
        <router-link to="/produit" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Products
        </router-link>
        <router-link to="/feedback" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Feedback
        </router-link>
      </div>
    </transition>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { getImagePath } from '@/utils/imageHelper';

export default {
  name: "HeaderBar",
  data() {
    return {
      menuActive: false,
      isScrolled: false,
      searchActive: false,
    };
  },
  computed: {
    ...mapGetters(["cartItemCount", "favoriteCount"]),
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getImagePath,
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    toggleSearch() {
      this.searchActive = !this.searchActive;
      if (this.searchActive) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 10;
    },
  },
};
</script>

<style scoped>
/* --- Top Banner --- */
.top-banner {
  background: linear-gradient(135deg, #8b6f47 0%, #6b4226 100%);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.top-banner p {
  margin: 0;
}

/* --- 1. General Layout --- */
.header-section {
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.header-section.scrolled {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 85px;
}

/* --- 2. Logo --- */
.logo-link {
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.logo-img {
  height: 50px;
  width: auto;
}

.logo-link:hover {
  transform: scale(1.03);
}

/* --- 3. Desktop Navigation --- */
.nav-links {
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  position: relative;
  padding: 8px 0;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(90deg, #8b6f47, #6b4226);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #6b4226;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

/* --- 4. Icons & Actions --- */
.actions-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon-btn {
  position: relative;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  border-radius: 8px;
}

.icon-btn:hover {
  color: #6b4226;
  background-color: #f9fafb;
  transform: translateY(-2px);
}

.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  font-size: 11px;
  font-weight: 700;
  height: 20px;
  min-width: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.cart-badge {
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  box-shadow: 0 2px 8px rgba(107, 66, 38, 0.4);
}

/* --- Search Bar --- */
.search-bar {
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 14px 50px 14px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  background-color: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #8b6f47;
  background-color: white;
  box-shadow: 0 4px 12px rgba(139, 111, 71, 0.1);
}

.search-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 100px;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* --- 5. Mobile Toggle (Hamburger) --- */
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 32px;
  height: 32px;
  position: relative;
  display: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.menu-toggle:hover {
  background-color: #f3f4f6;
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #374151;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s;
  border-radius: 2px;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: #374151;
  transition: transform 0.3s;
  border-radius: 2px;
  left: 0;
}

.hamburger::before { top: -8px; }
.hamburger::after { top: 8px; }

.hamburger.open { background-color: transparent; }
.hamburger.open::before { transform: rotate(45deg); top: 0; }
.hamburger.open::after { transform: rotate(-45deg); top: 0; }

/* --- 6. Mobile Dropdown Menu --- */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.mobile-menu a {
  padding: 16px 32px;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
}

.mobile-menu a:hover,
.mobile-menu a.router-link-exact-active {
  background-color: #f9fafb;
  border-left-color: #6b4226;
  color: #6b4226;
}

.mobile-menu a svg {
  transition: transform 0.3s ease;
}

.mobile-menu a:hover svg {
  transform: scale(1.1);
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* --- 7. Responsive Queries --- */
@media (max-width: 768px) {
  .desktop-only { display: none; }
  .mobile-only { display: block; }

  .top-banner {
    font-size: 12px;
    padding: 8px;
  }

  .navbar {
    height: 75px;
  }

  .logo-img {
    height: 40px;
  }

  .actions-container {
    gap: 16px;
  }

  .container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .top-banner p {
    font-size: 11px;
  }

  .actions-container {
    gap: 12px;
  }
}
</style>