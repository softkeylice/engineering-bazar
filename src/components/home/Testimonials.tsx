import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Building2 } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const t = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="py-20 bg-[#F5F6F8] text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            CLIENT REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            What Our   Partners Say
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Trusted by procurement leaders, project directors, and chief engineers across India's top manufacturing hubs.
          </p>
        </div>

        {/* Centered Slider Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xl relative">
          
          <Quote className="w-12 h-12 text-[#1A2A6C]/10 absolute top-8 left-8 -z-0" />

          <div className="relative z-10 space-y-6 text-center">
            
            {/* Star Rating */}
            <div className="flex items-center justify-center gap-1 text-[#1A2A6C]">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#1A2A6C] text-[#1A2A6C]" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-base sm:text-lg text-slate-700 italic font-medium leading-relaxed">
              "{t.quote}"
            </p>

            {/* Author */}
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              {t.avatar && (
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#1A2A6C] mb-3 shadow-md" />
              )}
              <div className="font-extrabold text-base text-[#1A2A6C]">{t.name}</div>
              <div className="text-xs font-bold text-[#2E4BC7] mt-0.5">{t.title}</div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#1A2A6C]" />
                <span>{t.company}</span>
              </div>
            </div>

          </div>

          {/* Carousel Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-[#1A2A6C] transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === idx ? 'w-8 bg-[#1A2A6C]' : 'w-2.5 bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-[#1A2A6C] transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

