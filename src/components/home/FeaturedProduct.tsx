import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';

interface FeaturedProductProps {
  onOpenRFQ?: (productName?: string) => void;
  onDownloadSpec: (productName: string) => void;
}

export const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  onOpenRFQ,
  onDownloadSpec
}) => {
  const featuredList = PRODUCTS.filter((p) => p.isFeatured);
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = featuredList[currentIndex] || PRODUCTS[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  return (
    <section className="py-20 bg-[#F5F6F8] text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Featured High-Demand Products
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct mill stock allocations prioritized for immediate dispatch with pre-compiled MTC dossiers.
          </p>
        </div>

        {/* Single Large Carousel Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Image */}
            <div className="lg:col-span-6 relative aspect-4/3 min-h-[280px] bg-slate-50 flex items-center justify-center p-4 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-[#1A2A6C]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md z-10">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Primary Mill: {product.millPartner}</span>
              </div>
            </div>

            {/* Right: Spec & Actions */}
            <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Spec Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#1A2A6C] text-white text-xs font-extrabold tracking-wide uppercase mb-3 border border-white/20">
                  {product.specifications.grade || product.specifications.standard || 'PREMIUM INDUSTRIAL SPEC'}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A2A6C]">
                  {product.name}
                </h3>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Technical Specs Preview */}
                <div className="mt-6 p-4 rounded-xl bg-[#F5F6F8] border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Standard</span>
                    <span className="font-bold text-[#1E2340]">{product.specifications.standard || 'ASME B36.10M'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Dimensions</span>
                    <span className="font-bold text-[#1E2340]">{product.specifications.dimensions || '2" to 24" NB'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Dispatch Status</span>
                    <span className="font-bold text-emerald-700">{product.stockAvailability}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Direct Rate</span>
                    <span className="font-bold text-[#1A2A6C]">₹{product.pricePerUnit}/{product.unit}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Pagination */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`/product/${product.id}`}
                    className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 text-center"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                    <span>View Product Details</span>
                  </a>

                  <button
                    onClick={() => onDownloadSpec(product.name)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4 text-slate-600" />
                    <span>Spec Sheet</span>
                  </button>
                </div>

                {/* Carousel Pagination Controls */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {featuredList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          currentIndex === idx ? 'w-6 bg-[#1A2A6C]' : 'w-2 bg-slate-300'
                        }`}
                        aria-label={`Go to item ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-[#1A2A6C] transition-colors"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-[#1A2A6C] transition-colors"
                      aria-label="Next item"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

