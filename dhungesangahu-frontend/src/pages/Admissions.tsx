import React, { useState } from 'react';
import { ClipboardList, FileCheck, FileSpreadsheet, Compass, ArrowRight, ChevronDown, ChevronUp, Download, Calculator, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBanner } from '../components/PageBanner';

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

  // Fee Calculator States
  const [selectedGrade, setSelectedGrade] = useState<string>('primary');
  const [hasHostel, setHasHostel] = useState<boolean>(false);
  const [transportRoute, setTransportRoute] = useState<string>('none');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);

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

  // Fee calculation logic
  const getBaseTuition = () => {
    switch (selectedGrade) {
      case 'pre-primary': return 3500;
      case 'primary': return 4500;
      case 'middle': return 5500;
      case 'secondary': return 6500;
      default: return 4500;
    }
  };

  const getHostelFee = () => (hasHostel ? 8000 : 0);

  const getTransportFee = () => {
    switch (transportRoute) {
      case 'local': return 1500;
      case 'mid': return 2200;
      case 'far': return 2800;
      default: return 0;
    }
  };

  const getClubsFee = () => {
    let sum = 0;
    if (selectedClubs.includes('music')) sum += 500;
    if (selectedClubs.includes('coding')) sum += 800;
    if (selectedClubs.includes('sports')) sum += 600;
    return sum;
  };

  const monthlyTotal = getBaseTuition() + getHostelFee() + getTransportFee() + getClubsFee();
  const quarterlyTotal = monthlyTotal * 3;

  const toggleClub = (clubId: string) => {
    if (selectedClubs.includes(clubId)) {
      setSelectedClubs(selectedClubs.filter(id => id !== clubId));
    } else {
      setSelectedClubs([...selectedClubs, clubId]);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      <PageBanner 
        title="Admissions Portal" 
        subtitle="Welcome to the admissions process for the academic year 2026. Follow our streamlined enrollment steps." 
        badge="Join Our School"
      />

      {/* Main Content Area */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16 flex flex-col gap-12">
        
        {/* Direct Link to form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
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
        </motion.div>

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
            <div className="md:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md text-left flex flex-col gap-5 relative min-h-[280px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-5 h-full w-full"
                >
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* INTERACTIVE FEE CALCULATOR SECTION */}
        <div className="flex flex-col gap-6 mt-8">
          <div className="text-left flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#4b1f6b] flex items-center gap-2.5">
              <Calculator className="h-7 w-7 text-[#652d90]" />
              Fee Estimator
            </h2>
            <p className="text-slate-400 text-sm font-light">Estimate monthly and term-wise schooling fees dynamically based on selected options.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Options Input Column */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-left">
              
              {/* Option 1: Select Grade */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-700 text-sm sm:text-base uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="h-4.5 w-4.5 text-[#652d90]" />
                  1. Select Academic Level
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'pre-primary', label: 'Pre-Primary', desc: 'Nursery to UKG' },
                    { id: 'primary', label: 'Primary', desc: 'Grade 1 to 5' },
                    { id: 'middle', label: 'Middle School', desc: 'Grade 6 to 8' },
                    { id: 'secondary', label: 'Secondary', desc: 'Grade 9 & 10' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedGrade(lvl.id)}
                      className={`p-3.5 border rounded-2xl text-left cursor-pointer transition-all active:scale-[0.98] ${
                        selectedGrade === lvl.id
                          ? 'border-[#652d90] bg-[#652d90]/5 ring-2 ring-[#652d90]/15'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-bold text-slate-800 text-xs sm:text-sm block leading-tight">{lvl.label}</span>
                      <span className="text-[10px] text-slate-400 font-light mt-0.5 block">{lvl.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Hostel Accommodation */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-700 text-sm sm:text-base uppercase tracking-wider">
                  2. Boarding / Hostel facility
                </label>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                  <button
                    onClick={() => setHasHostel(false)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                      !hasHostel ? 'bg-[#652d90] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Day Scholar (No Hostel)
                  </button>
                  <button
                    onClick={() => setHasHostel(true)}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-all ${
                      hasHostel ? 'bg-[#652d90] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Boarder (With Hostel)
                  </button>
                </div>
              </div>

              {/* Option 3: Transport service */}
              <AnimatePresence initial={false}>
                {!hasHostel && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3 overflow-hidden"
                  >
                    <label className="font-bold text-slate-700 text-sm sm:text-base uppercase tracking-wider mt-2">
                      3. Transportation Facility
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'none', label: 'No Bus Service', desc: 'Self commutation' },
                        { id: 'local', label: 'Local Routes (Within 2km)', desc: 'NRs. 1,500 / month' },
                        { id: 'mid', label: 'Mid Distance (2km - 5km)', desc: 'NRs. 2,200 / month' },
                        { id: 'far', label: 'Long Distance (5km+)', desc: 'NRs. 2,800 / month' }
                      ].map(route => (
                        <button
                          key={route.id}
                          onClick={() => setTransportRoute(route.id)}
                          className={`p-3 border rounded-2xl text-left cursor-pointer transition-all active:scale-[0.98] ${
                            transportRoute === route.id
                              ? 'border-[#652d90] bg-[#652d90]/5 ring-2 ring-[#652d90]/15'
                              : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="font-bold text-slate-800 text-xs sm:text-sm block leading-tight">{route.label}</span>
                          <span className="text-[10px] text-slate-400 font-light mt-0.5 block">{route.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Option 4: Extra Clubs Activity */}
              <div className="flex flex-col gap-3">
                <label className="font-bold text-slate-700 text-sm sm:text-base uppercase tracking-wider">
                  4. Extracurricular Clubs Subscription (Optional)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'music', label: 'Music & Dance', cost: 'NRs. 500/m' },
                    { id: 'coding', label: 'Computer Coding', cost: 'NRs. 800/m' },
                    { id: 'sports', label: 'Sports Club', cost: 'NRs. 600/m' }
                  ].map(club => {
                    const isSelected = selectedClubs.includes(club.id);
                    return (
                      <button
                        key={club.id}
                        onClick={() => toggleClub(club.id)}
                        className={`p-3 border rounded-2xl cursor-pointer text-center transition-all active:scale-[0.98] ${
                          isSelected
                            ? 'border-[#652d90] bg-[#652d90]/5 ring-2 ring-[#652d90]/15 font-bold'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-bold text-slate-800 text-xs block leading-tight">{club.label}</span>
                        <span className="text-[10px] text-slate-400 font-light mt-1 block">{club.cost}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary Invoice Receipt display */}
            <div className="lg:col-span-5 bg-[#652d90]/5 border-2 border-[#652d90]/25 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 text-left relative overflow-hidden lg:sticky lg:top-24">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffdd57]/10 rounded-full blur-xl pointer-events-none" />
              
              <h3 className="text-xl font-bold font-serif text-[#4b1f6b] border-b border-purple-100 pb-3.5">
                Calculated Estimate
              </h3>

              <div className="flex flex-col gap-3 text-xs sm:text-sm text-slate-600 font-light">
                <div className="flex justify-between items-center">
                  <span>Tuition & Library Fee:</span>
                  <span className="font-bold text-slate-800">NRs. {getBaseTuition().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hostel & Meal Service:</span>
                  <span className="font-bold text-slate-800">NRs. {getHostelFee().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Transportation Services:</span>
                  <span className="font-bold text-slate-800">NRs. {(!hasHostel ? getTransportFee() : 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Extracurricular Clubs:</span>
                  <span className="font-bold text-slate-800">NRs. {getClubsFee().toLocaleString()}</span>
                </div>
              </div>

              <div className="h-[1px] bg-purple-200/50 w-full" />

              <div className="flex flex-col gap-1 text-[#4b1f6b]">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-xs uppercase tracking-wider">Estimated Monthly Total:</span>
                  <span className="font-black text-2xl font-mono leading-none">NRs. {monthlyTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-500">Estimated Term (3-Month) Total:</span>
                  <span className="font-bold text-base text-slate-700 font-mono leading-none">NRs. {quarterlyTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-[#ffdd57]/20 border border-[#ffdd57]/50 rounded-2xl p-4 text-[10px] sm:text-xs text-amber-900 font-light leading-relaxed">
                * Note: These are monthly/terminal estimates of recurring fees. Final enrollment fee structure includes one-time admission, registration, security deposit, and book materials charges, payable at the accounting desk during official admission.
              </div>
            </div>
          </div>
        </div>

        {/* SYLLABI DOWNLOADS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 bg-[#652d90]/5 rounded-3xl p-8 border border-purple-100/50 flex flex-col justify-between text-left"
          >
            <div>
              <h3 className="text-xl font-bold font-serif text-[#4b1f6b] mb-2">Need Guidance?</h3>
              <p className="text-slate-600 text-sm font-light leading-relaxed">
                You can download entrance exam syllabi outlines or collect them directly from our office. Doing self-study based on these guidelines helps students clear our exams easily.
              </p>
            </div>
            <a 
              href="mailto:dhungesanghuschool@gmail.com" 
              className="mt-6 flex items-center justify-between p-3.5 bg-white rounded-xl border border-purple-100 hover:shadow-sm transition-shadow font-semibold text-[#652d90] text-sm cursor-pointer"
            >
              <span>Email Admission Office</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-4"
          >
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
          </motion.div>
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
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-500 font-light text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
