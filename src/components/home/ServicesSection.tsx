import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/mockData';

interface ServicesSectionProps {
  onOpenRFQ?: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenRFQ }) => {
  return (
    <section id="services-section" className="py-20 bg-white text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            MANUFACTURING & INDUSTRIAL SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            End-to-End Engineering Solutions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            From direct mill raw material procurement to high-precision 5-axis CNC machining, laser cutting, heavy SAW welding, and certified NDT testing.
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((serv) => (
            <div
              key={serv.id}
              className="bg-[#F5F6F8] rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 hover:border-[#2E4BC7]"
            >
              {/* Image & Number Badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-200">
                <img
                  src={serv.image}
                  alt={serv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#1A2A6C] text-[#F4B93E] text-xs font-black px-2.5 py-1 rounded-full border border-white/20 shadow-md">
                  {serv.badgeNumber}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1A2A6C] group-hover:text-[#2E4BC7] transition-colors leading-snug">
                    {serv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {serv.description}
                  </p>

                  {/* 3-Item Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                    {serv.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F4B93E] shrink-0 mt-0.5" />
                        <span className="font-medium text-[#1E2340]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onOpenRFQ) {
                      onOpenRFQ(`Service: ${serv.title}`);
                    } else {
                      const el = document.getElementById('contact-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="mt-5 w-full py-2.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                  <span>Inquire for Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

