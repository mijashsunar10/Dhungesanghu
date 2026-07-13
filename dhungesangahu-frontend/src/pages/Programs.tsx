import React from 'react';

export const Programs: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      <div className="py-16 px-6 max-w-4xl mx-auto text-left flex flex-col gap-8 w-full">
        <h1 className="text-4xl font-bold font-serif text-purple-900 border-b-2 border-[#ffdd57] pb-2 w-fit">Academic Programs</h1>
        
        <div className="flex flex-col gap-6 mt-4">
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900">Pre-Primary Level (PG to UKG)</h3>
            <p className="text-slate-600 text-sm mt-2 font-light">Focuses on sensory learning, basic alphabets, numeracy, motor skills, and play-way educational methods in a caring, colorful setup.</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900">Primary Level (Grade 1 to 5)</h3>
            <p className="text-slate-600 text-sm mt-2 font-light">Strengthens core fundamentals in Mathematics, Science, English, Nepali, and Social Studies, along with creative thinking and moral sciences.</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
            <h3 className="text-xl font-bold text-purple-900">Secondary Level (Grade 6 to 10 - SEE preparation)</h3>
            <p className="text-slate-600 text-sm mt-2 font-light">Prepares students for Secondary Education Examination (SEE) using systematic unit testing, computer assignments, lab experimentation, and public speaking classes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
