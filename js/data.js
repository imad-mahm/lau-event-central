
// Sample data for the application

// Sample events data
const events = [
  {
    id: "1",
    title: "AI in Healthcare Conference",
    description: "Join us for a day of exploring how artificial intelligence is transforming healthcare. Leading researchers and industry professionals will share insights on the latest trends and breakthroughs.",
    date: "2023-05-15",
    time: "09:00 AM - 5:00 PM",
    location: "Irwin Hall Auditorium, Beirut Campus",
    organizer: "LAU Computer Science Department",
    category: "Academic",
    image: "images/event1.jpg",
    hasLivestream: true,
    spotsRemaining: 45,
    capacity: 100
  },
  {
    id: "2",
    title: "Annual Business Summit",
    description: "The Annual Business Summit brings together business leaders, entrepreneurs, and students to discuss current challenges and opportunities in the business world.",
    date: "2023-05-20",
    time: "10:00 AM - 3:00 PM",
    location: "Business Building, Byblos Campus",
    organizer: "Adnan Kassar School of Business",
    category: "Business",
    image: "images/event2.jpg",
    hasLivestream: false,
    spotsRemaining: 25,
    capacity: 75
  },
  {
    id: "3",
    title: "Engineering Expo 2023",
    description: "Showcase of student projects and innovations from the School of Engineering. Connect with industry representatives and explore career opportunities.",
    date: "2023-05-25",
    time: "11:00 AM - 4:00 PM",
    location: "Engineering Labs, Byblos Campus",
    organizer: "School of Engineering",
    category: "Academic",
    image: "images/event3.jpg",
    hasLivestream: true,
    spotsRemaining: 60,
    capacity: 100
  },
  {
    id: "4",
    title: "Global Health Symposium",
    description: "A symposium addressing current global health challenges and opportunities for healthcare professionals and researchers.",
    date: "2023-06-05",
    time: "9:30 AM - 4:30 PM",
    location: "Gilbert and Rose-Marie Chagoury Health Sciences Center",
    organizer: "School of Medicine",
    category: "Healthcare",
    image: "images/event4.jpg",
    hasLivestream: true,
    spotsRemaining: 30,
    capacity: 80
  },
  {
    id: "5",
    title: "Cultural Festival",
    description: "Celebrate diversity with performances, food, and activities representing cultures from around the world.",
    date: "2023-06-10",
    time: "12:00 PM - 8:00 PM",
    location: "LAU Beirut Campus Courtyard",
    organizer: "Student Council",
    category: "Cultural",
    image: "images/event5.jpg",
    hasLivestream: false,
    spotsRemaining: 150,
    capacity: 300
  },
  {
    id: "6",
    title: "Creative Writing Workshop",
    description: "Develop your creative writing skills with guidance from published authors and faculty members.",
    date: "2023-06-15",
    time: "2:00 PM - 5:00 PM",
    location: "Humanities Building, Room 512, Beirut Campus",
    organizer: "Department of English",
    category: "Workshop",
    image: "images/event6.jpg",
    hasLivestream: false,
    spotsRemaining: 15,
    capacity: 25
  }
];

// Course recommendations mapping
const courseRecommendations = {
  "CSC245": ["1", "3"], // AI in Healthcare Conference, Engineering Expo
  "CSC498": ["1", "3"], // AI in Healthcare Conference, Engineering Expo
  "BUS205": ["2"], // Annual Business Summit
  "BUS310": ["2"], // Annual Business Summit
  "ENG210": ["3"], // Engineering Expo
  "ENG330": ["3"], // Engineering Expo
  "MED201": ["4"], // Global Health Symposium
  "MED310": ["4"], // Global Health Symposium
  "ART240": ["5", "6"], // Cultural Festival, Creative Writing Workshop
  "ENG225": ["6"] // Creative Writing Workshop
};

// Get all events
function getAllEvents() {
  return [...events];
}

// Get event by ID
function getEventById(id) {
  return events.find(event => event.id === id);
}

// Get events by IDs
function getEventsByIds(ids) {
  return events.filter(event => ids.includes(event.id));
}

// Get events by courses
function getEventsByCourses(courses) {
  const recommendedEventIds = new Set();
  
  courses.forEach(course => {
    if (courseRecommendations[course]) {
      courseRecommendations[course].forEach(id => recommendedEventIds.add(id));
    }
  });
  
  return getEventsByIds([...recommendedEventIds]);
}

// Filter events
function filterEvents(query = "", date = null, club = null) {
  return events.filter(event => {
    // Apply text search filter
    const textMatch = !query || 
      event.title.toLowerCase().includes(query.toLowerCase()) || 
      event.description.toLowerCase().includes(query.toLowerCase());
    
    // Apply date filter
    const dateMatch = !date || event.date === date;
    
    // Apply club filter
    const clubMatch = !club || event.organizer === club;
    
    return textMatch && dateMatch && clubMatch;
  });
}

// Get all organizing clubs
function getAllClubs() {
  return [...new Set(events.map(event => event.organizer))];
}

// Register user for event
function registerForEvent(userId, eventId, isLivestream = false) {
  const event = getEventById(eventId);
  if (!event) {
    return { success: false, message: 'Event not found' };
  }
  
  if (!isLivestream && event.spotsRemaining <= 0) {
    return { success: false, message: 'No spots remaining for this event' };
  }
  
  // In a real app, this would update the database
  // For demo purposes, update the events array
  const eventIndex = events.findIndex(e => e.id === eventId);
  if (!isLivestream) {
    events[eventIndex].spotsRemaining -= 1;
  }
  
  // Update user's registered events in localStorage
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    
    // Check if already registered
    const alreadyRegistered = user.registeredEvents.some(
      reg => reg.eventId === eventId
    );
    
    if (!alreadyRegistered) {
      user.registeredEvents.push({
        eventId,
        registrationType: isLivestream ? 'livestream' : 'in-person',
        registeredOn: new Date().toISOString()
      });
      
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  
  return { 
    success: true, 
    message: `Successfully registered for ${isLivestream ? 'livestream' : 'in-person attendance'}`
  };
}

// Extract courses from transcript text
function extractCoursesFromTranscript(text) {
  // This is a simplified version - in a real app, you would use a more sophisticated parsing method
  const courseRegex = /(CSC|BUS|ENG|MED|ART)\d{3}/g;
  const matches = text.match(courseRegex) || [];
  return [...new Set(matches)]; // Remove duplicates
}

export { 
  getAllEvents, 
  getEventById, 
  getEventsByIds,
  getEventsByCourses,
  filterEvents,
  getAllClubs,
  registerForEvent,
  extractCoursesFromTranscript
};
