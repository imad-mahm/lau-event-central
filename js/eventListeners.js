
// Event listeners for various pages
import { navigateTo } from './main.js';
import { 
  handleLogin, 
  handleLogout 
} from './auth.js';
import {
  handleEventSearch,
  handleFilterToggle, 
  handleDateSelection,
  handleClubSelection,
  handleResetFilters
} from './filters.js';
import {
  handleEventRegistration,
  handleLivestreamRegistration
} from './registration.js';
import { handleTranscriptUpload } from './transcript.js';

// Setup event listeners based on current page
function setupEventListeners(path) {
  // Common event listeners for all pages with layout
  if (path !== '/') {
    setupNavbarListeners();
  }
  
  // Page-specific event listeners
  switch (path) {
    case '/':
      setupLoginListeners();
      break;
    case '/home':
      setupHomeListeners();
      break;
    case '/event':
      setupEventDetailListeners();
      break;
    case '/my-events':
      setupMyEventsListeners();
      break;
    case '/transcript':
      setupTranscriptListeners();
      break;
    default:
      // No specific listeners for not found page
      break;
  }
}

// Navbar event listeners
function setupNavbarListeners() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
      navigateTo('/');
    });
  }
}

// Login page event listeners
function setupLoginListeners() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      handleLogin(email, password);
    });
  }
}

// Home page event listeners
function setupHomeListeners() {
  const searchInput = document.getElementById('searchInput');
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const dateInput = document.getElementById('dateInput');
  const clubSelect = document.getElementById('clubSelect');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const uploadTranscriptBtn = document.getElementById('uploadTranscriptBtn');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => handleEventSearch(searchInput.value));
  }
  
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', handleFilterToggle);
  }
  
  if (dateInput) {
    dateInput.addEventListener('change', () => handleDateSelection(dateInput.value));
  }
  
  if (clubSelect) {
    clubSelect.addEventListener('change', () => handleClubSelection(clubSelect.value));
  }
  
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', handleResetFilters);
  }
  
  if (uploadTranscriptBtn) {
    uploadTranscriptBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('/transcript');
    });
  }
  
  // Event cards click listeners
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.getAttribute('data-event-id');
      navigateTo(`/event?id=${eventId}`);
    });
  });
}

// Event detail page event listeners
function setupEventDetailListeners() {
  const registerButton = document.getElementById('registerButton');
  const livestreamButton = document.getElementById('livestreamButton');
  const backButton = document.getElementById('backButton');
  
  if (registerButton) {
    registerButton.addEventListener('click', handleEventRegistration);
  }
  
  if (livestreamButton) {
    livestreamButton.addEventListener('click', handleLivestreamRegistration);
  }
  
  if (backButton) {
    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }
}

// My events page event listeners
function setupMyEventsListeners() {
  // Tab switching functionality
  const tabTriggers = document.querySelectorAll('[data-tab]');
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = trigger.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      document.getElementById(`${tab}-content`).style.display = 'block';
      
      tabTriggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');
    });
  });
}

// Transcript page event listeners
function setupTranscriptListeners() {
  const transcriptForm = document.getElementById('transcriptForm');
  if (transcriptForm) {
    transcriptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('transcriptFile');
      handleTranscriptUpload(fileInput.files[0]);
    });
  }
}

export { setupEventListeners };
