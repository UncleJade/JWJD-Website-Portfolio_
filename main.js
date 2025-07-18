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

// Ensure leaves and snow containers exist
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
});

// --- Visitor Viewer ---
window.addEventListener('DOMContentLoaded', function() {
  var visitorCountEl = document.querySelector('#visitor-count span');
  if (!visitorCountEl) return;
  var visits = parseInt(localStorage.getItem('jade_visits') || '0', 10) + 1;
  localStorage.setItem('jade_visits', visits);
  visitorCountEl.textContent = visits;
});
