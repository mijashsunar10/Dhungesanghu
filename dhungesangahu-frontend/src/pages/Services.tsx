import React from 'react';
import { FacilitiesSection } from '../components/FacilitiesSection';

export const Services: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* Intro header */}
      <div className="pt-16 pb-4 px-6 max-w-5xl mx-auto text-left flex flex-col gap-4 w-full">
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-purple-900 border-b-4 border-[#ffdd57] pb-3 w-fit">
          All Services
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-light mt-2">
          Dhungesanghu Boarding School provides state-of-the-art infrastructure and modern services designed to support children in their academic, technological, and physical growth.
        </p>
      </div>

      {/* Full Facilities Grid */}
      <FacilitiesSection />

    </div>
  );
};
