import React, { useState } from 'react';
import { Sparkles, ClipboardList, FileCheck, FileSpreadsheet, Compass, ArrowRight, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  details: string[];
}

interface Faq {
  q: string;
  a: string;
}

export const Admissions: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const admissionSteps: Step[] = [
    {
      num: "01",
      title: "Online Registration",
      desc: "Fill and submit the online application form to register your child's inquiry.",
      icon: <ClipboardList className="h-6 w-6 text-[#652d90]" />,
      details: [
        "Provide accurate candidate and guardian information.",
        "Choose appropriate grade level and academic term.",
        "Double-check contact numbers and emails before submission.",
        "Keep the generated registration reference number safe."
      ]
    },
    {
      num: "02",
      title: "Document Submission",
      desc: "Provide necessary educational certificates, photos, and birth registration.",
      icon: <FileCheck className="h-6 w-6 text-[#652d90]" />,
      details: [
        "Photocopy of birth certificate.",
        "Transfer certificate and character certificate from prior school.",
        "Marksheet/Report card of the last terminal/final examination.",
        "Three recent passport-sized color photographs of the student."
      ]
    },
    {
      num: "03",
      title: "Entrance Assessment",
      desc: "Mandatory entrance examination covering English, Mathematics, Science, and Nepali.",
      icon: <FileSpreadsheet className="h-6 w-6 text-[#652d90]" />,
      details: [
        "Entrance exams are compulsory for all grades starting from Prep-Class to Grade 9.",
        "Questions check understanding of basic concepts from the preceding grade.",
        "Exam duration is approximately 2 hours.",
        "Results are announced within 2 days of testing."
      ]
    },
    {
      num: "04",
      title: "Interview & Enrollment",
      desc: "A brief student and parent interaction with the Principal followed by fee settlement.",
      icon: <Compass className="h-6 w-6 text-[#652d90]" />,
      details: [
        "Both parents/guardians are recommended to accompany the child during interview.",
        "Review and sign the school discipline agreement forms.",
        "Deposit admission, security, and first terminal fees at the accountant desk.",
        "Collect textbooks list, notebooks list, and custom uniforms details."
      ]
    }
  ];

  const faqs: Faq[] = [
    {
      q: "What is the age criteria for Kindergarten admissions?",
      a: "Children should be 2.5+ years old for Nursery, 3.5+ years for LKG, and 4.5+ years for UKG admissions. Age validation is done using their birth certificate."
    },
    {
      q: "Is transportation facility available for all routes in Pokhara?",
      a: "Yes, our transport covers almost all major routes in Pokhara-17, Mahatgaunda, Birauta, Damside, Chorepatan, and adjoining areas. You can register for transportation during final admission."
    },
    {
      q: "Are scholarship schemes available for deserving students?",
      a: "Dhungesanghu Boarding School provides scholarships based on merit (entrance exam toppers, terminal toppers) and need-based scholarships for underprivileged or marginalized students. Details can be requested from the administration desk."
    },
    {
      q: "Can I pay the school fee in installments?",
      a: "Yes, fees can be paid in installments corresponding to the four academic terms (Shrawan, Kartika, Magh, Baisakh). Term fees should be cleared before terminal examinations begin."
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <div className="w-full flex flex-col font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Join Our School
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            Admissions Portal
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Welcome to the admissions process for the academic year 2026. Follow our streamlined enrollment steps.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16 flex flex-col gap-12">
        
        {/* Direct Link to form */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left flex flex-col gap-1.5">
            <h3 className="font-extrabold text-amber-800 text-lg sm:text-xl font-serif">Online Application Forms Open</h3>
            <p className="text-slate-600 text-sm font-light max-w-xl">
              Skip queue papers. You can submit your candidate application directly online through our school digital partner portal.
            </p>
          </div>
          <a 
            href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-[#652d90] hover:bg-[#4b1f6b] text-white px-8 py-3.5 rounded-2xl font-bold shadow transition-all active:scale-95 text-center text-sm shrink-0"
          >
            Apply Online Now
          </a>
        </div>

        {/* STEPPER JOURNEY SECTION */}
        <div className="flex flex-col gap-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">The Admission Journey</h2>
            <p className="text-slate-400 text-sm font-light mt-1">Click on each step below to view instructions and required checklists.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Steps Left Bar */}
            <div className="md:col-span-4 flex flex-row md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 w-full">
              {admissionSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center gap-4 p-4.5 rounded-2xl border text-left min-w-[200px] md:min-w-0 transition-all shrink-0 cursor-pointer ${
                    activeStep === idx
                      ? 'bg-white border-[#652d90] shadow-md border-l-[6px] border-l-[#652d90]'
                      : 'bg-white/50 border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <span className={`text-xl font-black font-mono shrink-0 ${activeStep === idx ? 'text-[#652d90]' : 'text-slate-300'}`}>
                    {step.num}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">{step.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Details Right Panel */}
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md text-left flex flex-col gap-5 relative min-h-[280px]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl shrink-0">
                  {admissionSteps[activeStep].icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">{admissionSteps[activeStep].title}</h3>
              </div>
              
              <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                {admissionSteps[activeStep].desc}
              </p>

              <div className="h-[1px] bg-slate-100 w-full" />

              <div className="flex flex-col gap-3">
                <h4 className="font-extrabold text-slate-700 text-xs sm:text-sm uppercase tracking-wider">Required Guidelines & Criteria:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-500 font-light text-xs sm:text-sm">
                  {admissionSteps[activeStep].details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#652d90] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SYLLABI DOWNLOADS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-4">
          <div className="md:col-span-5 bg-[#652d90]/5 rounded-3xl p-8 border border-purple-100/50 flex flex-col justify-between text-left">
            <div>
              <h3 className="text-xl font-bold font-serif text-[#4b1f6b] mb-2">Need Guidance?</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                You can download entrance exam syllabi outlines or collect them directly from our office. Doing self-study based on these guidelines helps students clear our exams easily.
              </p>
            </div>
            <a 
              href="mailto:dhungesanghuschool@gmail.com" 
              className="mt-6 flex items-center justify-between p-3.5 bg-white rounded-xl border border-purple-100 hover:shadow-sm transition-shadow font-semibold text-[#652d90] text-sm"
            >
              <span>Email Admission Office</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </a>
          </div>

          <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800 font-serif">Information Downloads</h3>
            
            <div className="flex flex-col gap-3">
              {/* Syllabi item */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50 hover:bg-slate-100/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-100 rounded-xl text-rose-600">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-700">Entrance Syllabus Outline</span>
                    <span className="text-[10px] text-slate-400">PDF Document • 450 KB</span>
                  </div>
                </div>
                <button className="text-xs text-[#652d90] font-bold hover:underline cursor-pointer">Download</button>
              </div>

              {/* Prospectus item */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/50 hover:bg-slate-100/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-700">School Prospectus 2026</span>
                    <span className="text-[10px] text-slate-400">PDF Document • 2.4 MB</span>
                  </div>
                </div>
                <button className="text-xs text-[#652d90] font-bold hover:underline cursor-pointer">Download</button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQS SECTION */}
        <div className="flex flex-col gap-6 mt-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b]">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm font-light mt-1">Get immediate answers to admissions related queries.</p>
          </div>

          <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full text-left mt-2">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 font-bold text-slate-800 text-sm sm:text-base text-left focus:outline-none cursor-pointer hover:bg-slate-50/20"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4.5 w-4.5 text-slate-400 shrink-0" /> : <ChevronDown className="h-4.5 w-4.5 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-500 font-light text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
