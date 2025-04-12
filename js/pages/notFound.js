
// Not found page initialization

function initNotFoundPage() {
  console.log('Not found page initialized');
  
  // Log the error to console
  console.error('404 Error: User attempted to access non-existent route:', window.location.pathname);
}

export { initNotFoundPage };
