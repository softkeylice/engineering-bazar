import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModel';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Phone, ChevronDown, Menu, X, Shield, FileText, ShoppingBag } from 'lucide-react';
import { CATEGORIES_LIST, CATEGORY_TAXONOMY } from '../data/mockData';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenRFQ?: (prefilledCategory?: string) => void;
  onOpenSearchModal: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRFQ,
  onOpenSearchModal,
  cartCount = 0,
  onOpenCart,
  onOpenAuthModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogDropdownOpen, setCatalogDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  useEffect(() => {
    if (location.pathname === '/shop') {
      setActiveSection('catalog-section');
      return;
    }

    const sections = [
      'contact-section',
      'gallery-section',
      'industries-section',
      'services-section',
      'catalog-section',
      'about-section',
    ];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;

      if (window.scrollY < 250) {
        setActiveSection('home');
        return;
      }

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    setCatalogDropdownOpen(false);

    if (!sectionId) {
      setActiveSection('home');
    } else {
      setActiveSection(sectionId);
    }

    if (location.pathname !== '/') {
      navigate('/');
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 bg-white text-[#1E2340] ${
      isScrolled ? 'shadow-md py-2.5 border-b border-slate-200' : 'py-3.5 border-b border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Left */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group">
            <Logo size={42} showText variant="light" />
          </Link>

          {/* Desktop Center Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide">
            {/* Home */}
            <button
              onClick={() => handleNavClick()}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'home'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>Home</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'home'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>

            {/* About Us */}
            <button
              onClick={() => handleNavClick('about-section')}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'about-section'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>About Us</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'about-section'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>

            {/* Catalog Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setCatalogDropdownOpen(true)}
              onMouseLeave={() => setCatalogDropdownOpen(false)}
            >
              <Link
                to="/shop"
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname === '/shop' || (location.pathname === '/' && activeSection === 'catalog-section')
                    ? 'text-[#1A2A6C] font-extrabold'
                    : 'text-slate-700 hover:text-[#1A2A6C]'
                }`}
              >
                <span>Catalog</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/shop' || (location.pathname === '/' && activeSection === 'catalog-section')
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>

              {catalogDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2.5 z-50 text-xs animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
                  <div className="px-4 py-1.5 text-[10px] uppercase font-extrabold text-[#0B2A7A] tracking-wider flex items-center justify-between">
                    <span>Product Categories</span>
                    <span className="w-2 h-2 rounded-full bg-[#0B2A7A]"></span>
                  </div>
                  <div className="h-px bg-slate-100 my-1"></div>
                  {CATEGORY_TAXONOMY.map((cat) => (
                    <div key={cat.name} className="group/item">
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.name)}`}
                        onClick={() => setCatalogDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-slate-800 hover:bg-[#F5F6F8] hover:text-[#0B2A7A] font-semibold transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400 group-hover/item:text-[#0B2A7A]">
                          {cat.subcategories.length} subcategories
                        </span>
                      </Link>
                    </div>
                  ))}
                  <div className="h-px bg-slate-100 my-1"></div>
                  <Link
                    to="/shop"
                    onClick={() => setCatalogDropdownOpen(false)}
                    className="block px-4 py-2.5 text-[#0B2A7A] font-extrabold hover:bg-[#F5F6F8] transition-colors flex items-center justify-between"
                  >
                    <span>View All 10,000+ Industrial SKUs</span>
                    <FileText className="w-3.5 h-3.5 text-[#0B2A7A]" />
                  </Link>
                </div>
              )}
            </div>

            {/* Services */}
            <button
              onClick={() => handleNavClick('services-section')}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'services-section'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>Services</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'services-section'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>

            {/* Industries */}
            <button
              onClick={() => handleNavClick('industries-section')}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'industries-section'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>Industries</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'industries-section'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleNavClick('gallery-section')}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'gallery-section'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>Gallery</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'gallery-section'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact-section')}
              className={`relative group py-2 transition-colors ${
                location.pathname === '/' && activeSection === 'contact-section'
                  ? 'text-[#1A2A6C] font-extrabold'
                  : 'text-slate-700 hover:text-[#1A2A6C]'
              }`}
            >
              <span>Contact</span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#1A2A6C] rounded-full transition-transform duration-300 origin-left ${
                location.pathname === '/' && activeSection === 'contact-section'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSearchModal}
              className="p-2.5 rounded-full bg-[#F5F6F8] text-slate-600 hover:text-[#1A2A6C] hover:bg-slate-200 transition-colors border border-slate-200"
              title="Search Materials & Specs"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#1A2A6C]" />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#1A2A6C] text-white hover:bg-[#14205C] transition-all border border-[#1A2A6C] shadow-sm flex items-center justify-center"
              title="View Industrial Order Cart"
              aria-label="Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1A2A6C] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="p-2.5 rounded-full bg-[#F5F6F8] text-slate-600 hover:text-[#1A2A6C] hover:bg-slate-200 transition-colors border border-slate-200 flex items-center gap-1.5 px-3"
            >
              <UserIcon className="w-4 h-4 text-[#1A2A6C]" />
              <span className="text-xs font-semibold max-w-[100px] truncate">{user.email}</span>
            </button>
            {accountMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50">
                <button
                  onClick={() => { logout(); setAccountMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] font-semibold"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
  <button
    onClick={onOpenAuthModal}
    className="p-2.5 rounded-full bg-[#F5F6F8] text-slate-600 hover:text-[#1A2A6C] hover:bg-slate-200 transition-colors border border-slate-200"
    title="Login"
  >
    <UserIcon className="w-4 h-4 text-[#1A2A6C]" />
  </button>
)}
            <a
              href="tel:+9118002660000"
              className="px-4 py-2 rounded-full border border-slate-200 hover:border-[#1A2A6C] text-slate-700 hover:text-[#1A2A6C] text-xs font-semibold transition-all flex items-center gap-1.5 bg-[#F5F6F8]"
            >
              <Phone className="w-3.5 h-3.5 text-[#1A2A6C]" />
              <span>Call Us</span>
            </a>

            <Link
              to="/shop"
              className="px-5 py-2 rounded-full bg-[#1A2A6C] hover:bg-[#14205C] text-white text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center gap-1.5 border border-[#1A2A6C]"
            >
              <FileText className="w-3.5 h-3.5 text-white" />
              <span>Shop Catalog</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl bg-[#1A2A6C] text-white border border-[#1A2A6C]"
              aria-label="Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#1A2A6C] font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={onOpenSearchModal}
              className="p-2 rounded-xl bg-[#F5F6F8] text-slate-700 border border-slate-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-[#1A2A6C]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#F5F6F8] text-slate-700 border border-slate-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 mt-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNavClick()}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            About Us
          </button>
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left py-2 px-3 text-[#1A2A6C] hover:bg-[#F5F6F8] rounded-xl font-bold text-xs"
          >
            Product Catalog (10,000+ SKUs)
          </Link>
          <button
            onClick={() => handleNavClick('services-section')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick('industries-section')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            Industries
          </button>
          <button
            onClick={() => handleNavClick('gallery-section')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavClick('contact-section')}
            className="block w-full text-left py-2 px-3 text-slate-700 hover:bg-[#F5F6F8] hover:text-[#1A2A6C] rounded-xl font-medium text-xs"
          >
            Contact
          </button>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:+9118002660000"
              className="w-full py-2.5 rounded-full border border-slate-200 text-center text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 bg-[#F5F6F8]"
            >
              <Phone className="w-3.5 h-3.5 text-[#1A2A6C]" />
              <span>Call Toll Free: 1800-266-0000</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};

