import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Menu, X, LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Services', path: '/services' },
    { name: 'Officials', path: '/officials' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Programs', path: '/programs' },
    { name: 'Bulletins', path: '/bulletins' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <header className="w-full flex flex-col z-50">
      {/* TOP BAR: LOGO LEFT + CONTACT RIGHT */}
      <div className="bg-[#652d90] text-white py-4 px-4 sm:px-6 md:px-8 border-b border-purple-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* LOGO + NAME LEFT */}
          <div className="flex items-center gap-3">
            <img 
              src="https://rainbowacademic.edu.np/wp-content/uploads/2026/01/d2.png" 
              alt="Dhungesanghu Boarding School Logo" 
              className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            <div className="flex flex-col font-serif">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-white leading-tight">
                Dhungesanghu Boarding School
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 italic font-sans font-light">
                "Education For Wisdom, Excellence and Competency"
              </p>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Location */}
            <div className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl transition-all duration-300 border border-white/5 shadow-sm">
              <MapPin className="h-5 w-5 text-[#ffdd57] shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">Location</span>
                <span className="text-xs font-medium">Pokhara-17, Mahatgaunda</span>
              </div>
            </div>

            {/* Call */}
            <a 
              href="tel:061-402039" 
              className="flex items-center gap-3 bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl transition-all duration-300 border border-white/5 shadow-sm"
            >
              <Phone className="h-5 w-5 text-[#ffdd57] shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">Call</span>
                <span className="text-xs font-medium">061-402039</span>
              </div>
            </a>

            {/* Mail */}
            <a 
              href="mailto:dhungesanghuschool@gmail.com" 
              className="flex items-center gap-3 bg-white/10 hover:bg-[#ffdd57]/15 px-4 py-2 rounded-xl transition-all duration-300 border border-white/5 shadow-sm"
            >
              <Mail className="h-5 w-5 text-[#ffdd57] shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">Mail Us At</span>
                <span className="text-xs font-medium">dhungesanghuschool@gmail.com</span>
              </div>
            </a>
          </div>

          {/* MOBILE TOGGLE AND QUICK CALL BUTTON */}
          <div className="flex lg:hidden items-center gap-3 w-full sm:w-auto justify-between md:justify-end">
            <a 
              href="tel:061-402039" 
              className="sm:hidden flex items-center gap-2 bg-[#ffdd57] text-[#652d90] font-semibold text-xs px-3 py-1.5 rounded-full"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-[#4b1f6b] text-white hover:bg-purple-950 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* NAVIGATION + ADMISSION BAR (Desktop, sticky on scroll) */}
      <div className={`w-full bg-[#4b1f6b] text-white transition-all duration-300 ${
        isFixed 
          ? 'fixed top-0 left-0 right-0 shadow-lg bg-[#4b1f6b]/95 backdrop-blur-md border-b border-purple-800 z-50 transform translate-y-0' 
          : 'relative'
      } hidden lg:block`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
          
          <nav className="flex items-center gap-6 lg:gap-8 font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-sm lg:text-base transition-colors duration-200 hover:text-[#ffdd57] ${
                    isActive ? 'text-[#ffdd57] font-semibold' : 'text-purple-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ffdd57] rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Login Link */}
            <a 
              href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-purple-100 hover:text-[#ffdd57] text-sm lg:text-base transition-colors duration-200"
            >
              <LogIn className="h-4 w-4" />
              Login
            </a>
          </nav>

          <NavLink 
            to="/admissions" 
            className="bg-[#ffdd57] text-[#652d90] hover:bg-[#e6c84a] font-bold text-sm px-6 py-2.5 rounded-full shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            Admissions Open
          </NavLink>

        </div>
      </div>

      {/* Spacer to prevent content jump when sticky */}
      {isFixed && <div className="hidden lg:block h-[56px]" />}

      {/* MOBILE DRAWER MENU */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu content */}
        <div className={`absolute top-0 right-0 w-[280px] sm:w-[320px] h-full bg-[#4b1f6b] text-white shadow-2xl flex flex-col py-6 px-6 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-800 pb-4 mb-6">
            <span className="font-serif font-bold text-lg text-[#ffdd57]">Navigation</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-1 rounded-full bg-purple-900/50 hover:bg-purple-950 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-4 overflow-y-auto flex-1 text-left">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base py-2 border-b border-purple-800/40 hover:text-[#ffdd57] transition-colors block ${
                    isActive ? 'text-[#ffdd57] font-semibold' : 'text-purple-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <a 
              href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="text-base py-2 border-b border-purple-800/40 hover:text-[#ffdd57] transition-colors flex items-center gap-2 text-purple-100"
            >
              <LogIn className="h-4 w-4" />
              Login
            </a>
          </nav>

          {/* Mobile Footer Area */}
          <div className="mt-auto border-t border-purple-800 pt-6 flex flex-col gap-4">
            <NavLink 
              to="/admissions" 
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#ffdd57] text-[#652d90] font-bold py-3 px-4 rounded-xl text-center shadow-md active:scale-95 transition-all"
            >
              Admissions Open
            </NavLink>

            {/* Mobile Contact info */}
            <div className="flex flex-col gap-2.5 text-xs text-purple-200 font-light mt-2 text-left">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#ffdd57]" />
                <span>Pokhara-17, Mahatgaunda</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#ffdd57]" />
                <span>061-402039</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#ffdd57]" />
                <span className="truncate">dhungesanghuschool@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
