import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MenuOverlay from './components/layout/MenuOverlay';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Products from './pages/Products';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="antialiased text-neutral-900 bg-white font-sans">
          <Header onMenuClick={() => setIsMenuOpen(true)} />
          <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/programs" element={<Programs />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
