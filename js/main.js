
// Main Application JavaScript
import { routes } from './routes.js';
import { showToast } from './utils.js';
import { setupEventListeners } from './eventListeners.js';

// Application state
let currentUser = null;
let currentRoute = null;

// Check if user is logged in
function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

// Load user data
function loadUserData() {
  const userData = localStorage.getItem('user');
  if (userData) {
    currentUser = JSON.parse(userData);
    return currentUser;
  }
  return null;
}

// Navigate to a specific route
function navigateTo(path) {
  const route = routes[path] || routes['*'];
  const app = document.getElementById('app');
  
  currentRoute = path;
  window.history.pushState({}, '', path);
  
  // Check auth requirements
  if (route.requiresAuth && !isLoggedIn()) {
    navigateTo('/');
    showToast('Please login first', 'error');
    return;
  }
  
  // Fetch and render the template
  fetch(route.template)
    .then(response => response.text())
    .then(html => {
      app.innerHTML = html;
      document.title = route.title;
      
      // Setup event listeners for the new page
      setupEventListeners(path);
      
      // Call the init function if it exists
      if (route.init) {
        route.init();
      }
    })
    .catch(error => {
      console.error('Error loading template:', error);
      app.innerHTML = '<div class="page-container"><h1>Error loading page</h1></div>';
    });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname);
});

// Handle link clicks
document.addEventListener('click', e => {
  const { target } = e;
  if (target.matches('[data-link]')) {
    e.preventDefault();
    navigateTo(target.getAttribute('href'));
  }
});

// Initialize the application
function init() {
  loadUserData();
  navigateTo(window.location.pathname);
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for use in other modules
export { navigateTo, isLoggedIn, loadUserData, currentUser };
