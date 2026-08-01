import React from 'react';
import { PackageCheck, Building, Factory, Clock } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const stats = [
    {
      number: '10,000+',
      label: 'Certified Products',
      subtext: 'In Stock & Ready for Dispatch',
      icon: PackageCheck
    },
    {
      number: '500+',
      label: 'Enterprise   Clients',
      subtext: 'L&T, Tata, Godrej & Global OEMs',
      icon: Building
    },
    {
      number: '25+',
      label: 'Direct Mill Partners',
      subtext: 'Tata, JSW, SAIL, Hindalco & SKF',
      icon: Factory
    },
    {
      number: '99%',
      label: 'On-Time Delivery Rate',
      subtext: 'Backed by Pan-India Fleet Logistics',
      icon: Clock
    }
  ];

  return (
    <section className="bg-[#14205C] text-white py-12 border-b border-[#2E4BC7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2E4BC7]/30">
          {stats.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div key={idx} className={`flex items-center gap-4 ${idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#0B2A7A] border border-white/20 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <IconComp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">{s.number}</div>
                  <div className="text-xs font-bold text-slate-100 mt-0.5">{s.label}</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">{s.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

