import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { HERO_SLIDES } from '../../data/mockData';
import { Logo } from '../Logo';

interface HeroProps {
  onOpenRFQ?: () => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRFQ, onExploreCatalog }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleScrollDown = () => {
    const el = document.getElementById('about-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-[#1A2A6C] text-white min-h-[580px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden border-b border-[#2E4BC7]/30">
      
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={slide.image}
          alt={slide.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A7A] via-[#0B2A7A]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A7A] via-transparent to-transparent"></div>
      </div>

      {/* Decorative Gear Motif Watermark Echo */}
      <div className="absolute top-1/2 -right-24 -translate-y-1/2 opacity-10 pointer-events-none text-white">
        <Logo size={420} variant="dark" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0B2A7A] text-[11px] font-extrabold tracking-wider uppercase mb-6 shadow-md border border-white">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B2A7A]" />
            <span>{slide.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {slide.title}
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {slide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreCatalog}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0B2A7A] text-xs sm:text-sm font-black tracking-wide transition-all shadow-lg flex items-center gap-2 active:scale-95 border border-white"
            >
              <ArrowRight className="w-4 h-4 text-[#0B2A7A]" />
              <span>{slide.primaryCta}</span>
            </button>

            <button
              onClick={() => {
                if (onOpenRFQ) {
                  onOpenRFQ();
                } else {
                  const el = document.getElementById('contact-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-7 py-3.5 rounded-full border border-white/40 hover:border-white text-white text-xs sm:text-sm font-semibold transition-all bg-white/10 hover:bg-white/20 backdrop-blur-xs flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-white" />
              <span>Contact Sales Team</span>
            </button>
          </div>

          {/* Micro stats under CTA */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300 max-w-lg">
            <div>
              <div className="font-black text-white text-lg sm:text-xl">10,000+</div>
              <div className="text-[11px] text-slate-300">Certified SKUs</div>
            </div>
            <div>
              <div className="font-black text-white text-lg sm:text-xl">24-48 Hrs</div>
              <div className="text-[11px] text-slate-300">Dispatch Lead Time</div>
            </div>
            <div>
              <div className="font-black text-white text-lg sm:text-xl">100%</div>
              <div className="text-[11px] text-slate-300">Mill MTC Guarantee</div>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls & Indicators */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full flex items-center justify-between">
        
        {/* Carousel Dots */}
        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <button
          onClick={handleScrollDown}
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors group"
        >
          <span>Scroll Down</span>
          <ChevronDown className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform" />
        </button>

        {/* Arrow Controls - Circular buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
            className="p-2.5 rounded-full bg-[#14205C] hover:bg-[#2E4BC7]/40 text-slate-200 transition-colors border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="p-2.5 rounded-full bg-[#14205C] hover:bg-[#2E4BC7]/40 text-slate-200 transition-colors border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>

    </section>
  );
};

