
// Filters for events
import { filterEvents, getAllEvents } from './data.js';
import { renderEventCards } from './pages/home.js';

// Current filters state
const filters = {
  query: '',
  date: null,
  club: null
};

// Handle event search
function handleEventSearch(query) {
  filters.query = query;
  applyFilters();
}

// Toggle filter panel
function handleFilterToggle() {
  const filtersPanel = document.getElementById('filtersPanel');
  if (filtersPanel) {
    filtersPanel.classList.toggle('hidden');
  }
}

// Handle date selection
function handleDateSelection(date) {
  filters.date = date || null;
  applyFilters();
}

// Handle club selection
function handleClubSelection(club) {
  filters.club = club === 'all' ? null : club;
  applyFilters();
}

// Reset all filters
function handleResetFilters() {
  filters.query = '';
  filters.date = null;
  filters.club = null;
  
  // Reset UI
  const searchInput = document.getElementById('searchInput');
  const dateInput = document.getElementById('dateInput');
  const clubSelect = document.getElementById('clubSelect');
  
  if (searchInput) searchInput.value = '';
  if (dateInput) dateInput.value = '';
  if (clubSelect) clubSelect.value = 'all';
  
  applyFilters();
}

// Apply filters and update event list
function applyFilters() {
  const filteredEvents = filters.query || filters.date || filters.club
    ? filterEvents(filters.query, filters.date, filters.club)
    : getAllEvents();
    
  renderEventCards(filteredEvents);
}

export {
  handleEventSearch,
  handleFilterToggle,
  handleDateSelection,
  handleClubSelection,
  handleResetFilters,
  applyFilters
};
