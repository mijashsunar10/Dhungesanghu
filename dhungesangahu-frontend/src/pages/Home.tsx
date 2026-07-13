import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { School } from 'lucide-react';
import { MissionVisionGoals } from '../components/MissionVisionGoals';
import { RulesSection } from '../components/RulesSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { PhotoGallerySection } from '../components/PhotoGallerySection';
import { AcademicTeamSection } from '../components/AcademicTeamSection';
import { ContactSection } from '../components/ContactSection';



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

      {/* Stats Counter Section */}
      <section className="bg-white py-12 px-6 sm:px-12 md:px-20 border-b border-slate-100 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md">
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">20+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Years of History</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md">
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">500+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Active Students</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md">
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">40+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Certified Teachers</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md">
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">100%</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">SECURE CAMPUS</span>
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

      {/* Principal Message Section */}
      <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-white to-[#652d90]/5 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* Text Content */}
          <div className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left gap-5">
            <span className="inline-block px-5 py-2 bg-[#652d90]/10 text-[#652d90] font-semibold text-sm rounded-full tracking-wide">
              🌼 Principal’s Message
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
              Message From <span className="text-[#652d90] font-serif">The Principal</span>
            </h2>
            <blockquote className="bg-[#f7f2fb] border-l-4 border-[#652d90] p-5 my-2 italic text-slate-700 rounded-r-xl text-left w-full">
              “Education is not the learning of facts, but the training of the mind to think.”
              <span className="block text-xs text-slate-500 font-sans font-medium mt-1.5">— Albert Einstein</span>
            </blockquote>
            <div className="flex flex-col gap-4 text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              <p className="font-bold text-slate-800">Dear Parents, Children and Well-Wishers,</p>
              <p>
                A warm greeting from the Principal!
                It is an honor and privilege to lead an institution where everyone is a learner
                and each day brings new opportunities to grow and discover.
              </p>
              <p>
                At our school, we believe education is more than academics.
                It is about character building, discipline, creativity,
                and preparing students to face the future with confidence.
              </p>
            </div>
            <div className="mt-4">
              <NavLink 
                to="/principal-message" 
                className="inline-block bg-[#652d90] hover:bg-[#4b1f6b] text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Full Message →
              </NavLink>
            </div>
          </div>
          {/* Photo */}
          <div className="md:col-span-4 flex justify-center w-full">
            <img 
              src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg" 
              alt="Principal Bishnu G.C." 
              className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] object-cover rounded-full border-8 border-white shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* Academic Team Section */}
      <AcademicTeamSection />

      {/* School Facilities Section */}
      <FacilitiesSection limit={4} />

      {/* Photo Gallery Section */}
      <PhotoGallerySection limit={6} />

      {/* Mission, Vision & Goals Section */}
      <MissionVisionGoals />

      {/* Rules & Regulations Section */}
      <RulesSection limit={5} />

      {/* Testimonials Section */}
      <section className="py-20 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-[#f7f3fb] to-white font-sans overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="inline-block px-5 py-1.5 bg-[#652d90]/10 text-[#652d90] font-bold text-xs uppercase tracking-wider rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4b1f6b] font-serif leading-tight mt-3 mb-12">
            What Parents Say About Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between text-left relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="text-4xl text-purple-200 font-serif absolute top-6 right-8">“</div>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6 italic z-10">
                "Dhungesanghu has provided a fantastic environment for my son. The teachers are very attentive, and the focus on moral values and discipline has helped him grow into a responsible student."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#652d90]">
                  KP
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Kiran Parajuli</h4>
                  <span className="text-xs text-slate-400">Parent of Grade 8 Student</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between text-left relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="text-4xl text-purple-200 font-serif absolute top-6 right-8">“</div>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6 italic z-10">
                "We are highly impressed with the digital communication system. We receive homework, bulletins, and exams updates on the school app. The educational quality is excellent."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#652d90]">
                  SG
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Sita Gurung</h4>
                  <span className="text-xs text-slate-400">Parent of Grade 3 Student</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between text-left relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div className="text-4xl text-purple-200 font-serif absolute top-6 right-8">“</div>
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6 italic z-10">
                "The sports and extracurricular activities are wonderful. My daughter participates in debate and drawing classes, which has boosted her self-confidence immensely."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#652d90]">
                  RB
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Ramesh Baral</h4>
                  <span className="text-xs text-slate-400">Parent of Grade 10 Student</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactSection />
    </div>
  );
};
