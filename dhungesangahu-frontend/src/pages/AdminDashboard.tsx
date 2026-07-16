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
  ExternalLink,
  Wrench,
  Folder,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Users,
  Award,
  Sparkles,
  Clock,
  Shield,
  BookOpen,
  HelpCircle,
  Activity,
  FileText,
  BarChart3
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
  getServices,
  createService,
  deleteService,
  updateService,
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryCategories,
  createGalleryCategory,
  deleteGalleryCategory,
  type Notice,
  type CalendarEvent,
  type ContactMessage,
  type Service,
  type GalleryImage,
  type GalleryCategory
} from '../api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'notices' | 'calendar' | 'inbox' | 'services' | 'gallery'>('overview');
  const [adminUser, setAdminUser] = useState('Admin');
  
  // Data States
  const [notices, setNotices] = useState<Notice[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<GalleryCategory[]>([]);
  
  // UX States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Modals state
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const [newService, setNewService] = useState({
    title: '',
    image: '',
    desc: ''
  });

  const [newGalleryImage, setNewGalleryImage] = useState({
    url: '',
    category: '',
    caption: ''
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('');

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
      const [nList, eList, mList, sList, gList, gcList] = await Promise.all([
        getNotices(),
        getCalendarEvents(),
        getContactMessages(),
        getServices(),
        getGalleryImages(),
        getGalleryCategories()
      ]);
      setNotices(nList);
      setEvents(eList);
      setMessages(mList);
      setServices(sList);
      setGalleryImages(gList);
      setGalleryCategories(gcList);
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

  // SERVICE HANDLERS
  const handleCreateServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingServiceId) {
        // Edit Mode
        const updated = await updateService(editingServiceId, newService);
        setServices(services.map(item => item.id === editingServiceId ? updated : item));
        setEditingServiceId(null);
        setShowServiceModal(false);
        setNewService({ title: '', image: '', desc: '' });
        triggerSuccess('Service updated successfully!');
      } else {
        // Create Mode
        const created = await createService(newService);
        setServices([...services, created]);
        setShowServiceModal(false);
        setNewService({ title: '', image: '', desc: '' });
        triggerSuccess('New service added successfully!');
      }
    } catch (err) {
      console.error('Failed to save service:', err);
      alert('Error saving service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('File size exceeds 3MB. Please select a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setNewService(prev => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.onerror = () => {
      alert('Error reading local file.');
    };
    reader.readAsDataURL(file);
  };

  const handleEditService = (service: Service) => {
    setEditingServiceId(service.id);
    setNewService({
      title: service.title,
      image: service.image,
      desc: service.desc
    });
    if (service.image && service.image.startsWith('data:image')) {
      setImageInputMode('upload');
    } else {
      setImageInputMode('url');
    }
    setShowServiceModal(true);
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(id);
      setServices(services.filter(item => item.id !== id));
      triggerSuccess('Service removed successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting service.');
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

  // GALLERY HANDLERS
  const handleCreateGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (editingGalleryId) {
        // Edit Mode
        const updated = await updateGalleryImage(editingGalleryId, newGalleryImage);
        setGalleryImages(galleryImages.map(item => item.id === editingGalleryId ? updated : item));
        setEditingGalleryId(null);
        setShowGalleryModal(false);
        setNewGalleryImage({ url: '', category: 'classroom', caption: '' });
        triggerSuccess('Gallery photo updated successfully!');
      } else {
        // Create Mode
        const created = await createGalleryImage(newGalleryImage);
        setGalleryImages([...galleryImages, created]);
        setShowGalleryModal(false);
        setNewGalleryImage({ url: '', category: 'classroom', caption: '' });
        triggerSuccess('New gallery photo uploaded successfully!');
      }
    } catch (err) {
      console.error('Failed to save gallery image:', err);
      alert('Error saving gallery image.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGalleryImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('File size exceeds 3MB. Please select a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setNewGalleryImage(prev => ({ ...prev, url: reader.result as string }));
      }
    };
    reader.onerror = () => {
      alert('Error reading local file.');
    };
    reader.readAsDataURL(file);
  };

  const handleEditGallery = (img: GalleryImage) => {
    setEditingGalleryId(img.id);
    setNewGalleryImage({
      url: img.url,
      category: img.category,
      caption: img.caption
    });
    if (img.url && img.url.startsWith('data:image')) {
      setImageInputMode('upload');
    } else {
      setImageInputMode('url');
    }
    setShowGalleryModal(true);
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery image?')) return;
    try {
      await deleteGalleryImage(id);
      setGalleryImages(galleryImages.filter(item => item.id !== id));
      triggerSuccess('Gallery image removed successfully.');
    } catch (err) {
      console.error(err);
      alert('Error deleting gallery image.');
    }
  };

  const handleCreateCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const categoryId = newCategoryId.trim() 
      ? newCategoryId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '')
      : newCategoryName.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    if (!categoryId) {
      alert('Invalid Category ID.');
      return;
    }

    try {
      setIsSubmitting(true);
      const created = await createGalleryCategory({ categoryId, name: newCategoryName });
      setGalleryCategories([...galleryCategories, created]);
      setNewCategoryName('');
      setNewCategoryId('');
      setShowCategoryModal(false);
      triggerSuccess('New gallery category added successfully!');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Error saving category.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (cat: GalleryCategory) => {
    if (['classroom', 'activities', 'events'].includes(cat.categoryId)) {
      alert('Default categories cannot be deleted.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete category "${cat.name}"? Gallery images using this category will remain, but the category filter will be removed.`)) return;

    try {
      await deleteGalleryCategory(cat.id);
      setGalleryCategories(galleryCategories.filter(item => item.id !== cat.id));
      triggerSuccess('Gallery category deleted.');
    } catch (err) {
      console.error(err);
      alert('Error deleting category.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 relative overflow-hidden">
      
      {/* Mobile Sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden cursor-pointer"
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-55 w-72 bg-slate-900 text-slate-300 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out flex flex-col border-r border-slate-800 h-screen shrink-0`}>
        {/* Sidebar Branding Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#8c52ff] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-purple-900/50">
              D
            </div>
            <div className="text-left">
              <h1 className="text-sm font-black text-white tracking-tight leading-none">Dhungesanghu</h1>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mt-1">Admin Panel</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-7 scrollbar-thin">
          <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-left">Core Modules</h3>
            <nav className="space-y-1">
              <button
                onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'overview'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
                Overview
              </button>
              
              <button
                onClick={() => { setActiveTab('notices'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'notices'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Megaphone className="h-4.5 w-4.5" />
                  Notices Board
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {notices.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('calendar'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'calendar'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Calendar className="h-4.5 w-4.5" />
                  Calendar Events
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {events.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('services'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'services'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Wrench className="h-4.5 w-4.5" />
                  Services & Facilities
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {services.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('gallery'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'gallery'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <ImageIcon className="h-4.5 w-4.5" />
                  Photo Gallery
                </span>
                <span className="bg-slate-800 text-slate-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {galleryImages.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('inbox'); setIsMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer text-left ${
                  activeTab === 'inbox'
                    ? 'bg-[#652d90] text-white shadow-md shadow-purple-900/30'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Inbox className="h-4.5 w-4.5" />
                  Inbox Inquiries
                </span>
                <span className="bg-rose-950 text-rose-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              </button>
            </nav>
          </div>

          <div>
            <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-left">Other Modules Plan</h3>
            <div className="space-y-1.5 text-left">
              {[
                { name: 'School Team & Officials', icon: Users, status: 'Active (Next)' },
                { name: 'Home Hero Slides', icon: Sparkles, status: 'Planned' },
                { name: 'Key Stats Counter', icon: BarChart3, status: 'Planned' },
                { name: 'Parent Testimonials', icon: HelpCircle, status: 'Planned' },
                { name: 'Principal\'s Quote', icon: User, status: 'Planned' },
                { name: 'Alumni Success Network', icon: Award, status: 'Planned' },
                { name: 'Milestones Timeline', icon: Clock, status: 'Planned' },
                { name: 'School Rules & Policies', icon: Shield, status: 'Planned' },
                { name: 'Academic Programs', icon: BookOpen, status: 'Planned' },
                { name: 'Admission Journey Steps', icon: FileText, status: 'Planned' },
                { name: 'Admission FAQs', icon: HelpCircle, status: 'Planned' },
                { name: 'Trivia Game Questions', icon: Activity, status: 'Planned' }
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-bold text-slate-500 bg-slate-800/20 border border-slate-800/10">
                  <span className="flex items-center gap-3">
                    <m.icon className="h-4.5 w-4.5 shrink-0 text-slate-600" />
                    <span className="truncate max-w-[130px]">{m.name}</span>
                  </span>
                  <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded shrink-0 ${m.status === 'Active (Next)' ? 'bg-purple-950 text-purple-300' : 'bg-slate-800 text-slate-500'}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Bottom Profile */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 border border-slate-700 font-extrabold">
              {adminUser[0]?.toUpperCase() || 'A'}
            </div>
            <div className="truncate text-left">
              <p className="text-xs font-bold text-white leading-none">{adminUser}</p>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">Dhungesanghu Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-950/40 text-rose-400 hover:bg-rose-950/60 rounded-xl text-xs font-bold transition-all border border-rose-900/30 active:scale-95 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Log Out Session
          </button>
        </div>
      </aside>

      {/* Main Workspace Right */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            
            <div className="text-left">
              <h1 className="text-md sm:text-lg font-black text-slate-800 tracking-tight leading-none uppercase">
                {activeTab === 'overview' ? 'Dashboard Overview' : `${activeTab} manager`}
              </h1>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                <span>Portal</span>
                <span>/</span>
                <span className="text-[#652d90] font-black">{activeTab}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left">
            <button
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-1.5 text-xs text-[#652d90] hover:underline font-bold px-3 py-1.5 hover:bg-purple-50 rounded-lg transition-all"
            >
              Go to Site <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </header>

        {/* Content area scrollable */}
        <main className="flex-1 p-6 overflow-y-auto">
          
          {/* Success / Error Banners */}
          <AnimatePresence>
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4.5 rounded-2xl shadow-sm text-sm mb-6 text-left"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <span className="font-medium">{successMsg}</span>
              </motion.div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-800 p-4.5 rounded-2xl shadow-sm text-sm mb-6 text-left"
              >
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
                <span className="font-medium">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-32 gap-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <Loader2 className="h-10 w-10 text-[#652d90] animate-spin" />
              <p className="text-slate-500 font-light text-sm">Syncing admin dashboard databases...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-6">

              {/* TAB 0: OVERVIEW/DASHBOARD VIEW */}
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-6">
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left flex items-center gap-4 hover:shadow-md transition-all">
                      <div className="h-12 w-12 bg-purple-50 text-[#652d90] rounded-xl flex items-center justify-center shrink-0">
                        <Megaphone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Notices</p>
                        <h4 className="text-2xl font-black text-slate-800 leading-none mt-1">{notices.length}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">Announcements</p>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left flex items-center gap-4 hover:shadow-md transition-all">
                      <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Events</p>
                        <h4 className="text-2xl font-black text-slate-800 leading-none mt-1">{events.length}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">Baishakh-Baishakh</p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left flex items-center gap-4 hover:shadow-md transition-all">
                      <div className="h-12 w-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                        <Wrench className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Services</p>
                        <h4 className="text-2xl font-black text-slate-800 leading-none mt-1">{services.length}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">Offered Facilities</p>
                      </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left flex items-center gap-4 hover:shadow-md transition-all">
                      <div className="h-12 w-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inbox</p>
                        <h4 className="text-2xl font-black text-slate-800 leading-none mt-1">{messages.length}</h4>
                        <p className="text-[10px] text-rose-500 font-bold mt-1">Pending Inquiries</p>
                      </div>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm text-left flex items-center gap-4 hover:shadow-md transition-all">
                      <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gallery</p>
                        <h4 className="text-2xl font-black text-slate-800 leading-none mt-1">{galleryImages.length}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1">{galleryCategories.length} Categories</p>
                      </div>
                    </div>
                  </div>

                  {/* Analytical Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart Card 1 */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm text-left">
                      <div className="mb-4">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">System Database Volumes</h3>
                        <p className="text-slate-400 text-xs font-light">Distribution of different components across databases</p>
                      </div>
                      <div className="h-64 flex flex-col justify-center items-center">
                        {/* Responsive SVG Chart */}
                        <svg viewBox="0 0 400 200" className="w-full h-full max-h-[180px]">
                          {/* Define gradients for dynamic styling */}
                          <defs>
                            <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#8c52ff" />
                              <stop offset="100%" stopColor="#652d90" />
                            </linearGradient>
                            <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#1d4ed8" />
                            </linearGradient>
                            <linearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#0d9488" />
                              <stop offset="100%" stopColor="#0f766e" />
                            </linearGradient>
                            <linearGradient id="roseGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#f43f5e" />
                              <stop offset="100%" stopColor="#be123c" />
                            </linearGradient>
                            <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#f59e0b" />
                              <stop offset="100%" stopColor="#b45309" />
                            </linearGradient>
                          </defs>

                          {/* Chart Bars */}
                          {(() => {
                            const items = [
                              { label: 'Notices', count: notices.length, grad: 'url(#purpleGrad)' },
                              { label: 'Events', count: events.length, grad: 'url(#blueGrad)' },
                              { label: 'Services', count: services.length, grad: 'url(#tealGrad)' },
                              { label: 'Inbox', count: messages.length, grad: 'url(#roseGrad)' },
                              { label: 'Gallery', count: galleryImages.length, grad: 'url(#amberGrad)' }
                            ];
                            const maxCount = Math.max(...items.map(i => i.count), 5);
                            return items.map((item, idx) => {
                              const barWidth = (item.count / maxCount) * 250;
                              const yPos = 20 + idx * 35;
                              return (
                                <g key={idx}>
                                  <text x="10" y={yPos + 12} fill="#64748b" className="text-[10px] font-bold uppercase">{item.label}</text>
                                  <rect x="90" y={yPos} width="250" height="18" rx="6" fill="#f1f5f9" />
                                  <rect x="90" y={yPos} width={Math.max(barWidth, 8)} height="18" rx="6" fill={item.grad} />
                                  <text x={100 + barWidth} y={yPos + 13} fill="#0f172a" className="text-[10px] font-extrabold">{item.count}</text>
                                </g>
                              );
                            });
                          })()}
                        </svg>
                      </div>
                    </div>

                    {/* Chart Card 2 */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm text-left">
                      <div className="mb-4">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Notices Mix by Category</h3>
                        <p className="text-slate-400 text-xs font-light">Count of announcements distributed across active labels</p>
                      </div>
                      <div className="h-64 flex flex-col justify-center items-center">
                        <svg viewBox="0 0 400 200" className="w-full h-full max-h-[180px]">
                          {(() => {
                            const categoriesMap = notices.reduce((acc: any, cur) => {
                              const cat = cur.category || 'admin';
                              acc[cat] = (acc[cat] || 0) + 1;
                              return acc;
                            }, { academic: 0, sports: 0, exams: 0, events: 0, admin: 0 });

                            const mix = [
                              { name: 'Academic', val: categoriesMap.academic, color: '#8c52ff' },
                              { name: 'Sports', val: categoriesMap.sports, color: '#3b82f6' },
                              { name: 'Exams', val: categoriesMap.exams, color: '#f59e0b' },
                              { name: 'Events', val: categoriesMap.events, color: '#10b981' },
                              { name: 'Admin', val: categoriesMap.admin, color: '#64748b' }
                            ];
                            const maxVal = Math.max(...mix.map(m => m.val), 2);
                            return (
                              <g>
                                {mix.map((item, idx) => {
                                  const barHeight = (item.val / maxVal) * 120;
                                  const xPos = 40 + idx * 75;
                                  return (
                                    <g key={idx}>
                                      <text x={xPos + 18} y={150 - barHeight - 8} fill="#0f172a" textAnchor="middle" className="text-[10px] font-extrabold">{item.val}</text>
                                      <rect x={xPos} y="30" width="36" height="120" rx="6" fill="#f8fafc" />
                                      <rect x={xPos} y={150 - barHeight} width="36" height={Math.max(barHeight, 4)} rx="6" fill={item.color} />
                                      <text x={xPos + 18} y="170" fill="#64748b" textAnchor="middle" className="text-[9px] font-bold uppercase tracking-wider">{item.name}</text>
                                    </g>
                                  );
                                })}
                                <line x1="20" y1="150" x2="380" y2="150" stroke="#cbd5e1" strokeWidth="1.5" />
                              </g>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Grid 3: Quick Tasks & Recent Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left: Quick Actions */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm text-left flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-1">Quick Actions</h3>
                        <p className="text-slate-400 text-xs font-light mb-5">Frequently performed admin duties in one place</p>
                        
                        <div className="grid grid-cols-1 gap-2.5">
                          <button 
                            onClick={() => { setActiveTab('notices'); setShowNoticeModal(true); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-purple-50 text-[#652d90] hover:bg-purple-100 rounded-xl text-xs font-bold transition-all border border-purple-200/20 text-left cursor-pointer"
                          >
                            <Megaphone className="h-4 w-4" /> Publish New Notice
                          </button>
                          <button 
                            onClick={() => { setActiveTab('calendar'); setShowEventModal(true); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all border border-blue-200/20 text-left cursor-pointer"
                          >
                            <Calendar className="h-4 w-4" /> Schedule Calendar Event
                          </button>
                          <button 
                            onClick={() => { setActiveTab('gallery'); setShowGalleryModal(true); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl text-xs font-bold transition-all border border-amber-200/20 text-left cursor-pointer"
                          >
                            <ImageIcon className="h-4 w-4" /> Upload Gallery Photo
                          </button>
                          <button 
                            onClick={() => { setActiveTab('gallery'); setShowCategoryModal(true); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-xl text-xs font-bold transition-all border border-teal-200/20 text-left cursor-pointer"
                          >
                            <Folder className="h-4 w-4" /> Manage Photo Categories
                          </button>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Environment Status</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                          <span className="text-xs text-slate-600 font-semibold">Active Development Mode</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Recent Inbox Messages */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm text-left lg:col-span-2">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Recent Inbox Inquiries</h3>
                          <p className="text-slate-400 text-xs font-light">Latest contact forms received from the website visitors</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('inbox')}
                          className="text-xs text-[#652d90] font-bold hover:underline cursor-pointer"
                        >
                          View All
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {messages.length === 0 ? (
                          <p className="text-slate-400 text-xs font-light text-center py-10">No inquiries in your inbox.</p>
                        ) : (
                          messages.slice(0, 3).map(msg => (
                            <div 
                              key={msg.id}
                              className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:bg-slate-100/50 transition-all cursor-pointer"
                              onClick={() => setActiveTab('inbox')}
                            >
                              <div className="text-left">
                                <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
                                  {msg.subject || 'General Inquiry'}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-slate-700 mt-1.5">{msg.name}</h4>
                                <p className="text-[11px] text-slate-400 font-light truncate max-w-sm sm:max-w-md mt-0.5">"{msg.message}"</p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-[10px] text-slate-400 font-medium">{msg.email}</p>
                                <p className="text-[9px] text-slate-400 font-bold mt-1 font-mono">{msg.phone || 'No Phone'}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>

                </div>
              )}

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

            {/* TAB 4: SERVICES VIEW */}
            {activeTab === 'services' && (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-left">
                    <h2 className="text-lg font-black text-slate-800 font-serif">School Services & Facilities</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">Manage live services, infrastructure facilities, and student utilities posted on the website.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingServiceId(null);
                      setNewService({ title: '', image: '', desc: '' });
                      setImageInputMode('upload');
                      setShowServiceModal(true);
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <Plus className="h-4.5 w-4.5" />
                    New Service
                  </button>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200/60 p-16 rounded-3xl text-center text-slate-400 font-light">
                      No school services found in the database. Click "New Service" to create one.
                    </div>
                  ) : (
                    services.map((service) => (
                      <div 
                        key={service.id}
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col text-left group"
                      >
                        {/* Service Image */}
                        <div className="h-44 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?q=80&w=400';
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <h3 className="font-bold text-slate-800 text-base leading-tight mb-2">{service.title}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">{service.desc}</p>
                          </div>

                          <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                            <button
                              onClick={() => handleEditService(service)}
                              className="px-3 py-1.5 bg-purple-50 text-[#652d90] hover:bg-purple-100 rounded-lg text-xs font-bold transition-all border border-purple-200/30 cursor-pointer flex items-center gap-1"
                              title="Edit Service"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all border border-rose-200/30 cursor-pointer flex items-center gap-1"
                              title="Delete Service"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 5: GALLERY VIEW */}
            {activeTab === 'gallery' && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="text-left">
                    <h2 className="text-lg font-black text-slate-800 font-serif">Photo Gallery Manager</h2>
                    <p className="text-slate-400 text-xs sm:text-sm font-light mt-0.5">Manage live photos, categories, and sports events snapshots posted on the website.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="flex items-center gap-2 px-5 py-3 bg-purple-50 text-[#652d90] hover:bg-purple-100 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer shrink-0 border border-purple-200/50"
                    >
                      <Folder className="h-4.5 w-4.5" />
                      Manage Categories
                    </button>
                    <button
                      onClick={() => {
                        setEditingGalleryId(null);
                        setNewGalleryImage({ url: '', category: galleryCategories[0]?.categoryId || 'classroom', caption: '' });
                        setImageInputMode('upload');
                        setShowGalleryModal(true);
                      }}
                      className="flex items-center gap-2 px-5 py-3 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
                    >
                      <Plus className="h-4.5 w-4.5" />
                      New Photo
                    </button>
                  </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200/60 p-16 rounded-3xl text-center text-slate-400 font-light">
                      No gallery photos found in the database. Click "New Photo" to upload one.
                    </div>
                  ) : (
                    galleryImages.map((img) => (
                      <div 
                        key={img.id}
                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col text-left group"
                      >
                        {/* Gallery Thumbnail */}
                        <div className="h-44 w-full bg-slate-100 overflow-hidden relative border-b border-slate-100">
                          <img 
                            src={img.url} 
                            alt={img.caption} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=400';
                            }}
                          />
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#652d90] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-purple-100 shadow-sm">
                            {img.category}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed line-clamp-3">"{img.caption}"</p>
                          </div>

                          <div className="flex gap-2 justify-end pt-3 border-t border-slate-100">
                            <button
                              onClick={() => handleEditGallery(img)}
                              className="px-3 py-1.5 bg-purple-50 text-[#652d90] hover:bg-purple-100 rounded-lg text-xs font-bold transition-all border border-purple-200/30 cursor-pointer flex items-center gap-1"
                              title="Edit Photo"
                            >
                              <Edit className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(img.id)}
                              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-bold transition-all border border-rose-200/30 cursor-pointer flex items-center gap-1"
                              title="Delete Photo"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        )}
        </main>
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

      {/* 4. SERVICE MODAL FORM */}
      <AnimatePresence>
        {showServiceModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-xl p-6 sm:p-7 relative z-50 text-left"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-lg font-black text-slate-800 font-serif">{editingServiceId ? 'Edit School Service' : 'Add New Service'}</h3>
                <button 
                  onClick={() => {
                    setShowServiceModal(false);
                    setEditingServiceId(null);
                    setNewService({ title: '', image: '', desc: '' });
                  }} 
                  className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateServiceSubmit} className="flex flex-col gap-4">
                
                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Service Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Modern Science Laboratory..." 
                    value={newService.title}
                    onChange={e => setNewService({...newService, title: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Image Selection Tabs */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Service Image</label>
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputMode('upload');
                        if (newService.image && !newService.image.startsWith('data:image')) {
                          setNewService(prev => ({ ...prev, image: '' }));
                        }
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        imageInputMode === 'upload' ? 'bg-white text-[#652d90] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputMode('url');
                        if (newService.image && newService.image.startsWith('data:image')) {
                          setNewService(prev => ({ ...prev, image: '' }));
                        }
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        imageInputMode === 'url' ? 'bg-white text-[#652d90] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Image URL link
                    </button>
                  </div>

                  {imageInputMode === 'upload' ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <label className="px-4 py-2.5 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95">
                          Choose Image File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-slate-400 font-light truncate max-w-[260px]">
                          {newService.image && newService.image.startsWith('data:image') 
                            ? '✓ Image loaded from local computer' 
                            : 'No file selected (Supports JPEG, PNG, WEBP)'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <input 
                      type="url" 
                      placeholder="e.g. https://images.unsplash.com/photo-..." 
                      value={newService.image.startsWith('data:image') ? '' : newService.image}
                      onChange={e => setNewService({...newService, image: e.target.value})}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                    />
                  )}
                </div>

                {/* Image Preview Box */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Image Preview</label>
                  <div className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
                    {newService.image && (newService.image.startsWith('http') || newService.image.startsWith('data:image')) ? (
                      <img 
                        src={newService.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const fallbackNode = e.currentTarget.parentElement?.querySelector('.preview-error');
                          if (fallbackNode) (fallbackNode as HTMLElement).style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = 'block';
                          const fallbackNode = e.currentTarget.parentElement?.querySelector('.preview-error');
                          if (fallbackNode) (fallbackNode as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    {/* Placeholder when URL/File is empty */}
                    {(!newService.image || (!newService.image.startsWith('http') && !newService.image.startsWith('data:image'))) && (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                        <svg className="w-8 h-8 text-slate-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400/80">No image loaded</span>
                        <span className="text-[10px] text-slate-400 font-light">
                          {imageInputMode === 'upload' ? 'Upload an image from your computer to preview it here' : 'Paste a valid image URL link above to preview'}
                        </span>
                      </div>
                    )}
                    
                    {/* Error display if load fails */}
                    <div className="preview-error hidden absolute inset-0 bg-rose-50/90 flex flex-col items-center justify-center text-center p-4 text-rose-600 gap-1">
                      <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Invalid Image Source</span>
                      <span className="text-[10px] text-rose-500 font-light">Unable to load or render the image provided</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Service Description</label>
                  <textarea 
                    rows={4} 
                    placeholder="Describe the facility, opening hours, transport route coverage, or equipment available..." 
                    value={newService.desc}
                    onChange={e => setNewService({...newService, desc: e.target.value})}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light resize-none focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowServiceModal(false);
                      setEditingServiceId(null);
                      setNewService({ title: '', image: '', desc: '' });
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
                      editingServiceId ? 'Save Changes' : 'Add Service'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}

        {/* 5. GALLERY MODAL FORM */}
        {showGalleryModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-xl p-6 sm:p-7 relative z-50 text-left"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-5">
                <h3 className="text-lg font-black text-slate-800 font-serif">{editingGalleryId ? 'Edit Photo Details' : 'Upload Gallery Photo'}</h3>
                <button 
                  onClick={() => {
                    setShowGalleryModal(false);
                    setEditingGalleryId(null);
                    setNewGalleryImage({ url: '', category: galleryCategories[0]?.categoryId || 'classroom', caption: '' });
                  }} 
                  className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreateGallerySubmit} className="flex flex-col gap-4">
                
                {/* Caption */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Photo Caption</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Modern Classroom Fun and Engaged Learnings..." 
                    value={newGalleryImage.caption}
                    onChange={e => setNewGalleryImage({...newGalleryImage, caption: e.target.value})}
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Photo Category</label>
                  <select
                    value={newGalleryImage.category}
                    onChange={e => setNewGalleryImage({...newGalleryImage, category: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300 cursor-pointer"
                  >
                    {galleryCategories.map(cat => (
                      <option key={cat.id} value={cat.categoryId}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Selection Tabs */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Photo Image Source</label>
                  <div className="flex gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputMode('upload');
                        if (newGalleryImage.url && !newGalleryImage.url.startsWith('data:image')) {
                          setNewGalleryImage(prev => ({ ...prev, url: '' }));
                        }
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        imageInputMode === 'upload' ? 'bg-white text-[#652d90] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageInputMode('url');
                        if (newGalleryImage.url && newGalleryImage.url.startsWith('data:image')) {
                          setNewGalleryImage(prev => ({ ...prev, url: '' }));
                        }
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        imageInputMode === 'url' ? 'bg-white text-[#652d90] shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Image URL link
                    </button>
                  </div>

                  {imageInputMode === 'upload' ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <label className="px-4 py-2.5 bg-[#652d90] hover:bg-[#4b1f6b] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm active:scale-95">
                          Choose Image File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleGalleryImageFileChange}
                            className="hidden"
                          />
                        </label>
                        <span className="text-xs text-slate-400 font-light truncate max-w-[260px]">
                          {newGalleryImage.url && newGalleryImage.url.startsWith('data:image') 
                            ? '✓ Image loaded from local computer' 
                            : 'No file selected (Supports JPEG, PNG, WEBP)'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <input 
                      type="url" 
                      placeholder="e.g. https://images.unsplash.com/photo-..." 
                      value={newGalleryImage.url.startsWith('data:image') ? '' : newGalleryImage.url}
                      onChange={e => setNewGalleryImage({...newGalleryImage, url: e.target.value})}
                      required
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs sm:text-sm font-light focus:outline-none transition-all duration-300"
                    />
                  )}
                </div>

                {/* Image Preview Box */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Image Preview</label>
                  <div className="w-full h-40 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
                    {newGalleryImage.url && (newGalleryImage.url.startsWith('http') || newGalleryImage.url.startsWith('data:image')) ? (
                      <img 
                        src={newGalleryImage.url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const fallbackNode = e.currentTarget.parentElement?.querySelector('.preview-error');
                          if (fallbackNode) (fallbackNode as HTMLElement).style.display = 'flex';
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = 'block';
                          const fallbackNode = e.currentTarget.parentElement?.querySelector('.preview-error');
                          if (fallbackNode) (fallbackNode as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    {/* Placeholder when URL/File is empty */}
                    {(!newGalleryImage.url || (!newGalleryImage.url.startsWith('http') && !newGalleryImage.url.startsWith('data:image'))) && (
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                        <svg className="w-8 h-8 text-slate-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400/80">No image loaded</span>
                        <span className="text-[10px] text-slate-400 font-light">
                          {imageInputMode === 'upload' ? 'Upload an image from your computer to preview it here' : 'Paste a valid image URL link above to preview'}
                        </span>
                      </div>
                    )}
                    
                    {/* Error display if load fails */}
                    <div className="preview-error hidden absolute inset-0 bg-rose-50/90 flex flex-col items-center justify-center text-center p-4 text-rose-600 gap-1">
                      <svg className="w-7 h-7 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Invalid Image Source</span>
                      <span className="text-[10px] text-rose-500 font-light">Unable to load or render the image provided</span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowGalleryModal(false);
                      setEditingGalleryId(null);
                      setNewGalleryImage({ url: '', category: 'classroom', caption: '' });
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
                      editingGalleryId ? 'Save Changes' : 'Upload Photo'
                    )}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}

        {/* 6. MANAGE CATEGORIES MODAL */}
        {showCategoryModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl w-full max-w-lg p-6 sm:p-7 relative z-50 text-left flex flex-col gap-5"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-800 font-serif">Manage Photo Categories</h3>
                <button 
                  onClick={() => {
                    setShowCategoryModal(false);
                    setNewCategoryName('');
                    setNewCategoryId('');
                  }} 
                  className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {/* Existing Categories List */}
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-0.5">Existing Categories</label>
                {galleryCategories.length === 0 ? (
                  <p className="text-slate-400 text-xs font-light">No categories created yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {galleryCategories.map((cat) => {
                      const isDefault = ['classroom', 'activities', 'events'].includes(cat.categoryId);
                      return (
                        <div 
                          key={cat.id} 
                          className="flex justify-between items-center bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl hover:bg-slate-100/80 transition-all"
                        >
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-700">{cat.name}</span>
                            <span className="text-[10px] text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md ml-2 font-mono">
                              {cat.categoryId}
                            </span>
                          </div>
                          {!isDefault ? (
                            <button
                              type="button"
                              onClick={() => handleDeleteCategory(cat)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          ) : (
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">System Default</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Add Category Form */}
              <form onSubmit={handleCreateCategorySubmit} className="flex flex-col gap-4 border-t border-slate-100 pt-4">
                <div className="text-left">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider pl-0.5">Add New Category</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider pl-0.5">Category Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sports Day" 
                      value={newCategoryName}
                      onChange={e => setNewCategoryName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs font-light focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider pl-0.5">Unique ID (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. sports-day (Auto generated if blank)" 
                      value={newCategoryId}
                      onChange={e => setNewCategoryId(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-[#652d90] rounded-xl text-xs font-light focus:outline-none"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setNewCategoryName('');
                      setNewCategoryId('');
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newCategoryName.trim()}
                    className="px-6 py-2.5 bg-[#652d90] hover:bg-[#4b1f6b] disabled:bg-slate-300 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'Add Category'
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
