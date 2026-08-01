import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, RotateCcw, Filter, X } from 'lucide-react';
import { FilterState } from '../../types';
import {
  CATEGORIES_LIST,
  CATEGORY_TAXONOMY,
  MATERIAL_GRADES_LIST,
  MILL_PARTNERS_LIST,
  SURFACE_FINISHES_LIST,
  PRODUCTS
} from '../../data/mockData';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  isMobileDrawer,
  onCloseMobileDrawer
}) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    stock: true,
    grade: true,
    mill: true,
    finish: true,
    origin: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryToggle = (cat: string) => {
    let updated: string[];
    if (cat === 'All Products') {
      updated = ['All Products'];
    } else {
      const currentWithoutAll = filters.selectedCategories.filter(c => c !== 'All Products');
      if (currentWithoutAll.includes(cat)) {
        updated = currentWithoutAll.filter(c => c !== cat);
        if (updated.length === 0) updated = ['All Products'];
      } else {
        updated = [...currentWithoutAll, cat];
      }
    }
    onChange({ ...filters, selectedCategories: updated });
  };

  const handleCheckboxToggle = (
    field: keyof FilterState,
    value: string
  ) => {
    const list = (filters[field] as string[]) || [];
    const updated = list.includes(value)
      ? list.filter(v => v !== value)
      : [...list, value];
    onChange({ ...filters, [field]: updated });
  };

  const handleSubcategoryToggle = (subcat: string) => {
    const current = filters.selectedSubcategories || [];
    const updated = current.includes(subcat)
      ? current.filter(s => s !== subcat)
      : [...current, subcat];
    onChange({ ...filters, selectedSubcategories: updated });
  };

  // calculate count per category
  const getCategoryCount = (cat: string) => {
    if (cat === 'All Products') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === cat).length;
  };

  const getSubcategoryCount = (subcat: string) => {
    return PRODUCTS.filter(p => p.subcategory === subcat).length;
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 ${
      isMobileDrawer ? 'h-full overflow-y-auto' : ''
    }`}>
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#1A2A6C]" />
          <h3 className="text-sm font-extrabold text-[#1A2A6C]">Filter Catalog</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="text-[11px] font-semibold text-slate-500 hover:text-[#1A2A6C] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-[#1A2A6C]" />
            <span>Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Keyword Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">Keyword Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={e => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search specs, grade, SKU..."
            className="w-full bg-[#F5F6F8] border border-slate-300 rounded-full pl-9 pr-3 py-2 text-xs font-medium text-[#1E2340] placeholder-slate-400 focus:outline-none focus:border-[#1A2A6C]"
          />
        </div>
      </div>

      {/* 1. Categories */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Categories</span>
          {openSections.categories ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.categories && (
          <div className="mt-2.5 space-y-2 max-h-72 overflow-y-auto pr-1">
            {/* All Products */}
            <label className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-1 border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes('All Products')}
                  onChange={() => handleCategoryToggle('All Products')}
                  className="rounded border-slate-300 text-[#0B2A7A] focus:ring-[#0B2A7A]"
                />
                <span className={filters.selectedCategories.includes('All Products') ? 'font-bold text-[#0B2A7A]' : 'font-medium'}>
                  All Products
                </span>
              </div>
              <span className="text-[10px] text-[#0B2A7A] font-bold bg-[#F5F6F8] border border-slate-200 px-1.5 py-0.5 rounded-full">
                {PRODUCTS.length}
              </span>
            </label>

            {/* Main Categories & Subcategories */}
            {CATEGORY_TAXONOMY.map((catObj) => {
              const cat = catObj.name;
              const checked = filters.selectedCategories.includes(cat);
              const count = getCategoryCount(cat);
              return (
                <div key={cat} className="space-y-1">
                  <label className="flex items-center justify-between text-xs text-slate-700 hover:text-slate-900 cursor-pointer py-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCategoryToggle(cat)}
                        className="rounded border-slate-300 text-[#0B2A7A] focus:ring-[#0B2A7A]"
                      />
                      <span className={checked ? 'font-bold text-[#0B2A7A]' : 'font-semibold text-slate-800'}>{cat}</span>
                    </div>
                    <span className="text-[10px] text-[#0B2A7A] font-bold bg-[#F5F6F8] border border-slate-200 px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>

                  {/* Subcategories (visible if category checked or selected) */}
                  {checked && catObj.subcategories.length > 0 && (
                    <div className="pl-6 space-y-1 py-1 border-l-2 border-[#0B2A7A]/20 ml-2">
                      {catObj.subcategories.map((subcat) => {
                        const subChecked = (filters.selectedSubcategories || []).includes(subcat);
                        const subCount = getSubcategoryCount(subcat);
                        return (
                          <label key={subcat} className="flex items-center justify-between text-[11px] text-slate-600 hover:text-[#0B2A7A] cursor-pointer py-0.5">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="checkbox"
                                checked={subChecked}
                                onChange={() => handleSubcategoryToggle(subcat)}
                                className="rounded border-slate-300 text-[#0B2A7A] focus:ring-[#0B2A7A] w-3 h-3"
                              />
                              <span className={subChecked ? 'font-bold text-[#0B2A7A]' : ''}>{subcat}</span>
                            </div>
                            {subCount > 0 && (
                              <span className="text-[9px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-full">
                                {subCount}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Max Price (₹)</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.price && (
          <div className="mt-3 space-y-2">
            <input
              type="range"
              min="50"
              max="10000"
              step="100"
              value={filters.maxPrice}
              onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#1A2A6C]"
            />
            <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
              <span>Min: ₹50</span>
              <span className="text-[#1A2A6C] font-black">Up to ₹{filters.maxPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Stock Availability */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('stock')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Stock Availability</span>
          {openSections.stock ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.stock && (
          <div className="mt-2.5 space-y-2 text-xs text-slate-700">
            {['Ready Stock (24–48h Dispatch)', 'Custom Mill Order (2–6 weeks)'].map((st) => (
              <label key={st} className="flex items-start gap-2 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.stockAvailability.includes(st)}
                  onChange={() => handleCheckboxToggle('stockAvailability', st)}
                  className="rounded border-slate-300 text-[#1A2A6C] focus:ring-[#1A2A6C] mt-0.5"
                />
                <span className="leading-tight">{st}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Material Grade */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('grade')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Material Grade</span>
          {openSections.grade ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.grade && (
          <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            {MATERIAL_GRADES_LIST.map((grade) => (
              <label key={grade} className="flex items-center gap-2 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.materialGrades.includes(grade)}
                  onChange={() => handleCheckboxToggle('materialGrades', grade)}
                  className="rounded border-slate-300 text-[#1A2A6C] focus:ring-[#1A2A6C]"
                />
                <span>{grade}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 5. Mill Partner / Brand */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('mill')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Mill Partner / Brand</span>
          {openSections.mill ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.mill && (
          <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            {MILL_PARTNERS_LIST.map((mill) => (
              <label key={mill} className="flex items-center gap-2 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.millPartners.includes(mill)}
                  onChange={() => handleCheckboxToggle('millPartners', mill)}
                  className="rounded border-slate-300 text-[#1A2A6C] focus:ring-[#1A2A6C]"
                />
                <span>{mill}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 6. Surface Finish */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={() => toggleSection('finish')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Surface Finish</span>
          {openSections.finish ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.finish && (
          <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            {SURFACE_FINISHES_LIST.map((finish) => (
              <label key={finish} className="flex items-center gap-2 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.surfaceFinishes.includes(finish)}
                  onChange={() => handleCheckboxToggle('surfaceFinishes', finish)}
                  className="rounded border-slate-300 text-[#1A2A6C] focus:ring-[#1A2A6C]"
                />
                <span>{finish}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 7. Country of Origin */}
      <div className="border-t border-slate-100 pt-4 pb-2">
        <button
          onClick={() => toggleSection('origin')}
          className="w-full flex items-center justify-between text-xs font-bold text-[#1E2340] py-1"
        >
          <span>Country of Origin</span>
          {openSections.origin ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.origin && (
          <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
            {['Made in India', 'Imported'].map((origin) => (
              <label key={origin} className="flex items-center gap-2 cursor-pointer py-0.5">
                <input
                  type="checkbox"
                  checked={filters.countriesOfOrigin.includes(origin)}
                  onChange={() => handleCheckboxToggle('countriesOfOrigin', origin)}
                  className="rounded border-slate-300 text-[#1A2A6C] focus:ring-[#1A2A6C]"
                />
                <span>{origin}</span>
              </label>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

