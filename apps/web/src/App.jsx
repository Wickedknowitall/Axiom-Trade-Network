
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import ConsultationPage from './pages/ConsultationPage.jsx';
import EventInterestPage from './pages/EventInterestPage.jsx';
import CustomEventPage from './pages/CustomEventPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import InsightsPage from './pages/InsightsPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/insights/:slug" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/event-interest" element={<EventInterestPage />} />
            <Route path="/custom-event" element={<CustomEventPage />} />
          </Routes>
          <ScrollToTopButton />
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
