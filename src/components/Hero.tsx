import React from 'react';
import { Sparkles, ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeroProps {
  settings: StoreSettings;
  onExplore: (category?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE1] to-[#FAF7F2] border-b border-[#EADFCF]">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#E8B4B8]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
            
            {/* Boutique Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 border border-[#D5C7B3] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#B8860B]">
                Curated Luxury By Ayushi
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-bold text-[#141416] tracking-tight leading-[1.18]">
              Timeless Radiance, <br className="hidden sm:inline" />
              <span className="font-cormorant italic font-normal text-[#AA771C]">
                Branded Luxury Items
              </span>{' '}
              & Haute Couture
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore bespoke branded jewellery, Swarovski crystals, luxury dresses, premium handbags, and trending girl accessories. Curated with love for girls who adore premium elegance.
            </p>

            {/* Contact Highlight Pill with Ayushi's Number */}
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-[11px] sm:text-xs text-[#141416] font-semibold">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#25D366] animate-ping"></span>
              <span>Direct WhatsApp & Call Orders:</span>
              <a href="tel:+919667779443" className="font-mono text-[#1E7E34] hover:underline font-bold">
                +91 9667779443
              </a>
            </div>

            {/* Call To Actions (Touch Friendly Side-by-Side on Mobile) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => onExplore('All')}
                className="w-full sm:w-auto px-4 sm:px-7 py-3 bg-[#141416] text-[#FAF7F2] text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl sm:rounded-full hover:bg-[#D4AF37] hover:text-[#141416] transition-all shadow-md flex items-center justify-center space-x-1.5 group"
              >
                <span>Explore Pieces</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Ayushi!%20I'm%20visiting%20Alora%20and%20want%20to%20place%20a%20custom%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[#25D366] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-xl sm:rounded-full hover:brightness-105 transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Quick Micro Value Props */}
            <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-3 border-t border-[#EADFCF]/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-0.5">
                <span className="font-serif text-sm sm:text-lg font-bold text-[#141416]">100%</span>
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight">Branded Guarantee</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-serif text-sm sm:text-lg font-bold text-[#141416]">Pan-India</span>
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight">Express Delivery</p>
              </div>
              <div className="space-y-0.5">
                <span className="font-serif text-sm sm:text-lg font-bold text-[#141416]">Ayushi</span>
                <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight">Personal Concierge</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Responsive on Mobile) */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-xs sm:max-w-md">
              
              {/* Main Showcase Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
                  alt="Alora Boutique Showcase"
                  className="w-full h-[220px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Badge on Card */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 border border-[#EADFCF] shadow-lg flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">
                      Featured Drop
                    </span>
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-[#141416] truncate">
                      Austrian Starlight Solitaire Set
                    </h3>
                    <span className="text-xs font-semibold text-[#141416]">
                      ₹1,899 <span className="text-gray-400 line-through text-[10px]">₹2,899</span>
                    </span>
                  </div>
                  <button
                    onClick={() => onExplore('Swarovski Jewellery')}
                    className="p-1.5 sm:p-2 bg-[#141416] text-white rounded-full hover:bg-[#D4AF37] hover:text-[#141416] transition-colors flex-shrink-0"
                    aria-label="View Product"
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Verified Boutique Pill */}
              <div className="absolute -top-3 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-1.5 sm:p-2.5 shadow-xl border border-[#EADFCF] flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#D4AF37]/50">
                  <img src="./alora-logo-circle.png" alt="Emblem" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#AA771C]">Official Boutique</p>
                  <p className="text-[10px] sm:text-xs font-bold text-[#141416]">Alora by Ayushi</p>
                </div>
              </div>

              {/* Floating Instagram Accent Pill */}
              <div className="absolute -bottom-2 -right-2 sm:-right-4 bg-white shadow-xl rounded-xl sm:rounded-2xl p-2 sm:p-2.5 border border-[#EADFCF] flex items-center space-x-2">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold">
                  📸
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-500">Instagram</p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#141416]">@alora_by_ayushi_</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
