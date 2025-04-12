
// Login page initialization
import { handleLogin } from '../auth.js';

// Initialize login page
function initLoginPage() {
  console.log('Login page initialized');
  
  // Check if user is already logged in
  if (localStorage.getItem('user')) {
    window.location.href = '/home';
  }
}

export { initLoginPage };
