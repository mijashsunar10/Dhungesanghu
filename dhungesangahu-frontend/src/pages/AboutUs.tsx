import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-4xl mx-auto text-left flex flex-col gap-6">
      <h1 className="text-4xl font-bold font-serif text-purple-900 border-b-2 border-[#ffdd57] pb-2 w-fit">About Us</h1>
      <p className="text-slate-600 text-lg leading-relaxed font-light">
        Dhungesanghu Boarding School was established with a clear vision to foster character and competency. Situated in the serene environment of Pokhara-17, Mahatgaunda, the school has been a hallmark of secondary and primary learning for decades.
      </p>
      
      <h2 className="text-2xl font-semibold font-serif text-purple-800 mt-6">Our Mission</h2>
      <p className="text-slate-600 leading-relaxed font-light">
        To provide premium quality education focusing on critical thinking, ethical understanding, and community responsibility. We encourage children to ask questions and seek excellence.
      </p>

      <h2 className="text-2xl font-semibold font-serif text-purple-800 mt-6">Our Vision</h2>
      <p className="text-slate-600 leading-relaxed font-light">
        To remain a premier academic institution in the region, bridging the gap between traditional learning and global standard scientific training.
      </p>
    </div>
  );
};
