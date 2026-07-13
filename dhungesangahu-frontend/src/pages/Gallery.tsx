import React from 'react';

export const Gallery: React.FC = () => {
  const images = [
    { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600', caption: 'Science Lab' },
    { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600', caption: 'Classroom Activities' },
    { url: 'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=80&w=600', caption: 'Annual Sports Meet' },
    { url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600', caption: 'Computer Training' },
    { url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600', caption: 'Library Session' },
    { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600', caption: 'Kindergarten Play' },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto text-left flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-serif text-purple-900 inline-block border-b-2 border-[#ffdd57] pb-2">Photo Gallery</h1>
        <p className="text-slate-500 mt-2">Glances of life and learnings at Dhungesanghu Boarding School.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative rounded-2xl overflow-hidden group shadow-sm border border-slate-100">
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-medium text-sm">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
