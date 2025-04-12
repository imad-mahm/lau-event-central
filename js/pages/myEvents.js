
// My events page initialization
import { getEventsByIds } from '../data.js';
import { isLoggedIn, getCurrentUser } from '../auth.js';
import { formatDate } from '../utils.js';

// Initialize my events page
function initMyEventsPage() {
  console.log('My events page initialized');
  
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
  
  // Load user's events
  loadUserEvents();
}

// Load user's registered events
function loadUserEvents() {
  const user = getCurrentUser();
  if (!user) return;
  
  const registeredEvents = user.registeredEvents || [];
  
  if (registeredEvents.length === 0) {
    renderEmptyState();
    return;
  }
  
  // Get event IDs
  const eventIds = registeredEvents.map(reg => reg.eventId);
  
  // Get event details
  const events = getEventsByIds(eventIds);
  
  // Merge with registration data
  const userEvents = events.map(event => {
    const registration = registeredEvents.find(reg => reg.eventId === event.id);
    return {
      ...event,
      registrationType: registration.registrationType,
      registeredOn: registration.registeredOn
    };
  });
  
  // Separate upcoming and past events (using current date as cutoff)
  const now = new Date();
  const upcoming = userEvents.filter(event => new Date(event.date) >= now);
  const past = userEvents.filter(event => new Date(event.date) < now);
  
  renderEventList('upcomingEvents', upcoming);
  renderEventList('pastEvents', past);
}

// Render event list
function renderEventList(containerId, events) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  if (events.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state col-span-full';
    emptyState.innerHTML = `
      <div class="empty-state-icon">📅</div>
      <p>No events found</p>
      <a href="/home" data-link class="btn btn-primary mt-4">Explore Events</a>
    `;
    container.appendChild(emptyState);
    return;
  }
  
  // Get template
  const template = document.getElementById('myEventCardTemplate');
  
  // Create and append event cards
  events.forEach(event => {
    const card = template.content.cloneNode(true);
    
    // Set attributes and content
    const image = card.querySelector('.card-image-small');
    image.src = event.image;
    image.alt = event.title;
    
    card.querySelector('.event-title').textContent = event.title;
    card.querySelector('.event-date').textContent = formatDate(event.date);
    card.querySelector('.event-location').textContent = event.location;
    
    // Set registration type with badge
    const regType = card.querySelector('.registration-type');
    regType.textContent = event.registrationType === 'in-person' ? 'In-person' : 'Livestream';
    
    // Set event link
    const link = card.querySelector('.event-link');
    link.href = `/event?id=${event.id}`;
    link.setAttribute('data-link', '');
    
    container.appendChild(card);
  });
}

// Render empty state
function renderEmptyState() {
  const containers = ['upcomingEvents', 'pastEvents'];
  
  containers.forEach(containerId => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
      <div class="empty-state col-span-full">
        <div class="empty-state-icon">📅</div>
        <p>You haven't registered for any events yet</p>
        <a href="/home" data-link class="btn btn-primary mt-4">Explore Events</a>
      </div>
    `;
  });
}

export { initMyEventsPage };
