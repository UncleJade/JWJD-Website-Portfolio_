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

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'light' ? 'dark' : 'light');
}
themeToggle.addEventListener('click', toggleTheme);
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

// Contact Form (send via mailto)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:jadedevilles@gmail.com?subject=${subject}&body=${body}`;
});

// All visitor counter code removed.

// Gmail direct button popup logic
// Removed: No longer needed since Gmail button is now a direct link

// Certification popup logic
const certCards = document.querySelectorAll('.cert-card');
const certPopup = document.getElementById('cert-popup');
const certPopupClose = document.getElementById('cert-popup-close');
const certPopupTitle = document.getElementById('cert-popup-title');
const certPopupOrg = document.getElementById('cert-popup-org');
const certPopupSkills = document.getElementById('cert-popup-skills');

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

// Space Animation System
function createSpaceElements() {
  const spaceContainer = document.querySelector('.space-container');
  if (!spaceContainer) return;

  // Create stars
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = `star ${Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small'}`;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    spaceContainer.appendChild(star);
  }

  // Create shooting stars
  function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = Math.random() * 50 + '%';
    shootingStar.style.left = '-100px';
    spaceContainer.appendChild(shootingStar);
    
    setTimeout(() => {
      if (shootingStar.parentNode) {
        shootingStar.parentNode.removeChild(shootingStar);
      }
    }, 2000);
  }

  // Create shooting stars periodically
  setInterval(createShootingStar, 3000);
  createShootingStar(); // Create first one immediately

  // Create spaceships
  function createSpaceship() {
    const spaceship = document.createElement('div');
    spaceship.className = 'spaceship';
    spaceship.style.top = Math.random() * 80 + 10 + '%';
    spaceship.style.left = '-50px';
    spaceContainer.appendChild(spaceship);
    
    setTimeout(() => {
      if (spaceship.parentNode) {
        spaceship.parentNode.removeChild(spaceship);
      }
    }, 15000);
  }

  // Create spaceships periodically
  setInterval(createSpaceship, 8000);
  createSpaceship(); // Create first one immediately

  // Create asteroids
  function createAsteroid() {
    const asteroid = document.createElement('div');
    const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
    asteroid.className = `asteroid ${size}`;
    asteroid.style.top = Math.random() * 80 + 10 + '%';
    asteroid.style.left = '-50px';
    spaceContainer.appendChild(asteroid);
    
    setTimeout(() => {
      if (asteroid.parentNode) {
        asteroid.parentNode.removeChild(asteroid);
      }
    }, 20000);
  }

  // Create asteroids periodically
  setInterval(createAsteroid, 12000);
  createAsteroid(); // Create first one immediately

  // Create planets
  function createPlanet() {
    const planet = document.createElement('div');
    const types = ['earth-like', 'gas-giant', 'ice-planet'];
    const type = types[Math.floor(Math.random() * types.length)];
    planet.className = `planet ${type}`;
    planet.style.top = Math.random() * 60 + 20 + '%';
    planet.style.left = '-100px';
    spaceContainer.appendChild(planet);
    
    setTimeout(() => {
      if (planet.parentNode) {
        planet.parentNode.removeChild(planet);
      }
    }, 40000);
  }

  // Create planets periodically
  setInterval(createPlanet, 25000);
  createPlanet(); // Create first one immediately
}

// Ensure animation containers exist
function ensureAnimationContainers() {
  let leavesContainer = document.querySelector('.leaves-container');
  if (!leavesContainer) {
    leavesContainer = document.createElement('div');
    leavesContainer.className = 'leaves-container';
    document.body.appendChild(leavesContainer);
  }
  let snowContainer = document.querySelector('.snow-container');
  if (!snowContainer) {
    snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    document.body.appendChild(snowContainer);
  }
  return { leavesContainer, snowContainer };
}

// Call on DOMContentLoaded to ensure containers and start animation
window.addEventListener('DOMContentLoaded', () => {
  const containers = ensureAnimationContainers();
  window.leavesContainer = containers.leavesContainer;
  window.snowContainer = containers.snowContainer;
  
  // Initialize space animation
  createSpaceElements();
});

// --- Visitor Viewer ---
window.addEventListener('DOMContentLoaded', function() {
  var visitorCountEl = document.querySelector('#visitor-count span');
  if (!visitorCountEl) return;
  var visits = parseInt(localStorage.getItem('jade_visits') || '0', 10) + 1;
  localStorage.setItem('jade_visits', visits);
  visitorCountEl.textContent = visits;
});
