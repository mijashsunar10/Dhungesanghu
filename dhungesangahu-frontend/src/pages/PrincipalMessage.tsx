import React, { useState, useEffect } from 'react';
import { Mail, GraduationCap, Award, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageBanner } from '../components/PageBanner';
import { getPrincipalMessage, type PrincipalMessageData } from '../api';

export const PrincipalMessage: React.FC = () => {
  const [principalMsg, setPrincipalMsg] = useState<PrincipalMessageData | null>(null);

  useEffect(() => {
    getPrincipalMessage()
      .then(data => setPrincipalMsg(data))
      .catch(err => console.error('Failed to load principal message:', err));
  }, []);

  const defaultTenets = [
    "Nurturing unique potentials of every child",
    "Fostering empathy, respect, and discipline",
    "Constant curriculum updates to global levels"
  ];

  const tenets = principalMsg?.coreTenets 
    ? principalMsg.coreTenets.split('\n').filter(Boolean)
    : defaultTenets;

  const defaultParagraphs = [
    "A warm greeting from the Principal! It is an honor and privilege to lead an institution where everyone is a learner and each day brings new opportunities to grow and discover.",
    "At Dhungesanghu Boarding School, we believe education is more than academics. It is about character building, discipline, creativity, and preparing students to face the future with confidence. Our primary focus is to identify the unique talents of each individual and guide them on their path to personal excellence.",
    "We believe in partnering with parents, administrators, and the local community to create a safe, stimulating, and academically rigorous environment. We teach our students to practice discipline, show respect to seniors, and act with integrity at all times.",
    "We are constantly updating our curriculum, labs, and teaching methodologies to align with modern international standards while retaining our core values. We encourage collaborative learning and practical problem-solving in all grade levels.",
    "Thank you for trusting Dhungesanghu Boarding School with your child's educational journey. Together, let us cultivate a generation of innovators, thinkers, and builders."
  ];

  const paragraphs = principalMsg?.message
    ? principalMsg.message.split('\n\n').filter(Boolean)
    : defaultParagraphs;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      <PageBanner 
        title="Principal's Message" 
        subtitle="A warm welcome and leadership address from the Principal of Dhungesanghu Boarding School." 
        badge="Leadership address"
      />

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
                src={principalMsg?.image || "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg"} 
                alt={`Principal ${principalMsg?.name || "Bishnu G.C."}`} 
                fallbackType="user"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-serif leading-tight">{principalMsg?.name || "Mr. Bishnu G.C."}</h3>
            <span className="text-xs font-semibold text-[#652d90] tracking-wider uppercase mt-1">{principalMsg?.title || "Principal"}</span>
            
            <div className="h-[1px] bg-slate-100 w-full my-4" />

            <div className="flex flex-col gap-3.5 text-left w-full text-xs sm:text-sm text-slate-500 font-light">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-purple-600 shrink-0" />
                <span>{principalMsg?.qualifications || "M.Ed. in Educational Leadership"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-amber-500 shrink-0" />
                <span>{principalMsg?.experience || "18+ Years Academic Service"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#652d90] shrink-0" />
                <a href={`mailto:${principalMsg?.email || "bishnugc@dhungesanghu.edu.np"}`} className="hover:underline text-slate-600">
                  {principalMsg?.email || "bishnugc@dhungesanghu.edu.np"}
                </a>
              </div>
            </div>
          </div>

          {/* School Values Sidecard */}
          <div className="bg-gradient-to-br from-[#652d90] to-[#4b1f6b] text-white rounded-3xl p-6 shadow-md text-left flex flex-col gap-4">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#ffdd57]">Our Core Tenets</h4>
            
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-purple-100 font-light">
              {tenets.map((tenet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Heart className="h-4.5 w-4.5 text-[#ffdd57] shrink-0 mt-0.5" />
                  <span>{tenet}</span>
                </li>
              ))}
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
            “{principalMsg?.quote || "Education is not the learning of facts, but the training of the mind to think."}”
            <span className="block text-xs text-slate-400 font-sans font-semibold mt-2">— {principalMsg?.quoteAuthor || "Albert Einstein"}</span>
          </blockquote>

          {/* Letter text */}
          <div className="flex flex-col gap-5 text-slate-600 font-light text-sm sm:text-base leading-relaxed font-sans">
            <p className="font-bold text-slate-800 text-base sm:text-lg">{principalMsg?.messageIntro || "Dear Parents, Children and Well-Wishers,"}</p>
            
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="h-[1px] bg-slate-100 w-full my-4" />

          {/* Signature and closure details */}
          <div className="flex flex-col text-left font-sans">
            <span className="text-slate-500 font-medium text-xs sm:text-sm">{principalMsg?.closure || "Warm regards,"}</span>
            <span className="font-serif text-[#652d90] text-3xl font-black italic tracking-wide mt-2 block select-none">
              {principalMsg?.signature || "Bishnu G.C."}
            </span>
            <span className="text-slate-800 font-bold text-sm sm:text-base mt-1.5">{principalMsg?.signatureTitle || "Mr. Bishnu G.C., Principal"}</span>
            <span className="text-slate-400 text-xs mt-0.5">{principalMsg?.signatureSchool || "Dhungesanghu Boarding School"}</span>
          </div>

        </motion.div>

      </div>
    </motion.div>
  );
};

