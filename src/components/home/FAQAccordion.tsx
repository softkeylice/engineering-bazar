import React, { useState } from 'react';
import { ChevronDown, HelpCircle, FileQuestion } from 'lucide-react';
import { FAQS } from '../../data/mockData';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id));
  };

  return (
    <section className="py-20 bg-white text-[#1E2340] border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Everything you need to know about   procurement terms, MTC trace certificates, MOQ thresholds, and custom CAD manufacturing.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#1A2A6C] bg-[#F5F6F8] shadow-md ring-1 ring-[#1A2A6C]/10'
                    : 'border-slate-200 bg-white hover:border-[#1A2A6C]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1A2A6C] focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <FileQuestion className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#1A2A6C]' : 'text-slate-400'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1A2A6C]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed pl-13 border-t border-slate-200/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

