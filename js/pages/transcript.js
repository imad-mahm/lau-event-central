
// Transcript page initialization
import { isLoggedIn } from '../auth.js';

// Initialize transcript page
function initTranscriptPage() {
  console.log('Transcript page initialized');
  
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
}

export { initTranscriptPage };
