import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Plus,
  Minus,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  Award,
  Truck,
  Star,
  Layers,
  ArrowLeft,
  MessageCircle,
  Facebook,
  Twitter,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

interface ProductDetailPageProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
  onOpenRFQ?: (productName?: string) => void;
  onDownloadSpec?: (productName: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onAddToCart,
  onBuyNow,
  onOpenRFQ,
  onDownloadSpec
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find product by id
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  // Quantity stepper state
  const [quantity, setQuantity] = useState<number>(1);

  // Key Features Collapsible state
  const [featuresExpanded, setFeaturesExpanded] = useState<boolean>(true);

  // Active Main Image (for multi-image gallery support)
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Link Copied State
  const [copied, setCopied] = useState<boolean>(false);

  // Scroll to top on id change & reset quantity/active image
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setQuantity(1);
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#F7F8FA]">
        <AlertCircle className="w-16 h-16 text-[#0B2A7A] mb-4" />
        <h2 className="text-2xl font-black text-[#0B2A7A]">Product Not Found</h2>
        <p className="text-slate-600 mt-2 text-sm max-w-md">
          The item you requested is either unavailable or has been re-indexed in our   catalog.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-6 py-3 rounded-full bg-[#0B2A7A] text-white text-xs font-bold hover:bg-[#08205C] transition-all flex items-center gap-2 shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Full Shop Catalog</span>
        </Link>
      </div>
    );
  }

  // Category Prev & Next Navigation
  const categoryProducts = PRODUCTS.filter((p) => p.category === product.category);
  const currentIndex = categoryProducts.findIndex((p) => p.id === product.id);
  const prevIndex = (currentIndex - 1 + categoryProducts.length) % categoryProducts.length;
  const nextIndex = (currentIndex + 1) % categoryProducts.length;
  const prevProduct = categoryProducts[prevIndex] || PRODUCTS[0];
  const nextProduct = categoryProducts[nextIndex] || PRODUCTS[0];

  // Images for thumbnail strip (Main image + 2 alternate detail views)
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  ];

  // Dynamic Specs Extraction
  const dynamicSpecsList: { label: string; value: string }[] = [];

  // Add specifications dictionary entries if present
  if (product.specifications) {
    Object.entries(product.specifications).forEach(([k, v]) => {
      if (v) {
        // Format camelCase key to Capital Words
        const formattedLabel = k
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        dynamicSpecsList.push({ label: formattedLabel, value: v });
      }
    });
  }

  // Add key structural metadata if present
  if (product.category) dynamicSpecsList.push({ label: 'Category', value: product.category });
  if (product.subcategory) dynamicSpecsList.push({ label: 'Subcategory', value: product.subcategory });
  if (product.millPartner) dynamicSpecsList.push({ label: 'Mill Partner / Producer', value: product.millPartner });
  if (product.stockAvailability) dynamicSpecsList.push({ label: 'Stock Status', value: product.stockAvailability });
  if (product.moq) dynamicSpecsList.push({ label: 'Minimum Order Quantity', value: product.moq });
  if (product.materialGradeGroup) dynamicSpecsList.push({ label: 'Material Grade Group', value: product.materialGradeGroup });
  if (product.surfaceFinishGroup) dynamicSpecsList.push({ label: 'Surface Finish', value: product.surfaceFinishGroup });
  if (product.countryOfOrigin) dynamicSpecsList.push({ label: 'Country of Origin', value: product.countryOfOrigin });

  // Key Features / Advantages Bulleted List
  const keyAdvantages = [
    '100% EN 10204 3.1 Mill Test Certificate (MTC) with heat numbers included.',
    'Hydrostatic and Ultrasonic Non-Destructive Testing (NDT) certified.',
    'Direct primary mill contract pricing without intermediary trading markups.',
    'Custom cut-to-length, precision shearing, and edge prep beveling on request.',
    'Pan-India flatbed logistics with 24–48 hour dispatch from regional stockyards.',
    'Full traceability and compliance with ISO / ASME / BIS industrial standards.'
  ];

  const skuCode = `EB-${product.id.toUpperCase().replace('PROD-', 'SKU-00')}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleQuantityChange = (val: number) => {
    if (isNaN(val) || val < 1) {
      setQuantity(1);
    } else {
      setQuantity(val);
    }
  };

  return (
    <div className="bg-[#F7F8FA] min-h-screen py-8 text-[#1E2340]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Header Row: Breadcrumb on Left, Prev/Next Navigation on Right */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
            <Link to="/" className="hover:text-[#0B2A7A] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#0B2A7A] transition-colors">Shop</Link>
            <span>/</span>
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#0B2A7A] transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#0B2A7A] font-extrabold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Prev / Next Links */}
          <div className="flex items-center gap-4 text-xs font-bold text-slate-700 self-end sm:self-auto">
            <Link
              to={`/product/${prevProduct.id}`}
              className="flex items-center gap-1 hover:text-[#0B2A7A] transition-colors bg-[#F5F6F8] px-3 py-1.5 rounded-full border border-slate-200"
              title={`Previous: ${prevProduct.name}`}
            >
              <ChevronLeft className="w-4 h-4 text-[#0B2A7A]" />
              <span className="hidden md:inline">Prev Product</span>
              <span className="md:hidden">Prev</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to={`/product/${nextProduct.id}`}
              className="flex items-center gap-1 hover:text-[#0B2A7A] transition-colors bg-[#F5F6F8] px-3 py-1.5 rounded-full border border-slate-200"
              title={`Next: ${nextProduct.name}`}
            >
              <span className="hidden md:inline">Next Product</span>
              <span className="md:hidden">Next</span>
              <ChevronRight className="w-4 h-4 text-[#0B2A7A]" />
            </Link>
          </div>

        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT COLUMN: Large Image Container, Thumbnail Strip, & Technical Specs below */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Image Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm relative overflow-hidden">
              
              {/* Primary Image Display */}
              <div className="aspect-4/3 w-full bg-slate-50 rounded-xl overflow-hidden relative group flex items-center justify-center p-3 border border-slate-100">
                <img
                  src={galleryImages[activeImageIndex] || product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                  <span className="bg-[#0B2A7A] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                    {product.millPartner} Certified
                  </span>
                  {product.isFeatured && (
                    <span className="bg-[#2E4BC7] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
                      Featured OEM Material
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 z-10 pointer-events-none">
                  <span className="bg-white/95 backdrop-blur-xs text-[#0B2A7A] text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md border border-slate-200">
                    {product.stockAvailability}
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all p-1 bg-slate-50 flex items-center justify-center ${
                      activeImageIndex === idx
                        ? 'border-[#0B2A7A] shadow-md ring-2 ring-[#0B2A7A]/20 scale-[1.02]'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} view ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-contain rounded-lg" />
                  </button>
                ))}
              </div>

            </div>

            {/* TECHNICAL SPECIFICATIONS LIST (Below Image in Left Column) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0B2A7A]" />
                  <h3 className="text-base font-extrabold text-[#0B2A7A]">Technical Specifications</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#F5F6F8] px-2.5 py-1 rounded-full border border-slate-200">
                  Data-Driven Specs
                </span>
              </div>

              {/* Spec Rows */}
              <div className="divide-y divide-slate-100 text-xs">
                {dynamicSpecsList.map((spec, index) => (
                  <div key={index} className="py-2.5 flex items-center justify-between gap-4 hover:bg-slate-50/80 px-2 rounded-lg transition-colors">
                    <span className="font-semibold text-slate-600 shrink-0 w-1/2">{spec.label}</span>
                    <span className="font-bold text-[#1E2340] text-right w-1/2 break-words">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Action for MTC Download */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#0B2A7A]" />
                  100% EN 10204 3.1 MTC Traceable
                </span>
                <button
                  onClick={() => onDownloadSpec && onDownloadSpec(product.name)}
                  className="text-xs font-bold text-[#0B2A7A] hover:underline flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Spec Sheet</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Heading, SKU, Price, Stepper, Add to Cart, Features Collapsible, Social Share */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Top Meta: Title & SKU */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#0B2A7A]/10 text-[#0B2A7A] text-[10px] font-extrabold uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
                    SKU: {skuCode}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A7A] tracking-tight leading-snug">
                  {product.name}
                </h1>

                {/* Rating & Mill Badge */}
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <div className="flex items-center gap-1 bg-[#F5F6F8] px-2.5 py-1 rounded-full border border-slate-200 font-bold text-[#0B2A7A]">
                    <Star className="w-3.5 h-3.5 fill-[#0B2A7A] text-[#0B2A7A]" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-normal">({product.reviewsCount}   Reviews)</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-slate-700">Mill: {product.millPartner}</span>
                </div>
              </div>

              {/* Price Row */}
              <div className="bg-[#F7F8FA] p-4 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Direct Mill Contract Rate
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through font-semibold">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-3xl font-black text-[#0B2A7A]">
                    ₹{product.pricePerUnit.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-bold text-slate-600">
                    / {product.unit}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                      SAVE {Math.round(((product.originalPrice - product.pricePerUnit) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-medium pt-1 flex items-center justify-between">
                  <span>Excl. 18% GST • Minimum Order: <strong className="text-slate-800">{product.moq}</strong></span>
                  <span className="text-[#0B2A7A] font-bold">24-48h Yard Dispatch</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.fullDescription || product.shortDescription}
              </p>

              {/* Quantity Selector Stepper */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">
                  Quantity Required ({product.unit}s):
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-300 rounded-full bg-white overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-3 text-slate-600 hover:text-[#0B2A7A] hover:bg-slate-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-16 text-center text-sm font-extrabold text-[#0B2A7A] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3 text-slate-600 hover:text-[#0B2A7A] hover:bg-slate-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-600">
                    Est. Total: <span className="text-base text-[#0B2A7A] font-black">₹{(product.pricePerUnit * quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button: "Add to Cart" */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="w-full py-4 rounded-full bg-[#0B2A7A] hover:bg-[#08205C] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-blue-400/30"
                >
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span>Add to Cart ({quantity} {product.unit}{quantity > 1 ? 's' : ''})</span>
                </button>

                <button
                  onClick={() => onBuyNow(product)}
                  className="w-full py-3.5 rounded-full bg-[#1E2340] hover:bg-[#14182e] text-white text-xs font-bold transition-all shadow-sm"
                >
                  Buy Now (Instant Proforma Invoice)
                </button>
              </div>

              {/* Collapsible Key Features / Advantages Section */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white">
                <button
                  onClick={() => setFeaturesExpanded(!featuresExpanded)}
                  className="w-full p-4 bg-[#F5F6F8] hover:bg-slate-100 transition-colors flex items-center justify-between text-left font-extrabold text-xs text-[#0B2A7A]"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B2A7A]" />
                    <span>Key Features & Mill Advantages</span>
                  </div>
                  {featuresExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#0B2A7A]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0B2A7A]" />
                  )}
                </button>

                {featuresExpanded && (
                  <div className="p-4 space-y-2.5 text-xs text-slate-600 bg-white border-t border-slate-100">
                    <ul className="space-y-2">
                      {keyAdvantages.map((advantage, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0B2A7A] shrink-0 mt-1.5"></span>
                          <span className="leading-relaxed">{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Social Share Icons Row */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-4 h-4 text-[#0B2A7A]" />
                  Share Product:
                </span>

                <div className="flex items-center gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out ${product.name} on Engineering Bazar: ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors border border-emerald-200"
                    title="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors border border-blue-200"
                    title="Share on Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Certified   Item: ${product.name}`)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-colors border border-slate-300"
                    title="Share on X (Twitter)"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>

                  {/* Copy Link Button */}
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-full bg-[#0B2A7A]/10 text-[#0B2A7A] hover:bg-[#0B2A7A] hover:text-white transition-colors border border-[#0B2A7A]/20 flex items-center gap-1.5 text-xs font-bold px-3"
                    title="Copy Page URL"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
