
// Event registration functionality
import { registerForEvent, getEventById } from './data.js';
import { showToast } from './utils.js';
import { getCurrentUser } from './auth.js';
import { navigateTo } from './main.js';

// Handle standard event registration
function handleEventRegistration() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  
  const user = getCurrentUser();
  if (!user) {
    showToast('You must be logged in to register for events', 'error');
    navigateTo('/');
    return;
  }
  
  const event = getEventById(eventId);
  if (!event) {
    showToast('Event not found', 'error');
    return;
  }
  
  if (event.spotsRemaining <= 0) {
    showToast('No spots remaining for this event', 'error');
    return;
  }
  
  // Register for the event
  const result = registerForEvent(user.id, eventId, false);
  
  if (result.success) {
    // Update the UI
    const spotsRemainingElement = document.getElementById('spotsRemaining');
    if (spotsRemainingElement) {
      spotsRemainingElement.textContent = event.spotsRemaining - 1;
    }
    
    // Show success message
    showToast(result.message);
    
    // Disable the register button
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
      registerButton.disabled = true;
      registerButton.textContent = 'Registered';
    }
  } else {
    showToast(result.message, 'error');
  }
}

// Handle livestream registration
function handleLivestreamRegistration() {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('id');
  
  const user = getCurrentUser();
  if (!user) {
    showToast('You must be logged in to register for events', 'error');
    navigateTo('/');
    return;
  }
  
  const event = getEventById(eventId);
  if (!event) {
    showToast('Event not found', 'error');
    return;
  }
  
  if (!event.hasLivestream) {
    showToast('This event does not have a livestream option', 'error');
    return;
  }
  
  // Register for the livestream
  const result = registerForEvent(user.id, eventId, true);
  
  if (result.success) {
    // Show success message
    showToast(result.message);
    
    // Disable the livestream button
    const livestreamButton = document.getElementById('livestreamButton');
    if (livestreamButton) {
      livestreamButton.disabled = true;
      livestreamButton.textContent = 'Registered for Livestream';
    }
  } else {
    showToast(result.message, 'error');
  }
}

export { handleEventRegistration, handleLivestreamRegistration };
