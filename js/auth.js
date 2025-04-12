
// Authentication module
import { navigateTo } from './main.js';
import { showToast, validateEmail } from './utils.js';

// Handle login
function handleLogin(email, password) {
  if (!email || !password) {
    showToast('Please enter both email and password', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showToast('Please use your LAU email (@lau.edu)', 'error');
    return;
  }
  
  // In a real application, this would be an API call
  // For demo purposes, we'll just simulate a successful login
  setTimeout(() => {
    const user = {
      id: '1',
      email: email,
      name: email.split('@')[0].replace('.', ' '),
      registeredEvents: []
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    showToast('Login successful');
    navigateTo('/home');
  }, 1000);
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('user');
  showToast('Logged out successfully');
}

// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem('user') !== null;
}

// Get current user
function getCurrentUser() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

export { handleLogin, handleLogout, isAuthenticated, getCurrentUser };
