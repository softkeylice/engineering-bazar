import React, { useState } from 'react';
import { X, CheckCircle2, FileText, ShieldCheck, Truck, Award, ArrowRight, Download, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
  onDownloadSpec: (productName: string) => void;
  onAddToCart?: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  onDownloadSpec,
  onAddToCart,
  onBuyNow
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'mtc'>('overview');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1A2A6C] text-white border-b border-[#2E4BC7]/30">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#F4B93E] text-[#1A2A6C]">
              {product.category}
            </span>
            <span className="text-xs text-slate-300 font-medium">SKU: EB-PRD-{product.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Image & Quick Badges */}
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-4/3 flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 bg-[#1A2A6C]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs border border-[#2E4BC7]/30 z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F4B93E]" />
                  <span>100% Certified Mill Traceable</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F5F6F8] p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#1A2A6C]" />
                  <div>
                    <div className="font-semibold text-[#1E2340]">Dispatch</div>
                    <div className="text-slate-600 text-[11px]">{product.stockAvailability}</div>
                  </div>
                </div>
                <div className="bg-[#F5F6F8] p-2.5 rounded-xl border border-slate-200 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F4B93E]" />
                  <div>
                    <div className="font-semibold text-[#1E2340]">Mill Partner</div>
                    <div className="text-slate-600 text-[11px]">{product.millPartner}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info & Pricing */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#1A2A6C]">{product.name}</h2>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{product.fullDescription}</p>

                {/* Price block */}
                <div className="mt-4 p-3 bg-[#F5F6F8] rounded-xl border border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#1A2A6C]">₹{product.pricePerUnit.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500 font-medium">per {product.unit} (excl. GST)</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through ml-auto">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
                    <span>MOQ: <strong className="text-[#1E2340]">{product.moq}</strong></span>
                    <span className="text-[#1A2A6C] font-bold bg-white px-2.5 py-0.5 rounded-full border border-slate-200">Verified Stock</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="mt-4 flex border-b border-slate-200 text-xs font-medium text-slate-600">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'overview' ? 'border-[#1A2A6C] text-[#1A2A6C] font-bold' : 'border-transparent hover:text-slate-900'
                    }`}
                  >
                    Tech Specs
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'specs' ? 'border-[#1A2A6C] text-[#1A2A6C] font-bold' : 'border-transparent hover:text-slate-900'
                    }`}
                  >
                    Standards & Grade
                  </button>
                  <button
                    onClick={() => setActiveTab('mtc')}
                    className={`pb-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'mtc' ? 'border-[#1A2A6C] text-[#1A2A6C] font-bold' : 'border-transparent hover:text-slate-900'
                    }`}
                  >
                    MTC & Compliance
                  </button>
                </div>

                <div className="py-3 text-xs text-slate-700">
                  {activeTab === 'overview' && (
                    <div className="space-y-1.5">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        value && (
                          <div key={key} className="flex justify-between py-1 border-b border-slate-100">
                            <span className="capitalize text-slate-500">{key}:</span>
                            <span className="font-semibold text-[#1E2340]">{value}</span>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-[#F5F6F8] rounded-xl border border-slate-200">
                        <div className="font-semibold text-[#1E2340]">Group: {product.materialGradeGroup}</div>
                        <p className="text-[11px] text-slate-600 mt-0.5">Complies with ASME, ASTM, and DIN international metallurgy specs.</p>
                      </div>
                      <div className="p-2.5 bg-[#F5F6F8] rounded-xl border border-slate-200">
                        <div className="font-semibold text-[#1E2340]">Surface Finish: {product.surfaceFinishGroup}</div>
                        <p className="text-[11px] text-slate-600 mt-0.5">Passivated and protected against transit oxidation.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'mtc' && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2.5 bg-[#F5F6F8] border border-slate-200 rounded-xl text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#F4B93E] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-[#1A2A6C]">EN 10204 3.1 Certified</div>
                          <p className="text-[11px] text-slate-600">Direct primary mill test heat certificate supplied with physical shipment.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(product);
                    }}
                    className="px-4 py-3 rounded-full border border-[#1A2A6C] text-[#1A2A6C] hover:bg-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#1A2A6C]" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onBuyNow) {
                        onBuyNow(product);
                        onClose();
                      }
                    }}
                    className="px-4 py-3 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-[#F4B93E] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Buy Now</span>
                    <ArrowRight className="w-4 h-4 text-[#F4B93E]" />
                  </button>
                </div>

                <button
                  onClick={() => onDownloadSpec(product.name)}
                  className="w-full py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#F4B93E]" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

