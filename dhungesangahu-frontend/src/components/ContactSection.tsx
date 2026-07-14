import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface ContactSectionProps {
  isPage?: boolean;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const ContactSection: React.FC<ContactSectionProps> = ({ isPage = false }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className={`w-full font-sans ${isPage ? 'py-12 bg-white' : 'py-20 bg-gradient-to-b from-white to-[#f7f3fb]'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#652d90]/10 text-[#652d90] font-bold text-xs uppercase tracking-wider rounded-full">
            <MessageSquare className="h-3.5 w-3.5" />
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4b1f6b] font-serif leading-tight">
            {isPage ? 'Get In Touch' : 'Contact Our Office'}
          </h2>
          <p className="text-slate-500 font-light text-sm sm:text-base leading-relaxed">
            Have queries about admissions, schedules, or school policies? Our administrative team is here to assist you. Drop us a message or visit our campus.
          </p>
        </motion.div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-6 w-full"
          >
            
            {/* Card 1: Location */}
            <motion.div 
              variants={fadeInUp}
              className="group bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#652d90]/40 transition-all duration-300 flex gap-5 items-start"
            >
              <div className="p-4 bg-[#652d90]/10 text-[#652d90] rounded-2xl group-hover:bg-[#652d90] group-hover:text-white transition-all duration-300 shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wide">Campus Address</h4>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-light leading-relaxed">
                  Pokhara-17, Mahatgaunda, Kaski, Nepal
                </p>
                <a 
                  href="https://maps.google.com/?q=Dhungesanghu+Boarding+School+Pokhara" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-[#d97706] font-bold mt-2 hover:underline inline-block"
                >
                  View on Google Maps →
                </a>
              </div>
            </motion.div>

            {/* Card 2: Call */}
            <motion.a 
              variants={fadeInUp}
              href="tel:061-402039"
              className="group bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#652d90]/40 transition-all duration-300 flex gap-5 items-start"
            >
              <div className="p-4 bg-[#652d90]/10 text-[#652d90] rounded-2xl group-hover:bg-[#652d90] group-hover:text-white transition-all duration-300 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wide">Call Phone</h4>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-semibold">
                  061-402039
                </p>
                <span className="text-xs text-slate-400 font-light mt-1">Tap to dial school telephone</span>
              </div>
            </motion.a>

            {/* Card 3: Email */}
            <motion.a 
              variants={fadeInUp}
              href="mailto:dhungesanghuschool@gmail.com"
              className="group bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#652d90]/40 transition-all duration-300 flex gap-5 items-start"
            >
              <div className="p-4 bg-[#652d90]/10 text-[#652d90] rounded-2xl group-hover:bg-[#652d90] group-hover:text-white transition-all duration-300 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wide">Email School</h4>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-light break-all hover:text-[#652d90] transition-colors">
                  dhungesanghuschool@gmail.com
                </p>
                <span className="text-xs text-slate-400 font-light mt-1">Send administrative emails</span>
              </div>
            </motion.a>

            {/* Card 4: Hours */}
            <motion.div 
              variants={fadeInUp}
              className="group bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#652d90]/40 transition-all duration-300 flex gap-5 items-start"
            >
              <div className="p-4 bg-[#652d90]/10 text-[#652d90] rounded-2xl group-hover:bg-[#652d90] group-hover:text-white transition-all duration-300 shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wide">Office Hours</h4>
                <p className="text-slate-600 text-sm sm:text-base mt-1.5 font-light">
                  Sunday - Friday: 9:00 AM - 4:00 PM
                </p>
                <span className="text-xs text-[#d97706] font-semibold mt-1">Closed on Saturdays & public holidays</span>
              </div>
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 w-full bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#652d90] to-[#d97706]" />
            
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4 animate-fade-in">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 font-serif">Message Sent Successfully!</h3>
                <p className="text-slate-500 text-sm sm:text-base max-w-sm font-light">
                  Thank you for reaching out. We have received your query and our office representative will get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="text-left mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif">Send Us a Message</h3>
                  <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">Please fill up the form details below.</p>
                </div>

                <form className="flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Doe" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-[#652d90]/20 focus:border-[#652d90] text-sm font-light transition-all" 
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. john@example.com" 
                        className="w-full px-4 py-3 rounded-xl border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-[#652d90]/20 focus:border-[#652d90] text-sm font-light transition-all" 
                      />
                    </div>

                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Admission Inquiry" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-[#652d90]/20 focus:border-[#652d90] text-sm font-light transition-all" 
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Message</label>
                    <textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Write details of your query..." 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300/80 focus:outline-none focus:ring-2 focus:ring-[#652d90]/20 focus:border-[#652d90] text-sm font-light resize-none transition-all" 
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 text-sm sm:text-base mt-2 cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                    Submit Message
                  </button>
                </form>
              </>
            )}

          </motion.div>

        </div>

        {/* MAP ROW */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 w-full"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 h-[380px] w-full relative">
            <iframe 
              title="Dhungesanghu Boarding School Google Maps Location"
              src="https://maps.google.com/maps?q=Dhungesanghu%20Boarding%20School%20Mahatgaunda%20Pokhara&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
