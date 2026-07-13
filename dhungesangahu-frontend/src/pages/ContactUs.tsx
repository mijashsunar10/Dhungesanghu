import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactUs: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-6xl mx-auto text-left flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-serif text-purple-900 inline-block border-b-2 border-[#ffdd57] pb-2">Contact Us</h1>
        <p className="text-slate-500 mt-2">Get in touch with us for inquiries and admissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-4 items-start">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4 items-center">
            <div className="p-3 bg-purple-100 rounded-xl text-[#652d90]">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Location</h4>
              <p className="text-slate-600 text-sm mt-0.5 font-light">Pokhara-17, Mahatgaunda, Nepal</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4 items-center">
            <div className="p-3 bg-purple-100 rounded-xl text-[#652d90]">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Call</h4>
              <p className="text-slate-600 text-sm mt-0.5 font-light">061-402039</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4 items-center">
            <div className="p-3 bg-purple-100 rounded-xl text-[#652d90]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Mail Us At</h4>
              <p className="text-slate-600 text-sm mt-0.5 font-light">dhungesanghuschool@gmail.com</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4 items-center">
            <div className="p-3 bg-purple-100 rounded-xl text-[#652d90]">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Office Hours</h4>
              <p className="text-slate-600 text-sm mt-0.5 font-light">Sun - Fri: 9:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold font-serif text-slate-800 mb-6">Send Us a Message</h3>
          
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-purple-500 text-sm font-light" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-purple-500 text-sm font-light" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
              <input 
                type="text" 
                placeholder="Topic of discussion" 
                className="px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-purple-500 text-sm font-light" 
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Message</label>
              <textarea 
                rows={4} 
                placeholder="Type your message here..." 
                className="px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-purple-500 text-sm font-light resize-none" 
              />
            </div>

            <button 
              type="submit"
              className="bg-[#652d90] hover:bg-purple-900 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-[0.98] mt-2 text-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
