import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { motion } from 'framer-motion';

export const ContactUs: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans"
    >
      {/* Premium Header/Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm">
            Contact Us
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            We are always here to help. Reach out to us via phone, email, or by visiting our campus.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection isPage={true} />
    </motion.div>
  );
};
