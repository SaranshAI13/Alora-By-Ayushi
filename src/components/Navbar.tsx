import React, { useState } from 'react';
import { Sparkles, Heart, Search, Instagram, MessageCircle, Lock, Menu, X } from 'lucide-react';
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
    'Swarovski Jewellery',
    'Necklaces & Chokers',
    'Earrings & Jhumkas',
    'Bracelets & Bangles',
    'Rings',
    'Designer Clothing',
    'Bags & Accessories'
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Announcement Bar */}
      {settings.announcementText && (
        <div className="bg-[#141416] text-[#E5C492] px-4 py-2 text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center space-x-2 border-b border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span>{settings.announcementText}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        </div>
      )}

      {/* Main Brand Bar */}
      <div className="glass-nav border-b border-[#EADFCF] px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#141416] hover:text-[#D4AF37]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#141416] hover:text-[#D4AF37]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search Swarovski, rings, dresses..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full bg-white/80 border border-[#D5C7B3] rounded-full pl-9 pr-4 py-2 text-xs text-[#141416] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Center Luxury Logo with Signboard Emblem */}
          <div className="flex-1 text-center md:flex-initial flex justify-center">
            <a href="#" className="inline-block">
              <Logo size="md" showBadge={true} />
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-1 justify-end">
            {/* Instagram Link */}
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-medium text-[#141416] hover:text-[#E1306C] transition-colors px-2.5 py-1.5 rounded-full hover:bg-white/80 shadow-sm border border-transparent hover:border-[#E1306C]/20"
              title="Visit Instagram @alora_by_ayushi_"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span className="hidden lg:inline text-[11px] font-semibold">@{settings.instagramHandle}</span>
            </a>

            {/* Direct WhatsApp Chat */}
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I'm%20visiting%20Alora%20online%20and%20would%20love%20to%20know%20more%20about%20your%20collection.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 text-xs font-semibold text-[#141416] hover:text-[#25D366] transition-colors px-3 py-1.5 rounded-full bg-white/70 hover:bg-[#25D366]/10 border border-[#EADFCF] hover:border-[#25D366]/30 shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline text-[11px]">WhatsApp</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#141416] hover:text-[#D4AF37] transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Management Trigger */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 p-2 text-gray-500 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-black/5"
              title="Ayushi Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden xl:inline text-[10px] font-semibold uppercase tracking-wider">Owner</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="pt-3 pb-1 md:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search Swarovski, rings, clothing..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  onSearch(e.target.value);
                }}
                className="w-full bg-white border border-[#D5C7B3] rounded-full pl-9 pr-4 py-2 text-xs text-[#141416] placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </form>
          </div>
        )}
      </div>

      {/* Desktop Category Navigation */}
      <nav className="hidden md:block bg-[#FAF7F2] border-b border-[#EADFCF] px-4 py-2.5">
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
        <div className="md:hidden bg-[#FFFDF9] border-b border-[#EADFCF] px-6 py-4 space-y-4 animate-fadeIn shadow-lg">
          <p className="text-[11px] font-bold text-[#B8860B] tracking-widest uppercase">Explore Collections</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#141416]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-lg hover:bg-[#FAF7F2] hover:text-[#D4AF37]"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EADFCF] flex justify-between items-center text-xs">
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
