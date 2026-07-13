import React from 'react';

export const Bulletins: React.FC = () => {
  const notices = [
    { date: '2026-07-10', title: 'First Term Examination Schedule Released', desc: 'The first term exam begins on Shrawan 15. Students can collect their admit cards from the account desk.' },
    { date: '2026-06-25', title: 'Parent-Teacher Meeting (PTM) Notice', desc: 'PTM for Grades PG to 10 has been scheduled for Saturday, Ashad 20, from 11:00 AM onwards.' },
    { date: '2026-06-15', title: 'Admission Notice: Re-openings for Grade 11', desc: 'A few scholarship seats are available for outstanding students in Science and Management streams.' },
  ];

  return (
    <div className="py-16 px-6 max-w-4xl mx-auto text-left flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-serif text-purple-900 border-b-2 border-[#ffdd57] pb-2 w-fit">News & Bulletins</h1>
      
      <div className="flex flex-col gap-6 mt-4">
        {notices.map((notice, idx) => (
          <div key={idx} className="bg-white border border-slate-200 hover:border-purple-300 rounded-2xl p-6 shadow-sm transition-all flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="bg-[#652d90]/10 text-[#652d90] font-bold text-sm px-4 py-2 rounded-xl text-center min-w-[120px] h-fit">
              {notice.date}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
              <p className="text-slate-500 text-sm mt-1 font-light leading-relaxed">{notice.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
