import React from 'react';
import { NavLink } from 'react-router-dom';
import { Award, BookOpen, Users, ChevronRight } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full text-slate-800">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-950 text-white py-20 px-6 sm:px-12 md:px-20 overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ffdd57]/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col gap-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdd57]/20 text-[#ffdd57] font-semibold text-xs rounded-full uppercase tracking-wider w-fit">
              Now Enrolling for Academic Year 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              Shaping Minds, <br />
              <span className="text-[#ffdd57]">Building Futures</span>
            </h1>
            <p className="text-purple-100 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              At Dhungesanghu Boarding School, we provide a nurturing environment that fosters intellectual curiosity, academic excellence, and strong moral character.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <NavLink 
                to="/admissions" 
                className="bg-[#ffdd57] text-[#652d90] hover:bg-[#e6c84a] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Apply Admission
              </NavLink>
              <NavLink 
                to="/about-us" 
                className="bg-white/10 text-white border border-white/20 hover:bg-white/15 font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore About Us
              </NavLink>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="w-full max-w-[480px] h-[340px] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent z-10"></div>
              <div className="w-full h-full rounded-xl bg-purple-950/40 flex items-center justify-center border border-white/10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Students Studying" 
                  className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                <p className="text-[#ffdd57] font-bold text-xs uppercase tracking-wider">Aesthetic Campus</p>
                <h3 className="text-white text-lg font-serif font-semibold mt-1">Holistic Learning Environment</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PILLARS / KEY STATS */}
      <section className="py-12 bg-slate-50 border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 items-start text-left">
            <div className="p-3 bg-purple-100 rounded-xl text-[#652d90]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Quality Education</h3>
              <p className="text-slate-500 text-sm mt-1">Innovative curriculum, modern teaching aids, and hands-on laboratory learning.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 items-start text-left">
            <div className="p-3 bg-[#ffdd57]/20 text-yellow-700">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Proven Excellence</h3>
              <p className="text-slate-500 text-sm mt-1">Consistent high academic achievements and success in extra-curricular tournaments.</p>
            </div>
          </div>

          <div className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 items-start text-left">
            <div className="p-3 bg-indigo-100 text-indigo-700">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Experienced Staff</h3>
              <p className="text-slate-500 text-sm mt-1">Dedicated mentors and educators committed to the overall growth of children.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL'S WELCOME MESSAGE */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-[#ffdd57] rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white rounded-2xl p-3 border border-slate-200">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                  alt="Principal Message" 
                  className="w-full max-w-[340px] rounded-xl object-cover aspect-[4/5] object-top"
                />
                <div className="mt-3 text-center">
                  <h4 className="font-bold font-serif text-lg">Mrs. Sabnam Sunar</h4>
                  <p className="text-xs text-purple-700 font-medium">Principal, Dhungesanghu Boarding School</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <span className="text-xs font-semibold text-purple-700 uppercase tracking-widest">Message from the desk of Principal</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Welcome to Our School Community</h2>
            
            <div className="w-12 h-1 bg-[#ffdd57] rounded-full"></div>
            
            <p className="text-slate-600 leading-relaxed font-light">
              It is a matter of pride to welcome you to Dhungesanghu Boarding School. We believe in providing education that empowers our children to grow into wise, creative, and competent citizens of tomorrow. Our school community prioritizes values, discipline, and scientific questioning.
            </p>
            <p className="text-slate-600 leading-relaxed font-light">
              We look forward to partnering with parents, staff, and students to unlock potential and create a vibrant academic environment in Pokhara. Come join our family!
            </p>

            <NavLink 
              to="/about-us" 
              className="inline-flex items-center gap-1 text-[#652d90] font-bold hover:gap-2 transition-all mt-2 group"
            >
              Read Full Message <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS CARD GRID */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-semibold text-[#ffdd57] uppercase tracking-widest">Our Facilities</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">What Makes Us Stand Out</h2>
            <div className="w-12 h-1 bg-[#ffdd57] rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
            {/* Card 1 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col gap-4">
              <span className="text-3xl">🔬</span>
              <h3 className="font-bold text-lg">Science Labs</h3>
              <p className="text-slate-400 text-sm font-light">Fully equipped physics, chemistry, and biology labs for practical demonstrations.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col gap-4">
              <span className="text-3xl">💻</span>
              <h3 className="font-bold text-lg">Computer Center</h3>
              <p className="text-slate-400 text-sm font-light">High-speed computers and internet connection to foster digital literacy.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col gap-4">
              <span className="text-3xl">🏀</span>
              <h3 className="font-bold text-lg">Sports Arena</h3>
              <p className="text-slate-400 text-sm font-light">Courts and equipment for basketball, football, volleyball, and table tennis.</p>
            </div>
            {/* Card 4 */}
            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col gap-4">
              <span className="text-3xl">🚍</span>
              <h3 className="font-bold text-lg">Transport Facility</h3>
              <p className="text-slate-400 text-sm font-light">Reliable, safe, and comfortable bus service covering major routes in Pokhara.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
