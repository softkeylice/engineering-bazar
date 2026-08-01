import React from 'react';
import {
  Car,
  Flame,
  Zap,
  Building2,
  TrainTrack,
  TestTube2,
  Pill,
  ShieldCheck,
  HardHat,
  LucideIcon
} from 'lucide-react';
import { INDUSTRIES } from '../../data/mockData';

const ICON_MAP: Record<string, LucideIcon> = {
  Car,
  Flame,
  Zap,
  Building2,
  TrainTrack,
  TestTube2,
  Pill,
  ShieldCheck,
  HardHat
};

export const IndustriesSection: React.FC = () => {
  return (
    <section id="industries-section" className="py-20 bg-[#F5F6F8] text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            SECTORS WE EMPOWER
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Key Industry Verticals
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Supplying mission-critical certified engineering raw materials and high-precision components across strategic national sectors.
          </p>
        </div>

        {/* 3x3 Grid of Light Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => {
            const IconComponent = ICON_MAP[ind.iconName] || HardHat;
            return (
              <div
                key={ind.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex items-start gap-4 group hover:-translate-y-1 hover:border-[#2E4BC7]"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A2A6C] text-[#F4B93E] transition-colors flex items-center justify-center shrink-0 shadow-xs">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A2A6C] group-hover:text-[#2E4BC7] transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

