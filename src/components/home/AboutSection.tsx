import React, { useState } from 'react';
import { ShieldCheck, Truck, Users, Tag, Award, CheckCircle2 } from 'lucide-react';
import { Logo } from '../Logo';
import cnc5AxisImg from '../../assets/images/cnc_5axis_machining_1785570190440.jpg';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  const tabContent = {
    mission: "Our mission is to eliminate friction in heavy   engineering procurement by providing real-time inventory visibility, direct primary mill pricing, and 100% material traceability for every project across India and global trade hubs.",
    vision: "To become the premier tech-enabled industrial supply chain ecosystem connecting raw material manufacturers, CNC contract machinists, and heavy OEMs on a single unified digital procurement matrix.",
    values: "We operate on absolute transparency, certified quality assurance, uncompromised safety compliance, and direct accountability from mill rolling lines to customer backyard yards."
  };

  return (
    <section id="about-section" className="py-20 bg-[#F5F6F8] text-[#1E2340] relative overflow-hidden">
      {/* Background Gear Watermark Accent */}
      <div className="absolute top-10 left-[-100px] opacity-[0.03] pointer-events-none text-[#0B2A7A]">
        <Logo size={400} variant="light" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow & Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#0B2A7A] uppercase mb-2 block">
            ABOUT ENGINEERING BAZAR
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A7A] tracking-tight">
            Empowering Global   Manufacturing & Supply Chains
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            As India's leading digital   engineering marketplace, Engineering Bazar bridges integrated steel mills, non-ferrous producers, CNC machining yards, and heavy OEMs to supply certified raw materials and turnkey fabricated assemblies.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Collage */}
          <div className="lg:col-span-6 relative pt-6 px-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Image Container */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-800 aspect-4/3 relative z-0 group">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"
                  alt="Industrial Steel & Heavy Manufacturing Floor"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to secondary high-res unsplash if blocked
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A7A]/40 via-transparent to-transparent"></div>
              </div>

              {/* Overlapping Secondary Image */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 w-3/5 sm:w-1/2 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-square z-10 group">
                <img
                  src={cnc5AxisImg}
                  alt="5-Axis Precision CNC Machining Facility"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0B2A7A]/90 to-transparent p-2.5 text-center">
                  <span className="text-[10px] font-black uppercase text-white tracking-wide block">
                    5-Axis CNC Machining
                  </span>
                </div>
              </div>

              {/* Badge Overlay */}
              <div className="absolute -top-5 left-2 sm:left-4 bg-[#0B2A7A] text-white px-4 py-3 rounded-2xl shadow-2xl border border-blue-400/30 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black text-white leading-tight">25+ Years</div>
                  <div className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Industrial Legacy</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Tab Switcher & 2x2 Feature Grid */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Tab Switcher */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex border-b border-slate-200 pb-3 gap-2">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                    activeTab === 'mission'
                      ? 'bg-[#0B2A7A] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Our Mission
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                    activeTab === 'vision'
                      ? 'bg-[#0B2A7A] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Our Vision
                </button>
                <button
                  onClick={() => setActiveTab('values')}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                    activeTab === 'values'
                      ? 'bg-[#0B2A7A] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Core Values
                </button>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-[#1E2340] leading-relaxed min-h-[72px]">
                {tabContent[activeTab]}
              </p>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3 group hover:border-[#0B2A7A] transition-colors">
                <div className="p-2.5 rounded-full bg-[#0B2A7A] text-white shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2A7A]">Trusted Quality</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">100% EN 10204 3.1 MTC trace reports with heat numbers.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3 group hover:border-[#0B2A7A] transition-colors">
                <div className="p-2.5 rounded-full bg-[#0B2A7A] text-white shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2A7A]">Fast Delivery</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">24–48 hours backyard yard dispatch across major industrial corridors.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3 group hover:border-[#0B2A7A] transition-colors">
                <div className="p-2.5 rounded-full bg-[#0B2A7A] text-white shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2A7A]">Expert Team</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Metallurgical engineers on standby for DFM & material substitution.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-3 group hover:border-[#0B2A7A] transition-colors">
                <div className="p-2.5 rounded-full bg-[#0B2A7A] text-white shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B2A7A]">Direct Mill Rates</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Primary mill contract rates without trading markups.</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


