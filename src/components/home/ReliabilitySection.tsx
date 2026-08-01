import React from 'react';
import { ShieldCheck, HardHat, Truck, Cpu, CheckCircle2, Headphones } from 'lucide-react';

export const ReliabilitySection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Certified Products',
      description: 'Every pipe, plate, bar, or fastener undergoes spectro chemical and tensile testing verified by third-party NDT agencies.'
    },
    {
      icon: HardHat,
      title: 'Industrial Expertise',
      description: 'Our team includes certified metallurgists and AWS welding inspectors with 25+ years experience in heavy engineering.'
    },
    {
      icon: Truck,
      title: 'Reliable Supply Chain',
      description: 'Strategic stocking yards in Mumbai, Delhi NCR, Chennai, Ahmedabad, and Kolkata ensure JIT delivery to your project site.'
    },
    {
      icon: Cpu,
      title: 'Custom Manufacturing',
      description: 'From 5-axis CNC machining to SAW plate girder fabrication, we convert raw metal into precision finished parts according to CAD.'
    },
    {
      icon: CheckCircle2,
      title: 'Quality Assurance',
      description: 'Certified quality management system with full batch-wise EN 10204 3.1 MTC trace dossiers.'
    },
    {
      icon: Headphones,
      title: '24/7 Technical Support',
      description: 'Dedicated account managers and estimation engineers available for instant RFQs, BOQ estimations, and order tracking.'
    }
  ];

  return (
    <section className="py-20 bg-[#1A2A6C] text-white border-y border-[#2E4BC7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-slate-200 uppercase mb-2 block">
            ENGINEERED FOR RELIABILITY & SCALE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built for Mission-Critical Heavy Industry
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            We provide enterprise   infrastructure that guarantees material compliance, transparent direct mill pricing, and zero project downtime.
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#14205C] border border-[#2E4BC7]/30 hover:border-white/50 transition-all hover:-translate-y-1 group shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B2A7A] text-white border border-white/20 flex items-center justify-center mb-4 transition-colors shadow-md">
                  <IconComp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

