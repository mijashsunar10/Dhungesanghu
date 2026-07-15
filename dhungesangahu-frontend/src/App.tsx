import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { AppDownload } from './components/AppDownload';
import { ImageWithFallback } from './components/ImageWithFallback';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Services } from './pages/Services';
import { Officials } from './pages/Officials';
import { Gallery } from './pages/Gallery';
import { Programs } from './pages/Programs';
import { Bulletins } from './pages/Bulletins';
import { ContactUs } from './pages/ContactUs';
import { Admissions } from './pages/Admissions';
import { PrincipalMessage } from './pages/PrincipalMessage';
import { GameZone } from './pages/GameZone';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAdminPage) {
    return (
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 transition-colors duration-200">
      {/* The Header is rendered once and is visible on all pages */}
      <Header />

      {/* Dynamic page content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/officials" element={<Officials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/bulletins" element={<Bulletins />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/principal-message" element={<PrincipalMessage />} />
          <Route path="/game-zone" element={<GameZone />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global floating App Download widget */}
      <AppDownload />

      {/* Footer */}
      <footer className="school-footer mt-auto">
        <div className="footer-container">
          {/* LOGO / ABOUT */}
          <div className="footer-box footer-about">
            <div className="logo-wrapper">
              <div className="logo-bg"></div>
              <ImageWithFallback 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/01/Untitled-design-10.png" 
                alt="Dhungesanghu Boarding School Logo" 
                fallbackType="school"
                className="footer-logo"
              />
            </div>
            <p className="max-w-md mx-auto text-white/90">
              Dhungesanghu Boarding School provides quality education and holistic learning. We nurture young minds to excel academically and socially for a bright future.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-box footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/admissions">Admissions</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-box footer-contact text-center">
            <h4>Contact</h4>
            <p className="text-white/90"><strong>Location:</strong> Pokhara-17, Mahatgaunda</p>
            <p className="text-white/90">
              <strong>Contact:</strong>{' '}
              <a href="tel:061402039" className="hover:text-[#ffdd57] transition-colors">
                061-402039
              </a>
            </p>
            <p className="text-white/90">
              <strong>Email:</strong>{' '}
              <a href="mailto:dhungesanghuschool@gmail.com" className="hover:text-[#ffdd57] transition-colors">
                dhungesanghuschool@gmail.com
              </a>
            </p>
          </div>

          {/* SOCIAL */}
          <div className="footer-box footer-social">
            <h4>Follow Us</h4>
            <div className="socials">
              <a href="https://www.facebook.com/profile.php?id=100063511542673" target="_blank" rel="noreferrer" className="social fb" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social ig" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social yt" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://wa.me/9779800000000" target="_blank" rel="noreferrer" className="social wa" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
