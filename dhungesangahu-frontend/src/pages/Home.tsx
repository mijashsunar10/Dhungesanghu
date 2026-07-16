import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { School } from 'lucide-react';
import { getTestimonials, type Testimonial } from '../api';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { MissionVisionGoals } from '../components/MissionVisionGoals';
import { RulesSection } from '../components/RulesSection';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { PhotoGallerySection } from '../components/PhotoGallerySection';
import { AcademicTeamSection } from '../components/AcademicTeamSection';
import { ContactSection } from '../components/ContactSection';
import { motion, type Variants } from 'framer-motion';

const slides = [
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01862-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01918-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC09743-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01868-scaled.jpg",
  "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/farewell1.jpg"
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getTestimonials()
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load testimonials:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col overflow-hidden">
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
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-20 max-w-4xl mx-auto text-center px-6 flex flex-col items-center"
        >
          {/* Badge */}
          <motion.span 
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#4b1f6b]/90 text-white font-semibold text-sm rounded-full mb-8 border border-purple-500/20 shadow-md"
          >
            <School className="h-5 w-5 text-[#facc15]" />
            Quality Education Since 2006
          </motion.span>

          {/* Heading */}
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif mb-6 leading-tight select-none drop-shadow-md"
          >
            <span className="text-[#facc15]">Dhungesanghu</span> <br />
            <span className="text-white">Boarding School</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl leading-relaxed mb-10 font-light drop-shadow-sm"
          >
            Dhungesanghu Boarding School is committed to academic excellence,
            discipline, innovation, and moral values. We nurture confident,
            responsible, and future-ready students in a safe and inspiring
            learning environment.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 w-full sm:w-auto"
          >
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
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white py-12 px-6 sm:px-12 md:px-20 border-b border-slate-100 font-sans">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md"
          >
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">20+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Years of History</span>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md"
          >
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">500+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Active Students</span>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md"
          >
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">40+</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">Certified Teachers</span>
          </motion.div>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center p-6 rounded-3xl bg-slate-50 border border-slate-100/80 transition-all hover:shadow-md"
          >
            <span className="text-4xl sm:text-5xl font-black text-[#652d90] mb-2 font-mono">100%</span>
            <span className="text-xs sm:text-sm text-slate-500 font-bold uppercase tracking-wider">SECURE CAMPUS</span>
          </motion.div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="bg-gradient-to-b from-white to-[#f7f3fb] py-20 px-6 sm:px-12 md:px-20 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* IMAGE SECTION */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="lg:col-span-6 w-full"
          >
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:pb-0 md:grid md:grid-cols-2 md:gap-4 md:auto-rows-[180px]">
              <ImageWithFallback 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/726495301_27214325098227711_5095630771598862657_n.jpeg" 
                alt="School Program" 
                fallbackType="gallery"
                className="snap-start min-w-full md:min-w-0 md:row-span-2 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
              <ImageWithFallback 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/709708868_1615055323954837_6000510963209356473_n.jpg" 
                alt="School Event" 
                fallbackType="gallery"
                className="snap-start min-w-full md:min-w-0 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
              <ImageWithFallback 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg" 
                alt="Students Activity" 
                fallbackType="gallery"
                className="snap-start min-w-full md:min-w-0 h-[240px] md:h-full w-full object-cover rounded-2xl shadow-md border border-slate-100"
              />
            </div>
          </motion.div>

          {/* CONTENT SECTION */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-5"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 bg-[#652d90]/10 text-[#652d90] font-semibold text-sm rounded-full tracking-wide"
            >
              About Us
            </motion.span>

            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-extrabold text-[#652d90] font-serif leading-tight"
            >
              Dhungesanghu Boarding School
            </motion.h2>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col gap-4 text-slate-600 font-light leading-relaxed"
            >
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
            </motion.div>

            <motion.ul 
              variants={fadeInUp}
              className="flex flex-col gap-3 my-2 text-left w-full sm:w-auto"
            >
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
            </motion.ul>

            <motion.div 
              variants={fadeInUp}
              className="mt-4"
            >
              <NavLink 
                to="/about-us" 
                className="inline-block bg-[#4b1f6b] hover:bg-[#652d90] text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                Learn More
              </NavLink>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Principal Message Section */}
      <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-white to-[#652d90]/5 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="md:col-span-8 flex flex-col items-center md:items-start text-center md:text-left gap-5"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block px-5 py-2 bg-[#652d90]/10 text-[#652d90] font-semibold text-sm rounded-full tracking-wide"
            >
              🌼 Principal’s Message
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight"
            >
              Message From <span className="text-[#652d90] font-serif">The Principal</span>
            </motion.h2>
            <motion.blockquote 
              variants={fadeInUp}
              className="bg-[#f7f2fb] border-l-4 border-[#652d90] p-5 my-2 italic text-slate-700 rounded-r-xl text-left w-full"
            >
              “Education is not the learning of facts, but the training of the mind to think.”
              <span className="block text-xs text-slate-500 font-sans font-medium mt-1.5">— Albert Einstein</span>
            </motion.blockquote>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col gap-4 text-slate-600 leading-relaxed font-light text-sm sm:text-base"
            >
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
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="mt-4"
            >
              <NavLink 
                to="/principal-message" 
                className="inline-block bg-[#652d90] hover:bg-[#4b1f6b] text-white font-semibold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                View Full Message →
              </NavLink>
            </motion.div>
          </motion.div>
          {/* Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-4 flex justify-center w-full"
          >
            <ImageWithFallback 
              src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg" 
              alt="Principal Bishnu G.C." 
              fallbackType="user"
              className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] object-cover rounded-full border-8 border-white shadow-2xl transition-all duration-500 ease-out hover:scale-103 hover:shadow-3xl"
            />
          </motion.div>
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

          {loading ? (
            <div className="py-10 text-slate-400 text-sm font-light">Loading parent testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="py-10 text-slate-400 text-sm font-light">No testimonials available at this time.</div>
          ) : (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            >
              {testimonials.map((t) => (
                <motion.div 
                  key={t.id}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between text-left relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <div className="text-4xl text-purple-200 font-serif absolute top-6 right-8">“</div>
                  <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-6 italic z-10">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center font-bold text-[#652d90] uppercase">
                      {t.parentName.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{t.parentName}</h4>
                      <span className="text-xs text-slate-400">{t.parentRelation}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactSection />
    </div>
  );
};
