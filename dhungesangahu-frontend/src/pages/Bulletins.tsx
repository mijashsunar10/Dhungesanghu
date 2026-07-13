import React, { useState } from 'react';
import { Search, Calendar, Printer, X, Sparkles, ChevronLeft, ChevronRight, Info } from 'lucide-react';

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

interface CalendarEvent {
  day: number;
  type: 'holiday' | 'exam' | 'activity' | 'meeting';
  title: string;
  description: string;
}

interface MonthData {
  name: string;
  englishPeriod: string;
  daysCount: number;
  startOffset: number; // 0 for Sunday, 1 for Monday, etc. to align calendar grid
  events: CalendarEvent[];
}

export const Bulletins: React.FC = () => {
  const [activeView, setActiveView] = useState<'notices' | 'calendar'>('notices');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Calendar States
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(3); // Defaults to Shrawan (July-August)
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

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

  const calendarMonths: MonthData[] = [
    {
      name: "Baishakh",
      englishPeriod: "April - May",
      daysCount: 31,
      startOffset: 2, // Tuesday
      events: [
        { day: 1, type: "holiday", title: "New Year's Day", description: "Bikram Sambat New Year 2083 celebration. School closed." },
        { day: 15, type: "meeting", title: "PTM & Report Cards", description: "Parents-teacher meet to distribute previous final exam result reports." }
      ]
    },
    {
      name: "Jestha",
      englishPeriod: "May - June",
      daysCount: 32,
      startOffset: 5, // Friday
      events: [
        { day: 10, type: "activity", title: "Inter-House Football", description: "Football selection and league match series starts on school playground." },
        { day: 12, type: "activity", title: "Sports Meet Day 2", description: "Athletics, high jump, and relay running races." },
        { day: 25, type: "exam", title: "First Unit Test Starts", description: "Unit examinations for Grades 1 to 10. Test shifts run for 1 hour." }
      ]
    },
    {
      name: "Ashad",
      englishPeriod: "June - July",
      daysCount: 31,
      startOffset: 1, // Monday
      events: [
        { day: 12, type: "activity", title: "Science Fair & Exhibition", description: "Students from Grade 5 to 10 display customized working science models." },
        { day: 20, type: "meeting", title: "Parent-Teacher Meeting", description: "Detailed review of academic performance and unit test evaluations." },
        { day: 29, type: "holiday", title: "Bhanu Jayanti Celebration", description: "Poetry and cultural celebrations on the occasion of Bhanu Jayanti. Half day holiday." }
      ]
    },
    {
      name: "Shrawan",
      englishPeriod: "July - August",
      daysCount: 32,
      startOffset: 4, // Thursday
      events: [
        { day: 10, type: "meeting", title: "Admit Card Distribution", description: "Distribution of First Term Examination admit cards at the account desk." },
        { day: 15, type: "exam", title: "First Term Exam Starts", description: "First Terminal examinations commence for PG to Grade 10." },
        { day: 26, type: "exam", title: "Term Exam Ends", description: "Conclusion of examinations. Routine regular classes resume." },
        { day: 30, type: "meeting", title: "First Term Result Day", description: "Parents review and card collection for the First Terminal Exam." }
      ]
    },
    {
      name: "Bhadra",
      englishPeriod: "August - September",
      daysCount: 31,
      startOffset: 0, // Sunday
      events: [
        { day: 8, type: "holiday", title: "Teej Festival Holiday", description: "School remains closed on the occasion of Haritalika Teej." },
        { day: 22, type: "activity", title: "Teachers Day Celebrations", description: "Special student performance, songs, and cards honoring teachers." }
      ]
    },
    {
      name: "Ashoj",
      englishPeriod: "September - October",
      daysCount: 30,
      startOffset: 3, // Wednesday
      events: [
        { day: 10, type: "holiday", title: "Dashain Vacation Begins", description: "Festival holidays start for Dashain. School closed." },
        { day: 28, type: "holiday", title: "School Re-opens", description: "Re-opening of school after Dashain festival vacation. Standard timing." }
      ]
    }
  ];

  const noticeCategories = [
    { id: 'all', label: 'All Notices' },
    { id: 'exams', label: 'Exams & Academics' },
    { id: 'events', label: 'Events & Holidays' },
    { id: 'admin', label: 'Administrative' }
  ];

  // Notice Filtering
  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calendar Event Logic
  const activeMonth = calendarMonths[selectedMonthIdx];
  const activeMonthEvents = activeMonth.events;
  const selectedDayEvent = activeMonthEvents.find(e => e.day === selectedDay);

  const prevMonth = () => {
    setSelectedMonthIdx(prev => (prev === 0 ? calendarMonths.length - 1 : prev - 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setSelectedMonthIdx(prev => (prev === calendarMonths.length - 1 ? 0 : prev + 1));
    setSelectedDay(null);
  };

  // Generate calendar cells (including padding for startOffset)
  const cells: (number | null)[] = [];
  for (let i = 0; i < activeMonth.startOffset; i++) {
    cells.push(null);
  }
  for (let i = 1; i <= activeMonth.daysCount; i++) {
    cells.push(i);
  }

  return (
    <div className="w-full flex flex-col font-sans bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#652d90] to-[#4b1f6b] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-20px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto flex flex-col gap-3 relative z-10 items-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
            <Sparkles className="h-3.5 w-3.5" />
            Bulletins & Dates
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight drop-shadow-sm mt-2">
            News & Calendar
          </h1>
          <p className="text-purple-200 font-light text-base sm:text-lg max-w-2xl mx-auto">
            Stay informed with our school notice board announcements and interactive academic event calendars.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-8">
        
        {/* Toggle between Notices and Calendar */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto">
          <button
            onClick={() => setActiveView('notices')}
            className={`px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeView === 'notices'
                ? 'bg-[#652d90] text-white'
                : 'text-slate-600 hover:text-[#652d90]'
            }`}
          >
            Notice Board
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeView === 'calendar'
                ? 'bg-[#652d90] text-white'
                : 'text-slate-600 hover:text-[#652d90]'
            }`}
          >
            Academic Calendar
          </button>
        </div>

        {/* VIEW 1: NOTICES BOARD */}
        {activeView === 'notices' && (
          <div className="flex flex-col gap-8">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center w-full bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {noticeCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[#652d90] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search bulletins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none"
                />
              </div>
            </div>

            {/* List */}
            {filteredNotices.length > 0 ? (
              <div className="flex flex-col gap-5 text-left">
                {filteredNotices.map((notice) => (
                  <div 
                    key={notice.id} 
                    onClick={() => setSelectedNotice(notice)}
                    className="group bg-white border border-slate-200 hover:border-[#652d90]/40 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-start cursor-pointer relative"
                  >
                    <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-[#652d90] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex sm:flex-col items-center justify-center bg-[#652d90]/10 text-[#652d90] px-4 py-2 sm:py-3.5 rounded-xl text-center min-w-[70px] sm:min-w-[80px] shrink-0 gap-1.5 sm:gap-0 select-none">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700">{notice.month}</span>
                      <span className="text-xl sm:text-2xl font-black leading-none font-serif">{notice.day}</span>
                    </div>

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
                      <p className="text-slate-500 text-sm mt-1 font-light leading-relaxed">
                        {notice.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-200/60 shadow-sm flex flex-col items-center gap-4">
                <Search className="h-7 w-7 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-800 font-serif">No notices found</h3>
                <p className="text-slate-400 text-sm font-light">We couldn't find any notices matching your query.</p>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: INTERACTIVE CALENDAR */}
        {activeView === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left">
            
            {/* Calendar Main Grid (Left) */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col gap-6">
              
              {/* Calendar Month Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold text-slate-800 font-serif leading-tight">
                    {activeMonth.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-light mt-0.5">Approx. {activeMonth.englishPeriod}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevMonth}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={nextMonth}
                    className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider select-none">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Day cells grid */}
              <div className="grid grid-cols-7 gap-2">
                {cells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="aspect-square bg-slate-50/20 rounded-xl" />;
                  }

                  const hasEvent = activeMonthEvents.find(e => e.day === day);
                  const isSelected = selectedDay === day;

                  let cellStyle = "bg-slate-50/50 hover:bg-[#652d90]/5 border-slate-100/50 text-slate-700";
                  let eventMarker = null;

                  if (hasEvent) {
                    if (hasEvent.type === 'holiday') {
                      cellStyle = "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100/40";
                      eventMarker = <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />;
                    } else if (hasEvent.type === 'exam') {
                      cellStyle = "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100/40";
                      eventMarker = <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-amber-500" />;
                    } else {
                      cellStyle = "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100/40";
                      eventMarker = <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-[#652d90]" />;
                    }
                  }

                  if (isSelected) {
                    cellStyle = "bg-[#652d90] border-[#652d90] text-white hover:bg-[#652d90]";
                    if (eventMarker) {
                      eventMarker = <div className="absolute bottom-1.5 w-1.5 h-1.5 rounded-full bg-white" />;
                    }
                  }

                  return (
                    <button
                      key={`day-${day}`}
                      onClick={() => setSelectedDay(day)}
                      className={`relative aspect-square border-2 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all cursor-pointer ${cellStyle}`}
                    >
                      <span>{day}</span>
                      {eventMarker}
                    </button>
                  );
                })}
              </div>

              {/* Legends explanation */}
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 mt-4 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-rose-100 border border-rose-200 rounded-md" />
                  <span>Public Holidays</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-amber-100 border border-amber-200 rounded-md" />
                  <span>Exams Schedules</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-purple-100 border border-purple-200 rounded-md" />
                  <span>School Events / PTMs</span>
                </div>
              </div>

            </div>

            {/* Event Details Sidebar (Right) */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col gap-5 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-slate-800 font-serif border-b border-slate-100 pb-3">
                Events Highlights
              </h3>

              {selectedDay !== null && selectedDayEvent ? (
                /* Day with event selected */
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      selectedDayEvent.type === 'holiday' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      selectedDayEvent.type === 'exam' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      'bg-purple-100 text-purple-700 border border-purple-200'
                    }`}>
                      {selectedDayEvent.type}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{activeMonth.name} {selectedDay}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg leading-snug">
                      {selectedDayEvent.title}
                    </h4>
                    <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed">
                      {selectedDayEvent.description}
                    </p>
                  </div>
                </div>
              ) : selectedDay !== null ? (
                /* Day with NO event selected */
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400 gap-2">
                  <Info className="h-8 w-8 text-slate-300" />
                  <span className="font-bold text-sm text-slate-700">{activeMonth.name} {selectedDay}</span>
                  <p className="text-xs font-light max-w-[200px]">No major academic events or holidays scheduled for this date.</p>
                </div>
              ) : (
                /* No Day selected */
                <div className="flex flex-col items-center justify-center py-10 text-center text-slate-400 gap-2">
                  <Info className="h-8 w-8 text-slate-300" />
                  <span className="font-semibold text-xs">Select a Date</span>
                  <p className="text-xs font-light max-w-[200px]">Click on any highlighted day in the calendar to view event details.</p>
                </div>
              )}

              {/* Quick Monthly summary stats */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Month Summary</span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-black text-[#652d90] text-lg block leading-none">
                      {activeMonthEvents.filter(e => e.type === 'holiday').length}
                    </span>
                    <span className="text-slate-400 font-semibold mt-1 block">Holidays</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-black text-[#652d90] text-lg block leading-none">
                      {activeMonthEvents.filter(e => e.type !== 'holiday').length}
                    </span>
                    <span className="text-slate-400 font-semibold mt-1 block">Events</span>
                  </div>
                </div>
              </div>

            </div>

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
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-left flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-2.5 w-full bg-gradient-to-r from-[#652d90] to-[#ffdd57]" />

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

            <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[50vh] text-slate-600 font-light text-sm sm:text-base leading-relaxed flex flex-col gap-6">
              <p className="whitespace-pre-wrap">{selectedNotice.fullContent || selectedNotice.desc}</p>
              
              {selectedNotice.author && (
                <div className="flex flex-col border-t border-slate-100 pt-5 mt-2 self-start font-sans">
                  <span className="font-semibold text-slate-800">{selectedNotice.author}</span>
                  <span className="text-xs text-slate-400">Dhungesanghu Boarding School</span>
                </div>
              )}
            </div>

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
