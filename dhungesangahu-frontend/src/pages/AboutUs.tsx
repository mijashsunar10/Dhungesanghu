import React, { useState } from 'react';
import { MissionVisionGoals } from '../components/MissionVisionGoals';
import { RulesSection } from '../components/RulesSection';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageBanner } from '../components/PageBanner';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

interface Alumni {
  name: string;
  batch: string;
  profession: string;
  quote: string;
  affiliation: string;
  path: string;
  image: string;
}

const alumniList: Alumni[] = [
  {
    name: "Dr. Sandesh Rijal",
    batch: "2012",
    profession: "Medical Doctor / Resident",
    quote: "The solid academic foundation and the regular science lab experiments at Dhungesanghu gave me the interest and drive to pursue medical school. I am forever grateful to my teachers.",
    affiliation: "Tribhuvan University Teaching Hospital, Kathmandu",
    path: "SEE (Dhungesanghu) -> +2 Science -> MBBS (IOM)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400"
  },
  {
    name: "Er. Sneha Baral",
    batch: "2014",
    profession: "Software Engineer",
    quote: "Dhungesanghu's early coding classes and computer lab assignments were where my tech journey began. The school helped build my self-belief and logic.",
    affiliation: "F1Soft Technologies, Lalitpur",
    path: "SEE (Dhungesanghu) -> +2 Computer Science -> B.E. in Software Engineering",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400"
  },
  {
    name: "Abhishek Thapa",
    batch: "2016",
    profession: "Chartered Accountant (CA)",
    quote: "The mathematical training and analytical tests at school trained my brain for speed and logic. It made clearing my professional CA papers much easier.",
    affiliation: "Deloitte Nepal, Kathmandu",
    path: "SEE (Dhungesanghu) -> +2 Commerce -> Chartered Accountancy (ICAN)",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400"
  }
];

