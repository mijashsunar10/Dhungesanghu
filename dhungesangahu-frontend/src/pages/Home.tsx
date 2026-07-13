import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { School } from 'lucide-react';
import { MissionVisionGoals } from '../components/MissionVisionGoals';
import { RulesSection } from '../components/RulesSection';

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
    <div className="w-full flex flex-col">
      {/* Landing Slider Section */}
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

      {/* About Us Section */}
      <section className="bg-gradient-to-b from-white to-[#f7f3fb] py-20 px-6 sm:px-12 md:px-20 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE SECTION */}
          <div className="lg:col-span-6 w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:grid md:grid-cols-2 md:gap-4 md:auto-rows-[180px]">
              <img 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/726495301_27214325098227711_5095630771598862657_n.jpeg" 
                alt="School Program" 
                className="snap-start min-w-full md:min-w-0 md:row-span-2 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
              <img 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/709708868_1615055323954837_6000510963209356473_n.jpg" 
                alt="School Event" 
                className="snap-start min-w-full md:min-w-0 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
              <img 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg" 
                alt="Students Activity" 
                className="snap-start min-w-full md:min-w-0 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5">
            <span className="inline-block px-4 py-1.5 bg-[#652d90]/10 text-[#652d90] font-semibold text-sm rounded-full tracking-wide">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#652d90] font-serif leading-tight">
              Dhungesanghu Boarding School
            </h2>

            <div className="flex flex-col gap-4 text-slate-600 font-light leading-relaxed">
              <p>
                Dhungesanghu Boarding School is a well-established educational institution
                dedicated to academic excellence, discipline, and holistic development.
                With experienced teachers and modern teaching methods, we nurture
                confident and capable students.
              </p>
              <p>
                We believe in providing an atmosphere where kids learn to cooperate, create,
                and critically analyze tasks, preparing them to be future leaders.
              </p>
            </div>

            <ul className="flex flex-col gap-3 my-2 text-left w-full sm:w-auto">
              <li className="relative pl-2 text-[#652d90] font-bold text-sm sm:text-base flex items-start gap-2">
                <span className="text-[#652d90] font-extrabold select-none">✔</span>
                <span>Quality education with experienced faculty</span>
              </li>
              <li className="relative pl-2 text-[#652d90] font-bold text-sm sm:text-base flex items-start gap-2">
                <span className="text-[#652d90] font-extrabold select-none">✔</span>
                <span>Safe, disciplined, and child-friendly environment</span>
              </li>
              <li className="relative pl-2 text-[#652d90] font-bold text-sm sm:text-base flex items-start gap-2">
                <span className="text-[#652d90] font-extrabold select-none">✔</span>
                <span>Focus on academics, sports, and moral values</span>
              </li>
            </ul>

            <div className="mt-4">
              <NavLink 
                to="/about-us" 
                className="inline-block bg-[#4b1f6b] hover:bg-[#652d90] text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </NavLink>
            </div>
          </div>

        </div>
      </section>

      {/* Mission, Vision & Goals Section */}
      <MissionVisionGoals />

      {/* Rules & Regulations Section */}
      <RulesSection limit={5} />
    </div>
  );
};
