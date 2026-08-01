import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/mockData';

export const ProcessTimeline: React.FC = () => {
  return (
    <section className="py-20 bg-white text-[#1E2340] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            SEAMLESS PROCUREMENT WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Our Manufacturing & Order Process
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            A streamlined 6-step digital procurement timeline designed to eliminate sourcing delays and ensure 100% material compliance.
          </p>
        </div>

        {/* Desktop 6-Step Timeline / Responsive Grid */}
        <div className="relative">
          
          {/* Connecting Line Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-[#2E4BC7]/20 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="bg-[#F5F6F8] p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group hover:border-[#2E4BC7]"
              >
                <div>
                  {/* Number Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#1A2A6C] text-[#F4B93E] text-lg font-black flex items-center justify-center mb-4 transition-colors shadow-md border border-white/20">
                    {step.stepNumber}
                  </div>

                  <h3 className="text-sm font-bold text-[#1A2A6C] mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block mt-4 pt-2 border-t border-slate-200/60 text-right">
                    <ArrowRight className="w-4 h-4 text-[#F4B93E] inline-block" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

