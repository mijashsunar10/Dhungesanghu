import React, { useState, useEffect } from 'react';
import { Search, Calendar, Printer, X, ChevronLeft, ChevronRight, Info, Loader2, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBanner } from '../components/PageBanner';
import { getNotices, getCalendarEvents, type Notice, type CalendarEvent } from '../api';

const HighlightText: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-amber-100 text-amber-950 font-bold px-0.5 rounded">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};

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
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  // Calendar States
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(3); // Defaults to Shrawan (July-August)
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  const [notices, setNotices] = useState<Notice[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const [fetchedNotices, fetchedEvents] = await Promise.all([
          getNotices(),
          getCalendarEvents()
        ]);
        setNotices(fetchedNotices);
        setCalendarEvents(fetchedEvents);
      } catch (err: any) {
        console.error('Failed to load bulletins data:', err);
        setError('Could not connect to the school database server. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const calendarMonths: MonthData[] = [
    {
      name: "Baishakh",
      englishPeriod: "April - May",
      daysCount: 31,
      startOffset: 2, // Tuesday
      events: calendarEvents.filter(e => e.monthName === 'Baishakh')
    },
    {
      name: "Jestha",
      englishPeriod: "May - June",
      daysCount: 32,
      startOffset: 5, // Friday
      events: calendarEvents.filter(e => e.monthName === 'Jestha')
    },
    {
      name: "Ashad",
      englishPeriod: "June - July",
      daysCount: 31,
      startOffset: 1, // Monday
      events: calendarEvents.filter(e => e.monthName === 'Ashad')
    },
    {
      name: "Shrawan",
      englishPeriod: "July - August",
      daysCount: 32,
      startOffset: 4, // Thursday
      events: calendarEvents.filter(e => e.monthName === 'Shrawan')
    },
    {
      name: "Bhadra",
      englishPeriod: "August - September",
      daysCount: 31,
      startOffset: 0, // Sunday
      events: calendarEvents.filter(e => e.monthName === 'Bhadra')
    },
    {
      name: "Ashoj",
      englishPeriod: "September - October",
      daysCount: 30,
      startOffset: 3, // Wednesday
      events: calendarEvents.filter(e => e.monthName === 'Ashoj')
    }
  ];


  const noticeCategories = [
    { id: 'all', label: 'All Notices' },
    { id: 'exams', label: 'Exams & Academics' },
    { id: 'events', label: 'Events & Holidays' },
    { id: 'admin', label: 'Administrative' }
  ];

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return notices.length;
    return notices.filter(n => n.category === categoryId).length;
  };

  // Notice Filtering
  const filteredNotices = notices.filter(notice => {
    const matchesCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (notice.fullContent && notice.fullContent.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
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
      <PageBanner 
        title="News & Calendar" 
        subtitle="Stay informed with our school notice board announcements and interactive academic event calendars." 
        badge="Bulletins & Dates"
      />

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

        {/* VIEW 1: NOTICES BOARD VS CALENDAR TAB SWITCH ANIMATION */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
            <Loader2 className="h-10 w-10 text-[#652d90] animate-spin" />
            <p className="text-slate-500 font-light text-sm">Fetching school updates...</p>
          </div>
        ) : error ? (
          <div className="bg-rose-50/50 border border-rose-200/60 rounded-3xl p-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="p-3.5 bg-rose-100/60 text-rose-600 rounded-full">
              <Info className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-rose-900 font-serif">Connection Issue</h3>
            <p className="text-rose-700 text-sm font-light leading-relaxed max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 bg-[#652d90] hover:bg-[#4b1f6b] text-white px-7 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Try Reconnecting
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
          {activeView === 'notices' ? (
            <motion.div
              key="notices"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col gap-8 w-full"
            >
              {/* Search, Filters, and Sorting Controls */}
              <div className="flex flex-col gap-4 w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center w-full">
                  {/* Category Pills with counts */}
                  <div className="flex flex-wrap gap-2">
                    {noticeCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ease-in-out active:scale-95 cursor-pointer flex items-center gap-2 ${
                          activeCategory === cat.id
                            ? 'bg-[#652d90] text-white shadow-md'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                          activeCategory === cat.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-slate-200/60 text-slate-500'
                        }`}>
                          {getCategoryCount(cat.id)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Search and Sort controls */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {/* Search Field */}
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search bulletins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Sorting dropdown */}
                    <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                      <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent border-0 text-slate-600 text-xs font-bold focus:outline-none cursor-pointer pr-1"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="alphabetical">Title (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Active Filters Summary row */}
                {(activeCategory !== 'all' || searchQuery || sortBy !== 'newest') && (
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-400">Active Filters:</span>
                      {activeCategory !== 'all' && (
                        <span className="px-2.5 py-1 bg-purple-50 text-[#652d90] rounded-lg font-bold border border-purple-100 flex items-center gap-1">
                          Category: {noticeCategories.find(c => c.id === activeCategory)?.label}
                          <button onClick={() => setActiveCategory('all')} className="hover:text-purple-900 ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg font-bold border border-amber-100 flex items-center gap-1">
                          Query: "{searchQuery}"
                          <button onClick={() => setSearchQuery('')} className="hover:text-amber-900 ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                      {sortBy !== 'newest' && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-bold border border-slate-200 flex items-center gap-1">
                          Sort: {sortBy === 'oldest' ? 'Oldest First' : 'A-Z'}
                          <button onClick={() => setSortBy('newest')} className="hover:text-slate-900 ml-1">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setSearchQuery('');
                        setSortBy('newest');
                      }}
                      className="text-xs text-slate-400 hover:text-[#652d90] transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Filter Stats */}
              <div className="text-slate-400 text-xs sm:text-sm font-light text-left pl-1 -mt-3 flex items-center justify-between">
                <span>
                  Showing <strong>{sortedNotices.length}</strong> out of <strong>{notices.length}</strong> notices
                </span>
              </div>

              {/* List */}
              {sortedNotices.length > 0 ? (
                <motion.div layout className="flex flex-col gap-5 text-left">
                  <AnimatePresence mode="popLayout">
                    {sortedNotices.map((notice) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
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
                            <HighlightText text={notice.title} highlight={searchQuery} />
                          </h3>
                          <p className="text-slate-500 text-sm mt-1 font-light leading-relaxed">
                            <HighlightText text={notice.desc} highlight={searchQuery} />
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-16 text-center border border-slate-200/60 shadow-sm flex flex-col items-center justify-center gap-4"
                >
                  <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                    <Search className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-serif">No notices match your filters</h3>
                  <p className="text-slate-400 text-sm font-light max-w-sm">We couldn't find any notices. Try clearing your search query or choosing another category.</p>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                      setSortBy('newest');
                    }}
                    className="mt-2 bg-[#652d90] hover:bg-[#4b1f6b] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full text-left"
            >
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
                      className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors duration-300 ease-in-out cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={nextMonth}
                      className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors duration-300 ease-in-out cursor-pointer"
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
                        className={`relative aspect-square border-2 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ease-in-out cursor-pointer ${cellStyle}`}
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

            </motion.div>
          )}
        </AnimatePresence>
        )}

      </div>

      {/* NOTICE DETAILED DIALOG MODAL */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
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

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
