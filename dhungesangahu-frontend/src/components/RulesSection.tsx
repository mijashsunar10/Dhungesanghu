import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

interface RulesSectionProps {
  limit?: number;
}

const allRules = [
  "Students must wear the proper school uniform neatly and tidily and enter the school premises only between 9:30 A.M. and 9:55 A.M.",
  "Students must make every attempt to keep their classroom neat and tidy and free from litter.",
  "Students must use English as means of communication within the school premises.",
  "\"Please\", \"Thank you\", \"Excuse me\", \"Sorry\" should be part of every student's vocabulary and used at appropriate times.",
  "Abusive or fool language and disrespect behavior to anyone will not be tolerated at any time under any circumstances.",
  "Regular attendance is mandatory. Any absence must be supported by a leave application signed by parents or guardians.",
  "Students must respect school property. Damaging desks, walls, books, or laboratory equipment is strictly prohibited and subject to fines.",
  "Mobile phones, smartwatches, and other personal electronic gadgets are strictly prohibited inside the school premises.",
  "Assignments, homework, and projects must be completed and submitted on time as directed by the subject teachers.",
  "During exams, academic integrity is paramount. Any form of cheating, copying, or malpractice will result in immediate suspension."
];

export const RulesSection: React.FC<RulesSectionProps> = ({ limit }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parse rules list according to limit
  const rulesToShow = limit ? allRules.slice(0, limit) : allRules;

  // Handle scroll-to-hash scroll effects if URL contains #rules
  useEffect(() => {
    if (!limit && window.location.hash === '#rules') {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [limit]);

  return (
    <section 
      ref={sectionRef}
      id="rules" 
      className="w-full py-16 px-6 sm:px-12 md:px-20 bg-gradient-to-br from-[#652d90]/[0.01] to-[#4b1f6b]/[0.06] font-sans"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-10 w-full">
        
        {/* HEADER */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="inline-block px-5 py-1.5 bg-[#652d90]/10 text-[#652d90] font-bold text-sm rounded-full tracking-wide">
            📘 School Policy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#4b1f6b] font-serif leading-tight">
            Rules & <span className="text-[#652d90]">Regulations of Dhungesanghu School</span>
          </h2>
        </div>

        {/* RULES LIST */}
        <div className="flex flex-col gap-4 text-left">
          {rulesToShow.map((rule, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            return (
              <div 
                key={index} 
                className="relative bg-white flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl shadow-[0_8px_20px_rgba(101,45,144,0.08)] hover:-translate-y-0.5 transition-all duration-300 group"
              >
                {/* Left Gradient Edge Accent */}
                <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-gradient-to-b from-[#652d90] to-[#4b1f6b]" />
                
                {/* Number Badge */}
                <span className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-[#652d90]/10 text-[#652d90] font-black text-base sm:text-lg flex items-center justify-center rounded-xl select-none group-hover:bg-[#652d90] group-hover:text-white transition-colors duration-300">
                  {indexStr}
                </span>
                
                {/* Rule Text */}
                <p className="text-[#4b1f6b] font-bold text-sm sm:text-base leading-relaxed">
                  {rule}
                </p>
              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON (Only shown when a limit is active) */}
        {limit && (
          <div className="text-center mt-4">
            <NavLink 
              to="/about-us#rules" 
              className="inline-block bg-gradient-to-r from-[#652d90] to-[#4b1f6b] hover:from-[#532477] hover:to-[#391752] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              View All Rules
            </NavLink>
          </div>
        )}

      </div>
    </section>
  );
};
