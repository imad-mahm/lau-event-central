
// Home page initialization
import { getAllEvents, getAllClubs } from '../data.js';
import { isLoggedIn } from '../main.js';
import { showToast } from '../utils.js';
import { truncateText } from '../utils.js';

// Initialize home page
function initHomePage() {
  console.log('Home page initialized');
  
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
  
  // Load events
  const events = getAllEvents();
  renderEventCards(events);
  
  // Populate club select
  const clubs = getAllClubs();
  const clubSelect = document.getElementById('clubSelect');
  
  if (clubSelect) {
    clubs.forEach(club => {
      const option = document.createElement('option');
      option.value = club;
      option.textContent = club;
      clubSelect.appendChild(option);
    });
  }
}

// Render event cards
function renderEventCards(events) {
  const eventsContainer = document.getElementById('eventsContainer');
  const emptyState = document.getElementById('emptyState');
  
  if (!eventsContainer) return;
  
  // Clear container
  eventsContainer.innerHTML = '';
  
  if (events.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  
  if (emptyState) emptyState.style.display = 'none';
  
  // Get template
  const template = document.getElementById('eventCardTemplate');
  
  // Create and append event cards
  events.forEach(event => {
    const card = template.content.cloneNode(true);
    
    // Set attributes and content
    const cardElement = card.querySelector('.event-card');
    cardElement.setAttribute('data-event-id', event.id);
    
    const image = card.querySelector('.card-image');
    image.src = event.image;
    image.alt = event.title;
    
    card.querySelector('.card-title').textContent = event.title;
    card.querySelector('.card-text').textContent = truncateText(event.description, 100);
    card.querySelector('.event-date').textContent = event.date;
    card.querySelector('.event-location').textContent = event.location;
    card.querySelector('.event-category').textContent = event.category;
    card.querySelector('.event-spots').textContent = event.spotsRemaining;
    
    // Add click event listener
    cardElement.addEventListener('click', () => {
      window.location.href = `/event?id=${event.id}`;
    });
    
    eventsContainer.appendChild(card);
  });
}

export { initHomePage, renderEventCards };
