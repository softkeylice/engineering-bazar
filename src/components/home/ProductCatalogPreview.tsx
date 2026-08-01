import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, ShieldCheck, Eye, FileText, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES_LIST } from '../../data/mockData';
import { Product } from '../../types';

interface ProductCatalogPreviewProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ?: (productName?: string) => void;
}

export const ProductCatalogPreview: React.FC<ProductCatalogPreviewProps> = ({
  onSelectProduct,
  onOpenRFQ
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = selectedCategory === 'All Products' || p.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(p.specifications).some(val => val && val.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <section id="catalog-section" className="py-20 bg-[#F5F6F8] text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold tracking-widest text-[#1A2A6C] uppercase mb-2 block">
            OUR PRODUCTS CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2A6C] tracking-tight">
            Industrial Raw Materials & Components
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse certified primary steel, non-ferrous alloys, high-tensile fasteners, industrial valves, and precision 5-axis CNC components with instant MTC availability.
          </p>
        </div>

        {/* Search Bar & Horizontal Pill Filters */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0B2A7A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by grade, material, pipe, sheet, fastener (e.g. ASTM A106, 6061-T6, SS316L)..."
              className="w-full bg-white border border-slate-300 rounded-full pl-12 pr-4 py-3.5 text-xs sm:text-sm font-medium text-[#1E2340] placeholder-slate-400 focus:outline-none focus:border-[#1A2A6C] focus:ring-1 focus:ring-[#1A2A6C] shadow-xs transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES_LIST.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#1A2A6C] text-white border-[#1A2A6C] shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#1A2A6C] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid (4 columns desktop) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 hover:border-[#2E4BC7]"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="relative aspect-4/3 bg-slate-50 overflow-hidden block flex items-center justify-center p-2 border-b border-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#1A2A6C]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs z-10">
                    {product.millPartner}
                  </div>
                  {product.isFeatured && (
                    <div className="absolute top-2.5 right-2.5 bg-[#0B2A7A] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs z-10">
                      Featured
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#1A2A6C] mb-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A7A]"></span>
                      <span>{product.category}</span>
                    </div>
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-sm font-bold text-[#1A2A6C] line-clamp-1 group-hover:text-[#2E4BC7] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* 2-Column Spec List */}
                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-[#F5F6F8] p-2.5 rounded-xl border border-slate-200/60">
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Grade / Standard</span>
                        <span className="font-bold text-[#1E2340] line-clamp-1">{product.specifications.grade || product.specifications.standard || 'Standard Grade'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase font-bold">Dimensions / Spec</span>
                        <span className="font-bold text-[#1E2340] line-clamp-1">{product.specifications.dimensions || 'Custom Spec'}</span>
                      </div>
                    </div>

                    {/* Price & MOQ */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-base font-black text-[#1A2A6C]">₹{product.pricePerUnit.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-500 font-medium"> /{product.unit}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        MOQ: {product.moq}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full py-2.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-white" />
                      <span>View Details</span>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">No products found matching your search query.</p>
            <button
              onClick={() => { setSelectedCategory('All Products'); setSearchQuery(''); }}
              className="mt-3 px-5 py-2 bg-[#1A2A6C] text-white text-xs font-bold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Catalog CTA Footer */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs sm:text-sm font-extrabold tracking-wide transition-all shadow-lg hover:shadow-xl border border-[#2E4BC7]/30"
          >
            <ArrowRight className="w-4 h-4 text-white" />
            <span>Explore Complete Shop Catalog (10,000+ SKUs)</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

