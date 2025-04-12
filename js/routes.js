
// Define routes for the application
import { initLoginPage } from './pages/login.js';
import { initHomePage } from './pages/home.js';
import { initEventDetailPage } from './pages/eventDetail.js';
import { initMyEventsPage } from './pages/myEvents.js';
import { initTranscriptPage } from './pages/transcript.js';
import { initNotFoundPage } from './pages/notFound.js';

const routes = {
  '/': {
    title: 'LEMS - Login',
    template: '/templates/login.html',
    init: initLoginPage,
    requiresAuth: false
  },
  '/home': {
    title: 'LEMS - Home',
    template: '/templates/home.html',
    init: initHomePage,
    requiresAuth: true
  },
  '/event': {
    title: 'LEMS - Event Details',
    template: '/templates/eventDetail.html',
    init: initEventDetailPage,
    requiresAuth: true
  },
  '/my-events': {
    title: 'LEMS - My Events',
    template: '/templates/myEvents.html',
    init: initMyEventsPage,
    requiresAuth: true
  },
  '/transcript': {
    title: 'LEMS - Upload Transcript',
    template: '/templates/transcript.html',
    init: initTranscriptPage,
    requiresAuth: true
  },
  '*': {
    title: 'LEMS - Page Not Found',
    template: '/templates/notFound.html',
    init: initNotFoundPage,
    requiresAuth: false
  }
};

export { routes };
