import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Shield, Send, FileCheck } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/mockData';
import { RFQFormData } from '../types';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledCategory?: string;
  prefilledProductName?: string;
  onSubmitSuccess: (data: RFQFormData) => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  isOpen,
  onClose,
  prefilledCategory = 'Steel & Metals',
  prefilledProductName,
  onSubmitSuccess
}) => {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    productCategory: prefilledCategory || 'Steel & Metals',
    estimatedQuantity: '',
    specifications: prefilledProductName ? `Requirement for: ${prefilledProductName}\n` : '',
    fileName: undefined
  });

  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName) return;
    
    onSubmitSuccess(formData);
    onClose();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.dataTransfer.files[0].name }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fileName: e.target.files![0].name }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full my-8 overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A2A6C] text-white flex items-center justify-between border-b border-[#2E4BC7]/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white">
                RFQ DESK
              </span>
              <h3 className="text-base font-extrabold">Request for Quotation (RFQ)</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">Receive binding direct mill prices & lead times within 60 minutes.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Sharma"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
              <input
                type="email"
                required
                placeholder="v.sharma@company.com"
                value={formData.workEmail}
                onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                placeholder="Acme Industrial Fabricators"
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Category</label>
              <select
                value={formData.productCategory}
                onChange={e => setFormData({ ...formData, productCategory: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
              >
                {CATEGORIES_LIST.slice(1).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Quantity / Tonnage</label>
              <input
                type="text"
                placeholder="e.g. 25 Metric Tons / 500 Pcs"
                value={formData.estimatedQuantity}
                onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full px-4 py-2 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Specifications / Requirements</label>
            <textarea
              rows={3}
              placeholder="Specify material grade (e.g. ASTM A106 Gr B, 6061-T6), dimensions, tolerances, wall thickness, or target delivery timeline..."
              value={formData.specifications}
              onChange={e => setFormData({ ...formData, specifications: e.target.value })}
              className="w-full bg-[#F5F6F8] border border-slate-300 rounded-2xl p-3 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
            />
          </div>

          {/* File Upload Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Attach CAD Drawing / STEP / Spec Sheet</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-2xl p-4 text-center transition-colors cursor-pointer ${
                dragActive ? 'border-[#1A2A6C] bg-[#F5F6F8]' : 'border-slate-300 bg-[#F5F6F8] hover:bg-slate-100'
              }`}
            >
              <input
                type="file"
                id="rfq-file-input"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.step,.stp,.dxf,.dwg,.sldprt,.xlsx,.zip"
              />
              <label htmlFor="rfq-file-input" className="cursor-pointer flex flex-col items-center justify-center">
                {formData.fileName ? (
                  <div className="flex items-center gap-2 text-[#1A2A6C] font-bold text-xs">
                    <FileCheck className="w-5 h-5 text-[#0B2A7A]" />
                    <span>Attached: {formData.fileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-[#0B2A7A] mb-1" />
                    <span className="text-xs font-bold text-[#1E2340]">Drag & drop CAD drawing or click to browse</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">Supports PDF, STEP, DXF, DWG, SLDPRT up to 50MB</span>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 font-medium">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#0B2A7A]" />
              Non-Disclosure Agreement (NDA) Protected
            </span>
            <span>Est. Response: &lt; 60 Mins</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-[#2E4BC7]/30"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Submit Request for Quotation</span>
          </button>
        </form>

      </div>
    </div>
  );
};

