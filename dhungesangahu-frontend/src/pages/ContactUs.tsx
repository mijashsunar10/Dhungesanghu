import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { motion } from 'framer-motion';
import { PageBanner } from '../components/PageBanner';

export const ContactUs: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans"
    >
      <PageBanner 
        title="Contact Us" 
        subtitle="We are always here to help. Reach out to us via phone, email, or by visiting our campus." 
      />

      {/* Main Contact Section */}
      <ContactSection isPage={true} />
    </motion.div>
  );
};
