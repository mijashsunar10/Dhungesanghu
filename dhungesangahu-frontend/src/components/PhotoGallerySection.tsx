import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Folder, Image as ImageIcon } from 'lucide-react';

interface PhotoGallerySectionProps {
  limit?: number;
}

const galleryImages = [
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/01/dbs6.jpg',
    category: 'activities',
    caption: 'Student Presentation & Group Activities'
  },
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/726495301_27214325098227711_5095630771598862657_n.jpeg',
    category: 'classroom',
    caption: 'Modern Classroom Fun and Engaged Learnings'
  },
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/724005185_1657741765516585_8558043736622738972_n.jpeg',
    category: 'classroom',
    caption: 'Dedicated Science Experiments and Study Time'
  },
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/721951060_2878261705852991_6275585639119925637_n.jpeg',
    category: 'activities',
    caption: 'Creative Indoor Drawing & Arts Craft Play'
  },
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711814583_1619901360136900_4141375761681313767_n.jpg',
    category: 'activities',
    caption: 'Outdoor Playground and Collaborative Team Exercises'
  },
  {
    url: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/709708868_1615055323954837_6000510963209356473_n.jpg',
    category: 'events',
    caption: 'Annual Cultural Festival and Happy Performances'
  },
  {
    url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600',
    category: 'classroom',
    caption: 'Junior Chemistry & Biology Science Lab Experiments'
  },
  {
    url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600',
    category: 'classroom',
    caption: 'Primary Level Language Studies Classroom Deskwork'
  },
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ee18881754?q=80&w=600',
    category: 'events',
    caption: 'Annual Track & Field Sports Meet Running Events'
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600',
    category: 'activities',
    caption: 'Advanced Information Technology and Keyboard Skills'
  },
  {
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600',
    category: 'classroom',
    caption: 'Hobby Book Reading in Quiet Campus Study Library'
  },
  {
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600',
    category: 'events',
    caption: 'Pre-Primary Kindergarten Play Ground and Toys Activity'
  }
];

const categories = [
  { id: 'all', name: 'All Photos' },
  { id: 'classroom', name: 'Classroom & Study' },
  { id: 'activities', name: 'Student Activities' },
  { id: 'events', name: 'Events & Sports' }
];

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter images based on active tab
  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // Apply limit for homepage view
  const displayImages = limit ? galleryImages.slice(0, limit) : filteredImages;

  const openLightbox = (url: string) => {
    const idx = galleryImages.findIndex(img => img.url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length));
    }
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length));
    }
  };

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-white font-sans w-full">
      {/* Decorative doodle background overlay */}
      <div className="absolute inset-0 bg-[url('https://rainbowacademic.edu.np/wp-content/uploads/2026/01/Untitled-design-2-6.png')] bg-center bg-cover bg-no-repeat opacity-[0.12] z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-10 w-full">
        
        {/* HEADER */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="inline-block px-5 py-1.5 bg-[#ffdd57] text-[#4b1f6b] font-bold text-sm rounded-full tracking-wide shadow-sm">
            📸 Photo Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#652d90] font-serif leading-tight">
            Heartwarming Moments<br className="hidden sm:block" />
            from Our School
          </h2>
        </div>

        {/* PROPER ALBUM FOLDERS (Only shown on full gallery page) */}
        {!limit && (
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 my-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-[#652d90] text-white'
                    : 'bg-[#652d90]/5 text-[#652d90] hover:bg-[#652d90]/10'
                }`}
              >
                {cat.id === 'all' ? <ImageIcon className="w-4.5 h-4.5" /> : <Folder className="w-4.5 h-4.5" />}
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {displayImages.map((img, index) => {
            // If home page limit is active, hide index 2, 3, 4, 5 on screens smaller than md
            const isMobileHidden = limit && index >= 2;
            return (
              <div 
                key={index}
                onClick={() => openLightbox(img.url)}
                className={`group bg-white rounded-3xl overflow-hidden shadow-[0_14px_32px_rgba(101,45,144,0.15)] hover:shadow-[0_22px_45px_rgba(101,45,144,0.25)] hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 aspect-[5/3] cursor-pointer ${
                  isMobileHidden ? 'hidden md:block' : 'block'
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON (Only shown on Home page view) */}
        {limit && (
          <div className="text-center mt-4">
            <NavLink 
              to="/gallery" 
              className="inline-block bg-[#652d90] text-white hover:bg-[#ffdd57] hover:text-[#4b1f6b] font-bold px-10 py-3.5 rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-102 transition-all duration-300"
            >
              View All Images
            </NavLink>
          </div>
        )}

      </div>

      {/* LIGHTBOX PREVIEW MODAL */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 sm:p-10 select-none animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close trigger */}
          <button 
            onClick={closeLightbox} 
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation */}
          <button 
            onClick={prevLightbox} 
            className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer text-xl sm:text-2xl"
          >
            ‹
          </button>

          {/* Large Image Frame */}
          <div className="relative max-w-5xl max-h-[70vh] flex justify-center items-center">
            <img 
              src={galleryImages[lightboxIndex].url} 
              alt="Gallery Snapshot" 
              className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/5"
            />
          </div>

          {/* Caption */}
          <div className="mt-6 text-center max-w-2xl px-6">
            <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
              {galleryImages[lightboxIndex].caption}
            </p>
            <span className="inline-block text-xs font-bold text-[#ffdd57] uppercase tracking-wider mt-2">
              Category: {galleryImages[lightboxIndex].category}
            </span>
          </div>

          {/* Right Navigation */}
          <button 
            onClick={nextLightbox} 
            className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer text-xl sm:text-2xl"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};
