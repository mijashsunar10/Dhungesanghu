import React, { useState } from 'react';
import { MissionVisionGoals } from '../components/MissionVisionGoals';
import { RulesSection } from '../components/RulesSection';
import { Sparkles } from 'lucide-react';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export const AboutUs: React.FC = () => {
  const [activeValue, setActiveValue] = useState<'wisdom' | 'excellence' | 'competency'>('wisdom');

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
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Discover Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            About Our School
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Dhungesanghu Boarding School was founded in 2006 to provide wisdom, holistic learning, and secondary education.
          </p>
        </div>
      </section>

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
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all shrink-0 cursor-pointer ${
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
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all shrink-0 cursor-pointer ${
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
              className={`flex items-center gap-3 p-4 rounded-xl border text-left min-w-[150px] md:min-w-0 transition-all shrink-0 cursor-pointer ${
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
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-3 relative min-h-[160px]">
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
            <img 
              src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg" 
              alt="Students Activity" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* Rules & Regulations Section */}
      <RulesSection />

    </div>
  );
};
