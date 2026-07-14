import React, { useState } from 'react';
import { Sparkles, Mail, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';


interface Official {
  name: string;
  position: string;
  category: 'leadership' | 'teachers' | 'admin';
  categoryLabel: string;
  image: string;
  email: string;
  qualification: string;
  experience: string;
}

const officialsList: Official[] = [
  {
    name: 'Bishnu GC',
    position: 'Principal',
    category: 'leadership',
    categoryLabel: 'Leadership',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01910-scaled.jpg',
    email: 'bishnugc@dhungesanghu.edu.np',
    qualification: 'M.Ed. in Educational Leadership',
    experience: '18+ Years Experience'
  },
  {
    name: 'D Daya Sagar Paudel',
    position: 'Academic Coordinator',
    category: 'leadership',
    categoryLabel: 'Leadership',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-3.41.57-PM.jpeg',
    email: 'dayasagar@dhungesanghu.edu.np',
    qualification: 'M.Sc. in Mathematics',
    experience: '12+ Years Experience'
  },
  {
    name: 'Dhruba Bandhu Rijal',
    position: 'Senior School Incharge',
    category: 'leadership',
    categoryLabel: 'Leadership',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01902-scaled.jpg',
    email: 'dhrubarijal@dhungesanghu.edu.np',
    qualification: 'M.A. in English Literature',
    experience: '15+ Years Experience'
  },
  {
    name: 'Sunita Bhujel',
    position: 'Senior Accountant',
    category: 'admin',
    categoryLabel: 'Administration',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01609-scaled.jpg',
    email: 'sunitabhujel@dhungesanghu.edu.np',
    qualification: 'M.B.S. in Finance',
    experience: '8+ Years Experience'
  },
  {
    name: 'Ramesh Bhandari',
    position: 'Senior Mathematics Faculty',
    category: 'teachers',
    categoryLabel: 'Teaching Faculty',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400',
    email: 'rameshbhandari@dhungesanghu.edu.np',
    qualification: 'B.Sc. B.Ed. in Mathematics',
    experience: '6+ Years Experience'
  },
  {
    name: 'Sita Gurung Thapa',
    position: 'Physics & Chemistry Faculty',
    category: 'teachers',
    categoryLabel: 'Teaching Faculty',
    image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271d4?q=80&w=400',
    email: 'sitathapa@dhungesanghu.edu.np',
    qualification: 'M.Sc. in Physics',
    experience: '7+ Years Experience'
  },
  {
    name: 'Anju Gurung',
    position: 'English Language Expert',
    category: 'teachers',
    categoryLabel: 'Teaching Faculty',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400',
    email: 'anjugurung@dhungesanghu.edu.np',
    qualification: 'B.A. in English & Education',
    experience: '5+ Years Experience'
  },
  {
    name: 'Krishna Raj GC',
    position: 'Social Studies & Moral values Faculty',
    category: 'teachers',
    categoryLabel: 'Teaching Faculty',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400',
    email: 'krishnagc@dhungesanghu.edu.np',
    qualification: 'M.A. in Sociology',
    experience: '10+ Years Experience'
  }
];

export const Officials: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredOfficials = filter === 'all' 
    ? officialsList 
    : officialsList.filter(o => o.category === filter);

  return (
    <div className="w-full flex flex-col font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            School Team
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            School Officials
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Meet the academic leaders, professional faculty, and dedicated administrators guiding Dhungesanghu Boarding School.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto px-6 py-16 flex flex-col gap-10">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: 'all', label: 'All Staff' },
            { id: 'leadership', label: 'School Leadership' },
            { id: 'teachers', label: 'Teaching Faculty' },
            { id: 'admin', label: 'Administration' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 cursor-pointer ${
                filter === btn.id
                  ? 'bg-[#652d90] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Dynamic Officials Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredOfficials.map((official) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={official.name}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_14px_35px_rgba(101,45,144,0.06)] hover:shadow-[0_20px_50px_rgba(101,45,144,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image with overlay info */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 shrink-0">
                  <ImageWithFallback 
                    src={official.image} 
                    alt={official.name}
                    fallbackType="user"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category tag absolute */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#652d90] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-purple-100">
                    {official.categoryLabel}
                  </span>
                </div>

                {/* Title & Qualification Details */}
                <div className="p-6 text-left flex-1 flex flex-col justify-between gap-5 bg-white">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-black text-slate-800 font-serif leading-tight">{official.name}</h3>
                    <span className="text-xs font-bold text-[#652d90] tracking-wide">{official.position}</span>
                    
                    <div className="flex flex-col gap-1 mt-2 text-slate-400 text-xs font-light">
                      <span className="flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        {official.qualification}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                        {official.experience}
                      </span>
                    </div>
                  </div>

                  {/* Email Sign off */}
                  <a 
                    href={`mailto:${official.email}`}
                    className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#652d90] transition-colors border-t border-slate-100 pt-4"
                  >
                    <Mail className="h-4 w-4 text-slate-300" />
                    <span>{official.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
};
