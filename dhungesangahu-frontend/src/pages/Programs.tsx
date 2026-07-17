import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBanner } from '../components/PageBanner';
import { getPrograms, type Program } from '../api';

const defaultPrograms: Program[] = [
  {
    id: 'pre-primary',
    programId: 'pre-primary',
    title: 'Pre-Primary Level',
    subtitle: 'Play Group (PG) to Upper Kindergarten (UKG)',
    description: 'Our Pre-Primary program focuses on sensory learning, motor skills development, basic language skills, and foundational numeracy. We utilize interactive play-way methods, storytellings, and audio-visual sessions in a colorful, child-friendly environment to spark early curiosity.',
    ageGroup: '2.5 to 5 Years',
    highlights: [
      'Sensory-based learning materials',
      'Montessori activity room exercises',
      'Audio-Visual storytelling & music classes',
      'Focus on motor skills and social communication',
      'Caring, highly-trained female faculties'
    ],
    subjects: ['English Alphabets', 'Nepali Letters', 'Numeracy & Basic Maths', 'Drawing & Crafting', 'General Awareness', 'Good Habits & Manners'],
    icon: 'Sparkles',
    order: 1
  },
  {
    id: 'primary',
    programId: 'primary',
    title: 'Primary Level',
    subtitle: 'Grade 1 to Grade 5',
    description: 'The primary years focus on building critical foundational knowledge. We transition students into deeper academic concepts in science, language arts, and basic math while cultivating creative thinking, personal discipline, and active team participation.',
    ageGroup: '6 to 10 Years',
    highlights: [
      'Interactive learning classrooms',
      'Weekly spelling & creative drawing tasks',
      'Basic computer usage introduction',
      'Practical science exhibits & collections',
      'Value-based moral education sessions'
    ],
    subjects: ['English Language & Grammar', 'Mathematics', 'Science & Environment', 'Nepali & Social Studies', 'Computer Studies', 'Moral Science', 'Art & Craft'],
    icon: 'BookOpen',
    order: 2
  },
  {
    id: 'secondary',
    programId: 'secondary',
    title: 'Secondary Level',
    subtitle: 'Grade 6 to Grade 10 (SEE Preparation)',
    description: 'Designed to equip students for higher secondary learning and the national Secondary Education Examination (SEE). We focus heavily on logical reasoning, analytical abilities, advanced computer operations, laboratory research, and structured competitive exams prep.',
    ageGroup: '11 to 16 Years',
    highlights: [
      'Intensive Secondary Education Examination (SEE) drills',
      'Hands-on Physics, Chemistry & Biology laboratory experiments',
      'Advanced computer programming & coding basics',
      'Leadership programs & public speaking classes',
      'Inter-school sports tournaments coaching'
    ],
    subjects: ['Compulsory English', 'Compulsory Mathematics', 'Science & Technology', 'Social Studies (Nepali Medium)', 'Nepali Language', 'Optional Mathematics / Env. Science', 'Computer Science'],
    icon: 'GraduationCap',
    order: 3
  }
];

const getProgramIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="h-10 w-10 text-[#652d90]" />;
    case 'GraduationCap':
      return <GraduationCap className="h-10 w-10 text-[#652d90]" />;
    case 'BookOpen':
    default:
      return <BookOpen className="h-10 w-10 text-[#652d90]" />;
  }
};

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [activeTab, setActiveTab] = useState<string>('pre-primary');

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await getPrograms();
        if (data && data.length > 0) {
          setPrograms(data);
          // Set active tab to the first program's identifier if the current active tab isn't found
          if (!data.some(p => p.programId === activeTab)) {
            setActiveTab(data[0].programId);
          }
        }
      } catch (err) {
        console.error('Error fetching academic programs:', err);
      }
    }
    loadPrograms();
  }, [activeTab]);

  const currentProgram = programs.find(p => p.programId === activeTab) || programs[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      <PageBanner 
        title="Academic Programs" 
        subtitle="Explore our curriculum paths meticulously designed for holistic child growth, logic cultivation, and SEE excellence." 
        badge="Curriculum"
      />

      {/* Main Content Area */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* Tabs navigation */}
        <div className="flex flex-wrap bg-white p-2 rounded-2xl shadow-md border border-slate-200/60 w-full max-w-2xl mb-12 gap-1 sm:gap-0 justify-center">
          {programs.map(prog => (
            <button
              key={prog.id}
              onClick={() => setActiveTab(prog.programId)}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 active:scale-98 cursor-pointer ${
                activeTab === prog.programId
                  ? 'bg-[#652d90] text-white shadow-sm font-black'
                  : 'text-slate-600 hover:text-[#652d90] hover:bg-slate-50'
              }`}
            >
              {prog.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Selected Program Details Display */}
        {currentProgram && (
          <div className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all duration-300 min-h-[480px]">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#652d90] to-[#ffdd57]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left"
              >
                {/* Main Info */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-purple-100/65 rounded-2xl shadow-inner shrink-0">
                      {getProgramIcon(currentProgram.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider">Age Group: {currentProgram.ageGroup}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#4b1f6b] font-serif leading-tight">{currentProgram.title}</h2>
                      <p className="text-slate-400 text-xs sm:text-sm italic font-light">{currentProgram.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
                    {currentProgram.description}
                  </p>

                  {/* Highlights List */}
                  {currentProgram.highlights && currentProgram.highlights.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wider">Program Highlights</h4>
                      <ul className="flex flex-col gap-2.5 text-slate-600 font-light text-sm">
                        {currentProgram.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Subjects and Actions Side Info */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200/50">
                  {currentProgram.subjects && currentProgram.subjects.length > 0 && (
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wider mb-4">Core Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentProgram.subjects.map((subj, i) => (
                          <span key={i} className="bg-white border border-slate-200 text-[#652d90] font-semibold text-xs px-3.5 py-2 rounded-xl shadow-sm">
                            {subj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="h-[1px] bg-slate-200 w-full my-1" />

                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-slate-400 font-light">Interested in applying for {currentProgram.title}?</span>
                    <a 
                      href="https://ingrails.com/school/admission/form/dhungesanghu-boarding-school/true?format="
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-center text-sm cursor-pointer"
                    >
                      Apply Admission Online
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </motion.div>
  );
};
