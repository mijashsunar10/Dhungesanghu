import React from 'react';
import { MissionVisionGoals } from '../components/MissionVisionGoals';

export const AboutUs: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-5xl mx-auto text-left flex flex-col gap-12 font-sans">
      
      {/* Title & Introduction */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-purple-900 border-b-4 border-[#ffdd57] pb-3 w-fit">
          About Our School
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-light mt-2">
          Dhungesanghu Boarding School was established with a clear vision to foster character, academic competence, and a love for learning. Situated in the serene environment of Pokhara-17, Mahatgaunda, our school has been a hallmark of secondary and primary learning since 2006.
        </p>
      </div>

      {/* Mission, Vision & Goals Section */}
      <div className="-mx-6 sm:-mx-12 md:-mx-20 border-y border-slate-100">
        <MissionVisionGoals />
      </div>

      {/* Core Values Section */}
      <div className="flex flex-col gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold font-serif text-slate-800">Our Core Values</h2>
          <p className="text-slate-500 text-sm mt-1">The foundation of everything we do at Dhungesanghu Boarding School.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#652d90] font-bold text-xl">💡</span>
              <h3 className="font-bold text-slate-800">Wisdom</h3>
            </div>
            <p className="text-slate-500 text-sm font-light">Nurturing curiosity, logical inquiry, and scientific knowledge to cultivate intellectual wisdom.</p>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#652d90] font-bold text-xl">⭐</span>
              <h3 className="font-bold text-slate-800">Excellence</h3>
            </div>
            <p className="text-slate-500 text-sm font-light">Pushing boundaries in academics, physical sports, cultural programs, and artistic endeavors.</p>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#652d90] font-bold text-xl">🛡</span>
              <h3 className="font-bold text-slate-800">Competency</h3>
            </div>
            <p className="text-slate-500 text-sm font-light">Equipping students with practical life skills, digital literacy, and leadership training.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="text-3xl font-bold font-serif text-purple-900">Why Dhungesanghu?</h2>
          <p className="text-slate-600 font-light leading-relaxed">
            Our campus offers custom-designed labs, spacious playfields, and modern library materials that allow teachers to deliver engaging learning sessions. We are dedicated to maintaining a high teacher-to-student ratio to ensure personalized guidance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-slate-700 text-sm font-medium">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57]" />
              <span>Modern Audio-Visual Classes</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57]" />
              <span>Full-Size Basketball & Football Courts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57]" />
              <span>Affordable & Quality Transport</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffdd57]" />
              <span>Safe and Sound Campus Boundary</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 h-[260px] rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
          <img 
            src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg" 
            alt="Students Activity" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
};
