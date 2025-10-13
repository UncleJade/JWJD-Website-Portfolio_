// Section Reveal on Scroll
const sections = document.querySelectorAll('.section');
function revealSections() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Corner Menu Logic (only if present)
const cornerMenuBtn = document.getElementById('corner-menu-btn');
const cornerMenuOverlay = document.getElementById('corner-menu-overlay');
const cornerMenuClose = document.getElementById('corner-menu-close');
if (cornerMenuBtn && cornerMenuOverlay && cornerMenuClose) {
  cornerMenuBtn.addEventListener('click', () => {
    cornerMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  cornerMenuClose.addEventListener('click', () => {
    cornerMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  // Close menu when clicking the overlay background or a link
  cornerMenuOverlay.addEventListener('click', (e) => {
    if (e.target === cornerMenuOverlay) {
      cornerMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  const cornerLinks = document.querySelectorAll('.corner-menu-links a, .corner-menu-links button');
  cornerLinks.forEach(link => {
    link.addEventListener('click', () => {
      cornerMenuOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀' : '🌙';
  }
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}
(function () {
  const saved = localStorage.getItem('theme');
  setTheme(saved || 'dark');
})();

// Parallax Effect for Project Images
window.addEventListener('scroll', () => {
  document.querySelectorAll('.anime-parallax').forEach(el => {
    const speed = 0.2;
    const offset = window.scrollY * speed;
    el.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  });
});

// Contact Form (send via mailto) — only if present
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:jadedevilles@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Certification popup logic — only if present
const certCards = document.querySelectorAll('.cert-card');
const certPopup = document.getElementById('cert-popup');
const certPopupClose = document.getElementById('cert-popup-close');
const certPopupTitle = document.getElementById('cert-popup-title');
const certPopupOrg = document.getElementById('cert-popup-org');
const certPopupSkills = document.getElementById('cert-popup-skills');
if (certCards.length && certPopup && certPopupClose && certPopupTitle && certPopupOrg && certPopupSkills) {
  certCards.forEach(card => {
    card.addEventListener('click', function() {
      certPopupTitle.textContent = card.querySelector('.cert-title').textContent;
      certPopupOrg.textContent = card.querySelector('.cert-org').textContent;
      const skills = card.getAttribute('data-skills');
      certPopupSkills.textContent = 'Skills Acquired: ' + skills;
      certPopup.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  certPopupClose.addEventListener('click', function() {
    certPopup.classList.remove('active');
    document.body.style.overflow = '';
  });
  certPopup.addEventListener('click', function(e) {
    if (e.target === certPopup) {
      certPopup.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Space Animation System
const ENABLE_SPACE_STARS = false;
function createSpaceElements() {
  if (!ENABLE_SPACE_STARS) return; // Stars disabled
  const spaceContainer = document.querySelector('.space-container');
  if (!spaceContainer) return;

  // Create stars
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const sizeClass = Math.random() < 0.6 ? 'small' : (Math.random() < 0.8 ? 'medium' : 'large');
    star.classList.add(sizeClass);
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    spaceContainer.appendChild(star);
  }

  // Create occasional shooting stars
  for (let i = 0; i < 3; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.left = Math.random() * 50 + 'vw';
    shootingStar.style.top = Math.random() * 50 + 'vh';
    spaceContainer.appendChild(shootingStar);
  }
}
window.addEventListener('load', createSpaceElements);

// All visitor counter code removed.

// Gmail direct button popup logic
// Removed: No longer needed since Gmail button is now a direct link

// --- Visitor Viewer ---
window.addEventListener('DOMContentLoaded', function() {
  var visitorCountEl = document.querySelector('#visitor-count span');
  if (!visitorCountEl) return;
  var visits = parseInt(localStorage.getItem('jade_visits') || '0', 10) + 1;
  localStorage.setItem('jade_visits', visits);
  visitorCountEl.textContent = visits;
});

// ========================================
// PROJECT VIEWS - View Switching & Carousel
// ========================================

(function() {
  // View Toggle Buttons
  const gridViewBtn = document.getElementById('grid-view-btn');
  const carouselViewBtn = document.getElementById('carousel-view-btn');
  const masonryViewBtn = document.getElementById('masonry-view-btn');
  
  const gridView = document.getElementById('grid-view');
  const carouselView = document.getElementById('carousel-view');
  const masonryView = document.getElementById('masonry-view');
  
  if (!gridViewBtn || !carouselViewBtn || !masonryViewBtn) return;
  
  // Switch to Grid View
  gridViewBtn.addEventListener('click', () => {
    switchView('grid');
  });
  
  // Switch to Carousel View
  carouselViewBtn.addEventListener('click', () => {
    switchView('carousel');
  });
  
  // Switch to Masonry View
  masonryViewBtn.addEventListener('click', () => {
    switchView('masonry');
  });
  
  function switchView(viewType) {
    // Remove active class from all buttons
    gridViewBtn.classList.remove('active');
    carouselViewBtn.classList.remove('active');
    masonryViewBtn.classList.remove('active');
    
    // Hide all views
    gridView.classList.add('hidden');
    carouselView.classList.add('hidden');
    masonryView.classList.add('hidden');
    
    // Show selected view and activate button
    switch(viewType) {
      case 'grid':
        gridView.classList.remove('hidden');
        gridViewBtn.classList.add('active');
        break;
      case 'carousel':
        carouselView.classList.remove('hidden');
        carouselViewBtn.classList.add('active');
        break;
      case 'masonry':
        masonryView.classList.remove('hidden');
        masonryViewBtn.classList.add('active');
        break;
    }
  }
  
  // ========================================
  // CAROUSEL FUNCTIONALITY
  // ========================================
  
  const carouselTrack = document.getElementById('carousel-track');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const slides = document.querySelectorAll('.carousel-slide');
  
  if (!carouselTrack || !carouselPrev || !carouselNext) return;
  
  let currentSlide = 0;
  const totalSlides = slides.length;
  
  // Update carousel position
  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update active slide
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    carouselDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  // Next slide
  carouselNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });
  
  // Previous slide
  carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
  
  // Dot navigation
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
  
  // Auto-play carousel (optional - uncomment to enable)
  // let autoPlayInterval = setInterval(() => {
  //   currentSlide = (currentSlide + 1) % totalSlides;
  //   updateCarousel();
  // }, 5000);
  
  // Pause auto-play on hover
  // carouselView.addEventListener('mouseenter', () => {
  //   clearInterval(autoPlayInterval);
  // });
  
  // carouselView.addEventListener('mouseleave', () => {
  //   autoPlayInterval = setInterval(() => {
  //     currentSlide = (currentSlide + 1) % totalSlides;
  //     updateCarousel();
  //   }, 5000);
  // });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (carouselView.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }
  });
  
  // Swipe support for touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselView.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselView.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        currentSlide = (currentSlide + 1) % totalSlides;
      } else {
        // Swipe right - previous slide
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      }
      updateCarousel();
    }
  }
  
  // Initialize carousel
  updateCarousel();
})();