export const AboutUs: React.FC = () => {
  const [activeValue, setActiveValue] = useState<'wisdom' | 'excellence' | 'competency'>('wisdom');
  const [activeAlumniIdx, setActiveAlumniIdx] = useState<number>(0);

  const nextAlumni = () => {
    setActiveAlumniIdx(prev => (prev === alumniList.length - 1 ? 0 : prev + 1));
  };

  const prevAlumni = () => {
    setActiveAlumniIdx(prev => (prev === 0 ? alumniList.length - 1 : prev - 1));
  };

  const timelineEvents: TimelineEvent[] = [
    {
      year: "2006",
      title: "Foundation of School",
      desc: "Dhungesanghu Boarding School was established in Pokhara-17, Mahatgaunda, with primary classes and a commitment to excellence."
    },
    {
      year: "2012",
      title: "Secondary Upgrade & Labs",
      desc: "Expanded classrooms to include secondary grades up to SEE and opened custom-designed physics, chemistry, and biology labs."
    },
    {
      year: "2018",
      title: "100% SEE Passing Rate",
      desc: "Achieved the milestone of 100% passing rates in SEE with multiple students obtaining distinction ranks."
    },
    {
      year: "2022",
      title: "Veda Digital Integration",
      desc: "Partnered with Veda to launch the school smartphone apps for real-time exams, bulletins, and digital homework updates."
    }
  ];

  return (
    <div className="w-full flex flex-col font-sans bg-slate-50 min-h-screen">
      
      <PageBanner 
        title="About Our School" 
        subtitle="Dhungesanghu Boarding School was founded in 2006 to provide wisdom, holistic learning, and secondary education." 
        badge="Discover Us"
      />

      {/* Intro section */}
      <div className="py-16 px-6 max-w-5xl mx-auto text-left flex flex-col gap-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">Welcome to Dhungesanghu</h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
          Situated in the serene environment of Pokhara-17, Mahatgaunda, Dhungesanghu Boarding School has been a hallmark of secondary and primary learning since 2006. Our school is committed to nurturing students to grow as analytical, ethical, and empathetic citizens prepared to make positive global impacts.
        </p>
      </div>

      {/* Mission, Vision & Goals Section (Full width background) */}
      <MissionVisionGoals />

      {/* Core Values Section */}
      <div className="py-16 px-6 max-w-5xl mx-auto text-left flex flex-col gap-10 w-full">
        
        <div className="text-center md:text-left flex flex-col gap-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">Our Core Values</h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light">The foundational pillars that guide student behaviors and study priorities.</p>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 w-full">
            <button
              onClick={() => setActiveValue('wisdom')}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all duration-300 ease-in-out shrink-0 cursor-pointer ${
                activeValue === 'wisdom'
                  ? 'bg-white border-[#652d90] shadow border-l-4 border-l-[#652d90]'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-500'
              }`}
            >
              <span className="text-xl">💡</span>
              <span className="font-bold text-xs sm:text-sm text-slate-800">Wisdom</span>
            </button>
            <button
              onClick={() => setActiveValue('excellence')}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all duration-300 ease-in-out shrink-0 cursor-pointer ${
                activeValue === 'excellence'
                  ? 'bg-white border-[#652d90] shadow border-l-4 border-l-[#652d90]'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-500'
              }`}
            >
              <span className="text-xl">⭐</span>
              <span className="font-bold text-xs sm:text-sm text-slate-800">Excellence</span>
            </button>
            <button
              onClick={() => setActiveValue('competency')}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all duration-300 ease-in-out shrink-0 cursor-pointer ${
                activeValue === 'competency'
                  ? 'bg-white border-[#652d90] shadow border-l-4 border-l-[#652d90]'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-500'
              }`}
            >
              <span className="text-xl">🛡️</span>
              <span className="font-bold text-xs sm:text-sm text-slate-800">Competency</span>
            </button>
          </div>

          {/* Details Content Box */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-3 relative min-h-[180px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeValue}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-3"
              >
                {activeValue === 'wisdom' && (
                  <>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-xl">💡</span> Cultivating Wisdom
                    </h3>
                    <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed">
                      We believe true wisdom is born of curiosity, critical inquiry, and sound moral guidelines. We encourage students to ask questions, explore science and literature, and seek truth beyond rote memorization.
                    </p>
                  </>
                )}
                {activeValue === 'excellence' && (
                  <>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-xl">⭐</span> Pursuit of Excellence
                    </h3>
                    <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed">
                      Academic metrics, athletic sportsmanship, and cultural presentations are all measured with excellence. We inspire students to exceed their own benchmarks and build strong discipline for a lifetime.
                    </p>
                  </>
                )}
                {activeValue === 'competency' && (
                  <>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <span className="text-xl">🛡️</span> Practical Competency
                    </h3>
                    <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed">
                      Equipping young minds with practical digital programming logic, public speaking capabilities, collaborative project work, and life skills needed to solve real-world problems.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* TIMELINE / JOURNEY SECTION */}
        <div className="flex flex-col gap-10 mt-12 w-full">
          <div className="text-center md:text-left flex flex-col gap-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">Our Milestones</h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light font-sans">A brief timeline tracking our educational advancements since inception.</p>
          </div>

          <div className="flex flex-col gap-6 relative pl-6 border-l-2 border-purple-200 ml-4">
            {timelineEvents.map((ev, i) => (
              <div key={i} className="relative text-left flex flex-col gap-1">
                {/* Dot */}
                <div className="absolute left-[-31px] top-1.5 w-4 h-4 rounded-full bg-[#652d90] border-4 border-white shadow-sm" />
                
                <span className="text-sm font-black text-[#d97706] font-mono leading-none">{ev.year}</span>
                <h4 className="text-base font-bold text-slate-800 leading-snug">{ev.title}</h4>
                <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed max-w-2xl">{ev.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-purple-900">Why Dhungesanghu?</h2>
            <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
              Our campus offers custom-designed labs, spacious playfields, and modern library materials that allow teachers to deliver engaging learning sessions. We are dedicated to maintaining a high teacher-to-student ratio to ensure personalized guidance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-slate-700 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57] shrink-0" />
                <span>Modern Audio-Visual Classes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57] shrink-0" />
                <span>Full-Size Basketball & Football Courts</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57] shrink-0" />
                <span>Affordable & Quality Transport</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57] shrink-0" />
                <span>Safe and Sound Campus Boundary</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 h-[260px] rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <ImageWithFallback 
              src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg" 
              alt="Students Activity" 
              fallbackType="gallery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>

        {/* ALUMNI SUCCESS TRACKER SECTION */}
        <div className="flex flex-col gap-8 mt-20 w-full text-left">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">Alumni Success Network</h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light">Where are they now? Tracking the academic paths of our SEE graduates.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevAlumni}
                className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors duration-300 ease-in-out cursor-pointer select-none"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={nextAlumni}
                className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors duration-300 ease-in-out cursor-pointer select-none"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Alumni Display Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#652d90] to-[#ffdd57]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAlumniIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
              >
                {/* Left Photo & Badges */}
                <div className="md:col-span-4 flex flex-col items-center text-center gap-3">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
                    <ImageWithFallback 
                      src={alumniList[activeAlumniIdx].image} 
                      alt={alumniList[activeAlumniIdx].name} 
                      fallbackType="user"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">{alumniList[activeAlumniIdx].name}</h4>
                    <span className="text-xs font-bold text-[#652d90] uppercase tracking-wider block mt-0.5">
                      SEE Batch {alumniList[activeAlumniIdx].batch}
                    </span>
                  </div>
                </div>

                {/* Right Quote & Details */}
                <div className="md:col-span-8 flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200/50 w-fit px-3 py-1 rounded-full uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4" />
                    {alumniList[activeAlumniIdx].profession}
                  </div>

                  <blockquote className="text-slate-600 italic text-sm sm:text-base leading-relaxed relative">
                    <span className="text-4xl text-purple-200 font-serif absolute -top-5 -left-4 select-none">“</span>
                    <span className="relative z-10">{alumniList[activeAlumniIdx].quote}</span>
                  </blockquote>

                  <div className="h-[1px] bg-slate-100 w-full my-1" />

                  <div className="flex flex-col gap-1 text-slate-400 text-xs font-light">
                    <span>Current Affiliation: <strong className="text-slate-700 font-semibold">{alumniList[activeAlumniIdx].affiliation}</strong></span>
                    <span>Education Path: <strong className="text-slate-700 font-semibold">{alumniList[activeAlumniIdx].path}</strong></span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-1">
            {alumniList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAlumniIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out cursor-pointer ${
                  activeAlumniIdx === idx ? 'bg-[#652d90] w-6' : 'bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Rules & Regulations Section */}
      <RulesSection />

    </div>
  );
};
