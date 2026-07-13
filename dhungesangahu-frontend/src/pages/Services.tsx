import React from 'react';

export const Services: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      <div className="py-16 px-6 max-w-4xl mx-auto text-left flex flex-col gap-6 w-full">
        <h1 className="text-4xl font-bold font-serif text-purple-900 border-b-2 border-[#ffdd57] pb-2 w-fit">Services & Facilities</h1>
        <p className="text-slate-600 text-lg leading-relaxed font-light">
          We provide state-of-the-art facilities and services designed to give students a comprehensive learning experience:
        </p>
        
        <ul className="list-disc pl-6 text-slate-600 space-y-3 font-light">
          <li><strong>Smart Classrooms:</strong> Interactive whiteboards and multimedia-enabled rooms.</li>
          <li><strong>Hostel & Boarding:</strong> Safe, secure, and clean residency for out-of-town students.</li>
          <li><strong>Science & Computer Labs:</strong> Practical centers matching secondary board requirements.</li>
          <li><strong>Co-Curricular Coaching:</strong> Specialist teachers for football, basketball, music, and art.</li>
          <li><strong>Canteen:</strong> Hygienic, nutritious, and fresh meals cooked inside the school premises.</li>
        </ul>
      </div>
    </div>
  );
};
