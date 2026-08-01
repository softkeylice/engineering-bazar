import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  Truck,
  Award,
  Filter,
  LayoutGrid,
  List,
  Star,
  Plus,
  ShoppingBag,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Check,
  Layers
} from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { Product, FilterState } from '../../types';
import { FilterSidebar } from './FilterSidebar';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ: (productName?: string) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProducts: Product[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onOpenRFQ,
  onAddToCart,
  onBuyNow,
  onToggleCompare,
  comparedProducts
}) => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialSearch,
    selectedCategories: categoryParam ? [categoryParam] : ['All Products'],
    selectedSubcategories: [],
    maxPrice: 10000,
    stockAvailability: [],
    materialGrades: [],
    millPartners: [],
    surfaceFinishes: [],
    countriesOfOrigin: [],
    sortBy: 'newest'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (initialSearch) {
      setFilters(prev => ({ ...prev, searchQuery: initialSearch }));
    }
    if (categoryParam) {
      setFilters(prev => ({ ...prev, selectedCategories: [categoryParam] }));
    }
  }, [initialSearch, categoryParam]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategories: ['All Products'],
      selectedSubcategories: [],
      maxPrice: 10000,
      stockAvailability: [],
      materialGrades: [],
      millPartners: [],
      surfaceFinishes: [],
      countriesOfOrigin: [],
      sortBy: 'newest'
    });
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredProducts = PRODUCTS.filter((p) => {
    // search query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const nameMatch = p.name.toLowerCase().includes(q);
      const catMatch = p.category.toLowerCase().includes(q);
      const descMatch = p.shortDescription.toLowerCase().includes(q);
      const specMatch = Object.values(p.specifications).some(val => val && val.toLowerCase().includes(q));
      if (!nameMatch && !catMatch && !descMatch && !specMatch) return false;
    }

    // category
    if (!filters.selectedCategories.includes('All Products')) {
      if (!filters.selectedCategories.includes(p.category)) return false;
    }

    // subcategory
    if (filters.selectedSubcategories && filters.selectedSubcategories.length > 0) {
      if (!p.subcategory || !filters.selectedSubcategories.includes(p.subcategory)) return false;
    }

    // max price
    if (p.pricePerUnit > filters.maxPrice) return false;

    // stock availability
    if (filters.stockAvailability.length > 0) {
      if (!filters.stockAvailability.includes(p.stockAvailability)) return false;
    }

    // material grades
    if (filters.materialGrades.length > 0) {
      if (!filters.materialGrades.includes(p.materialGradeGroup)) return false;
    }

    // mill partners
    if (filters.millPartners.length > 0) {
      if (!filters.millPartners.includes(p.millPartner)) return false;
    }

    // surface finish
    if (filters.surfaceFinishes.length > 0) {
      if (!filters.surfaceFinishes.includes(p.surfaceFinishGroup)) return false;
    }

    // origin
    if (filters.countriesOfOrigin.length > 0) {
      if (!filters.countriesOfOrigin.includes(p.countryOfOrigin)) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-low') return a.pricePerUnit - b.pricePerUnit;
    if (filters.sortBy === 'price-high') return b.pricePerUnit - a.pricePerUnit;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    return 0; // newest / default
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleQuickTagClick = (tag: string) => {
    setFilters(prev => ({ ...prev, searchQuery: tag }));
  };

  return (
    <div className="bg-[#F5F6F8] min-h-screen pb-20">
      
      {/* 1. HEADER BANNER */}
      <div className="bg-[#1A2A6C] text-white py-12 border-b border-[#2E4BC7]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="text-xs text-slate-300 font-medium mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-bold">Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Industrial Engineering Products
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Direct mill stock allocations of seamless carbon steel pipes, aerospace aluminum plates, high-tensile fasteners, spherical bearings, and precision 5-axis CNC machined parts.
          </p>

          {/* Trust Badge Row */}
          <div className="mt-6 pt-6 border-t border-[#2E4BC7]/30 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2 bg-[#14205C] px-3.5 py-2 rounded-full border border-[#2E4BC7]/30">
              <Award className="w-4 h-4 text-white" />
              <span><strong>10,000+ SKU</strong> Certified Items</span>
            </div>
            <div className="flex items-center gap-2 bg-[#14205C] px-3.5 py-2 rounded-full border border-[#2E4BC7]/30">
              <Truck className="w-4 h-4 text-white" />
              <span><strong>Pan-India 24–48h</strong> Backyard Dispatch</span>
            </div>
            <div className="flex items-center gap-2 bg-[#14205C] px-3.5 py-2 rounded-full border border-[#2E4BC7]/30">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span><strong>100% MTC Traceability</strong> (Mill Certified)</span>
            </div>
          </div>

          {/* Instant Material & Spec Finder Card */}
          <div className="mt-8 bg-[#14205C] p-5 rounded-2xl border border-[#2E4BC7]/30 shadow-xl max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>INSTANT MATERIAL & SPEC FINDER</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={filters.searchQuery}
                  onChange={e => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  placeholder="Enter grade or spec (e.g., Seamless Pipe, Aluminium 6061, MS Steel Rod, SS316)..."
                  className="w-full bg-[#1A2A6C] border border-[#2E4BC7]/40 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white"
                />
              </div>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#1A2A6C] text-xs font-extrabold transition-all shrink-0 shadow-sm"
              >
                Search
              </button>
            </div>

            {/* Quick Pick Tag Buttons */}
            <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] text-slate-300 font-semibold">Quick Picks:</span>
              {['Seamless Pipe', 'Aluminium 6061', 'MS Steel Rod', 'SS 316L', 'Grade 10.9 Bolts', 'Spherical Bearings'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-3 py-1 rounded-full bg-[#1A2A6C] hover:bg-white hover:text-[#1A2A6C] text-slate-200 text-[11px] font-medium transition-colors border border-[#2E4BC7]/30"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. TWO-COLUMN LAYOUT BELOW BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar "Filter Catalog" (Desktop) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Top Bar Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Left Info & Mobile Filter Trigger */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden px-3.5 py-2 rounded-full bg-[#1A2A6C] text-white text-xs font-bold flex items-center gap-1.5 border border-[#2E4BC7]/30"
                >
                  <Filter className="w-4 h-4 text-white" />
                  <span>Filters</span>
                </button>

                <div className="text-xs text-slate-700 font-medium">
                  Showing <strong className="text-[#1A2A6C]">{paginatedProducts.length}</strong> of{' '}
                  <strong className="text-[#1A2A6C]">{sortedProducts.length}</strong> Certified Products
                </div>
              </div>

              {/* Right Controls: Compare, Sort By, Grid/List Toggle */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
                
                {/* Compare Toggle Pill */}
                <div className="px-3.5 py-1.5 rounded-full bg-[#1A2A6C] border border-[#2E4BC7]/30 text-white font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-white" />
                  <span>Compare ({comparedProducts.length})</span>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-1">
                  <span className="text-slate-500 font-semibold hidden sm:inline">Sort By:</span>
                  <select
                    value={filters.sortBy}
                    onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="bg-[#F5F6F8] border border-slate-300 rounded-full px-3 py-1.5 text-xs font-semibold text-[#1E2340] focus:outline-none focus:border-[#1A2A6C]"
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-[#F5F6F8] p-1 rounded-full border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-full transition-colors ${
                      viewMode === 'grid' ? 'bg-[#1A2A6C] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-label="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-full transition-colors ${
                      viewMode === 'list' ? 'bg-[#1A2A6C] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-label="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Product Cards Grid or List */}
            {paginatedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {paginatedProducts.map((product) => {
                  const isCompared = comparedProducts.some(c => c.id === product.id);

                  if (viewMode === 'list') {
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col md:flex-row items-center gap-6 group hover:border-[#2E4BC7]/60"
                      >
                        <Link to={`/product/${product.id}`} className="w-full md:w-48 aspect-4/3 rounded-xl overflow-hidden bg-slate-50 shrink-0 relative block flex items-center justify-center p-2 border border-slate-100">
                          <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                          <div className="absolute top-2 left-2 bg-[#1A2A6C] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full z-10">
                            Verified Supplier
                          </div>
                        </Link>

                        <div className="flex-1 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#1A2A6C] uppercase flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1A2A6C]"></span>
                              <span>{product.category}</span>
                            </span>
                            <div className="flex items-center gap-1 text-[#1A2A6C] font-bold">
                              <Star className="w-3.5 h-3.5 fill-[#1A2A6C] text-[#1A2A6C]" />
                              <span>{product.rating}</span>
                              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
                            </div>
                          </div>

                          <Link to={`/product/${product.id}`} className="block">
                            <h3 className="text-base font-bold text-[#1A2A6C] group-hover:text-[#2E4BC7] transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          <p className="text-slate-600 line-clamp-2 leading-relaxed">
                            {product.fullDescription}
                          </p>

                          <div className="text-[11px] font-semibold text-[#1E2340] bg-[#F5F6F8] p-2 rounded-xl border border-slate-200/60 flex items-center justify-between">
                            <span>Spec: <strong>{product.specifications.grade || product.specifications.standard || 'Certified'}</strong></span>
                            <span>Mill: <strong>{product.millPartner}</strong></span>
                            <span>MOQ: <strong>{product.moq}</strong></span>
                          </div>
                        </div>

                        <div className="w-full md:w-48 md:border-l md:border-slate-200 md:pl-6 flex flex-col justify-between shrink-0 space-y-3">
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-extrabold text-[#1A2A6C]">₹{product.pricePerUnit.toLocaleString('en-IN')}</span>
                              <span className="text-[10px] text-slate-500 font-medium">/{product.unit}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 block mt-0.5">per unit cost</span>
                          </div>

                          <div className="space-y-1.5">
                            <button
                              onClick={() => onAddToCart(product)}
                              className="w-full py-2 rounded-full border border-[#1A2A6C] text-[#1A2A6C] hover:bg-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 text-[#1A2A6C]" />
                              <span>Add to Cart</span>
                            </button>
                            <button
                              onClick={() => onBuyNow(product)}
                              className="w-full py-2 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
                            >
                              <span>Buy Now</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  }

                  // Grid View Card
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1 hover:border-[#2E4BC7]/60"
                    >
                      {/* Image & Badges */}
                      <Link to={`/product/${product.id}`} className="relative aspect-4/3 bg-slate-50 overflow-hidden block flex items-center justify-center p-2 border-b border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-[#1A2A6C]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs z-10">
                          Verified Supplier
                        </div>
                        
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleCompare(product); }}
                          className={`absolute top-2.5 right-2.5 p-1.5 px-2.5 rounded-full text-[10px] font-bold transition-all shadow-md flex items-center gap-1 z-10 ${
                            isCompared
                              ? 'bg-[#1A2A6C] text-white'
                              : 'bg-white/90 backdrop-blur-xs text-slate-700 hover:bg-white'
                          }`}
                          title="Compare specifications"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>{isCompared ? 'Added' : 'Compare'}</span>
                        </button>
                      </Link>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                            <span className="uppercase text-[#1A2A6C] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1A2A6C]"></span>
                              <span>{product.category}</span>
                            </span>
                            <div className="flex items-center gap-1 text-[#1A2A6C]">
                              <Star className="w-3 h-3 fill-[#1A2A6C] text-[#1A2A6C]" />
                              <span>{product.rating}</span>
                              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                            </div>
                          </div>

                          <Link to={`/product/${product.id}`} className="block">
                            <h3 className="text-sm font-bold text-[#1A2A6C] line-clamp-1 hover:text-[#2E4BC7] transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Spec Line */}
                          <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1 bg-[#F5F6F8] p-1.5 rounded-xl border border-slate-200/60">
                            Spec: {product.specifications.grade || product.specifications.standard || 'ASME/ASTM Certified'}
                          </p>

                          {/* Price in ₹ */}
                          <div className="mt-3 flex items-baseline justify-between">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-extrabold text-[#1A2A6C]">
                                  ₹{product.pricePerUnit.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">/{product.unit}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 block">per unit cost</span>
                            </div>

                            {product.originalPrice && (
                              <div className="text-right">
                                <span className="text-xs text-slate-400 line-through block">₹{product.originalPrice}</span>
                                <span className="text-[10px] font-extrabold text-[#1A2A6C] bg-[#F5F6F8] px-2 py-0.5 rounded-full border border-slate-200">
                                  12% OFF
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mt-2 text-[11px] text-slate-600 font-medium">
                            MOQ: <strong className="text-slate-900">{product.moq}</strong>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => onAddToCart(product)}
                              className="px-2.5 py-2.5 rounded-full border border-[#1A2A6C] text-[#1A2A6C] hover:bg-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 text-[#1A2A6C]" />
                              <span>Add Cart</span>
                            </button>

                            <button
                              onClick={() => onBuyNow(product)}
                              className="px-2.5 py-2.5 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                            >
                              <span>Buy Now</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">No products found matching the selected filter criteria.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2.5 rounded-full bg-[#1A2A6C] text-white text-xs font-bold shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3.5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-full font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#1A2A6C] text-white shadow-md'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3.5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50 text-slate-700 font-semibold flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-start bg-slate-900/70 backdrop-blur-xs">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl p-4 overflow-y-auto">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleResetFilters}
              isMobileDrawer
              onCloseMobileDrawer={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

    </div>
  );
};

