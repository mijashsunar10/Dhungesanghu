import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

interface FacilitiesSectionProps {
  limit?: number;
}

const allFacilities = [
  {
    title: 'Modern Science Laboratory',
    image: 'https://images.unsplash.com/photo-1562774053-4ab90860b94c?q=80&w=400',
    desc: 'Fully equipped Physics, Chemistry, and Biology labs to support hands-on experimentations.'
  },
  {
    title: 'Computer Lab with High-Speed Internet',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400',
    desc: 'Modern computer systems loaded with modern educational software and guided programming courses.'
  },
  {
    title: 'Rich School Library',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=400',
    desc: 'A vast collection of reference manuals, literature, newspapers, and quiet research chambers.'
  },
  {
    title: 'Creative Art & Music Room',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=400',
    desc: 'Encouraging musical skills and imaginative drawings with direct mentorship and high-quality instruments.'
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ limit }) => {
  const listToShow = limit ? allFacilities.slice(0, limit) : allFacilities;

  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-white to-[#f7f3fb] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12 w-full text-center">
        
        {/* TITLE */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#652d90] font-serif leading-tight">
            Our School Services
          </h2>
          <div className="w-20 h-1 bg-[#652d90] rounded-full mt-1" />
        </motion.div>

        {/* GRID */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full mt-4 justify-items-center"
        >
          {listToShow.map((facility, idx) => (
            <motion.div 
              variants={fadeInUp}
              key={idx} 
              className="bg-white rounded-3xl p-6 pb-8 border-t-[7px] border-[#652d90] shadow-[0_14px_30px_rgba(101,45,144,0.12)] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(101,45,144,0.25)] transition-all duration-300 flex flex-col items-center text-center w-full max-w-[320px] group"
            >
              {/* IMAGE ICON */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-200 shadow-md mb-6 shrink-0">
                <img 
                  src={facility.image} 
                  alt={facility.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* DETAILS */}
              <h3 className="text-lg font-bold text-[#652d90] mb-3">{facility.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-light">{facility.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* BUTTON WRAP */}
        {limit && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4"
          >
            <NavLink 
              to="/services" 
              className="inline-block bg-[#652d90] hover:bg-[#4b1f6b] text-white font-semibold px-10 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              View All Services
            </NavLink>
          </motion.div>
        )}

      </div>
    </section>
  );
};
