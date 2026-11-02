import React, { useState } from 'react';
import { Sparkles, Heart, Search, Instagram, MessageCircle, Lock, Menu, X, Phone } from 'lucide-react';
import { StoreSettings } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  settings: StoreSettings;
  wishlistCount: number;
  onOpenAdmin: () => void;
  onSearch: (query: string) => void;
  onSelectCategory: (cat: string) => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  wishlistCount,
  onOpenAdmin,
  onSearch,
  onSelectCategory,
  onOpenWishlist
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const categories = [
    'All',
    'Designer Clothing',
    'Swarovski Jewellery',
    'Necklaces & Chokers',
    'Earrings & Jhumkas',
    'Bracelets & Bangles',
    'Rings',
    'Bags & Accessories'
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Announcement Bar with Ayushi's Number */}
      <div className="bg-[#141416] text-[#E5C492] px-3 sm:px-4 py-2 text-center text-[10px] sm:text-xs tracking-wider uppercase font-medium flex items-center justify-center space-x-2 border-b border-[#2A2A2A]">
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse flex-shrink-0" />
        <span>Express Pan-India Delivery • Custom Orders & Enquiries: </span>
        <a href="tel:+919667779443" className="font-bold underline text-white hover:text-[#D4AF37]">
          +91 9667779443
        </a>
        <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse flex-shrink-0" />
      </div>

      {/* Main Brand Bar */}
      <div className="glass-nav border-b border-[#EADFCF] px-3 sm:px-8 py-2.5 sm:py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile Menu & Search Icons */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#141416] hover:text-[#D4AF37]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 text-[#141416] hover:text-[#D4AF37]"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search dresses, Swarovski, jewellery, bags..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full bg-white/80 border border-[#D5C7B3] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#141416] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
            </form>
          </div>

          {/* Center Luxury Logo with Signboard Emblem */}
          <div className="flex-1 text-center md:flex-initial flex justify-center">
            <a href="#" className="inline-block">
              <Logo size="md" showBadge={true} />
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 flex-1 justify-end">
            
            {/* Phone Call Quick Link */}
            <a
              href="tel:+919667779443"
              className="hidden lg:flex items-center space-x-1 text-xs font-semibold text-[#141416] hover:text-[#B8860B] transition-colors px-2.5 py-1.5 rounded-full hover:bg-white/80 border border-transparent hover:border-[#D5C7B3]"
              title="Call Ayushi: +91 9667779443"
            >
              <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
              <span className="text-[11px] font-mono">9667779443</span>
            </a>

            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I'm%20visiting%20Alora%20online%20and%20would%20love%20to%20know%20more%20about%20your%20collection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs font-semibold text-[#141416] hover:text-[#25D366] transition-colors px-2.5 sm:px-3 py-1.5 rounded-full bg-white/70 hover:bg-[#25D366]/10 border border-[#EADFCF] hover:border-[#25D366]/30 shadow-sm"
              title="WhatsApp +91 9667779443"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline text-[11px]">WhatsApp</span>
            </a>

            {/* Instagram Link */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-xs font-medium text-[#141416] hover:text-[#E1306C] transition-colors hover:bg-white/80"
              title="Instagram @alora_by_ayushi_"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 sm:p-2 text-[#141416] hover:text-[#D4AF37] transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[9px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Management Trigger */}
            <button
              onClick={onOpenAdmin}
              className="p-1.5 sm:p-2 text-gray-500 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5"
              title="Ayushi Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="pt-2.5 pb-1 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search branded dresses, Swarovski, jewellery, bags..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full bg-white border border-[#D5C7B3] rounded-full pl-9 pr-4 py-1.5 text-xs text-[#141416] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
            </form>
          </div>
        )}
      </div>

      {/* Desktop Category Navigation */}
      <nav className="hidden md:block bg-[#FAF7F2] border-b border-[#EADFCF] px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-6 lg:space-x-8 overflow-x-auto text-xs tracking-wider uppercase font-semibold text-[#4A4A4A]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="py-1 hover:text-[#D4AF37] transition-colors relative group whitespace-nowrap"
            >
              <span>{cat}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#EADFCF] px-5 py-4 space-y-4 animate-fadeIn shadow-lg">
          
          {/* Quick Call Box in Mobile Drawer */}
          <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EADFCF] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Ayushi's Direct Helpline</p>
              <p className="text-xs font-bold text-[#141416] font-mono">+91 9667779443</p>
            </div>
            <a
              href="tel:+919667779443"
              className="p-2 bg-[#141416] text-white rounded-xl shadow-sm hover:bg-[#D4AF37]"
              title="Call"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-[11px] font-bold text-[#B8860B] tracking-widest uppercase">Explore Collections</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#141416]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-xl bg-white border border-[#EADFCF]/60 hover:bg-[#FAF7F2] hover:text-[#D4AF37] transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#EADFCF] flex justify-between items-center text-xs">
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#E1306C] font-semibold"
            >
              <Instagram className="w-4 h-4" />
              <span>@{settings.instagramHandle}</span>
            </a>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-1 text-gray-500 font-semibold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
