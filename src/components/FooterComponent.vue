<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <!-- Team Section -->
        <div class="team-section">
          <h3>Our Team</h3>
          <div class="team-members">
            <!-- Membre 1 - Amal -->
            <div class="team-member">
              <div class="member-avatar-wrapper">
                <div class="avatar-glow"></div>
                <img
                  src="@/assets/amal.jpg"
                  alt="Amal Benjamaa"
                  class="member-avatar"
                />
              </div>
              <div class="member-info">
                <p class="member-name">Amal Benjamaa</p>
                <p class="member-role">Co-founder</p>
              </div>
            </div>

            <!-- Membre 2 -->
            <div class="team-member">
              <div class="member-avatar-wrapper">
                <div class="avatar-glow green"></div>
                <img
                  src="@/assets/molka.jpeg"
                  alt="Team Member 2"
                  class="member-avatar"
                />
              </div>
              <div class="member-info">
                <p class="member-name">Molka Bejaoui</p>
                <p class="member-role">Co-founder</p>
              </div>
            </div>

            <!-- Membre 3 -->
            <div class="team-member">
              <div class="member-avatar-wrapper">
                <div class="avatar-glow orange"></div>
                <img
                  src="@/assets/refka.jpg"
                  alt="Team Member 3"
                  class="member-avatar"
                />
              </div>
              <div class="member-info">
                <p class="member-name">Refka Mimouni</p>
                <p class="member-role">Co-founder</p>
              </div>
            </div>

            <!-- Membre 4 -->
            <div class="team-member">
              <div class="member-avatar-wrapper">
                <div class="avatar-glow pink"></div>
                <img
                  src="@/assets/farah.jpg"
                  alt="Team Member 4"
                  class="member-avatar"
                />
              </div>
              <div class="member-info">
                <p class="member-name">Farah Braiek</p>
                <p class="member-role">Co-founder</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Copyright Section -->
        <div class="copyright-section">
          <p class="copyright">© 2025 Your Store. All rights reserved.</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy Policy</a>
            <span class="separator">|</span>
            <a href="#" class="footer-link">Terms of Service</a>
          </div>
        </div>

        <!-- Social Links Section -->
        <div class="social-section">
          <h3>Connect With Us</h3>
          <div class="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link facebook"
            >
              <div class="social-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link instagram"
            >
              <div class="social-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link twitter"
            >
              <div class="social-icon">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, #1a1a1a, #000000);
  color: #d1d5db;
  border-top: 1px solid #374151;
  z-index: 100;
  padding: 2.5rem 0 1.5rem;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: start;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1.5fr 1fr 1fr;
  }
}

/* Team Section */
.team-section {
  text-align: center;
}

@media (min-width: 768px) {
  .team-section {
    text-align: left;
  }
}

.team-section h3 {
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
}

.team-members {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .team-members {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .team-members {
    grid-template-columns: repeat(4, 1fr);
  }
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.team-member:hover {
  background-color: rgba(55, 65, 81, 0.3);
  transform: translateY(-4px);
}

.member-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar-glow {
  position: absolute;
  inset: -3px;
  background: linear-gradient(to right, #3b82f6, #9333ea);
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(6px);
  transition: all 0.3s;
}

.avatar-glow.green {
  background: linear-gradient(to right, #10b981, #059669);
}

.avatar-glow.orange {
  background: linear-gradient(to right, #f59e0b, #ef4444);
}

.avatar-glow.pink {
  background: linear-gradient(to right, #ec4899, #8b5cf6);
}

.member-avatar-wrapper:hover .avatar-glow {
  opacity: 1;
  filter: blur(8px);
}

.member-avatar {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #374151;
  transition: transform 0.3s;
}

.team-member:hover .member-avatar {
  transform: scale(1.1);
  border-color: #4b5563;
}

.member-info {
  text-align: center;
}

.member-name {
  color: white;
  font-weight: 600;
  margin: 0;
  font-size: 0.85rem;
}

.member-role {
  font-size: 0.7rem;
  color: #9ca3af;
  margin: 0.125rem 0 0 0;
}

/* Copyright Section */
.copyright-section {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.copyright {
  font-size: 0.875rem;
  color: #9ca3af;
  margin: 0 0 0.75rem 0;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 0.8rem;
}

.footer-link {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: white;
  transition: width 0.3s;
}

.footer-link:hover {
  color: white;
}

.footer-link:hover::after {
  width: 100%;
}

.separator {
  color: #4b5563;
}

/* Social Section */
.social-section {
  text-align: center;
}

@media (min-width: 768px) {
  .social-section {
    text-align: right;
  }
}

.social-section h3 {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.875rem;
}

@media (min-width: 768px) {
  .social-links {
    justify-content: flex-end;
  }
}

.social-link {
  position: relative;
  text-decoration: none;
}

.social-link::before {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 0.625rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.social-link.facebook::before {
  background-color: rgba(37, 99, 235, 0.15);
}

.social-link.instagram::before {
  background: linear-gradient(to right, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15));
}

.social-link.twitter::before {
  background-color: rgba(59, 130, 246, 0.15);
}

.social-link:hover::before {
  opacity: 1;
}

.social-icon {
  position: relative;
  width: 44px;
  height: 44px;
  background-color: #1f2937;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #374151;
  transition: all 0.3s;
}

.social-icon svg {
  width: 20px;
  height: 20px;
  color: #9ca3af;
  transition: color 0.3s;
}

.social-link.facebook:hover .social-icon {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.social-link.facebook:hover .social-icon svg {
  color: #3b82f6;
}

.social-link.instagram:hover .social-icon {
  border-color: #ec4899;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
}

.social-link.instagram:hover .social-icon svg {
  color: #ec4899;
}

.social-link.twitter:hover .social-icon {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.social-link.twitter:hover .social-icon svg {
  color: #3b82f6;
}
</style>