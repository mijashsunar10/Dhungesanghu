import React from 'react';
import { PhotoGallerySection } from '../components/PhotoGallerySection';

export const Gallery: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      
      {/* Intro header */}
      <div className="pt-16 pb-4 px-6 max-w-5xl mx-auto text-left flex flex-col gap-4 w-full">
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-purple-900 border-b-4 border-[#ffdd57] pb-3 w-fit">
          Photo Gallery
        </h1>
        <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-light mt-2">
          Explore campus snapshots, study sessions, and extracurricular celebrations at Dhungesanghu Boarding School.
        </p>
      </div>

      {/* Full Photo Gallery with Album Folders */}
      <PhotoGallerySection />

    </div>
  );
};
