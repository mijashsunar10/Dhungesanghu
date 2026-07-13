import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { AppDownload } from './components/AppDownload';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Services } from './pages/Services';
import { Officials } from './pages/Officials';
import { Gallery } from './pages/Gallery';
import { Programs } from './pages/Programs';
import { Bulletins } from './pages/Bulletins';
import { ContactUs } from './pages/ContactUs';
import { Admissions } from './pages/Admissions';
import { Heart } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
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
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global floating App Download widget */}
        <AppDownload />

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-900 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <img 
                  src="https://rainbowacademic.edu.np/wp-content/uploads/2026/01/d2.png" 
                  alt="Dhungesanghu Boarding School Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="font-serif font-bold text-white text-base">Dhungesanghu Boarding School</span>
              </div>
              <p className="text-xs text-slate-500 font-light font-sans pl-1">
                © {new Date().getFullYear()} Dhungesanghu Boarding School. All Rights Reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-light">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-red-500 fill-current animate-pulse" />
              <span>for Education Excellence</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
