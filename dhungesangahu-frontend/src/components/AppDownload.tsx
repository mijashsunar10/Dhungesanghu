import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, ChevronUp, ChevronDown } from 'lucide-react';

export const AppDownload: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside of the widget
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Options Panel */}
      <div 
        className={`flex flex-col gap-2.5 transition-all duration-300 transform origin-bottom ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {/* Android Link */}
        <a 
          href="https://play.google.com/store/apps/details?id=com.ingrails.dhungesanghu_boarding_school" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#652d90] hover:bg-[#532477] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="shrink-0">
            <path d="M17.6 9.48l1.84-3.18a.5.5 0 10-.87-.5l-1.88 3.24A10.05 10.05 0 0012 8c-1.6 0-3.11.37-4.44 1.04L5.68 5.8a.5.5 0 10-.87.5l1.84 3.18A9.99 9.99 0 002 17h20a9.99 9.99 0 00-4.4-7.52zM7 15a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
          </svg>
          <span>Android App</span>
        </a>

        {/* iPhone Link */}
        <a 
          href="https://apps.apple.com/th/app/veda-students-app/id1183813244" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#4b1f6b] hover:bg-[#391752] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="shrink-0">
            <path d="M16.365 1.43c0 1.14-.46 2.23-1.2 3.02-.78.82-2.06 1.46-3.2 1.37-.14-1.13.42-2.33 1.18-3.08.78-.8 2.14-1.43 3.22-1.31zM21 17.04c-.58 1.33-.86 1.92-1.6 3.08-1.03 1.66-2.48 3.74-4.28 3.76-1.6.02-2.02-1.03-4.18-1.02-2.16.01-2.62 1.04-4.22 1-1.8-.03-3.18-1.9-4.21-3.56C.64 18.9-.9 14.7.75 11.8c.82-1.45 2.28-2.37 3.88-2.39 1.52-.02 2.95 1.05 3.88 1.05.93 0 2.67-1.3 4.5-1.11.77.03 2.94.31 4.33 2.34-.11.07-2.58 1.5-2.56 4.46.02 3.54 3.11 4.72 3.14 4.73z"/>
          </svg>
          <span>iPhone App</span>
        </a>
      </div>

      {/* Main Action Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-3.5 bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-bold rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-none focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
      >
        <Smartphone className="h-4.5 w-4.5 shrink-0" />
        <span>Download App</span>
        {isOpen ? <ChevronDown className="h-4 w-4 shrink-0 transition-transform" /> : <ChevronUp className="h-4 w-4 shrink-0 transition-transform" />}
      </button>
    </div>
  );
};
