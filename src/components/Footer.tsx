import React from 'react';
import { Instagram, MessageCircle, Heart, Lock } from 'lucide-react';
import { StoreSettings } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  settings: StoreSettings;
  onOpenAdmin: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin, onSelectCategory }) => {
  return (
    <footer className="bg-[#141416] text-[#FAF7F2] border-t border-[#2A2A2A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Top 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Info with Official Logo Emblem */}
          <div className="md:col-span-5 space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Logo size="lg" showBadge={true} theme="dark" />
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Curated luxury boutique showcasing certified Austrian Swarovski crystal jewelry, bespoke designer clothing, and high-glamour accessories. Handcrafted with passion by Ayushi.
            </p>

            <div className="flex items-center justify-center md:justify-start space-x-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] flex items-center justify-center text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I'm%20reaching%20out%20via%20the%20Alora%20website.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-4 space-y-3 text-center md:text-left text-xs">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[11px]">
              Explore Collections
            </h4>
            <ul className="space-y-2 text-gray-400 font-medium">
              <li>
                <button onClick={() => onSelectCategory('Swarovski Jewellery')} className="hover:text-white transition-colors">
                  Swarovski Signature Collection
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Necklaces & Chokers')} className="hover:text-white transition-colors">
                  Necklaces & Royal Chokers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Earrings & Jhumkas')} className="hover:text-white transition-colors">
                  Crystal Chandelier Earrings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Bracelets & Bangles')} className="hover:text-white transition-colors">
                  Tennis Bracelets & Bangles
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Designer Clothing')} className="hover:text-white transition-colors">
                  Haute Couture & Silk Dresses
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Help */}
          <div className="md:col-span-3 space-y-3 text-center md:text-left text-xs">
            <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[11px]">
              Ayushi's Concierge
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Have questions about sizing, customization, or gift packaging? Chat directly with Ayushi on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20Need%20some%20assistance%20picking%20a%20gift.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#25D366] text-white font-bold rounded-xl shadow-md hover:brightness-110 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Ayushi</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
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
