import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Upload, ShieldCheck, ExternalLink, FileCheck } from 'lucide-react';
import { CATEGORIES_LIST } from '../../data/mockData';
import { RFQFormData } from '../../types';

interface ContactSectionProps {
  onSubmitRFQ: (data: RFQFormData) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSubmitRFQ }) => {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    productCategory: 'Steel & Pipes',
    estimatedQuantity: '',
    specifications: '',
    fileName: undefined
  });

  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.companyName) return;

    onSubmitRFQ(formData);

    // reset form
    setFormData({
      fullName: '',
      workEmail: '',
      phone: '',
      companyName: '',
      productCategory: 'Steel & Pipes',
      estimatedQuantity: '',
      specifications: '',
      fileName: undefined
    });
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
    <section id="contact-section" className="py-20 bg-[#F5F6F8] text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Request a Quote & Contact Our Team
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our technical metallurgical estimators and corporate sales desk are available to process BOQ requests and deliver binding quotes within 60 minutes.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Corporate Office & Stockyard Info + Map Placeholder */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-8">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#1A2A6C] text-white text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
                HEADQUARTERS & CENTRAL STOCKYARD
              </div>
              <h3 className="text-xl font-extrabold text-[#1A2A6C]">
                Corporate Office & Logistics Complex
              </h3>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-[#1A2A6C] text-white shrink-0 border border-white/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1E2340]">Address</div>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">
                    S-102, Beside Dynomark, Near Sai Wajan Kata, S Block, MIDC, Bhosari, Pimpri-Chinchwad, Maharashtra 411026, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-[#1A2A6C] text-white shrink-0 border border-white/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1E2340]">Phone & WhatsApp RFQ Desk</div>
<p className="text-slate-600 mt-0.5">Phone / WhatsApp: +91 78880 66672</p>                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-[#1A2A6C] text-white shrink-0 border border-white/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1E2340]">Email Enquiries</div>
<p className="text-slate-600 mt-0.5">confioengineeeringsolution@gmail.com</p>                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-[#1A2A6C] text-white shrink-0 border border-white/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1E2340]">Working Hours</div>
                  <p className="text-slate-600 mt-0.5">Mon – Sat: 8:30 AM – 8:00 PM IST (24/7 RFQ Portal Active)</p>
                </div>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#1E2340]">Central Yard & Stocking Location</div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#F5F6F8] aspect-16/9 flex flex-col items-center justify-center p-4 text-center group">
                <div className="w-10 h-10 rounded-full bg-[#1A2A6C] text-white flex items-center justify-center shadow-lg mb-2 border border-white/30">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-xs font-extrabold text-[#1A2A6C]">Confio Engineering Solution Pvt. Ltd.</div>
                <div className="text-[10px] text-slate-500">Bhosari, Pimpri-Chinchwad, Maharashtra</div>  <a
                 href="https://www.google.com/maps/place/Confio+Engineering+Solution+Private+Limited/@18.6231678,73.8397575,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b87dfaa1da55:0xc2e086ac43a91b8c!8m2!3d18.6231678!4d73.8423324!16s%2Fg%2F11fzf8krlf?entry=ttu&g_ep=EgoyMDI2MDcyOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3 py-1.5 rounded-full bg-[#1A2A6C] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs hover:bg-[#14205C] transition-colors border border-[#2E4BC7]/30"
                >
                  <span className="text-white">View on Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Send Request For Quote (RFQ) Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="inline-block px-3 py-1 rounded-full bg-[#1A2A6C] text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                  DIRECT MILL RFQ FORM
                </div>
                <span className="text-[11px] font-bold text-[#1A2A6C] bg-[#F5F6F8] px-2.5 py-1 rounded-full border border-slate-200">
                  Avg. Response: &lt; 60 Mins
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#1A2A6C] mt-2">
                Send Request For Quote (RFQ)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Fill in your BOQ or material specifications to receive binding mill pricing and delivery lead times.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="r.chandra@company.com"
                    value={formData.workEmail}
                    onChange={e => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98200 12345"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Godrej Heavy Structures Ltd"
                    value={formData.companyName}
                    onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Category</label>
                  <select
                    value={formData.productCategory}
                    onChange={e => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
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
                    placeholder="e.g. 50 MT / 1000 Pcs"
                    value={formData.estimatedQuantity}
                    onChange={e => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Specifications / Requirement</label>
                <textarea
                  rows={3}
                  placeholder="Include material grades (e.g. ASTM A106 Gr B, AA 6061-T6), dimensions, wall thickness, surface finishes, or delivery site location..."
                  value={formData.specifications}
                  onChange={e => setFormData({ ...formData, specifications: e.target.value })}
                  className="w-full bg-[#F5F6F8] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
                />
              </div>

              {/* Drag and drop file upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Attach CAD Drawing / Spec Sheet</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-[#1A2A6C] bg-[#1A2A6C]/5' : 'border-slate-300 bg-[#F5F6F8] hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="file"
                    id="contact-file-input"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.step,.stp,.dxf,.dwg,.sldprt,.xlsx,.zip"
                  />
                  <label htmlFor="contact-file-input" className="cursor-pointer flex flex-col items-center justify-center">
                    {formData.fileName ? (
                      <div className="flex items-center gap-2 text-[#1A2A6C] font-bold text-xs">
                        <FileCheck className="w-5 h-5 text-[#1A2A6C]" />
                        <span>Attached: {formData.fileName}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-xs font-semibold text-slate-700">Drag & drop CAD drawing or click to browse</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">Supports PDF, STEP, DXF, DWG, SLDPRT up to 50MB</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-[#2E4BC7]/30"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Submit Request for Quotation</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

