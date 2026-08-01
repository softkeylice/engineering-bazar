import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, ArrowRight, Phone, MapPin, Send } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/mockData';
import { Logo } from './Logo';

interface FooterProps {
  onSubscribeNewsletter: (email: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribeNewsletter }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribeNewsletter(email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A2A6C] text-slate-300 border-t border-[#2E4BC7]/30 relative overflow-hidden">
      {/* Background gear watermark echo */}
      <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none text-white">
        <Logo size={320} variant="dark" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo size={48} showText variant="dark" />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              India's trusted digital   marketplace bridging primary steel mills, non-ferrous producers, and heavy OEMs for certified raw materials and turnkey engineered components.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-blue-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-300" />
              <span>TUV Accredited Industrial Hub</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Quick Links</span>
              <span className="w-8 h-0.5 bg-blue-400/40"></span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <a href="#about-section" className="hover:text-white transition-colors">About Engineering Bazar</a>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors font-semibold text-white">Full Product Catalog</Link>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">Industrial Services</a>
              </li>
              <li>
                <a href="#industries-section" className="hover:text-white transition-colors">Sectors Empowered</a>
              </li>
              <li>
                <a href="#gallery-section" className="hover:text-white transition-colors">Visuals & Facilities</a>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-white transition-colors">Contact Corporate Office</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Product Categories</span>
              <span className="w-8 h-0.5 bg-blue-400/40"></span>
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES_LIST.slice(1).map((cat) => (
                <li key={cat}>
                  <Link to={`/shop?category=${encodeURIComponent(cat)}`} className="hover:text-white transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-blue-300" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="text-blue-200 font-bold hover:underline inline-flex items-center gap-1 pt-1">
                  <span>View All 10,000+ Certified SKUs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4:   Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>  Newsletter</span>
              <span className="w-8 h-0.5 bg-blue-400/40"></span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Subscribe to weekly metal price indices, raw material market intelligence, and mill dispatch schedules.
            </p>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter corporate email..."
                  required
                  className="w-full bg-[#14205C] border border-[#2E4BC7]/40 rounded-full pl-4 pr-12 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3.5 bg-[#2E4BC7] hover:bg-[#233bb3] text-white rounded-full text-xs font-bold transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-slate-400 block">Strictly no spam. Unsubscribe anytime.</span>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#2E4BC7]/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <div>
            © {new Date().getFullYear()} Engineering Bazar   Industrial Marketplace. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of   Sourcing</a>
            <a href="#" className="hover:text-white transition-colors">Mill MTC Traceability Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

