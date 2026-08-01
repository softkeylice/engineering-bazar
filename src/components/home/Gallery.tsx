import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/mockData';
import { GalleryItem } from '../../types';

export const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Photos');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ['All Photos', 'Factory Floor', 'CNC Machining', 'Raw Materials', 'Logistics & Shipping'];

  const filtered = activeTab === 'All Photos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="gallery-section" className="py-20 bg-white text-[#1E2340] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            VISUALS & FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Industrial Infrastructure & Stockyards
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Take a visual tour of our primary steel stockyards, 5-axis CNC machining bays, fiber laser cutting centers, and heavy flatbed shipping logistics.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                activeTab === cat
                  ? 'bg-[#1A2A6C] text-white border-[#1A2A6C] shadow-md'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#1A2A6C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className={`relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group cursor-pointer aspect-4/3 ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-2 sm:aspect-16/9' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#14205C]/95 via-[#1A2A6C]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-[#F4B93E] text-[10px] font-black uppercase tracking-wider text-[#1A2A6C]">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:scale-110 transition-transform">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4">
          <div className="relative max-w-4xl w-full bg-[#14205C] rounded-2xl overflow-hidden shadow-2xl border border-[#2E4BC7]/30">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-16/9 bg-black">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <div className="p-6 bg-[#1A2A6C] text-white">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F4B93E] text-[#1A2A6C]">
                {selectedPhoto.category}
              </span>
              <h3 className="text-xl font-bold mt-2">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
