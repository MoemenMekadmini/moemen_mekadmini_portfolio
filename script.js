// Dark mode toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to system preference
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (prefersDark.matches) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

// Apply theme to document
function applyTheme(theme) {
  if (theme === 'dark') {
    html.classList.add('dark-mode');
    updateToggleIcon('sun');
  } else {
    html.classList.remove('dark-mode');
    updateToggleIcon('moon');
  }
  localStorage.setItem('theme', theme);
}

// Update toggle button icon
function updateToggleIcon(icon) {
  const iconElement = themeToggle.querySelector('i');
  iconElement.className = icon === 'sun' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// Toggle dark mode with glow effect
themeToggle.addEventListener('click', () => {
  // Add glow effect
  themeToggle.classList.remove('active');
  // Trigger reflow to restart animation
  void themeToggle.offsetWidth;
  themeToggle.classList.add('active');
  
  // Toggle dark mode
  const isDarkMode = html.classList.contains('dark-mode');
  applyTheme(isDarkMode ? 'light' : 'dark');
  
  // Remove glow effect after animation
  setTimeout(() => {
    themeToggle.classList.remove('active');
  }, 600);
});

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
  // Only apply system preference if no saved preference exists
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// ===== MOBILE MENU FUNCTIONALITY =====
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
const links = navLinks.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('header')) {
    navLinks.classList.remove('active');
  }
});

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);
initTheme(); // Also call immediately in case DOM is already loaded
document.getElementById("year").textContent = new Date().getFullYear();

