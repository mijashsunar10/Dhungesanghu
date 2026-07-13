import React from 'react';
import { NavLink } from 'react-router-dom';

interface FacilitiesSectionProps {
  limit?: number;
}

const allFacilities = [
  {
    title: 'Laboratory',
    image: 'https://kantipuracademypokhara.edu.np/wp-content/uploads/2026/01/lab1.jpg',
    desc: 'State-of-the-art laboratories designed for hands-on experiments, innovation, and scientific research.'
  },
  {
    title: 'Smart Classrooms',
    image: 'https://kantipuracademypokhara.edu.np/wp-content/uploads/2026/01/kantipur.jpg',
    desc: 'Technology-enabled classrooms that promote interactive, modern, and effective learning.'
  },
  {
    title: 'Library',
    image: 'https://kantipuracademypokhara.edu.np/wp-content/uploads/2026/01/librarynewbest.jpg',
    desc: 'A well-equipped library with books, journals, and digital resources to support academic excellence.'
  },
  {
    title: 'Computer Lab',
    image: 'https://kantipuracademypokhara.edu.np/wp-content/uploads/2026/01/lab23.jpg',
    desc: 'Advanced computer labs with updated hardware and software for IT-based practical learning.'
  },
  {
    title: 'Hostel & Boarding',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400',
    desc: 'Comfortable, secure, and disciplined residential boarding facilities for out-of-town scholars.'
  },
  {
    title: 'Sports Coaching',
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=400',
    desc: 'Professional training in basketball, football, martial arts, and track events.'
  },
  {
    title: 'Hygienic Cafeteria',
    image: 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?q=80&w=400',
    desc: 'Nutritious, fresh, and organic meal plans prepared under certified hygiene regulations.'
  },
  {
    title: 'Secure Transport',
    image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?q=80&w=400',
    desc: 'A dedicated fleet of school buses covering all major transport routes in the Pokhara region.'
  }
];

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ limit }) => {
  const listToShow = limit ? allFacilities.slice(0, limit) : allFacilities;

  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-white to-[#f7f3fb] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 w-full text-center">
        
        {/* TITLE */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#652d90] font-serif leading-tight">
            Our School Services
          </h2>
          <div className="w-20 h-1 bg-[#652d90] rounded-full mt-1" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full mt-4 justify-items-center">
          {listToShow.map((facility, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 pb-8 border-t-[7px] border-[#652d90] shadow-[0_14px_30px_rgba(101,45,144,0.12)] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(101,45,144,0.25)] transition-all duration-300 flex flex-col items-center text-center w-full max-w-[320px] group"
            >
              {/* IMAGE ICON */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-200 shadow-md mb-6 shrink-0">
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* DETAILS */}
              <h3 className="text-lg font-bold text-[#652d90] mb-3">{facility.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">{facility.desc}</p>
            </div>
          ))}
        </div>

        {/* BUTTON WRAP */}
        {limit && (
          <div className="mt-4">
            <NavLink 
              to="/services" 
              className="inline-block bg-[#652d90] hover:bg-[#4b1f6b] text-white font-semibold px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              View All Services
            </NavLink>
          </div>
        )}

      </div>
    </section>
  );
};
