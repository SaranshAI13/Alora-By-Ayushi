import React from 'react';
import { Instagram, MessageCircle, Heart, Lock, Phone } from 'lucide-react';
import { StoreSettings } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  settings: StoreSettings;
  categories?: string[];
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, categories = [], onOpenAdmin, onSelectCategory }) => {
  const displayCategories = categories.filter(c => c !== 'All').slice(0, 6);
  const fallbackCategories = [
    'Designer Clothing',
    'Swarovski Jewellery',
    'Necklaces & Chokers',
    'Bags & Accessories',
    'Bracelets & Bangles'
  ];
  const listToRender = displayCategories.length > 0 ? displayCategories : fallbackCategories;
  return (
    <footer className="bg-[#141416] text-[#FAF7F2] border-t border-[#2A2A2A] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        {/* Top 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Brand Info with Official Logo Emblem */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Logo size="lg" showBadge={true} theme="dark" />
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed mx-auto md:mx-0">
              Curated luxury boutique showcasing branded girls fashion, Austrian crystal jewellery, designer dresses, and high-glamour accessories. Handcrafted with passion by Ayushi.
            </p>

            <div className="flex items-center justify-center md:justify-start space-x-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center text-white transition-colors"
                title="Instagram @alora_by_ayushi_"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I'm%20reaching%20out%20via%20the%20Alora%20website.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                title="WhatsApp Direct +91 9667779443"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="tel:+919667779443"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black flex items-center justify-center text-white transition-colors"
                title="Call Ayushi: +91 9667779443"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left text-xs">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[11px]">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-gray-400 font-medium">
              {listToRender.map((cat) => (
                <li key={cat}>
                  <button onClick={() => onSelectCategory(cat)} className="hover:text-white transition-colors">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Concierge Help & Phone Contact */}
          <div className="md:col-span-3 space-y-3 text-center md:text-left text-xs bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[11px]">
              Ayushi's Direct Concierge
            </h4>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              For custom orders, sizing assistance, or instant delivery queries:
            </p>
            
            <div className="space-y-1.5 pt-1">
              <a
                href="tel:+919667779443"
                className="flex items-center justify-center md:justify-start space-x-2 text-white font-mono font-bold hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+91 9667779443</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20Need%20some%20assistance%20picking%20a%20gift.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] text-white font-bold rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 9667779443</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-3">
          <p>
            © {new Date().getFullYear()} <strong className="text-gray-300">Alora by Ayushi</strong>. All Rights Reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Handcrafted with</span>
              <Heart className="w-3 h-3 text-rose-500 fill-current inline" />
              <span>for Ayushi</span>
            </span>

            {/* Discreet Admin Lock */}
            <button
              onClick={onOpenAdmin}
              className="text-gray-600 hover:text-[#D4AF37] flex items-center space-x-1 transition-colors"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3" />
              <span className="uppercase tracking-wider">Owner Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
