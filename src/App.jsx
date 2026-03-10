import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MenuOverlay from './components/layout/MenuOverlay';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Preloader from './components/layout/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Products from './pages/Products';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import { LanguageProvider } from './context/LanguageContext';

// Dashboard Imports
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProgramsPage from './pages/dashboard/ProgramsPage';
import ProductsPage from './pages/dashboard/ProductsPage';
import EventsPage from './pages/dashboard/EventsPage';
import NewsPage from './pages/dashboard/NewsPage';
import TeamPage from './pages/dashboard/TeamPage';
import { StoreProvider } from './hooks/useStore';

import { useLocation } from 'react-router-dom';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Only show preloader on home page
  const isHomePage = location.pathname === '/' && location.hash === '';
  const [loading, setLoading] = useState(isHomePage);

  // Determine if current route is under dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <ScrollToTop />
      <div className="antialiased text-neutral-900 bg-white font-sans">
        {/* Only render main header/footer if NOT in dashboard */}
        {!isDashboardRoute && <Header onMenuClick={() => setIsMenuOpen(true)} />}
        {!isDashboardRoute && <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/programs" element={<Programs />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard" element={<StoreProvider><DashboardLayout /></StoreProvider>}>
              <Route index element={<DashboardHome />} />
              <Route path="programs" element={<ProgramsPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="team" element={<TeamPage />} />
            </Route>
          </Routes>
        </main>

        {!isDashboardRoute && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
