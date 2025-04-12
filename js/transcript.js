
// Transcript upload and analysis
import { extractCoursesFromTranscript, getEventsByCourses } from './data.js';
import { showToast } from './utils.js';

// Handle transcript upload
function handleTranscriptUpload(file) {
  if (!file) {
    showToast('Please select a file', 'error');
    return;
  }
  
  if (file.type !== 'application/pdf') {
    showToast('Please upload a PDF file', 'error');
    return;
  }
  
  // Show loading state
  const uploadButton = document.querySelector('#transcriptForm button[type="submit"]');
  const originalText = uploadButton.textContent;
  uploadButton.disabled = true;
  uploadButton.textContent = 'Analyzing...';
  
  // In a real app, we would send the file to a server for processing
  // For demo purposes, we'll simulate the process
  
  // Simulate file reading
  setTimeout(() => {
    // Simulate transcript text (in a real app this would come from parsing the PDF)
    const transcriptText = `
      STUDENT TRANSCRIPT
      Student: John Doe
      ID: 202012345
      Program: Computer Science
      
      COURSES COMPLETED:
      CSC245 - Algorithms and Data Structures - A
      CSC498 - Machine Learning - A-
      BUS205 - Business Ethics - B+
      ART240 - Introduction to Design - B
      MED201 - Introduction to Medical Sciences - A
    `;
    
    // Extract courses
    const courses = extractCoursesFromTranscript(transcriptText);
    
    // Get recommended events
    const recommendedEvents = getEventsByCourses(courses);
    
    // Display results
    displayRecommendations(courses, recommendedEvents);
    
    // Reset button
    uploadButton.disabled = false;
    uploadButton.textContent = originalText;
    
    showToast('Transcript analyzed successfully');
  }, 2000);
}

// Display recommendations
function displayRecommendations(courses, events) {
  const resultsContainer = document.getElementById('analysisResults');
  if (!resultsContainer) return;
  
  resultsContainer.innerHTML = '';
  
  // Create courses section
  const coursesSection = document.createElement('div');
  coursesSection.className = 'mb-6';
  coursesSection.innerHTML = `
    <h3 class="text-xl font-bold mb-2">Courses Detected (${courses.length})</h3>
    <div class="flex flex-wrap gap-2">
      ${courses.map(course => `
        <span class="badge badge-primary">${course}</span>
      `).join('')}
    </div>
  `;
  resultsContainer.appendChild(coursesSection);
  
  // Create recommendations section
  const recommendationsSection = document.createElement('div');
  recommendationsSection.innerHTML = `
    <h3 class="text-xl font-bold mb-4">Recommended Events (${events.length})</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      ${events.map(event => `
        <div class="card card-hover" data-event-id="${event.id}">
          <img src="${event.image}" alt="${event.title}" class="card-image">
          <div class="card-body">
            <h3 class="card-title">${event.title}</h3>
            <p class="card-text">${event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description}</p>
            <div class="card-meta">
              <span><i class="fas fa-calendar"></i> ${event.date}</span>
              <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  if (events.length === 0) {
    recommendationsSection.innerHTML = `
      <h3 class="text-xl font-bold mb-4">Recommended Events</h3>
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <p>No event recommendations found based on your courses.</p>
        <a href="/home" data-link class="btn btn-primary mt-4">Browse All Events</a>
      </div>
    `;
  }
  
  resultsContainer.appendChild(recommendationsSection);
  
  // Add event listeners to cards
  document.querySelectorAll('.card[data-event-id]').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.getAttribute('data-event-id');
      window.location.href = `/event?id=${eventId}`;
    });
  });
}

export { handleTranscriptUpload };
