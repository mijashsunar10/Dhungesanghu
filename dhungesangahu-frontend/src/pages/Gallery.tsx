import React, { useState } from 'react';
import { PhotoGallerySection } from '../components/PhotoGallerySection';
import { Map, Image as ImageIcon, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageBanner } from '../components/PageBanner';

interface CampusArea {
  id: string;
  name: string;
  coords: string; // for polygon or path rendering
  color: string;
  hoverColor: string;
  image: string;
  description: string;
  highlights: string[];
}

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'map'>('map');
  const [selectedArea, setSelectedArea] = useState<CampusArea | null>(null);

  const campusAreas: CampusArea[] = [
    {
      id: "admin",
      name: "Administrative Block (A Block)",
      coords: "M 20,40 L 180,40 L 180,160 L 20,160 Z",
      color: "fill-purple-100 stroke-purple-400",
      hoverColor: "group-hover:fill-purple-200 group-hover:stroke-purple-600",
      image: "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01910-scaled.jpg",
      description: "The primary gateway of the school. Houses the Principal's Room, Academic Coordinator Desk, accounts department, reception lounge, and teacher staff rooms.",
      highlights: ["Visitor Registration Desk", "Principal & Coordinator Offices", "Accounts & billing section", "Secure inquiry lobby"]
    },
    {
      id: "academic",
      name: "Academic Classrooms (B Block)",
      coords: "M 210,40 L 480,40 L 480,160 L 210,160 Z",
      color: "fill-indigo-100 stroke-indigo-400",
      hoverColor: "group-hover:fill-indigo-200 group-hover:stroke-indigo-600",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600",
      description: "Spacious, well-ventilated class blocks. Grades Pre-Primary up to Grade 10 conduct their routine lectures here, each equipped with whiteboards and digital screens.",
      highlights: ["Audio-Visual smart monitors", "Comfortable dual desks layouts", "Individual student cubbies", "Routine discipline inspections"]
    },
    {
      id: "labs",
      name: "Science & Computer Labs Block",
      coords: "M 510,40 L 760,40 L 760,160 L 510,160 Z",
      color: "fill-emerald-100 stroke-emerald-400",
      hoverColor: "group-hover:fill-emerald-200 group-hover:stroke-emerald-600",
      image: "https://dhungesanghuschool.edu.np/wp-content/uploads/2026/06/711446612_1619901500136886_2783704930028341872_n.jpg",
      description: "Designed for practical explorations. It holds separate physics, chemistry, and biology labs with equipment, plus a computer lab with high-speed internet connections.",
      highlights: ["Hands-on compound microscopes", "30+ Individual workstation computers", "High-speed optical fiber connectivity", "Interactive coding lab programs"]
    },
    {
      id: "hostel",
      name: "Hostel & Dining Hall Block",
      coords: "M 20,200 L 280,200 L 280,340 L 20,340 Z",
      color: "fill-amber-100 stroke-amber-400",
      hoverColor: "group-hover:fill-amber-200 group-hover:stroke-amber-600",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600",
      description: "Home away from home. Offers comfortable, secure boarding facilities with separate boys and girls wings. Features a hygiene-certified mess serving warm meals.",
      highlights: ["Caring warden supervision", "24/7 Hot water & backup power", "Four nutritious hot meals daily", "Supervised study sessions hour"]
    },
    {
      id: "ground",
      name: "Sports Field & Basketball Court",
      coords: "M 320,200 L 760,200 L 760,340 L 320,340 Z",
      color: "fill-rose-100 stroke-rose-400",
      hoverColor: "group-hover:fill-rose-200 group-hover:stroke-rose-600",
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=600",
      description: "The primary hub of sports and high-energy student play. It hosts a full-size basketball court, table tennis boards, and play space for soccer and tracking drills.",
      highlights: ["Double-hoop concrete court", "Inter-house tournament events", "Trained physical instructors", "Secured high-fence perimeter safety"]
    }
  ];

  const activeArea = selectedArea || campusAreas[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col font-sans bg-slate-50 min-h-screen"
    >
      <PageBanner 
        title="Gallery & Campus Tour" 
        subtitle="Take a virtual tour of our school campus buildings or browse photos of academics, sports, and celebrations." 
        badge="Explore Campus"
      />

      {/* Main Container Area */}
      <div className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 flex flex-col gap-8">
        
        {/* Toggle between Photos and Interactive Map */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto">
          <button
            onClick={() => {
              setActiveTab('map');
              setSelectedArea(null);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeTab === 'map'
                ? 'bg-[#652d90] text-white font-black'
                : 'text-slate-600 hover:text-[#652d90]'
            }`}
          >
            <Map className="h-4 w-4" />
            Interactive Campus Map
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-[#652d90] text-white font-black'
                : 'text-slate-600 hover:text-[#652d90]'
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Photo Gallery
          </button>
        </div>

        {/* Dynamic Display under AnimatePresence */}
        <div className="w-full flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'map' ? (
              <motion.div 
                key="map"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full text-left"
              >
                
                {/* Interactive SVG Map (Left) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col gap-5 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 font-serif leading-tight">Campus Layout Map</h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">Click on any colored zone in the map below to discover details.</p>
                  </div>

                  {/* Responsive SVG Map */}
                  <div className="relative w-full aspect-[780/380] border border-slate-100 rounded-2xl bg-slate-50 p-2 overflow-hidden shadow-inner">
                    <svg 
                      viewBox="0 0 780 380" 
                      className="w-full h-full select-none"
                    >
                      {/* Grid Lines mockup */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(101,45,144,0.03)" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />

                      {/* Render Campus blocks */}
                      {campusAreas.map(area => {
                        const isSelected = activeArea.id === area.id;
                        return (
                          <g 
                            key={area.id} 
                            onClick={() => setSelectedArea(area)}
                            className="group cursor-pointer"
                          >
                            {/* Area Polygon Shape */}
                            <path 
                              d={area.coords} 
                              className={`transition-all duration-300 stroke-2 cursor-pointer ${
                                isSelected 
                                  ? 'fill-[#652d90]/20 stroke-[#652d90] stroke-[3px]' 
                                  : `${area.color} ${area.hoverColor}`
                              }`}
                            />
                            {/* Text Label coordinates */}
                            {area.id === "admin" && <text x="100" y="105" className="text-xs font-bold fill-slate-700 pointer-events-none text-center select-none" textAnchor="middle">A: Admin</text>}
                            {area.id === "academic" && <text x="345" y="105" className="text-xs font-bold fill-slate-700 pointer-events-none select-none" textAnchor="middle">B: Classrooms</text>}
                            {area.id === "labs" && <text x="635" y="105" className="text-xs font-bold fill-slate-700 pointer-events-none select-none" textAnchor="middle">C: Science & Computer Labs</text>}
                            {area.id === "hostel" && <text x="150" y="275" className="text-xs font-bold fill-slate-700 pointer-events-none select-none" textAnchor="middle">D: Hostel & Dining</text>}
                            {area.id === "ground" && <text x="540" y="275" className="text-xs font-bold fill-slate-700 pointer-events-none select-none" textAnchor="middle">Sports Field & Courts</text>}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Helper instruction */}
                  <div className="flex items-center gap-2 text-xs text-[#652d90] bg-[#652d90]/5 p-3 rounded-xl border border-purple-100/50">
                    <MapPin className="h-4.5 w-4.5 shrink-0" />
                    <span>Tip: You can also tap the block lists on the right side menu to zoom in!</span>
                  </div>
                </div>

                {/* Sidebar Details Panel (Right) - Animated switching details */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-md flex flex-col justify-between gap-6 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeArea.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="flex flex-col justify-between gap-6 h-full w-full"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Photo Thumbnail */}
                        <div className="relative aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden shadow-inner border border-slate-100">
                          <ImageWithFallback 
                            src={activeArea.image} 
                            alt={activeArea.name} 
                            fallbackType="school"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-[#ffdd57] text-[#4b1f6b] font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                            Interactive Info
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col gap-2">
                          <h3 className="text-lg font-bold text-slate-800 font-serif leading-tight">
                            {activeArea.name}
                          </h3>
                          <p className="text-slate-500 font-light text-xs sm:text-sm leading-relaxed">
                            {activeArea.description}
                          </p>
                        </div>

                        <div className="h-[1px] bg-slate-100 w-full" />

                        {/* Key highlights checklist */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Features Checklist</span>
                          <ul className="flex flex-col gap-1.5 text-xs text-slate-600 font-light">
                            {activeArea.highlights.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#652d90] shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Quick block navigation links list */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Quick Navigation List</span>
                        <div className="flex flex-wrap gap-1.5">
                          {campusAreas.map(area => (
                            <button
                              key={area.id}
                              onClick={() => setSelectedArea(area)}
                              className={`text-[10px] sm:text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border active:scale-95 ${
                                activeArea.id === area.id
                                  ? 'bg-[#652d90] text-white border-[#652d90]'
                                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                              }`}
                            >
                              {area.name.split(' (')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

              </motion.div>
            ) : (
              <motion.div 
                key="photos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <PhotoGallerySection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};
