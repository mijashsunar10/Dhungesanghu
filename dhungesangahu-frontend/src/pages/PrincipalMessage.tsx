import React from 'react';
import { Mail, GraduationCap, Award, Compass, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';

export const PrincipalMessage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Compass className="h-3.5 w-3.5" />
            Leadership address
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            Principal's Message
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            A warm welcome and leadership address from the Principal of Dhungesanghu Boarding School.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Photo and Quick stats */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 flex flex-col gap-6 w-full lg:sticky lg:top-24"
        >
          
          {/* Principal Card */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md p-6 text-center flex flex-col items-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-8 border-slate-100 shadow-xl mb-6">
              <ImageWithFallback 
                src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg" 
                alt="Principal Bishnu G.C." 
                fallbackType="user"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-serif leading-tight">Mr. Bishnu G.C.</h3>
            <span className="text-xs font-semibold text-[#652d90] tracking-wider uppercase mt-1">Principal</span>
            
            <div className="h-[1px] bg-slate-100 w-full my-4" />

            <div className="flex flex-col gap-3.5 text-left w-full text-xs sm:text-sm text-slate-500 font-light">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-purple-600 shrink-0" />
                <span>M.Ed. in Educational Leadership</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-amber-500 shrink-0" />
                <span>18+ Years Academic Service</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#652d90] shrink-0" />
                <a href="mailto:bishnugc@dhungesanghu.edu.np" className="hover:underline text-slate-600">bishnugc@dhungesanghu.edu.np</a>
              </div>
            </div>
          </div>

          {/* School Values Sidecard */}
          <div className="bg-gradient-to-br from-[#652d90] to-[#4b1f6b] text-white rounded-3xl p-6 shadow-md text-left flex flex-col gap-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#ffdd57]">Our Core Tenets</h4>
            
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-purple-100 font-light">
              <li className="flex items-start gap-2">
                <Heart className="h-4.5 w-4.5 text-[#ffdd57] shrink-0 mt-0.5" />
                <span>Nurturing unique potentials of every child</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4.5 w-4.5 text-[#ffdd57] shrink-0 mt-0.5" />
                <span>Fostering empathy, respect, and discipline</span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="h-4.5 w-4.5 text-[#ffdd57] shrink-0 mt-0.5" />
                <span>Constant curriculum updates to global levels</span>
              </li>
            </ul>
          </div>

        </motion.div>

        {/* Right Side: Message body */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg text-left flex flex-col gap-6"
        >
          
          {/* Einstein Quote Block */}
          <blockquote className="bg-[#f7f2fb] border-l-4 border-[#652d90] p-6 my-2 italic text-slate-700 rounded-r-2xl shadow-inner text-sm sm:text-base leading-relaxed">
            “Education is not the learning of facts, but the training of the mind to think.”
            <span className="block text-xs text-slate-400 font-sans font-semibold mt-2">— Albert Einstein</span>
          </blockquote>

          {/* Letter text */}
          <div className="flex flex-col gap-5 text-slate-600 font-light text-sm sm:text-base leading-relaxed font-sans">
            <p className="font-bold text-slate-800 text-base sm:text-lg">Dear Parents, Children and Well-Wishers,</p>
            
            <p>
              A warm greeting from the Principal! It is an honor and privilege to lead an institution where everyone is a learner and each day brings new opportunities to grow and discover.
            </p>
            
            <p>
              At Dhungesanghu Boarding School, we believe education is more than academics. It is about character building, discipline, creativity, and preparing students to face the future with confidence. Our primary focus is to identify the unique talents of each individual and guide them on their path to personal excellence.
            </p>
            
            <p>
              We believe in partnering with parents, administrators, and the local community to create a safe, stimulating, and academically rigorous environment. We teach our students to practice discipline, show respect to seniors, and act with integrity at all times.
            </p>
            
            <p>
              We are constantly updating our curriculum, labs, and teaching methodologies to align with modern international standards while retaining our core values. We encourage collaborative learning and practical problem-solving in all grade levels.
            </p>
            
            <p>
              Thank you for trusting Dhungesanghu Boarding School with your child's educational journey. Together, let us cultivate a generation of innovators, thinkers, and builders.
            </p>
          </div>

          <div className="h-[1px] bg-slate-100 w-full my-4" />

          {/* Signature and closure details */}
          <div className="flex flex-col text-left font-sans">
            <span className="text-slate-500 font-medium text-xs sm:text-sm">Warm regards,</span>
            <span className="font-serif text-[#652d90] text-3xl font-black italic tracking-wide mt-2 block select-none">
              Bishnu G.C.
            </span>
            <span className="text-slate-800 font-bold text-sm sm:text-base mt-1.5">Mr. Bishnu G.C., Principal</span>
            <span className="text-slate-400 text-xs mt-0.5">Dhungesanghu Boarding School</span>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
};
