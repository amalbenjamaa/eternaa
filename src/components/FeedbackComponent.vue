<template>
  <div class="feedback-view">
    <!-- Hero Section -->
    <div class="hero-section">
      <h1>Customer Reviews</h1>
      <p class="hero-subtitle">See what our customers are saying about us</p>
    </div>

    <div class="feedback-container">
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h3>{{ averageRating.toFixed(1) }}</h3>
          <p>Average Rating</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>{{ feedbacks.length }}</h3>
          <p>Total Reviews</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </div>
          <h3>{{ satisfactionRate }}%</h3>
          <p>Satisfaction</p>
        </div>
      </div>

      <!-- Reviews Slider -->
      <div class="reviews-section">
        <h2 class="section-title">What Our Customers Say</h2>
        <div
            class="feedback-slider"
            ref="feedbackSlider"
            @mouseenter="stopSlider"
            @mouseleave="startSlider"
        >
          <div
              class="feedback-card"
              v-for="(feedback, index) in feedbacks"
              :key="index"
          >
            <div class="feedback-header">
              <div class="avatar">
                {{ feedback.name.charAt(0) }}
              </div>
              <div class="customer-info">
                <h3>{{ feedback.name }}</h3>
                <div class="rating-stars">
                  <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= feedback.rating }">
                    ★
                  </span>
                </div>
              </div>
            </div>
            <p class="feedback-text">{{ feedback.description }}</p>
            <div class="verified-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Verified Customer
            </div>
          </div>
          <!-- Duplicate for seamless scroll -->
          <div
              class="feedback-card"
              v-for="(feedback, index) in feedbacks"
              :key="`duplicate-${index}`"
          >
            <div class="feedback-header">
              <div class="avatar">
                {{ feedback.name.charAt(0) }}
              </div>
              <div class="customer-info">
                <h3>{{ feedback.name }}</h3>
                <div class="rating-stars">
                  <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= feedback.rating }">
                    ★
                  </span>
                </div>
              </div>
            </div>
            <p class="feedback-text">{{ feedback.description }}</p>
            <div class="verified-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Verified Customer
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback Form -->
      <div class="form-section">
        <form @submit.prevent="addFeedback" class="feedback-form">
          <h2 class="form-title">Share Your Experience</h2>
          <p class="form-subtitle">We'd love to hear from you!</p>

          <div class="form-grid">
            <div class="form-group">
              <label for="name">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Your Name
              </label>
              <input
                  type="text"
                  id="name"
                  v-model="newFeedback.name"
                  placeholder="Enter your name"
                  required
              />
            </div>

            <div class="form-group">
              <label for="rating">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                Rating
              </label>
              <select id="rating" v-model="newFeedback.rating" required>
                <option disabled value="">Select a rating</option>
                <option v-for="rate in ratings" :key="rate" :value="rate">
                  {{ rate }} Star{{ rate > 1 ? 's' : '' }} {{ '★'.repeat(rate) }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group form-group-full">
            <label for="description">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Your Review
            </label>
            <textarea
                id="description"
                v-model="newFeedback.description"
                placeholder="Tell us about your experience..."
                rows="5"
                required
            ></textarea>
          </div>

          <button type="submit" class="submit-button">
            <span>Submit Review</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newFeedback: {
        name: "",
        description: "",
        rating: "",
      },
      feedbacks: [
        { name: "you you", description: "Great service! The quality exceeded my expectations and delivery was fast.", rating: 5 },
        { name: "you you", description: "Very satisfied with my purchase. Will definitely order again!", rating: 4 },
        { name: "you you", description: "Beautiful products and excellent customer support. Highly recommend!", rating: 5 },
        { name: "you you", description: "Amazing quality and fast shipping. Love the attention to detail!", rating: 5 },
        { name: "you you", description: "Good products overall. The packaging was impressive too.", rating: 4 },
      ],
      ratings: [1, 2, 3, 4, 5],
      sliderInterval: null,
      sliderSpeed: 1,
    };
  },
  computed: {
    averageRating() {
      if (this.feedbacks.length === 0) return 0;
      const sum = this.feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
      return sum / this.feedbacks.length;
    },
    satisfactionRate() {
      if (this.feedbacks.length === 0) return 0;
      const satisfiedCustomers = this.feedbacks.filter(f => f.rating >= 4).length;
      return Math.round((satisfiedCustomers / this.feedbacks.length) * 100);
    }
  },
  methods: {
    addFeedback() {
      if (this.newFeedback.name && this.newFeedback.description && this.newFeedback.rating) {
        this.feedbacks.unshift({ ...this.newFeedback });
        this.newFeedback = { name: "", description: "", rating: "" };

        // Show success message
        alert("Thank you for your feedback! Your review has been submitted.");
      }
    },
    startSlider() {
      const slider = this.$refs.feedbackSlider;
      if (!slider) return;
      this.sliderInterval = setInterval(() => {
        slider.scrollLeft += this.sliderSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }, 16);
    },
    stopSlider() {
      clearInterval(this.sliderInterval);
    },
  },
  mounted() {
    this.startSlider();
  },
  beforeUnmount() {
    this.stopSlider();
  },
};
</script>

<style scoped>
.feedback-view {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(to bottom, #ffffff, #f9fafb);
  color: #1f2937;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  font-weight: 400;
}

/* Stats Section */
.stats-section {
  max-width: 1400px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #f9fafb, #e5e7eb);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b4226;
}

.stat-card h3 {
  font-size: 2.5rem;
  color: #6b4226;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.stat-card p {
  color: #6b7280;
  font-size: 0.95rem;
}

/* Reviews Section */
.reviews-section {
  margin-bottom: 4rem;
  overflow: hidden;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 2.5rem;
  font-weight: 700;
}

.feedback-slider {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 20px 2rem;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.feedback-slider::-webkit-scrollbar {
  display: none;
}

.feedback-card {
  flex: 0 0 380px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.feedback-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.customer-info h3 {
  font-size: 1.1rem;
  color: #1f2937;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #d1d5db;
  font-size: 1.1rem;
}

.star.filled {
  color: #fbbf24;
}

.feedback-text {
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0fdf4;
  color: #16a34a;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.verified-badge svg {
  color: #16a34a;
}

/* Form Section */
.form-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feedback-form {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.form-title {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 700;
}

.form-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group-full {
  grid-column: 1 / -1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form-group label svg {
  color: #6b4226;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 14px 18px;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #f9fafb;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #8b6f47;
  background: white;
  box-shadow: 0 0 0 4px rgba(139, 111, 71, 0.1);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
  background: linear-gradient(135deg, #8b6f47, #6b4226);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(107, 66, 38, 0.3);
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 66, 38, 0.4);
  background: linear-gradient(135deg, #6b4226, #5a3520);
}

.submit-button svg {
  transition: transform 0.3s ease;
}

.submit-button:hover svg {
  transform: translateX(5px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .form-group-full {
    grid-column: 1;
  }

  .feedback-form {
    padding: 2rem 1.5rem;
  }

  .feedback-slider {
    padding: 20px 1rem;
  }

  .feedback-card {
    flex: 0 0 320px;
  }
}
</style>