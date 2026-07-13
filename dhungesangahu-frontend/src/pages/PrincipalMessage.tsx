import React from 'react';

export const PrincipalMessage: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* Principal's Full Message Section */}
      <section className="py-16 px-6 sm:px-12 md:px-20 w-full bg-gradient-to-b from-[#652d90]/5 via-white to-white">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 w-full text-left">
          
          {/* Header Profile */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-8 border-b border-slate-100">
            <img 
              src="https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/BishnuGcPrincipal.jpeg" 
              alt="Principal Bishnu G.C." 
              className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-full border-8 border-white shadow-2xl shrink-0"
            />
            <div className="text-center md:text-left flex flex-col gap-2">
              <span className="inline-block px-4 py-1 bg-[#652d90]/10 text-[#652d90] font-extrabold text-xs sm:text-sm rounded-full tracking-wide w-fit mx-auto md:mx-0">
                Official Address
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
                Message From <span className="text-[#652d90] font-serif">The Principal</span>
              </h1>
              <p className="text-base font-semibold text-purple-700 mt-1">Mr. Bishnu G.C., Principal</p>
            </div>
          </div>

          {/* Letter Body */}
          <div className="flex flex-col gap-6 text-slate-600 leading-relaxed font-light text-base sm:text-lg">
            <blockquote className="bg-[#f7f2fb] border-l-4 border-[#652d90] p-6 my-2 italic text-slate-700 rounded-r-2xl shadow-sm text-left">
              “Education is not the learning of facts, but the training of the mind to think.”
              <span className="block text-xs text-slate-500 font-sans font-medium mt-1.5">— Albert Einstein</span>
            </blockquote>

            <p className="font-bold text-slate-800 text-lg">Dear Parents, Children and Well-Wishers,</p>
            
            <p>
              A warm greeting from the Principal! It is an honor and privilege to lead an institution where everyone is a learner and each day brings new opportunities to grow and discover.
            </p>
            
            <p>
              At Dhungesanghu Boarding School, we believe education is more than academics. It is about character building, discipline, creativity, and preparing students to face the future with confidence. Our primary focus is to identify the unique talents of each individual and guide them on their path to personal excellence.
            </p>
            
            <p>
              We believe in partnering with parents, administrators, and the local community to create a safe, stimulating, and academically rigorous environment. We teach our students to practice discipline, show respect to seniors, and act with integrity at all times.
            </p>
            
            <p>
              We are constantly updating our curriculum, labs, and teaching methodologies to align with modern international standards while retaining our core values. We encourage collaborative learning and practical problem-solving in all grade levels.
            </p>

            <p>
              Thank you for trusting Dhungesanghu Boarding School with your child's educational journey. Together, let us cultivate a generation of innovators, thinkers, and builders.
            </p>
            
            {/* Signature Block */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col">
              <span className="font-bold text-slate-800">Warm regards,</span>
              <span className="font-bold text-[#652d90] font-serif mt-1.5 text-2xl">Bishnu G.C.</span>
              <span className="text-sm text-slate-500 font-medium mt-0.5">Principal, Dhungesanghu Boarding School</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
