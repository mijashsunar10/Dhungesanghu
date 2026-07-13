import React from 'react';

export const Officials: React.FC = () => {
  const officials = [
    { name: 'Mrs. Sabnam Sunar', role: 'Principal', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300' },
    { name: 'Mr. Ramesh Thapa', role: 'Vice Principal', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300' },
    { name: 'Mrs. Gita Adhikari', role: 'Academic Coordinator', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300' },
  ];

  return (
    <div className="w-full flex flex-col font-sans">
      <div className="py-16 px-6 max-w-5xl mx-auto text-left flex flex-col gap-10 w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-serif text-purple-900 inline-block border-b-2 border-[#ffdd57] pb-2">School Officials</h1>
          <p className="text-slate-500 mt-2">Meet the dedicated leaders guiding our institution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
          {officials.map((official, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={official.image} 
                alt={official.name} 
                className="w-full h-64 object-cover object-top"
              />
              <div className="p-5 text-center">
                <h3 className="font-bold text-slate-800">{official.name}</h3>
                <p className="text-sm text-purple-600 font-semibold mt-1">{official.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
