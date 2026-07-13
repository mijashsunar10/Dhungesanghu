import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { School } from 'lucide-react';

const slides = [
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01862-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01918-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC09743-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01868-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/farewell1.jpg"
];

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[500px] h-[calc(100vh-180px)] lg:h-[calc(100vh-125px)] w-full overflow-hidden flex items-center justify-center">
      {/* Background Slides with Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((url, index) => (
          <div
            key={url}
            style={{ backgroundImage: `url(${url})` }}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-6 py-2 bg-[#4b1f6b]/90 text-white font-semibold text-sm rounded-full mb-8 border border-purple-500/20 shadow-md">
          <School className="h-5 w-5 text-[#facc15]" />
          Quality Education Since 2006
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif mb-6 leading-tight select-none drop-shadow-md">
          <span className="text-[#facc15]">Dhungesanghu</span> <br />
          <span className="text-white">Boarding School</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl leading-relaxed mb-10 font-light drop-shadow-sm">
          Dhungesanghu Boarding School is committed to academic excellence,
          discipline, innovation, and moral values. We nurture confident,
          responsible, and future-ready students in a safe and inspiring
          learning environment.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-6 w-full sm:w-auto">
          <NavLink 
            to="/admissions" 
            className="w-full sm:w-auto bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-center"
          >
            Admission Open
          </NavLink>
          <a 
            href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-slate-950 font-bold px-10 py-4 rounded-full transition-all duration-300 text-center"
          >
            Login
          </a>
        </div>
      </div>
    </section>
  );
};
