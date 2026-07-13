import React from 'react';

export const MissionVisionGoals: React.FC = () => {
  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-gradient-to-b from-white via-white to-[#f7f3fb] font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="inline-block px-6 py-1.5 bg-[#ffdd57] text-[#652d90] font-extrabold text-sm rounded-full tracking-wide shadow-sm">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#652d90] font-serif leading-tight">
            Our <span className="text-[#4b1f6b]">Mission</span>, <span className="text-[#4b1f6b]">Vision</span> & <span className="text-[#4b1f6b]">Goals</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-light">
            Guided by strong values and a commitment to excellence, we empower students
            with knowledge, skills, and character for a brighter future.
          </p>
        </div>

        {/* MVG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {/* MISSION CARD */}
          <div className="relative bg-white rounded-3xl p-8 pt-14 text-center shadow-[0_16px_36px_rgba(101,45,144,0.12)] hover:shadow-[0_28px_70px_rgba(101,45,144,0.22)] overflow-hidden border border-purple-100/40 hover:-translate-y-3 transition-all duration-300 group">
            {/* Skewed Background Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#652d90]/5 to-[#4b1f6b]/5 -skew-y-12 origin-top-left pointer-events-none z-0" />
            
            {/* Icon */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl rounded-full text-white bg-[#652d90] shadow-[0_6px_20px_rgba(101,45,144,0.25)] group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
              🎯
            </div>
            
            {/* Content */}
            <h3 className="relative z-10 text-xl font-extrabold text-[#652d90] mb-3">Our Mission</h3>
            <p className="relative z-10 text-slate-600 text-sm sm:text-base leading-relaxed font-light px-2">
              To deliver quality education through innovative teaching methods, practical learning, and a supportive academic environment.
            </p>
          </div>

          {/* GOALS CARD */}
          <div className="relative bg-white rounded-3xl p-8 pt-14 text-center shadow-[0_16px_36px_rgba(101,45,144,0.12)] hover:shadow-[0_28px_70px_rgba(101,45,144,0.22)] overflow-hidden border border-purple-100/40 hover:-translate-y-3 transition-all duration-300 group">
            {/* Skewed Background Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#652d90]/5 to-[#4b1f6b]/5 -skew-y-12 origin-top-left pointer-events-none z-0" />
            
            {/* Icon */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl rounded-full text-white bg-[#ffdd57] shadow-[0_6px_20px_rgba(250,204,21,0.25)] group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
              🚀
            </div>
            
            {/* Content */}
            <h3 className="relative z-10 text-xl font-extrabold text-[#652d90] mb-3">Our Goals</h3>
            <p className="relative z-10 text-slate-600 text-sm sm:text-base leading-relaxed font-light px-2">
              To foster critical thinking, encourage innovation, promote ethical values, and prepare students for future success.
            </p>
          </div>

          {/* VISION CARD */}
          <div className="relative bg-white rounded-3xl p-8 pt-14 text-center shadow-[0_16px_36px_rgba(101,45,144,0.12)] hover:shadow-[0_28px_70px_rgba(101,45,144,0.22)] overflow-hidden border border-purple-100/40 hover:-translate-y-3 transition-all duration-300 group md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none">
            {/* Skewed Background Graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#652d90]/5 to-[#4b1f6b]/5 -skew-y-12 origin-top-left pointer-events-none z-0" />
            
            {/* Icon */}
            <div className="relative z-10 w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl rounded-full text-white bg-[#4b1f6b] shadow-[0_6px_20px_rgba(75,31,107,0.25)] group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
              👁️
            </div>
            
            {/* Content */}
            <h3 className="relative z-10 text-xl font-extrabold text-[#652d90] mb-3">Our Vision</h3>
            <p className="relative z-10 text-slate-600 text-sm sm:text-base leading-relaxed font-light px-2">
              To be the school where growth is measured not only in enrollment, but in the expanding curiosity and empathy of every child who walks our halls.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
