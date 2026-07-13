import React from 'react';

export const Admissions: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      <div className="py-16 px-6 max-w-4xl mx-auto text-left flex flex-col gap-8 w-full">
        <h1 className="text-4xl font-bold font-serif text-purple-900 border-b-2 border-[#ffdd57] pb-2 w-fit">Admissions Open</h1>
        
        <p className="text-slate-600 text-lg leading-relaxed font-light mt-2">
          Welcome to the admissions process for the academic year 2026. We are excited about your interest in Dhungesanghu Boarding School.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col gap-3">
          <h3 className="font-bold text-amber-800 text-lg">Online Admission Form</h3>
          <p className="text-slate-600 text-sm font-light">
            You can submit your application directly online through our digital partner portal. Click the button below to fill out the form:
          </p>
          <a 
            href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
            target="_blank"
            rel="noreferrer"
            className="bg-[#652d90] text-white hover:bg-purple-950 px-6 py-3 rounded-xl font-bold w-fit mt-2 shadow transition-transform active:scale-95 text-sm"
          >
            Fill Online Admission Form
          </a>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-xl font-bold text-slate-800 font-serif">Admission Guidelines:</h3>
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 font-light">
            <li>Collect or download the syllabus for the entrance examination.</li>
            <li>Submit photocopies of previous academic marksheets and character certificates.</li>
            <li>Two recent passport-sized color photographs of the student.</li>
            <li>Entrance exam is mandatory for all grades starting from Prep-Class up to Grade 9.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
