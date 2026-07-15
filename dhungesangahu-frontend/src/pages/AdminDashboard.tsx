import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Plus, 
  Trash2, 
  Edit,
  Megaphone, 
  Calendar, 
  Inbox, 
  User, 
  CheckCircle, 
  X, 
  Loader2, 
  AlertCircle, 
  ExternalLink 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getNotices, 
  getCalendarEvents, 
  getContactMessages, 
  createNotice, 
  deleteNotice, 
  updateNotice,
  createCalendarEvent, 
  deleteCalendarEvent, 
  updateCalendarEvent,
  deleteContactMessage,
  type Notice,
  type CalendarEvent,
  type ContactMessage 
} from '../api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notices' | 'calendar' | 'inbox'>('notices');
  const [adminUser, setAdminUser] = useState('Admin');
  
  // Data States
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // UX States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Modals state
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // New Form Data states
  const [newNotice, setNewNotice] = useState({
    title: '',
    desc: '',
    fullContent: '',
    category: 'admin' as 'exams' | 'events' | 'admin',
    author: 'Administration'
  });

  const [newEvent, setNewEvent] = useState({
    monthName: 'Baishakh',
    day: 1,
    type: 'activity' as 'holiday' | 'exam' | 'meeting' | 'activity',
    title: '',
    description: ''
  });

  // Verify authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('admin_user');
    if (!token) {
      navigate('/admin/login', { replace: true });
    } else {
      setAdminUser(user || 'Admin');
      loadAllData();
    }
  }, [navigate]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [nList, eList, mList] = await Promise.all([
        getNotices(),
        getCalendarEvents(),
        getContactMessages()
      ]);
      setNotices(nList);
      setEvents(eList);
      setMessages(mList);
    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError('Could not load data. Ensure the database server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login', { replace: true });
  };

  // Alert message controller
  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // NOTICE HANDLERS
  const handleCreateNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const monthNamesShort = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const shortMonth = monthNamesShort[today.getMonth()];
    const dayStr = String(today.getDate());

    let categoryLabel = 'Administrative';
    if (newNotice.category === 'exams') categoryLabel = 'Exams & Academics';
    if (newNotice.category === 'events') categoryLabel = 'Events & Holiday';

    try {
      setIsSubmitting(true);
      if (editingNoticeId) {
        // Edit Mode
        const updated = await updateNotice(editingNoticeId, {
          date: notices.find(n => n.id === editingNoticeId)?.date || formattedDate,
          month: notices.find(n => n.id === editingNoticeId)?.month || shortMonth,
          day: notices.find(n => n.id === editingNoticeId)?.day || dayStr,
          category: newNotice.category,
          categoryLabel,
          title: newNotice.title,
          desc: newNotice.desc,
          fullContent: newNotice.fullContent,
          author: newNotice.author
        });
        setNotices(notices.map(item => item.id === editingNoticeId ? updated : item));
        setEditingNoticeId(null);
        setShowNoticeModal(false);
        setNewNotice({ title: '', desc: '', fullContent: '', category: 'admin', author: 'Administration' });
        triggerSuccess('Notice updated successfully!');
      } else {
        // Create Mode
        const created = await createNotice({
          date: formattedDate,
          month: shortMonth,
          day: dayStr,
          category: newNotice.category,
          categoryLabel,
          title: newNotice.title,
          desc: newNotice.desc,
          fullContent: newNotice.fullContent,
          author: newNotice.author
        });
        setNotices([created, ...notices]);
        setShowNoticeModal(false);
        setNewNotice({ title: '', desc: '', fullContent: '', category: 'admin', author: 'Administration' });
        triggerSuccess('Notice announced successfully!');
      }
    } catch (err) {
      console.error('Failed to save notice:', err);
      alert('Error saving notice.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNoticeId(notice.id);
    setNewNotice({
      title: notice.title,
      desc: notice.desc,
      fullContent: notice.fullContent || '',
      category: notice.category,
      author: notice.author || 'Administration'
    });
    setShowNoticeModal(true);
  };

  const handleDeleteNotice = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await deleteNotice(id);
      setNotices(notices.filter(item => item.id !== id));
      triggerSuccess('Notice deleted successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting notice.');
    }
  };

  // CALENDAR HANDLERS
  const handleCreateEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingEventId) {
        // Edit Mode
        const updated = await updateCalendarEvent(editingEventId, newEvent);
        setEvents(events.map(item => item.id === editingEventId ? updated : item).sort((a, b) => a.day - b.day));
        setEditingEventId(null);
        setShowEventModal(false);
        setNewEvent({ monthName: 'Baishakh', day: 1, type: 'activity', title: '', description: '' });
        triggerSuccess('Academic event updated successfully!');
      } else {
        // Create Mode
        const created = await createCalendarEvent(newEvent);
        setEvents([...events, created].sort((a, b) => a.day - b.day));
        setShowEventModal(false);
        setNewEvent({ monthName: 'Baishakh', day: 1, type: 'activity', title: '', description: '' });
        triggerSuccess('Academic event scheduled successfully!');
      }
    } catch (err) {
      console.error('Failed to save event:', err);
      alert('Error saving event.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEventId(event.id);
    setNewEvent({
      monthName: event.monthName,
      day: event.day,
      type: event.type,
      title: event.title,
      description: event.description
    });
    setShowEventModal(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this calendar event?')) return;
    try {
      await deleteCalendarEvent(id);
      setEvents(events.filter(item => item.id !== id));
      triggerSuccess('Calendar event removed successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting calendar event.');
    }
  };

  // INBOX HANDLERS
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter(item => item.id !== id));
      triggerSuccess('Message deleted from inbox.');
    } catch (err) {
      console.error(err);
      alert('Error deleting message.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* 1. Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[#652d90] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-600/10">
            D
          </div>
          <div>
            <h1 className="text-md sm:text-lg font-black text-slate-800 tracking-tight leading-none">Dhungesanghu School</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600 select-none">
            <User className="h-4 w-4 text-[#652d90]" />
            Logged in as: <span className="text-[#652d90] font-black">{adminUser}</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-xs text-[#652d90] hover:underline font-bold"
          >
            Go to Site <ExternalLink className="h-3 w-3" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all border border-rose-200/40 active:scale-95 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">

        {/* Success / Error Banners */}
        <AnimatePresence>
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4.5 rounded-2xl shadow-sm text-sm"
            >
              <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-4.5 rounded-2xl shadow-sm text-sm"
            >
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              <span className="font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2.5 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'notices'
                ? 'bg-[#652d90] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Megaphone className="h-4 w-4" />
            Notices Manager ({notices.length})
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-[#652d90] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Calendar Events ({events.length})
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-[#652d90] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Inbox className="h-4 w-4" />
            Inbox Inquiries ({messages.length})
          </button>
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-32 gap-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <Loader2 className="h-10 w-10 text-[#652d90] animate-spin" />
            <p className="text-slate-500 font-light text-sm">Syncing admin dashboard databases...</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-6">

            {/* TAB 1: NOTICES VIEW */}
            {activeTab === 'notices' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-left">
                    <h2 className="text-lg font-black text-slate-800 font-serif">Notice Board Announcements</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">Manage live bulletins posted on the website notice board.</p>
                  </div>
                  <button
                    onClick={() => setShowNoticeModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    New Notice
                  </button>
                </div>

                {/* Notices List */}
                <div className="grid grid-cols-1 gap-4">
                  {notices.length === 0 ? (
                    <div className="bg-white border border-slate-200/60 p-16 rounded-3xl text-center text-slate-400 font-light">
                      No notices announcement found. Click "New Notice" to publish.
                    </div>
                  ) : (
                    notices.map((notice) => (
                      <div 
                        key={notice.id}
                        className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4 text-left"
                      >
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center justify-center bg-[#652d90]/10 text-[#652d90] p-3.5 rounded-xl text-center min-w-[70px] select-none h-fit shrink-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700">{notice.month}</span>
                            <span className="text-xl font-black font-serif leading-none mt-0.5">{notice.day}</span>
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                              <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
                                notice.category === 'exams' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                notice.category === 'events' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}>
                                {notice.categoryLabel}
                              </span>
                              <span className="text-slate-400 text-xs font-light">Posted: {notice.date}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-md sm:text-lg leading-tight">{notice.title}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-light mt-1 max-w-3xl leading-relaxed">{notice.desc}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleEditNotice(notice)}
                            className="p-3.5 bg-purple-50 text-[#652d90] hover:bg-purple-100 rounded-xl transition-all border border-purple-200/30 cursor-pointer"
                            title="Edit Notice"
                          >
                            <Edit className="h-4.5 w-4.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteNotice(notice.id)}
                            className="p-3.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all border border-rose-200/30 cursor-pointer shrink-0"
                            title="Delete Notice"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: CALENDAR VIEW */}
            {activeTab === 'calendar' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-left">
                    <h2 className="text-lg font-black text-slate-800 font-serif">Academic Event Calendar</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">Manage the school schedule events and monthly holidays.</p>
                  </div>
                  <button
                    onClick={() => setShowEventModal(true)}
                    className="flex items-center gap-2 px-5 py-3 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    Schedule Event
                  </button>
                </div>

                {/* Events list */}
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm text-left">
                  {events.length === 0 ? (
                    <div className="py-16 text-center text-slate-400 font-light">
                      No calendar events found. Click "Schedule Event" to add.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs sm:text-sm font-light border-collapse text-left">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="pb-3 pl-4">Month</th>
                            <th className="pb-3">Day</th>
                            <th className="pb-3">Event Type</th>
                            <th className="pb-3">Title</th>
                            <th className="pb-3">Description</th>
                            <th className="pb-3 text-right pr-4">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {events.map((e) => (
                            <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-4.5 pl-4 font-bold text-slate-800">{e.monthName}</td>
                              <td className="py-4.5 font-bold font-serif text-[#652d90]">{e.day}</td>
                              <td className="py-4.5">
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                  e.type === 'holiday' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                                  e.type === 'exam' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                  e.type === 'meeting' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                  'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}>
                                  {e.type.toUpperCase()}
                                </span>
                              </td>
                              <td className="py-4.5 font-semibold text-slate-800">{e.title}</td>
                              <td className="py-4.5 text-slate-500 max-w-xs truncate">{e.description}</td>
                              <td className="py-4.5 text-right pr-4">
                                <div className="flex justify-end gap-1.5">
                                  <button
                                    onClick={() => handleEditEvent(e)}
                                    className="text-[#652d90] hover:text-purple-900 p-1.5 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Event"
                                  >
                                    <Edit className="h-4.5 w-4.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEvent(e.id)}
                                    className="text-rose-600 hover:text-rose-900 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Event"
                                  >
                                    <Trash2 className="h-4.5 w-4.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: INBOX INQUIRIES VIEW */}
            {activeTab === 'inbox' && (
              <div className="flex flex-col gap-6">
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-left">
                  <h2 className="text-lg font-black text-slate-800 font-serif">Inbox Inquiries Box</h2>
                  <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">Read and manage contact messages submitted by parents, visitors, or students.</p>
                </div>

                {/* Inbox Messages list */}
                <div className="grid grid-cols-1 gap-4">
                  {messages.length === 0 ? (
                    <div className="bg-white border border-slate-200/60 p-16 rounded-3xl text-center text-slate-400 font-light">
                      Your inbox box is clean! No messages submitted.
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between gap-5 text-left items-start relative hover:border-slate-300 transition-colors"
                      >
                        <div className="flex-1 flex flex-col gap-2.5">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-bold text-slate-800 text-md sm:text-base">{msg.name}</span>
                            <a href={`mailto:${msg.email}`} className="text-xs text-[#652d90] hover:underline font-light">{msg.email}</a>
                            <span className="text-slate-400 text-[10px] sm:text-xs">• Submitted on {new Date(msg.createdAt).toLocaleString()}</span>
                          </div>

                          {msg.subject && (
                            <div className="text-xs font-bold text-slate-700 bg-slate-100/60 px-3 py-1 rounded-lg w-fit">
                              Subject: <span className="font-semibold text-slate-500">{msg.subject}</span>
                            </div>
                          )}

                          <div className="text-xs sm:text-sm font-light text-slate-600 bg-slate-50/60 p-4.5 rounded-2xl border border-slate-100/80 leading-relaxed font-sans max-w-4xl italic">
                            "{msg.message}"
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-3.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all border border-rose-200/30 cursor-pointer shrink-0"
                          title="Delete inquiry"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* 2. NOTICE MODAL FORM */}
      <AnimatePresence>
        {showNoticeModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-xl p-6 sm:p-7 relative z-50 text-left"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-lg font-black text-slate-800 font-serif">{editingNoticeId ? 'Edit Board Notice' : 'Publish Board Notice'}</h3>
                <button 
                  onClick={() => {
                    setShowNoticeModal(false);
                    setEditingNoticeId(null);
                    setNewNotice({ title: '', desc: '', fullContent: '', category: 'admin', author: 'Administration' });
                  }} 
                  className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateNoticeSubmit} className="flex flex-col gap-4">
                
                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Notice Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter notice title..." 
                    value={newNotice.title}
                    onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Category & Author */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Board Category</label>
                    <select
                      value={newNotice.category}
                      onChange={e => setNewNotice({...newNotice, category: e.target.value as any})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="admin">Administrative</option>
                      <option value="exams">Exams & Academics</option>
                      <option value="events">Events & Holiday</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Publisher Author</label>
                    <input 
                      type="text" 
                      placeholder="Examination Controller..." 
                      value={newNotice.author}
                      onChange={e => setNewNotice({...newNotice, author: e.target.value})}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Brief Summary */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Brief Summary Description</label>
                  <input 
                    type="text" 
                    placeholder="Short summary preview shown on notice card..." 
                    value={newNotice.desc}
                    onChange={e => setNewNotice({...newNotice, desc: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Full Description content */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Full Detailed Notice Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="Provide full notice details. Shown in detail view dialog..." 
                    value={newNotice.fullContent}
                    onChange={e => setNewNotice({...newNotice, fullContent: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light resize-none focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNoticeModal(false);
                      setEditingNoticeId(null);
                      setNewNotice({ title: '', desc: '', fullContent: '', category: 'admin', author: 'Administration' });
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#652d90] hover:bg-[#4b1f6b] disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingNoticeId ? 'Save Changes' : 'Publish Announcement'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CALENDAR MODAL FORM */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-xl p-6 sm:p-7 relative z-50 text-left"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-lg font-black text-slate-800 font-serif">{editingEventId ? 'Edit Scheduled Event' : 'Schedule Academic Event'}</h3>
                <button 
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEventId(null);
                    setNewEvent({ monthName: 'Baishakh', day: 1, type: 'activity', title: '', description: '' });
                  }} 
                  className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateEventSubmit} className="flex flex-col gap-4">
                
                {/* Event Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Event Title</label>
                  <input 
                    type="text" 
                    placeholder="Science Fair / Final Exams..." 
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Month Name, Day Number, Type */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Month selection */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Nepali Month</label>
                    <select
                      value={newEvent.monthName}
                      onChange={e => setNewEvent({...newEvent, monthName: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="Baishakh">Baishakh</option>
                      <option value="Jestha">Jestha</option>
                      <option value="Ashad">Ashad</option>
                      <option value="Shrawan">Shrawan</option>
                      <option value="Bhadra">Bhadra</option>
                      <option value="Ashoj">Ashoj</option>
                    </select>
                  </div>

                  {/* Day selection */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Day Number</label>
                    <input 
                      type="number" 
                      min={1}
                      max={32}
                      value={newEvent.day}
                      onChange={e => setNewEvent({...newEvent, day: Number(e.target.value)})}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Event Type */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Event Category Type</label>
                    <select
                      value={newEvent.type}
                      onChange={e => setNewEvent({...newEvent, type: e.target.value as any})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="activity">Activity / Sports</option>
                      <option value="holiday">Holiday</option>
                      <option value="exam">Examination</option>
                      <option value="meeting">PTM Meeting</option>
                    </select>
                  </div>
                </div>

                {/* Event Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Detailed Description</label>
                  <textarea 
                    rows={4} 
                    placeholder="Provide details about location, timings, and eligibility..." 
                    value={newEvent.description}
                    onChange={e => setNewEvent({...newEvent, description: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light resize-none focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setEditingEventId(null);
                      setNewEvent({ monthName: 'Baishakh', day: 1, type: 'activity', title: '', description: '' });
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#652d90] hover:bg-[#4b1f6b] disabled:bg-slate-300 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingEventId ? 'Save Changes' : 'Schedule Event'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
