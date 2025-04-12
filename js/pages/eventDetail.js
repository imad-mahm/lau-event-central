
// Event detail page initialization
import { getEventById } from '../data.js';
import { formatDate, formatTime } from '../utils.js';
import { isLoggedIn, getCurrentUser } from '../auth.js';

// Initialize event detail page
function initEventDetailPage() {
  console.log('Event detail page initialized');
  
  // Redirect if not logged in
  if (!isLoggedIn()) {
    window.location.href = '/';
    return;
  }
  
  // Include layout
  fetch('/templates/layout.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('layout-include').innerHTML = html;
    });
  
  // Get event ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  
  if (!eventId) {
    window.location.href = '/home';
    return;
  }
  
  // Get event details
  const event = getEventById(eventId);
  
  if (!event) {
    window.location.href = '/home';
    return;
  }
  
  // Render event details
  renderEventDetails(event);
  
  // Check if user is already registered
  checkRegistration(eventId);
}

// Render event details
function renderEventDetails(event) {
  const eventContainer = document.getElementById('eventContainer');
  if (!eventContainer) return;
  
  // Get template
  const template = document.getElementById('eventDetailTemplate');
  const content = template.content.cloneNode(true);
  
  // Set event details
  const image = content.querySelector('.event-image');
  image.src = event.image;
  image.alt = event.title;
  
  content.querySelector('.event-title').textContent = event.title;
  content.querySelector('.event-description').textContent = event.description;
  content.querySelector('.event-date').textContent = formatDate(event.date);
  content.querySelector('.event-time').textContent = event.time;
  content.querySelector('.event-location').textContent = event.location;
  content.querySelector('.event-organizer').textContent = event.organizer;
  
  content.querySelector('#spotsRemaining').textContent = event.spotsRemaining;
  content.querySelector('#capacity').textContent = event.capacity;
  
  // Show or hide livestream section
  const livestreamSection = content.querySelector('#livestreamSection');
  if (event.hasLivestream) {
    livestreamSection.style.display = 'block';
  } else {
    livestreamSection.style.display = 'none';
  }
  
  // Disable register button if no spots remaining
  const registerButton = content.querySelector('#registerButton');
  if (event.spotsRemaining <= 0) {
    registerButton.disabled = true;
    registerButton.textContent = 'No Spots Available';
  }
  
  // Append to container
  eventContainer.innerHTML = '';
  eventContainer.appendChild(content);
}

// Check if user is already registered for this event
function checkRegistration(eventId) {
  const user = getCurrentUser();
  if (!user) return;
  
  const registeredEvent = user.registeredEvents.find(reg => reg.eventId === eventId);
  
  if (registeredEvent) {
    const registerButton = document.getElementById('registerButton');
    const livestreamButton = document.getElementById('livestreamButton');
    
    if (registeredEvent.registrationType === 'in-person') {
      // User registered for in-person attendance
      registerButton.disabled = true;
      registerButton.textContent = 'Registered';
    } else if (registeredEvent.registrationType === 'livestream') {
      // User registered for livestream
      livestreamButton.disabled = true;
      livestreamButton.textContent = 'Registered for Livestream';
    }
  }
}

export { initEventDetailPage };
