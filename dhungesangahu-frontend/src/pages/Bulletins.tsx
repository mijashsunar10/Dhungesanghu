import React, { useState } from 'react';
import { Search, Calendar, Printer, X, Sparkles } from 'lucide-react';

interface Notice {
  id: number;
  date: string;
  month: string;
  day: string;
  category: 'exams' | 'events' | 'admin';
  categoryLabel: string;
  title: string;
  desc: string;
  fullContent?: string;
  author?: string;
}

export const Bulletins: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const notices: Notice[] = [
    {
      id: 1,
      date: '2026-07-10',
      month: 'JUL',
      day: '10',
      category: 'exams',
      categoryLabel: 'Exams & Academics',
      title: 'First Term Examination Schedule Released',
      desc: 'The first term exam begins on Shrawan 15. Students can collect their admit cards from the account desk.',
      fullContent: `This is to inform all students and parents that the First Terminal Examinations for the academic year 2083 (2026) will commence on Shrawan 15. Detailed subject-wise schedules have been posted on classroom bulletin boards and sent via school SMS. Admit cards are mandatory to enter the examination hall. Admit cards will be distributed from Shrawan 10 onwards, subject to fee clearance of the first term. Please contact the administrative department for any queries.`,
      author: 'Examination Controller'
    },
    {
      id: 2,
      date: '2026-06-25',
      month: 'JUN',
      day: '25',
      category: 'events',
      categoryLabel: 'Events & Holiday',
      title: 'Parent-Teacher Meeting (PTM) Notice',
      desc: 'PTM for Grades PG to 10 has been scheduled for Saturday, Ashad 20, from 11:00 AM onwards.',
      fullContent: `Dear Parents and Guardians, you are cordially invited to the first Parent-Teacher Meeting (PTM) of this term scheduled for Saturday, Ashad 20. The meeting will run from 11:00 AM to 3:00 PM. Teachers will discuss student academics progress, behavioral observations, and creative achievements. We highly value your feedback and request your mandatory presence to review test performance sheets.`,
      author: 'Academic Coordinator'
    },
    {
      id: 3,
      date: '2026-06-15',
      month: 'JUN',
      day: '15',
      category: 'admin',
      categoryLabel: 'Administrative',
      title: 'Admission Notice: Re-openings for Grade 11',
      desc: 'A few scholarship seats are available for outstanding students in Science and Management streams.',
      fullContent: `Dhungesanghu Boarding School announces open registration for the remaining few scholarship seats in Grade 11 (Science and Management Streams) for the session 2083/84. Deserving candidates with a minimum GPA of 3.2 in SEE are eligible to sit for the scholarship testing exam scheduled for Ashad 10. Forms can be collected from the administration office during working hours.`,
      author: 'Admissions Desk'
    },
    {
      id: 4,
      date: '2026-05-18',
      month: 'MAY',
      day: '18',
      category: 'events',
      categoryLabel: 'Events & Holiday',
      title: 'Inter-House Sports Meet Postponement',
      desc: 'Due to forecasted heavy rainfalls, the Inter-House Athletics meet has been postponed to Jestha 12.',
      fullContent: `This is to notify all house captains, sports coaches, and students that the Annual Inter-House Athletics and Track meet originally scheduled for Jestha 5 has been postponed to Jestha 12 due to predictions of heavy rainfall. Routine classroom teachings will continue as normal on Jestha 5. Modified training schedules for participants will be active in morning shifts.`,
      author: 'Sports Committee Head'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Notices' },
    { id: 'exams', label: 'Exams & Academics' },
    { id: 'events', label: 'Events & Holidays' },
    { id: 'admin', label: 'Administrative' }
  ];

  // Filtering logic
  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (notice.fullContent && notice.fullContent.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Bulletins
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            News & Notices
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with the latest academic announcements, event calendars, holiday notices, and exam schedules.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-8">
        
        {/* Controls: Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          {/* Categories Tab list */}
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#652d90] text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#652d90]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search bulletins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] focus:ring-2 focus:ring-[#652d90]/10 rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Notices Timeline List */}
        {filteredNotices.length > 0 ? (
          <div className="flex flex-col gap-5 text-left w-full">
            {filteredNotices.map((notice) => (
              <div 
                key={notice.id} 
                onClick={() => setSelectedNotice(notice)}
                className="group bg-white border border-slate-200 hover:border-[#652d90]/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start cursor-pointer relative"
              >
                {/* Accent Tag */}
                <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-gradient-to-b from-[#652d90] to-[#ffdd57] opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Left Date Block */}
                <div className="flex sm:flex-col items-center justify-center bg-[#652d90]/10 text-[#652d90] px-4 py-2 sm:py-3.5 rounded-xl text-center min-w-[70px] sm:min-w-[80px] shrink-0 gap-1.5 sm:gap-0 select-none">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700">{notice.month}</span>
                  <span className="text-xl sm:text-2xl font-black leading-none font-serif">{notice.day}</span>
                </div>

                {/* Main description and Title */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      notice.category === 'exams' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      notice.category === 'events' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {notice.categoryLabel}
                    </span>
                    <span className="text-slate-400 text-xs font-light">• Posted on {notice.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#652d90] transition-colors leading-snug">
                    {notice.title}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1 font-light leading-relaxed truncate-2-lines">
                    {notice.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search results state */
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/60 shadow-sm flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-2">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 font-serif">No notices found</h3>
            <p className="text-slate-400 text-sm max-w-sm font-light">
              We couldn't find any bulletin matches for "{searchQuery}". Please try spelling checks or clear selection tabs.
            </p>
          </div>
        )}

      </div>

      {/* NOTICE DETAILED DIALOG MODAL */}
      {selectedNotice && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
          onClick={() => setSelectedNotice(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative animate-fadeIn text-left flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top accent border */}
            <div className="h-2.5 w-full bg-gradient-to-r from-[#652d90] to-[#ffdd57]" />

            {/* Modal Header */}
            <div className="p-6 sm:p-8 pb-4 flex justify-between items-start gap-4 border-b border-slate-100">
              <div className="flex flex-col gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit ${
                  selectedNotice.category === 'exams' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  selectedNotice.category === 'events' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  'bg-purple-50 text-purple-700 border border-purple-200'
                }`}>
                  {selectedNotice.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-800 mt-1 leading-snug">{selectedNotice.title}</h3>
                <span className="text-slate-400 text-xs font-light flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Published Date: {selectedNotice.date}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[50vh] text-slate-600 font-light text-sm sm:text-base leading-relaxed flex flex-col gap-6">
              <p className="whitespace-pre-wrap">{selectedNotice.fullContent || selectedNotice.desc}</p>
              
              {/* Sign off */}
              {selectedNotice.author && (
                <div className="flex flex-col border-t border-slate-100 pt-5 mt-2 self-start font-sans">
                  <span className="font-semibold text-slate-800">{selectedNotice.author}</span>
                  <span className="text-xs text-slate-400">Dhungesanghu Boarding School</span>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#652d90] transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print Notice
              </button>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="bg-[#652d90] hover:bg-[#4b1f6b] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Close Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
