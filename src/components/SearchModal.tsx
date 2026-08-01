import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
        Object.values(p.specifications).some(val => val && val.toLowerCase().includes(query.toLowerCase()))
      );

  const handleQuickTagClick = (tag: string) => {
    navigate(`/shop?search=${encodeURIComponent(tag)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/70 backdrop-blur-xs pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-150">
        
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-[#F5F6F8]">
          <Search className="w-5 h-5 text-[#F4B93E] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by grade (e.g. 6061-T6, ASTM A106, SS316L, IS 2062)..."
            autoFocus
            className="w-full bg-transparent text-sm font-medium text-[#1E2340] placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs text-slate-500 font-semibold px-2.5 py-1 rounded-full bg-slate-200 hover:bg-slate-300">
            Esc
          </button>
        </div>

        {/* Quick Picks if empty */}
        {query.trim() === '' ? (
          <div className="p-5">
            <div className="text-[11px] font-extrabold text-[#1A2A6C] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4B93E]"></span>
              <span>Popular Material Grade Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Seamless Pipe', 'Aluminium 6061-T6', 'IS 2062 Plates', 'SS 316L Rods', 'High Tensile 10.9 Bolts', 'Spherical Bearings', '5-Axis CNC'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F5F6F8] hover:bg-[#1A2A6C] hover:text-[#F4B93E] text-[#1E2340] text-xs font-medium transition-colors border border-slate-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
            {filtered.length > 0 ? (
              filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                    onClose();
                  }}
                  className="p-4 hover:bg-[#F5F6F8] transition-colors cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-10 h-10 object-cover rounded-xl border" />
                    <div>
                      <div className="text-xs font-bold text-[#1E2340] group-hover:text-[#1A2A6C]">{prod.name}</div>
                      <div className="text-[11px] text-slate-500">{prod.category} • {prod.millPartner}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#1A2A6C]">₹{prod.pricePerUnit}/{prod.unit}</span>
                    <ArrowRight className="w-4 h-4 text-[#F4B93E] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                No matching materials or grades found for "{query}".
                <button
                  onClick={() => {
                    navigate(`/shop?search=${encodeURIComponent(query)}`);
                    onClose();
                  }}
                  className="block mx-auto mt-2 text-[#1A2A6C] font-extrabold underline"
                >
                  Search in Full Shop Catalog
                </button>
              </div>
            )}
          </div>
        )}

        <div className="bg-[#F5F6F8] px-4 py-2 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-between font-medium">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F4B93E]" />
            Direct Mill Inventory Search
          </span>
          <span>Press ESC to exit</span>
        </div>

      </div>
    </div>
  );
};

